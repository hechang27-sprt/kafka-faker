import Busboy, { BusboyFileStream } from "@fastify/busboy";
import type { H3Event, EventHandlerRequest } from "h3";
import { Magic, MAGIC_MIME_TYPE } from "mmmagic";
import { detect } from "./magic";
import { createEventIterator } from "./misc/event_iter";
import { Writable } from "node:stream";

type BaseStatus = {
    field: string;
    filename: string;
    mimeType: string;
    transferEncoding: string;
    resume: () => void;
};

type StateKey = "new-file" | "data" | "error";

type State = {
    state: StateKey;
} & (OnNewFile | OnData | OnError);

type OnNewFile = {
    state: "new-file";
    pipe: (stream: Writable) => void;
};

type OnData = {
    state: "data";
    buffer: Buffer;
};

type OnError = {
    state: "error";
    error: ErrorKey;
} & (UnsupportedMimeType | OnUnverifiedMimeType | OnFileSizeExceedsLimit);

type ErrorKey =
    | "UnsupportedMimeType"
    | "UnverifiedMimeType"
    | "FileSizeExceedsLimit";

type UnsupportedMimeType = {
    state: "error";
    error: "UnsupportedMimeType";
};

type OnUnverifiedMimeType = {
    state: "error";
    error: "UnverifiedMimeType";
    mimeTypeDetected: string;
};

type OnFileSizeExceedsLimit = {
    state: "error";
    error: "FileSizeExceedsLimit";
    limit: number;
};

type Status = BaseStatus & State;

async function* readFiles(
    event: H3Event<EventHandlerRequest>,
    acceptMimeTypes: string[],
    nFiles: number,
    maxFileSize: number,
    highWaterMark: number = 16 * 1024,
    mmmagicBufSize: number = 1 * 1024
): AsyncGenerator<Status> {
    const nodeReq = event.node!.req;
    const bb = new Busboy({
        headers: nodeReq.headers as any,
        limits: {
            files: nFiles,
            fileSize: maxFileSize,
        },
        fileHwm: highWaterMark,
        highWaterMark,
    });
    const destMap = new Map<string, Writable>();

    const event_iter = createEventIterator<{
        field: string;
        stream: BusboyFileStream;
        filename: string;
        transferEncoding: string;
        mimeType: string;
    }>(({ emit, cancel }) => {
        bb.on("file", (field, stream, filename, transferEncoding, mimeType) => {
            emit({
                field,
                stream,
                filename,
                transferEncoding,
                mimeType,
            });
        }).on("finish", cancel);
        nodeReq.pipe(bb);

        return () => {
            nodeReq.unpipe();
        };
    });

    const mmm = new Magic(MAGIC_MIME_TYPE);

    for await (const {
        field,
        stream,
        filename,
        transferEncoding,
        mimeType,
    } of event_iter) {
        const base = {
            field,
            filename,
            transferEncoding,
            mimeType,
            resume: () => stream.resume(),
        };

        if (!acceptMimeTypes.includes(mimeType)) {
            yield {
                state: "error",
                error: "UnsupportedMimeType",
                ...base,
            };
        }

        yield {
            state: "new-file",
            pipe: (writable) => {
                destMap.set(filename, writable);
            },
            ...base,
        };

        let dest = destMap.get(filename);
        let mmmBuffer: Buffer | undefined;
        let bufferedChunks: Buffer[] = [];
        let bufferedBytes = 0;
        let mimeTypeChecked = false;
        let bufferedStreamSent = false;
        let aborted = true;

        async function* checkMimeType(buf: Buffer): AsyncGenerator<Status> {
            const mimeTypeDetected = (await detect(mmm, buf))[0].trim();

            mimeTypeChecked = true;
            if (mimeTypeDetected !== mimeType) {
                yield {
                    state: "error",
                    error: "UnverifiedMimeType",
                    mimeTypeDetected,
                    ...base,
                };
            }
        }

        async function* sendBufferOrYield(buf: Buffer): AsyncGenerator<Status> {
            if (dest) {
                dest.write(buf);
            } else {
                yield {
                    state: "data",
                    buffer: buf,
                    ...base,
                };
            }
        }

        try {
            for await (const chunk_ of stream) {
                if (stream.truncated) {
                    yield {
                        state: "error",
                        error: "FileSizeExceedsLimit",
                        limit: maxFileSize,
                        ...base,
                    };
                }

                const chunk: Buffer = chunk_;
                if (bufferedBytes < mmmagicBufSize) {
                    bufferedChunks.push(chunk);
                    bufferedBytes += chunk.length;
                    continue;
                }

                mmmBuffer = Buffer.concat(bufferedChunks);
                yield* checkMimeType(mmmBuffer);

                if (mimeTypeChecked) {
                    if (!bufferedStreamSent) {
                        yield* sendBufferOrYield(mmmBuffer);
                        bufferedStreamSent = true;
                    }

                    yield* sendBufferOrYield(chunk);
                }
            }

            // check for when file has only one chunk
            if (!mimeTypeChecked && bufferedChunks.length == 1) {
                yield* checkMimeType(bufferedChunks[0]);
                yield* sendBufferOrYield(bufferedChunks[0]);
            }

            aborted = false;
        } finally {
            if (!stream.destroyed) {
                if (aborted) {
                    stream.destroy();
                } else {
                    stream.resume();
                }
            }
            for (const writable of destMap.values()) {
                writable.end();
            }
        }
    }
}

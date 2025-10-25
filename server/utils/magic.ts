import type { Magic } from "mmmagic";

export function detect(m: Magic, data: Buffer): Promise<string[]> {
    return new Promise((resolve, reject) => {
        m.detect(data, (err, res) => {
            if (err) {
                reject(err);
            } else {
                if (typeof res === "string") {
                    res = [res];
                }

                resolve(res);
            }
        });
    });
}

export function detectFile(m: Magic, path: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        m.detectFile(path, (err, res) => {
            if (err) {
                reject(err);
            } else {
                if (typeof res === "string") {
                    res = [res];
                }

                resolve(res);
            }
        });
    });
}

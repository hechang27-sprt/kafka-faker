import type { H3Event } from "h3";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

export const createTRPCContext = async (event: H3Event) => {
    return {
        auth: event.context.auth,
    };
};

const t = initTRPC.create({
    transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

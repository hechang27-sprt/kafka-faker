import {baseProcedure, createTRPCRouter} from '~~/server/trpc/init'

export const appRouter = createTRPCRouter({
    ping: baseProcedure.query(() => {
        return {
            status: "ok",
        }
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
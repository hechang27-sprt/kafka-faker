import type { MenuTree, MenuData } from "~/components/menu/TreeMenu.vue";

type WithSubmenu = Omit<MenuTree, "children"> & {
    children: MenuData;
};

interface GlobalMenu {
    dashboard: MenuTree;
    schemas: MenuTree;
    servers: WithSubmenu;
}

export const useMenuData = defineStore("menu", {
    state: (): GlobalMenu => ({
        dashboard: {
            key: "dashboard",
            label: "Dashboard",
            pathSegment: "dashboard",
        },
        schemas: {
            key: "schemas",
            label: "Schemas",
            pathSegment: "schema",
        },
        servers: {
            key: "servers",
            label: "Servers",
            pathSegment: "server",
            children: {},
        },
    }),

    actions: {
        addServer(bootstrapServer: string, label?: string) {
            const server: MenuTree = {
                key: `bootstrapServer@${bootstrapServer}`,
                label: label ?? bootstrapServer,
                pathSegment: bootstrapServer,
                children: {
                    produce: {
                        key: `produce@${bootstrapServer}`,
                        label: "Produce",
                        pathSegment: "produce",
                    },
                    consume: {
                        key: `consume@${bootstrapServer}`,
                        label: "Consume",
                        pathSegment: "consume",
                    },
                    topics: {
                        key: `topics@${bootstrapServer}`,
                        label: "Topics",
                        pathSegment: "topics",
                    },
                },
            };

            this.servers.children = {
                ...this.servers.children,
                [server.key]: server,
            };
        },

        removeServer(bootstrapServer: string) {
            const key = `bootstrapServer@${bootstrapServer}`;
            const { [key]: _, ...newChildren } = this.servers.children;
            this.servers.children = newChildren;
        },
    },
});

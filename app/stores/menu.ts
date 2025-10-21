import type { MenuTree, MenuData } from "~/components/menu/TreeMenu.vue";

type WithSubmenu = Omit<MenuTree, "children"> & {
    children: MenuData;
};

interface GlobalMenu extends MenuData {
    dashboard: MenuTree;
    schemas: MenuTree;
    servers: WithSubmenu;
}

export const useMenuData = defineStore("menu", () => {
    const menuData: Ref<GlobalMenu> = ref({
        dashboard: {
            key: "dashboard",
            label: "Dashboard",
            pathSegment: "dashboard",
        },
        schemas: {
            key: "schemas",
            label: "Schemas",
            pathSegment: "schemas",
        },
        servers: {
            key: "servers",
            label: "Servers",
            pathSegment: "server",
            children: {},
        },
    });

    function addServer(bootstrapServer: string, label?: string) {
        const server: MenuTree = {
            label: label ?? bootstrapServer,
            pathSegment: encodeURIComponent(bootstrapServer),
            children: {
                produce: {
                    label: "Produce",
                    pathSegment: "produce",
                },
                consume: {
                    label: "Consume",
                    pathSegment: "consume",
                },
                topics: {
                    label: "Topics",
                    pathSegment: "topics",
                },
            },
        };
        const key = `bootstrapServer@${bootstrapServer}`;

        const { servers } = menuData.value;

        servers.children = {
            ...servers.children,
            [key]: server,
        };
    }

    function removeServer(bootstrapServer: string) {
        const { servers } = menuData.value;
        const key = `bootstrapServer@${bootstrapServer}`;
        const { [key]: _, ...newChildren } = servers.children;
        servers.children = newChildren;
    }

    return { menuData, addServer, removeServer };
});

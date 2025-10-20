import type { Tree } from "~/components/TreeMenu.vue";

type MenuData = Record<string, Tree>;
const globalMenuData: MenuData = {
    dashboard: {
        key: "dashboard",
        label: "Dashboard",
        path: "/dashboard",
    },
    servers: {
        key: "servers",
        label: "Servers",
        path: "/server",
    },
    schemas: {
        key: "schemas",
        label: "Schemas",
        path: "/schemas",
    },
};

const useMenuData = () => {};

export default useMenuData;

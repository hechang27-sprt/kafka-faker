import type { DeepReadonly } from "vue";
import type { MenuTree, MenuData } from "~/components/menu/TreeMenu.vue";

type WithSubmenu = Omit<MenuTree, "children"> & {
    children: MenuData;
};

export interface GlobalMenu extends MenuData {
    dashboard: MenuTree;
    schemas: MenuTree;
    instances: WithSubmenu;
}

export const useMenuData = () => {
    const { instances } = useInstanceStore();

    const createInstanceEntry = (
        clientId: string,
        options: DeepReadonly<KafkaInstance>
    ): MenuTree => ({
        label: options.label ?? clientId,
        pathSegment: encodeURIComponent(clientId),
        children: {
            brokers: {
                label: "Brokers",
                pathSegment: "brokers",
            },
            topics: {
                label: "Topics",
                pathSegment: "topics",
            },
            produce: {
                label: "Produce",
                pathSegment: "produce",
            },
            consume: {
                label: "Consume",
                pathSegment: "consume",
            },
        },
    });

    const menuData = computed(() => {
        const instanceEntries: MenuData = Object.fromEntries(
            Object.entries(instances).map(([clientId, options]) => [
                clientId,
                createInstanceEntry(clientId, options),
            ])
        );

        return {
            dashboard: {
                label: "Dashboard",
                pathSegment: "dashboard",
            },
            schemas: {
                label: "Schemas",
                pathSegment: "schemas",
            },
            instances: {
                label: "Instances",
                pathSegment: "instance",
                children: instanceEntries,
            },
        };
    });

    return { menuData };
};

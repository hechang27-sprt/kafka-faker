<script lang="ts">
import type { MenuData, SlotProps } from "./TreeMenu.vue";

export const joinPath = (base: string, segment?: string): string => {
    console.log(base);
    if (!base.endsWith("/")) {
        base = base + "/";
    }
    if (!segment) {
        return base;
    }
    if (segment.startsWith("/")) {
        segment = segment[1]!;
    }

    return base + segment;
};
</script>

<script setup lang="ts">
interface Props {
    data: MenuData;
}

const { data } = defineProps<Props>();

const currPath = inject<string>("basePath")!;
const childPaths = computed(() =>
    Object.fromEntries(
        Object.entries(data).map(([key, child]) => [
            key,
            joinPath(currPath, child.pathSegment),
        ])
    )
);

defineSlots<{
    default(props: SlotProps): unknown;
}>();
</script>

<template>
    <template v-for="(child, key) in data" :key="key">
        <!-- @vue-generic {import('./TreeMenu.vue').MenuContext} -->
        <provide-props
            :provides="{
                basePath: childPaths[key]!,
            }"
        >
            <tree-menu-child :index="childPaths[key]!" :child>
                <template #default="slotProps: SlotProps">
                    <slot v-bind="slotProps" />
                </template>
            </tree-menu-child>
        </provide-props>
    </template>
</template>

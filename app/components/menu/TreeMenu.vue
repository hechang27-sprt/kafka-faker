<script setup lang="ts">
export interface MenuTree {
    // key: string;
    label: string;
    children?: MenuData;
    pathSegment?: string;
    // By default, leaves are navigable but non-leaves are not
    navigable?: boolean;
}

export type MenuData = Record<string, MenuTree>;

export interface MenuContext {
    basePath: string;
}

interface Props {
    data: MenuData;
}

export interface SlotProps {
    data: MenuTree;
    index: string;
    path?: string;
}

defineSlots<{
    default(props: SlotProps): unknown;
}>();

const { data } = defineProps<Props>();
</script>

<template>
    <!-- @vue-generic {MenuContext} -->
    <provide-props :provides="{ basePath: '/' }">
        <el-menu :default-active="$route.path">
            <tree-menu-inner :data>
                <template #default="slotProps: SlotProps">
                    <slot v-bind="slotProps" />
                </template>
            </tree-menu-inner>
        </el-menu>
    </provide-props>
</template>

<style scoped></style>

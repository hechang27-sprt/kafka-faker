<script setup lang="ts">
import { ElMenu, ElSubMenu } from 'element-plus';

export interface MenuTree {
    key: string;
    label: string;
    children?: MenuData;
    pathSegment?: string;
    // By default, leaves are navigable but non-leaves are not
    navigable?: boolean;
}

export type MenuData = Record<string, MenuTree>;

interface Props {
    data: MenuData;
    isRoot: boolean;
    index: string;
}

const { data, isRoot = true, index = "" } = defineProps<Props>();
</script>

<template>
    <el-tree>

    </el-tree>
</template>

<style scoped></style>

<script setup lang="ts">
import type { MenuData } from './TreeMenu.vue';

interface Props {
    data: MenuData;
}

const { data } = defineProps<Props>();
const basePath: string = inject('base-path', '/');
const joinPath = (base: string, segment?: string): string => {
    if (!base.endsWith('/')) {
        base = base + '/';
    }
    if (!segment) {
        return base;
    }
    if (segment.startsWith('/')) {
        segment = segment[1]!
    }

    return base + segment;
};

</script>

<template>
    <template v-for="(child, index) in data" :key="index">
        <provide-props :base-path="joinPath(basePath, child.pathSegment)">
            <el-menu-item v-if="child.children == null" :index>
                <tree-menu-item :data="child" />
            </el-menu-item>
            <el-sub-menu v-else :index>
                <template #title>
                    <tree-menu-item :data="child" />
                </template>
                <tree-menu-inner :data="child.children" />
            </el-sub-menu>
        </provide-props>
    </template>
</template>
<script setup lang="ts">
import type { MenuTree } from './TreeMenu.vue';

interface Props {
    data: MenuTree
    basePath?: string
}

const { data, basePath = inject('base-path', '/') } = defineProps<Props>();
const navigable = data.navigable != null ? data.navigable : data.children != null;
</script>

<template>
    <NuxtLink v-if="navigable" :to="basePath"><span>{{ data.label }}</span></NuxtLink>
    <span v-else>{{ data.label }}</span>
</template>

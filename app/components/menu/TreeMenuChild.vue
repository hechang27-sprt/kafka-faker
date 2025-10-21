<script setup lang="ts">
import type { MenuTree, SlotProps } from "./TreeMenu.vue";

interface Props {
    index: string;
    child: MenuTree;
}

const { index, child } = defineProps<Props>();
const path = inject<string>("basePath");
const navigable = computed(() =>
    child.navigable != null ? child.navigable : child.children == null
);

defineSlots<{
    default(props: SlotProps): unknown;
}>();
</script>

<template>
    <el-menu-item v-if="child.children == null" :index>
        <nuxt-link v-if="navigable" :to="path" class="blockify-fill-wh">
            <slot :data="child" :index :path>
                <span>{{ child.label }}</span>
            </slot>
        </nuxt-link>
        <slot v-else :data="child" :index :path>
            <span>{{ child.label }}</span>
        </slot>
    </el-menu-item>
    <el-sub-menu v-else :index>
        <template #title>
            <nuxt-link v-if="navigable" :to="path" class="blockify-fill-wh">
                <slot :data="child" :index :path>
                    <span>{{ child.label }}</span>
                </slot>
            </nuxt-link>
            <slot v-else :data="child" :index :path>
                <span>{{ child.label }}</span>
            </slot>
        </template>
        <tree-menu-inner :data="child.children">
            <template #default="slotProps">
                <slot v-bind="slotProps" />
            </template>
        </tree-menu-inner>
    </el-sub-menu>
</template>

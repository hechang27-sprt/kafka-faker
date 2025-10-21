<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script setup lang="ts" generic="T extends Record<string, any>">
interface Props {
    provides: T;
}
const props = defineProps<Props>();
(Object.keys(props.provides) as Array<keyof T>).forEach((key) => {
    provide(key as string | symbol, props.provides[key]);
});
</script>

<template>
    <slot />
</template>

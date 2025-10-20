<script lang="ts">
export default {
    inheritAttrs: false
}
</script>

<script setup lang="ts">
const attrs = useAttrs();
const refs = toRefs(attrs);

for (const key in refs) {
    provide(key, refs[key])
}
</script>

<template>
    <slot />
</template>
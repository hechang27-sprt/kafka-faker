<template>
    <tree-menu :data="menuData" />
</template>

<script lang="ts" setup>
// import { useMenuData } from "~/composable/menu";

const { menuData } = useMenuData();
</script>

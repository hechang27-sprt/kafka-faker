<template>
    <tree-menu :data="menuData" />
</template>

<script lang="ts" setup>
const { menuData, addServer, removeServer } = useMenuData();

addServer("10.100.0.150:9092", "kafka150");
addServer("10.100.0.225:9092", "kafka225");
addServer("https://example.com:9092", "kafka-remote");
</script>

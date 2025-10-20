<template>
    <el-tree style="max-width: 200px" :data="data" :props="defaultProps" />
</template>

<script lang="ts" setup>
interface Tree {
    label: string;
    children?: Tree[];
}

const defaultProps = {
    children: "children",
    label: "label",
};

const data: Tree[] = [
    {
        label: "Kafka Server 1",
    },
    {
        label: "Kafka Server 2",
    },
    {
        label: "Kafka Server 3",
    },
];
</script>

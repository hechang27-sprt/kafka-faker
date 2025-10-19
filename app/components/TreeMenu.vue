<script setup lang="ts">
export interface Tree {
  key: string,
  label: string,
  children?: Tree[],
  path?: string,
  onClick?: () => void,
}

const { data } = defineProps<{
  data: Tree[],
}>()

const defaultProps = {
  children: 'children',
  label: 'label',
}

// export default {Tree}
</script>

<template>
<el-tree
  :data="data"
  node-key="key"
  :props="defaultProps"
  default-expand-all>
  <template #default="{ _, data }">
    <div class="menu-tree-node">
      <NuxtLink
          v-if="data.path"
          :to="data.path"
          class="menu-content w-full"
      >
        <span>{{ data.label }}</span>
      </NuxtLink>
      <div v-else class="menu-content w-full">
        <span>{{ data.label }}</span>
      </div>
    </div>
  </template>
</el-tree>
</template>

<style scoped>

</style>
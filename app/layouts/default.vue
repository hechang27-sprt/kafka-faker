<script setup lang="ts">
import DefaultHeader from "~/components/DefaultHeader.vue";
import SidePanel from "~/components/SidePanel.vue";
</script>

<template>
    <div class="common-layout">
        <el-container class="m-0">
            <el-header>
                <DefaultHeader />
            </el-header>
            <el-container>
                <el-aside>
                    <SidePanel />
                </el-aside>
                <el-main>
                    <main class="px-10 py-20 text-center h-100vh">
                        <slot />
                    </main>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

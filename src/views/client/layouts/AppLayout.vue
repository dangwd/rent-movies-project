<script setup>
import AppSidebarLeft from './AppSidebarLeft.vue';
import AppSidebarRight from './AppSidebarRight.vue';
</script>
<template>
    <Toast />
    <body class="font-montserrat text-sm bg-white dark:bg-zinc-900">
        <div class="flex min-h-screen 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x-2 2xl:border-gray-200 dark:2xl:border-zinc-700">
            <!-- Left Sidebar -->
            <aside class="w-1/6 py-10 px-5 min-w-min border-r border-gray-300 dark:border-zinc-700 hidden md:block">
                <AppSidebarLeft></AppSidebarLeft>
            </aside>
            <!-- /Left Sidebar -->
            <ScrollPanel
                style="height: 100vh"
                :pt="{
                    bary: 'hidden'}"
                class="flex-1 py-10 px-5 sm:px-10"
            >
                <router-view></router-view>
            </ScrollPanel>
            <!-- Right Sidebar -->
            <ScrollPanel
                style="height: 100vh"
                class="w-1/5 p-10 min-w-min border-l border-gray-300 dark:border-zinc-700 hidden lg:block"
                :pt="{
                    bary: 'hidden'
                }"
            >
                <AppSidebarRight></AppSidebarRight>
            </ScrollPanel>
            <!-- /Right Sidebar -->
        </div>
    </body>
</template>

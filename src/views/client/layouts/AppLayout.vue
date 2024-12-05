<script setup>
import AppSidebarLeft from './AppSidebarLeft.vue';
import AppSidebarRight from './AppSidebarRight.vue';
</script>
<template>
    <body class="font-montserrat text-sm bg-white dark:bg-zinc-900">
        <div class="flex min-h-screen 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x-2 2xl:border-gray-200 dark:2xl:border-zinc-700">
            <!-- Left Sidebar -->
            <AppSidebarLeft></AppSidebarLeft>
            <!-- /Left Sidebar -->
            <main class="flex-1 py-10 px-5 sm:px-10">
                <router-view></router-view>
            </main>

            <!-- Right Sidebar -->
            <AppSidebarRight></AppSidebarRight>
            <!-- /Right Sidebar -->
        </div>
    </body>
</template>

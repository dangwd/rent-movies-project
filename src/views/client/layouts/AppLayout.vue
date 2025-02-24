<script setup>
import AppConfigurator from '../../../layout/AppConfigurator.vue';
import AppTopbar from '../../client/layouts/AppTopbar.vue'; /* PartiallyEnd: #3632/scriptSetup.vue */
</script>
<template>
    <Toast />
    <AppConfigurator></AppConfigurator>
    <AppTopbar></AppTopbar>
    <body class="font-montserrat text-sm dark:bg-zinc-900 z-0">
        <div class="min-h-screen 2xl:max-w-screen-2xl 2xl:mx-auto 2xl:border-x-2 2xl:border-gray-200 dark:2xl:border-zinc-700">
            <router-view></router-view>
        </div>
    </body>
</template>

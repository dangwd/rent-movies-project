<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [
            { label: 'Trang chủ', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Diễn viên', icon: 'pi pi-fw pi-user', to: '/man/actors' },
            { label: 'Phim', icon: 'pi pi-fw pi-video', to: '/man/movies' },
            { label: 'Thể loại', icon: 'pi pi-fw pi-map', to: '/man/genre' },
            { label: 'Banner', icon: 'pi pi-fw pi-ticket', to: '/man/banners' },
            { label: 'Series', icon: 'pi pi-fw pi-server', to: '/man/series' }
        ]
    },

    {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            {
                label: 'Trang người dùng',
                icon: 'pi pi-fw pi-globe',
                to: '/client'
            }
            // {
            //     label: 'Auth',
            //     icon: 'pi pi-fw pi-user',
            //     items: [
            //         {
            //             label: 'Login',
            //             icon: 'pi pi-fw pi-sign-in',
            //             to: '/auth/login'
            //         },
            //         {
            //             label: 'Error',
            //             icon: 'pi pi-fw pi-times-circle',
            //             to: '/auth/error'
            //         },
            //         {
            //             label: 'Access Denied',
            //             icon: 'pi pi-fw pi-lock',
            //             to: '/auth/access'
            //         }
            //     ]
            // },

            // {
            //     label: 'Not Found',
            //     icon: 'pi pi-fw pi-exclamation-circle',
            //     to: '/pages/notfound'
            // },
            // {
            //     label: 'Empty',
            //     icon: 'pi pi-fw pi-circle-off',
            //     to: '/pages/empty'
            // }
        ]
    }
    // {
    //     label: 'Hierarchy',
    //     items: [
    //         {
    //             label: 'Submenu 1',
    //             icon: 'pi pi-fw pi-bookmark',
    //             items: [
    //                 {
    //                     label: 'Submenu 1.1',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [
    //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
    //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
    //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
    //                     ]
    //                 },
    //                 {
    //                     label: 'Submenu 1.2',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
    //                 }
    //             ]
    //         },
    //         {
    //             label: 'Submenu 2',
    //             icon: 'pi pi-fw pi-bookmark',
    //             items: [
    //                 {
    //                     label: 'Submenu 2.1',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [
    //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
    //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
    //                     ]
    //                 },
    //                 {
    //                     label: 'Submenu 2.2',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
    //                 }
    //             ]
    //         }
    //     ]
    // }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>

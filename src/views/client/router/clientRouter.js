export default [
    {
        path: '/client',
        component: () => import('@/views/client/layouts/AppLayout.vue'),
        children: [
            {
                path: '/client',
                name: 'home',
                component: () => import('@/views/client/pages/HomePage.vue')
            },
            {
                path: '/detail/:id',
                name: 'detail',
                component: () => import('@/views/client/pages/DetailMovie.vue')
            },
            {
                path: '/watch/:id',
                name: 'watch',
                component: () => import('@/views/client/pages/WatchMovie.vue')
            },
            {
                path: '/get-me',
                name: 'get-me',
                component: () => import('@/views/client/pages/GetMe.vue')
            },
            {
                path: '/add-price',
                name: 'add-price',
                component: () => import('@/views/client/pages/AddPrice.vue')
            }
        ]
    }
];

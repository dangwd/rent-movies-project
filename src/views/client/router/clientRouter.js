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
            }
        ]
    }
];

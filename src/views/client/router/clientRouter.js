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
            },
            {
                path: '/search-movies',
                name: '/search-movies',
                component: () => import('@/views/client/pages/SearchMovies.vue')
            },
            {
                path: '/hot-movies',
                name: '/hot-movies',
                component: () => import('@/views/client/pages/HotMovies.vue')
            },
            {
                path: '/new-movies',
                name: '/new-movies',
                component: () => import('@/views/client/pages/NewMovies.vue')
            },
            {
                path: '/single-movie',
                name: '/single-movie',
                component: () => import('@/views/client/pages/SingleMovie.vue')
            },
            {
                path: '/series-movie',
                name: '/series-movie',
                component: () => import('@/views/client/pages/SeriesMovie.vue')
            },
            {
                path: '/actor/:id',
                name: 'actor-detail',
                component: () => import('@/views/client/pages/DetailActor.vue')
            }
        ]
    }
];

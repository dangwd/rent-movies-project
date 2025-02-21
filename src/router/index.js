import adminRouter from '@/views/admin/router/adminRouter';
import clientRouter from '@/views/client/router/clientRouter';
import { createRouter, createWebHistory } from 'vue-router';
import auth from '../middleware/auth.middleware';
const routes = [...clientRouter, ...adminRouter];
const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    const isAuthenticated = auth();
    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'login' });
    } else {
        next();
    }
});
export default router;

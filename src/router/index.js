import adminRouter from '@/views/admin/router/adminRouter';
import clientRouter from '@/views/client/router/clientRouter';
import { createRouter, createWebHistory } from 'vue-router';
import auth from '../middleware/auth.middleware';
const routes = [...clientRouter, ...adminRouter];
const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 };
    },
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
        const isAuthenticated = await auth();
        if (!isAuthenticated) {
            next({ name: 'login' });
            return;
        }
        if (to.meta.roles) {
            let roleUser = user.metadata.user.role;
            console.log(roleUser);
            if (to.meta.roles.includes(roleUser)) {
                next();
            } else {
                next({ name: 'home' });
            }
            return;
        }
    }
    next();
});
export default router;

import adminRouter from '@/views/admin/router/adminRouter';
import clientRouter from '@/views/client/router/clientRouter';
import { createRouter, createWebHistory } from 'vue-router';
const routes = [...clientRouter, ...adminRouter];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;

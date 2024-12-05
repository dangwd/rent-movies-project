export default function auth({ next, router }) {
    if (!localStorage.getItem('user')) {
        return router.push({ name: 'login' });
    } else {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const expireDate = new Date(user['ExpireToken']);
            if (expireDate <= new Date()) {
                localStorage.removeItem('user');
                return router.push({ name: 'login' });
            }
            return next();
        } catch (e) {
            return router.push({ name: 'login' });
        }
    }
}

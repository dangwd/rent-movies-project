import authService from '@/service/auth.service';
import { defineStore } from 'pinia';

const user = JSON.parse(localStorage.getItem('user'));

export const useAuthStore = defineStore('auth', {
    state: () => ({
        status: user ? { loggedIn: true } : { loggedIn: false },
        user: user || null
    }),
    actions: {
        async login(userCre) {
            try {
                const user = await authService.funcLogin(userCre);
                this.loginSuccess(user);
                const message = `Chào mừng ${user.metadata.user} quay trở lại!`;
                return {
                    status: 1,
                    type: 'Login',
                    user,
                    message
                };
            } catch (error) {
                this.loginFail();
                return {
                    status: 0,
                    type: 'Login',
                    message: error
                };
            }
        },
        loginSuccess(user) {
            this.status.loggedIn = true;
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        loginFail() {
            this.status.loggedIn = false;
            this.user = null;
            localStorage.removeItem('user');
        }
    }
});

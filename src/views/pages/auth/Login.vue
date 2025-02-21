<script setup>
import { useAuthStore } from '@/store';
import { useToast } from 'primevue/usetoast';
import { getCurrentInstance, ref } from 'vue';
import { useRouter } from 'vue-router';
const { proxy } = getCurrentInstance();

const toast = useToast();
const store = useAuthStore();
const router = useRouter();
const username = ref('');
const password = ref('');
const fullname = ref('');
const checked = ref(false);
const loginForm = ref(true);
const handleLogin = async () => {
    const data = {
        username: username.value,
        password: password.value
    };
    const res = await store.login(data);
    if (res.status === 1) {
        router.push({ name: 'home' });
    } else {
        proxy.$notify('E', res.message.response.data.message, toast);
    }
};


</script>

<template>
    <div class="hidden">
        <FloatingConfigurator />
    </div>
    <Toast />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="w-1/2 min-h-screen flex items-center justify-center bg-primary-100">
            <img src="@/assets/img/logo_login.jpg" alt="login-bg" class="w-[70%] h-[70%] object-cover" />
        </div>
        <div class="w-1/2 min-h-screen px-48 py-14 bg-white flex items-center">
            <div class="w-full">
                <h3 class="text-zinc-900 font-medium">Xin chào bạn</h3>
                <h1 class="text-zinc-900 text-3xl">Đăng nhập để tiếp tục</h1>

                <div class="flex flex-col gap-5 mt-10">
                    <FloatLabel variant="in">
                        <InputText id="email" v-model="email" class="h-16 w-full !text-xl" />
                        <label class="text-lg" for="email">Số điện thoại hoặc email</label>
                    </FloatLabel>
                    <FloatLabel variant="in" class="mt-2">
                        <Password fluid id="password" v-model="password" class="h-16 !text-xl" toggleMask />
                        <label class="text-lg" for="password">Mật khẩu</label>
                    </FloatLabel>
                    <Button @click="handleLogin()" label="Đăng nhập" class="w-full h-16 !text-xl mt-2" />
                    <div class="flex items-center justify-between gap-2">
                        <div class="flex items-center gap-2">
                            <Checkbox v-model="size" inputId="size_large" name="size" binary size="large" />
                            <label for="size_large" class="text-lg">Quên mật khẩu</label>
                        </div>
                        <router-link to="/" class="text-primary text-xl font-light hover:underline">Quên mật khẩu?</router-link>
                    </div>
                    <div class="flex items-center gap-2">
                        <hr class="w-full" />
                        <span class="text-zinc-400 text-xl">Hoặc</span>
                        <hr class="w-full" />
                    </div>

                    <Button variant="outlined" class="w-full h-16 !text-xl mt-2" severity="contrast">
                        <!-- <img src="~/assets/img/icon_logo_google.png" alt="login-bg" class="w-[25px] h-[25px] object-cover" /> -->
                        Đăng nhập với Google
                    </Button>
                    <div class="text-zinc-600 text-xl text-center">Bạn chưa có tài khoản? <router-link to="/auth/signup" class="text-primary font-medium">Đăng ký ngay</router-link></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>

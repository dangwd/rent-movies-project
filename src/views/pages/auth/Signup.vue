<template>
    <div class="hidden">
        <FloatingConfigurator />
    </div>
    <Toast />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="w-1/2 min-h-screen flex items-center justify-center bg-primary-100">
            <img src="@/assets/img/logo_login.jpg" alt="login-bg" class="w-[70%] h-[70%] object-cover" />
        </div>
        <div class="w-1/2 min-h-screen px-44 py-14 bg-white flex items-center">
            <div class="w-full">
                <h5 class="text-zinc-900 font-medium">Xin chào bạn</h5>
                <h2 class="text-zinc-900 text-2xl">Đăng ký tài khoản mới</h2>

                <div class="flex flex-col gap-5 mt-8">
                    <div class="flex gap-4">
                        <div class="w-1/2">
                            <FloatLabel variant="in">
                                <InputText id="email" v-model="firstName" class="h-14 w-full !text-base" />
                                <label for="email" class="text-normal">Họ</label>
                            </FloatLabel>
                        </div>

                        <div class="w-1/2">
                            <FloatLabel variant="in">
                                <InputText id="email" v-model="lastName" class="h-14 w-full !text-base" />
                                <label class="text-normal" for="email">Tên</label>
                            </FloatLabel>
                        </div>
                    </div>
                    <FloatLabel variant="in" class="mt-2">
                        <InputText id="email" v-model="email" class="h-14 w-full !text-base" />
                        <label class="text-normal" for="email">Địa chỉ Email</label>
                    </FloatLabel>
                    <FloatLabel variant="in" class="mt-2">
                        <Password fluid id="password" v-model="password" class="h-14 !text-base" toggleMask />
                        <label class="text-normal" for="password">Mật khẩu</label>
                    </FloatLabel>
                    <FloatLabel variant="in" class="mt-2">
                        <Password fluid id="password" v-model="password" class="h-14 !text-base" toggleMask />
                        <label class="text-normal" for="password">Nhập lại mật khẩu</label>
                    </FloatLabel>
                    <Button @click="handleRegister()" label="Đăng ký" class="w-full h-14 !text-base mt-1" />

                    <div class="flex items-center gap-2">
                        <hr class="w-full" />
                        <span class="text-zinc-400 text-lg">Hoặc</span>
                        <hr class="w-full" />
                    </div>

                    <Button variant="outlined" class="w-full h-14 !text-base mt-1" severity="contrast">
                        <!-- <img src="~/assets/img/icon_logo_google.png" alt="login-bg" class="w-[25px] h-[25px] object-cover" /> -->
                        Đăng nhập với Google
                    </Button>
                    <div class="text-zinc-600 text-base text-center">
                        Bạn đã có tài khoản?
                        <router-link to="/auth/login" class="text-primary font-medium">Đăng nhập ngay</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useAuthStore } from '@/store';
import { useToast } from 'primevue/usetoast';
import { getCurrentInstance, ref } from 'vue';
const { proxy } = getCurrentInstance();
const store = useAuthStore();
const toast = useToast();
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const handleRegister = async () => {
    const data = {
        name: `${firstName.value}${lastName.value}`,
        email: email.value,
        password: password.value
    };
    const res = await store.register(data);
    if (res.status === 1) {
        proxy.$notify('S', 'Tạo tài khoản thành công!', toast);
    } else {
        console.log(res);
        proxy.$notify('E', 'Có lỗi xảy ra!', toast);
    }
};
</script>
<style></style>

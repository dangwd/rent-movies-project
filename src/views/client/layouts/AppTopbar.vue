<template>
    <div :class="{ 'text-white': isScrolled }" class="h-20 sticky top-0 z-50 backdrop-blur backdrop-opacity-100 supports-backdrop-blur:bg-slate-900/500 border-b border-slate-500">
        <div class="container mx-auto flex items-center h-20 justify-between">
            <router-link to="/client">
                <img v-if="isScrolled" class="w-32" src=" @/assets/img/logo.png" alt="" />
                <img v-else class="w-32" src=" @/assets/img/logo1.png" alt="" />
            </router-link>
            <nav class="flex gap-2 font-semibold justify-between w-1/3 leading-3 uppercase">
                <router-link class="hover:text-primary transition-all ease-in-out duration-150 hover-underline-animation left leading-5" to="#"> Tìm kiếm </router-link>
                <router-link class="hover:text-primary transition-all ease-in-out duration-150 hover-underline-animation left leading-5">Phim hot</router-link>
                <router-link class="hover:text-primary transition-all ease-in-out duration-150 hover-underline-animation left leading-5">Phim lẻ</router-link>
                <router-link class="hover:text-primary transition-all ease-in-out duration-150 hover-underline-animation left leading-5">Phim bộ</router-link>
                <router-link class="hover:text-primary transition-all ease-in-out duration-150 hover-underline-animation left leading-5">Phim mới</router-link>
            </nav>
            <router-link v-if="!user" to="/auth/login">
                <Button label="Đăng nhập"></Button>
            </router-link>
            <div v-else>
                <Button text icon="pi pi-user" :label="user?.metadata?.user?.name || ''"></Button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
const isScrolled = ref(false);
const user = JSON.parse(localStorage.getItem('user'));
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
};
</script>
<style scoped>
.hover-underline-animation {
    display: inline-block;
    position: relative;
}

.hover-underline-animation::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 3px;
    bottom: 0;
    left: 0;
    background-color: var(--primary-color);
    transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover::after {
    transform: scaleX(1);
}

.hover-underline-animation.left::after {
    transform-origin: bottom right;
}

.hover-underline-animation.left:hover::after {
    transform-origin: bottom left;
}
</style>

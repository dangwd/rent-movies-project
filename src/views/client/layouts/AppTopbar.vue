<template>
    <div class="h-20 top-0 z-[50] backdrop-blur sticky backdrop-opacity-100 supports-backdrop-blur:bg-slate-900/500 border-b border-slate-500">
        <div class="container mx-auto flex items-center h-20 justify-between">
            <router-link to="/client">
                <img v-if="route.params.id" class="w-32" src=" @/assets/img/logo.png" alt="" />
                <img v-else class="w-32" src=" @/assets/img/logo1.png" alt="" />
            </router-link>
            <nav class="flex gap-2 font-semibold justify-between w-1/3 leading-3 uppercase">
                <div @click="searchBar = !searchBar" class="hover:text-primary transition-all ease-in-out duration-150 hover-underline-animation left leading-5" to="#">Tìm kiếm</div>
                <router-link class="hover:text-primary transition-all ease-in-out duration-150 hover-underline-animation left leading-5">Phim hot</router-link>
                <router-link class="hover:text-primary transition-all ease-in-out duration-150 hover-underline-animation left leading-5">Phim lẻ</router-link>
                <router-link class="hover:text-primary transition-all ease-in-out duration-150 hover-underline-animation left leading-5">Phim bộ</router-link>
                <router-link class="hover:text-primary transition-all ease-in-out duration-150 hover-underline-animation left leading-5">Phim mới</router-link>
            </nav>
            <LoginModal></LoginModal>
        </div>
        <div :class="{ hidden: !searchBar }" class="absolute duration-300 z-50 transition-all ease-in-out top-20 p-4 container left-1/2 -translate-x-1/2 bg-white border rounded-xl shadow-md flex flex-col gap-3">
            <div class="flex gap-2 w-full">
                <InputText :disabled="!searchBar" placeholder="Hôm nay xem gì ?" class="grow"></InputText>
                <Button :disabled="!searchBar" label="Tìm kiếm"></Button>
            </div>
            <div class="flex flex-col gap-3">
                <strong>Phim đề xuất</strong>
                <ScrollPanel style="width: 100%; height: 700px">
                    <div class="flex flex-col gap-2">
                        <div v-for="i in 5" class="flex gap-3">
                            <img width="150" height="150" class="object-cover" src="http://localhost:3000/uploads/1740104978113-6xuPvqv8VAsXXACCwLjUgsIDe05.jpg" alt="" />
                            <div class="flex flex-col p-2 gap-2">
                                <strong>The Gorge</strong>
                                <strong>Thời lượng : <span class="text-gray-700">2 tiếng</span></strong>
                                <strong>Diễn viên: <span class="text-gray-700">Hoàng Gay lọ</span></strong>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium amet ea optio laborum fugiat aut. Qui voluptas dolorum et commodi repellendus nesciunt quis, doloribus maiores ratione at ad ipsum quisquam.</p>
                            </div>
                        </div>
                    </div>
                </ScrollPanel>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import LoginModal from '../components/LoginModal.vue';
const isScrolled = ref(false);
const user = JSON.parse(localStorage.getItem('user'));
const route = useRoute();
const searchBar = ref(false);
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

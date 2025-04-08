<template>
    <div class="relative">
        <swiper v-if="images?.length > 0" :modules="[Autoplay, Navigation, Pagination]" :slides-per-view="1" :space-between="10" :loop="true" :autoplay="{ delay: 5000, disableOnInteraction: false }" :pagination="{ clickable: true }" class="mySwiper">
            <swiper-slide v-for="(image, index) in images" :key="index">
                <img :src="image.images" alt="Slide image" class="slide-image" />
                <div class="absolute top-[50%] h-[50%] w-full z-[99999]">
                    <div class="container mx-auto flex flex-col gap-4 left-0 right-0 border-l-4 pl-7 border-white">
                        <h1 class="text-white text-7xl font-extrabold">{{ image.title }}</h1>
                        <p class="text-white leading-7 text-lg w-1/2">
                            {{ image.description }}
                        </p>
                        <div>
                            <button class="border-2 hover:text-white duration-150 border-primary text-primary py-3 px-5 font-bold uppercase text-lg rounded-md hover-button-animation left">Xem ngay</button>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script setup>
import apiMain from '@/api/api-main';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { onMounted, ref } from 'vue';
const images = ref([]);

onMounted(() => {
    fetchBanners();
});
const fetchBanners = async () => {
    try {
        const res = await apiMain.get(`branners`);
        images.value = res.data.metadata.flatMap((el) => el);
    } catch (error) {
        console.log(error);
    }
};
</script>
<style>
.mySwiper {
    width: 100%;
    height: 100%;
}
.slide-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>

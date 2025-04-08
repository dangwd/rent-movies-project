<template>
    <div v-if="MovieDetail">
        <div :style="{ backgroundImage: `url(${MovieDetail.trailer ? MovieDetail.trailer[0] : ''})` }" class="bg-cover h-[1500px] z-50 mt-[-70px] bg-center bg-fixed relative">
            <div class="fixed inset-0 bg-black/30 backdrop-blur-md top-0 bottom-0"></div>
            <div class="absolute top-40 py-10 w-full">
                <div class="grid grid-cols-12 gap-5 container mx-auto left-0 right-0">
                    <div class="col-span-3 flex flex-col gap-3 w-full">
                        <img class="w-80 h-auto object-cover" :src="MovieDetail.images ? MovieDetail.images[0] : ''" alt="" />
                        <button @click="openBuyDlg()" v-if="MovieDetail.price" class="border-2 hover:text-gray-700 duration-150 border-primary text-primary py-3 px-5 font-bold uppercase text-lg rounded-md hover-button-animation left">
                            {{ formatPrice(MovieDetail.price) }}đ
                            <!-- <router-link :to="`/watch/${MovieDetail._id}`"></router-link> -->
                        </button>
                        <button v-else class="border-2 hover:text-gray-700 duration-150 border-primary text-primary py-3 px-5 font-bold uppercase text-lg rounded-md hover-button-animation left">
                            <router-link :to="`/watch/${MovieDetail._id}`">Xem ngay</router-link>
                        </button>
                    </div>

                    <div class="col-span-9 flex flex-col gap-4">
                        <h1 class="text-white text-7xl font-extrabold">{{ MovieDetail.movieName }}</h1>
                        <span class="text-white text-3xl">Hẻm núi (2025)</span>
                        <div class="flex gap-2">
                            <div v-for="(item, index) in MovieDetail.genre" :key="index">
                                <Badge :value="item.genreName"></Badge>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2 text-white text-lg">
                            <div class="flex gap-2">
                                <div class="uppercase">Đạo diễn:</div>
                                <strong>{{
                                    MovieDetail.actors
                                        ?.filter((el) => el.type === 'D')
                                        .map((el) => el.actorName)
                                        .join(', ')
                                }}</strong>
                            </div>
                            <div class="flex gap-2">
                                <div class="uppercase">Kịch bản:</div>
                                <strong>Nguyễn Minh Đăng</strong>
                            </div>
                            <div class="flex gap-2">
                                <div class="uppercase">Quốc gia:</div>
                                <strong>Mỹ</strong>
                            </div>
                            <div class="flex gap-2">
                                <div class="uppercase">Khởi chiếu:</div>
                                <strong>19/2/2025</strong>
                            </div>
                            <p class="text-white leading-7 text-lg w-full">
                                {{ MovieDetail.movieDescription }}
                            </p>
                        </div>
                        <div class="flex flex-col gap-2 text-white text-lg">
                            <strong class="uppercase">Diễn viên</strong>
                            <div class="flex gap-8">
                                <div v-for="(item, index) in MovieDetail.actors?.filter((el) => el.type === 'A')" :key="index" class="flex flex-col items-center gap-2">
                                    <img class="rounded-full w-32 h-32 object-cover" :src="item.images ? item.images[0] : ``" alt="" />
                                    <label for="">{{ item.actorName }}</label>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2 text-white text-lg">
                            <strong class="uppercase">Trailer</strong>
                            <div class="flex gap-8">
                                <iframe
                                    width="500"
                                    height="263"
                                    src="https://www.youtube.com/embed/gaLyIhSMSNk?si=ElxLOb3UJ0gbhInk"
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerpolicy="strict-origin-when-cross-origin"
                                    allowfullscreen
                                ></iframe>
                                <iframe
                                    width="500"
                                    height="263"
                                    src="https://www.youtube.com/embed/gaLyIhSMSNk?si=ElxLOb3UJ0gbhInk"
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerpolicy="strict-origin-when-cross-origin"
                                    allowfullscreen
                                ></iframe>
                                <iframe
                                    width="500"
                                    height="263"
                                    src="https://www.youtube.com/embed/gaLyIhSMSNk?si=ElxLOb3UJ0gbhInk"
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerpolicy="strict-origin-when-cross-origin"
                                    allowfullscreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Dialog v-model:visible="buyModal" modal header="Xác nhận thanh toán" :style="{ width: '25rem' }">
            <span>Xác nhận thanh toán {{ formatPrice(MovieDetail.price) }}đ ?</span>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <Button type="button" label="Hủy" severity="secondary" @click="buyModal = false"></Button>
                    <Button type="button" label="Thanh toán" @click="confirmBuy"></Button>
                </div>
            </template>
        </Dialog>
    </div>
</template>
<script setup>
import API from '@/api/api-main';
import { formatPrice } from '@/helper/formatPrice';
import { useToast } from 'primevue/usetoast';
import { getCurrentInstance, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const { proxy } = getCurrentInstance();
const toast = useToast();
onMounted(() => {
    fetchDetail();
});
const route = useRoute();
const buyModal = ref(false);
const MovieDetail = ref({});
const fetchDetail = async () => {
    try {
        const res = await API.get(`movie/${route.params.id}`);
        MovieDetail.value = res.data.metadata;
    } catch (error) {
        console.log(error);
    }
};
const openBuyDlg = () => {
    buyModal.value = true;
};
const confirmBuy = async () => {
    try {
        const res = await API.create(`movie/${route.params.id}/buy`);
        if (res.data) {
            proxy.$notify('S', 'Mua thành công!', toast);
        }
    } catch (error) {
        console.log(error);
    }
};
</script>
<style>
.hover-button-animation {
    position: relative;
    z-index: 1;
}
.hover-button-animation::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 100%;
    bottom: 0;
    left: 0;
    background-color: var(--primary-color);
    transition: transform 0.25s ease-out;
    z-index: -1;
}

.hover-button-animation:hover::after {
    transform: scaleX(1);
}

.hover-button-animation.left::after {
    transform-origin: bottom right;
}

.hover-button-animation.left:hover::after {
    transform-origin: bottom left;
}
</style>

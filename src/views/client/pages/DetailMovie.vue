<template>
    <div v-if="MovieDetail && User" class="text-white h-auto">
        <div>
            <img :src="MovieDetail.trailer ? MovieDetail.trailer[0] : 'https://placehold.co/600x400'" alt="" class="w-full h-[600px] object-cover" />
        </div>
        <div class="container mx-auto py-10">
            <div class="grid grid-cols-12 gap-3">
                <div class="col-span-3 flex flex-col gap-3">
                    <img class="w-full rounded-md h-auto object-cover" :src="MovieDetail.images ? MovieDetail.images[0] : ''" alt="" />
                    <button @click="openBuyDlg()" v-if="MovieDetail.price" class="border-2 hover:text-gray-700 duration-150 border-primary text-primary py-3 px-5 font-bold uppercase text-lg rounded-md hover-button-animation left">
                        {{ formatPrice(MovieDetail.price) }}đ
                    </button>
                    <button v-else class="border-2 hover:text-gray-700 duration-150 border-primary text-primary py-3 px-5 font-bold uppercase text-lg rounded-md hover-button-animation left">
                        <router-link :to="`/watch/${MovieDetail._id}`">Xem ngay</router-link>
                    </button>
                </div>
                <div class="col-span-9 flex flex-col gap-4">
                    <h1 class="text-white text-5xl">{{ MovieDetail.movieName }}</h1>
                    <!-- <span class="text-white text-3xl">Hẻm núi (2025)</span> -->
                    <div class="flex gap-2">
                        <div v-for="(item, index) in MovieDetail.genre" :key="index">
                            <Badge :value="item.genreName"></Badge>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2 text-white text-lg">
                        <div class="flex gap-2">
                            <div class="">Đạo diễn:</div>
                            <strong>{{
                                MovieDetail.actors
                                    ?.filter((el) => el.type === 'D')
                                    .map((el) => el.actorName)
                                    .join(', ')
                            }}</strong>
                        </div>

                        <div class="flex gap-2">
                            <div class="">Ngôn ngữ:</div>
                            <strong>{{ MovieDetail.language?.map((el) => el.name).join(', ') }}</strong>
                        </div>
                        <div class="flex gap-2">
                            <div class="">Khởi chiếu:</div>
                            <strong>19/2/2025</strong>
                        </div>
                        <p class="text-white leading-7 text-base w-full">
                            {{ MovieDetail.movieDescription }}
                        </p>
                    </div>
                    <div class="flex flex-col gap-2 text-white text-lg">
                        <strong class="">Diễn viên</strong>
                        <div class="flex gap-8">
                            <div v-for="(item, index) in MovieDetail.actors?.filter((el) => el.type === 'A')" :key="index" class="flex flex-col items-center gap-2">
                                <img class="rounded-full w-32 h-32 object-cover" :src="item.images ? item.images[0] : ``" alt="" />
                                <label for="">{{ item.actorName }}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-3 pt-3">
                <strong class="text-lg">Bình luận</strong>
                <div class="flex flex-col gap-2">
                    <div class="flex gap-2">
                        <Avatar crossorigin="anonymous" :image="User?.thumbnail ? User?.thumbnail : `https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png`" class="mr-2 object-cover" size="large" shape="circle" />
                        <div class="flex flex-col gap-2 w-full">
                            <strong>{{ User?.name }}</strong>
                            <Rating v-model="cmtPayload.rating" />
                            <Textarea v-model="cmtPayload.content" auto-resize class="w-full"></Textarea>
                            <div class="flex justify-end">
                                <Button @click="confirmSubmit()" label="Gửi"></Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-for="(item, index) in MovieDetail?.comments" :key="index" class="flex flex-col gap-3">
                    <div class="flex gap-2 p-2">
                        <Avatar crossorigin="anonymous" :image="item.user?.thumbnail ? item.user?.thumbnail : `https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png`" class="mr-2 object-cover" size="large" shape="circle" />
                        <div class="flex flex-col gap-2">
                            <strong>{{ item.user?.name }}</strong>
                            <Rating v-model="item.rating" disabled />
                            <span>{{ item.content }}</span>
                        </div>
                    </div>
                    <hr />
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
        <Dialog v-model:visible="warnModal" modal header="Cảnh báo" :style="{ width: '25rem' }">
            Tài khoản của bạn không đủ, chuyển đến trang nạp tiền ?
            <template #footer>
                <div class="flex justify-end gap-2">
                    <Button type="button" label="Hủy" severity="secondary" @click="warnModal = false"></Button>
                    <Button type="button" label="Chuyển đến trang nạp tiền" @click="confirmDirect"></Button>
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
import { useRoute, useRouter } from 'vue-router';
const { proxy } = getCurrentInstance();
const toast = useToast();

const router = useRouter();
onMounted(() => {
    fetchDetail();
    GetMe();
});
const cmtPayload = ref({
    content: '',
    rating: 0
});
const clearCmtPayload = JSON.stringify(cmtPayload.value);

const User = ref();
const warnModal = ref(false);
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
const openBuyDlg = async () => {
    await GetMe();
    if (MovieDetail.value.price > 100) {
        return (warnModal.value = true);
    }
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
const confirmDirect = () => {
    router.push(`/add-price`);
};

const GetMe = async () => {
    try {
        const res = await API.get(`get-me`);
        User.value = res.data.metadata;
    } catch (error) {
        console.log(error);
    }
};
const confirmSubmit = async () => {
    try {
        const res = await API.create(`movie/${route.params.id}/comment`, cmtPayload.value);
        if (res.data) {
            fetchDetail();
            proxy.$notify('S', 'Thành công!', toast);
            cmtPayload.value = JSON.parse(clearCmtPayload);
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

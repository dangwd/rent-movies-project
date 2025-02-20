<template>
    <div v-if="MovieDetail">
        <div class="h-[100vh] bg-cover bg-[url(@/assets/img/banner.jpg)] bg-center bg-fixed relative">
            <div class="absolute inset-0 bg-black/30 backdrop-blur-md"></div>
            <div class="absolute top-40 h-[calc(100%-80px)] w-full">
                <div class="grid grid-cols-12 gap-5 container mx-auto left-0 right-0">
                    <div class="col-span-3 flex flex-col gap-3 w-full">
                        <img class="w-80 h-auto object-cover" src="https://image.tmdb.org/t/p/w342/6xuPvqv8VAsXXACCwLjUgsIDe05.jpg" alt="" />
                        <button class="border-2 hover:text-white duration-150 border-primary text-primary py-3 px-5 font-bold uppercase text-lg rounded-md hover-button-animation left">Xem ngay</button>
                    </div>
                    <div class="col-span-9 flex flex-col gap-4">
                        <h1 class="text-white text-7xl font-extrabold">The Gorge</h1>
                        <span class="text-white text-3xl">Hẻm núi (2025)</span>
                        <div class="flex gap-2">
                            <Badge value="Hành động"></Badge>
                            <Badge value="Giật gân"></Badge>
                            <Badge value="Lãng mạn"></Badge>
                        </div>
                        <div class="flex flex-col gap-2 text-white text-lg">
                            <div class="flex gap-2">
                                <div class="uppercase">Đạo diễn:</div>
                                <strong>Nguyễn Minh Đăng</strong>
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
                                Hai điệp viên được đào tạo bài bản (Miles Teller và Anya Taylor-Joy) được bổ nhiệm vào các vị trí trong tháp canh ở hai bên đối diện của một hẻm núi rộng lớn và được phân loại cao, bảo vệ thế giới khỏi một thế lực đen
                                tối bí ẩn chưa được tiết lộ ẩn núp bên trong. Họ gắn kết từ xa trong khi cố gắng cảnh giác để chống lại một kẻ thù vô hình. Khi mối đe dọa thảm khốc đối với nhân loại được tiết lộ với họ, họ phải cùng nhau làm việc
                                trong một thử thách về cả sức mạnh thể chất và tinh thần để giữ bí mật trong hẻm núi trước khi quá muộn.
                            </p>
                        </div>
                        <div class="flex flex-col gap-2 text-white text-lg">
                            <strong class="uppercase">Diễn viên</strong>
                            <div class="flex gap-8">
                                <div class="flex flex-col items-center gap-2">
                                    <img class="rounded-full w-32 h-32 object-cover" src="https://image.tmdb.org/t/p/w138_and_h175_face/cg3LW0xX6RKr8dmescxq1bepcb5.jpg" alt="" />
                                    <label for="">Miles Teller</label>
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <img class="rounded-full w-32 h-32 object-cover" src="https://image.tmdb.org/t/p/w138_and_h175_face/lcUwHeEaEEo2prfegN7q616Wp7E.jpg" alt="" />
                                    <label for="">Miles Teller</label>
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <img class="rounded-full w-32 h-32 object-cover" src="https://image.tmdb.org/t/p/w138_and_h175_face/ArRuSKwJJwr3venBPjwoukApa8j.jpg" alt="" />
                                    <label for="">Miles Teller</label>
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <img class="rounded-full w-32 h-32 object-cover" src="https://image.tmdb.org/t/p/w138_and_h175_face/j0ejU7vdE7lRxYKKrhA5aWw1zCT.jpg" alt="" />
                                    <label for="">Miles Teller</label>
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <img class="rounded-full w-32 h-32 object-cover" src="https://image.tmdb.org/t/p/w138_and_h175_face/grKtqA62ni9yBqGekfq3Aw1GM1o.jpg" alt="" />
                                    <label for="">Miles Teller</label>
                                </div>
                                <div class="flex flex-col items-center gap-2">
                                    <img class="rounded-full w-32 h-32 object-cover" src="https://image.tmdb.org/t/p/w138_and_h175_face/oTcw7AFY52UYyIjPLp9ZjySwivy.jpg" alt="" />
                                    <label for="">Miles Teller</label>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2 text-white text-lg">
                            <strong class="uppercase">Trailer</strong>
                            <div class="flex gap-8">
                                <iframe
                                    width="1000"
                                    height="563"
                                    src="https://www.youtube.com/embed/1-JIOWwU0Ws"
                                    title="The Gorge — ASMR with Miles Teller &amp; Anya Taylor-Joy | Apple TV+"
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
    </div>
</template>
<script setup>
import API from '@/api/api-main';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
onMounted(() => {
    fetchDetail();
});
const route = useRoute();

const MovieDetail = ref({});
const fetchDetail = async () => {
    try {
        const res = await API.get(`movie/${route.params.id}`);
        MovieDetail.value = res.data.metadata;
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

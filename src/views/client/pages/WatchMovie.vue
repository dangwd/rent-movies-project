<template>
    <div class="bg-cover h-screen mt-[-70px] bg-center bg-fixed relative overflow-auto">
        <div class="container mx-auto pt-40">
            <div class="grid grid-cols-12 gap-2">
                <div class="col-span-8 flex flex-col gap-5">
                    <video crossorigin="anonymous" controls :src="MovieDetail.videos ? MovieDetail.videos[0] : ``"></video>
                </div>
                <div class="col-span-4 bg-slate-800 card w-full">Phim đề xuất</div>
            </div>

            <label for="" class="text-white text-2xl">{{ MovieDetail.movieName }}</label>
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
<style></style>

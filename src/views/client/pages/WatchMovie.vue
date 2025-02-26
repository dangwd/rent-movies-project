<template>
    <div class="bg-cover text-white h-screen mt-[-70px] bg-center bg-fixed relative overflow-auto">
        <div class="container flex flex-col gap-3 mx-auto pt-40">
            <div class="grid grid-cols-12 gap-3">
                <div class="col-span-8 flex flex-col gap-5">
                    <video class="rounded-xl" crossorigin="anonymous" controls :src="MovieDetail.videos ? MovieDetail.videos[0] : ``"></video>
                </div>
                <div class="col-span-4 bg-slate-800 card w-full p-3 rounded-xl">
                    <div class="flex flex-col gap-3">
                        <strong class="text-xl">Phim cùng thể loại</strong>
                        <ScrollPanel
                            style="width: 100%; height: 390px"
                            :dt="{
                                bar: {
                                    background: '{primary.color}'
                                }
                            }"
                        >
                            <div class="flex flex-col gap-2">
                                <div v-for="(item, index) in moviesSuggest" :key="index" class="grid grid-cols-12 gap-3">
                                    <div class="col-span-3">
                                        <img class="w-60 h-auto" :src="item.images ? item.images[0] : ``" alt="" />
                                    </div>
                                    <div class="col-span-9 flex flex-col gap-2">
                                        <strong class="text-base">{{ item.movieName }}</strong>
                                        <div class="flex flex-wrap gap-2">
                                            <div v-for="(i, idx) in item.genre" :key="idx">
                                                <Tag severity="secondary" :value="i.genreName" rounded></Tag>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollPanel>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <label class="text-2xl font-semibold">{{ MovieDetail.movieName }}</label>
                <p class="text-lg">{{ MovieDetail.movieDescription }}</p>
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
    fetchMovieByType();
});
const route = useRoute();

const moviesSuggest = ref([]);
const MovieDetail = ref({});
const fetchDetail = async () => {
    try {
        const res = await API.get(`movie/${route.params.id}`);
        MovieDetail.value = res.data.metadata;
    } catch (error) {
        console.log(error);
    }
};

const fetchMovieByType = async () => {
    try {
        const res = await API.get(`movies`);
        moviesSuggest.value = res.data.metadata;
    } catch (error) {}
};
</script>
<style></style>

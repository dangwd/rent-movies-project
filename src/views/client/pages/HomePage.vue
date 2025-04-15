<script setup>
import API from '@/api/api-main';
import { onMounted, ref } from 'vue';
import SliderComp from '../components/SliderComp.vue';
import MovieLayout from '../layouts/MovieLayout.vue';
onMounted(() => {
    fetchAllMovieHanhDong();
    fetchAllMovieTinhCam();
    fetchAllMovieGiatGan();
    fetchAllActors();
});
const MoviesHanhDong = ref([]);
const MoviesTinhCam = ref([]);
const Actors = ref([]);

//hanhdong
const fetchAllMovieHanhDong = async () => {
    try {
        const res = await API.get(`movie/name/H%C3%A0nh%20%C4%91%E1%BB%99ng?skip=0&limit=30`);
        MoviesHanhDong.value = res.data.metadata;
    } catch (error) {
        console.log(error);
    }
};
//Tinh cam
const fetchAllMovieTinhCam = async () => {
    try {
        const res = await API.get(`movie/name/T%C3%ACnh%20c%E1%BA%A3m?skip=0&limit=30`);
        MoviesTinhCam.value = res.data.metadata;
    } catch (error) {
        console.log(error);
    }
};
//Giật gân
const fetchAllMovieGiatGan = async () => {
    try {
        const res = await API.get(`movie/name/Gi%E1%BA%ADt%20g%C3%A2n?skip=0&limit=30`);
        MoviesTinhCam.value = res.data.metadata;
    } catch (error) {
        console.log(error);
    }
};
const fetchAllActors = async () => {
    try {
        const res = await API.get(`actors`);
        Actors.value = res.data.metadata;
    } catch (error) {
        console.log(error);
    }
};
</script>
<template>
    <SliderComp></SliderComp>
    <div class="container mx-auto py-28">
        <span class="text-xl text-white uppercase font-bold">Phim hành động</span>

        <MovieLayout :data="MoviesHanhDong"></MovieLayout>
        <span class="text-xl text-white uppercase font-bold">Phim lẻ mới cập nhật</span>

        <MovieLayout :data="MoviesHanhDong"></MovieLayout>
        <span class="text-xl text-white uppercase font-bold">Phim tình cảm mới cập nhật</span>

        <MovieLayout :data="MoviesTinhCam"></MovieLayout>
        <span class="text-xl text-white uppercase font-bold">Những bộ phim giật gân...</span>

        <MovieLayout :data="MoviesHanhDong"></MovieLayout>
    </div>
</template>
<style scoped></style>

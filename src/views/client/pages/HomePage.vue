<script setup>
import API from '@/api/api-main';
import { onMounted, ref } from 'vue';
import SliderComp from '../components/SliderComp.vue';
import MovieLayout from '../layouts/MovieLayout.vue';
onMounted(() => {
    fetchAllMovie();
    fetchAllActors();
});
const Movies = ref([]);
const Actors = ref([]);
const fetchAllMovie = async () => {
    try {
        const res = await API.get(`movies`);
        Movies.value = res.data.metadata;
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
    <div class="container mx-auto py-10">
        <span class="text-xl uppercase font-bold">Phim đề cử</span>

        <MovieLayout :data="12"></MovieLayout>
    </div>
</template>
<style scoped></style>

<template>
    <div class="text-white container mx-auto py-10">
        <strong class="text-xl">Phim hot</strong>
        <MovieLayout :data="Movies"></MovieLayout>
    </div>
</template>
<script setup>
import API from '@/api/api-main';
import { onMounted, ref } from 'vue';
import MovieLayout from '../layouts/MovieLayout.vue';

const Movies = ref([]);

onMounted(() => {
    fetchMovies();
});
const fetchMovies = async () => {
    try {
        const res = await API.get(`movies`);
        Movies.value = res.data.metadata;
    } catch (error) {}
};
</script>
<style></style>

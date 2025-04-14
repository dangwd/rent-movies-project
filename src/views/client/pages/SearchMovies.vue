<template>
    <div class="container mx-auto h-auto flex flex-col gap-5 py-5">
        <IconField>
            <InputIcon class="pi pi-search" />
            <InputText v-model="value1" placeholder="Tìm kiếm phim..." class="w-full" />
        </IconField>
        <!-- <div class="card bg-slate-50 flex gap-2 shadow-md justify-between items-center rounded-xl">
            <div class="flex flex-col gap-2 w-full">
                <label class="text-base font-semibold">Loại phim: </label>
                <Dropdown placeholder="Chọn loại phim" v-model="filters.type"></Dropdown>
            </div>
            <div class="flex flex-col gap-2 w-full">
                <label class="text-base font-semibold">Thể loại:</label>
                <Dropdown placeholder="Chọn thể loại" v-model="filters.genres" optionLabel="genreName" :options="typeOpts"></Dropdown>
            </div>
            <div class="flex flex-col gap-2 w-full">
                <label class="text-base font-semibold">Quốc gia: </label>
                <Dropdown placeholder="Chọn quốc gia" :options="[]"></Dropdown>
            </div>
            <div class="flex flex-col gap-2 w-full">
                <label class="text-base font-semibold">Năm: </label>
                <Dropdown placeholder="Chọn năm ra mắt"></Dropdown>
            </div>

            <div class="flex flex-col gap-2 w-full">
                <label class="text-base font-semibold">Sắp xếp: </label>
                <Dropdown></Dropdown>
            </div>
        </div> -->
        <MovieLayout :data="Movies"></MovieLayout>
    </div>
</template>
<script setup>
import API from '@/api/api-main';
import { onMounted, reactive, ref } from 'vue';
import MovieLayout from '../layouts/MovieLayout.vue';
const typeOpts = ref([]);
const Movies = ref([]);
const filters = reactive({
    type: '',
    genres: '',
    contries: ''
});
onMounted(() => {
    fetchAllType();
    fetchMovies();
});

const fetchAllType = async () => {
    try {
        const res = await API.get(`genres`);
        typeOpts.value = res.data.metadata;
    } catch (error) {
        console.log(error);
    }
};
const fetchMovies = async () => {
    try {
        const res = await API.get(`movies`);
        Movies.value = res.data.metadata;
    } catch (error) {
        console.log(error);
    }
};
</script>
<style></style>

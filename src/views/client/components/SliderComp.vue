<template>
    <div class="relative">
        <SlidesItem></SlidesItem>
    </div>
</template>
<script setup>
import API from '@/api/api-main';
import { onMounted, reactive, ref } from 'vue';
import SlidesItem from './SlidesItem.vue';
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
const fetchMovies = async () => {
    try {
        const res = await API.get(`movies`);
        Movies.value = res.data.metadata;
        console.log(res);
    } catch (error) {
        console.log(error);
    }
};
const fetchAllType = async () => {
    try {
        const res = await API.get(`genres`);
        typeOpts.value = res.data.metadata;
    } catch (error) {}
};
</script>
<style scoped>
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

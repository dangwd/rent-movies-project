<template>
    <div class="flex justify-center bg-gray-500 h-screen">
        <!-- <VideoPlayComp :url="MovieDetail.videos ? MovieDetail.videos[0] : ``"></VideoPlayComp> -->

        <video crossorigin="anonymous" :src="MovieDetail.videos ? MovieDetail.videos[0] : ``"></video>
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

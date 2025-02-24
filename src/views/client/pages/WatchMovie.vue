<template>
    <div v-if="MovieDetail" class="flex flex-col gap-3 justify-center items-center bg-slate-800 h-screen">
        <!-- <VideoPlayComp :url="MovieDetail.videos ? MovieDetail.videos[0] : ``"></VideoPlayComp> -->

        <div>
            <video crossorigin="anonymous" controls :src="MovieDetail.videos ? MovieDetail.videos[0] : ``"></video>
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

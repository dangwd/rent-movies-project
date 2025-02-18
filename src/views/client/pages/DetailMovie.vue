<template>
    <div v-if="MovieDetail">
        <section>
            <div class="flex flex-col justify-between mt-4 bg-black/10 bg-blend-multiply rounded-3xl h-80 overflow-hidden bg-cover bg-center px-7 pt-4 pb-6 text-white" :style="{ backgroundImage: `url(${MovieDetail?.images[0]})` }">
                <div class="flex -space-x-1 items-center"></div>

                <div class="bg-gradient-to-r from-black/30 to-transparent -mx-7 -mb-6 px-7 pb-6 pt-2">
                    <span class="uppercase text-3xl font-semibold drop-shadow-lg">{{ MovieDetail?.movieName }}</span>
                    <div class="text-xs text-gray-200 mt-2">
                        <a href="">{{ MovieDetail?.genre.map((el) => el.genreName).join(', ') }}</a>
                    </div>
                    <div class="mt-4 flex space-x-3 items-center">
                        <router-link to="/watch/:id" class="px-5 py-2.5 bg-primary hover:bg-primary-700 rounded-lg text-xs inline-block">Watch</router-link>
                        <a href="#" class="p-2.5 bg-gray-800/80 rounded-lg hover:bg-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
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

<template>
    <div v-if="ActorDetail" class="container mx-auto py-10 h-auto text-white flex flex-col gap-3">
        <strong class="text-xl">Thông tin diễn viên</strong>
        <div class="grid grid-cols-12 gap-3">
            <div class="col-span-4 justify-items-center">
                <img class="w-40 rounded-full h-40 object-cover mb-2" :src="ActorDetail.images[0]" alt="" />
                <span class="text-lg">{{ ActorDetail.actorName }}</span>
            </div>
            <div class="col-span-8 flex flex-col gap-3">
                <div class="flex flex-col gap-2">
                    <strong class="text-lg" for="">Ngày sinh</strong>
                    <span>{{ format(ActorDetail.birthDay, 'dd/MM/yyyy') }}</span>
                </div>
                <div class="flex flex-col gap-2">
                    <strong class="text-lg" for="">Mô tả</strong>
                    <span>{{ ActorDetail.actorDescription }}</span>
                </div>
                <div class="flex flex-col gap-2">
                    <strong class="text-lg" for="">Các phim đã tham gia</strong>
                    <MovieLayout :data="Movies"></MovieLayout>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import API from '@/api/api-main';
import { format } from 'date-fns';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import MovieLayout from '../layouts/MovieLayout.vue';

const Movies = ref([]);

const ActorDetail = ref();
const route = useRoute();

onMounted(() => {
    fetchDetailActor();
});
const fetchDetailActor = async () => {
    try {
        const res = await API.get(`actor/${route.params.id}`);
        ActorDetail.value = res.data.metadata.data;
        Movies.value = res.data.metadata.movies;
    } catch (error) {}
};
</script>
<style></style>

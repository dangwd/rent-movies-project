<template>
    <router-link :to="`detail/${props.data._id}`" class="flex flex-col gap-3">
        <div>
            <img :src="props.data.images ? props.data.images[0] : `https://image.tmdb.org/t/p/w342/jbOSUAWMGzGL1L4EaUF8K6zYFo7.jpg`" class="rounded-t-md justify-center h-80 grid object-cover" />
        </div>
        <div class="flex flex-col">
            <span class="text-lg font-semibold">{{ props.data.movieName }}</span>
            <span class="text-base">Mufasa: The Lion King</span>
        </div>
    </router-link>
</template>
<script setup>
const props = defineProps(['data']);
</script>
<style></style>

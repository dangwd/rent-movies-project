<template>
    <div class="grid grid-cols-12 gap-4 py-10">
        <div v-for="(item, index) in props.data" class="col-span-3 flex flex-col">
            <MovieCard :new="props.new" :data="item"></MovieCard>
        </div>
    </div>
</template>

<script setup>
import MovieCard from '../components/MovieCard.vue';

const props = defineProps(['data', 'new']);
</script>
<style></style>

<template>
    <div class="flex flex-col gap-3 container mx-auto h-screen py-10">
        <strong class="text-white text-5xl">Nạp tiền tài khoản</strong>
        <InputNumber v-model="payload.price"></InputNumber>
        <Button label="Nạp" @click="ConfirmAdd()"></Button>
    </div>
</template>
<script setup>
import API from '@/api/api-main';
import { useToast } from 'primevue/usetoast';
import { getCurrentInstance, ref } from 'vue';
import { useRouter } from 'vue-router';
const { proxy } = getCurrentInstance();
const toast = useToast();
const router = useRouter();

const payload = ref({
    price: 0
});
const ConfirmAdd = async () => {
    try {
        const res = await API.create(`add-price`, payload.value);
        if (res.data.metadata.return_code == 2) {
            return proxy.$notify('E', res.data?.metadata?.return_message, toast);
        }
        window.open(res.data?.metadata?.order_url, '_blank');
    } catch (error) {
        console.log(error);
    }
};
</script>
<style></style>

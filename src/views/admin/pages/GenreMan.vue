<script setup>
import API from '@/api/api-main';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

onMounted(() => {
    fetchAllActors();
});

const toast = useToast();
const dt = ref();
const Actors = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const actorDetail = ref({});
const selectedProducts = ref();
const statuses = ref([
    {
        label: 'Hoạt động',
        value: true
    },
    {
        label: 'Dừng Hoạt động',
        value: false
    }
]);
const submitted = ref(false);

const fetchAllActors = async () => {
    try {
        const res = await API.get(`actors?skip=0&limit=20`);
        Actors.value = res.data.metadata;
    } catch (error) {
        console.log(error);
    }
};

function openNew() {
    actorDetail.value = {};
    submitted.value = false;
    productDialog.value = true;
}

function hideDialog() {
    productDialog.value = false;
    submitted.value = false;
}

function saveActor() {
    submitted.value = true;
}

const deleteActorDlg = (data) => {
    actorDetail.value = data;
    deleteProductDialog.value = true;
};

const confirmDeleteSelected = async () => {
    try {
        const res = await API.delete(`actor/${actorDetail.value._id}`);
        if (res.data) {
            deleteProductDialog.value = true;
        }
    } catch (error) {}
};

function deleteSelectedProducts() {
    Actors.value = Actors.value.filter((val) => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
}
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <strong class="text-lg">Thể loại</strong>
                </template>
                <template #end>
                    <Button label="Thêm mới" icon="pi pi-plus" @click="openNew" />
                </template>
            </Toolbar>

            <DataTable ref="dt" v-model:selection="selectedProducts" showGridlines :value="Actors" dataKey="id" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 25]">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Danh Sách Phim</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText class="w-[300px]" placeholder="Tìm kiếm phim theo tên..." />
                        </IconField>
                    </div>
                </template>
                <Column header="STT">
                    <template #body="sp">
                        {{ sp.index + 1 }}
                    </template>
                </Column>
                <Column field="movieName" header="Tên phim"></Column>

                <Column field="movieDescription" header="Mô tả"></Column>
                <Column field="placeOfBirth" header="Nơi sinh"></Column>
                <Column field="rating" header="Rate"></Column>
                <Column field="runTime" header="Thời lượng"></Column>
                <Column field="releaseDate" header="Ngày ra mắt"></Column>
                <Column field="budget" header="Thời lượng"></Column>
                <Column field="language" header="Ngôn ngữ"></Column>
                <Column field="" header="Thao tác">
                    <template #body="sp">
                        <div class="flex gap-2">
                            <Button @click="openNew" text icon="pi pi-eye"></Button>
                            <Button @click="deleteActorDlg(sp.data)" text icon="pi pi-trash" severity="danger"></Button>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Phim" :modal="true">
            <div class="flex flex-col gap-6">
                <img v-if="actorDetail.image" :src="`https://primefaces.org/cdn/primevue/images/product/${actorDetail.image}`" :alt="actorDetail.image" class="block m-auto pb-4" />
                <div>
                    <label for="name" class="block font-bold mb-3">Tên phim</label>
                    <InputText id="name" v-model.trim="actorDetail.name" required="true" autofocus :invalid="submitted && !actorDetail.name" fluid />
                    <small v-if="submitted && !actorDetail.name" class="text-red-500">Name is required.</small>
                </div>
                <div>
                    <label for="description" class="block font-bold mb-3">Mô tả</label>
                    <Textarea id="description" v-model="actorDetail.description" required="true" rows="3" cols="20" fluid />
                </div>
                <div>
                    <label for="inventoryStatus" class="block font-bold mb-3">Trạng thái</label>
                    <Select id="inventoryStatus" :options="statuses" optionLabel="label" placeholder="Chọn trạng thái" fluid></Select>
                </div>

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="price" class="block font-bold mb-3">Price</label>
                        <InputNumber id="price" v-model="actorDetail.price" mode="currency" currency="USD" locale="en-US" fluid />
                    </div>
                    <div class="col-span-6">
                        <label for="quantity" class="block font-bold mb-3">Quantity</label>
                        <InputNumber id="quantity" v-model="actorDetail.quantity" integeronly fluid />
                    </div>
                </div>
            </div>

            <template #footer>
                <Button label="Hủy" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Xác nhận" icon="pi pi-check" @click="saveActor" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Xác nhận" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="actorDetail"
                    >Xác nhận xóa <b>{{ actorDetail.actorName }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="Hủy" icon="pi pi-times" severity="secondary" @click="deleteProductDialog = false" />
                <Button label="Xác nhận" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="actorDetail">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog>
    </div>
</template>

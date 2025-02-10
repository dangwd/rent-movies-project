<script setup>
import API from '@/api/api-main';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

onMounted(() => {
    fetchAllActors();
});

const formData = new FormData();
const toast = useToast();
const dt = ref();
const Movies = ref();
const movieDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const movieDetail = ref({});
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
        const res = await API.get(`movies?skip=0&limit=20`);
        Movies.value = res.data.metadata;
    } catch (error) {
        console.log(error);
    }
};

function openNew() {
    movieDetail.value = {};
    submitted.value = false;
    movieDialog.value = true;
}

function hideDialog() {
    movieDialog.value = false;
    submitted.value = false;
}

const saveMovies = async () => {
    submitted.value = true;
    let data = { ...movieDetail.value };
    formData.append('items', JSON.stringify(data));
    try {
        const res = await API.create(`movie`, formData);
        console.log(res);
    } catch (error) {
        console.log(error);
    }
};

const deleteActorDlg = (data) => {
    movieDetail.value = data;
    deleteProductDialog.value = true;
};

const confirmDeleteSelected = async () => {
    try {
        const res = await API.delete(`movies/${movieDetail.value._id}`);
        if (res.data) {
            deleteProductDialog.value = true;
        }
    } catch (error) {}
};

function deleteSelectedProducts() {
    Movies.value = Movies.value.filter((val) => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
}
const Openfile = () => {
    document.querySelectorAll('.click-file')[0].click();
};
const UploadFileLocal = async (event, index) => {
    const file = event.target.files[0];
    formData.append('videos', file);
    document.querySelectorAll('.click-file')[index].value = '';
    // movieDetail.value.videos = URL.createObjectURL(file);
};
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <strong class="text-lg">Danh sách phim</strong>
                </template>
                <template #end>
                    <Button label="Thêm mới" icon="pi pi-plus" @click="openNew" />
                </template>
            </Toolbar>

            <DataTable ref="dt" v-model:selection="selectedProducts" showGridlines :value="Movies" dataKey="id" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 25]">
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

        <Dialog v-model:visible="movieDialog" :style="{ width: '450px' }" header="Phim" :modal="true">
            <div class="flex flex-col gap-6">
                <div>
                    <Button label="Tải lên" icon="pi pi-cloud-upload" class="btn-up-file" raised @click="Openfile(index)" />
                </div>
                <input type="file" class="hidden click-file" @change="UploadFileLocal($event, 0)" />
                <div>
                    <label for="name" class="block font-bold mb-3">Tên phim</label>
                    <InputText id="name" v-model.trim="movieDetail.movieName" required="true" autofocus :invalid="submitted && !movieDetail.movieName" fluid />
                    <small v-if="submitted && !movieDetail.movieName" class="text-red-500">movieName is required.</small>
                </div>
                <div>
                    <label for="movieDescription" class="block font-bold mb-3">Mô tả</label>
                    <Textarea id="movieDescription" v-model="movieDetail.movieDescription" required="true" rows="3" cols="20" fluid />
                </div>
            </div>

            <template #footer>
                <Button label="Hủy" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Xác nhận" icon="pi pi-check" @click="saveMovies" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Xác nhận" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="movieDetail"
                    >Xác nhận xóa <b>{{ movieDetail.actorName }}</b
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
                <span v-if="movieDetail">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import API from '@/api/api-main';
import { formatPrice } from '@/helper/formatPrice';
import { format } from 'date-fns';
import { useToast } from 'primevue/usetoast';
import { getCurrentInstance, onMounted, ref } from 'vue';
const { proxy } = getCurrentInstance();
const toast = useToast();

onMounted(() => {
    fetchAllSeries();
    fetchAllMovies();
});

const Movies = ref([]);
const moviesModal = ref(false);
const dt = ref();
const Series = ref();
const seriesDialog = ref(false);
const deleteProductDialog = ref(false);
const seriesDetail = ref({
    title: '',
    description: '',
    genre: 'string',
    episodes: ['']
});
const selectedMovies = ref();

const submitted = ref(false);

const fetchAllSeries = async () => {
    try {
        const res = await API.get(`series?skip=0&limit=20`);
        Series.value = res.data.metadata;
    } catch (error) {
        console.log(error);
    }
};

const openNew = async (data) => {
    if (!data._id) {
        seriesDialog.value = true;
        return (seriesDetail.value = {});
    }
    try {
        const res = await API.get(`series/${data._id}`);
        seriesDetail.value = res.data.metadata;
    } catch (error) {
        console.log(error);
    }
    submitted.value = false;
    seriesDialog.value = true;
};

function hideDialog() {
    seriesDialog.value = false;
    submitted.value = false;
}

const saveSeries = async () => {
    let data = { ...seriesDetail.value };
    let API_EP = data._id ? `series/${data._id}` : `series`;
    let FUNC_API = data._id ? API.updatev2(API_EP, data) : API.create(API_EP, data);
    submitted.value = true;
    try {
        const res = await FUNC_API;
        if (res.data) {
            seriesDialog.value = false;
            proxy.$notify('S', 'Thành công!', toast);
            fetchAllSeries();
        }
    } catch (error) {
        console.log(error);
    }
};

const deleteActorDlg = (data) => {
    seriesDetail.value = data;
    deleteProductDialog.value = true;
};

const confirmDeleteSelected = async () => {
    try {
        const res = await API.delete(`genre/${seriesDetail.value._id}`);
        if (res) {
            proxy.$notify('S', 'Thành công!', toast);
            deleteProductDialog.value = false;
        }
    } catch (error) {
        console.log(error);
    }
};
const addMovieDlg = () => {
    moviesModal.value = true;
};
const fetchAllMovies = async () => {
    try {
        const res = await API.get(`movies?skip=0&limit=20`);
        Movies.value = res.data.metadata;
    } catch (error) {
        console.log(error);
    }
};
const confirmSelected = () => {
    seriesDetail.value.episodes = [...selectedMovies.value.map((el) => el._id)];
    proxy.$notify('S', 'Thêm thành công!', toast);
    moviesModal.value = false;
};
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <strong class="text-lg">Series</strong>
                </template>
                <template #end>
                    <Button label="Thêm mới" icon="pi pi-plus" @click="openNew" />
                </template>
            </Toolbar>

            <DataTable ref="dt" v-model:selection="selectedMovies" showGridlines resizableColumns columnResizeMode="fit" :value="Series" dataKey="id" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 25]">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Danh Sách Series</h4>
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
                <Column field="title" header="Tên Series"></Column>
                <Column field="episodes" header="Số tập/ Phần">
                    <template #body="{ data }">
                        <div class="line-clamp-3">
                            {{ data.episodes?.length }}
                        </div>
                    </template>
                </Column>
                <Column field="description" style="max-width: 200px" header="Mô tả">
                    <template #body="{ data }">
                        <div class="line-clamp-3">
                            {{ data.description }}
                        </div>
                    </template>
                </Column>
                <Column field="" header="Thao tác">
                    <template #body="sp">
                        <div class="flex gap-2">
                            <Button @click="openNew(sp.data)" text icon="pi pi-eye"></Button>
                            <Button @click="deleteActorDlg(sp.data)" text icon="pi pi-trash" severity="danger"></Button>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="seriesDialog" :style="{ width: '450px' }" header="Thể loại" :modal="true">
            <div class="flex flex-col gap-6">
                <div>
                    <label for="name" class="block font-bold mb-3">Tên Series Phim</label>
                    <InputText id="name" v-model.trim="seriesDetail.title" required="true" autofocus fluid />
                </div>
                <div>
                    <label for="name" class="block font-bold mb-3">Thể loại</label>
                    <InputText id="name" v-model.trim="seriesDetail.genre" required="true" autofocus fluid />
                </div>
                <div>
                    <label for="description" class="block font-bold mb-3">Mô tả</label>
                    <Textarea id="description" v-model="seriesDetail.description" required="true" rows="3" cols="20" fluid />
                </div>
                <div class="flex flex-col gap-3">
                    <label class="block font-bold" for="episodes">Episodes</label>
                    <Button @click="addMovieDlg" label="Thêm tập"></Button>
                </div>
            </div>

            <template #footer>
                <Button label="Hủy" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Xác nhận" icon="pi pi-check" @click="saveSeries" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Xác nhận" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="seriesDetail"
                    >Xác nhận xóa <b>{{ seriesDetail.title }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="Hủy" icon="pi pi-times" severity="secondary" @click="deleteProductDialog = false" />
                <Button label="Xác nhận" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" />
            </template>
        </Dialog>

        <Dialog v-model:visible="moviesModal" :style="{ width: '80%' }" header="Danh sách phim" :modal="true">
            <DataTable ref="dt" v-model:selection="selectedMovies" showGridlines :value="Movies" dataKey="_id" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 25]">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText class="w-[300px]" placeholder="Tìm kiếm phim theo tên..." />
                        </IconField>
                    </div>
                </template>
                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column header="STT">
                    <template #body="sp">
                        {{ sp.index + 1 }}
                    </template>
                </Column>
                <Column field="movieName" header="Tên phim"></Column>
                <Column field="movieDescription" style="max-width: 400px" header="Mô tả">
                    <template #body="sp">
                        <div class="line-clamp-3">
                            {{ sp.data.movieDescription }}
                        </div>
                    </template>
                </Column>
                <Column field="rating" header="Rate"></Column>
                <Column field="releaseDate" header="Ngày ra mắt">
                    <template #body="sp">
                        {{ format(new Date(sp.data.releaseDate), 'dd/MM/yyyy') }}
                    </template>
                </Column>
                <Column field="budget" header="Ngân sách">
                    <template #body="sp">
                        {{ formatPrice(sp.data.budget) }}
                    </template>
                </Column>
                <Column field="language" header="Ngôn ngữ">
                    <template #body="sp">
                        {{ sp.data.language.map((el) => el.name).join(', ') }}
                    </template>
                </Column>
            </DataTable>
            <template #footer>
                <Button label="Hủy" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Xác nhận" icon="pi pi-check" @click="confirmSelected" />
            </template>
        </Dialog>
    </div>
</template>

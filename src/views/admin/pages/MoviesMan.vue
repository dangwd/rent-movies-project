<script setup>
import API from '@/api/api-main';
import VideoPlayComp from '@/components/VideoPlayComp.vue';
import { format } from 'date-fns';
import { useToast } from 'primevue/usetoast';
import { getCurrentInstance, onMounted, ref } from 'vue';
const { proxy } = getCurrentInstance();
onMounted(() => {
    fetchAllLanguage();
    fetchAllGenre();
    fetchAllMovies();
    fetchAllActors();
});
const Languages = ref([]);
const Actors = ref([]);
const formData = new FormData();
const toast = useToast();
const dt = ref();
const Movies = ref();
const premium = ref(false);
const movieDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const typeMovies = ref(true);
const movieDetail = ref({});
const selectedProducts = ref();
const submitted = ref(false);
const GenreOpts = ref([]);
const fetchAllMovies = async () => {
    try {
        const res = await API.get(`movies?skip=0&limit=20`);
        Movies.value = res.data.metadata;
    } catch (error) {
        console.log(error);
    }
};
const fetchAllGenre = async () => {
    try {
        const res = await API.get(`genres?skip=0&limit=20`);
        GenreOpts.value = res.data.metadata;
    } catch (error) {
        console.log(error);
    }
};
const fetchAllActors = async () => {
    try {
        const res = await API.get(`actors?skip=0&limit=20`);
        Actors.value = res.data.metadata;
    } catch (error) {
        console.log(error);
    }
};
const openNew = async (data = '') => {
    movieDetail.value = {};
    if (data) {
        try {
            const res = await API.get(`movie/${data._id}`);
            movieDetail.value = res.data.metadata;
            // movieDetail.value.genre = res.data.metadata.genre.join('');
        } catch (error) {
            console.log(error);
        }
    }

    submitted.value = false;
    movieDialog.value = true;
};

function hideDialog() {
    movieDialog.value = false;
    submitted.value = false;
}
const formatPrice = (price) => {
    return Intl.NumberFormat().format(price);
};
const saveMovies = async () => {
    submitted.value = true;
    let data = { ...movieDetail.value };
    formData.append('items', JSON.stringify(data));
    let url = data._id ? API.updatev2(`movie/${data._id}`, formData) : API.create(`movie`, formData);
    try {
        const res = await url;
        if (res) {
            proxy.$notify('S', 'Thành công!', toast);
            movieDialog.value = false;
        }
    } catch (error) {
        console.log(error);
    } finally {
        formData.delete('items');
        formData.delete('images');
        formData.delete('videos');
        formData.delete('trailer');
        fetchAllMovies();
    }
};

const deleteActorDlg = (data) => {
    movieDetail.value = data;
    deleteProductDialog.value = true;
};

const confirmDeleteSelected = async () => {
    try {
        const res = await API.delete(`movie/${movieDetail.value._id}`);
        if (res.data) {
            fetchAllMovies();
            proxy.$notify('S', 'Thành công!', toast);
            deleteProductDialog.value = false;
        }
    } catch (error) {
        console.log(error);
    }
};
const fetchAllLanguage = async () => {
    try {
        const res = await API.get(`languages?skip=0&limit=1000000`);
        Languages.value = res.data.metadata;
    } catch (error) {
        console.log(error);
    }
};
function deleteSelectedProducts() {
    Movies.value = Movies.value.filter((val) => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
}
const Openfile = () => {
    document.querySelectorAll('.click-file')[0].click();
};
const Openfile1 = () => {
    document.querySelectorAll('.click-thumbnail')[0].click();
};
const Openfile2 = () => {
    document.querySelectorAll('.click-trailer')[0].click();
};
const UploadFileLocal = async (event, index) => {
    const file = event.target.files[0];
    formData.append('videos', file);
    document.querySelectorAll('.click-file')[index].value = '';
};
const UploadThumbnail = async (event, index) => {
    const file = event.target.files[0];
    formData.append('images', file);
    document.querySelectorAll('.click-thumbnail')[index].value = '';
};
const UploadTrailer = async (event, index) => {
    const file = event.target.files[0];
    formData.append('trailer', file);
    document.querySelectorAll('.click-trailer')[index].value = '';
};
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <strong @click="typeMovies = true" :class="{ 'text-primary': typeMovies }" class="text-lg cursor-pointer">Danh sách phim lẻ</strong>
                    <strong class="text-lg px-2">|</strong>
                    <strong @click="typeMovies = false" :class="{ 'text-primary': !typeMovies }" class="text-lg cursor-pointer">Danh sách phim bộ</strong>
                </template>
                <template #end>
                    <Button v-if="typeMovies" label="Thêm mới phim lẻ" icon="pi pi-plus" @click="openNew()" />
                    <Button v-else label="Thêm mới phim bộ" icon="pi pi-plus" @click="openNewGroupMovies()" />
                </template>
            </Toolbar>
            <DataTable ref="dt" v-model:selection="selectedProducts" showGridlines :value="Movies" dataKey="id" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 25]">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">{{ typeMovies ? `Danh Sách Phim Lẻ` : `Danh Sách Phim Bộ` }}</h4>
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

        <Dialog v-model:visible="movieDialog" :style="{ width: '60%' }" header="Phim" :modal="true">
            <div class="flex flex-col gap-3">
                <div class="grid grid-cols-12 gap-6">
                    <div class="col-span-6">
                        <div class="flex flex-col gap-3">
                            <div class="flex flex-col gap-2">
                                <label for="name" class="block font-bold">Tên phim</label>
                                <InputText id="name" v-model.trim="movieDetail.movieName" required="true" autofocus :invalid="submitted && !movieDetail.movieName" fluid />
                                <small v-if="submitted && !movieDetail.movieName" class="text-red-500">movieName is required.</small>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="name" class="block font-bold"> Ngày ra mắt</label>
                                <Calendar v-model="movieDetail.releaseDate"></Calendar>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="name" class="block font-bold"> Ngân sách</label>
                                <InputText v-model="movieDetail.budget"></InputText>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="name" class="block font-bold"> Doanh thu</label>
                                <InputText v-model="movieDetail.revenue"></InputText>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-6">
                        <div class="flex flex-col gap-3">
                            <div class="flex flex-col gap-2">
                                <label for="name" class="block font-bold">Ngôn ngữ</label>
                                <MultiSelect v-model="movieDetail.language" :options="Languages" optionLabel="name" optionValue="_id" filter placeholder="Chọn ngôn ngữ" :maxSelectedLabels="3" class="w-full" />
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="name" class="block font-bold">Thể loại</label>
                                <MultiSelect v-model="movieDetail.genre" :options="GenreOpts" optionLabel="genreName" optionValue="_id" filter placeholder="Chọn thể loại" :maxSelectedLabels="3" class="w-full" />
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="name" class="block font-bold">Diễn viên</label>
                                <MultiSelect v-model="movieDetail.actors" :options="Actors" optionLabel="actorName" optionValue="_id" filter placeholder="Chọn diễn viên" :maxSelectedLabels="3" class="w-full" />
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="movieDescription" class="block font-bold">Mô tả</label>
                                <Textarea id="movieDescription" autoResize v-model="movieDetail.movieDescription" required="true" rows="3" cols="20" fluid />
                            </div>
                            <div class="flex gap-2">
                                <Checkbox v-model="premium" binary></Checkbox>
                                <label for="movieDescription" class="block font-bold">Premium</label>
                            </div>
                            <div v-if="premium" class="flex flex-col gap-2">
                                <label for="movieDescription" class="block font-bold">Giá tiền</label>
                                <InputNumber v-model="movieDetail.price" :min="0"></InputNumber>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-3">
                    <div class="flex justify-between items-center gap-2 border border-gray-300 p-3 rounded-xl">
                        <label class="block font-bold">Thumbnail</label>
                        <div v-if="movieDetail.images">
                            <img class="w-52 h-72 object-contain" :src="movieDetail.images ? movieDetail.images[0] : 'https://placehold.co/400x600'" alt="" />
                        </div>
                        <div>
                            <Button label="Tải lên" icon="pi pi-cloud-upload" class="btn-up-file" raised @click="Openfile1(index)" />
                            <input type="file" class="hidden click-thumbnail" @change="UploadThumbnail($event, 0)" />
                        </div>
                    </div>
                    <div class="flex justify-between items-center gap-2 border border-gray-300 p-3 rounded-xl">
                        <label class="block font-bold">Phim</label>
                        <div class="w-72" v-if="movieDetail?.videos">
                            <VideoPlayComp :url="movieDetail?.videos ? movieDetail?.videos[0] : ''"></VideoPlayComp>
                        </div>
                        <div>
                            <Button label="Tải lên" icon="pi pi-cloud-upload" class="btn-up-file" raised @click="Openfile(index)" />
                            <input type="file" class="hidden click-file" @change="UploadFileLocal($event, 0)" />
                        </div>
                    </div>
                    <div class="flex justify-between items-center gap-2 border border-gray-300 p-3 rounded-xl">
                        <label class="block font-bold">Thumbnail 2</label>
                        <div class="w-72" v-if="movieDetail?.trailer">
                            <VideoPlayComp :url="movieDetail?.trailer ? movieDetail?.trailer[0] : ''"></VideoPlayComp>
                        </div>
                        <div>
                            <Button label="Tải lên" icon="pi pi-cloud-upload" class="btn-up-file" raised @click="Openfile2(index)" />
                            <input type="file" class="hidden click-trailer" @change="UploadTrailer($event, 0)" />
                        </div>
                    </div>
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
                    >Xác nhận xóa <b>{{ movieDetail.movieName }}</b
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

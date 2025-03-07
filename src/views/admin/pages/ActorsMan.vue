<script setup>
import API from '@/api/api-main';
import parseDateSafely from '@/service/parseDate';
import { format } from 'date-fns';
import { useToast } from 'primevue/usetoast';
import { getCurrentInstance, onMounted, ref } from 'vue';
const { proxy } = getCurrentInstance();
const toast = useToast();

onMounted(() => {
    fetchAllActors();
});

const formData = new FormData();
const dt = ref();
const Actors = ref();
const actorDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const actorDetail = ref({});
const selectedProducts = ref();
const statusOpts = ref([
    {
        name: 'Hoạt động',
        value: 'active'
    },
    {
        name: 'Dừng Hoạt động',
        value: 'inactive'
    },
    {
        name: 'Đã xóa',
        value: 'deleted'
    }
]);
const typeActOpts = ref([
    {
        label: 'Đạo diễn',
        value: 'D'
    },
    {
        label: 'Diễn viên',
        value: 'A'
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

const openNew = async (data) => {
    actorDetail.value = {};
    if (data) {
        try {
            const res = await API.get(`actor/${data._id}`);
            actorDetail.value = res.data.metadata;
            actorDetail.value.birthDay = format(actorDetail.value.birthDay, 'dd/MM/yyyy');
        } catch (error) {
            console.log(error);
        }
    }
    submitted.value = false;
    actorDialog.value = true;
};

function hideDialog() {
    actorDialog.value = false;
    submitted.value = false;
}

const saveActor = async () => {
    submitted.value = true;
    actorDetail.value.birthDay = actorDetail.value.birthDay ? parseDateSafely(actorDetail.value.birthDay) : null;
    let data = { ...actorDetail.value };
    if (data._id) {
        delete actorDetail.value.images;
    }
    let URL_ENDPOINT = data._id ? `actor/${data._id}` : `actor`;
    formData.append('items', JSON.stringify(data));
    let FUNC_API = data._id ? API.updatev2(URL_ENDPOINT, formData) : API.create(URL_ENDPOINT, formData);
    try {
        const res = await FUNC_API;
        if (res.data) {
            fetchAllActors();
            proxy.$notify('S', 'Thao tác thành công!', toast);
            actorDialog.value = false;
        }
    } catch (error) {
        console.log(error);
    } finally {
        formData.delete('items');
        formData.delete('images');
    }
};

const deleteActorDlg = (data) => {
    actorDetail.value = data;
    deleteProductDialog.value = true;
};

const confirmDeleteSelected = async () => {
    try {
        const res = await API.delete(`actor/${actorDetail.value._id}`);
        if (res.data) {
            fetchAllActors();
            deleteProductDialog.value = false;
            proxy.$notify(`S`, 'Thành công!', toast);
        }
    } catch (error) {}
};
const Openfile = () => {
    document.querySelectorAll('.click-file')[0].click();
};
const UploadFileLocal = async (event, index) => {
    const file = event.target.files[0];
    formData.append('images', file);
    document.querySelectorAll('.click-file')[index].value = '';
    actorDetail.value.files = URL.createObjectURL(file);
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
                    <strong class="text-lg">Diễn viên</strong>
                </template>
                <template #end>
                    <Button label="Thêm mới" icon="pi pi-plus" @click="openNew()" />
                </template>
            </Toolbar>

            <DataTable ref="dt" v-model:selection="selectedProducts" showGridlines :value="Actors" dataKey="id" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 25]">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Danh Sách Diễn Viên</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText class="w-[300px]" placeholder="Tìm kiếm diễn viên theo tên..." />
                        </IconField>
                    </div>
                </template>
                <template #empty>
                    <div class="text-center p-2">Không có bản ghi nào</div>
                </template>
                <Column header="STT">
                    <template #body="sp">
                        {{ sp.index + 1 }}
                    </template>
                </Column>
                <Column field="actorName" header="Tên diễn viên"></Column>
                <Column field="images" header="Ảnh">
                    <template #body="sp">
                        <Image crossorigin="anonymous" :src="sp.data.images[0] || `https://placehold.co/50x50`" alt="Image" width="50" />
                    </template>
                </Column>

                <Column field="actorDescription" style="max-width: 200px" header="Mô tả">
                    <template #body="sp">
                        <div class="line-clamp-2">
                            {{ sp.data.actorDescription }}
                        </div>
                    </template>
                </Column>
                <Column field="placeOfBirth" header="Nơi sinh"></Column>
                <Column field="birthDay" header="Ngày sinh">
                    <template #body="sp">
                        {{ format(sp.data.birthDay, 'dd/MM/yyyy') }}
                    </template>
                </Column>
                <Column field="status" header="Trạng thái">
                    <template #body="sp">
                        {{ sp.data.status === 'active' ? `Hoạt động` : `Dừng hoạt động` }}
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

        <Dialog v-model:visible="actorDialog" :style="{ width: '70%' }" header="Diễn viên" :modal="true">
            <div class="grid grid-cols-12">
                <div class="col-span-4">
                    <div class="flex flex-col items-center gap-2">
                        <div class="rounded-full">
                            <Image crossorigin="anonymous" :src="actorDetail?.images ? actorDetail?.images[0] : `https://placehold.co/200x200`" alt="Image" width="200" />
                        </div>
                        <div>
                            <Button label="Chọn ảnh" icon="pi pi-cloud-upload" class="btn-up-file" raised @click="Openfile(index)" />
                        </div>
                        <input type="file" class="hidden click-file" @change="UploadFileLocal($event, 0)" />
                    </div>
                </div>
                <div class="col-span-8 grid grid-cols-2 gap-2">
                    <div class="flex flex-col gap-6">
                        <div>
                            <label for="name" class="block font-bold mb-3">Tên diễn viên / đạo diễn</label>
                            <InputText id="name" v-model="actorDetail.actorName" required="true" autofocus :invalid="submitted && !actorDetail.actorName" fluid />
                            <small v-if="submitted && !actorDetail.actorName" class="text-red-500">actorName is required.</small>
                        </div>
                        <div>
                            <label for="description" class="block font-bold mb-3">Ngày sinh</label>
                            <DatePicker v-model="actorDetail.birthDay" rows="3" cols="20" fluid />
                        </div>
                        <div>
                            <label for="description" class="block font-bold mb-3">Nơi sinh</label>
                            <InputText v-model="actorDetail.placeOfBirth" required="true" rows="3" cols="20" fluid />
                        </div>
                    </div>
                    <div class="flex flex-col gap-6">
                        <div>
                            <label for="name" class="block font-bold mb-3">Loại</label>

                            <Dropdown class="w-full" v-model="actorDetail.type" optionValue="value" optionLabel="label" :options="typeActOpts"></Dropdown>
                        </div>
                        <div>
                            <label for="description" class="block font-bold mb-3">Trạng thái</label>
                            <Dropdown :options="statusOpts" optionLabel="name" optionValue="value" v-model="actorDetail.status" class="w-full"></Dropdown>
                        </div>
                        <div>
                            <label for="description" class="block font-bold mb-3">Mô tả</label>
                            <Textarea v-model="actorDetail.actorDescription" required="true" rows="3" cols="20" fluid />
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <Button label="Hủy" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Xác nhận" icon="pi pi-check" @click="saveActor()" />
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

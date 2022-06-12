<template>

    <div class="flex items-center justify-between my-8">
        <button @click="$router.go(-1)" class="flex items-center justify-between px-4 py-2 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-500 border border-transparent rounded-lg active:bg-purple-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple">
            <i class="fas fa-arrow-circle-left m-1"></i>
            <span>Back</span>
        </button>

        <h2 class="my-6 text-lg font-semibold text-gray-700 md:text-2xl dark:text-gray-200">Manage Unit From {{ this.nameGroup }}
        </h2>

        <!-- ปุ่มเพิ่มข้อมูล -->
        <button @click="openModalAdd" class="flex items-center justify-between px-4 py-2 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-500 border border-transparent rounded-lg active:bg-purple-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-purple">
            <svg class="w-4 h-4 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>ADD</span>
        </button>
    </div>

    <!-- ตารางแสดงข้อมูล -->
    <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto">
            <table class="w-full whitespace-no-wrap">
                <thead>
                    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th class="px-4 py-3">Id</th>
                        <th class="px-4 py-3">Group Name</th>
                        <th class="px-4 py-3">Unit Name</th>
                        <th class="px-4 py-3">Manage</th>
                    </tr>
                </thead>

                <tbody v-for="item in itemUnit" :key="item._id" class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    <tr @dblclick="onNextConversion(item.unit_name, this.groupId, item._id)" v-if="item.status === 'active' && item.group_id === this.groupId" class="cursor-pointer text-gray-700 dark:text-gray-400 hover:bg-blue-100">
                        <td class="px-4 py-3 text-md">{{ item._id }}</td>
                        <td class="px-4 py-3 text-md">{{ item.fromGroup[0].group_name }}</td>
                        <td class="px-4 py-3 text-md">{{ item.unit_name }}</td>
                        <td class="px-4 py-3 text-md">
                            <button @click="openModalEdit(item._id)" class="px-4 py-2 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-yellow-400 border border-transparent rounded-lg active:bg-purple-600 hover:bg-yellow-500 focus:outline-none focus:shadow-outline-purple">
                                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                            <button @click="onclickDelete(item._id, item.unit_name)" class="px-4 py-2 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-purple">
                                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </td>
                    </tr>

                </tbody>
            </table>
            
        </div>
    </div>

    <!-- Popup สำหรับเพิ่มรายการข้อมูลใหม่ -->
    <div v-if="showAddModal" class="fixed top-0 left-0 flex items-center justify-center w-full h-full modal">
        <div class="absolute w-full h-full bg-gray-900 opacity-70 modal-overlay"></div>
         <div class="z-50 w-11/12 p-5 mx-auto overflow-y-auto bg-white rounded shadow-lg h-4/5 modal-container md:max-w-md">
            <!-- Header -->
            <div class="flex items-center justify-center w-full h-auto mt-4">
                <div class="flex items-start justify-start w-full h-auto py-2 text-xl font-bold">
                    <i class="fas fa-clipboard-list mr-5"></i> Add new unit information
                </div>
                <div @click="closeModalAdd" class="flex justify-center w-1/12 h-auto cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
            <!--Header End-->
            </div>
            <!-- Modal Content-->
            <div class="w-full h-auto mt-10 mb-4">
                <form ref="addRequestFrom" @submit.prevent="onSubmit" enctype="multipart/form-data" >
                    <label class="block my-3 text-gray-700 text-md" for="formAdd.unit">* Unit Name</label>
                    <input v-model="formAdd.unit" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="text" placeholder="Enter unit name">
                    <div v-if="v$.formAdd.unit.$error" class="mt-2 text-sm text-red-500"> {{ v$.formAdd.unit.$errors[0].$message }}</div>
                </form>
                <div class="grid grid-cols-3 gap-4 mt-20">
                    <div class="col-span-2">
                        <button @click="submitForm" id="btnSave" class="w-full px-4 py-2 mt-4 font-medium leading-5 text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg text-md active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-purple">
                            <i class="fas fa-save"></i> Save
                        </button>
                    </div>
                    <div>
                        <button @click="onResetFormAdd" class="w-full px-4 py-2 mt-4 font-medium leading-5 text-white transition-colors duration-150 bg-gray-500 border border-transparent rounded-lg text-md active:bg-purple-600 hover:bg-gray-700 focus:outline-none focus:shadow-outline-purple">
                            <i class="fas fa-recycle"></i> Clear
                        </button>
                    </div>
                </div>
            </div>
         </div>
    </div>

    <!-- Popup สำหรับการแก้ไขรายการข้อมูล -->
    <div v-if="showEditModal" class="fixed top-0 left-0 flex items-center justify-center w-full h-full modal">
        <div class="absolute w-full h-full bg-gray-900 opacity-70 modal-overlay"></div>

         <div class="z-50 w-11/12 p-5 mx-auto overflow-y-auto bg-white rounded shadow-lg h-5/6 modal-container md:max-w-md">
            <!-- Header -->
            <div class="flex items-center mt-4 justify-center w-full h-auto">
                <div class="flex items-start justify-start w-full h-auto py-2 text-xl font-bold">
                     <i class="fas fa-clipboard-list mr-5"></i> Edit unit information
                </div>
                <div @click="closeModalEdit" class="flex justify-center w-1/12 h-auto cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
            <!--Header End-->
            </div>
            <!-- Modal Content-->
            <div class="w-full h-auto mt-10 mb-4">

                <form ref="editRequestFrom" @submit.prevent="onSubmit" enctype="multipart/form-data">
                    <label class="block my-3 text-gray-700 text-md" for="formEdit.unit">* Unit Name</label>
                    <input v-model="formEdit.unit" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="text" placeholder="Enter unit name">
                    <div v-if="v$.formEdit.unit.$error" class="mt-2 text-sm text-red-500"> {{ v$.formEdit.unit.$errors[0].$message }}</div>
                </form>

                <button @click="submitFormEdit(formEdit.id)" id="btnEdit" class="w-full mt-20 px-4 py-2 font-medium leading-5 text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg text-md active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-purple">
                        Update
                </button>
               
            </div>
            <!-- End of Modal Content-->
            </div>
    </div>

</template>

<script>
import http from '@/services/BackendService'
import useValidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

export default {
    data(){
        return { 
            v$: useValidate(), 
            nameGroup: '',
            groupId: '',
            itemUnit: [],
            showAddModal: false,
            showEditModal: false,
            formAdd: {
                unit: ''
            },
            formEdit: {
                id: '',
                unit: ''
            }
        }
    },

    methods: {
        async getUnit() {
            let res = await http.get('unit/join/group')
            this.itemUnit = res.data.data
        },
        openModalAdd() {
            this.showAddModal = true
        },
        closeModalAdd() {
            this.showAddModal = false
            this.onResetFormAdd()
        },
        onResetFormAdd() {
            this.$refs.addRequestFrom.reset()
            this.formAdd.unit = ''
        },
        submitForm() 
        {
            document.getElementById("btnSave").disabled = true
            this.v$.$validate() 
            if(!this.v$.formAdd.$error) { 
                http.post('unit', {
                    unit_name: this.formAdd.unit,
                    group_id: this.groupId
                }).then((res)=>{
                    console.log(res)
                    document.getElementById("btnSave").disabled = false
                    this.closeModalAdd()
                    this.getUnit()

                    const Toast = this.$swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', this.$swal.stopTimer)
                            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: 'Successfully added new information'
                    })
                }).catch(error => {
                    document.getElementById("btnSave").disabled = false
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                });
            }else{
                document.getElementById("btnSave").disabled = false
            }
        },

        openModalEdit(id)
        {
            console.log(id);
            http.get(`unit/${id}`).then(response => {
                this.formEdit.id = response.data.data[0]._id
                this.formEdit.unit = response.data.data[0].unit_name
                this.formEdit.groupId = response.data.data[0].group_id

                this.showEditModal = true
            })
        },
        closeModalEdit()
        {
            this.showEditModal = false
            this.onResetFormEdit()
        },
        onResetFormEdit() {
            this.$refs.editRequestFrom.reset()
            this.formEdit.unit = ''
        },
        submitFormEdit(id)
        {
            document.getElementById("btnEdit").disabled = true
            this.v$.$validate()
            if(!this.v$.formEdit.$error)
            {
                http.put(`unit/${id}`, {
                    unit_name: this.formEdit.unit,
                    group_id: this.groupId
                }).then(response => {
                    console.log(response.data)
                    const Toast = this.$swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', this.$swal.stopTimer)
                            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'update success...'
                    }).then(()=>{
                        document.getElementById("btnEdit").disabled = false
                        this.getUnit()
                        this.closeModalEdit()
                    })

                }).catch(error => {
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)

                    this.$swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: "An error occurred, please try again.",
                        text: `Message: ${error}`,
                        showConfirmButton: true,
                    }).then(()=>{
                        document.getElementById("btnEdit").disabled = false
                        this.closeModalEdit()
                        location.reload()
                    })
                })
            }else{
                document.getElementById("btnEdit").disabled = false
            }
        },

        onclickDelete(id, name){
            this.$swal.fire({
                title: `Confirm item deletion <br> ${name}`,
                text: "", 
                icon: "warning",
                iconColor: '#d33',
                // width: 700,
                showCancelButton: true,
                confirmButtonColor: '#28a745',
                confirmButtonText: 'Confirm',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancel'
            }).then(result => {
                if(result.isConfirmed) {
                    http.delete(`unit/${id}`).then((res)=>{
                        console.log(res);
                        this.$swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: "The item has been deleted.",
                            showConfirmButton: false,
                            timer: 1500
                        })
                        
                        this.getUnit()

                    }).catch(error => {
                        console.log(error.res.data)
                        console.log(error.res.status)
                        console.log(error.res.headers)
                    })
                }
            })
        },

        onNextConversion(nameUnit, groupId, unitId){
            this.$router.push({ name: 'ConversionManage', params: { nameUnit, groupId, unitId } })
        }
    },

    async mounted(){
        this.groupId = Number(this.$route.params.groupId)
        this.nameGroup = this.$route.params.nameGroup
        await this.getUnit()
    },

    validations() {
        return { 
            formAdd: {
                unit: { 
                    required: helpers.withMessage('* Please enter a unit name.', required)
                }
            },
            formEdit: {
                unit: { 
                    required: helpers.withMessage('* Please enter a unit name.', required)
                }
            }
        }
    }
}
</script>
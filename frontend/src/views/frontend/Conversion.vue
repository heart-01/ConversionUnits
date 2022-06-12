<template>
    <div class="container pt-24 lg:pt-32 pb-20 mx-auto">
        <button @click="$router.go(-1)" class="bg-transparent hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-8 border border-gray-500 hover:border-transparent rounded-3xl text-xl m-5">
            <i class="fas fa-angle-double-left"></i> Back
        </button>
        <div class="flex flex-wrap items-center">
            <div class="w-full p-4 md:p-0 lg:p-0 lg:flex-1">
                <h2 class="text-4xl font-semibold leading-tight text-gray-800 capitalize text-center">
                    {{ this.item.fromUnit }}&nbsp;&nbsp; to &nbsp;&nbsp;{{ this.item.toUnit }}
                </h2>
                <div class="w-full flex justify-center mt-5" >
                    <div class="flex justify-center w-full lg:w-1/2 items-center bg-gray-300 text-gray-600 text-xl font-bold px-4 py-3" role="alert">
                        <span class="text-red-400" >1 &emsp;</span> 
                        {{ this.item.fromUnit }} 
                        &emsp; equal to &emsp;
                        <span class="text-red-400" >{{ this.item.value }} &emsp;</span> 
                        {{ this.item.toUnit }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Data -->
        <div class="flex flex-wrap w-full items-center">
            <div class="w-full flex justify-center">
                <div>
                    <h2 class="text-2xl font-semibold leading-tight text-gray-800 capitalize text-center mt-16">
                        <span v-if="conversion === 0" >Please Enter Value</span>
                        <span v-else >
                            <span>Conversion Results: </span> <br><br>
                            <span class="text-4xl text-green-500 font-bold" >{{ Number(this.conversion).toLocaleString(undefined, {minimumFractionDigits:4}) }} {{ this.item.toUnit }}</span>
                        </span>
                    </h2>

                    <input id="range" @input="changeRange($event.target.value)" class="bg-gray-200 mt-5 appearance-none border-2 border-gray-500 rounded w-full py-4 px-8 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="number" min="0" :placeholder="this.item.fromUnit" >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            conversion: 0,
            groupName: '',
            unitName: '',
            item: {}
        }
    },
    methods: {
        changeRange(value){
            if(value >= 0){
                this.conversion = value * this.item.value
            }else{
                this.$swal({
                    position: 'center',
                    icon: 'error',
                    title: 'Numbers must not be less than 0.',
                    showConfirmButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        document.getElementById("range").value = ''
                    }
                })
            }
        }
    },
    mounted(){
        this.item = JSON.parse(localStorage.getItem('itemMeasurementUnit'))
        this.groupName = this.$route.params.groupName
        this.unitName = this.$route.params.unitName
    }
}
</script>
<style lang="css" scoped>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
</style>
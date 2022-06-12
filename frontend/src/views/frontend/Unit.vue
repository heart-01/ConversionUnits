<template>
    <div class="container pt-24 lg:pt-32 pb-20 mx-auto">
        <button @click="$router.go(-1)" class="bg-transparent hover:bg-gray-500 text-gray-500 font-semibold hover:text-white py-2 px-8 border border-gray-500 hover:border-transparent rounded-3xl text-xl m-5">
            <i class="fas fa-angle-double-left"></i> Back
        </button>
        <div class="flex flex-wrap items-center">
            <div class="w-full p-4 md:p-0 lg:p-0 lg:flex-1">
                <h2 class="text-4xl font-semibold leading-tight text-gray-800 capitalize text-center">Converter {{ this.groupName }}</h2>
            </div>
        </div>

        <!-- Data -->
        <div class="flex flex-wrap w-full items-center">
            <div class="w-full flex justify-center">
                
                <section class="shadow row m-10">
                    <div class="tabs">

                        <div v-for="itemUnitId in itemUnitGroupId" :key="itemUnitId._id" class="border-b tab">
                            <div class="border-l-2 border-transparent relative">
                                <input class="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-6" type="checkbox" id="chck1">
                                <header class="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label" for="chck1">
                                    <span class="text-grey-darkest font-thin text-xl">
                                        {{ itemUnitId.unit_name }}
                                    </span>
                                    <div class="rounded-full border border-grey w-7 h-7 flex items-center justify-center test">
                                        <svg aria-hidden="true" class="" data-reactid="266" fill="none" height="24" stroke="#606F7B" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                            <polyline points="6 9 12 15 18 9">
                                            </polyline>
                                        </svg>
                                    </div>
                                </header>
                                <div class="tab-content">
                                    <div class="pl-8 pr-8 pb-5 text-grey-darkest w-80 lg:w-96 text-xl">
                                        <ul v-for="item in itemMeasurementUnitId" :key="item._id" class="pl-4">
                                            <li @click="goToConversion(item.fromUnit[0].unit_name, item.toUnit[0].unit_name, item.value.$numberDecimal)" 
                                                v-if="item.fromUnitId === itemUnitId._id && 
                                                      item.group_id == itemUnitId.group_id &&
                                                      item.status === 'active'"
                                                class="cursor-pointer link link-underline link-underline-black text-black pb-2" >
                                            {{ item.fromUnit[0].unit_name }} &emsp; to &emsp; {{ item.toUnit[0].unit_name }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </div>

        
    </div>
</template>

<script>
import http from '@/services/FrontendService'

export default {
    data(){
        return {
            groupId: 0,
            groupName: '',
            itemUnitGroupId: [],
            itemMeasurementUnitId: [],
        }
    },
    methods:{
        async getUnitGroupId () {
            http.get(`unit/group/${this.groupId}`).then(res => {
                this.itemUnitGroupId = res.data.data
            })
        },
        async getMeasurementUnitId () {
            http.get(`measurement/unit/converter`).then(res => {
                this.itemMeasurementUnitId = res.data.data
            })
        },
        goToConversion(fromUnit, toUnit, value){
            localStorage.setItem('itemMeasurementUnit', JSON.stringify({ fromUnit, toUnit, value }))
            this.$router.push({ name: 'Conversion', params: { groupName: this.groupName, unitName: fromUnit } })
        }
    },
    mounted(){
        this.groupId = JSON.parse(localStorage.getItem('temp'))['groupId']
        this.groupName = this.$route.params.groupName
        
        this.getUnitGroupId()
        this.getMeasurementUnitId()
    }
}
</script>

<style lang="css" scoped>
    .tab {
        overflow: hidden;
    }
    .tab-content {
        max-height: 0;
        transition: all 0.5s;
    }
    input:checked + .tab-label .test {
        background-color: #000;
    }
    input:checked + .tab-label .test svg {
        transform: rotate(180deg);
        stroke: #fff;
    }
    input:checked + .tab-label::after {
        transform: rotate(90deg);
    }
    input:checked ~ .tab-content {
        max-height: 100vh;
    }

    .link-underline {
        border-bottom-width: 0;
        background-image: linear-gradient(transparent, transparent), linear-gradient(#fff, #fff);
        background-size: 0 3px;
        background-position: 0 100%;
        background-repeat: no-repeat;
        transition: background-size .5s ease-in-out;
    }

    .link-underline-black {
        background-image: linear-gradient(transparent, transparent), linear-gradient(#000, #000)
    }

    .link-underline:hover {
        background-size: 100% 3px;
        background-position: 0 100%
    }
</style>
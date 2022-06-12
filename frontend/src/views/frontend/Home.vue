<template>
    <div class="container pt-40 pb-20 mx-auto">
        <div class="flex flex-wrap items-center">
            <div class="w-full p-4 lg:flex-1 text-center">
                <h2 class="mb-2 text-4xl font-semibold leading-tight text-gray-800 capitalize">unit converter</h2>
            </div>
        </div>

        <!-- Data -->
        <div class="flex flex-wrap w-full items-center mb-4 mt-5">
            <div class="w-full p-4 lg:flex-1 text-center">
                <button v-for="item in itemGroups" :key="item._id" @click="goToUnit(item._id, item.group_name)" class="bg-transparent m-5 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white p-4 px-10 border border-blue-500 hover:border-transparent rounded">
                {{ item.group_name }}
                </button>
            </div>
        </div>

        
    </div>
</template>

<script>
import http from '@/services/FrontendService'

export default {
    data(){
        return {
            itemGroups: []
        }
    },
    mounted () {
        this.getGroup()
    },
    methods: {
        async getGroup () {
            http.get(`group`).then(res => {
                this.itemGroups = res.data.data
            })
        },
        goToUnit(groupId, groupName) {
            localStorage.setItem('temp', JSON.stringify({groupId}) )
            this.$router.push({ name: 'Unit', params: { groupName: groupName } })
        }
    }
}
</script>
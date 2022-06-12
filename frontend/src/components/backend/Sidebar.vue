<template>
      <!-- Desktop sidebar -->
      <aside class="z-20 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 xl:block">
        <div class="py-4 text-gray-500 dark:text-gray-400">
          
          <router-link to="/" class="ml-6 text-xl font-bold text-gray-800 dark:text-gray-200"
            href="">
            <i class="fab fa-unity"></i> Unit Converter
          </router-link>

          <ul class="mt-6">
            <li class="relative px-6 py-3">
              <span
                class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"></span>
              <router-link to="/backend"
                class="inline-flex items-center w-full text-lg font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100">
                <i class="fas fa-tools"></i>
                <span class="ml-4">Manage Converter</span>
              </router-link>
            </li>
            <li class="relative px-6 py-3">
              <span
                class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"></span>
              <p @click="this.manual()"
                class="cursor-pointer inline-flex items-center w-full text-lg font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100">
                <i class="fas fa-book"></i>
                <span class="ml-4">How to use</span>
              </p>
            </li>

            <li class="relative px-6 py-3 top-10">
              <button @click="onclickLogout" class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-purple">ออกจากระบบ</button>
            </li>
          </ul>      
          
        </div>
      </aside>

      <!-- Mobile sidebar -->
      <!-- Backdrop -->
      <aside :class="{ 'hidden': this.$store.state.showSideMenu }" class="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-gray-100 dark:bg-gray-800">
        <div class="py-4 text-gray-500 dark:text-gray-400">
          
          <router-link to="/" class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
            href="">
            <i class="fab fa-unity"></i> Unit Converter
          </router-link>
          
          <ul class="mt-6">
            <li class="relative px-6 py-3">
              <span
                class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"></span>
                <router-link :to="{ name: 'GroupManage' }" class="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100" href="#">
                  <i class="fas fa-folder-open"></i>
                <span class="ml-4">Manage Converter</span>
              </router-link>
            </li>
          </ul>

          <ul>
            <li class="relative px-6 py-3">
              <button @click="onclickLogout" class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-purple">ออกจากระบบ</button>
            </li>
          </ul>
          
        </div>
      </aside>
</template>

<script>
export default {

  data() { 
    return {
      url: process.env.VUE_APP_URL,
    }
  },

  methods: {
    onclickLogout(){
      localStorage.removeItem('manual')     
      localStorage.removeItem('user')      
      this.$router.push({ name:'Login' })
    },
    manual(){
        this.$swal.fire({
            title: 'How To Use..',
            html: `
                <p class='text-2xl text-left m-2'>Step 1: Group information</p>
                <p class='text-xl text-left m-2'>&emsp;&emsp; 
                    Add group information and double click the data in the table to go to the next step.
                </p>
                
                <p class='text-2xl text-left m-2 mt-10'>Step 2: Unit information</p>
                <p class='text-xl text-left m-2'>&emsp;&emsp; 
                    Add the unit data in the same group and double-click the data in the table to go to the next step.
                </p>

                <p class='text-2xl text-left m-2 mt-10'>Step 3: Conversion information</p>
                <p class='text-xl text-left m-2'>&emsp;&emsp; 
                    Add unit conversion data to compare one unit of data per converted value.
                </p>
            `,
        })
    }
  },
  mounted(){
      let manual = JSON.parse(localStorage.getItem('manual'))
      if(manual) {
        if(manual.status !== '1') {
          this.manual()
          localStorage.setItem('manual', JSON.stringify({"status": "1"}))
        }
      }else{
        this.manual()
        localStorage.setItem('manual', JSON.stringify({"status": "1"}))
      }
  },
}
</script>
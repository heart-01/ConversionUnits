<template>
    <div class="pt-32 flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div class="flex flex-col overflow-y-auto md:flex-row">
          <div class="h-32 md:h-auto md:w-1/2">
            <img aria-hidden="true" class="object-cover w-full h-full dark:hidden" src="@/assets/images/login-office.jpeg" alt="Office"/>
            <img aria-hidden="true" class="hidden object-cover w-full h-full dark:block" src="@/assets/images/login-office-dark.jpeg" alt="Office"/>
          </div>

          <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div class="w-full">
              <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Sing In</h1>

              <form @submit.prevent="onSubmit" >
                <label class="block text-gray-700 text-sm mt-3 mb-2" for="username"><i class="fas fa-user-circle"></i> &nbsp; Username</label>
                <input v-model="formLogin.username" placeholder="Enter Username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" type="text" autocomplete="username" >
                <div v-if="v$.formLogin.username.$error" class="mt-2 text-sm text-red-500"> {{ v$.formLogin.username.$errors[0].$message }}</div>

                <label class="block text-gray-700 text-sm mt-3 mb-2" for="password"><i class="fas fa-lock"></i> &nbsp; Password</label>
                <input v-model="formLogin.password" placeholder="Enter Password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" type="password" autocomplete="current-password">
                <div v-if="v$.formLogin.password.$error" class="mt-2 text-sm text-red-500"> {{ v$.formLogin.password.$errors[0].$message }}</div>

                <p class="my-4"></p>
                
                <button @click="submitForm" class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg cursor-pointer active:bg-purple-600 hover:bg-purple-700">
                  <i class="fas fa-sign-in-alt"></i> &nbsp; sign in
                </button>
              </form>

              <p class="my-8"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'

import http from '@/services/AuthService'

export default {
  
  data(){
    return { 
      v$: useValidate(),

      formLogin: {  
        username: '',
        password: ''
      }
    }
  },

  methods: {
    submitForm() {
      this.v$.$validate();
      if(!this.v$.formLogin.$error){
        
        http.post('/account/login',
          {
            "username": this.formLogin.username,
            "password": this.formLogin.password
          }
        ).then(response => { 
          localStorage.setItem('user', JSON.stringify(response.data))

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
            title: 'Logging in...'
          }).then(()=>{
            this.$router.push({ name:'GroupManage' })
          })

        }).catch(error => {
          if(error.response.status == 401 || error.response.status == 403)
          {
            this.$swal({
              position: 'center',
              icon: 'error',
              title: 'Invalid login information',
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                this.$router.push({ name: 'Login' }) 
              }
            });
          }
        });

      }
    }
  },

  validations() {
    return { 
      formLogin: {
        username: { 
          required: helpers.withMessage('* Please enter your username.', required),
        },
        password: { 
          required: helpers.withMessage('* Please enter password', required), 
          minLength : helpers.withMessage( 
            ({
              $params
            }) => `Password must not be less than ${$params.min} character`,
            minLength(8)
          )
        }
      }
    }
  }

}
</script>
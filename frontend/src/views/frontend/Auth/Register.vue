<template>
    <div class="pt-32 flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div class="flex flex-col overflow-y-auto md:flex-row">
          <div class="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              class="object-cover w-full h-full dark:hidden"
              src="@/assets/images/create-account-office.jpeg"
              alt="Office"/>
            <img
              aria-hidden="true"
              class="hidden object-cover w-full h-full dark:block"
              src="@/assets/images/create-account-office-dark.jpeg"
              alt="Office"/>
          </div>

          <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            
            <div class="w-full">

              <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">สมัครสมาชิกใหม่</h1>

              <form>

                <label class="block text-gray-700 text-sm mb-2" for="fname">ชื่อ</label>
                <input v-model="formRegister.fname" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="fname" type="text">
                <div v-if="v$.formRegister.fname.$error" class="mt-2 text-sm text-red-500"> {{ v$.formRegister.fname.$errors[0].$message }}</div>

                <label class="block text-gray-700 text-sm mt-3 mb-2" for="lname">นามสกุล</label>
                <input v-model="formRegister.lname" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="lname" type="text">
                <div v-if="v$.formRegister.lname.$error" class="mt-2 text-sm text-red-500"> {{ v$.formRegister.lname.$errors[0].$message }}</div>

                <label class="block text-gray-700 text-sm mt-3 mb-2" for="email">อีเมล์</label>
                <input v-model="formRegister.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="email" type="text" autocomplete="email">
                <div v-if="v$.formRegister.email.$error" class="mt-2 text-sm text-red-500"> {{ v$.formRegister.email.$errors[0].$message }}</div>

                <label class="block text-gray-700 text-sm mt-3 mb-2" for="username">ชื่อผู้ใช้</label>
                <input v-model="formRegister.username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="username" type="text">
                <div v-if="v$.formRegister.username.$error" class="mt-2 text-sm text-red-500"> {{ v$.formRegister.username.$errors[0].$message }}</div>

                <label class="block text-gray-700 text-sm mt-3 mb-2" for="password">รหัสผ่าน</label>
                <input v-model="formRegister.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="password" type="password" autocomplete="current-password">
                <div v-if="v$.formRegister.password.$error" class="mt-2 text-sm text-red-500"> {{ v$.formRegister.password.$errors[0].$message }}</div>

                <p class="my-4"></p>

                <label class="flex items-center dark:text-gray-400">
                  <input type="checkbox" class="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"/>
                  <span class="ml-2">ฉันยอมรับ <span class="underline">เงื่อนไขการใช้งานระบบ</span>
                  </span>
                </label>
                
                <input @click="submitForm" type="button"
                    class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg cursor-pointer active:bg-purple-600 hover:bg-purple-700" value="สมัครสมาชิก">
              </form>

              <p class="mt-2">
                <router-link to="/login" class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">ฉันเป็นสมาชิกอยู่แล้ว ? เข้าสู่ระบบ</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'

import http from '@/services/AuthService'

export default {
  
  data(){
    return { 
      v$: useValidate(),

      formRegister: {  
        fname: '',
        lname: '',
        email: '',
        username: '',
        password: ''
      }
    }
  },

  methods: {
    submitForm() {
      this.v$.$validate();
      if(!this.v$.formRegister.$error){
        
        http.post('User/Register',
          {
            "firstName": this.formRegister.fname,
            "lastName": this.formRegister.lname,
            "email": this.formRegister.email,
            "username": this.formRegister.username,
            "password": this.formRegister.password,
            "roleId": 1
          }
        ).then(response => { 
          localStorage.setItem('user', JSON.stringify(response.data))

          const Toast = this.$swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', this.$swal.stopTimer)
              toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'สมัครสมาชิกสำเร็จ !'
          }).then(()=>{
            this.$router.push({ name:'Login' })
          })

        }).catch(error => {
          this.$swal({
            position: 'center',
            icon: 'error',
            title: 'Error !',
            text: `Message: ${error}`,
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push({ name: 'Register' }) 
            }
          });
        });

      }
    }
  },

  validations() {
    return { 
      formRegister: {
        fname: { 
          required: helpers.withMessage('* กรุณาป้อนชื่อ', required),
        },
        lname: { 
          required: helpers.withMessage('* กรุณาป้อนนามสกุล', required),
        },
        email: { 
          required: helpers.withMessage('* กรุณาป้อนอีเมลล์', required),
          email: helpers.withMessage('* รูปแบบอีเมล์ไม่ถูกต้อง', email)
        },
        username: { 
          required: helpers.withMessage('* กรุณาป้อนชื่อผู้ใช้', required),
        },
        password: { 
          required: helpers.withMessage('* กรุณาป้อนรหัสผ่าน', required), 
          minLength : helpers.withMessage( 
            ({
              $params
            }) => `* รหัสผ่านต้องไม่น้อยกว่า ${$params.min} ตัวอักษร`,
            minLength(8)
          )
        }
      }
    }
  }

}
</script>
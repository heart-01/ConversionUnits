import { createRouter, createWebHistory } from 'vue-router'

// Import Layout
import FrontendLayout from '@/layouts/Frontend.vue'
import BackendLayout from '@/layouts/Backend.vue'

// Import Views
// Frontend
import Home from '@/views/frontend/Home.vue'
import Login from '@/views/frontend/Auth/Login.vue'
import Unit from '@/views/frontend/Unit.vue'
import Conversion from '@/views/frontend/Conversion.vue'

//Error handling
import NotFound404 from '@/views/error/NotFound404.vue'

// Backend
import GroupManage from '@/views/backend/GroupManage.vue'
import UnitManage from '@/views/backend/UnitManage.vue'
import ConversionManage from '@/views/backend/ConversionManage.vue'


function authGuard(to, from, next){
  let isAuthenticated = false

  if(localStorage.getItem('user')){
    isAuthenticated = true
  }else{
    isAuthenticated = false
  }

  if(isAuthenticated){
    next()
  }else{
    next({name: 'Login'})
  }
}


const routes = [
  //Frontend
  {
    path: '/login',
    component: FrontendLayout,
    children: [ 
      {
        path: '', 
        name: 'Login', 
        component: Login
      }
    ],
    meta : {
      title : 'เข้าสู่ระบบ',
      description : 'เข้าสู่ระบบ'
    },
  },
  {
    path: '/',
    component: FrontendLayout,
    children: [ 
      {
        path: '', 
        name: 'Home', 
        component: Home
      }
    ],
    meta : {
      title : 'หน้าหลัก',
      description : 'หน้าหลักระบบ'
    }
  },
  {
    path: '/unit/',
    component: FrontendLayout,
    children: [ 
      {
        path: ':groupName', 
        name: 'Unit', 
        component: Unit
      }
    ],
    meta : {
      title : 'หน่วยวัด'
    }
  },
  {
    path: '/conversion/',
    component: FrontendLayout,
    children: [ 
      {
        path: ':groupName/:unitName', 
        name: 'Conversion', 
        component: Conversion
      }
    ],
    meta : {
      title : 'แปลงหน่วย'
    }
  },

  /** Backend Route */
  {
    path: '/backend',
    component: BackendLayout,
    children: [
      {
        path: '',
        name: 'GroupManage',
        component: GroupManage,
        beforeEnter: authGuard,
      }
    ],
    meta : {
      title : 'GroupManage',
    }
  },
  {
    path: '/backend/unit',
    component: BackendLayout,
    children: [
      {
        path: 'manage/:nameGroup/:groupId',
        name: 'UnitManage',
        component: UnitManage,
        beforeEnter: authGuard,
      }
    ],
    meta : {
      title : 'UnitManage',
    }
  },
  {
    path: '/backend/conversion',
    component: BackendLayout,
    children: [
      {
        path: 'manage/:nameUnit/:groupId/:unitId',
        name: 'ConversionManage',
        component: ConversionManage,
        beforeEnter: authGuard,
      }
    ],
    meta : {
      title : 'ConversionManage',
    }
  },

  //Error 404
  {
    path: '/:catchAll(.*)',
    component: NotFound404,
    meta : {
      title : '404 ไม่พบหน้านี้',
      description : 'รายละเอียดหน้า 404 ไม่พบหน้านี้'
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

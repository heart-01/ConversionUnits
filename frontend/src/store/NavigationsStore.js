import { createStore } from 'vuex'

export default createStore({
  
  state: {
    showSideMenu: true
  },

  mutations: {
    toggleSideMenu(state){
      state.showSideMenu = !state.showSideMenu
    },
    closeSideMenu(state){
      state.showSideMenu = true
    }
  },

  actions: { 
  },

  plugins: []
})

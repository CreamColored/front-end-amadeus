import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  //定义状态
  state: {
    store:{
      studentInfo:{},
      isLogin: false,
      token: ''
    }
  },
  mutations:{
    setState(state,data){
      state.store.isLogin=data.success
      state.store.studentInfo=data.studentLogin
      state.store.token=data.studentLogin.studentId
      sessionStorage.setItem('store',state.store)
    }
  }
})
export default store

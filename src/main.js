// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import store from './vuex/store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(iView)

/*const ADD_COUNT = 'ADD_COUNT'
const REMOVE_COUNT = 'REMOVE_COUNT'
//注册状态管理全局参数
var store = new Vuex.Store({
  state: {
    token: '',
    userID: ''
  },
  mutations: {
    [ADD_COUNT] (state, token) {
      sessionStorage.setItem('token', token)
      state.token = token
    },
    [REMOVE_COUNT] (state, token) {
      sessionStorage.removeItem('token', token)
      state.token = token
    }
  }
})*/

/*router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  store.state.token = sessionStorage.getItem('token')
  if (to.meta.requireAuth) {
    if (store.state.token !== '') {
      next()
    } else {
      next({
        path: '/home',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

router.afterEach(route => {
  iView.LoadingBar.finish()
})*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有正式环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: _import('layout/index'),
      name: 'layout',
      redirect: {name: 'home'},
      desc: '上下布局',
      children: [
        {path: '/home', component: _import('home/index'), name: 'home', desc: '首页'},
        {path: '/login', component: _import('student/login'), name: 'login', desc: '登录'},
        {path: '/register', component: _import('student/register'), name: 'register', desc: '注册'},
        {path: '/course/:courseId', component: _import('course/index'), name: 'course', props: true, desc: '课程详情页'},
        {path: '/studentInfo', component: _import('student/student-info'), name: 'student-info', desc: '学生信息页'},
        {path: '/student/courses', component: _import('student/courses'), name: 'courses', desc: '学生选课页'},
        {path: '/student/orders', component: _import('student/orders'), name: 'orders', desc: '历史订单页'}
      ]
    }
  ]
})

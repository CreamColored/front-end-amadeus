<template>
  <div>
    <nav class="navbar navbar-default navbar-fixed-top home-header">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#header-navbar-collapse" aria-expanded="false">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">
            <img src="/static/images/logo_02.png">
          </a>
        </div>
        <div class="collapse navbar-collapse" id="header-navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="dropdown">
              <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">课程分类 <span
                class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="courses.html">全部课程</a></li>
                <li><a href="bootcamp.html">免费课程</a></li>
                <li><a href="paths.html">学习路径</a></li>
              </ul>
            </li>
            <!--<li><a href="contests.html">手记</a></li>
            <li><a href="questions.html">问答</a></li>
            <li><a href="vip.html">会员</a></li>-->
          </ul>
          <ul class="nav navbar-nav navbar-right header-sign" v-if="isLogin===false">
            <li><a class="sign-in" href="javascript:void(0)" @click="doLogin()">登录</a></li>
            <li><a class="sign-up" href="javascript:void(0)" @click="doRegister()">注册</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right header-sign" v-else>
            <li>
              <span style="color: #000;font-size: 14px">您好，</span>
              <el-dropdown>
                <el-button class="sign-in" style="border: 0;padding-right: 0;padding-left: 0">
                  <span style="color: #0ace9d">{{$store.state.store.studentInfo.studentInfo.studentName}}</span><i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><a href="javascript:void(0)" @click="goInfoCenter()">个人信息</a></el-dropdown-item>
                  <el-dropdown-item><a href="javascript:void(0)" @click="goCourses()">课程中心</a></el-dropdown-item>
                  <!--<el-dropdown-item><a href="javascript:void(0)" @click="goOrders()">历史订单</a></el-dropdown-item>-->
                  <el-dropdown-item><a href="javascript:void(0)" @click="doLogout()">注销</a></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
          <form action="/search" class="navbar-form navbar-right">
            <div class="form-group"><label><i class="fa fa-search"></i></label>
              <input type="text" name="search" autocomplete="off" placeholder="搜索 课程/问答" class="form-control">
            </div>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'nav-menu',
    methods: {
      doLogin: function () {
        this.$router.push({path: '/login'})
      },
      doRegister: function () {
        this.$router.push({path:'/register'})
      },
      doLogout: function () {
        let success = false
        let studentId = ''
        let studentLogin = {studentId}
        let data = {
          success, studentLogin
        }
        this.$store.commit('setState', data)
        this.$router.push({path: '/home'})
      },
      goInfoCenter: function () {
        this.$router.push({path: '/studentInfo'})
      },
      goCourses: function () {
        this.$router.push({path: '/student/courses'})
      },
      goOrders:function () {
        this.$router.push({path:'/student/orders'})
      }
    },
    computed: mapState({
      isLogin: state => state.store.isLogin,
      studentInfo: state => state.store.studentInfo,
      token: state => state.store.token
    })
  }
</script>

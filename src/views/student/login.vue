<template>
  <div id="container" style="padding-top: 100px">
    <!--<el-form id="loginForm" :model="loginForm" ref="loginForm" style="margin: 0 auto; width: 300px">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="loginForm.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('loginForm')">立即登录</el-button>
      </el-form-item>
    </el-form>-->
    <el-form id="loginForm" :model="loginForm" ref="loginForm" style="margin: 0 auto; width: 300px">
      <el-form-item label="手机号" prop="telephoneNumber">
        <el-input v-model="loginForm.telephoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('loginForm')">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import * as api from '../../api/student/api'
  import qs from 'querystring'

  export default {
    name: 'login',
    data () {
      return {
        loginForm: {
          telephoneNumber: '',
          password: ''
        }
      }
    },
    methods: {
      login (formName) {
        let queryParam = qs.stringify(this.loginForm)
        api.login(queryParam).then((response) => {
          if (response.data.success === true) {
            this.$message({
              message: '登录成功!',
              type: 'success'
            })
            this.$store.commit('setState', response.data)
            this.$router.push({path: '/home'})
          } else {
            this.$message({
              message: '登陆失败，请刷新后重试!',
              type: 'error'
            })
          }
        }).catch(() => {
        })
      }
    }
  }
</script>

<style scoped>
</style>

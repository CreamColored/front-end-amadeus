<template>
  <div id="container" style="padding-top: 100px">
    <el-form :model="registerForm" ref="registerForm" style="margin: 0 auto; width: 300px">
      <el-form-item label="手机号" prop="telephoneNumber">
        <el-input v-model="registerForm.telephoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verificationCode">
        <el-input v-model="registerForm.verificationCode" style="width: 130px"></el-input>
        <el-button type="primary" @click="sendCode()" v-if="canClick===true">{{btnContent}}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register('registerForm')" style="position: relative;left: 35%">立即注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import * as api from '../../api/student/api'
  import qs from 'querystring'

  export default {
    name: 'login-or-register',
    data () {
      return {
        loginForm: {
          email: '',
          password: ''
        },
        registerForm: {
          telephoneNumber: '',
          password: '',
        },
        btnContent: '发送验证码',
        totalTime: 60,
        canClick: true,
        verificationCode: '',
        token: '',
        key: 'TGElMjB5b2hkYSUyMHN0YXNlbGxh'
      }
    },
    methods: {
      sendCode () {
        api.sendCode(this.registerForm.telephoneNumber).then((response) => {
          if (response.data.success === true) {
            this.token = response.data.token
            this.$message({
              message: '验证码已发送!',
              type: 'success'
            })
            if (!this.canClick) return
            this.canClick = false
            this.btnContent = this.totalTime + 's后重试'
            let clock = window.setInterval(() => {
              this.totalTime--
              this.btnContent = this.totalTime + 's后重试'
              if (this.totalTime <= 0) {
                window.clearInterval(clock)
                this.btnContent = '重新发送'
                this.totalTime = 60
                this.canClick = true
              }
            }, 1000)
          } else {
            this.$message({
              message: '验证码发送失败，请刷新后重试!',
              type: 'error'
            })
          }
        })
      },
      register (formName) {
        let token = this.key + this.registerForm.telephoneNumber + this.registerForm.verificationCode
        if (token === this.token) {
          let queryParam = qs.stringify(this.registerForm)
          console.log(queryParam)
          api.register(queryParam).then((response) => {
            console.log(response)
            if (response.data.success === true) {
              this.$message({
                message: '注册成功!',
                type: 'success'
              })
              this.$router.push({path: '/login'})
            } else {
              this.$message({
                message: '注册失败，请刷新后重试!',
                type: 'error'
              })
            }
          })
        } else {
          this.$message({
            message: '验证码错误，请重试!',
            type: 'error'
          })
        }

      }
    }
  }
</script>

<style scoped>
  .disabled{

    background-color: #ddd;

    border-color: #ddd;

    color:#57a3f3;

    cursor: not-allowed;

  }
</style>

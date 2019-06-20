<template>
  <!--登陆注册模块开始-->
  <div class="modal fade" id="sign-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <button type="button" class="close-modal" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
        </button>
        <div class="modal-body">
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation">
              <a href="#signup-form" aria-controls="signup-form" role="tab" data-toggle="tab">注册</a>
            </li>
          </ul>
          <div class="tab-content">
            <!--<div role="tabpanel" class="tab-pane active" id="signin-form">
              <el-form :model="loginForm" ref="loginForm">
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="loginForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="login('loginForm')">立即登录</el-button>
                </el-form-item>
              </el-form>
              &lt;!&ndash;<form action="/login" method="post">
                <input name="_csrf_token" type=hidden
                       value="1493606193##8bd4ea6d5e6c5d3822a330cce83cce0a3c5d38b6">
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-addon">
                      <i class="fa fa-envelope" style="margin:0;"></i>
                    </div>
                    <input type="email" name="login" class="form-control" placeholder="请输入邮箱">
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-addon">
                      <i class="fa fa-lock" style="margin:0;"></i>
                    </div>
                    <input type="password" name="password" class="form-control" placeholder="请输入密码">
                  </div>
                </div>
                <div class="form-inline verify-code-item" style="display:none;">
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" name="captcha_v" class="form-control" placeholder="请输入验证码">
                    </div>
                  </div>
                  <img class="verify-code" src="" source="/captcha.gif">
                </div>
                <div class="form-group remember-login">
                  <input name="remember" type="checkbox" value="y"> 下次自动登录
                  <a class="pull-right" href="/reset_password">忘记密码？</a>
                </div>
                <div class="form-group">
                  <input class="btn btn-primary" name="submit" type="submit" value="进入实验楼">
                </div>
                <div class="form-group widget-signin">
                  <span>快速登录</span>
                  <a href="/auth/qq?next="><i class="fa fa-qq"></i></a>
                  <a href="/auth/weibo?next="><i class="fa fa-weibo"></i></a>
                  <a href="/auth/weixin?next="><i class="fa fa-weixin"></i></a>
                  <a href="/auth/github?next="><i class="fa fa-github"></i></a>
                  <a href="/auth/renren?next="><i class="fa fa-renren"></i></a>
                </div>
                <div class="form-group error-msg">
                  <div class="alert alert-danger" role="alert"></div>
                </div>
              </form>&ndash;&gt;
            </div>-->
            <div role="tabpanel" class="tab-pane active" id="signup-form">
              <el-form :model="registerForm" ref="registerForm">
                <el-form-item label="手机号" prop="telephoneNumber">
                  <el-input v-model="registerForm.telephoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="registerForm.password"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="verificationCode">
                  <el-input v-model="registerForm.verificationCode" style="width: 130px"></el-input>
                  <el-button type="primary" @click="sendCode()">发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="register('registerForm')" style="position: relative;left: 35%">立即注册</el-button>
                </el-form-item>
              </el-form>
              <!--<form action="/register" method="post">
                <input name="_csrf_token" type=hidden
                       value="1493606193##8bd4ea6d5e6c5d3822a330cce83cce0a3c5d38b6">
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-addon">
                      <i class="fa fa-envelope" style="margin:0;"></i>
                    </div>
                    <input type="email" name="email" class="form-control" placeholder="请输入邮箱">
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-addon">
                      <i class="fa fa-lock" style="margin:0;"></i>
                    </div>
                    <input type="password" name="password" class="form-control" placeholder="请输入密码">
                  </div>
                </div>
                <div class="form-inline">
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" name="captcha_v" class="form-control" placeholder="请输入验证码">
                    </div>
                  </div>
                  <img class="verify-code" src="" source="/captcha.gif">
                </div>
                <div class="form-group">
                  <input class="btn btn-primary" name="submit" type="submit" value="注册">
                </div>
                <div class="form-group agree-privacy">
                  注册表示您已经同意我们的<a href="privacy.html" target="_blank">隐私条款</a>
                </div>
                <div class="form-group widget-signup">
                  <span>快速注册</span>
                  <a href="/auth/qq?next="><i class="fa fa-qq"></i></a>
                  <a href="/auth/weibo?next="><i class="fa fa-weibo"></i></a>
                  <a href="/auth/weixin?next="><i class="fa fa-weixin"></i></a>
                  <a href="/auth/github?next="><i class="fa fa-github"></i></a>
                  <a href="/auth/renren?next="><i class="fa fa-renren"></i></a>
                </div>
                <div class="form-group error-msg">
                  <div class="alert alert-danger" role="alert"></div>
                </div>
              </form>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--登陆注册模块结束-->
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
        verificationCode: '',
        token:'',
        key:"TGElMjB5b2hkYSUyMHN0YXNlbGxh"
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
            this.$store.commit('newUser', response.data)
            this.$router.push({path: '/studentInfo'})
          } else {
            this.$message({
              message: '登陆失败，请刷新后重试!',
              type: 'error'
            })
          }
        }).catch(() => {
        })
      },
      sendCode () {
        api.sendCode(this.registerForm.telephoneNumber).then((response) => {
          if (response.data.success === true) {
            this.token=response.data.token
            this.$message({
              message: '验证码已发送!',
              type: 'success'
            })
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

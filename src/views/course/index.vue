<template>
  <div>
    <div class="container layout-hasside layout-margin-top">
      <!--导航条开始-->
      <ol class="breadcrumb">
        <li><a href="courses.html">全部课程</a></li>
        <li><a href="courses.html?tag=Python">{{course.courseName}}</a></li>
        <li class="active"><a :href="'#/course/'+courseId">{{course.courseName}}</a></li>
      </ol>
      <!--导航条结束-->
      <div class="row">
        <div class="col-md-9 layout-body">
          <!--封面-->
          <div class="side-image side-image-mobile">
            <img :src="course.coverImage">
          </div>
          <!--课程基本信息-->
          <div class="content course-infobox">
            <div class="clearfix course-infobox-header">
              <h4 class="pull-left course-infobox-title">
                <span>{{course.courseName}}</span>
              </h4>
              <div class="pull-right course-infobox-follow">
                <span class="course-infobox-followers">{{course.favorNumber}}</span><span>人收藏</span>
                <i class="fa fa-star-o"></i>
              </div>
            </div>
            <div class="clearfix course-infobox-body">
              <div class="course-infobox-content">
                <p>{{videoName}}</p>
              </div>
              <d-player :options="videoPlayerOptions" ref="player" @play="play"></d-player>
              <div class="course-infobox-progress">
                <!--<div :class="video.chapter===currentVideo.chapter ? 'course-progress-finished' : 'course-progress-new' "
                     v-for="video in videoList"></div>
                <span>（1/{{videoList.length}}）</span>-->
              </div>
            </div>
          </div>
          <!--课程基本信息结束-->
          <!--课程详情视频列表-->
          <div class="content">
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="active">
                <a href="#charge-course-detail" aria-controls="charge-course-detail" role="tab"
                   data-toggle="tab">课程详情</a>
              </li>
              <li role="presentation">
                <a href="#labs" aria-controls="labs" role="tab" data-toggle="tab">视频列表</a>
              </li>
            </ul>
            <div class="tab-content">
              <!--课程详情-->
              <div role="tabpanel" class="tab-pane active" id="charge-course-detail">
                <div class="charge-course-detail-content markdown-box">
                  {{course.description}}
                </div>
                <div class="bt-desc-footer">
                  <button class="btn btn-default" onclick="javascript:document.body.scrollTop=0">回到顶部</button>
                  <button class="btn bootcamp-infobox-buy" v-if="isBought===false" @click="addCourse()">立即加入</button>
                </div>
                <el-dialog :visible.sync="visible" title="请选择支付方式" style="width: 900px;margin: 0 auto">
                  <div style="margin: 0 auto;width: 300px">
                    <el-radio v-model="radio" label="1" border>余额</el-radio>
                    <el-radio v-model="radio" label="2" border>积分</el-radio>
                    <span v-if="radio==='1'">￥{{discountPrice}}</span>
                    <span v-else>{{point}}积分</span>
                    <el-button type="primary" style="margin-left: 250px" @click="pay()">支付</el-button>
                  </div>
                </el-dialog>
              </div>
              <!--视频列表-->
              <div role="tabpanel" class="tab-pane " id="labs">
                <div class="lab-item " v-for="video in videoList">
                  <div class="lab-item-index">第{{video.chapter}}节</div>
                  <div class="lab-item-title" :title="video.name">{{video.name}}</div>
                  <div class="pull-right lab-item-ctrl" v-if="isBought===true||video.chapter===1">
                    <a class="btn btn-default" href="#sign-modal" data-toggle="modal" data-sign="signin"
                       data-next="courses.html763">查看文档</a>
                    <a class="btn btn-primary" href="#sign-modal" @click="changeCurrentVideo(video)"
                       data-toggle="modal" data-sign="signin"
                       data-next="courses.html763">开始学习</a>
                  </div>
                  <div class="pull-right lab-item-ctrl" v-else><i class="fa fa-lock" aria-hidden="true"></i></div>
                </div>
              </div>
            </div>
          </div>
          <!--评论-->
          <div class="content">
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="active">
                <a href="#comments" class="stat-event" aria-controls="comments" role="tab" data-stat="course_comment"
                   data-toggle="tab">课程评论(22)</a>
              </li>
            </ul>
            <div class="tab-content">
              <!--评论-->
              <div role="tabpanel" class="tab-pane course-comment active" id="comments">
                <div class="comment-box">
                  <div class="comment-form">
                    <div class="comment-form-unlogin" v-if="$store.state.store.isLogin===false">
                      请<a :href="'#/login/'" data-toggle="modal" data-sign="signin" data-next="courses.html763"> 登录 </a>
                      后发表评论
                    </div>
                    <div class="comment-form-unlogin" v-else>
                      <a href="#askquestion" data-toggle="modal" data-sign="signin" data-next="courses.html763">
                        发表评论 </a>
                    </div>
                  </div>
                  <div class="comment-title">最新评论</div>
                  <!--评论列表-->
                  <div class="comment-list">
                    <div class="row comment-list-item" v-for="comment in commentList">
                      <div class="col-md-1">
                        <div class="user-avatar">
                          <a class="avatar" :href="'/user/'+comment.studentLogin.studentId" target="_blank">
                            <img :src="comment.studentLogin.studentInfo.avatar"/>
                          </a>
                        </div>
                      </div>
                      <div class="col-md-11 comment-item-body">
                        <div class="user-username">
                          <a class="username" :href="'/user/'+comment.studentLogin.studentId" target="_blank">
                            {{comment.studentLogin.studentInfo.studentName}}
                          </a>
                          <span class="user-level">L20</span>
                        </div>
                        <div class="comment-item-content markdown-box" style="word-wrap: break-word;"><p>
                          {{comment.content}}</p>
                        </div>
                        <div class="assistant-wrapper">
                          <div class="comment-item-date">{{comment.publishTime}}</div>
                          <!--<div class="comment-item-reply">
                            <a href="#askquestion" data-toggle="modal" data-sign="signin"><img
                              src="/static/images/icon-reply.png" alt="">回复</a></div>-->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--侧边栏开始-->
        <div class="col-md-3 layout-side">
          <div class="side-image side-image-pc">
            <img :src="course.coverImage">
          </div>
          <div class="sidebox mooc-teacher">
            <div class="sidebox-header mooc-header">
              <h4 class="sidebox-title">课程教师</h4>
            </div>
            <div class="sidebox-body mooc-content">
              <a href="/user/63246/" target="_blank">
                <img src="/static/images/gravatarnty0mze5mdc1otix.png">
              </a>
              <div class="mooc-info">
                <div class="name">
                  <strong v-if="teacherName">{{teacherName}}</strong>
                  <strong v-else>未命名</strong>
                </div>

                <div class="courses">共发布过<strong>3</strong>门课程</div>
              </div>
              <div class="mooc-extra-info">
                <div class="word long-paragraph">
                </div>
              </div>
            </div>
            <div class="sidebox-footer mooc-footer">
              <a href="/teacher/63246" target="_blank">查看老师的所有课程 ></a>
            </div>
          </div>
          <div class="side-image">
            <a href="vip.html" target="_blank">
              <img src="/static/images/banner-vip.png">
            </a>
          </div>
          <!--推荐课程-->
          <div class="sidebox recommend-courses">
            <div class="sidebox-header recommend-courses-header">
              <h4 class="sidebox-title">推荐课程</h4>
            </div>
            <div class="sidebox-body recommend-courses-content">
              <a href="courses.html355">仿 StackOverflow 开发在线问答系统</a>
              <a href="courses.html789">使用 Python3 编写 Github 自动周报生成器</a>
              <a href="courses.html803">Django 进阶教程</a>
              <a href="courses.html354">仿OpenStack开发云计算管理软件</a>
            </div>
          </div>
        </div>
        <!--侧边栏结束-->
      </div>
    </div>
    <!--发帖的弹窗-->
    <div class="modal fade askquestion-modal" id="askquestion" tabindex="-1" role="dialog">
      <div class="modal-dialog" role=document>
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">发帖</h4>
          </div>
          <div class="modal-body words-ctrl">
            <form class="form-horizontal" action="questions.html">
              <div class="form-group">
                <label class="col-md-2 control-label">描述</label>
                <div class="col-md-10">
                  <div class="tabpanel mkeditor">
                    <ul class="nav nav-tabs" role="tablist">
                      <li role="presentation" class="active">
                        <a href="#mkeditor-editor" role="tab" data-toggle="tab">编辑</a>
                      </li>
                      <li role="presentation">
                        <a class="mkeditor-btn-view" href="#mkeditor-viewer" role="tab" data-toggle="tab">预览</a>
                      </li>
                    </ul>
                    <div class="tab-content">
                      <div class="tab-pane active mkeditor-editor" id="mkeditor-editor" role="tabpanel">

                        <div class="btn-group" role="group">

                          <button type="button" class="btn btn-default mkeditor-btn-bold">
                            <i class="fa fa-bold"></i>
                          </button>
                          <button type="button" class="btn btn-default mkeditor-btn-italic">
                            <i class="fa fa-italic"></i>
                          </button>
                          <button type="button" class="btn btn-default mkeditor-btn-link">
                            <i class="fa fa-link"></i>
                          </button>
                          <button type="button" class="btn btn-default mkeditor-btn-quote">
                            <i class="fa fa-quote-left"></i>
                          </button>
                          <button type="button" class="btn btn-default mkeditor-btn-code">
                            <i class="fa fa-code"></i>
                          </button>
                          <button id="mkeditor-pickfile" type="button" class="btn btn-default mkeditor-btn-img">
                            <i class="fa fa-image"></i>
                          </button>

                          <button type="button" class="btn btn-default mkeditor-btn-listol">
                            <i class="fa fa-list-ol"></i>
                          </button>
                          <button type="button" class="btn btn-default mkeditor-btn-listul">
                            <i class="fa fa-list-ul"></i>
                          </button>
                        </div>
                        <div class="btn-group pull-right" role="group">
                          <a style="font-size:12px; color:#666; text-decoration:underline;" href="questions.html764"
                             target="_blank">
                            <i class="fa fa-question-circle"></i>Markdown 语法
                          </a>
                        </div>
                        <textarea name="content" class="content"
                                  min="0" max="20000"
                                  placeholder="推荐使用 Markdown 语法，至少输入 5 个字" v-model="content"></textarea>
                        <div class="help-block"></div>
                      </div>
                      <div class="tab-pane mkeditor-viewer markdown-body" id="mkeditor-viewer" role="tabpanel">
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-2 control-label">板块</label>
                <div class="col-md-10">
                  <div class="q-types" data-type="">
                  </div>
                </div>
              </div>

            </form>
          </div>
          <div class="modal-footer">
            <a type="button" class="bottom-link btn btn-primary" href="vip.html" target="_blank"
               style="background:#FFFFFF;color:#00CC99;border:none;float:left;padding-left:0;"><img
              src="images/icon-vip-advance.png" alt=""> 加入高级会员获得助教答疑</a>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="submit-question btn btn-primary" @click="comment()">提交</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '@/api'
  import * as api from '../../api/course/api'
  import dPlayer from 'vue-dplayer'
  import '../../../node_modules/dplayer/dist/DPlayer.min.css'
  import qs from 'querystring'
  import {addCourse, hasBought, buyCourseByBalance, buyCourseByPoint, comment} from '../../api/student/api'

  export default {
    name: 'index',
    // 路由传来的参数
    props: ['courseId'],
    data () {
      return {
        content: '',
        radio: '1',
        discountPrice: '',
        point: '',
        visible: false,
        isBought: false,
        isFree: false,
        videoName: '',
        course: {},
        teacher: {},
        teacherName: '',
        commentList: [],
        videoList: [],
        videoPlayerOptions: {
          autoplay: false,
          video: {
            url: ''
          }
        },
        currentVideo: {}
      }
    },
    components: {
      dPlayer
    },
    mounted () {

    },
    created () {
      /*this.getCourseDetailById()
      this.listCommentByCourseId()
      this.listVideoByCourseId()*/
      this.findCourseByCourseId()
      this.findCommentByCourseId()
      this.hasBought()
    },
    methods: {
      comment: function () {
        if (this.content !== '') {
          comment(this.content, this.course.courseId, this.$store.state.store.studentInfo.studentId).then((response) => {
            if (response.data.success === true) {
              this.$message({
                message: '评论成功!',
                type: 'success'
              })
              setTimeout(function () {
                window.location.reload()
              },1500)
            }
          })
        }
      },
      pay: function () {
        if (this.radio === '1') {
          /*余额支付*/
          if (this.discountPrice > this.$store.state.store.studentInfo.studentInfo.userBalance) {
            this.$message({
              message: '余额不足，请充值!',
              type: 'error'
            })
          } else {
            buyCourseByBalance(this.discountPrice, this.$store.state.store.studentInfo.studentId).then((response) => {
              if (response.data.success === true) {
                this.$store.state.store.studentInfo.studentInfo.userBalance -= this.discountPrice
                addCourse(this.$store.state.store.studentInfo.studentId, this.courseId).then((res) => {
                  if (res.data.success === true) {
                    this.$message({
                      message: '添加成功!',
                      type: 'success'
                    })
                    this.$message({
                      message: '购买成功!',
                      type: 'success'
                    })
                    setTimeout(function () {
                      window.location.reload()
                    }, 1000)
                  } else {
                    this.$message({
                      message: '购买失败，请刷新后重试!',
                      type: 'error'
                    })
                  }
                }).catch(() => {

                })
              }
            })
          }
        } else {
          /*积分支付*/
          if (this.point > this.$store.state.store.studentInfo.studentInfo.userPoint) {
            this.$message({
              message: '积分不足!',
              type: 'error'
            })
          } else {
            buyCourseByPoint(this.point, this.$store.state.store.studentInfo.studentId).then((response) => {
              if (response.data.success === true) {
                this.$store.state.store.studentInfo.studentInfo.userPoint -= this.point
                addCourse(this.$store.state.store.studentInfo.studentId, this.courseId).then((res) => {
                  if (res.data.success === true) {
                    this.$message({
                      message: '添加成功!',
                      type: 'success'
                    })
                    this.$message({
                      message: '购买成功!',
                      type: 'success'
                    })
                    setTimeout(function () {
                      window.location.reload()
                    }, 1000)
                  } else {
                    this.$message({
                      message: '购买失败，请刷新后重试!',
                      type: 'error'
                    })
                  }
                }).catch(() => {

                })
              }
            })
          }
        }
      },
      hasBought () {
        hasBought(this.$store.state.store.studentInfo.studentId, this.courseId).then((response) => {
          if (response.data.success === true) {
            this.isBought = true
          }
        })
      },
      addCourse () {
        /*判断该门课程是否免费*/
        if (this.isFree === true) {
          /*免费则直接添加*/
          addCourse(this.$store.state.store.studentInfo.studentId, this.courseId).then((response) => {
            if (response.data.success === true) {
              this.$message({
                message: '添加成功!',
                type: 'success'
              })
              setTimeout(function () {
                window.location.reload()
              }, 1000)
            } else {
              this.$message({
                message: '添加失败，请刷新后重试!',
                type: 'error'
              })
            }
          }).catch(() => {

          })
        } else {
          /*不免费则进入付费页面*/
          this.visible = true
        }
      },
      play () {
        console.log('play')
      },
      findCourseByCourseId () {
        api.findCourseByCourseId(this.courseId).then((response) => {
          this.course = response.data.queryResult.list[0]
          this.teacher = this.course.teacherLogin
          this.teacherName = this.teacher.teacherInfo.teacherName
          this.videoList = this.course.courseVideoList
          this.initVideoData(this.videoList[0])
          if (this.course.coursePrice.isFree === 1) {
            this.isFree = true
          } else {
            this.discountPrice = this.course.coursePrice.discountPrice
            this.point = this.course.coursePrice.point
          }
        })
      },
      findCommentByCourseId () {
        api.findCommentByCourseId(this.courseId).then((response) => {
          this.commentList = response.data.queryResult.list
        })
      },
      changeCurrentVideo (video) {
        this.initVideoData(video)
      },
      getCourseDetailById () {
        API.course.getCourseDetailById(this.courseId).then(({data}) => {
          if (data && data.code === 200) {
            this.course = data.course
          }
        })
      },
      listCommentByCourseId () {
        API.course.listCommentByCourseId(this.courseId).then(({data}) => {
          if (data && data.code === 200) {
            this.commentList = data.commentList
          }
        })
      },
      listVideoByCourseId () {
        API.course.listVideoByCourseId(this.courseId).then(({data}) => {
          if (data && data.code === 200) {
            this.videoList = data.videoList
            this.initVideoData()
          }
        })
      },
      initVideoData (video) {
        this.currentVideo = video
        this.videoName = '第' + video.chapter + '节 ' + video.name
        this.videoPlayerOptions = {
          video: {
            url: this.currentVideo.url,
            /*pic: this.currentVideo.coverImageUrl*/
          },
          autoplay: false
        }
        this.player = this.$refs.player.dp
        this.player.switchVideo({
          url: this.currentVideo.url,
          /*pic: this.currentVideo.coverImageUrl*/
        })
      }
    }
  }
</script>

<style scoped>

</style>

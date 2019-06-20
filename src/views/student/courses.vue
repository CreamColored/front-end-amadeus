<template>
  <div id="container" style="padding-top: 100px">
    <el-table
      :data="courses"
      style="width: 800px;margin: 0 auto">
      <el-table-column
        label="课程名称"
        width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.courseName }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="课程难度"
        width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="scope.row.courseLevel==='BEGINNER LEVEL'">初级</span>
          <span style="margin-left: 10px" v-else-if="scope.row.courseLevel==='INTERMEDIATE LEVEL'">中级</span>
          <span style="margin-left: 10px" v-else-if="scope.row.courseLevel==='ADVANCED LEVEL'">高级</span>
        </template>
      </el-table-column>
      <el-table-column
        label="课程状态"
        width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="scope.row.courseState===1">可用</span>
          <span style="margin-left: 10px" v-else-if="scope.row.courseState===0">已冻结</span>
        </template>
      </el-table-column>
      <el-table-column
        label="发布日期"
        width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.releaseDate.substring(0,10)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <a :href="'#/course/'+scope.row.courseId" v-if="scope.row.courseState===1">
            <el-button
              size="mini"
              type="primary">继续学习
            </el-button>
          </a>
          <a href="javascript:void(0)" v-else>
            <el-button
              size="mini"
              type="primary" disabled>继续学习
            </el-button>
          </a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import * as api from '../../api/course/api'

  export default {
    name: 'courses',
    data () {
      return {
        courses: [],
        currentPage: 1,
        pageSize: 10,
        totalNumber: 100
      }
    },
    created () {
      this.getCourses()
    },
    methods: {
      getCourses: function () {
        api.findCoursesByStudentId(this.$store.state.store.token, this.currentPage, this.pageSize).then((response) => {
          if (response.data.success === true) {
            this.courses = response.data.queryResult.list
          }
        }).catch(() => {

        })
      }
    },
    computed: mapState({
      isLogin: state => state.store.isLogin,
      studentInfo: state => state.store.studentInfo,
      token: state => state.store.token
    })
  }
</script>

<style scoped>

</style>

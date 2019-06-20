<template>
  <div id="container">
    <el-form ref="form" :model="form" label-width="80px" id="el-form">
      <el-form-item label="姓名">
        <el-input v-model="form.studentInfo.studentName"></el-input>
      </el-form-item>
      <el-form-item label="账户余额">
        <span>{{form.studentInfo.userBalance}}元</span>
        <a href="javascript:void(0)" @click="open">充值</a>
      </el-form-item>
      <el-form-item label="账户积分">
        <span>{{form.studentInfo.userPoint}}分</span>
      </el-form-item>
      <el-form-item label="头像">
        <el-image
          style="width: 100px; height: 100px"
          :src="form.studentInfo.avatar"
          fit="fill">
        </el-image>
        <el-upload
          class="avatar-uploader"
          :action=updateUrl
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          multiple>
        </el-upload>

      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.telephoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.studentInfo.birthday"
                          style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="证件类型">
        <el-select v-model="form.studentInfo.certificateType" placeholder="请选择证件类型">
          <el-option label="身份证" value="1">身份证</el-option>
          <el-option label="军官证" value="2">军官证</el-option>
          <el-option label="护照" value="3">护照</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号">
        <el-input v-model="form.studentInfo.certificateCode"></el-input>
      </el-form-item>
      <el-form-item label="省份">
        <el-input v-model="form.studentInfo.province"></el-input>
      </el-form-item>
      <el-form-item label="城市">
        <el-input v-model="form.studentInfo.city"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即修改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import * as api from '../../api/student/api'
  export default {
    name: 'student-info',
    data () {
      return {
        updateUrl:'http://localhost:65535/api/student/uploadImage/'+this.$store.state.store.studentInfo.studentId,
        imageUrl: '',
        form: {
          email: '',
          telephoneNumber: '',
          studentInfo: {}
        }
      }
    },
    created () {
      this.setForm()
    },
    methods: {
      open() {
        this.$prompt('请输入充值金额', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          api.recharge(value, this.$store.state.store.studentInfo.studentId).then((response) => {
            if (response.data.success === true) {
              this.$store.state.store.studentInfo.studentInfo.userBalance += parseFloat(value)
              this.$message({
                type: 'success',
                message: '充值成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: '充值失败，请稍后重试'
              })
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      setForm () {
        this.form.email = this.$store.state.store.studentInfo.email
        this.form.telephoneNumber = this.$store.state.store.studentInfo.telephoneNumber
        this.form.studentInfo = this.$store.state.store.studentInfo.studentInfo
        if (this.form.studentInfo.certificateType === 1) {
          this.form.studentInfo.certificateType = '身份证'
        } else if (this.form.studentInfo.certificateType === 2) {
          this.form.studentInfo.certificateType = '军官证'
        } else if (this.form.studentInfo.certificateType === 3) {
          this.form.studentInfo.certificateType = '护照'
        }
      },
      onSubmit () {
        this.$message({
          message: '信息修改成功!',
          type: 'success'
        })
      },
      handleAvatarSuccess(res) {
        this.$message({
          message: '修改头像成功!',
          type: 'success'
        })
        this.$store.state.store.studentInfo.studentInfo.avatar = res
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    }
  }
</script>

<style scoped>
  #container {
    padding-top: 100px;
  }

  #el-form {
    width: 400px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

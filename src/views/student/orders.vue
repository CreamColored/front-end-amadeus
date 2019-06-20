<template>
  <div id="container" style="padding-top: 100px">
    <el-table
      :data="orders"
      style="width: 800px;margin: 0 auto">
      <el-table-column
        label="课程名称"
        width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.courseInfo.courseName }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="付款时间"
        width="240">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.orderTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="付款方式"
        width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="scope.row.paymentMethod==='BALANCE'">余额</span>
          <span style="margin-left: 10px" v-else>积分</span>
        </template>
      </el-table-column>
      <el-table-column
        label="花费"
        width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="scope.row.paymentMethod==='BALANCE'">{{scope.row.price}}元</span>
          <span style="margin-left: 10px" v-else>{{scope.row.price}}分</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import * as api from '../../api/order/api'

  export default {
    name: 'orders',
    data () {
      return {
        orders: [],
        currentPage: 1,
        pageSize: 10,
        totalNumber: 100
      }
    },
    created () {
      this.getOrders()
    },
    methods: {
      getOrders: function () {
        api.findOrderInfoByStudentId(this.$store.state.store.studentInfo.studentId, this.currentPage, this.pageSize).then((response) => {
          if (response.data.success === true) {
            this.orders = response.data.queryResult.list
          }
        }).catch(() => {

        })
      }
    }
  }
</script>

<style scoped>

</style>

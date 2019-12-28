<template>
<!-- 卡片组件 -->
<el-card>
    <bread-crumb slot="header">
    <template slot="title">评论管理</template>
    </bread-crumb>
    <!-- 表格组件 -->
    <el-table :data="list">
        <!-- 放置列组件 -->
        <el-table-column width="600px" label="标题" prop="title"></el-table-column>
        <el-table-column :formatter="formatterBoolean" label="评论状态" prop="comment_status"></el-table-column>
        <el-table-column  label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column  label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column  label="操作">
            <template slot-scope="obj">
                <!-- 作用域插槽 -->
            <el-button size="small" type="text">修改</el-button>
            <el-button @click="openOrCloseState(obj.row)" size="small" type="text"> {{obj.row.comment_status ? '关闭' : '正常'}}评论</el-button>

            </template>

        </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" align="mmiddle" style="height:80px">
        <!-- 总页码 每页多少条 -->
        <el-pagination background layout="prev, pager, next"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        @current-change="getChange">
</el-pagination>
    </el-row>

</el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [], // 定义一个数据接收返回结果
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }// 专门存放分页信息
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    getChange (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    formatterBoolean (row, column, cellValue, index) {
      // row =》 当前行数据
      // column => 当前列信息
      // cellValue =》 当前的单元格值
      // index 索引
      return cellValue ? '正常' : '关闭'
    },
    openOrCloseState (row) {
      // 直接调用接口
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否${mess}评论？`, '提示').then(() => {
        // 调用接口
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }// 因为当前如果是打开，就要关闭，如果是关闭，就要打开
        }).then(result => {
          this.getComment()// 重新拉取数据
        }).catch(() => {
          debugger
        })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>

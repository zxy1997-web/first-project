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
            <el-button size="small" type="text"> {{obj.row.comment_status ? '关闭' : '正常'}}评论</el-button>

            </template>

        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []// 定义一个数据接收返回结果
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        this.list = result.data.results
      })
    },
    formatterBoolean (row, column, cellValue, index) {
      // row =》 当前行数据
      // column => 当前列信息
      // cellValue =》 当前的单元格值
      // index 索引
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>

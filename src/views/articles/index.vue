<template>
  <el-card class="articles">
      <bread-crumb slot="header">
      <template slot="title">文章列表</template>
      </bread-crumb>
      <!-- 表单容器 -->
      <el-form style="padding-left:50px">
          <el-form-item label="文章状态">
              <el-radio-group v-model="searchForm.status">
                  <el-radio :label="5">全部</el-radio>
                  <el-radio :label="0">草稿</el-radio>
                  <el-radio :label="1">待审核</el-radio>
                  <el-radio :label="2">审核通过</el-radio>
                  <el-radio :label="3">审核失败</el-radio>
              </el-radio-group>

          </el-form-item>
          <el-form-item label="频道列表">
              <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
                  <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="时间选择">
              <el-date-picker v-model="searchForm.dateRange" type="daterange"></el-date-picker>
          </el-form-item>

      </el-form>
      <el-row class="total" type="flex" align="middle">
          <span>

          </span>
      </el-row>
      <div class="article-item" v-for="item in list" :key="item.id.toString()">
          <div class="left">
              <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
              <div class="info">
                  <span>{{item.title}}</span>
                  <el-tag :type="item.status | filterType" class='tag'>{{ item.status | filterStatus }}</el-tag>
                  <span class="date">{{item.pubdate}}</span>
              </div>
          </div>
          <div class="right">
              <span><i class="el-icon-edit"></i>修改</span>
              <span><i class="el-icon-delete"></i>删除</span>
          </div>
      </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5, // 默认值
        channels_id: null,
        dateRange: []
      },
      channels: [],
      list: [],
      defaultImg: require('../../assets/img/default.gif')
    }
  },
  filters: {
    //   过滤器第一个参数 是value
    filterStatus (value) {
      //  文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      //  文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
  }
}
</script>

<style lang="less" scoped>
.articles{
    .total{
        height: 60px;
        border-bottom: 1px dashed #ccc;
    }
    .article-item{
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        border-bottom: 1px solid #f2f3f5;
        .left{
            display: flex;
            img{
                width: 180px;
                height: 100px;
                border-radius: 4px;
            }
            .info{
                height: 100px;
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                .date{
                    color: #999;
                    font-size: 12px;
                }
                .tag{
                    text-align: center;
                    width: 60px;
                }
            }
        }
        .right{
            span{
                font-size: 14px;
                margin-right: 8px;
            }
        }
    }
}
</style>

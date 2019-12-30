<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">
          素材管理
      </template>
      </bread-crumb>
      <!-- 上传 -->
      <el-row type='flex' justify="end">
      <el-upload action="" :http-request="uploadImg" :show-file-list="false">
        <el-button size="small" type="primary">上传图片</el-button>
      </el-upload>
    </el-row>
      <!-- 标签页 -->
      <el-tabs v-model="activeName" @tab-click="changeTab">
          <el-tab-pane label="全部图片" name="all">
            <!-- 生成页面结构 -->
            <div class="img-list">
              <el-card class="img-card" v-for="item in list " :key="item.id">
                <img :src="item.url" alt="">
                <el-row class="opeate" type="flex" justify="space-around" align="middle">
                  <!-- 判断是否改变图标颜色 -->
                  <i @click="collectOrCanel(item)" :style="{color : item.is_collected ? 'red' : '#000'}" class="el-icon-star-on"></i>
                  <i @click="delMaterial(item.id)" class="el-icon-delete-solid"></i>
                </el-row>
              </el-card>
            </div>

            </el-tab-pane>
          <el-tab-pane label="收藏图片" name="collect">
            <div class="img-list">
              <el-card class="img-card" v-for="item in list " :key="item.id">
                <img :src="item.url" alt="">
              </el-card>
            </div>
          </el-tab-pane>
      </el-tabs>
      <el-row type="flex" justify="center">
             <el-pagination
             :current-page="page.currentPage"
             :page-size="page.pageSize"
             @current-change="changePage"
                background
                layout="prev, pager, next"
                :total="page.total">
              </el-pagination>
            </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    collectOrCanel (item) {
      this.$axios({
        method: 'put',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(result => {
        this.getMaterial()
      })
    },
    delMaterial (id) {
      this.$confirm('你确定要删除此图片？')
      this.$axios({
        method: 'delete',
        url: `/user/images/${id}`
      })
      this.getMaterial()
    },
    uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        method: 'post',
        url: '/user/images',
        data
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 切换页签方法
    changeTab () {
      this.page.currentPage = 1
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          page: this.page.currentPage,
          per_page: this.page.pageSize,
          collect: this.activeName === 'collect'
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scpoped>
.img-list{
  display: flex;
  flex-wrap: wrap;
  .img-card{
    width: 200px;
    height: 220px;
    margin: 20px 50px;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .opeate{
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: 20px;
      height: 36px;
      background-color: #f4f5f6;
      i{
        cursor: pointer;
      }
    }
  }
}
</style>

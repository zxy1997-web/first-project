<template>
  <el-row class="layout-header" type="flex" align="middle">
      <el-col class="left" :span="12">
          <i class="el-icon-s-fold"></i>
          <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col class="right" :span="12">
          <el-row type="flex" justify="end" align="middle">
              <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt="">
              <el-dropdown>
                  <span>{{userInfo.name}}</span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item>git地址</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
          </el-row>
      </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  created () {
    let token = localStorage.getItem('user-token') // 获取用户令牌
    this.$axios({
      url: '/user/profile',
      headers: {
        //   headers参数
        Authorization: `Bearer ${token}`
      }
    }).then(result => {
      this.userInfo = result.data.data
    })
  }
}
</script>

<style lang='less'>
.layout-header{
    .left{
        font-size: 20px;
        span{
            color: #2c3e50;
            font-size: 16px;
            margin-left: 4px;
        }
    }
    .right{
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right:5px;
        }
    }
}
</style>

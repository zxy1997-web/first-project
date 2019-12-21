<template>
<el-carousel :interval="4000" type="card" height="500px">
    <el-carousel-item  v-for="item in list" :key="item">
    <img :src="item" alt="" style="height:100%;width:100%">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data () {
    return {
      list: ['https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=101028799,3702409484&fm=26&gp=0.jpg',
        'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3251164952,1552289957&fm=26&gp=0.jpg',
        'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2229258317,1629892341&fm=26&gp=0.jpg']
    }
  }
}
</script>

<style>

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

<template>
  <!-- 放置一个大容器 -->
  <el-container>
    <el-aside style="height:100vh;background-color:#323745;width:230px">
     <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <!-- 上下布局 -->
      <el-header><layout-header></layout-header></el-header>
      <el-main>
        <router-view></router-view>
        </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {

}
</script>

<style>

</style>

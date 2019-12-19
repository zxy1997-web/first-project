<template>
  <div class="login">
      <el-card class="login-card">
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <!-- 放置表单 el-form model 绑定数据对象-->
          <el-form :model="loginForm" :rules="loginRules" ref="formName">
              <!-- 表单域里面放置input/select/checkbox -->
              <el-form-item prop="moblie">
                  <el-input v-model="loginForm.moblie" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                  <el-input v-model="loginForm.code" style="width:65%" placeholder="验证码"></el-input>
                  <el-button style="float:right" plain>发送验证码</el-button>
              </el-form-item>
              <el-form-item prop="check">
                  <el-checkbox v-model="loginForm.check">我已阅读并同意用户登录协议和隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <el-button @click="submitLogin()" type="primary" style="width:100%">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        moblie: '',
        code: '',
        check: false
      },
      loginRules: {
        //   验证规则对象 key(字段名):value(规则 => [])
        moblie: [{ required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码' }],
        code: [{ required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }],
        check: [{ validator: function (rule, value, callback) {
          // 自定义校验函数
          // rule 规则 没啥用
          // value 要校验的字段的值
          // callback 是一个回调函数
          if (value) {
            // 认为已经勾选
            callback()// 认为当前的规则校验通过了
          } else {
            // 认为没有勾选
            callback(new Error('您应该同意我们的霸王条款，让我们欺负你'))// 如果没有勾选 认为当前校验没有通过
          }
        } }]
      }
    }
  },
  methods: {
    submitLogin (formName) {
      // 手动校验
      this.$refs.formName.validate(function (isOK) {
        if (isOK) {
          // 说明校验通过 应该调用接口
          alert('成功')
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login{
    background-image: url('../../assets/img/2.jpg');
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-card{
        width:440px;
        height:350px;
        .title{
            text-align: center;
            margin-bottom: 30px;
            img{
                height:45px;
            }
        }
    }
}
</style>

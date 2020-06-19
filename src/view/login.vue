<template>
  <div style="background: url('http://big5.wallcoo.com/nature/Magic_Landscapes_by_Michael_Breitung/wallpapers/1920x1080/yaki-point.jpg')">
    <div style="display: flex;justify-content: center;margin-top: 10%">
      <el-card>
        <div slot="header" class="clearfix">
          <span>登录</span>
        </div>
        <table>
          <tr>
            <td>账号：</td>
            <td>
              <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
            </td>
          </tr>
          <tr>
            <td>密码：</td>
            <td>
              <el-input type="password" v-model="user.password" placeholder="请输入密码" @keydown.enter.native="doLogin"></el-input>
              <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
            </td>
          </tr>
          <tr>
            <td colspan="2"  style="padding-top: 20px">
              <el-button style="width: 300px" type="primary" @click="doLogin">登录</el-button>
            </td>
          </tr>
        </table>
      </el-card>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return{
      user:{
        username: '',
        password: ''
      }
    }
  },
  methods:{
    doLogin(){
      this.$ajax.post('/auth/auth.login', qs.stringify(this.user)).then(res =>{
        //接口响应错误，提示报错信息
        if(res.data.code === 500){
          this.$message.error(res.data.msg)
          return false
        }
        let result = res.data.result
        // 保存token
        localStorage.setItem('token', 'Bearer ' + result.token)
        // localStorage.setItem('username', result.phone)
        this.$message.success('登录成功')
        this.$router.push({
          path: '/home'
        })
      })
    }
  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 480px;
  }
</style>


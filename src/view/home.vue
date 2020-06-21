<template>
    <el-container style="height: 100%; border: 1px solid #eee;">
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="this.$route.name"
            :router="true"
            :unique-opened="true"
          >
            <el-submenu index="0">
              <template slot="title"><i class="el-icon-menu"></i>系统首页</template>
                <el-menu-item index="index" @click = "addTab('index','系统首页')">系统首页</el-menu-item>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>权限管理</template>
              <el-menu-item index="user">用户管理</el-menu-item>
              <!-- <el-menu-item index="1-3">角色管理</el-menu-item>
              <el-menu-item index="1-4">菜单管理</el-menu-item> -->
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>信息管理</template>
                <el-menu-item index="bookClassify">大分类管理</el-menu-item>
                <el-menu-item index="bookClassifyDetail">小分类管理</el-menu-item>
                <el-menu-item index="bookInfo">图书管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i>订单管理</template>
              <!-- <el-menu-item index="1-6">全部订单</el-menu-item>
              <el-menu-item index="1-7">选项2</el-menu-item> -->
            </el-submenu>
          </el-menu>
        </el-aside>
        
        <el-main class="main">
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>

export default {
  data() {
    return {
    }
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style> 
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    height: 100%;
  }
  .el-menu {
     height: 100%;
     background-color:#ffffff;
  }
  html,body,#app,.el-container{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
      /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
  }
  .main {
      margin: 10px;
      background-color: #F6F6F6;
      padding: 0;
    }
</style>

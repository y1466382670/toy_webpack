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
              <el-menu-item index="index">用户管理</el-menu-item>
              <el-menu-item index="index">角色管理</el-menu-item>
              <el-menu-item index="index">菜单管理</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>信息管理</template>
                <el-menu-item index="index">分类管理</el-menu-item>
                <el-menu-item index="index">书记管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i>订单管理</template>
              <el-menu-item index="index">全部订单</el-menu-item>
              <el-menu-item index="index">选项2</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        
        <el-main class="main">
          <el-tabs v-model="activeTab" type="card" @tab-remove="removeTab" @tab-click="tabClick">
            <el-tab-pane v-for="(item, index) in tabsItem"
                        :key="item.name"
                        :label="item.title"
                        :name="item.name"
                        :closable="item.closable"
                        :ref="item.ref">
              <component :is="item.content"></component>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>

export default {
  data() {
    return {
      activeTab: '1', //默认显示的tab
      tabIndex: 1, //tab目前显示数
      tabsItem: [
        {
          title: '首页',
          name: '1',
          closable: false,
          ref: 'tabs',
          content: index
        }
      ],
      tabsPath: [{
        name: "1",
        path: '/welcome'
      }]
    }
  },
  watch: {
    '$route': function (to) {  //监听路由的变化，动态生成tabs
      let flag = true //判断是否需要新增页面
      const path = to.path
      if (Object.keys(to.meta).length != 0) {
        for (let i = 0; i < this.$refs.tabs.length; i++) {
          if (i != 0) { //首页不判断 如果页面已存在，则直接定位当页面，否则新增tab页面
            if (this.$refs.tabs[i].label == to.meta.name) {
              this.activeTab = this.$refs.tabs[i].name  //定位到已打开页面
              flag = false
              break
            }
          }
        }
        //新增页面
        if (flag) {
          //获得路由元数据的name和组件名
          const thisName = to.meta.name
          const thisComp = to.meta.comp
          //对tabs的当前激活下标和tabs数量进行自加
          let newActiveIndex = ++this.tabIndex + ''
          //动态双向追加tabs
          this.tabsItem.push({
            title: thisName,
            name: String(newActiveIndex),
            closable: true,
            ref: 'tabs',
            content: thisComp
          })
          this.activeTab = newActiveIndex
          /*
          * 当添加tabs的时候，把当前tabs的name作为key，path作为value存入tabsPath数组中
          * key:tabs的name
          * value:tabs的path
          * {
          *   key: name,
          *   value: path
          * }
          * ///后面需要得到当前tabs的时候可以通过当前tabs的name获得path
          * */
          if (this.tabsPath.indexOf(path) == -1) {
            this.tabsPath.push({
              name: newActiveIndex,
              path: path
            })
          }
        }
      }
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    removeTab(targetName) { //删除Tab
      let tabs = this.tabsItem; //当前显示的tab数组
      let activeName = this.activeTab; //点前活跃的tab

      //如果当前tab正活跃 被删除时执行
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              this.tabClick(nextTab)
            }
          }
        });
      }
      this.activeTab = activeName;
      this.tabsItem = tabs.filter(tab => tab.name !== targetName);
      //在tabsPath中删除当前被删除tab的path
      this.tabsPath = this.tabsPath.filter(item => item.name !== targetName)
    },
    tabClick(thisTab) {
      /*
      * thisTab:当前选中的tabs的实例
      * 通过当前选中tabs的实例获得当前实例的path 重新定位路由
      * */
      let val = this.tabsPath.filter(item => thisTab.name == item.name)
      this.$router.push({
        path: val[0].path
      })
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

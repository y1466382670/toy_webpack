<template>
  <div >
    <!-- 查询 -->
    <el-card style="height: 100px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="分类名称">
          <el-input v-model="formInline.bookClassifyName" placeholder="分类名称"></el-input>
        </el-form-item>
        <el-form-item label="分类编码">
          <el-input v-model="formInline.bookClassifyCode" placeholder="分类编码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-table
        :data="tableData"
        stripe
        style="width: 98%; align:center"
        :height="Height" >
        <el-table-column
          fixed
          prop="id"
          label="ID"
          align="center"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="bookClassifyName"
          label="分类名称"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="bookClassifyCode"
          label="分类编码"
          align="center"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建日期"
          align="center"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
          min-width="50">
        </el-table-column>
        <el-table-column 
          fixed="right"
          label="操作"
          align="center"
          min-width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleLook(scope.$index, scope.row)">查看</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>  
    <el-card class="box-card">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 50, 100, 200, 300]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import qs from 'qs'
  export default {
    data() {
      return {
        Height: 582,
        tableData: [],
        pageNo: 1,
        pageSize: 10,
        total: 1,
        formInline: {
          bookClassifyName: '',
          bookClassifyCode: ''
        }
      }
    },
    methods: {
      // pageSize(每页条数) 改变时会触发	
      handleSizeChange (val) {
        this.pageSize = val
        this.getList()
      },
      //currentPage(当前页) 改变时会触发
      handleCurrentChange (val) {
        this.pageNo = val
        this.getList()
      },
      handleDelete(index, rows) {
        this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(rows.id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      // 获取列表
      getList () {
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
        this.getDataList(params)
      },
      getDataList (params) {
        this.$ajax.post('/product/book.classify.selectAll', qs.stringify(params)).then(res =>{
          this.AllList = res.data.result.list
          this.tableData = res.data.result.list
          this.total = res.data.result.total
          this.pageSize = res.data.result.pageSize
        }).catch(error => {
          this.$message.error(res.data.msg)
        })
      },
      // 查询
      onSearch () {
        this.pageNo = 1
        this.pageSize = 10
        this.getList()
      },
      handleLook(index, rows){
        this.$router.push({
          path: '/bookClassifyDetail',
          query: {
            bookClassifyCode: rows.bookClassifyCode
          }
        })
      }
    },
    //进入页面默认加载方法
    mounted () {
      this.getList()
    }
  }
</script>


<template>
  <div >
    <!-- 查询 -->
    <el-card style="height: 100px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="分类名称">
          <el-input clearable @clear="clearComent" v-model="formInline.bookClassifyName" placeholder="分类名称"></el-input>
        </el-form-item>
        <el-form-item label="分类编码">
          <el-input clearable @clear="clearComent" v-model="formInline.bookClassifyCode" placeholder="分类编码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="height: 70px">
      <el-button type="primary" @click="insertDialogVisible = true" class="add">新 增</el-button>
      <el-button type="primary" @click="importInfo" class="add">导 入</el-button>
      <el-button type="primary" @click="exportInfo" class="add">导 出</el-button>
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
              @click="handleLook(scope.$index, scope.row)">查看子分类</el-button>
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

    <el-dialog title="添加" :visible.sync="insertDialogVisible" width="30%">
      <el-form ref="insertForm" :rules="rules" :model="insertForm" label-width="100px">
        <el-form-item label="分类编码" prop="bookClassifyCode">
          <el-input v-model="insertForm.bookClassifyCode"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="bookClassifyName">
          <el-input v-model="insertForm.bookClassifyName"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="insertForm.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="insert('insertForm')">添加</el-button>
          <el-button @click="insertDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="updateDialogVisible" width="30%">
      <el-form ref="updateForm" :rules="rules" :model="updateForm" label-width="100px">
        <el-form-item label="分类编码" prop="bookClassifyCode">
          <el-input v-model="updateForm.bookClassifyCode"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="bookClassifyName">
          <el-input v-model="updateForm.bookClassifyName"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="updateForm.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="update('updateForm')">添加</el-button>
          <el-button @click="updateDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import qs from 'qs'
  export default {
    data() {
      return {
        insertDialogVisible: false,
        updateDialogVisible: false,
        Height: 582,
        tableData: [],
        pageNo: 1,
        pageSize: 10,
        total: 1,
        formInline: {
          bookClassifyName: '',
          bookClassifyCode: ''
        },
        //新增form表单
        insertForm: {
          bookClassifyCode: '',
          bookClassifyName: '',
          sort: ''
        },
        //修改form表单
        updateForm: {
          id: '',
          bookClassifyCode: '',
          bookClassifyName: '',
          sort: ''
        },
        rules: {
          bookClassifyCode: [
            { required: true, message: '请填写分类编码', trigger: 'blur' }
          ],
          bookClassifyName: [
            { required: true, message: '请填写分类名称', trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '请填写排序', trigger: 'blur' }
          ]
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
      //删除
      handleDelete(index, rows) {
        this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: rows.id
          }
          this.$ajax.post('/product/book.classify.delete', qs.stringify(params)).then(res =>{
            if(res.data.code == 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList()
            }else{
              this.$message.error(res.data.msg)
            }
          }).catch(error => {
            this.$message.error(res.data.msg)
          })
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
          pageSize: this.pageSize,
          bookClassifyName: this.formInline.bookClassifyName,
          bookClassifyCode: this.formInline.bookClassifyCode
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
      // 清空输入框
      clearComent () {
        this.getList()
      },
      //添加
      insert(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.post('/product/book.classify.save', qs.stringify(this.insertForm)).then(res =>{
              if(res.data.code == 200){
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.insertForm.bookClassifyCode = ''
                this.insertForm.bookClassifyName = ''
                this.insertForm.sort = ''
                this.insertDialogVisible = false
                this.getList()
              }else{
                this.$message.error(res.data.msg)
              }
            }).catch(error => {
              this.$message.error(res.data.msg)
            })
          } else {
            return false;
          }
        });
      },
      //点击编辑按钮，查询信息
      handleEdit(index, rows) {
        let params = {
          id: rows.id
        }
        this.$ajax.post('/product/book.classify.get', qs.stringify(params)).then(res =>{
          if(res.data.code == 200){
            this.updateForm.id = res.data.result.id
            this.updateForm.bookClassifyCode = res.data.result.bookClassifyCode
            this.updateForm.bookClassifyName = res.data.result.bookClassifyName
            this.updateForm.sort = res.data.result.sort
          }else{
            this.$message.error(res.data.msg)
          }
        }).catch(error => {
          this.$message.error(res.data.msg)
        })
        this.updateDialogVisible = true
      },
      //修改
      update(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.post('/product/book.classify.modify', qs.stringify(this.updateForm)).then(res =>{
              if(res.data.code == 200){
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.updateForm.id = ''
                this.updateForm.bookClassifyCode = ''
                this.updateForm.bookClassifyName = ''
                this.updateForm.sort = ''
                this.updateDialogVisible = false
                this.getList()
              }else{
                this.$message.error(res.data.msg)
              }
            }).catch(error => {
              this.$message.error(res.data.msg)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 导入
      importInfo () {
        this.$message({
          message: '导入成功',
          type: 'success'
        })
      },
      // 导出
      exportInfo () {
        this.$message({
          message: '导出成功',
          type: 'success'
        })
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


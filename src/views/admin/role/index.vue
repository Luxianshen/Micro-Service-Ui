<template>
  <div class="app-container">
    <data-table ref="customTable" :request="page" :search-form="searchForm">
      <template slot="search">
        <el-form-item prop="sysId">
          <SystemType v-model="searchForm.sysId" :show-desc="false" placeholder="所属系统" />
        </el-form-item>
        <el-form-item prop="roleName">
          <el-input v-model="searchForm.roleName" type="text" placeholder="角色名称" />
        </el-form-item>
        <el-form-item prop="roleCode">
          <el-input v-model="searchForm.roleCode" type="text" placeholder="角色编码" />
        </el-form-item>
      </template>
      <template slot="function">
        <el-button v-permission="['base:admin:super']" type="primary" icon="el-icon-plus" @click="handleAdd">新增
        </el-button>
      </template>
      <template slot="tableColumns">
        <el-table-column prop="id" label="ID" :show-overflow-tooltip="true" />
        <el-table-column prop="roleName" label="名称" />
        <el-table-column prop="roleCode" label="编码" />
        <el-table-column prop="defaultRole" label="系统角色">
          <template slot-scope="scope">
            <el-tag :type="scope.row.defaultRole === 1 ? 'success' : 'danger'">
              {{ scope.row.defaultRole === 1 ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="roleDesc" label="简介" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="action" label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="warning" icon="el-icon-setting" circle
                @click.native.prevent="auth(scope.$index, scope.row)" />
              <el-button type="primary" icon="el-icon-edit" circle
                @click.native.prevent="edit(scope.$index, scope.row)" />
              <el-button type="danger" icon="el-icon-delete" circle
                @click.native.prevent="remove(scope.$index, scope.row)" />
            </el-button-group>
          </template>
        </el-table-column>
      </template>
    </data-table>
    <el-dialog :title="customFormInitOption.title" :visible.sync="customFormInitOption.showModal">
      <RoleForm ref="customForm" :action="customFormInitOption.action" />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button v-if="customFormInitOption.action === 'add'" type="danger" @click="reset">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DataTable from '@/components/datatable/data-table'
import RoleForm from '@/views/admin/role/form'
import SystemType from '@/components/admin/system-type'
import { page, remove } from '@/api/admin/role'

export default {
  components: {
    DataTable,
    RoleForm,
    SystemType
  },
  data () {
    return {
      page: page,
      searchForm: {
        sysId: null,
        roleName: null,
        roleCode: null
      },
      customFormInitOption: {
        title: '',
        action: '',
        showModal: false,
        id: null
      }
    }
  },
  methods: {
    handleAdd () {
      this.customFormInitOption.title = '新增'
      this.customFormInitOption.action = 'add'
      this.customFormInitOption.showModal = true
      this.reset()
    },
    edit (index, row) {
      this.customFormInitOption.title = '编辑'
      this.customFormInitOption.action = 'edit'
      this.customFormInitOption.showModal = true
      this.customFormInitOption.id = row.id
      this.$nextTick(() => {
        this.$refs.customForm.getInfo(row.id)
      })
    },
    remove (index, row) {
      this.$confirm('将删除名称为【' + row.roleName + '】的角色？会同时清除对应的授权信息.', '请确认', {
        type: 'warning'
      }).then(() => {
        remove(row.id).then(response => {
          const result = response.data
          let title, type, text
          if (result.code === 0) {
            title = '成功'
            type = 'success'
          } else {
            title = result.code
            text = result.msg
            type = 'error'
          }
          this.$notify({
            title: title,
            message: text,
            type: type
          })
          this.$refs.customTable.query()
        })
      }).catch(() => { })
    },
    handleSubmit () {
      this.$refs.customForm.handleSubmit()
    },
    reset () {
      this.$nextTick(() => {
        this.$refs.customForm.reset()
      })
    },
    auth (index, row) {
      const path = '/admin/role/auth/' + row.id
      this.$router.replace({
        path: path
      })
    }
  }
}
</script>

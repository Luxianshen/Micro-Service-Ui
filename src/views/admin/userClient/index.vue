<template>
  <div class="app-container">
    <data-table ref="customTable" :request="page" :search-form="searchForm">
      <template slot="search">
        <el-form-item prop="agentId">
          <el-input v-model="searchForm.agentId" type="text" placeholder="帐号" />
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="searchForm.email" type="text" placeholder="邮箱" />
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="searchForm.name" type="text" placeholder="姓名" />
        </el-form-item>
        <el-form-item prop="state">
          <el-select v-model="searchForm.state" placeholder="状态">
            <el-option label="全部" value />
            <el-option label="正常" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
      </template>
      <template slot="function">
        <el-button v-permission="['base:admin:super']" type="primary" icon="el-icon-plus" @click="handleAdd">新增
        </el-button>
      </template>
      <template slot="tableColumns">
        <el-table-column prop="id" label="ID" :show-overflow-tooltip="true" />
        <el-table-column prop="agentId" label="客户端ID" />
        <el-table-column prop="agentAuth" label="客户端认证" />
        <el-table-column prop="macKey" label="密钥" />
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.state === 1 ? 'success' : 'danger'">
              {{ scope.row.state === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column prop="action" label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="warning" icon="el-icon-setting" circle
                @click.native.prevent="auth(scope.$index, scope.row)" />
              <el-button type="danger" icon="el-icon-delete" circle
                @click.native.prevent="remove(scope.$index, scope.row)" />
            </el-button-group>
          </template>
        </el-table-column>
      </template>
    </data-table>
    <el-dialog :title="customFormInitOption.title" :visible.sync="customFormInitOption.showModal"
      :close-on-click-modal="false">
      <UserClientForm ref="customForm" :action="customFormInitOption.action" />
      <div slot="footer">
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button v-if="customFormInitOption.action === 'add'" type="danger" @click="reset">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DataTable from '@/components/datatable/data-table'
import UserClientForm from '@/views/admin/userClient/form'
import { remove, page } from '@/api/admin/userClient'

export default {
  components: {
    DataTable,
    UserClientForm
  },
  data () {
    return {
      page: page,
      searchForm: {
        agentId: '',
        name: '',
        state: null,
        email: ''
      },
      customFormInitOption: {
        title: '',
        action: '',
        showModal: false
      }
    }
  },
  methods: {
    handleAdd () {
      this.customFormInitOption.title = '新增客户端'
      this.customFormInitOption.action = 'add'
      this.customFormInitOption.showModal = true
      this.$nextTick(() => {
        this.$refs.customForm.reset()
      })
    },
    edit (index, row) {
      this.customFormInitOption.title = '编辑客户端'
      this.customFormInitOption.action = 'edit'
      this.customFormInitOption.showModal = true
      this.$nextTick(() => {
        this.$refs.customForm.getInfo(row.id)
      })
    },
    remove (index, row) {
      this.$confirm('确定删除账号为【' + row.agentId + '】的客户端吗？', '请确认', {
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
      this.$refs.customForm.reset()
    },
    auth (index, row) {
      const path = '/admin/userClient/auth/' + row.id
      this.$router.replace({
        path: path
      })
    }
  }
}
</script>

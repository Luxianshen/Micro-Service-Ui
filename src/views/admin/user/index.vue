<template>
  <div class="app-container">
    <data-table
      ref="customTable"
      :request="page"
      :search-form="searchForm"
    >
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
        <el-button v-permission="['base:admin:super']" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      </template>
      <template slot="tableColumns">
        <el-table-column prop="id" label="ID" :show-overflow-tooltip="true" />
        <el-table-column prop="agentId" label="帐号" />
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.state === 1 ? 'success' : 'danger'">
              {{ scope.row.state === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="phoneNo" label="电话号码" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="gender" label="性别">
          <template slot-scope="scope">
            {{ scope.row.gender === 1 ? '男' : scope.row.gender === 2 ? '女' : '未知' }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column prop="action" label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                @click.native.prevent="edit(scope.$index, scope.row)"
              />
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click.native.prevent="remove(scope.$index, scope.row)"
              />
            </el-button-group>
          </template>
        </el-table-column>
      </template>
    </data-table>
    <el-dialog
      :title="customFormInitOption.title"
      :visible.sync="customFormInitOption.showModal"
      :close-on-click-modal="false"
    >
      <UserForm
        ref="customForm"
        :action="customFormInitOption.action"
      />
      <div slot="footer">
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button v-if="customFormInitOption.action === 'add'" type="danger" @click="reset">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DataTable from '@/components/datatable/data-table';
import UserForm from '@/views/admin/user/form';
import { remove, page } from '@/api/admin/user';

export default {
  components: {
    DataTable,
    UserForm
  },
  data() {
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
    };
  },
  methods: {
    handleAdd() {
      this.customFormInitOption.title = '新增用户';
      this.customFormInitOption.action = 'add';
      this.customFormInitOption.showModal = true;
      this.$nextTick(() => {
        this.$refs.customForm.reset();
      });
    },
    edit(index, row) {
      this.customFormInitOption.title = '编辑用户';
      this.customFormInitOption.action = 'edit';
      this.customFormInitOption.showModal = true;
      this.$nextTick(() => {
        this.$refs.customForm.getInfo(row.id);
      });
    },
    remove(index, row) {
      this.$confirm('确定删除账号为【' + row.agentId + '】, 姓名为【' + row.name + '】的用户吗？', '请确认', {
        type: 'warning'
      }).then(() => {
        remove(row.id).then(response => {
          const result = response.data;
          let title, type, text;
          if (result.code === 0) {
            title = '成功';
            type = 'success';
          } else {
            title = result.code;
            text = result.msg;
            type = 'error';
          }
          this.$notify({
            title: title,
            message: text,
            type: type
          });
          this.$refs.customTable.query();
        });
      }).catch(() => {});
    },
    handleSubmit() {
      this.$refs.customForm.handleSubmit();
    },
    reset() {
      this.$refs.customForm.reset();
    }
  }
};
</script>

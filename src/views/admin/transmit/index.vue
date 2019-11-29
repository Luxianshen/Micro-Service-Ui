<template>
  <div class="app-container">
    <data-table
      ref="customTable"
      :request="page"
      :search-form="searchForm"
    >
      <template slot="search">
        <el-form-item prop="title">
          <el-input v-model="searchForm.name" type="text" placeholder="接口名称" />
        </el-form-item>
        <el-form-item prop="permissionCode">
          <el-input v-model="searchForm.permissionCode" type="text" placeholder="权限编码" />
        </el-form-item>
      </template>
      <template slot="function">
        <el-button v-permission="['base:admin:super']" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      </template>
      <template slot="tableColumns">
        <el-table-column prop="id" label="ID" :show-overflow-tooltip="true" />
        <el-table-column prop="sysId" label="系统" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="apiKey" label="请求key" />
        <el-table-column prop="permissionCode" label="权限编码" />
        <el-table-column prop="realUrl" label="真实路劲" />
        <el-table-column prop="reqType" label="请求类型" />
        <el-table-column prop="state" label="接口状态" />
        <el-table-column prop="seq" label="排序" />
        <el-table-column prop="apiDesc" label="接口描述" />
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
    >
      <TransmitForm
        ref="customForm"
        :action="customFormInitOption.action"
      />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button v-if="customFormInitOption.action === 'add'" type="danger" @click="reset">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DataTable from '@/components/datatable/data-table';
import TransmitForm from '@/views/admin/transmit/form';
import { remove, page } from '@/api/admin/transmit';

export default {
  components: {
    DataTable,
    TransmitForm
  },
  data() {
    return {
      page: page,
      searchForm: {
        sysId: null,
        name: null,
        permissionCode: null
      },
      customFormInitOption: {
        title: '',
        action: '',
        showModal: false,
        id: null
      }
    };
  },
  methods: {
    handleAdd() {
      this.customFormInitOption.title = '新增权限';
      this.customFormInitOption.action = 'add';
      this.customFormInitOption.showModal = true;
      this.reset();
    },
    edit(index, row) {
      this.customFormInitOption.title = '编辑权限';
      this.customFormInitOption.action = 'edit';
      this.customFormInitOption.showModal = true;
      this.customFormInitOption.id = row.id;
      this.$nextTick(() => {
        this.$refs.customForm.getInfo(row.id);
      });
    },
    remove(index, row) {
      this.$confirm('将删除编码为【' + row.permissionCode + '】的权限信息,授权信息也将一并清除.', '请确认', {
        type: 'warning'
      }).then(() => {
        remove(row.id).then(response => {
          const result = response.data;
          let title, type;
          if (result.code === 0) {
            title = '成功';
            type = 'success';
          } else {
            title = result.code;
            type = 'danger';
          }
          this.$notify({
            title: title,
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
      this.$nextTick(() => {
        this.$refs.customForm.reset();
      });
    },
    getPermissionTypeText(cellValue) {
      let text = '其他';
      switch (cellValue) {
        case 0:
          text = '菜单';
          break;
        case 1:
          text = '资源';
          break;
        case 2:
          text = '功能';
          break;
        default:
      }
      return text;
    },
    getPermissionTypeColor(cellValue) {
      let type = 'danger';
      switch (cellValue) {
        case 0:
          type = 'success';
          break;
        case 1:
          type = 'info';
          break;
        case 2:
          type = 'warning';
          break;
        default:
      }
      return type;
    }
  }
};
</script>

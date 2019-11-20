<template>
  <div>
    <data-table
      ref="userTable"
      :request="userPage"
      :search-form="searchForm"
    >
      <template slot="search">
        <el-form-item prop="agentId">
          <el-input v-model="searchForm.agentId" type="text" placeholder="帐号" />
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="searchForm.name" type="text" placeholder="姓名" />
        </el-form-item>
        <el-form-item prop="state">
          <el-select v-model="searchForm.state" placeholder="用户状态">
            <el-option label="全部" value />
            <el-option label="正常" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item prop="checked">
          <el-select v-model="searchForm.checked" placeholder="授权状态">
            <el-option label="全部" value />
            <el-option label="已授权" :value="1" />
            <el-option label="未授权" :value="0" />
          </el-select>
        </el-form-item>
      </template>
      <template slot="tableColumns">
        <el-table-column prop="id" label="ID" :show-overflow-tooltip="true" />
        <el-table-column prop="agentId" label="帐号" />
        <el-table-column prop="state" label="帐号状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.state === 1 ? 'success' : 'warning'">
              {{ scope.row.state === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="checked" label="授权状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.checked === true ? 'success' : 'warning'">
              {{ scope.row.checked === true ? '已授权' : '未授权' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                :type="scope.row.checked !== true ? 'success' : 'warning'"
                :icon="scope.row.checked !== true ? 'el-icon-setting' : 'el-icon-delete'"
                circle
                @click.native.prevent="scope.row.checked !== true ? grant(scope.$index, scope.row) : revoke(scope.$index, scope.row)"
              />
            </el-button-group>
          </template>
        </el-table-column>
      </template>
    </data-table>
  </div>
</template>
<script>
import DataTable from '@/components/datatable/data-table';
import { authUserPage, grant, revoke } from '@/api/admin/role';

export default {
  name: 'AuthUser',
  components: {
    DataTable
  },
  props: {
    roleId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      userPage: authUserPage,
      searchForm: {
        agentId: null,
        name: null,
        state: null,
        roleId: this.roleId,
        checked: null
      }
    };
  },
  methods: {
    grant(index, row) {
      this.$confirm('该角色将授权给用户名:【' + row.agentId + '】,姓名:【' + row.name + '】的用户，请确认!', '授权角色', {
        type: 'warning'
      }).then(() => {
        const params = {
          roleId: this.roleId,
          relType: 2,
          relId: row.id
        };
        grant(params).then(response => {
          const result = response.data;
          let title, type, text;
          if (result.code === 0) {
            title = '成功';
            type = 'success';
            this.$refs.userTable.query();
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
        });
      }).catch(() => {});
    },
    revoke(index, row) {
      this.$confirm(
        '将操作将取消用户名:【' + row.agentId + '】,姓名:【' + row.name + '】的用户的角色权限，请确认!',
        '取消授权', {
          type: 'warning'
        }).then(() => {
        const params = {
          roleId: this.roleId,
          relType: 2,
          relId: row.id
        };
        revoke(params).then(response => {
          const result = response.data;
          let title, type, text;
          if (result.code === 0) {
            title = '成功';
            type = 'success';
            this.$refs.userTable.query();
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
        });
      }).catch(() => {});
    }
  }
};
</script>

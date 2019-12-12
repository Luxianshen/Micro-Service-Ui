<template>
  <div class="app-container">
    <el-card :bordered="false">
      <p slot="header">{{ roleInfo.roleName }}({{ roleInfo.roleCode }})</p>
      <p>{{ roleInfo.roleDesc }}</p>
      <p>
        <el-tabs tab-position="left" type="card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-user" />用户</span>
            <AuthUserTable :role-id="$route.params.id" />
          </el-tab-pane>
          <el-tab-pane label="菜单" icon="md-menu">
            <AuthMenuPermissionTree :role-id="$route.params.id" :type="0" />
          </el-tab-pane>
          <!-- <el-tab-pane label="接口" icon="md-aperture">
            <AuthApiPermissionTree :role-id="$route.params.id" :type="1" />
          </el-tab-pane> -->
          <!-- <el-tab-pane label="功能" icon="md-apps">
            <AuthPermissionTree :role-id="$route.params.id" :type="2" />
          </el-tab-pane> -->
        </el-tabs>
      </p>
    </el-card>
  </div>
</template>
<script>
import { get } from '@/api/admin/role'
import AuthUserTable from '@/components/admin/role-auth-user'
import AuthMenuPermissionTree from '@/components/admin/role-auth-permission'
import AuthApiPermissionTree from '@/components/admin/role-auth-api'

export default {
  components: {
    AuthUserTable,
    AuthMenuPermissionTree,
    AuthApiPermissionTree
  },
  data () {
    return {
      roleInfo: {
        id: null,
        roleName: null,
        roleCode: null,
        roleDesc: null
      }
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.getRoleInfo()
    })
  },
  methods: {
    getRoleInfo () {
      const roleId = this.$route.params.id
      get(roleId).then(response => {
        const result = response.data
        if (result.code === 0) {
          this.roleInfo = result.data
        } else {
          this.$notify.error({
            title: result.code,
            message: result.msg
          })
        }
      })
    }
  }
}
</script>

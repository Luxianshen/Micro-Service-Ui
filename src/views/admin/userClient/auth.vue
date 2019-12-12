<template>
  <div class="app-container">
    <el-card :bordered="false">
      <p slot="header">当前客户端ID为：{{ userClientInfo.agentId }}</p>
      <p>
        <el-tabs tab-position="left" type="card">
          <el-tab-pane label="接口" icon="md-aperture">
            <AuthApiPermissionTree :client-id="$route.params.id" :agent-id="userClientInfo.agentId" />
          </el-tab-pane>
        </el-tabs>
      </p>
    </el-card>
  </div>
</template>
<script>
import { get } from '@/api/admin/userClient'
import AuthApiPermissionTree from '@/components/admin/client-auth-api'

export default {
  components: {
    AuthApiPermissionTree
  },
  data () {
    return {
      userClientInfo: {
        id: null,
        agentId: null
      }
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.getCilentInfo()
    })
  },
  methods: {
    getCilentInfo () {
      const clientId = this.$route.params.id
      get(clientId).then(response => {
        const result = response.data
        if (result.code === 0) {
          this.userClientInfo = result.data
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

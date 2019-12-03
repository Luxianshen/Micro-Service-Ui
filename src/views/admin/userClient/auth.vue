<template>
  <div class="app-container">
    <el-card :bordered="false">
      <p slot="header">当前客户端ID为：{{ userClientInfo.agentId }}</p>
      <p>
        <el-tabs tab-position="left" type="card">
          <el-tab-pane label="接口" icon="md-aperture">
            <AuthApiPermissionTree :agent-id="$route.params.id" :type="1" />
          </el-tab-pane>
        </el-tabs>
      </p>
    </el-card>
  </div>
</template>
<script>
import { get } from '@/api/admin/userClient';
import AuthApiPermissionTree from '@/components/admin/client-auth-api';

export default {
  components: {
    AuthApiPermissionTree
  },
  data() {
    return {
      userClientInfo: {
        id: null,
        agentId: null
      }
    };
  },
  mounted: function() {
    this.$nextTick(() => {
      this.getCilentInfo();
    });
  },
  methods: {
    getCilentInfo() {
      const agentId = this.$route.params.id;
      get(agentId).then(response => {
        const result = response.data;
        if (result.code === 0) {
          this.userClientInfo = result.data;
        } else {
          this.$notify.error({
            title: result.code,
            message: result.msg
          });
        }
      });
    }
  }
};
</script>

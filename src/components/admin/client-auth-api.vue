<template>
  <el-card shadow style="height: 100%;width: 100%;">
    <div slot="header" class="clearfix">
      <span>
        <el-tag type="success">已授权</el-tag>
        <el-tag type="danger">未授权</el-tag>
      </span>
    </div>
    <v-org-tree
      v-for="tree in permissionTree"
      :key="tree.id"
      :data="tree"
      :node-render="nodeRender"
      :horizontal="true"
      @on-node-click="handleNodeClick"
    />
  </el-card>
</template>
<script>
import { grantApi, revokeApi, findClientPermissionTree } from '@/api/admin/role'

export default {
  name: 'AuthPermission',
  props: {
    agentId: {
      type: String,
      required: true
    },
    type: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      permissionTree: [],
      zoom: 100
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      this.initTree()
    })
  },
  methods: {
    initTree() {
      const params = {
        id: this.agentId
      }
      findClientPermissionTree(params).then(response => {
        const result = response.data
        if (result.code === 0) {
          this.permissionTree = result.data
        } else {
          this.$notify.error({
            title: result.code,
            message: result.msg
          })
        }
      })
    },
    auth (data) {
      const params = {
        agentId: this.agentId,
        apiId: data.id
      }
      if (!data.checked) {
        grantApi(params).then(response => {
          const result = response.data
          if (result.code === 0) {
            this.$notify({
              title: '成功',
              message: '授权成功',
              type: 'success'
            })
            this.initTree()
          } else {
            this.$notify.error({
              title: result.code,
              message: result.msg
            })
          }
        })
      } else {
        revokeApi(params).then(response => {
          const result = response.data
          if (result.code === 0) {
            this.$notify({
              title: '成功',
              message: '撤销授权成功',
              type: 'success'
            })
            this.initTree()
          } else {
            this.$notify.error({
              title: result.code,
              message: result.msg
            })
          }
        })
      }
    },
    nodeRender (h, data) {
      const color = data.checked === true ? 'success' : 'danger'
      return (
        <el-tag type={color}>{data.name}</el-tag>
      )
    },
    handleNodeClick (e, data, expand) {
      this.auth(data)
    }
  }
}
</script>

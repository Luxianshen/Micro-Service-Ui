<template>
  <el-form
    ref="userClientForm"
    :model="formData"
    :rules="formRules"
    label-width="90px"
  >
    <el-form-item v-if="action === 'edit'" prop="id">
      <input type="hidden" :model="formData.id">
    </el-form-item>
    <el-form-item label="帐号" prop="agentId">
      <el-input v-model="formData.agentId" type="text" placeholder="请输入客户端ID" :readonly="action === 'edit'" />
    </el-form-item>
    <el-form-item label="状态" prop="state">
      <el-radio-group v-model="formData.state">
        <el-radio :label="1">启用</el-radio>
        <el-radio :label="0">禁用</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>
<script>
import { get, save, update } from '@/api/admin/userClient';

export default {
  name: 'SysUserClientFormDialog',
  props: {
    action: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      formRules: {
        agentId: [
          { required: true, message: '客户端ID不能为空！', trigger: 'blur' }
        ]
      },
      formData: {
        id: null,
        agentId: null,
        state: 1
      }
    };
  },
  methods: {
    getInfo(id) {
      get(id).then(response => {
        const result = response.data;
        if (result.code === 0) {
          this.formData = result.data;
        } else {
          this.$notify.error({
            title: result.code,
            message: result.msg
          });
        }
      });
    },
    handleSubmit() {
      this.$refs.userClientForm.validate((valid) => {
        console.log(this.formData);
        if (valid) {
          if (this.action === 'add') {
            // this.formData.agentAuth = md5(this.formData.agentAuth);
            save(this.formData).then(response => {
              this.handleResult(response.data);
            });
          } else if (this.action === 'edit') {
            update(this.formData).then(response => {
              this.handleResult(response.data);
            });
          }
        }
      });
    },
    handleResult(obj) {
      if (obj.code === 0) {
        this.$notify({
          title: '提示',
          message: obj.msg,
          type: 'success'
        });

        this.$parent.$parent.customFormInitOption.showModal = false;
        this.$parent.$parent.$refs.customTable.query();
        this.reset();
      } else {
        this.$notify.error({
          title: obj.code,
          message: obj.msg
        });
      }
    },
    reset() {
      this.$refs.userClientForm.resetFields();
    }
  }
};
</script>

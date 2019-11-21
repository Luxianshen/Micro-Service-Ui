<template>
  <el-form
    ref="userForm"
    :model="formData"
    :rules="formRules"
    label-width="90px"
  >
    <el-form-item v-if="action === 'edit'" prop="id">
      <input type="hidden" :model="formData.id">
    </el-form-item>
    <el-form-item label="帐号" prop="agentId">
      <el-input v-model="formData.agentId" type="text" placeholder="请输入帐号" :readonly="action === 'edit'" />
    </el-form-item>
    <el-form-item v-if="action === 'add'" label="密码" prop="agentAuth">
      <el-input v-model="formData.agentAuth" type="password" placeholder="请输入密码" />
    </el-form-item>
    <el-form-item label="昵称" prop="name">
      <el-input v-model="formData.name" type="text" placeholder="请输入用户昵称/姓名" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="formData.email" type="text" placeholder="请输入email" />
    </el-form-item>
    <el-form-item label="状态" prop="state">
      <el-radio-group v-model="formData.state">
        <el-radio :label="1">启用</el-radio>
        <el-radio :label="0">禁用</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="formData.gender">
        <el-radio :label="0">未知</el-radio>
        <el-radio :label="1">男</el-radio>
        <el-radio :label="2">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="电话号码" prop="phoneNo">
      <el-input v-model="formData.phoneNo" type="text" placeholder="请输入电话号码" />
    </el-form-item>
  </el-form>
</template>
<script>
import { get, save, update } from '@/api/admin/user';
// import md5 from 'md5';

export default {
  name: 'SysUserFormDialog',
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
          { required: true, message: '用户名不能为空！', trigger: 'blur' }
        ],
        agentAuth: [
          { required: true, message: '密码不能为空！', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '昵称不能为空！', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱地址格式不正确！', trigger: 'blur' }
        ],
        phoneNo: [
          { pattern: /^1[3456789]\d{9}$/, message: '电话号码格式不正确', trigger: 'blur' }
        ]
      },
      formData: {
        id: null,
        agentId: null,
        agentAuth: null,
        name: null,
        email: null,
        state: 1,
        gender: 0,
        phoneNo: null
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
      this.$refs.userForm.validate((valid) => {
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
      this.$refs.userForm.resetFields();
    }
  }
};
</script>

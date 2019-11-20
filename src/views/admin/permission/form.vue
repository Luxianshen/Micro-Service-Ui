<template>
  <el-form
    ref="permissionForm"
    :model="formData"
    :rules="formRules"
    label-width="90px"
  >
    <el-form-item v-if="action === 'edit'" prop="id">
      <input v-model="formData.id" type="hidden">
    </el-form-item>
    <el-row>
      <el-col>
        <el-form-item label="所属系统" prop="sysId">
          <SystemType v-model="formData.sysId" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <PermissionType v-model="formData.type" />
        </el-form-item>
        <el-form-item label="名称" prop="title">
          <el-input v-model="formData.title" type="text" placeholder="请输入权限名称" />
        </el-form-item>
        <el-form-item label="权限编码" prop="permissionCode">
          <el-input v-model="formData.permissionCode" type="text" placeholder="请输入权限编码(例：admin:user)" />
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="上级权限" prop="pid">
          <el-input v-model="formData.pid" type="text" placeholder="请选择上级权限" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-switch
            v-model="formData.state"
            active-text="启用"
            inactive-text="禁用"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="内容" prop="path">
          <el-input v-model="formData.path" type="text" placeholder="请输入内容(例： /admin/user)" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="formData.icon" type="text" placeholder="请输入图标" />
        </el-form-item>
        <el-form-item label="排序" prop="seq">
          <el-input-number v-model="formData.seq" :max="99" :min="0" style="width: 100%;" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { get, save, update } from '@/api/admin/permission';
import PermissionType from '@/components/admin/permission-type';
import SystemType from '@/components/admin/system-type';

export default {
  name: 'SysPermissionFormDialog',
  components: {
    PermissionType,
    SystemType
  },
  props: {
    action: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      formRules: {
        title: [
          { required: true, message: '名称不能为空！', trigger: 'blur' }
        ],
        permissionCode: [
          { required: true, message: '权限编码不能为空！', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '权限类型必选' }
        ],
        sysId: [
          { required: true, message: '所属系统必选' }
        ]
      },
      formData: {
        id: null,
        sysId: null,
        type: null,
        title: null,
        pid: null,
        state: 1,
        permissionCode: null,
        path: null,
        icon: null,
        seq: 0
      }
    };
  },
  methods: {
    getInfo(id) {
      get(id).then(response => {
        const result = response.data;
        if (result.code === 0) {
          this.formData = result.data;
          this.formData.type = this.formData.type + '';
        } else {
          this.$msgbox({
            title: result.code,
            message: result.msg,
            type: 'error'
          });
        }
      });
    },
    handleSubmit() {
      this.$refs.permissionForm.validate((valid) => {
        if (valid) {
          if (this.action === 'add') {
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
        this.reset();
        this.$parent.$parent.$refs.customTable.query();
      } else {
        this.$notify({
          title: '提示',
          message: obj.msg,
          type: 'error'
        });
      }
    },
    reset() {
      this.$refs.permissionForm.resetFields();
    }
  }
};
</script>

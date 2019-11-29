<template>
  <el-form
    ref="roleForm"
    :model="formData"
    :rules="formRules"
    label-width="90px"
  >
    <el-form-item v-if="action === 'edit'" prop="id">
      <input v-model="formData.id" type="hidden">
    </el-form-item>
    <el-form-item label="所属系统" prop="sysId">
        <el-select v-model="formData.sysId" class="filter-item" placeholder="请选择系统">
            <el-option v-for="item in sysOptions" :key="item" :label="item | sysFilter" :value="item"/>
        </el-select>
    </el-form-item>
    <el-form-item label="名称" prop="roleName">
      <el-input v-model="formData.roleName" type="text" placeholder="请输入名称" />
    </el-form-item>
    <el-form-item label="角色编码" prop="roleCode">
      <el-input v-model="formData.roleCode" type="text" placeholder="请输入角色编码，如：base:admin:super" />
    </el-form-item>
    <el-form-item label="系统角色" prop="defaultRole">
      <el-radio-group v-model="formData.defaultRole">
        <el-radio :label="1">是</el-radio>
        <el-radio :label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="描述" prop="roleDesc">
      <el-input v-model="formData.roleDesc" type="textarea" :autosize="{ minRows: 3}" placeholder="请输入简介" :maxlength="255" />
    </el-form-item>
  </el-form>
</template>
<script>
import { get, save, update } from '@/api/admin/role';
import SystemType from '@/components/admin/system-type';

export default {
  name: 'RoleForm',
  components: {},
  filters: {
    sysFilter (sys) {
      const sysMap = {
        0: '基础系统',
        1: '内部系统',
        2: '第三方系统'
      }
      return sysMap[sys]
    }
  },
  props: {
    action: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      sysOptions: ['0', '1','2'],
      formRules: {
        sysId: [
          { required: true, message: '所属系统不能为空' }
        ],
        roleName: [
          { required: true, message: '名称不能为空！', trigger: 'blur' }
        ],
        roleCode: [
          { required: true, message: '角色编码不能为空', trigger: 'blur' }
        ]
      },
      formData: {
        id: '',
        sysId: null,
        roleName: '',
        roleCode: '',
        defaultRole: 0,
        roleDesc: ''
      }
    };
  },
  methods: {
    getInfo(id) {
      get(id).then(response => {
        if (response.data.code === 0) {
          this.formData = response.data.data;
        } else {
          this.$notify.error({
            title: response.data.code,
            message: response.data.msg
          });
        }
      });
    },
    handleSubmit() {
      this.$refs.roleForm.validate((valid) => {
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
      this.$refs.roleForm.resetFields();
    }
  }
};
</script>

<template>
  <el-form
    ref="transmitForm"
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
            <el-select v-model="formData.sysId" class="filter-item" placeholder="请选择系统">
                <el-option v-for="item in sysOptions" :key="item" :label="item | sysFilter" :value="item"/>
            </el-select>
        </el-form-item>
        <el-form-item label="请求类型" prop="reqType">
            <el-select v-model="formData.reqType" class="filter-item" placeholder="请选择请求类型">
                <el-option v-for="item in reqTypeOptions" :key="item" :label="item | reqTypeFilter" :value="item"/>
            </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name" type="text" placeholder="请输入权限名称" />
        </el-form-item>
        <el-form-item label="请求路劲" prop="apiKey">
          <el-input v-model="formData.apiKey" type="text" placeholder="请输入请求路劲" />
        </el-form-item>
        <el-form-item label="真实路劲" prop="realUrl">
          <el-input v-model="formData.realUrl" type="text" placeholder="请输入真实路劲" />
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
        <el-form-item label="排序" prop="seq">
          <el-input-number v-model="formData.seq" :max="99" :min="0" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="接口描述" prop="apiDesc">
          <el-input v-model="formData.apiDesc" type="text" placeholder="请输入接口描述" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import { get, save, update } from '@/api/admin/transmit'
import { mapGetters } from 'vuex'

export default {
  name: 'SysTransmitFormDialog',
  components: {},
  props: {
    action: {
      type: String,
      default: 'add'
    }
  },
  filters: {
    sysFilter (sys) {
      const sysMap = {
        0: '基础系统',
        1: '内部系统',
        2: '第三方系统'
      }
      return sysMap[sys]
    },
    reqTypeFilter (reqType) {
      const reqTypeMap = {
        0: 'GET',
        1: 'POST',
        2: 'PUT',
        3: 'DELETE'
      }
      return reqTypeMap[reqType]
    }
  },
  data() {
    return {
      sysOptions: ['0', '1','2'],
      reqTypeOptions: ['0', '1','2','3'],
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
      this.$refs.transmitForm.validate((valid) => {
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
      this.$refs.transmitForm.resetFields();
    }
  }
};
</script>

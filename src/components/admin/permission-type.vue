<template>
  <div>
    <el-select
      :value="currentValue"
      :clearable="true"
      :placeholder="placeholder"
      style="width: 100%;"
      @change="setCurrentValue"
    >
      <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">{{ item.label }}</el-option>
    </el-select>
  </div>
</template>
<script>
import { getPermissionType } from '@/api/admin/combo';

export default {
  name: 'PermissionType',
  props: {
    value: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data() {
    return {
      types: [],
      currentValue: null
    };
  },
  watch: {
    value(val) {
      this.setCurrentValue(val);
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      this.initCombo();
    });
  },
  methods: {
    // initCombo() {
    //   getPermissionType().then(response => {
    //     const result = response.data;
    //     if (result.code === 0) {
    //       this.types = result.data;
    //     }
    //   });
    // },
    setCurrentValue(val) {
      this.currentValue = val;
      this.$emit('input', val);
    }
  }
};
</script>

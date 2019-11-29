<template>
  <div>
    <el-select
      :value="currentValue"
      :clearable="true"
      :placeholder="placeholder"
      style="width: 100%;"
      @change="setCurrentValue"
    >
      <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
        <span>{{ item.label }}</span>
        <span v-if="showDesc" style="float:right;color:#ccc">{{ item.desc }}</span>
      </el-option>
    </el-select>
  </div>
</template>
<script>
// import { getSystemType } from '@/api/admin/combo';

export default {
  name: 'SystemType',
  props: {
    value: {
      type: String,
      default: null
    },
    showDesc: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data() {
    return {
      types: [],
      currentValue: this.value
    };
  },
  watch: {
    value(val) {
      this.setCurrentValue(val)
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      this.initCombo()
    })
  },
  methods: {
    // initCombo() {
    //   getSystemType().then(response => {
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

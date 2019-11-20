<template>
  <div>
    <el-select
      :value="currentValue"
      :clearable="true"
      style="width: 100%;"
      @change="setCurrentValue"
    >
      <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>
<script>
import { getOrgType } from '@/api/admin/combo'

export default {
  name: 'OrgType',
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      types: [],
      currentValue: null
    }
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
    initCombo() {
      getOrgType().then(response => {
        const result = response.data
        if (result.code === 0) {
          this.types = result.data
        }
      })
    },
    setCurrentValue(val) {
      this.currentValue = val
      this.$emit('input', val)
    }
  }
}
</script>

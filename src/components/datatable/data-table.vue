<template>
  <div class="datatable">
    <el-card>
      <div class="filter-container">
        <el-form ref="tableSearchForm" :model="searchForm" inline>
          <slot name="search" />
          <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
          <el-button type="warning" icon="el-icon-refresh" @click="reset">重置</el-button>
          <slot name="function" />
        </el-form>
      </div>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-table v-loading="loading" :data="tableData" :border="border" fit highlight-current-row
            :show-header="showHeader" :size="tableSize" @on-sort-change="sortTable">
            <slot name="tableColumns" />
          </el-table>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" class="pagination">
        <el-col :span="24">
          <div style="float: right;">
            <pagination v-show="total>0" :total="total" :page.sync="current" :limit.sync="pageSize"
              @pagination="pageChange" />
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  name: 'Datatable',
  components: {
    Pagination
  },
  props: {
    request: {
      type: Function,
      default: function () {
      }
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    tableSize: {
      type: String,
      default: 'medium'
    },
    searchForm: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      tableData: [],
      loading: true,
      pageSizes: [10, 20, 30],
      pageSize: 10,
      current: 1,
      total: 0
    }
  },
  computed: {
    // dynamic pagination query params
    params: function () {
      const params = {}
      params.size = this.pageSize
      params.current = this.current
      params.params = this.searchForm
      return params
    },
    hasSearch () {
      return !!this.$slots.search
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.loadData()
    })
  },
  methods: {
    // load remote data
    loadData () {
      this.loading = true

      this.request(this.params)
        .then(res => {
          this.loading = false
          const result = res.data
          if (result.code === 0) {
            this.tableData = result.data.records
            this.total = result.data.total
          } else {
            this.$notify.error({
              title: result.code,
              message: result.msg
            })
          }
        })
        .catch(err => {
          this.loading = false
          this.$notify.error({
            title: '出错啦',
            message: err
          })
          console.log(err)
        })
    },
    //
    query () {
      this.current = 1
      this.total = 0
      this.loadData()
    },
    reset () {
      this.$refs.tableSearchForm.resetFields()
      if (typeof this.$parent.resetTableSearchForm === 'function') {
        this.$parent.resetTableSearchForm()
      }
      this.$message('查询条件已重置')
    },
    // change page size
    sizeChange (pageSize) {
      this.pageSize = pageSize
      this.loadData()
    },
    // change current page
    pageChange (current) {
      this.current = current.page
      this.pageSize = current.limit
      this.loadData()
    },
    // handle sort
    sortTable (column, key, order) {
      console.log(column, key, order)
    }
  }
}
</script>

<style lang="scss" scoped>
.datatable {
  .function {
    padding: 10px;
    line-height: 40px;
  }
  .search {
    margin: 10px 0px 0px 10px;
  }
  .pagination {
    margin: 10px 0px 0px 10px;
  }
}
</style>

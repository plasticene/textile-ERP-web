<template>
  <div ref="root" class="action-columns">
    <!-- :get-popup-container="() => $refs.root" -->
    <a-popover
      v-model="visible"
      :arrow-point-at-center="true"
      placement="bottomRight"
      trigger="click"
      :overlay-style="{ maxHeight: '50vh' }"
      overlay-class-name="h-advance-table-columns"
    >
      <a-tooltip title="列配置">
        <div class="action-wrap" :class="{ 'is-active': visible }">
          <a-icon class="action" type="setting" />
        </div>
      </a-tooltip>

      <div slot="title">
        <a-checkbox
          :indeterminate="indeterminate"
          :checked="checkAll"
          class="check-all"
          @change="onCheckAllChange"
        />
        列展示
        <a-button
          style="float: right"
          type="link"
          size="small"
          @click="resetColumns"
        >
          重置
        </a-button>
      </div>
      <a-list slot="content" style="width: 100%" size="small" :bordered="false">
        <a-list-item v-for="(col, i) in columns" :key="i">
          <div>
            <a-checkbox
              v-model="col.visible"
              @change="e => onCheckChange(e, col)"
            />
            <template v-if="col.title">
              <span class="pdl-1x">{{ col.title }}</span>
            </template>
            <slot
              v-else-if="col.slots && col.slots.title"
              :name="col.slots.title"
            ></slot>
          </div>
          <template v-if="showActions" slot="actions">
            <a-tooltip
              title="固定在列头"
              :mouse-enter-delay="0.5"
              :get-popup-container="() => $refs.root"
            >
              <HIconWrap :class="{ 'is-active': col.fixed === 'left' }">
                <a-icon
                  :class="['left', { active: col.fixed === 'left' }]"
                  type="vertical-align-top"
                  @click="fixColumn('left', col)"
                />
              </HIconWrap>
            </a-tooltip>
            <a-tooltip
              title="固定在列尾"
              :mouse-enter-delay="0.5"
              :get-popup-container="() => $refs.root"
            >
              <HIconWrap :class="{ 'is-active': col.fixed === 'right' }">
                <a-icon
                  :class="['right', { active: col.fixed === 'right' }]"
                  type="vertical-align-bottom"
                  @click="fixColumn('right', col)"
                />
              </HIconWrap>
            </a-tooltip>
          </template>
        </a-list-item>
      </a-list>
    </a-popover>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

import HIconWrap from '@/components/hIconWrap/index.vue'

export default {
  name: 'ActionColumns',
  components: { HIconWrap },
  props: ['columns', 'visibleColumns'],
  data() {
    return {
      visible: false,
      indeterminate: false,
      checkAll: true,
      checkedCounts: this.columns.length,
      backColumns: cloneDeep(this.columns),
      showActions: false
    }
  },
  inject: ['table'],

  watch: {
    checkedCounts(val) {
      this.checkAll = val === this.columns.length
      this.indeterminate = val > 0 && val < this.columns.length
    },
    columns(newVal, oldVal) {
      if (newVal != oldVal) {
        this.checkedCounts = newVal.length
        this.formatColumns(newVal)
      }
    },
    table: {
      handler: function () {
        this.$nextTick(() => {
          const tableEl = this.table.$el
          const tableTbody = tableEl.querySelector('.ant-table-tbody')
          const tableBody = tableEl.querySelector('.ant-table-body')

          if (tableTbody.offsetWidth > tableBody.offsetWidth) {
            this.showActions = true
          } else {
            this.showActions = false
          }
        })
      },
      immediate: true
    }
  },
  created() {
    this.formatColumns(this.columns)
  },
  methods: {
    onCheckChange(e, col) {
      if (!col.visible) {
        this.checkedCounts -= 1
      } else {
        this.checkedCounts += 1
      }
    },
    fixColumn(fixed, col) {
      if (fixed !== col.fixed) {
        this.$set(col, 'fixed', fixed)
      } else {
        this.$set(col, 'fixed', undefined)
      }
    },
    setSearch(col) {
      this.$set(col, 'searchAble', !col.searchAble)
      if (!col.searchAble && col.search) {
        this.resetSearch(col)
      }
    },
    resetSearch(col) {
      // col.search.value = col.dataType === 'boolean' ? false : undefined
      if (!col.search) {
        return
      }
      col.search.value = undefined
      col.search.backup = undefined
    },
    resetColumns() {
      const { columns, backColumns } = this
      let counts = columns.length
      backColumns.forEach((back, index) => {
        const column = columns[index]
        column.visible = back.visible === undefined || back.visible
        if (!column.visible) {
          counts -= 1
        }
        if (back.fixed !== undefined) {
          column.fixed = back.fixed
        } else {
          this.$set(column, 'fixed', undefined)
        }
        this.$set(column, 'searchAble', back.searchAble)
        // column.searchAble = back.searchAble
        this.resetSearch(column)
      })
      this.checkedCounts = counts
      this.visible = false
      this.$emit('reset', this.getConditions(columns))
    },
    onCheckAllChange(e) {
      if (e.target.checked) {
        this.checkedCounts = this.columns.length
        this.columns.forEach(col => (col.visible = true))
      } else {
        this.checkedCounts = 0
        this.columns.forEach(col => (col.visible = false))
      }
    },
    getConditions(columns) {
      const conditions = {}
      columns
        .filter(
          item =>
            item.search.value !== undefined &&
            item.search.value !== '' &&
            item.search.value !== null
        )
        .forEach(col => {
          conditions[col.dataIndex] = col.search.value
        })
      return conditions
    },
    formatColumns(columns) {
      for (let col of columns) {
        if (col.visible === undefined) {
          this.$set(col, 'visible', true)
        }
        if (col.search === undefined) {
          this.$set(col, 'search', {})
        }
        if (!col.visible) {
          this.checkedCounts -= 1
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.action-columns {
  display: inline-block;
}
.check-all {
  margin-right: 8px;
}
.left,
.right {
  transform: rotate(-90deg);
}

.active {
  color: var(--primary-color);
}
</style>

<style lang="less">
.h-advance-table-columns {
  .ant-popover-inner-content {
    max-height: 50vh;
    overflow-y: auto;
    padding: 8px 16px;
  }
  .ant-list-split .ant-list-item {
    border-bottom: 0;
  }
}
</style>

<template>
  <div v-if="showInfo && selectedRows" class="alert">
    <a-alert type="info" :show-icon="true" banner>
      <div slot="message" class="message">
        已选择&nbsp;
        <a>{{ selectedRows.length }}</a>
        &nbsp;项
        <a class="clear" @click="onClear">清空</a>
        <!-- <template v-for="(item, index) in needTotalList">
          <div v-if="item.needTotal" :key="index">
            {{ item.title }}总计&nbsp;
            <a>
              {{
                item.customRender ? item.customRender(item.total) : item.total
              }}
            </a>
          </div>
        </template> -->
      </div>
    </a-alert>
  </div>
</template>

<script>
export default {
  name: 'SelectAlert',
  props: {
    // 多选
    showInfo: { type: Boolean, default: true },
    selectedRows: Array
  },
  data() {
    return {
      needTotalList: []
    }
  },
  created() {},

  methods: {
    updateSelect(selectedRowKeys, selectedRows) {
      // this.$emit('update:selectedRows', selectedRows)
      this.$emit('selectedRowChange', selectedRowKeys, selectedRows)
    },
    onClear() {
      this.updateSelect([], [])
      this.$emit('clear')
    }
  }
}
</script>
<style lang="less" scoped></style>

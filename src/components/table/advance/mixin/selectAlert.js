export default {
  props: {
    // 多选
    showInfo: { type: Boolean, default: false },
    selectedRows: Array,
    checkboxProps: { type: Function, default: () => ({}) }
  },
  computed: {
    selectedRowKeys() {
      return (this.selectedRows || []).map(record => {
        return typeof this.rowKey === 'function'
          ? this.rowKey(record)
          : record[this.rowKey]
      })
    },
    rowSelection({ selectedRows, updateSelect, checkboxProps }) {
      return selectedRows
        ? {
            selectedRowKeys: this.selectedRowKeys,
            onChange: updateSelect,
            fixed: true,
            columnWidth: 40,
            getCheckboxProps: checkboxProps
          }
        : undefined
    }
  },
  methods: {
    updateSelect(selectedRowKeys, selectedRows) {
      this.$emit('update:selectedRows', selectedRows)
      this.$emit('selectedRowChange', selectedRowKeys, selectedRows)
    },
    onSelectClear() {
      this.updateSelect([], [])
      this.$emit('selectClear')
    }
  }
}

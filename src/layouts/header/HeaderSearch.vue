<template>
  <div class="header-search" @click="enterSearchMode">
    <a-icon type="search" class="search-icon" />
    <a-auto-complete
      ref="input"
      :get-popup-container="
        e => {
          return e.parentNode || document.body
        }
      "
      :data-source="dataSource"
      :class="['search-input', searchMode ? 'enter' : 'leave']"
      placeholder="站内搜索"
      @blur="leaveSearchMode"
    />
  </div>
</template>

<script>
export default {
  name: 'HeaderSearch',
  data() {
    return {
      dataSource: [],
      searchMode: false
    }
  },
  methods: {
    enterSearchMode() {
      this.searchMode = true
      this.$emit('active', true)
      setTimeout(() => this.$refs.input.focus(), 300)
    },
    leaveSearchMode() {
      this.searchMode = false
      setTimeout(() => this.$emit('active', false), 300)
    }
  }
}
</script>

<style lang="less">
.header-search {
  .search-icon {
    font-size: 16px;
    cursor: pointer;
  }
  .search-input {
    border: 0;
    border-bottom: 1px solid var(--color-border-1);
    transition: width 0.3s ease-in-out;
    input {
      border: 0;
      box-shadow: 0 0 0 0;
    }
    &.leave {
      width: 0px;
      input {
        display: none;
      }
    }
    &.enter {
      width: 200px;
      input:focus {
        box-shadow: 0 0 0 0;
      }
    }
  }
}
</style>

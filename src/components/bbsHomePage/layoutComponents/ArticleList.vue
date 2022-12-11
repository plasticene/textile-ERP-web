<template>
  <div class="articleList-wrapper">
    <div class="articleList-wrapper__header">
      <label>{{ title }}</label>
      <span v-if="!mini" class="articleList-wrapper__more" @click="more">
        更多
        <a-icon type="right" />
      </span>
    </div>
    <Empty v-if="!list.length" />
    <div
      v-for="item in list"
      v-else
      :key="item.id"
      class="articleList-wrapper__list"
      @click="handleClick(item)"
    >
      <svg-icon
        v-if="item.top"
        class="articleList-wrapper__icon"
        name="post-top"
      />
      <a-icon v-else class="articleList-wrapper__icon" type="caret-right" />
      <div class="articleList-wrapper__titles">
        <span class="articleList-wrapper__title">
          {{ item.title }}
        </span>
        <span class="articleList-wrapper__title--sub">
          {{ item.updateTime }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Empty from '@/components/empty'
export default {
  name: 'ArticleList',
  components: { Empty },
  props: {
    list: {
      type: Array,
      default: () => {
        return [
          {
            id: 1,
            title: '帖子标题一',
            updateTime: 'yyyy-MM-dd'
          },
          {
            id: 2,
            title: '帖子标题二',
            updateTime: 'yyyy-MM-dd'
          }
        ]
      }
    },
    mini: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '版块名称'
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    handleClick(item) {
      this.$emit('link2Detail', item)
    },
    more() {
      this.$emit('link2List', this.list.length ? this.list[0].modelId : null)
    }
  }
}
</script>
<style lang="less" scoped>
.articleList-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  overflow: hidden;
  &__header {
    width: 100%;
    height: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    label {
      font-size: 16px;
      font-weight: bold;
      line-height: 14px;
      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 16px;
        background: var(--primary-color);
        margin-right: 4px;
        vertical-align: top;
      }
    }
  }
  &__more {
    font-size: 14px;
    line-height: 14px;
    height: 16px;
    padding: 1px;
    cursor: pointer;
    &:hover {
      color: var(--primary-color);
    }
  }
  &__list {
    width: 100%;
    margin-top: 20px;
    display: flex;
    cursor: pointer;
  }
  &__list + &__list {
    margin-top: 16px;
  }
  &__icon {
    width: 14px;
    height: 14px;
    margin-right: 4px;
    color: @gray-6;
    margin-left: -4px;
  }
  &__titles {
    width: 100%;
  }
  &__title {
    position: relative;
    display: block;
    width: 100%;
    line-height: 18px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 36px;
    &--sub {
      font-size: 12px;
      color: @gray-7;
    }
  }
}
</style>

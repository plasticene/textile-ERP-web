<template>
  <div :class="mini ? 'tabsCard-wrapper--mini' : 'tabsCard-wrapper'">
    <a-tabs :default-active-key="list[0].id">
      <a-tab-pane v-for="item in list" :key="item.id" :tab="item.modelName">
        <Empty v-if="!item.articles || !item.articles.length" />
        <div
          v-for="ele in item.articles"
          v-else
          :key="ele.id"
          class="tabsCard-wrapper__list"
          @click="handleClick(ele)"
        >
          <div class="tabsCard-wrapper__item">
            <span class="tabsCard-wrapper__title">
              {{ ele.title }}
            </span>
            <!-- 实际文章以图片为主，展示效果不佳，先注释 -->
            <!-- <div class="tabsCard-wrapper__content" v-html="ele.content"></div> -->
            <div class="tabsCard-wrapper__footer">
              <span class="tabsCard-wrapper__title--sub">
                {{ ele.updateTime }}
              </span>
              <span class="tabsCard-wrapper__title--sub">
                by {{ ele.authorName }}
              </span>
              <template v-if="!mini">
                <span class="tabsCard-wrapper__title--sub">
                  <a-icon class="tabsCard-wrapper__icon" type="eye" />
                  {{ ele.visitNum || 0 }}
                </span>
                <span class="tabsCard-wrapper__title--sub">
                  <a-icon class="tabsCard-wrapper__icon" type="message" />
                  {{ ele.commentNum || 0 }}
                </span>
              </template>
            </div>
          </div>
          <img
            v-if="ele.coverUrl && !mini"
            class="tabsCard-wrapper__img"
            :src="ele.coverUrl"
          />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Empty from '@/components/empty'
export default {
  name: 'TabsCard',
  components: {
    Empty
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return [
          {
            id: 1,
            modelName: '版块一',
            articles: [
              {
                id: 11,
                title: '帖子标题一',
                content:
                  '<p>正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文</p>',
                updateTime: 'yyyy-MM-dd',
                authorName: '作者',
                visitNum: 200,
                commentNum: 20,
                coverUrl:
                  'http://10.80.18.8/index/LoadImageServlet?fileId=1114773932'
              }
            ]
          },
          {
            id: 2,
            modelName: '版块二',
            articles: [
              {
                id: 21,
                title: '帖子标题二',
                content: '<p>正文正文正文</p>',
                updateTime: 'yyyy-MM-dd',
                authorName: '作者',
                visitNum: 200,
                commentNum: 20,
                coverUrl: ''
              }
            ]
          }
        ]
      }
    },
    mini: {
      type: Boolean,
      default: false
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
    }
  }
}
</script>
<style lang="less" scoped>
.tabsCard-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  overflow: hidden;
  &__list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  &__list + &__list {
    margin-top: 8px;
    border-top: 1px solid @gray-4;
    padding-top: 8px;
  }
  &__item {
    flex: 1;
  }
  &__icon {
    width: 14px;
    height: 14px;
    margin-right: 4px;
    color: @gray-6;
  }
  &__content {
    width: 100%;
    font-size: 12px;
    line-height: 14px;
    color: @gray-8;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 30px;
  }
  &__title {
    position: relative;
    display: block;
    width: 100%;
    height: calc(100% - 24px);
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 48px;
    margin-bottom: 8px;
    &--sub {
      font-size: 12px;
      color: @gray-7;
    }
    &--sub + &--sub {
      margin-left: 16px;
    }
  }
  &__footer {
    display: flex;
    align-items: center;
    margin-top: 8px;
  }
  &__img {
    object-fit: cover;
    border-radius: 8px;
    width: 160px;
    height: 75px;
    margin: 0 8px;
    box-shadow: 0 0 2px @gray-4;
  }
}
.tabsCard-wrapper--mini {
  padding: 8px;
  :deep(.ant-tabs-nav .ant-tabs-tab) {
    margin: 0;
  }
}
</style>

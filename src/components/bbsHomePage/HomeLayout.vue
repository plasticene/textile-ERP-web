<template>
  <div class="layout-wrapper" :class="{ 'layout-wrapper--view': !edit }">
    <grid-layout
      ref="gridlayout"
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      @layout-updated="layoutUpdatedEvent"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        class="layout-wrapper__item"
        :static="!edit"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :min-w="2"
        :min-h="2"
      >
        <component
          :is="item.name"
          class="layout-wrapper__component"
          :title="item.title"
          :has-title="item.hasTitle"
          :list="item.articleList"
          :img-url="item.imgUrl"
          :limit="item.limit"
          @link2Detail="link2Detail"
          @link2List="link2List($event, item)"
        />
        <template v-if="edit">
          <a-icon
            class="layout-wrapper__btn layout-wrapper__btn--remove"
            type="close"
            @click="removeItem(item.i)"
          />
          <a-icon
            class="layout-wrapper__btn layout-wrapper__btn--edit"
            type="edit"
            @click="editItem(item)"
          />
        </template>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'

import ArticleList from './layoutComponents/ArticleList'
import Carousel from './layoutComponents/Carousel'
import ImgCard from './layoutComponents/ImgCard'
import ImgCardGroup from './layoutComponents/ImgCardGroup'
import ImgCircleCard from './layoutComponents/ImgCircleCard'
import ImgSwiper from './layoutComponents/ImgSwiper'
import TabsCard from './layoutComponents/TabsCard'
export default {
  name: 'HomeLayout',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    Carousel,
    ImgCard,
    ImgCardGroup,
    ArticleList,
    TabsCard,
    ImgSwiper,
    ImgCircleCard
  },
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    layout: {
      type: Array,
      default: () => {
        return []
      }
    },
    sectionTree: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {
    layout: {
      handler(val) {
        val.forEach(item => {
          item.title = this.getModelName(this.sectionTree, item.id)
        })
      }
    }
  },
  created() {},
  methods: {
    getModelName(arr, modelId) {
      for (let i = 0, l = arr.length; i < l; i++) {
        if (arr[i].id === modelId) {
          return arr[i].modelName
        } else if (arr[i].children) {
          const modelName = this.getModelName(arr[i].children, modelId)
          if (modelName) {
            return modelName
          }
        }
      }
      return
    },
    removeItem(i) {
      this.$emit('remove', i)
    },
    editItem(item) {
      this.$emit('edit', item)
    },
    layoutUpdatedEvent() {
      // this.$store.commit('bbsConfig/setHomeLayout', this.layout)
    },
    // 跳转至文章详情页
    link2Detail(item) {
      if (!item.id) {
        return
      }
      let url = `/hccwp-bbs/#/post/view/${item.id}`
      if (process.env.NODE_ENV === 'development') {
        url = `http://localhost:1423/#/post/view/${item.id}`
      }
      window.open(url)
    },
    link2List(modelId, item) {
      if (!modelId) {
        modelId = item.id
      }
      let isSub = this.isSub(modelId)
      let prefix = isSub ? 'sub-forum/' : 'forum/'
      let url = `/hccwp-bbs/#/${prefix}${modelId}`
      if (process.env.NODE_ENV === 'development') {
        url = `http://localhost:1423/#/${prefix}${modelId}`
      }
      window.open(url)
    },
    isSub(modelId) {
      return this.sectionTree.find(item => item.id === modelId) === undefined
    }
  }
}
</script>
<style lang="less" scoped>
.layout-wrapper {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  width: 100%;
  height: 100%;
  overflow: auto;
  &__item {
    border: 1px solid var(--primary-color);
    &:hover {
      border: 2px solid var(--primary-color);
    }
  }
  &__drawer {
    position: absolute;
    right: -48px;
    top: -48px;
    height: calc(100vh - 229px);
  }
  &__drag {
    border: 1px solid skyblue;
  }
  &__component {
    pointer-events: none;
    :deep(.slick-active) {
      pointer-events: none !important;
    }
  }
  &__btn {
    width: 18px;
    height: 18px;
    color: @gray-8;
    &--remove {
      position: absolute;
      top: 8px;
      right: 8px;
      font-size: 13px;
      padding: 2px;
      border-radius: 50%;
      background: #fff;
      border: 1px solid #ccc;
    }
    &--edit {
      position: absolute;
      top: 8px;
      right: 30px;
      font-size: 13px;
      padding: 2px;
      color: var(--primary-color);
      background: #fff;
      border-radius: 50%;
    }
    &:hover {
      cursor: pointer;
      color: var(--primary-color);
      opacity: 0.8;
    }
  }
  &--view {
    .layout-wrapper__item {
      border: none;
    }
    .layout-wrapper__component {
      pointer-events: auto;
      :deep(.slick-active) {
        pointer-events: auto !important;
      }
    }
  }
}
</style>

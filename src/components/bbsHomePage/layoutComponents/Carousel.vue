<template>
  <a-carousel class="carousel-wrapper" dot-position="top" autoplay>
    <div
      v-for="item in list"
      :key="item.title"
      class="carousel-wrapper__content"
      @click="handleClick(item)"
    >
      <img
        v-if="item.coverUrl"
        class="carousel-wrapper__img"
        :class="mini ? 'carousel-wrapper__img--mini' : ''"
        :src="item.coverUrl"
      />
      <span v-if="hasTitle" class="carousel-wrapper__title" :title="item.title">
        {{ item.title }}
      </span>
    </div>
  </a-carousel>
</template>

<script>
export default {
  name: 'Carousel',
  components: {},
  props: {
    list: {
      type: Array,
      default: () => {
        return [
          {
            title: '轮播图第一张图片',
            coverUrl: ''
          },
          {
            title: '轮播图第二张图片',
            coverUrl: ''
          },
          {
            title: '轮播图第三张图片',
            coverUrl: ''
          }
        ]
      }
    },
    mini: {
      type: Boolean,
      default: false
    },
    hasTitle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {
    handleClick(item) {
      this.$emit('link2Detail', item)
    }
  }
}
</script>
<style lang="less" scoped>
.carousel-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  &__content {
    position: relative;
    background: @gray-6;
    width: 100%;
    height: 100%;
  }
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    &--mini {
      pointer-events: none;
    }
  }
  &__title {
    position: absolute;
    display: block;
    width: 100%;
    padding: 4px;
    background: linear-gradient(transparent, rgba(54, 54, 54, 0.3));
    color: #fff;
    font-size: 16px;
    top: calc(100% - 32px);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
  }
  :deep(.slick-slider) {
    height: 100%;
  }
  :deep(.slick-list) {
    height: 100%;
  }
  :deep(.slick-track) {
    height: 100%;
  }
  :deep(.slick-slide) {
    height: 100%;
    & div {
      height: 100%;
    }
  }
}
</style>

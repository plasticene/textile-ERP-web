<template>
  <div
    ref="img"
    :class="mini ? 'imgSwiper-wrapper--mini' : 'imgSwiper-wrapper'"
  >
    <div v-if="!mini" class="imgSwiper-wrapper__header">
      <label>{{ title }}</label>
      <span v-if="!mini" class="imgSwiper-wrapper__more" @click="more">
        更多
        <a-icon type="right" />
      </span>
    </div>
    <div class="imgSwiper-wrapper__swiper">
      <div ref="imgSwiperWin" class="imgSwiper-wrapper__listWin">
        <div
          class="imgSwiper-wrapper__list"
          :style="{ transform: `translateX(${listLeft}px)` }"
        >
          <div
            v-for="item in list"
            :key="item.id"
            class="imgSwiper-wrapper__item"
            @click="handleClick(item)"
          >
            <img class="imgSwiper-wrapper__img" :src="item.coverUrl" />
            <span v-if="hasTitle && !mini" class="imgSwiper-wrapper__title">
              {{ item.title }}
            </span>
          </div>
        </div>
      </div>

      <a-icon
        class="imgSwiper-wrapper__btn imgSwiper-wrapper__btn--prev"
        :class="{ 'imgSwiper-wrapper__btn--disabled': firstIndex === 0 }"
        type="left"
        @click="slide('left')"
      />
      <a-icon
        class="imgSwiper-wrapper__btn imgSwiper-wrapper__btn--next"
        :class="{
          'imgSwiper-wrapper__btn--disabled':
            list.length - firstIndex <= winImgNum
        }"
        type="right"
        @click="slide('right')"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImgSwiper',
  props: {
    list: {
      type: Array,
      default: () => {
        return [
          {
            id: 1,
            title: '版块一',
            coverUrl: ''
          },
          {
            id: 2,
            title: '版块二',
            coverUrl: ''
          },
          {
            id: 3,
            title: '版块三',
            coverUrl: ''
          },
          {
            id: 4,
            title: '版块四',
            coverUrl: ''
          }
        ]
      }
    },
    hasTitle: {
      type: Boolean,
      default: true
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
    return {
      listLeft: 0,
      firstIndex: 0,
      winWidth: 300
    }
  },
  computed: {
    winImgNum() {
      return Math.floor(this.winWidth / 216) < 1
        ? 1
        : Math.floor(this.winWidth / 216)
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    slide(type) {
      this.winWidth = this.$refs.imgSwiperWin.clientWidth
      if (
        (0 === this.firstIndex && 'left' === type) ||
        (this.firstIndex >= this.list.length - this.winImgNum &&
          'right' === type)
      ) {
        return
      }
      let step = 216
      if ('left' === type) {
        this.listLeft +=
          this.firstIndex < this.winImgNum
            ? step * (this.firstIndex % this.winImgNum)
            : step * this.winImgNum
        this.firstIndex < this.winImgNum + 1
          ? (this.firstIndex = 0)
          : (this.firstIndex -= this.winImgNum)
      } else {
        this.listLeft -= step * this.winImgNum
        this.firstIndex += this.winImgNum
      }
    },
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
.imgSwiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
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
  &__swiper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  &__listWin {
    width: calc(100% - 96px);
    height: 100%;
    overflow: hidden;
    margin: 0 48px;
  }
  &__list {
    width: 100%;
    height: 100%;
    transition: transform 1s;
    display: flex;
    padding: 16px;
  }
  &__item {
    flex-shrink: 0;
    padding: 16px 0;
    width: 200px;
    height: 100%;
    cursor: pointer;
  }
  &__item + &__item {
    margin-left: 16px;
  }
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  &__title {
    display: block;
    width: 100%;
    padding: 4px;
    border-radius: 0 0 10px 10px;
    font-size: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &__btn {
    position: absolute;
    font-size: 48px;
    color: var(--primary-color);
    cursor: pointer;
    text-align: center;
    &--prev {
      left: 0;
    }
    &--next {
      right: 0;
    }
    &--disabled {
      color: @gray-5;
      cursor: not-allowed;
    }
  }
}
.imgSwiper-wrapper--mini {
  position: relative;
  width: 100%;
  height: 60%;
  background: #fff;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  .imgSwiper-wrapper__swiper {
    width: 380px;
    height: 80px;
    transform: scale(0.4);
    transform-origin: left;
  }
  .imgSwiper-wrapper__list {
    padding: 0;
  }
  .imgSwiper-wrapper__item {
    width: 120px;
    background: @gray-5;
    border-radius: 8px;
  }
}
:deep(.swiper-wrapper) {
  margin: 0 48px;
}
</style>

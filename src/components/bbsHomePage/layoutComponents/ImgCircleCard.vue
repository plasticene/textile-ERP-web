<template>
  <div class="imgCircleCard-wrapper" @click="handleClick">
    <div class="imgCircleCard-wrapper__imgContent">
      <img v-if="imgUrl" class="imgCircleCard-wrapper__img" :src="imgUrl" />
    </div>
    <span v-if="hasTitle" class="imgCircleCard-wrapper__title">
      {{ title }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'ImgCircleCard',
  components: {},
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    hasTitle: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '版块卡片'
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    handleClick() {
      this.$emit('link2List')
    }
  }
}
</script>
<style lang="less" scoped>
.imgCircleCard-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__imgContent {
    position: relative;
    width: 40%;
    min-width: 64px;
    height: 0;
    padding-bottom: 40%;
    padding-bottom: ~'max(40%, 64px)';
    border-radius: 50%;
    margin-bottom: 8px;
    background: @gray-4;
  }
  &__img {
    position: absolute;
    width: 100%;
    height: 100%;
    min-width: 64px;
    min-height: 64px;
    object-fit: cover;
    border-radius: 50%;
  }
  &__title {
    color: @gray-8;
    font-size: 14px;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>

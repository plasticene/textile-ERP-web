<template>
  <div class="imgCard-wrapper" @click="handleClick">
    <img v-if="imgUrl" class="imgCard-wrapper__img" :src="imgUrl" />
    <span v-if="hasTitle" class="imgCard-wrapper__title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'ImgCard',
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
.imgCard-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: @gray-6;
  border-radius: 8px;
  cursor: pointer;
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
  &__title {
    position: absolute;
    display: block;
    width: 100%;
    padding: 4px;
    border-radius: 0 0 10px 10px;
    background: linear-gradient(transparent, rgba(54, 54, 54, 0.3));
    color: #fff;
    font-size: 16px;
    top: calc(100% - 32px);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>

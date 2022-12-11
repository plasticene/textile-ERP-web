<template>
  <div
    ref="cards"
    :class="mini ? 'imgCardGroup-wrapper--mini' : 'imgCardGroup-wrapper'"
  >
    <div
      v-for="item in limit ? list.slice(0, limit) : list"
      ref="card"
      :key="item.id"
      class="imgCardGroup-wrapper__content"
      @click="handleClick(item.id)"
    >
      <img
        v-if="item.fileUrl"
        class="imgCardGroup-wrapper__img"
        :src="item.fileUrl"
      />
      <span v-if="hasTitle" class="imgCardGroup-wrapper__title">
        {{ item.modelName }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImgCardGroup',
  components: {},
  props: {
    list: {
      type: Array,
      default: () => {
        return [
          {
            id: 1,
            modelName: '版块一',
            fileUrl: ''
          },
          {
            id: 2,
            modelName: '版块二',
            fileUrl: ''
          },
          {
            id: 3,
            modelName: '版块三',
            fileUrl: ''
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
    limit: {
      type: Number
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    handleClick(modelId) {
      this.$emit('link2List', modelId)
    }
  }
}
</script>
<style lang="less" scoped>
.imgCardGroup-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  overflow-x: auto;
  &__content {
    position: relative;
    flex: 1;
    height: 100%;
    background: @gray-5;
    border-radius: 8px;
    min-width: 30px;
    cursor: pointer;
  }
  &__content + &__content {
    margin-left: 16px;
  }
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
.imgCardGroup-wrapper--mini {
  position: relative;
  width: 100%;
  height: 50%;
  background: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  overflow-x: auto;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  .imgCardGroup-wrapper__content {
    flex: 1;
    height: 100%;
    background: @gray-5;
    border-radius: 8px;
    position: relative;
  }
  .imgCardGroup-wrapper__img {
    object-fit: cover;
    border-radius: 8px;
  }
  .imgCardGroup-wrapper__title {
    position: absolute;
    display: block;
    width: 100%;
    padding: 2px;
    border-radius: 0 0 8px 8px;
    background: linear-gradient(transparent, rgba(54, 54, 54, 0.3));
    color: #fff;
    font-size: 12px;
    top: calc(100% - 22px);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>

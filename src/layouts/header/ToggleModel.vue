<!-- eslint-disable no-unused-vars -->
<template>
  <a-dropdown class="lang header-item">
    <div>
      <a-icon type="setting" />
      {{ modelName }}
    </div>
    <a-menu
      slot="overlay"
      :selected-keys="[model]"
      @click="val => setModel(val.key)"
    >
      <a-menu-item v-for="model in models" :key="model.key">
        {{ model.name }}
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'ToggleModal',
  data() {
    return {
      models: [
        {
          key: 'tmp',
          name: '模板页面'
        },
        {
          key: 'cmp',
          name: '组件页面'
        }
      ]
    }
  },
  mounted() {},
  watch: {
    $route: function (value) {
      const { isComponents } = value.meta
      this.watchRoute(isComponents)
    }
  },

  created() {
    const { isComponents } = this.$route.meta
    this.watchRoute(isComponents)
  },
  computed: {
    ...mapState('setting', ['model', 'menuData']),
    modelName() {
      return this.models.find(model => this.model == model.key).name
    }
  },
  methods: {
    ...mapMutations('setting', [
      'setSiteModel',
      'setAsyncRoutes',
      'setMenuData',
      'toggleMenuData'
    ]),
    setModel(key) {
      this.setSiteModel(key)

      this.toggleMenuData(key)
    },
    watchRoute(isComponents) {
      if (isComponents) {
        this.setModel('cmp')
      } else {
        this.setModel('tmp')
      }
    }
  }
}
</script>
<style lang="less" scoped></style>

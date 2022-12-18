<!--
 * @Author: your name
 * @Date: 2021-05-18 14:32:25
 * @LastEditTime: 2022-02-25 15:14:29
 * @LastEditors: Agan
 * @Description: In User Settings Edit
 * @FilePath: \zjhcsoft-web-component\src\components\menu\SideMenu.vue
-->
<template>
  <a-layout-sider
    :theme="sideTheme"
    :class="['side-menu', 'beauty-scroll', isMobile ? null : 'shadow']"
    width="64px"
    :trigger="null"
  >
    <div :class="['logo', theme]">
      <router-link to="/">
        <img :src="logoUrl" />
        <h1>{{ systemName }}</h1>
      </router-link>
    </div>
    <!-- <i-menu
      :theme="theme"
      :collapsed="collapsed"
      :options="menuData"
      class="menu"
    /> -->
    <div class="side-menu__content">
      <div
        v-for="item in menuData"
        :key="item.name"
        class="side-menu__item"
        :class="isSelected(item) ? 'side-menu__item--selected' : ''"
        @click="onSelect(item)"
      >
        <svg-icon class="side-menu__icon" :name="item.meta.icon" />
        <span class="side-menu__name">{{ item.name }}</span>
      </div>
    </div>
  </a-layout-sider>
</template>

<script>
import { mapState } from 'vuex'

import LOGO_URL from '@/assets/img/logo.png'
import LOGO_DEV_URL from '@/assets/img/logo-dev.png'
import LOGO_TEST_URL from '@/assets/img/logo-test.png'

// import IMenu from './menu'

const LOGO_MAP = {
  development: LOGO_DEV_URL,
  production: LOGO_URL,
  test: LOGO_TEST_URL
}
export default {
  name: 'SideMenu',
  // components: { IMenu },
  props: {
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menuData: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    }
  },
  inject: ['env'],
  computed: {
    sideTheme() {
      return this.theme == 'light' ? this.theme : 'dark'
    },
    ...mapState('setting', ['isMobile', 'systemName']),
    logoUrl({ env }) {
      return LOGO_MAP[env] ? LOGO_MAP[env] : LOGO_URL
    }
  },
  methods: {
    onSelect(obj) {
      this.$emit('menuSelect', obj)
    },
    isSelected(item) {
      return this.$route.path.includes(item.path) ? true : false
    }
  }
}
</script>

<style lang="less" scoped>
@import 'index';
.side-menu {
  &__content {
    width: 100%;
    height: calc(100vh - 96px);
    min-height: 567px;
    margin: 16px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    overflow-y: auto;
  }
  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    cursor: pointer;
    &--selected {
      .side-menu__name {
        color: var(--primary-color);
      }
    }
  }
  &__item + &__item {
    margin-top: 36px;
  }
  &__icon {
  }
  &__name {
    text-align: center;
  }
}
</style>

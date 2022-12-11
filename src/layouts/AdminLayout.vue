<template>
  <a-layout :class="['admin-layout', 'beauty-scroll']">
    <drawer v-if="isMobile" v-model="drawerOpen">
      <side-menu
        :theme="theme.mode"
        :menu-data="menuData"
        :collapsed="false"
        :collapsible="false"
        @menuSelect="onMenuSelect"
      />
    </drawer>
    <side-menu
      v-else-if="layout === 'side' || layout === 'mix'"
      :class="[fixedSideBar ? 'fixed-side' : '']"
      :theme="theme.mode"
      :menu-data="sideMenuData"
      :collapsed="collapsed"
      :collapsible="true"
      @menuSelect="onMenuSelect"
    />
    <div
      v-if="fixedSideBar && !isMobile"
      :style="`width: ${sideMenuWidth}; min-width: ${sideMenuWidth};max-width: ${sideMenuWidth};`"
      class="virtual-side"
    ></div>
    <!-- <drawer v-if="!hideSetting" v-model="showSetting" placement="right">
      <div slot="handler" class="setting">
        <a-icon :type="showSetting ? 'close' : 'setting'" />
      </div>
      <setting />
    </drawer> -->
    <a-layout class="admin-layout-main beauty-scroll">
      <admin-header
        :class="[
          {
            'fixed-tabs': fixedTabs,
            'fixed-header': fixedHeader,
            'multi-page': multiPage
          }
        ]"
        :style="headerStyle"
        :menu-data="headMenuData"
        :collapsed="collapsed"
        @toggleCollapse="toggleCollapse"
      />
      <a-layout-header
        v-show="fixedHeader"
        :class="[
          'virtual-header',
          {
            'fixed-tabs': fixedTabs,
            'fixed-header': fixedHeader,
            'multi-page': multiPage
          }
        ]"
      />
      <a-menu v-model="current" mode="horizontal">
        <a-menu-item
          v-for="item in subMenu"
          :key="item.name"
          @click="onMenuSelect(item)"
        >
          {{ item.name }}
        </a-menu-item>
      </a-menu>
      <a-layout-content
        class="admin-layout-content"
        :style="`min-height: ${minHeight}px;`"
      >
        <div style="position: relative; height: 100%">
          <slot></slot>
        </div>
      </a-layout-content>
      <!-- <a-layout-footer style="padding: 0px">
        <page-footer :link-list="footerLinks" :copyright="copyright" />
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>

<script>
/**
 * @description: 暂时注释，以后也许需要用到
 */
// import Setting from '../components/setting/Setting'
import { mapGetters, mapMutations, mapState } from 'vuex'

import SideMenu from '../components/menu/SideMenu'
import Drawer from '../components/tool/Drawer'
import AdminHeader from './header/AdminHeader'

// const minHeight = window.innerHeight - 64 - 122

export default {
  name: 'AdminLayout',
  components: { SideMenu, Drawer, AdminHeader },
  data() {
    return {
      minHeight: window.innerHeight - 64 - 122,
      collapsed: true,
      showSetting: false,
      drawerOpen: false,
      current: []
    }
  },
  provide() {
    return {
      adminLayout: this
    }
  },
  watch: {
    $route(val) {
      console.log(6666, val)
      if (val.matched.length === 2 || val.redirectedFrom) {
        this.current = [this.subMenu[0]?.name]
      }
      this.setActivated(val)
    },
    layout() {
      this.setActivated(this.$route)
    },
    isMobile(val) {
      if (!val) {
        this.drawerOpen = false
      }
    }
  },
  computed: {
    ...mapState('setting', [
      'isMobile',
      'theme',
      'layout',
      'footerLinks',
      'copyright',
      'fixedHeader',
      'fixedSideBar',
      'fixedTabs',
      'hideSetting',
      'multiPage'
    ]),
    ...mapGetters('setting', ['firstMenu', 'subMenu', 'menuData']),
    sideMenuWidth() {
      return this.collapsed ? '64px' : '256px'
    },
    headerStyle() {
      let width =
        this.fixedHeader && this.layout !== 'head' && !this.isMobile
          ? `calc(100% - ${this.sideMenuWidth})`
          : '100%'
      let position = this.fixedHeader ? 'fixed' : 'static'
      return `width: ${width}; position: ${position};`
    },
    headMenuData() {
      const { layout, menuData, firstMenu } = this
      return layout === 'mix' ? firstMenu : menuData
    },
    sideMenuData() {
      const { layout, menuData, subMenu } = this
      return layout === 'mix' ? subMenu : menuData
    },
    subMenu() {
      const parentMenuName = this.$route.matched[1].name
      return this.menuData.find(e => e.name === parentMenuName)?.children ?? []
    }
  },
  created() {
    this.correctPageMinHeight(this.minHeight - 24)
    this.setActivated(this.$route)
    if (this.$route.matched.length === 3) {
      this.current = [this.$route.name]
    }
  },
  beforeDestroy() {
    this.correctPageMinHeight(-this.minHeight + 24)
  },
  methods: {
    ...mapMutations('setting', ['correctPageMinHeight', 'setActivatedFirst']),
    toggleCollapse() {
      this.collapsed = true
      // this.collapsed = !this.collapsed
    },
    onMenuSelect(obj) {
      this.$router.push({ name: obj.name })
      // this.toggleCollapse()
    },
    setActivated(route) {
      if (this.layout === 'mix') {
        let matched = route.matched
        matched = matched.slice(0, matched.length - 1)
        const { firstMenu } = this
        for (let menu of firstMenu) {
          if (matched.findIndex(item => item.path === menu.fullPath) !== -1) {
            this.setActivatedFirst(menu.fullPath)
            break
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.admin-layout {
  width: 100vw;
  --header-height: 48px;
  .side-menu {
    &.fixed-side {
      position: fixed;
      height: 100vh;
      left: 0;
      top: 0;
    }
  }
  .virtual-side {
    transition: all 0.2s;
  }
  .virtual-header {
    transition: all 0.2s;
    opacity: 0;
    &.fixed-tabs.multi-page:not(.fixed-header) {
      height: 0;
    }
  }
  .admin-layout-main {
    min-height: calc(100vh);
    .admin-header {
      top: 0;
      right: 0;
      overflow: hidden;
      transition: all 0.2s;
      &.fixed-tabs.multi-page:not(.fixed-header) {
        height: 0;
      }
    }
  }
  .admin-layout-content {
    // padding: 0 24px 0;
    background-color: #fff;
    width: calc(100vw - 64px);
    /*overflow-x: hidden;*/
    height: calc(100vh - 48px - 48px);
    /*overflow-x: hidden;*/
    /*min-height: calc(100vh - 64px - 122px);*/
  }
  .setting {
    background-color: var(--primary-color);
    color: @base-bg-color;
    border-radius: 5px 0 0 5px;
    line-height: 40px;
    font-size: 22px;
    width: 40px;
    height: 40px;
    box-shadow: -2px 0 8px @shadow-color;
  }
  .ant-layout-header {
    height: 48px;
  }
}
</style>

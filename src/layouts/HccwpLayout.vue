<template>
  <a-layout :class="['hccwp-layout', 'beauty-scroll']">
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
    <a-layout class="hccwp-layout-main beauty-scroll">
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
      <a-layout-content
        class="hccwp-layout-content"
        :style="`min-height: ${minHeight}px;width:${mainWidth}`"
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
// import Setting from '../components/setting/Setting'
import { mapGetters, mapMutations, mapState } from 'vuex'

import SideMenu from '../components/menu/HccwpSideMenu'
// import PageFooter from './footer/PageFooter'
import Drawer from '../components/tool/Drawer'
import AdminHeader from './header/HccwpHeader'

// const minHeight = window.innerHeight - 64 - 122

export default {
  name: 'HccwpLayout',
  components: {
    // Setting,
    SideMenu,
    Drawer,
    // PageFooter,
    AdminHeader
  },
  data() {
    return {
      minHeight: window.innerHeight - 64 - 122,
      collapsed: false,
      showSetting: false,
      drawerOpen: false
    }
  },
  provide() {
    return {
      adminLayout: this
    }
  },
  watch: {
    $route(val) {
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
      return this.collapsed ? '80px' : '256px'
    },
    headerStyle() {
      let width =
        this.fixedHeader && this.layout !== 'head' && !this.isMobile
          ? `calc(100% - ${this.sideMenuWidth})`
          : '100%'
      let position = this.fixedHeader ? 'fixed' : 'static'
      return `width: ${width}; position: ${position};`
    },
    mainWidth() {
      return this.isMobile
        ? `100vw`
        : `calc(100vw - ${this.collapsed ? 80 : 256}px)`
    },
    headMenuData() {
      const { layout, menuData, firstMenu } = this
      return layout === 'mix' ? firstMenu : menuData
    },
    sideMenuData() {
      const { layout, menuData, subMenu } = this
      return layout === 'mix' ? subMenu : menuData
    }
  },
  methods: {
    ...mapMutations('setting', ['correctPageMinHeight', 'setActivatedFirst']),
    toggleCollapse() {
      this.collapsed = !this.collapsed
    },
    onMenuSelect() {
      this.toggleCollapse()
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
  },
  created() {
    this.correctPageMinHeight(this.minHeight - 24)
    this.setActivated(this.$route)
  },
  beforeDestroy() {
    this.correctPageMinHeight(-this.minHeight + 24)
  }
}
</script>

<style lang="less">
.hccwp-layout {
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
    height: var(--header-height);
    &.fixed-tabs.multi-page:not(.fixed-header) {
      height: 0;
    }
  }
  .hccwp-layout-main {
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
  .hccwp-layout-content {
    // padding: 0 24px 0;
    background-color: #fff;
    // padding: 24px 24px 0;
    //height: 100%;
    width: calc(100vw - 256px);
    /*overflow-x: hidden;*/
    height: calc(100vh - 64px - 122px);
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

  .ant-table-thead > tr > th {
    color: @sub-title-color;
    font-weight: bold;
    font-size: 15px;
  }
}
</style>

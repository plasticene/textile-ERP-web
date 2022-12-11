<template>
  <a-layout-header :class="[headerTheme, 'admin-header']">
    <div :class="['admin-header-wide', layout, pageWidth]">
      <router-link
        v-if="isMobile || layout === 'head'"
        to="/"
        :class="['logo', isMobile ? null : 'pc', headerTheme]"
      >
        <img style="width: 32px" src="@/assets/img/logo.png" />
        <h1 v-if="!isMobile">{{ systemName }}</h1>
      </router-link>
      <a-divider v-if="isMobile" type="vertical" />
      <a-icon
        v-if="layout !== 'head'"
        class="trigger"
        :class="{ 'is-mobile': isMobile }"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="toggleCollapse"
      />
      <div
        v-if="layout !== 'side' && !isMobile"
        class="admin-header-menu"
        :style="`width: ${menuWidth};`"
      >
        <i-menu
          class="head-menu"
          :theme="headerTheme"
          mode="horizontal"
          :options="menuData"
          @select="onSelect"
        />
      </div>
      <div :class="['hccwp-header-right', headerTheme]">
        <!--<header-search
          class="header-item"
          @active="val => (searchActive = val)"
        />
        <a-tooltip class="header-item" title="帮助文档" placement="bottom">
          <a href="https://iczer.gitee.io/vue-antd-admin-docs/" target="_blank">
            <a-icon type="question-circle-o" />
          </a>
        </a-tooltip>
        <header-notice class="header-item" />-->
        <a-button
          class="theme-color"
          type="link"
          icon="home"
          @click="link2home"
        >
          返回首页
        </a-button>
        <a-button
          class="theme-color"
          type="link"
          icon="fullscreen"
          @click="fullscreen"
        />
        <header-avatar />
      </div>
    </div>
  </a-layout-header>
</template>

<script>
// import HeaderSearch from './HeaderSearch'
// import HeaderNotice from './HeaderNotice'
import { mapMutations, mapState } from 'vuex'

import HeaderAvatar from './HccwpAvatar'
export default {
  name: 'HccwpHeader',
  components: { HeaderAvatar },
  props: ['collapsed', 'menuData'],
  data() {
    return {
      langList: [
        { key: 'CN', name: '简体中文', alias: '简体' },
        { key: 'HK', name: '繁體中文', alias: '繁體' },
        { key: 'US', name: 'English', alias: 'English' }
      ],
      searchActive: false
    }
  },
  computed: {
    ...mapState('setting', [
      'theme',
      'isMobile',
      'layout',
      'systemName',
      'lang',
      'pageWidth'
    ]),
    headerTheme() {
      if (
        this.layout == 'side' &&
        this.theme.mode == 'dark' &&
        !this.isMobile
      ) {
        return 'light'
      }
      return this.theme.mode
    },
    langAlias() {
      let lang = this.langList.find(item => item.key == this.lang)
      return lang.alias
    },
    menuWidth() {
      const { layout, searchActive } = this
      const headWidth = layout === 'head' ? '100% - 188px' : '100%'
      const extraWidth = searchActive ? '600px' : '400px'
      return `calc(${headWidth} - ${extraWidth})`
    }
  },
  methods: {
    toggleCollapse() {
      this.$emit('toggleCollapse')
    },
    link2home() {
      window.location = '/hccwp-index/'
    },
    fullscreen() {
      const docElm = document.documentElement
      //W3C
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen()
      }
      //FireFox
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen()
      }
      //Chrome等
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen()
      }
      //IE11
      else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen()
      }
    },
    onSelect(obj) {
      this.$emit('menuSelect', obj)
    },
    ...mapMutations('setting', ['setLang'])
  }
}
</script>

<style lang="less" scoped>
@import 'index';
</style>

<!--
 * @Author: your name
 * @Date: 2021-05-18 14:32:25
 * @LastEditTime: 2022-11-14 09:05:21
 * @LastEditors: Agan
 * @Description: In User Settings Edit
 * @FilePath: \zjhcsoft-web-component\src\components\menu\SideMenu.vue
-->
<template>
  <a-popover placement="left" class="sub-system" trigger="click">
    <template slot="content">
      <div class="system-list">
        <a v-for="item in list" :key="item.text" @click="handleClick(item.url)">
          {{ item.text }}
        </a>
      </div>
    </template>
    <template slot="title">
      <span class="pop-title">切换到</span>
    </template>
    <div class="title">
      <h1>{{ systemName }}</h1>
      <a-icon type="swap" />
    </div>
  </a-popover>
</template>

<script>
export default {
  name: 'HccwpSystemList',
  components: {},
  props: {
    systemName: {
      type: String,
      default: '切换到其他子系统'
    }
  },
  data() {
    return {
      list: [
        {
          url: '/hccwp-pubInfo/',
          text: '公共信息'
        },
        {
          url: '/hccwp-bm/',
          text: '合同商务'
        },

        {
          url: '/hccwp-warehouse/',
          text: '采购仓储'
        },
        {
          url: '/hccwp-delivery/',
          text: '业务交付'
        },
        {
          url: '/hccwp-fm/',
          text: '财务运营'
        },
        {
          url: '/hccwp-marketing/',
          text: '市场销售'
        },

        {
          url: '/hccwp-hrmis/',
          text: '人力资源'
        },
        {
          url: '/hccwp-office',
          text: '行政办公'
        },
        {
          url: '/hccwp-dstock/',
          text: '资产物资'
        },
        {
          url: '/hccwp-biz/',
          text: '经营决策'
        },
        {
          url: '/hccwp-zzzycf',
          text: '组织财富'
        },
        {
          url: '/hccwp-audit/',
          text: '配置监控'
        }
        // {
        //   url: '/hccwp-dgb',
        //   text: '党政工团'
        // },
        // {
        //   url: '/hccwp-partner/',
        //   text: '伙伴协同'
        // },
        // {
        //   url: '/app/',
        //   text: '能力接口'
        // },
        // {
        //   url: '/hccwp-mdw/',
        //   text: '决策视窗'
        // }
      ]
    }
  },
  computed: {
    // ...mapState('setting', ['isMobile', 'systemName'])
  },
  methods: {
    handleClick(url) {
      sessionStorage.setItem('clear', true)
      window.open(url, '_self')
    }
  }
}
</script>

<style lang="less" scoped>
@import 'index';
</style>

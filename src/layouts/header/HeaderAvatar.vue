<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <span class="name">{{ user.name || '绍兴超牛逼最厉害纺织厂' }}</span>
    </div>
    <a-menu slot="overlay" :class="['avatar-menu']">
      <a-menu-item
        v-for="item in user.orgList"
        :key="item.id"
        @click="switchOrg(item.id)"
      >
        <span
          class="list-item"
          :title="item.name"
          :class="user.orgId === item.id ? 'select' : ''"
        >
          {{ item.name }}
        </span>
      </a-menu-item>
      <!-- <a-menu-item>
        <a-icon type="user" />
        <span>个人中心</span>
      </a-menu-item>
      <a-menu-item>
        <a-icon type="setting" />
        <span>设置</span>
      </a-menu-item> -->
      <a-menu-divider />
      <a-menu-item @click="logout">
        <a-icon style="margin-right: 8px" type="poweroff" />
        <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'

import { logout, switchOrg } from '@/services/user'

export default {
  name: 'HeaderAvatar',
  computed: {
    ...mapGetters('account', ['user'])
  },
  methods: {
    logout() {
      logout()
      this.$router.push('/login')
    },
    switchOrg(orgId) {
      if (orgId === this.user.orgId) {
        return
      }
      switchOrg(orgId).then(() => {
        window.location.reload()
      })
    }
  }
}
</script>

<style lang="less">
.header-avatar {
  display: inline-flex;
  .avatar,
  .name {
    align-self: center;
  }
  .avatar {
    margin-right: 8px;
  }
  .name {
    font-weight: 500;
  }
}
.avatar-menu {
  width: 150px;
  .list-item {
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
  }
  .select {
    font-weight: 500;
    color: var(--primary-color);
  }
}
</style>

<template>
  <a-dropdown>
    <div class="hccwp-avatar" style="cursor: pointer">
      <span class="avatar">
        {{ user ? user.viewname.substring(user.viewname.length - 2) : '用户' }}
      </span>
      <span class="name">
        {{ user ? `${user.viewname}(${user.name})` : '用户' }}
      </span>
    </div>
    <a-menu slot="overlay" :class="['avatar-menu']">
      <template
        v-if="
          otherAccounts.relationUser && otherAccounts.relationUser.length > 1
        "
      >
        <a-menu-item
          v-for="item in otherAccounts.relationUser"
          :key="item.id"
          :class="user.name === item.name ? 'avatar-menu--active' : ''"
          @click="switchAccount(item)"
        >
          <a-icon
            :type="user.name === item.name ? 'caret-right' : 'appstore'"
          />
          <span>{{ item.groupName }}</span>
        </a-menu-item>
      </template>

      <a-menu-item @click="logout">
        <a-icon type="poweroff" />
        <span>退出</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HeaderAvatar',
  computed: {
    ...mapGetters('account', ['user']),
    otherAccounts() {
      return this.$store.state.account.otherAccounts
        ? this.$store.state.account.otherAccounts
        : {}
    }
  },
  methods: {
    ...mapActions('account', ['Logout']),
    logout() {
      sessionStorage.setItem('clear', true)
      this.Logout()
    },
    switchAccount(item) {
      if (
        this.user.name === item.name ||
        !this.otherAccounts.casServerUrlPrefix
      ) {
        return
      }
      window.location = `${
        this.otherAccounts.casServerUrlPrefix
      }/userSwitch?service=${encodeURIComponent(
        window.location.href
      )}&current=${item.name}`
    }
  }
}
</script>

<style lang="less" scoped>
.hccwp-avatar {
  display: inline-flex;
  margin-left: 16px;
  align-items: center;
  .avatar {
    color: @gray-1;
    font-weight: 550;
    width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 20px;
    background: var(--primary-color);
    text-align: center;
    font-size: 12px;
    position: relative;
    &:hover {
      opacity: 0.9;
    }
    &:after {
      content: '';
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: block;
      position: absolute;
      top: -2px;
      left: -2px;
      border: 1px solid var(--primary-2);
    }
  }
  .name {
    margin-left: 16px;
    display: inline-block;
  }
}
.avatar-menu {
  position: absolute;
  right: 0;
  width: fit-content;
  min-width: 80px;
  &--active {
    background: var(--primary-color);
    color: @white;
    cursor: default;
  }
}
</style>

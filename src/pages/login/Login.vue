<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <!-- <img alt="logo" class="logo" src="@/assets/img/logo.png" /> -->
        <span class="title">{{ systemName }}</span>
      </div>
      <!-- <div class="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div> -->
    </div>
    <div class="login">
      <a-form :form="form" @submit="onSubmit">
        <a-tabs
          size="large"
          :tab-bar-style="{ textAlign: 'center' }"
          style="padding: 0 2px"
        >
          <a-tab-pane key="1" tab="账户密码登录">
            <a-alert
              v-show="error"
              type="error"
              :closable="true"
              :message="error"
              show-icon
              style="margin-bottom: 24px"
            />
            <a-form-item>
              <a-input
                v-decorator="[
                  'name',
                  {
                    initialValue: '16666688888',
                    rules: [
                      {
                        required: true,
                        message: '请输入账户名',
                        whitespace: true
                      }
                    ]
                  }
                ]"
                autocomplete="autocomplete"
                size="large"
                placeholder="admin"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[
                  'password',
                  {
                    initialValue: 'ptc666888',
                    rules: [
                      {
                        required: true,
                        message: '请输入密码',
                        whitespace: true
                      }
                    ]
                  }
                ]"
                size="large"
                placeholder="888888"
                autocomplete="autocomplete"
                type="password"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="2" tab="手机号登录">
            <a-form-item>
              <a-input size="large" placeholder="mobile number">
                <a-icon slot="prefix" type="mobile" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-row :gutter="8" style="margin: 0 -4px">
                <a-col :span="16">
                  <a-input size="large" placeholder="captcha">
                    <a-icon slot="prefix" type="mail" />
                  </a-input>
                </a-col>
                <a-col :span="8" style="padding-left: 4px">
                  <a-button
                    style="width: 100%"
                    class="captcha-button"
                    size="large"
                  >
                    获取验证码
                  </a-button>
                </a-col>
              </a-row>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <!-- <div>
          <a-checkbox :checked="true">自动登录</a-checkbox>
          <a style="float: right">忘记密码</a>
        </div> -->
        <a-form-item>
          <a-button
            :loading="logging"
            style="width: 100%; margin-top: 24px"
            size="large"
            html-type="submit"
            type="primary"
          >
            登录
          </a-button>
        </a-form-item>
        <!-- <div>
          其他登录方式
          <a-icon class="icon" type="alipay-circle" />
          <a-icon class="icon" type="taobao-circle" />
          <a-icon class="icon" type="weibo-circle" />
          <router-link style="float: right" to="/dashboard/workplace">
            注册账户
          </router-link>
        </div> -->
      </a-form>
    </div>
  </common-layout>
</template>

<script>
import { mapMutations } from 'vuex'

import CommonLayout from '@/layouts/CommonLayout'
import { login, switchOrg } from '@/services/user'
import { setAuthorization } from '@/utils/request'
import { loadRoutes } from '@/utils/routerUtil'

export default {
  name: 'Login',
  components: { CommonLayout },
  data() {
    return {
      logging: false,
      error: '',
      form: this.$form.createForm(this)
    }
  },
  computed: {
    systemName() {
      return this.$store.state.setting.systemName
    }
  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields(err => {
        if (!err) {
          this.logging = true
          const username = this.form.getFieldValue('name')
          const password = this.form.getFieldValue('password')
          login(username, password).then(this.afterLogin)
        }
      })
    },
    afterLogin(res) {
      this.logging = false
      const loginRes = res.data
      if (loginRes.code >= 0) {
        const { isAdmin, orgList } = loginRes.data
        this.setUser(loginRes.data)
        // this.setPermissions(permissions)
        // this.setRoles(roles)
        setAuthorization({
          token: loginRes.data.token
          // expireAt: new Date(loginRes.data.expireAt)
        })
        if (isAdmin && orgList?.length) {
          switchOrg(orgList[0].id).then(() => {
            this.$router.push('/')
          })
        } else {
          this.$router.push('/')
        }

        // // 获取路由配置
        // getRoutesConfig().then(result => {
        //   const routesConfig = result.data.data
        //   loadRoutes(routesConfig)
        //   this.$message.success(loginRes.message, 3)
        // })
      } else {
        this.error = loginRes.message
      }
    }
  }
}
</script>

<style lang="less" scoped>
.common-layout {
  .top {
    text-align: center;
    .header {
      height: 44px;
      line-height: 44px;
      a {
        text-decoration: none;
      }
      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
      }
      .title {
        font-size: 33px;
        color: @title-color;
        font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica,
          sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }
    .desc {
      font-size: 14px;
      color: @text-color-second;
      margin-top: 12px;
      margin-bottom: 40px;
    }
  }
  .login {
    width: 368px;
    margin: 0 auto;
    @media screen and (max-width: 576px) {
      width: 95%;
    }
    @media screen and (max-width: 320px) {
      .captcha-button {
        font-size: 14px;
      }
    }
    .icon {
      font-size: 24px;
      color: @text-color-second;
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: var(--primary-color);
      }
    }
  }
}
</style>

<template>
  <div>
    <a-card class="card" :title="$t('repository')" :bordered="false">
      <repository-form ref="repository" :show-submit="false" />
    </a-card>
    <a-card class="card" :title="$t('task')" :bordered="false">
      <task-form ref="task" :show-submit="false" />
    </a-card>
    <a-card :title="$t('user')" :bordered="false">
      <user-form />
    </a-card>
    <footer-tool-bar>
      <a-button type="primary" :loading="loading" @click="validate">
        {{ $t('submit') }}
      </a-button>
    </footer-tool-bar>
  </div>
</template>

<script>
import FooterToolBar from '@/components/tool/FooterToolBar'

import RepositoryForm from './RepositoryForm'
import TaskForm from './TaskForm'
import UserForm from './UserForm'

export default {
  name: 'AdvancedForm',
  components: { FooterToolBar, UserForm, TaskForm, RepositoryForm },
  i18n: require('./i18n'),
  data() {
    return {
      loading: false
    }
  },
  computed: {
    desc() {
      return this.$t('desc')
    }
  },
  methods: {
    validate() {
      this.$refs.repository.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
      this.$refs.task.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  margin-bottom: 24px;
}
</style>

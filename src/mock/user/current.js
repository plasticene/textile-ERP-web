import '@/mock/extend'

import Mock from 'mockjs'

const welcome = Mock.mock({
  timeFix: '@TIMEFIX',
  message: '@WELCOME'
})

Mock.mock('/user/welcome', 'get', () => {
  return welcome
})

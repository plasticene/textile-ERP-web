import { createLocalVue, mount } from '@vue/test-utils'
import Antd from 'ant-design-vue'

import { VersionInput } from '@/components/input'
const localVue = createLocalVue()

localVue.use(Antd)

describe('测试 VersionInput 组件实例', () => {
  // 创建一个包含被挂载和渲染的 Vue 组件的 Wrapper
  const wrapper = mount(VersionInput, { localVue })
  const { element } = wrapper
  it('测试 version Props', async () => {
    // 在创建的时候修改了 props 中 version 的值
    await wrapper.setProps({ version: 'V1.1.1' })
    const prefix = element.querySelector('.ant-input-group-addon')
    const input = element.querySelector('.ant-input')
    expect(prefix.innerHTML).toBe('V')
    expect(input.value).toBe('1.1.1')
  })

  it('测试 prefix Props', async () => {
    await wrapper.setProps({ prefix: 'RV' })
    await wrapper.setProps({ version: 'RV12.1.1' })
    const prefix = element.querySelector('.ant-input-group-addon')
    const input = element.querySelector('.ant-input')
    expect(prefix.innerHTML).toBe('RV')
    expect(input.value).toBe('12.1.1')
  })

  it('测试 input 输入', async () => {
    const input = wrapper.find('.ant-input')
    input.element.value = 'RV12tt.2b.1vvvvv...9....08...'
    input.trigger('keyup')
    input.trigger('blur')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.value).toBe('12.2.1.9.08')
  })

  it('测试有 oldVersion Props时的input输入', async () => {
    const wrapper = mount(VersionInput, { localVue })
    await wrapper.setProps({ version: '' })
    await wrapper.setProps({ oldVersion: 'V12.1.1' })
    const input = wrapper.find('.ant-input')
    input.element.value = '12.2.1'
    input.trigger('blur')
    expect(wrapper.vm.compareVersion()).toBe(true)
    input.element.value = '12.0.1'
    input.trigger('blur')
    expect(wrapper.vm.compareVersion()).toBe(false)
  })
})

# 虚拟列表下拉

::: demo

```html
<template>
  <div>
    <div>
      <div>BaseVirtualSelect</div>
      <HBaseVirtualSelect
        style="width:200px"
        :options="array"
        :filter-option="false"
        :default-active-first-option="false"
            mode="multiple"
        v-model="selected"
        show-search
        @search="onSearch"
        placeholder="BaseVirtualSelect"
        @change="onChange"
      />
    </div>
    <HVirtualSelect
      placeholder="VirtualSelect"
      style="width:200px"
      :options="array"
      customSearch
      v-model="selected2"
      @search="onSearch"
    />
    <HVirtualSelect
      style="width:200px"
      :options="array"
      mode="multiple"
      v-model="selected3"
      placeholder="VirtualSelect multiple"
    />
    <HVirtualSelect
      style="width:200px"
      :options="array"
      mode="tags"
      placeholder="VirtualSelect tags"
    />

    <!-- 不自带搜索 -->
    <HBaseVirtualSelect
      style="width:200px"
      :options="array"
      placeholder="BaseVirtualSelect"
    />

    <a-divider />

    <div>
      <div>default</div>
      <a-select
        show-search
        :filter-option="false"
        :default-active-first-option="false"
        :show-arrow="false"
        v-model="selected"
        @search="onSearch"
        style="width:200px"
        :options="array2"
      />
    </div>

    <div>
      <div>multiple</div>
      <a-select style="width:200px" :options="array2" mode="multiple" />
    </div>

    <div>
      <div>tags</div>
      <a-select style="width:200px" :options="array2" mode="tags" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: undefined,
        selected2: [],
        selected3: [],
        array: [],
        array2: []
      }
    },

    watch: {
      selected(val) {
        console.log('watch select', val)
      }
    },
    mounted() {
      setTimeout(() => {
        // this.array = new Array(10)
        //   .fill('1')
        //   .map((item, i) => ({ label: 'label' + i, value: i+'' }))
        // this.array2 = new Array(10)
        //   .fill('1')
        //   .map((item, i) => ({ label: 'label' + i, value: i+'' }))
      }, 1000)
    },
    methods: {
      onSearch(val) {
        console.log(val)
        setTimeout(() => {
          this.array = new Array(10).fill(2).map((item, i) => ({
            label: 'label-' + item * i * Math.random(),
            value: 'value' + i* Math.random()
          }))
        }, 300)
      },
      onChange(value, other) {
        console.log('md', value, other)
      }
    }
  }
</script>
```

:::

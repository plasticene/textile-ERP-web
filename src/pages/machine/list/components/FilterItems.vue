<template>
  <div class="filter-form">
    <a-form-model
      v-model="formData"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="所属车间">
            <a-select
              v-model="formData.workshopId"
              allow-clear
              placeholder="全部"
              @change="emitChange"
            >
              <a-select-option
                v-for="item in workshopList"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="机台类型">
            <a-select
              v-model="formData.machineSetId"
              allow-clear
              placeholder="全部"
            >
              <a-select-option
                v-for="item in machineTypeList"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="所需原料">
            <a-select v-model="formData.region" allow-clear placeholder="全部">
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          <a-form-model-item label="生成成品">
            <a-select
              v-model="formData.productId"
              allow-clear
              placeholder="全部"
            >
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="机台编号">
            <a-input v-model="formData.serialNo" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
        <a-col :span="8">
          <a-form-model-item label="机台规格">
            <div class="flex">
              <a-input v-model="formData.needle" suffix="针" />
              <a-input v-model="formData.size" class="ml-2x" suffix="寸" />
              <a-input v-model="formData.path" class="ml-2x" suffix="路" />
            </div>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>
<script name="FilterItems" setup>
import { useFilter } from '../composition'
const formData = ref({})

const { workshopList, machineTypeList } = useFilter()
const emit = defineEmits(['change'])
const emitChange = () => {
  emit('change', formData.value)
}
</script>
<style lang="less" scoped>
.filter-form {
  max-width: 1376px;
}
</style>

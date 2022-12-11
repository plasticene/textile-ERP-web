<template>
  <a-modal
    class="sign-modal"
    :visible="props.visible"
    title="数字签名"
    @cancel="cancel"
  >
    <template slot="footer">
      <a-button @click="cancel">关闭</a-button>
      <a-button
        :loading="loading"
        :disabled="signSts !== 'SIGN'"
        type="primary"
        @click="submit"
      >
        提交
      </a-button>
    </template>
    <img v-if="signSts === 'SIGN'" :src="signPic" alt="签名" />
    <template v-else>
      <img class="sign-modal__qr" :src="QRPic" alt="二维码" />
      <span class="sign-modal__tip">扫描二维码，进行签名</span>
    </template>
  </a-modal>
</template>

<script name="HSignModal" setup>
import QRCode from 'qrcode'

import { getSignInfo, getSignSts, getSignUUID } from '@/services'
const emit = defineEmits(['submit', 'cancel'])
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  loading: Boolean
})
const QRPic = ref('')
const signPic = ref('')
const signSts = ref('')
let uuid = ''
let timeoutId = null
// 生成二维码
const getQRPic = () => {
  const url = '/hccwp-mobile/#/signature?uuid='
  const addr =
    process.env.NODE_ENV === 'development'
      ? 'http://10.80.19.31:8000'
      : window.location.origin
  console.log(112222, `${addr}${url}${uuid}`)
  QRCode.toDataURL(`${addr}${url}${uuid}`)
    .then(url => {
      QRPic.value = url
    })
    .catch(err => {
      console.error(err)
    })
}
// 获取uuid，并根据uuid获取签名状态
const getUUID = () => {
  console.log(5555, signSts.value)
  getSignUUID().then(res => {
    uuid = res.data.content
    getQRPic()
    getSignStsInfo()
  })
}
// 获取签名状态
const getSignStsInfo = () => {
  getSignSts(uuid).then(res => {
    signSts.value = res.data.content
    if (signSts.value === 'GEN' || signSts.value === 'SCAN') {
      timeoutId = setTimeout(() => {
        getSignStsInfo()
      }, 2000)
    } else if (signSts.value === 'EXPIRE' || signSts.value === 'INVALID') {
      // 过期或无效需要重新获取一个新的uuid
      getUUID()
    } else if (signSts.value === 'SIGN') {
      getSignInfo(uuid).then(res => {
        signPic.value = res.data.content?.zipData
      })
      timeoutId ? clearTimeout(timeoutId) : ''
    }
  })
}
watch(
  () => props.visible,
  val => {
    if (val) {
      getUUID()
    } else {
      console.log(222211, timeoutId)
      timeoutId ? clearTimeout(timeoutId) : ''
    }
  },
  { immediate: false }
)

const submit = () => {
  emit('submit', uuid)
}
const cancel = () => {
  emit('cancel')
}

onUnmounted(() => {
  timeoutId && clearTimeout(timeoutId)
})
</script>

<style lang="less" scoped>
.sign-modal {
  &__qr {
    display: flex;
    width: 160px;
    margin: 8px auto;
  }
  &__tip {
    display: block;
    text-align: center;
  }
}
</style>

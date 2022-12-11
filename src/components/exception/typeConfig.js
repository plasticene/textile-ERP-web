import authorityImg from '@/assets/img/403.svg'
import notFoundImg from '@/assets/img/404.svg'
const config = {
  403: {
    img: authorityImg,
    title: '403',
    desc: '抱歉，你无权访问该页面'
  },
  404: {
    img: notFoundImg,
    title: '404',
    desc: '抱歉，你访问的页面不存在或仍在开发中'
  },
  500: {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg',
    title: '500',
    desc: '抱歉，服务器出错了'
  }
}

export default config

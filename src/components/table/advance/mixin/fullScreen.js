import {
  addListener,
  inFullScreen,
  outFullScreen,
  removeListener
} from '../utils'
export default {
  data() {
    return {
      fullScreen: false
    }
  },
  created() {
    addListener.call(this)
  },
  beforeDestroy() {
    removeListener.call(this)
  },
  methods: {
    toggleScreen() {
      if (this.fullScreen) {
        outFullScreen.call(this)
      } else {
        inFullScreen.call(this)
      }
    },
    fullScreenListener(e) {
      if (e.target.id === this.id) {
        this.fullScreen = !this.fullScreen
      }
    }
  }
}

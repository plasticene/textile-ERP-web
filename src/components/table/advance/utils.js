function removeListener() {
  document.removeEventListener('fullscreenchange', this.fullScreenListener)
  document.removeEventListener(
    'webkitfullscreenchange',
    this.fullScreenListener
  )
  document.removeEventListener('mozfullscreenchange', this.fullScreenListener)
  document.removeEventListener('msfullscreenchange', this.fullScreenListener)
}

function addListener() {
  document.addEventListener('fullscreenchange', this.fullScreenListener)
  document.addEventListener('webkitfullscreenchange', this.fullScreenListener)
  document.addEventListener('mozfullscreenchange', this.fullScreenListener)
  document.addEventListener('msfullscreenchange', this.fullScreenListener)
}

function inFullScreen() {
  const el = this.$refs.table
  el.classList.add('beauty-scroll')
  if (el.requestFullscreen) {
    el.requestFullscreen()
    return true
  } else if (el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen()
    return true
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen()
    return true
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen()
    return true
  }
  this.$message.warn('对不起，您的浏览器不支持全屏模式')
  el.classList.remove('beauty-scroll')
  return false
}
function outFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
  this.$refs.table.classList.remove('beauty-scroll')
}

export { addListener, inFullScreen, outFullScreen, removeListener }

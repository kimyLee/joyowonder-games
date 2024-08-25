import { defineStore } from 'pinia'
import { GlobalColor } from '@/stores/Color'

let lightTimer = null as any
let breathTimer = null as any
function processColorString(str: string, alpha: number) {
  if (str === '0' || !str) {
    return 0
  }
  const hexColor = str.length === 7 ? str : str.slice(0, 7)
  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, '0')
  return str.length === 7 ? `${hexColor}${alphaHex}` : `${hexColor.slice(0, 7)}${alphaHex}`
}

function removeAlphaFromColorString(str: string) {
  if (str === '0' || !str) {
    return '0'
  }
  if (str.length === 9) {
    return str.slice(0, 7)
  } else {
    return str
  }
}

export const useLightStore = defineStore('light', {
  state: () => ({
    count: 0,

    // 待机
    disable: true,
    moveIndex: 0,

    // 呼吸
    breathing: false,
    breathOpacity: 1,
    breathFactor: -1,

    // 灯
    lightArr: [0, 0, 0, 0, 0, 0, 0, 0] as any
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    },
    //
    setActive() {
      clearInterval(lightTimer)
      this.disable = false
      this.lightArr = [0, 0, 0, 0, 0, 0, 0, 0]
    },
    // 进入待机状态，循环灯移动
    setEnActive() {
      clearInterval(lightTimer)
      this.disable = true
      this.lightArr = [0, 0, 0, 0, 0, 0, 0, 0]

      lightTimer = setInterval(() => {
        this.lightArr = [0, 0, 0, 0, 0, 0, 0, 0]
        this.lightArr[this.moveIndex] = GlobalColor.YELLOW
        this.moveIndex = this.moveIndex < 7 ? this.moveIndex + 1 : 0
      }, 500)
    },
    // 清除所有灯
    clearAllLight() {
      this.lightArr = [0, 0, 0, 0, 0, 0, 0, 0]
    },
    // 进入呼吸状态，所有灯都按照透明度呼吸
    setBreathAll() {
      clearInterval(breathTimer)
      this.breathing = true
      // this.lightArr = [0, 0, 0, 0, 0, 0, 0, 0]

      breathTimer = setInterval(() => {
        for (let i = 0; i < 8; i++) {
          this.lightArr[i] = processColorString(this.lightArr[i], this.breathOpacity)
        }
        this.breathOpacity = this.breathOpacity + this.breathFactor * 0.1
        if (this.breathOpacity < 0) {
          this.breathOpacity = 0.1
          this.breathFactor = 1
        } else if (this.breathOpacity > 1) {
          this.breathOpacity = 0.9
          this.breathFactor = -1
        }
      }, 100)
    },
    setUnBreathAll() {
      clearInterval(breathTimer)
      this.breathing = false

      for (let i = 0; i < 8; i++) {
        this.lightArr[i] = removeAlphaFromColorString(this.lightArr[i])
      }
    },
    // 设置单个灯
    setSingleLight(index: number, color: string) {
      if (this.disable) return
      this.lightArr[index] = color
    },
    // 设置N个灯
    setLightByNumber(cnt: number, color: string) {
      this.lightArr = [0, 0, 0, 0, 0, 0, 0, 0]
      for (let i = 0; i < cnt; i++) {
        this.lightArr[i] = color
      }
    },
    // 设置所有灯
    setAllLights(color: string) {
      if (this.disable) return
      this.lightArr = [color, color, color, color, color, color, color, color]
    },
    // 游戏失败, 红色灯交替闪烁2次
    setGameFail() {
      this.disable = true
      const color1 = [
        GlobalColor.RED,
        0,
        GlobalColor.RED,
        0,
        GlobalColor.RED,
        0,
        GlobalColor.RED,
        0
      ]
      const color2 = [
        0,
        GlobalColor.RED,
        0,
        GlobalColor.RED,
        0,
        GlobalColor.RED,
        0,
        GlobalColor.RED
      ]
      const step = 300
      this.lightArr = color1
      setTimeout(() => {
        this.lightArr = color2
        setTimeout(() => {
          this.lightArr = color1
          setTimeout(() => {
            this.lightArr = color2
            this.disable = false
          }, step)
        }, step)
      }, step)
    },
    setGameWin() {
      this.disable = true
      const color1 = [
        '#35c759',
        '#feca06',
        '#ff6a03',
        '#ea2c04',
        '#35c759',
        '#feca06',
        '#ff6a03',
        '#ea2c04'
      ]
      const color2 = [
        '#ea2c04',
        '#ff6a03',
        '#ea2c04',
        '#35c759',
        '#feca06',
        '#ff6a03',
        '#35c759',
        '#feca06'
      ]
      const step = 300
      this.lightArr = color1
      setTimeout(() => {
        this.lightArr = color2
        setTimeout(() => {
          this.lightArr = color1
          setTimeout(() => {
            this.lightArr = color2
            this.disable = false
          }, step)
        }, step)
      }, step)
    }
  }
})

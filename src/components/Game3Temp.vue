<template>
  <div class="game3">
    <Panel ref="joyo"></Panel>
    <div class="head-box">
      <div class="icon-go" @click="handleGo">GO!</div>
      <div>NO: 03</div>
    </div>
    <div class="game-container">
      <div class="game-box">
        <div class="number number1" @click="handleAdd(1)">1</div>
        <div class="number number2" @click="handleAdd(1)">1</div>
        <div class="number number3" @click="handleAdd(2)">2</div>
      </div>
    </div>
    <!-- 底部button -->
    <div class="controls">
      <!-- <span class="button minus-sign">-</span> -->
      <span class="button plus-sign" @click="handleAddOption()">+</span>
    </div>
    <button class="next-button" v-show="isGameWin" @click="nextGame">下一关</button>

    <!-- <div>
      <div class="operator-div" @click="handleClick">+</div>
      <div class="operator-div">-</div>
      <div class="operator-div">×</div>
      <div class="operator-div">÷</div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted } from 'vue'
import Panel from './JOYO.vue'
import { useLightStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { GlobalColor } from '@/stores/Color'
import { playPreviewMusic } from '@/lib/Audio'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  props: {
    message: String
  },
  components: {
    Panel
  },
  setup(props) {
    const router = useRouter()
    // store
    const store = useLightStore()
    const { count } = storeToRefs(store)
    const {
      increment,
      setSingleLight,
      setAllLights,
      setBreathAll,
      setUnBreathAll,
      setActive,
      setEnActive,
      setLightByNumber,
      setGameFail,
      setGameWin,
      clearAllLight
    } = store
    // End store

    const state = reactive({
      arr: [0, 0, 0, 0, 0, 0, 0, 0] as any,
      sum: 0,
      result: 0,
      rightCnt: 0,
      isGameWin: false,
      isGameStart: false,
      isWaitOption: false
    })

    // 点击GO逻辑， 2s后出题
    const handleGo = () => {
      state.result = 0
      state.sum = 0
      state.rightCnt = 0

      playPreviewMusic('chek')
      setActive()
      setAllLights(GlobalColor.GREEN)
      setBreathAll()
      setTimeout(() => {
        setUnBreathAll()
        handleQuestion()
        state.isGameStart = true
      }, 1200)
    }

    // 出题逻辑
    const handleQuestion = () => {
      state.sum = 0
      playPreviewMusic('question01')
      let random = 0
      while (random === state.result || random === 0) {
        random = Math.floor(Math.random() * 2) + 2
      }
      // const random = Math.floor(Math.random() * 5) + 4
      setLightByNumber(random, GlobalColor.ORANGE)
      state.result = random
      state.isWaitOption = false
    }

    // 点击选项（累加，一旦超出，失败）
    const handleAddOption = () => {
      playPreviewMusic('common01')
      state.isWaitOption = false
    }
    const handleAdd = (num: number) => {
      if (!state.isGameStart) {
        playPreviewMusic('common01')
        return
      }
      if (state.isWaitOption) {
        playPreviewMusic('click')
        return
      }
      playPreviewMusic('common01')
      state.isWaitOption = true
      state.sum = state.sum + num
      for (let i = 0; i < state.sum; i++) {
        setSingleLight(i, GlobalColor.GREEN)
      }
      if (state.sum > state.result) {
        // 游戏失败
        setGameFail()
        playPreviewMusic('error')
      } else if (state.sum === state.result) {
        // 如果已经2次成功，游戏胜利，否则再来一题
        if (state.rightCnt < 1) {
          state.rightCnt++
          playPreviewMusic('mat1')
          setTimeout(() => {
            clearAllLight()
            handleQuestion()
          }, 800)
        } else {
          setGameWin()
          playPreviewMusic('win')
          state.isGameWin = true
        }
      }
    }

    const nextGame = () => {
      router.push({ name: 'game5' })
    }

    onMounted(() => {
      setEnActive()
    })

    return {
      ...toRefs(state),
      handleGo,
      handleAdd,
      handleAddOption,
      nextGame
    }
  }
})
</script>

<style scoped lang="scss">
.game3 {
  position: relative;
  user-select: none;
  .head-box {
    display: flex;
    align-items: center;
    padding: 20px 10px 40px 10px;
    box-sizing: border-box;
    font-size: 20px;
    .icon-go {
      font-size: 36px;
      font-family: 'joyo';
      width: 100px;
      height: 100px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: burlywood;
      margin-right: 10px;
    }
  }
  .game-container {
    display: flex;
    align-items: center;
    height: 400px;
    position: relative;
  }
  .game-box {
    // justify-content: space-between;
    padding: 10px 10px 0 10px;

    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    width: 100%;

    .number {
      position: absolute;
      font-size: 64px;
    }

    .number1 {
      top: 0;
      left: 80px;
      transform: translate(0px, 0px);
    }

    .number2 {
      top: 80px;
      left: 150px;
      transform: translate(0px, 0px);
    }

    .number3 {
      top: 160px;
      left: 220px;
      transform: translate(0px, 0px);
    }
  }

  .number-div {
    width: 50px;
    height: 50px;
    background-color: lightblue;
    text-align: center;
    line-height: 50px;
    font-size: 24px;
    margin-bottom: 10px;
  }

  .operator-div {
    width: 50px;
    height: 50px;
    background-color: lightgreen;
    text-align: center;
    line-height: 50px;
    font-size: 24px;
  }

  .greetings h1,
  .greetings h3 {
    text-align: center;
  }
}

.controls {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  .button {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid black;
    border-radius: 5px;
  }

  .minus-sign {
    font-size: 64px;
    transform: scale(1.2);
    margin-right: 20px;
  }

  .plus-sign {
    font-size: 64px;
    margin-left: 20px;
  }
}

.next-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

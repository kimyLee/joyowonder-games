<template>
  <div class="game2">
    <Panel ref="joyo"></Panel>
    <div class="head-box">
      <div class="icon-go" @click="handleGo">GO!</div>
      <div>NO: 01</div>
    </div>
    <div class="game-container">
      <div class="game-box">
        <div class="target" @click="handleAdd(3)">
          <div class="board">
            <div class="dice three">
              <div class="dot1"></div>
              <div class="dot2"></div>
              <div class="dot3"></div>
            </div>
          </div>
          <div class="stick"></div>
        </div>
        <div class="target" @click="handleAdd(1)">
          <div class="board">
            <div class="dice one"><div class="dot"></div></div>
          </div>
          <div class="stick"></div>
        </div>
        <div class="target" @click="handleAdd(2)">
          <div class="board">
            <div class="dice two">
              <div class="dot1"></div>
              <div class="dot2"></div>
            </div>
          </div>
          <div class="stick"></div>
        </div>

        <div class="target" @click="handleAdd(4)">
          <div class="board">
            <div class="dice four">
              <div class="dot1"></div>
              <div class="dot2"></div>
              <div class="dot3"></div>
              <div class="dot4"></div>
            </div>
          </div>
          <div class="stick"></div>
        </div>
        <div class="target" @click="handleAdd(2)">
          <div class="board">
            <div class="dice two">
              <div class="dot1"></div>
              <div class="dot2"></div>
            </div>
          </div>
          <div class="stick"></div>
        </div>
      </div>
    </div>
    <!-- 底部button -->
    <button class="next-button" v-show="isGameWin">下一关</button>

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

export default defineComponent({
  props: {
    message: String
  },
  components: {
    Panel
  },
  setup(props) {
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
      isGameStart: false
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
        random = Math.floor(Math.random() * 5) + 4
      }
      // const random = Math.floor(Math.random() * 5) + 4
      setLightByNumber(random, GlobalColor.ORANGE)
      state.result = random
    }

    // 点击选项（累加，一旦超出，失败）
    const handleAdd = (num: number) => {
      if (!state.isGameStart) {
        playPreviewMusic('common01')
        return
      }
      playPreviewMusic('common01')
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

    onMounted(() => {
      setEnActive()
    })

    return {
      ...toRefs(state),
      handleGo,
      handleAdd
    }
  }
})
</script>

<style scoped lang="scss">
.game2 {
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

    .target {
      display: flex;
      width: 33%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .board {
      width: 100px;
      height: 60px;
      background-color: brown;
      border-radius: 5px;
      text-align: center;
      line-height: 60px;
      font-size: 24px;
    }

    .stick {
      width: 20px;
      height: 40px;
      background-color: gray;
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

  // 骰子
  .dice {
    width: 50px;
    height: 50px;
    margin: 5px;
    display: inline-block;
    position: relative;
  }

  /* 面1 */
  .dice.one .dot {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 20px;
    left: 20px;
  }

  /* 面2 */
  .dice.two .dot1 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .dice.two .dot2 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 30px;
    left: 30px;
  }

  /* 面3 */
  .dice.three .dot1 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .dice.three .dot2 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 30px;
    left: 30px;
  }

  .dice.three .dot3 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 20px;
    left: 20px;
  }

  /* 面4 */
  .dice.four .dot1 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .dice.four .dot2 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 30px;
  }

  .dice.four .dot3 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 30px;
    left: 10px;
  }

  .dice.four .dot4 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 30px;
    left: 30px;
  }

  /* 面5 */
  .dice.five .dot1 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .dice.five .dot2 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 30px;
  }

  .dice.five .dot3 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 30px;
    left: 10px;
  }

  .dice.five .dot4 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 30px;
    left: 30px;
  }

  .dice.five .dot5 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 20px;
    left: 20px;
  }

  /* 面6 */
  .dice.six .dot1 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .dice.six .dot2 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 30px;
  }

  .dice.six .dot3 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 30px;
    left: 10px;
  }

  .dice.six .dot4 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 30px;
    left: 30px;
  }

  .dice.six .dot5 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 20px;
    left: 10px;
  }

  .dice.six .dot6 {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    position: absolute;
    top: 20px;
    left: 30px;
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

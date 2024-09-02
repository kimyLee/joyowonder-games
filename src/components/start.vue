<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup(props) {
    const router = useRouter()
    // store
    const nextGame = () => {
      router.push({ name: 'game2' })
    }

    return {
      nextGame
    }
  }
})
</script>

<template>
  <div class="feedback">
    <p style="padding: 20px; box-sizing: border-box">
      我们正在规划下一本内容，暂定数学游戏方向。<br />
      我们抽取了些核心玩法(暂无美术)做成原型，希望您抽空和孩子一起体验，并给出宝贵意见。<br />
      游戏结束会有问卷地址，烦请赐评～<br /><br />
      提示:示例游戏共5关，点击“GO”即可开始
    </p>
    <img src="@/assets/book.jpg" alt="二维码" />
    <button class="next-button" @click="nextGame">进入游戏</button>
  </div>
</template>

<style scoped lang="scss">
.feedback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'joyo';

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
  h1 {
    text-align: center;
  }

  p {
    text-align: center;
  }
  img {
    width: 70%;
  }
}
</style>

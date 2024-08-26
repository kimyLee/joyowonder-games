<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="feedback">
    <h1>感谢您的体验！</h1>
    <p>请提供您的重要反馈。 <a href="https://www.wjx.cn/vm/eLhKyYD.aspx# ">点击填写</a></p>
    <img src="@/assets/code.png" alt="二维码" />
  </div>
</template>

<style scoped lang="scss">
.feedback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  h1 {
    text-align: center;
  }

  p {
    text-align: center;
  }
  img {
    width: 50%;
  }
}
</style>

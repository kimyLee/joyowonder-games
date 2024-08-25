<template>
  <div class="joyo">
    <div class="container">
      <!-- <div class="left-half"></div> -->
      <div class="right-half">
        <div
          :style="{
            backgroundColor: `${lightArr[0] || '#ffffff'}`
          }"
          class="circle"
        ></div>
        <div
          :style="{
            backgroundColor: `${lightArr[1] || '#ffffff'}`
          }"
          class="circle"
        ></div>
        <div
          :style="{
            backgroundColor: `${lightArr[2] || '#ffffff'}`
          }"
          class="circle"
        ></div>
        <div
          :style="{
            backgroundColor: `${lightArr[3] || '#ffffff'}`
          }"
          class="circle"
        ></div>
        <div
          :style="{
            backgroundColor: `${lightArr[4] || '#ffffff'}`
          }"
          class="circle"
        ></div>
        <div
          :style="{
            backgroundColor: `${lightArr[5] || '#ffffff'}`
          }"
          class="circle"
        ></div>
        <div
          :style="{
            backgroundColor: `${lightArr[6] || '#ffffff'}`
          }"
          class="circle"
        ></div>
        <div
          :style="{
            backgroundColor: `${lightArr[7] || '#ffffff'}`
          }"
          class="circle"
        ></div>
        <div class="ring1"></div>
        <div class="ring2"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
import { useLightStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { GlobalColor } from '@/stores/Color'
// 作为主机显示器
export default defineComponent({
  props: {
    message: String
  },
  setup(props) {
    // props.message // <--类型：string
    // store
    const store = useLightStore()
    const { count, lightArr } = storeToRefs(store)
    const { increment, setSingleLight } = store
    // End store
    const state = reactive({
      arr: [0, 0, 0, 0, 0, 0]
    })

    // watch(
    //   () => lightArr.value,
    //   (val) => {
    //     state.arr = [...val]
    //   },
    //   { deep: true }
    // )

    return {
      lightArr,
      ...toRefs(state)
      // setSingleLight
    }
  }
})
</script>

<style scoped lang="scss">
.joyo {
  background-image: url('your_background_image.jpg');
  background-size: cover;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  box-sizing: border-box;
  height: 170px;
  position: absolute;
  top: 0;
  right: 0;
  width: 170px;
  z-index: 999;
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  // background-color: #ffff00;
}

.left-half {
  width: 50%;
  height: 100%;
  background-image: url('/joyo.png');
  background-size: cover;
  background-position: 50% -34px;
  background-repeat: no-repeat;
}

$bRadius: 160px;
$sRadius: 90px;

.right-half {
  width: $bRadius;
  height: $bRadius;
  position: relative;
}

.ring1 {
  width: $bRadius;
  height: $bRadius;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: gray;
  position: absolute;
  top: 0;
  left: 0;
}
.ring2 {
  width: $sRadius;
  height: $sRadius;
  border-radius: 50%;
  border: 1px solid #ccc;
  background-color: #fff;
  position: absolute;
  top: calc(($bRadius - $sRadius) / 2);
  left: calc(($bRadius - $sRadius) / 2);
}

.circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #ffffff;
  position: absolute;
  z-index: 1;
}

$unit: 28px;
$pad: 4px;

.circle:nth-child(1) {
  top: $pad;
  left: 50%;
  margin-left: calc($unit * -1 / 2);
}

.circle:nth-child(2) {
  top: $unit * 0.7;
  left: 76%;
  margin-left: calc($unit * -1 / 2);
  margin-top: 2px;
}

.circle:nth-child(3) {
  top: $unit * 2.3;
  left: 89%;
  margin-left: calc($unit * -1 / 2);
  margin-top: 0;
}

.circle:nth-child(4) {
  top: $unit * 3.9;
  left: 76%;
  margin-left: calc($unit * -1 / 2);
  margin-top: 2px;
}

.circle:nth-child(5) {
  top: $unit * 4.5;
  left: 50%;
  margin-left: calc($unit * -1 / 2);
  margin-top: 2px;
}

.circle:nth-child(6) {
  top: $unit * 3.9;
  left: 25%;
  margin-left: calc($unit * -1 / 2);
  margin-top: 2px;
}

.circle:nth-child(7) {
  top: $unit * 2.3;
  left: 11%;
  margin-left: calc($unit * -1 / 2);
  margin-top: 0;
}

.circle:nth-child(8) {
  top: $unit * 0.7;
  left: 25%;
  margin-left: calc($unit * -1 / 2);
  margin-top: 0px;
}
</style>

<template>
    <div>
        <mt-swipe>
            <mt-swipe-item v-for="(item, index) in carousel" :key="index">
            <img :src="item.img" :class="{'full':isfull}" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props:["carousel","isfull"]
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  text-align: center;
  /* .mint-swipe-item {
    &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: yellow;
    }
    &:nth-child(3) {
      background-color: blue;
    }
  } */
  img {
    // width: 100%;
    height: 100%;
  }
}
.full{
    width: 100%;
}
</style>
<template>
  <view class="gank-item-container">
    <!--自组件遥想把事件传出去，这里之鞥呢是event-->
    <view v-on:click="$emit('title-taped', $event)" class="gank-item-ctime">{{ctime}}}</view>
    <image v-on:click="$emit('image-taped',src,'这是一个测试')" class="gank-item-image" v-bind:src="src"></image>
  </view>
</template>

<script>
  export default {
    name: "gankItem",
    props: {
      ctime: String,
      src: String
    }
  };
</script>

<style scoped>

  .gank-item-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: beige;
    border-radius: 10rpx;
    margin: 15rpx;
    padding: 15rpx;

  }

  .gank-item-ctime {
    color: indianred;
    text-align: center;
  }

  .gank-item-image {
    margin: 10rpx auto;
    border-radius: 5rpx;
  }
</style>

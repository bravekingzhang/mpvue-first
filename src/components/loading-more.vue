<template>
  <div class="loading">
    <span class="loading-span"></span>
    <span class="loading-span"></span>
    <span class="loading-span"></span>
    <span class="loading-span"></span>
    <span class="loading-span"></span>
  </div>
</template>

<script>
  export default {
    name: "loading-more"
  };
</script>

<style scoped>

  .loading {
    width: 70px;
    height: 50px;
    margin: auto;
    display: flex;
  }

  .loading-span {
    display: inline-block;
    width: 8px;
    height: 20px;
    border-radius: 4px;
    background: #91d5ff;
    margin: auto;
    -webkit-animation: load 1s ease infinite;
  }

  @-webkit-keyframes load {
    0%, 100% {
      height: 20px;
      background: #91d5ff;
    }
    50% {
      height: 40px;
      background: #40a9ff;
    }
  }

  .loading span:nth-child(2) {
    -webkit-animation-delay: 0.2s;
  }

  .loading span:nth-child(3) {
    -webkit-animation-delay: 0.4s;
  }

  .loading span:nth-child(4) {
    -webkit-animation-delay: 0.6s;
  }

  .loading span:nth-child(5) {
    -webkit-animation-delay: 0.8s;
  }
</style>

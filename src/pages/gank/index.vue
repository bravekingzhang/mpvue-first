<template>
  <view class="container-test">

    <scroll-view scroll-x="scroll_x?'true':'false'" class="swiper-tab">
      <view v-for="(categorie,index) in categories" v-bind:key="categorie.id" class="swiper-tab-list"
            v-bind:class="{'on':currentTab==index}" v-bind:data-current="index" @click="swichNav($event)">
        {{categorie.name}}
      </view>
    </scroll-view>


    <view class="body">
      我是body
    </view>
  </view>


</template>
<script>
  export default {

    data() {
      return {
        scroll_x: true,
        currentTab: 0,
        categories: []
      };
    },
    methods: {
      swichNav(e) {
        if (this.currentTab === e.target.dataset.current) {
          return false;
        } else {
          this.currentTab = e.target.dataset.current;
        }
      }
      ,
      bindChange(e) {
        this.currentTab = e.target.dataset.current;
      }

    },
    created() {

    },
    onLoad() {
      console.log("啊哈哈哈哈");
      this.http.get("/api/xiandu/categories")
        .then((d) => {
          console.log("请求成功:", d);
          this.categories = d.data.results;
        }).catch(e => {
        console.log("请求失败", e);
      });
    }
  };


</script>

<style scoped>
  .container-test {
  }

  .swiper-tab {
    width: 100%;
    border-bottom: 2rpx solid gainsboro;
    line-height: 80rpx;
  }

  .swiper-tab-list {
    font-size: 30rpx;
    display: flex;
    justify-content: center;
    color: #777;
    width: 30%;
  }

  .body {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .list-item {
    display: flex;
    margin-bottom: 35rpx;
    justify-content: center;
  }

  .on {
    color: #7cba23;
    border-bottom: 5rpx solid #7cba23;
  }
</style>

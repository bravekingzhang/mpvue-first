<template>
  <view class="container-test">

    <scroll-view>
      <gankItem v-for="(item,index) in items" v-bind:key="item._id" v-bind:src="item.url"
                v-bind:ctime="item.createdAt" v-on:title-taped="titleTaped" v-on:image-taped="imageTaped"></gankItem>
    </scroll-view>
    <loadingMore v-if="loadingMore"></loadingMore>

  </view>


</template>
<script>
  import loadingMore from "@/components/loading-more";
  import gankItem from "@/components/gankItem";

  export default {

    components: {
      loadingMore: loadingMore,
      gankItem: gankItem
    },
    data() {
      return {
        page: 1,
        items: [],
        loadingMore: false
      };
    },
    computed: {},
    methods: {
      _askGankData() {
        if (this.page === 1) {
          wx.showNavigationBarLoading();
        }
        this.hackHttp.get("http://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/" + this.page).then((res) => {
          console.log(res.data.results);
          if (this.page === 1) {
            this.items = res.data.results;
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
          } else {
            this.items = this.items.concat(res.data.results);
          }
          this.loadingMore = false;
        }).catch(reason => {
          console.log(reason);
          this.loadingMore = false;
        });
      },
      titleTaped(e) {
        console.log(`title taped and e is ${e}`);
      },
      imageTaped(e, desc) {
        console.log(`image taped and e is ${e} and desc is ${desc}`);
      }
    },
    onLoad() {
      this._askGankData();
    },
    onReachBottom() {
      this.page = this.page + 1;
      this.loadingMore = true;
      this._askGankData();
    },
    onPullDownRefresh() {
      this.page = 1;
      this._askGankData();
    }

  };


</script>

<style scoped>


</style>

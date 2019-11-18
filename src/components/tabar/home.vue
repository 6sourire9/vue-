<template>
    <div class="content">

      <!-- 轮播图 -->
      <swipe :carousel="lunbos" :isfull="true"></swipe>
      <!-- <mt-swipe>
        <mt-swipe-item v-for="(item, index) in lunbos" :key="index">
          <img :src="item.img" alt="">
        </mt-swipe-item>
      </mt-swipe> -->

      <!-- 九宫格图标 -->
      <ul class="mui-table-view mui-grid-view mui-grid-9">
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/newsList" >
              <img src="../../image/15200d52-menu1.png" alt=""> 
              <div class="mui-media-body">新闻资讯</div>
            </router-link>
          </li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <a href="#/home/photoList">
              <img src="../../image/64e2fbce-menu2.png" alt=""> 
              <div class="mui-media-body">图片分享</div>
            </a>
          </li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <a href="#/home/goodList" >
              <img src="../../image/a99e8466-menu3.png" alt=""> 
              <div class="mui-media-body">商品购买</div>
            </a>
          </li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <a href="#">
              <img src="../../image/64d2fcb9-menu4.png" alt=""> 
              <div class="mui-media-body">留言反馈</div>
            </a>
          </li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <a href="#">
              <img src="../../image/28fc050c-menu5.png" alt="">
              <div class="mui-media-body">视频专区</div>
            </a>
          </li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <a href="#">
              <img src="../../image/19ace747-menu6.png" alt=""> 
              <div class="mui-media-body">联系我们</div>
            </a>
          </li>
      </ul> 
    </div>
</template>

<script>
import {Toast} from "mint-ui"
import swipe from "../commons/swipe.vue"
export default {
  data(){
    return {
      lunbos:[]
    };
  },
  created() {
    this.getlunbo();
  },
  methods: {
    getlunbo(){
      this.$http.get("http://192.168.3.2:8080/api/getlunbo").then(response=>{
        if(response.body.status===0){
          this.lunbos=response.body.message;
        }else{
          Toast("加载失败")
        }
      })
    }
  },
  components:{
    swipe
  }

}
</script>

<style lang="scss" scoped>

/* .mint-swipe{
  height: 200px;
  img{
    width: 100%;
  }
} */

ul li img{
  width: 60px;
  height: 60px;
}
.content ul{
  background-color: #fff;
}
.content .mui-table-view li{
  border: 0;
}
</style>
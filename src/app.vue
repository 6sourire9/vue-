<template>
  <div class="app-container">
    <!-- 标题 -->
    <mt-header fixed title="Vue.js实战开发" class="clearfix">
      <router-link to slot="left">
        <mt-button icon="back" @click="back" id="backto" class="backto" v-show="isShow">返回</mt-button>
      </router-link>
    </mt-header>
    <!-- <vue-route-transition>
 </vue-route-transition> -->
    <transition>
      <router-view></router-view>
    </transition>
    
    <!-- 底部 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-llb"  to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-llb"  to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-llb"  to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>

  </div>
</template>

<script>
export default {
  data(){
    return{
      num:0,
      isShow:false
    }
  },
  created() {
  },

  methods: {
    back(){
      this.$router.back(-1)
      
    }
  },
  watch: {
    $route(now,old){
      if(now.path=="/home"){
        this.isShow=false;
      }else{
        this.isShow=true;
      }
    }
  },
  

}
</script>

<style  lang="scss" scoped>
.app-container{
  padding-top: 40px;
  padding-bottom: 50px;
  // 去除动画产生的滚动条
  overflow-x: hidden;
}
.v-enter{
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to{
  opacity: 0;
  transform: translateX(-100%);
  // 离开时不占据位置
  position: absolute;
}
.v-enter-active,.v-leave-active{
  transition: all 0.5s ease;
}
.mui-bar-tab .mui-tab-item-llb.mui-active{
  color: #007aff;
}

.mui-bar-tab .mui-tab-item-llb {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

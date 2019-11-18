<template>
  <div>
        <div class="locbox">
            <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">    
                <div class="ball" v-show="flag" ref="ball"></div>
            </transition>
            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <swipe :carousel="imgs" :isfull="false"></swipe>
					</div>
				</div>
			</div>
            <div class="mui-card">
				<div class="mui-card-header">{{goodinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价：<span class="marketprice">￥{{goodinfo.market_price}}</span>
                            &nbsp;
                            销售价：<span class="sellprice">￥{{goodinfo.sell_price}}</span>
                        </p>
                        
                        <p class="shopnum">购买数量：
                            <numberbox @getcount="getSelectedCount" :max="goodinfo.stock_quantity"></numberbox>
                        </p>
                        
               
                        <div class="btnbox">
                            <button class="mint-button mint-button--primary mint-button--small">
                                <label class="mint-button-text">立即购买</label>
                            </button>                      
                            <button class="mint-button mint-button--danger mint-button--small " @click="addtoshopcar" >
                                <label class="mint-button-text" >加入购物车</label>          
                            </button>
                        </div>
					</div>
				</div>
			</div>
            <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodinfo.goods_no}}</p>
						<p>库存情况：{{goodinfo.stock_quantity}}件</p>
						<p>上架时间：{{goodinfo.add_time | dataFormat}}
                        </p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <router-link :to="'/home/goodDesc/'+goodinfo.id" >
                        <button class="mint-button mint-button--primary mint-button--large is-plain">
                            <label class="mint-button-text">图文介绍</label>
                        </button>
                    </router-link>
                    <router-link :to="'/home/goodComment/'+goodinfo.id" >
                        <button class="mint-button mint-button--danger mint-button--large is-plain">
                            <label class="mint-button-text">商品评论</label>
                        </button>
                    </router-link>
                </div>
			</div>
      </div>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
import "../../app.vue"
import swipe from "../commons/swipe.vue"
import numberbox from "../commons/numberbox.vue"
import Vue from "vue"
export default {
    data(){
        return {
            id:this.$route.params.id,
            goodinfo:[],
            flag:false,
            imgs:[],
            num:1,
            routepath:Vue.http.options.root,
            selectedCount:1
        }
    },
    created() {
        this.getgoods(this.id);
    },
    methods: {
        getgoods(id){
            this.$http.get("api/goods/getinfo/"+id).then(response=>{
                if(response.body.status===0){
                    this.goodinfo=response.body.message[0];
                    console.log(this.goodinfo);
                }else{
                    Toast("加载失败")
                }
            })
            this.$http.get("api/getthumimages/"+id).then(response=>{
                if(response.body.status===0){
                    response.body.message.forEach(item=>{
                        item.src=this.routepath+item.src;
                        item.img=item.src;
                    })
                    this.imgs=response.body.message;
                }else{
                    Toast("加载失败")
                }
            })
            
        },
        addtoshopcar(){
            this.flag=!this.flag;
            var goodinfo={
                id:this.id,
                count:this.selectedCount,
                price:this.goodinfo.sell_price,
                selected:true
            };
            this.$store.commit("addtocar",goodinfo)    
        },
        beforeEnter(el) {
            el.style.transform="translate(0,0)"
        },
        enter(el,done){
            el.offsetWidth;

            var ballPositon=this.$refs.ball.getBoundingClientRect();
            var badgePosition=document.getElementById("badge").getBoundingClientRect();
            var xdist=badgePosition.left-ballPositon.left;
            var ydist=badgePosition.top-ballPositon.top;
            el.style.transform=`translate(${xdist}px,${ydist}px)`;
            el.style.transition="all 0.5s ease-out";
            done()
        }, 
        afterEnter(el){
            this.flag=!this.flag;   
        },  
        getSelectedCount(count){
            this.selectedCount=count;
            console.log(this.selectedCount);
        }      
    },
    components:{
        swipe,
        numberbox
    }
}
</script>

<style lang="scss">
.first{
    padding: 0px;
}
p{
    font-size: 14px;
}
.price{
    padding: 0px;
}
.mui-card-footer{
    display: block;
}
.mui-card-footer button{
    margin: 15px 0px;
}
.locbox{
    position: relative;
} 
.ball{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    // position: fixed;
    position: absolute;
    top: 390px;
    left: 152px;
    z-index: 100;

}

</style>
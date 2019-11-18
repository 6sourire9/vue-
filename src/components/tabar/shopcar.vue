<template>
    <div>
        <div class="shopbox ">
            <div class="smallbox clearfix mui-card" v-for="(item,index) in shopcar" :key="item.id">
                <div class="page-part page-switch-padding" >
                    <mt-switch v-model="$store.getters.getSelected[item.id]" @change="setSelected(item.id,$store.getters.getSelected[item.id])"></mt-switch>
                </div>
                <img :src="routepath+item.thumb_path" alt="">
                <div class="right">
                    
                    <h3>{{item.title}}</h3>
                    <span class="sellprice">￥{{item.sell_price}}</span>
                    <numberbox :init="$store.getters.getCount[item.id]" :goodid="item.id"></numberbox>
                    <br>
                    <span class="del" @click="remove(item.id,index)">删除</span> 
                </div>
            </div>
        
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="leftbox">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品<span class="sellprice">{{$store.getters.getgoodsnp.count}}</span>件，总价<span class="sellprice">￥{{$store.getters.getgoodsnp.total}}</span></p>
                    </div>
                    <button class="mint-button mint-button--danger mint-button--normal sum">
                        <label class="mint-button-text">去结算</label>
                    </button>
                </div>
            </div>
		</div>
    </div>
</template>

<script>
import Vue from "vue"
import numberbox from "../commons/cartnumbox.vue"
var goods=JSON.parse(localStorage.getItem("goods1")||"[]");
export default {
    data(){
        return{
            shopcar:[],
            routepath:Vue.http.options.root,
        }
    },
    created() {
        this.getids()
    },
    methods: {
        getids(){
            var ids=[];
            this.$store.state.cart.forEach(item=>{
                ids.push(item.id);
            });
            if(ids.length<0){
                return;
            }
            this.$http.get("api/goods/getshopcarlist/"+ids.join(",")).then(response=>{
                if(response.body.status===0){
                    this.shopcar=response.body.message;
                }else{
                    Toast("加载失败")
                }
            })
        },
        remove(id,index){
            this.shopcar.splice(index,1);
            this.$store.commit("removecart",id)
        },
        setSelected(id,val){
            this.$store.commit("setSelected",{id,selected:val})
        }
    },
    components:{
        numberbox
    }

}
</script>

<style lang="scss">
.clearfix:before,.clearfix:after{
    content:'';
    display:table;

}
.clearfix::after{
    clear: both;
}
.clearfix{
    *zoom: 1;
}
.leftbox{
    display: inline-block;
}

.sum{
    float:right;
}
.shopbox{
    .smallbox{
        padding: 15px;
        // box-sizing: content-box;
        // margin: auto 0;
    }
    // background-color: #fff;
    // padding: 15px;
    // margin: 10px;
    .page-part{
        // display: inline-block;
        float: left;
        margin-top: 38px;
    }
    img{
        float: left;
        width: 60px;
        height: 60px;
        margin-top: 28px;
        // margin-left: 12px;
        // margin: auto 0;
    }
    .right{
        float: right;
        width: 60%;
        h3{
            font-size: 13px;
            color: black;
            text-align: left;
        }
        .del{
            color: #067afb;
        }
    }
}
</style>
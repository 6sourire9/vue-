<template>
    <div class="box">
        <div v-for="(item) in goodslist" :key="item.id" class="goodsbox" @click="godetail(item.id)">
            <!-- <router-link :to="'/home/goodinfo/'+item.id" > -->
            <img :src="item.img_url" alt="">
           <h1>{{item.title}}</h1>
            <div class="bottomcont"> 
                <p class="price">
                    <span class="sellprice">￥{{item.sell_price}}</span>
                    <span class="marketprice">￥{{item.market_price}}</span>
                </p>
                <p class="number">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
            <!-- </router-link> -->
        </div>
        <button class="mint-button mint-button--danger mint-button--large" @click="btnmore">
            <label class="mint-button-text" >加载更多</label>
        </button>
    </div>
  
</template>

<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return {
            goodslist:[],
            pageindex:1
        }
    },
    created() {
        this.goodlist()
    },
    methods: {
        goodlist(){
            this.$http.get("api/getgoods?pageindex="+this.pageindex).then(response=>{
                if(response.body.status===0){
                    this.goodslist=this.goodslist.concat(response.body.message);
                    if(response.body.message.length==0){
                        let instance = Toast('没有更多数据！');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    }
                }else{
                    Toast("加载失败")
                }
                
            })
        },
        btnmore(){
            this.pageindex++;
            this.goodlist();
        },
        godetail(id){
            // this.$router.push("/home/goodinfo/"+id)
            // this.$router.push({path:"/home/goodinfo/"+id})
            this.$router.push({name:"goodinfo",params:{id}})
        }
    },
}
</script>

<style lang="scss">
.box{
    width:100%;
    padding: 7px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; 
    .goodsbox{
        width: 49%;
        min-height: 293px;
        padding: 2px;
        margin: 4px 0;
        box-shadow: 0 0 8px #ccc;
        display: flex;
        flex-direction: column;
        justify-content: space-between;  
        img{
            width:100%;
        } 
        h1{
            font-size: 14px;
            color: #000;
        }
    }
}
.price{
    padding: 5px;
}
.sellprice{
    color: red;
    font-weight: bold;
    font-size: 16px;
}
.marketprice{
    text-decoration: line-through;
    font-size: 12px;
    margin-left: 10px;
}
.number{
    padding: 5px;
    display: flex;
    justify-content: space-between;
}
</style>
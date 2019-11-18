<template>
  <div>
      <div class="box2">
            <div class="mui-media-body">
                <h3>{{goodsinfo.title}}</h3>
                <p>
                    <span class="mui-ellipsis">发表时间：{{goodsinfo.add_time | dataFormat}}</span>
                    <span class="mui-ellipsis">点击：{{goodsinfo.click}}次</span>
                </p>
            </div>
            <hr>
            <div class="thumbs">
                <vue-preview :slides="imgs" class="imgprev"></vue-preview>
            </div>
            <span v-html="goodsinfo.content"></span>

            <comment-box :id="this.id"></comment-box>
      </div>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
import Viewer from "../../lib/dist/js/viewer.min.js";
import '../../lib/dist/css/viewer.min.css';
import comment from "../commons/comment.vue"
import Vue from "vue"
$(function(){
    $('.image').viewer({
        navbar: 0
    });
})
export default {
    data(){
        return {
            // 接收到id
            id:this.$route.params.id,
            goodsinfo:[],
            imgs:[],
            routepath:Vue.http.options.root
        }
    },
    created() {
        // var id=this.$route.params.id;
        // console.log(this);
        this.getgoods(this.id);
        //this.list()
    },
    methods: {
        getgoods(id){
            this.$http.get("api/getthumimages/"+id).then(response=>{
                if(response.body.status===0){
                    response.body.message.forEach(item=>{
                        item.src=this.routepath+item.src;
                        item.msrc=item.src;
                        item.w=600;
                        item.h=400;
                    })
                    this.imgs=response.body.message;
                }else{
                    Toast("加载失败")
                }
            })
            this.$http.get("api/getimageInfo/"+id).then(response=>{
                if(response.body.status===0){
                    this.goodsinfo=response.body.message[0];
                }else{
                    Toast("加载失败")
                }
            })
            
            
        },
        
    },
    components:{
        "comment-box":comment
    }
}
</script>

<style lang="scss">
h3{
    color: #26a2ff;
    font-size: 16px;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
}
p{
    font-size: 13px;
    span{
        color:#8f8f94;
    }
    
}
span{
    font-size: 13px;
}
.box2{
    padding-right: 4px;
    padding-left: 4px;
}
figure {
    display: inline-block;
    margin: 10px;
    img{
        width: 95px;
        height:70px;
    }
}
</style>
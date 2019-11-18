<template>
  <div>
      <div class="box">
            <div class="mui-media-body">
                <h3>{{newsdetail.title}}</h3>
                <p>
                    <span class="mui-ellipsis">发表时间：{{newsdetail.add_time | dataFormat}}</span>
                    <span class="mui-ellipsis">点击：{{newsdetail.click}}次</span>
                </p>
            </div>
            <hr>
            <span v-html="newsdetail.content"></span>
            <!-- 评论 -->
            <comment-box :id="this.id"></comment-box>
      </div>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
import comment from "../commons/comment.vue"
export default {
    data(){
        return {
            // 接收到id
            id:this.$route.params.id,
            newsdetail:[],
        }
    },
    created() {
        // var id=this.$route.params.id;
        // console.log(this);
        this.getnews(this.id);
        //this.list()
    },
    methods: {
        getnews(id){
            this.$http.get("api/getnew/"+id).then(response=>{
                if(response.body.status===0){
                    this.newsdetail=response.body.message[0];
                }else{
                    Toast("加载失败")
                }
            })
            
            
        }
    },
    components:{
        "comment-box":comment
    }
}
</script>

<style>
h3{
    color: red;
    font-size: 16px;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
}
p{
    font-size: 13px;
}
.box{
    padding-right: 4px;
    padding-left: 4px;
}

</style>
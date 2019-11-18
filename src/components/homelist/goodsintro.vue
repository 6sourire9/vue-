<template>
  <div class="box1">
      <h3>{{gooddesc.title}}</h3>
      <hr>
      <div v-html="gooddesc.content">

      </div>
  </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return {
            // 接收到id
            id:this.$route.params.id,
            gooddesc:[],
        }
    },
    created() {
        this.getgoods(this.id);
    },
    methods: {
        getgoods(id){
            this.$http.get("api/goods/getdesc/"+id).then(response=>{
                if(response.body.status===0){
                    this.gooddesc=response.body.message[0];
                }else{
                    Toast("加载失败")
                }
            })
            
        }
    },
}
</script>

<style lang="scss">
.box1{
    padding: 4px;
    img{
        width:100%;
    }
}
.box1 h3{
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
    /* display: inline; */
}
</style>
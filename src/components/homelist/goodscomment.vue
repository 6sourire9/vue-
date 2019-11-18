<template>
  <div>
      <!-- <h1>发表评论</h1> -->
      <comment-box :id="this.id"></comment-box>
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
        }
    },
    created() {
        
    },
    methods: {
        
    },
    components:{
        "comment-box":comment
    }
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
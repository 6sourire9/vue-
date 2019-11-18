<template>
    <div class="ctmbox">
        <h1>发表评论</h1>
        <hr>
        <textarea maxlength="120" placeholder="请输入要BB的内容（最多吐槽120字）" v-model="msg"></textarea>
        <button class="mint-button mint-button--primary mint-button--large" @click="postCommon">
            <label class="mint-button-text">发表评论</label>
        </button>
        <div v-for="(item, index) in comments" :key="index">
            <div class="comtitle">第{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dataFormat}}</div>
            <div class="comcontent">{{item.content===''?"此用户很懒，什么都没有写":item.content}}</div>
        </div>  
        <button class="mint-button mint-button--danger mint-button--large is-plain" @click="btnmore">
            <label class="mint-button-text">加载更多</label>
        </button>
    </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return{
            comments:[],
            pageindex:1,
            msg:""
        }
    },
    created() {
        this.getcomments()
    },
    methods: {
        getcomments(){
            // 初始化时加载评论内容
            this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageindex).then(response=>{
                if(response.body.status===0){
                    this.comments=this.comments.concat(response.body.message);
                }else{
                    Toast("加载失败")
                }
                if(response.body.message.length==0){
                    let instance = Toast('没有更多数据！');
                    setTimeout(() => {
                        instance.close();
                    }, 2000);
                }
            })
        },
        btnmore(){
            this.pageindex++;
            this.getcomments();
        },
        postCommon(){
            if(this.msg.trim().length===0){
                return Toast("评论内容不能为空！")
            }
            this.$http.post("api/postcomment/"+this.id,{content:this.msg.trim()}).then(response=>{
                if(response.body.status===0){
                    var comment={
                        user_name:"匿名用户",
                        add_time:Date.now(),
                        content:this.msg.trim()
                    };
                    this.comments.unshift(comment);
                    this.msg=""
                }
            })
        }
    },
    props:['id']
}
</script>

<style lang="scss">
.ctmbox{
    width: 100%;
}
h1{
    font-size: 18px;
}
textarea{
    font-size: 14px;
}
.comtitle{
    background-color: #ccc;
    font-size: 13px;
    height: 30px;
    line-height: 30px;
}
.comcontent{
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    text-indent: 2em;
}
</style>
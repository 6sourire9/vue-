<template>
    <div>
        <ul class="mui-table-view" >
            <li class="mui-table-view-cell mui-media" v-for="(item) in newlist" :key="item.id">
                <router-link :to="'/home/newsinfo/'+item.id" >
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p>
                            <span class="mui-ellipsis">发表时间：{{item.add_time | dataFormat}}</span>
                            <span class="mui-ellipsis">点击：{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
		</ul>
    </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return {
            newlist:[]
        }
    },
    created() {
        this.newslist();
    },
    methods: {
        newslist(){
            this.$http.get("api/getnewslist").then(response=>{
                if(response.body.status===0){
                    this.newlist=response.body.message;
                }else{
                    Toast("加载失败")
                }
            })
        }
    },
}
</script>

<style>
.mui-media-body p{
    color: #1954ca;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
}
</style>
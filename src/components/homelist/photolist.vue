<template>
    <div>
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted" >
				<div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px);">
					<a @tap="choose(item.id)" :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in phototitle" :key="item.id">
						{{item.title}}
					</a>
				</div>
			</div>
		</div>
		<ul>
			<!-- <li v-for="item in photolist" :key="item.id"> -->
				<router-link v-for="item in photolist" :key="item.id" tag="li" :to="'/home/photoinfo/' +item.id">
				<!-- <router-link :to="'/home/photoinfo/'+item.id" > -->
					<img v-lazy="routepath+item.img_url">
					<div class="info">
						<h1>{{item.title}}</h1>
						<div >{{item.zhaiyao}}</div>
					</div> 
				</router-link>
			<!-- </li> -->
		</ul>
    </div>
  
</template>

<script>
import {Toast} from "mint-ui"
import mui from "../../lib/dist/js/mui.min.js"
import Vue from "vue"
export default {
	// 确保已被页面加载出来
	mounted() {
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
	},
	data(){
		return{
			// id:this.$route.params.id,
			phototitle:[],
			photolist:[],
			routepath:Vue.http.options.root
		}
	},
	created() {
		this.getphototitle()
	},
	methods: {
		choose(id){
			this.$http.get("api/getimages/"+id).then(response=>{
				if(response.body.status===0){
					this.photolist=response.body.message;
                }
			})
		},
		getphototitle(){
			console.log("this",this);
			this.$http.get("api/getimgcategory").then(response=>{
				if(response.body.status===0){
					response.body.message.unshift({title:"全部",id:0});
					this.phototitle=response.body.message;		
                }else{
                    Toast("加载失败")
                }
			})
			this.choose(0);	
		},
	},
}
</script>

<style lang="scss" scoped>

*{
	touch-action: pan-x;
}
ul{
	padding: 10px;
	margin: 0px;
	li{
		list-style-type: none;
		position: relative;
		background-color: #d0d0d0;
		text-align: center;
		margin-bottom: 10px;
		box-shadow: 0 0 9px #999;
		img{
			width: 100%;
			vertical-align: middle;
		}
		img[lazy=loading] {
			width: 40px;
			height: 300px;
			margin: auto;
		}
		.info{
			background-color: rgba(0,0,0,0.5);
			position: absolute;
			text-align: left;
			bottom: 0;
			max-height: 85px;
			color: white;
			h1{
				font-size: 14px;
			}
			div{
				font-size: 13px;
			}
		}
		
	}
} 


</style>
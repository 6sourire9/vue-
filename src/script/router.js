import VueRouter from 'vue-router'
import homeRouter from "../components/tabar//home.vue"
import memberRouter from "../components/tabar/member.vue"
import shopcarRouter from "../components/tabar/shopcar.vue"
import searchRouter from "../components/tabar/search.vue"
import newlistRouter from "../components/homelist/newlist.vue"
import goodlistRouter from "../components/homelist/goodlist.vue"
import photolistRouter from "../components/homelist/photolist.vue"
import newsdetailRouter from "../components/homelist/newdetail.vue"
import goodsinfoRouter from "../components/homelist/goodsinfo.vue"
import goodsdetailRouter from "../components/homelist/goodsdetail.vue"
import goodsdesclRouter from "../components/homelist/goodsintro.vue"
import goodscommentlRouter from "../components/homelist/goodscomment.vue"


var router=new VueRouter({
    routes:[
        {path:"/",redirect:"/home"},
        {path:"/home",component:homeRouter},
        {path:"/member",component:memberRouter},
        {path:"/shopcar",component:shopcarRouter},
        {path:"/search",component:searchRouter},
        {path:"/home/newsList",component:newlistRouter},
        {path:"/home/goodList",component:goodlistRouter},
        {path:"/home/photoList",component:photolistRouter}, 
        {path:"/home/newsinfo/:id",component:newsdetailRouter}, 
        // {path:"/home/goodinfo/:id",component:goodsdetailRouter}, 
        {path:"/home/goodinfo/:id",component:goodsdetailRouter,name:"goodinfo"}, 
        {path:"/home/goodDesc/:id",component:goodsdesclRouter}, 
        {path:"/home/goodComment/:id",component:goodscommentlRouter}, 
        {path:"/home/photoinfo/:id",component:goodsinfoRouter}, 
    ],
    linkActiveClass: "mui-active"
})

export default router

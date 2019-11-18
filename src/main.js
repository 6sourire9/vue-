// 完整版，包含编译器
// import Vue from "vue/dist/vue.js"
// 运行版，不包含编译器
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

var cart=JSON.parse(localStorage.getItem("cart")||'[]')
var store=new Vuex.Store({
    state:{
        cart:cart
    },
    mutations:{
        addtocar(state,goodinfo){
            var flag=false;
            state.cart.some(item=>{
                if(item.id==goodinfo.id){
                    item.count+=parseInt(goodinfo.count);
                    flag=true;
                    return true;
                }
            })
            if(!flag){
                state.cart.push(goodinfo)
            }
            localStorage.setItem("cart",JSON.stringify(state.cart))
        },
        updatenum(state,goodinfo){
            state.cart.some(item=>{
                if(item.id==goodinfo.id){
                    item.count=parseInt(goodinfo.count);
                    return true;
                }
            })
            localStorage.setItem("cart",JSON.stringify(state.cart))
        },
        removecart(state,id){
            state.cart.some((item,i)=>{
                if(item.id==id){
                    state.cart.splice(i,1);
                    return true;
                }
            })
            localStorage.setItem("cart",JSON.stringify(state.cart))
        },
        setSelected(state,o){
            state.cart.some(item=>{
                if(item.id==o.id){
                    item.selected=o.selected;
                    return true;
                }
            })
            localStorage.setItem("cart",JSON.stringify(state.cart))
        }
    },
    getters:{
        getAllCount(state){
            var count=0;
            state.cart.forEach(item => {
                count+=item.count
            });
            return count
        },
        getCount(state){
            var obj={};
            state.cart.forEach(item=>{
                obj[item.id]=item.count;
            });
            return obj;
        },
        getSelected(state){
            var obj={};
            state.cart.forEach(item=>{
                obj[item.id]=item.selected;
            });
            return obj;
        },
        getgoodsnp(state){
            var obj={
                count:0,
                total:0
            };
            state.cart.forEach(item=>{
                if(item.selected){
                    obj.count+=item.count;
                    obj.total+=item.price*item.count
                }
            });
            return obj;
        }
    }
})

/* 按需导入
import {Header , Swipe, SwipeItem ,Button,Navbar, TabItem, Lazyload } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.use(Lazyload);
import "mint-ui/lib/style.css" */

import VueResource from "vue-resource"
Vue.use(VueResource)
Vue.http.options.root="http://192.168.3.2:8080"
// Vue.http.options.root="http://www.liulongbin.top:3005"
Vue.http.options.emulateJSON=true

// 时间转化组件
import moment from "moment"
Vue.filter('dataFormat',function(dataStr,pattern='YYYY-MM-DD HH:mm:ss'){
    return moment(dataStr).format(pattern)
})


// 完全导入
import Mint from "mint-ui"
import "mint-ui/lib/style.css"
Vue.use(Mint)  

import "./lib/dist/css/mui.min.css"
import "./lib/dist/css/icons-extra.css"
// import "./lib/dist/js/mui.min.js"

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from "./script/router.js"

import VuePreview from "vue-preview"
Vue.use(VuePreview)

/* import RouteTransition from 'vue-route-transition'
Vue.use(RouteTransition) */


import app from "./app.vue"

// 需要编译器
var vm=new Vue({
    el:"#app",
    data:{
        
    },
    methods: {
        
    },  
    render:c=>c(app),
    router,
    store
}) 

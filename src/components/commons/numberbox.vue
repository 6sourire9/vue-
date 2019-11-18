<template>
    <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1'>
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number" @change="countChanged" ref="numbox"/>
        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from "../../lib/dist/js/mui.min.js"
export default {
    mounted() {
        mui(".mui-numbox").numbox();
    },
    methods: {
        countChanged(){
            this.$emit("getcount",parseInt(this.$refs.numbox.value))
        }
    },
    props:['max'],
    watch: {
        max:function(newval,oldval){
            mui(".mui-numbox").numbox().setOption("max",newval);
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
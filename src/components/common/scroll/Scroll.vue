<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
export default {
    name:'Scroll',
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            scroll:null,
        }
    },
    mounted(){
        //1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            observeDOM:true,
            observeImage:true, //监听图片加载完成
            click:true,
            probeType:this.probeType, //监听滚动
            pullUpLoad:this.pullUpLoad, //上拉加载
        }),
        //2.监听滚动位置
        this.scroll.on('scroll',(position) => {
            // console.log(position);
            this.$emit('scroll',position)
        }),
        //3.监听上拉事件
        this.scroll.on('pullingUp',() => {
            // console.log('上拉加载')
            this.$emit('pullingUp')
        })
    }
}
</script>
<style scoped>

</style>
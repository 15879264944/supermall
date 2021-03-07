<template>
    <div id="home">
        <!-- 导航栏 -->
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <!-- 滚动区域 -->
        <scroll class="content" ref="scroll" 
        :probeType="3" 
        @scroll="contentScroll" 
        :pull-up-load='true' 
        @pullingUp="loadMore">
            <!-- 轮播图 -->
            <home-swiper :banners='banners'/>
            <!-- 组件 -->
            <home-recommend-view :recommends='recommends'/>
            <!-- 图片组件 -->
            <feature-view/>
            <!-- 内容组件 -->
            <tab-control class="tab-control" :titles="['流行','新款','优选']" @tabClick='tabClick'/>
            <!-- 商品详情 -->
            <goods-list :goods="showGoods"/>
        </scroll>
        <!-- 返回顶部按钮 -->
        <back-top  @click.native="backClick" v-show="isShowBackTop"/>

    </div>
</template>

<script>
import { getHomeMultidata, getHomeGoods } from 'network/home';


import NavBar from 'components/common/navbar/NavBar';
import HomeSwiper from './childComps/HomeSwiper';
import HomeRecommendView from './childComps/HomeRecommendView';
import FeatureView from './childComps/FeatureView.vue';
import TabControl from '../../components/content/tabControl/TabControl.vue';
import GoodsList from '../../components/content/goods/GoodsList.vue';
import Scroll from '../../components/common/scroll/Scroll.vue';
import BackTop from '../../components/content/backtop/BackTop.vue';



export default {
    name:'Home',
    components:{
        NavBar,
        HomeSwiper,
        HomeRecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop,
    },
    data() {
        return{
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]},
            },
            currentType : 'pop', //默认展开第一页
            isShowBackTop:false,
        }
    },
    created(){
        //1.请求多条数据
        this.getHomeMultidata();
        //2.请求商品数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
    },
    computed:{
        showGoods(){
            return this.goods[this.currentType].list
        }
    },
    methods:{
        //1.请求多条数据
        getHomeMultidata(){
            getHomeMultidata().then(res => {
                //console.log(res)
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            });
        },
        //2.请求商品数据
        getHomeGoods(type){
            const page = this.goods[type].page + 1;
            getHomeGoods(type,page).then(res => {
            //console.log(res.data.list);
            this.goods[type].list.push(...res.data.list);
            this.goods[type].page += 1;

            //刷新上拉刷新操作
            this.$refs.scroll.scroll.finishPullUp();
        })
        },
        //监听商品栏
        tabClick(index){
            //console.log(index)
            switch(index){
                case 0:
                    this.currentType = 'pop';
                    break;
                case 1:
                    this.currentType = 'new';
                    break;
                case 2:
                    this.currentType = 'sell';
                    break;
            }
        },
        //回到顶部按钮
        backClick(){
            // console.log("回到顶部");
            this.$refs.scroll.scroll.scrollTo(0,0,500);
        },
        //监听滚动距离
        contentScroll(position){
            // console.log(position)
            this.isShowBackTop = -position.y > 1000;
        },
        //监听上拉加载更多
        loadMore(){
            // console.log('上拉加载')
            this.getHomeGoods(this.currentType);
            //重新刷新scroll可滚动区域
            this.$refs.scroll.scroll.refresh();
        }
    }
}
</script>
<style scoped>
    #home{
        /* padding-top:44px ; */
        height: 100vh;  /*视口高度 */
    }
    .home-nav{
        background-color: var(--color-tint);
        color:#fff;
        position:fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 5;
    }
    .tab-control{
        position: sticky; /*判断某个属性触顶悬停 */
        top: 44px;
        z-index: 2;
    }
    .content{
        /* height: calc(100% - 93px);
        overflow: hidden;
        margin-top:44px ; */

        overflow: hidden;
        position: absolute;
        top: 40px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
</style>
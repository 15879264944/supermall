<template>
    <div id="home">
        <!-- 导航栏 -->
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
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



export default {
    name:'Home',
    components:{
        NavBar,
        HomeSwiper,
        HomeRecommendView,
        FeatureView,
        TabControl,
        GoodsList,
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
        }
    }
}
</script>
<style>
    #home{
        padding-top:44px ;
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
</style>
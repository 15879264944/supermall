<template>
    <div id="home">
        <!-- 导航栏 -->
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <!-- 轮播图 -->
        <home-swiper :banners='banners'></home-swiper>
        <!-- 组件 -->
        <home-recommend-view :recommends='recommends'></home-recommend-view>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'



import { getHomeMultidata } from 'network/home';



export default {
    name:'Home',
    components:{
        NavBar,
        HomeSwiper,
        HomeRecommendView
        
    },
    data() {
        return{
            banners:[],
            recommends:[]
        }
    },
    created(){
        //1.请求多给数据
        getHomeMultidata().then(res => {
            //console.log(res)
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
        });
    }
}
</script>
<style>
    .home-nav{
        background-color: var(--color-tint);
        color:#fff
    }
</style>
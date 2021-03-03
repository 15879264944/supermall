import Vue from 'vue'
import VueRouter from 'vue-router'
//1.安装插件
Vue.use(VueRouter)



const Home = () => import('../views/home/home.vue')
const Cartgory = () => import('../views/cartgory/cartgory.vue')
const Cart = () => import('../views/cart/cart.vue')
const ProFile = () => import('../views/profile/profile.vue')



//2.创建router
const routes = [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/cart',
        component:Cart
    },
    {
        path:'/cartgory',
        component:Cartgory
    },
    {
        path:'/profile',
        component:ProFile
    }
]
const router = new VueRouter({
    routes,
    // 采用 history 模式
    mode:'history'
})

export default router
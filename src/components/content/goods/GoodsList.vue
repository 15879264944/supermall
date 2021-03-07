<template>
    <div class="goods">
        <goods-list-item v-for="(item,i) in goods" :key="i" :goods-item='item'/>
    </div>
</template>
<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
    components: { 
        GoodsListItem,
    },
    name:'GoodsList',
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    },
}
</script>
<style scoped>
.goods{
    display: flex;
    flex-wrap:wrap;
    justify-content: space-around;
    align-items: center;
    /* margin-bottom: 50px; */
}
</style>
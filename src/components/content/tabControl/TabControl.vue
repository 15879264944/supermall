<template>
    <div class="tab-control">
        <div v-for="(item,i) in titles" :key="i" 
        class="tab-control-item" 
        :class="{active: i === currentIndex}"
        @click="itemClick(i)"
        >
            <span>{{item}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:'TabControl',
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            currentIndex:0, //记录列表元素的点击状态
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex = index;
            this.$emit('tabClick',index);
        }
    }
}
</script>
<style scoped>
    .tab-control{
        display: flex;
        text-align: center;
        font-size: 15px;
        background-color: #fff;
    }
    .tab-control-item{
        flex: 1;
        height: 40px;
        line-height: 40px;
    }
    .tab-control-item span{
        padding: 5px;
    }
    .active{
        color: var(--color-high-text);
    }
    .active span{
        border-bottom: 3px solid var(--color-high-text);
    }
</style>
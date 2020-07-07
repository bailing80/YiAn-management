<template>
    <div>
       <div class="header">
           <i class="icon"></i><p class="title">产品报修</p>
       </div>

       <div class="on">
           <i class="search"></i><input type="text">
       </div>

    </div>
</template>

<script>
export default {
    name:'product',
    data(){
        return {
            m_text:'请选择设备机型',
            fault:'请选择故障类型',
            desc:'请输入故障描述'
        }
    }
}
</script>
<style scoped>

.on{
    width: 7rem;
    height: .64rem;
    background: #fff;
    border-radius: .07rem;
    margin: .2rem .24rem .23rem;
    position: relative;
}
.on .search{
    display: inline-block ;
    width: .29rem ;
    height: .29rem;
    background: url('../assets/repair/search.png')no-repeat;
    background-size: .29rem .29rem;
    position: absolute;
    top: .18rem;
    left: .2rem;
}
.on input{
    width: 5.75rem;
    height: .64rem;
    line-height: .64rem;
    font-size: .28rem;
    color: #b3b3b3;
    float: left;
    margin-left: .58rem;
}


</style>
<template>
    <div class="box">
       <div class="header">
           <i class="icon" @click="toback"></i><p class="title">员工登录</p>
       </div>
       <ul class="main">
           <li>
               <h2>员工编号</h2>
               <input type="phone" placeholder="请输入员工号" class="w657">
            </li>
           <li>
               <h2>密码</h2>
               <input type="phone" placeholder="请输入密码" class="w657">
            </li>
       </ul>
       <div class="sendbtn dw" @click="tosend">提交</div>
    </div>
</template>

<script>
export default {
    name:'repair',
    data(){
        return {
          src1:'../assets/code.png'
        }
    },
    methods:{
        toback(){
            this.$router.go(-1);
        },
        tosend(){
            this.$router.push({
                path: "/staffserver"
            });
        }
        
    }
}
</script>
<style scoped>
.main{
    margin: .2rem .34rem 0;
}

.main li{
    height: 1.68rem;
    width: 6.82rem;
    margin: .2rem 0;
}
.main li h2{
    width: 6.8rem;
    height: .6rem;
    line-height: .6rem;
    font-size: .32rem;
    font-weight: 500;
    margin: .13rem 0;
}
.main li input{
    height: .96rem;
    width: 6.57rem;
    border: .01rem #b8b8ba solid;
    font-size: .25rem;
    line-height: .96rem;
    padding-left: .22rem;
}

.dw{
    margin: 5rem 0 1rem .35rem;
}
</style>


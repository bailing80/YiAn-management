<template>
    <div class="box">
        <div class="header">
           <i class="icon"></i><p class="title">个人信息</p>
        </div>
       <ul class="main">
            <li><p>当前手机号</p><i>{{msg}}</i></li>
            <li><p>新手机号</p><input type="text" placeholder="请输入新手机号"></li>
            <li><p>验证码</p><input type="text" class="code" placeholder="请输入验证码"><span>获取验证码</span></li>
       </ul>
       <div class="sendbtn btn">保存</div>
    </div>
</template>

<script>
export default {
    name:'usertion',
    data(){
        return {
            msg:'12323122333'
        }
    }
}
</script>
<style scoped>
.main li{
    width: 7.5rem;
    height: 1.16rem;
    line-height: 1.16rem;
    background: #fff;
    margin:.02rem 0 ;
}
.main li p {
    width: 2.5rem;
    font-size: .34rem;
    font-weight: 530;
    margin-left: .35rem;
    float: left;
}
.main li i{
    font-style: normal;
    color: #919191;
    font-size: .28rem;
    width: 4rem;
    float: left;
}
.main li input{
    width: 4rem;
    height: 1.16rem;
    line-height: 1.16rem;
    vertical-align: top
}
.main li .code{
    width: 2rem;
   
}
.main li span{
    display: block;
    width: 1.94rem;
    height: .84rem;
    background: #998bd6;
    font-size: .28rem;
    color: #fff;
    text-align: center;
    line-height: .84rem;
    float: right;
    margin: .15rem .35rem 0 0;
}


</style>


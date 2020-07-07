<template>
    <div class="box">
       <div class="header">
           <i class="icon" @click="toback"></i><p class="title">维修知识</p>
       </div>
       <div class="main">
          <ul>
              <li :class="{ac:bool=='boxlist01'}"  @click="clickall('0')">全部<i></i></li>
              <li :class="{ac:bool=='boxlist02'}"  @click="clickall('1')">未读<i></i></li>
              <li :class="{ac:bool=='boxlist03'}"  @click="clickall('2')">已读</li>
          </ul>
          <!-- 未读u -->
          <div class="boxlist" v-show="'boxlist01'== bool ">
            <div class="list" @click="tomaintaindetail">
                <span>未读</span>
                <img :src="src1" alt="" class="box_img">
                <p>单水平呼吸机</p>
                <i>2019-03-01</i>
                <u></u>
            </div>
            <div class="list ac" @click="tomaintaindetail">
                <span>未读</span>
                <img :src="src1" alt="" class="box_img">
                <p>单水平呼吸机</p>
                <i>2019-03-01</i>
                <u></u>
            </div>
            <div class="list ac" @click="tomaintaindetail">
                <img :src="src1" alt="" class="box_img">
                <p>单水平呼吸机</p>
                <i>2019-03-01</i>
                <u></u>
            </div>
            <div class="list" @click="tomaintaindetail">
                <img :src="src1" alt="" class="box_img">
                <p>单水平呼吸机</p>
                <i>2019-03-01</i>
                <u></u>
            </div>
          </div>
          <!-- 已读 -->
          <div class="boxlist" v-show="'boxlist02'== bool ">
            <div class="list ac" @click="tomaintaindetail">
                <img :src="src1" alt="" class="box_img">
                <p>单水平呼吸机</p>
                <i>2019-03-01</i>
                <u></u>
            </div>
            <div class="list" @click="tomaintaindetail">
                <img :src="src1" alt="" class="box_img">
                <p>单水平呼吸机</p>
                <i>2019-03-01</i>
                <u></u>
            </div>
          </div>

          <div class="boxlist" v-show="'boxlist03'== bool ">
            <div class="list ac" @click="tomaintaindetail">
                <img :src="src1" alt="" class="box_img">
                <p>单水平呼吸机</p>
                <i>2019-03-01</i>
                <u></u>
            </div>
            <div class="list" @click="tomaintaindetail">
                <img :src="src1" alt="" class="box_img">
                <p>单水平呼吸机</p>
                <i>2019-03-01</i>
                <u></u>
            </div>
          </div>

          
       </div>

    </div>
</template>

<script>
export default {
    name:'maintain',
    data(){
        return {
            src1:require("../assets/tu_img01.png"),
            bool:'boxlist01',
        }
    },
    methods:{
        toback(){
            this.$router.go(-1);
        },
        tomaintaindetail(){
            this.$router.push({
                path:"/maintaindetail"
            })
        },
        clickall(n){
            if(n==0){
                this.bool='boxlist01'
            }else if(n==1){
                this.bool='boxlist02'
            }else if(n==2){
                this.bool='boxlist03'
            }
        }
        
    }
}
</script>
<style scoped>
.main ul{
    background: #fff;
    width: 7.25rem;
    height: .82rem;
    padding-left: .24rem;
}
.main ul li{
    width:1.55rem;
    height: .79rem;
    display: inline-block;
    vertical-align: top;
    font-size: .28rem;
    line-height: .82rem;
    color: #000;
    text-align: center;
    position: relative;
    margin:  0 .4rem;
}
.main ul li i{
    height: .36rem;
    width: .01rem;
    background: #b3b3b3;
    position: absolute;
    top: .23rem;
    right: -.4rem;
}
.main ul .ac{
    border-bottom: .03rem #714b9d solid;
}

.list {
    width: 6.8rem;
    height: 3.5rem;
    position: relative;
    font-size: .28rem;
    color: #323232;
    margin: .25rem .35rem 0;
}

.list span{
    position: absolute;
    top: 0;
    right: 0;
    width: 1.23rem;
    height:1.09rem;
    background: url('../assets/sanjiao.png')no-repeat;
    background-size: 100% 100%;
    font-size: .26rem;
    color: #fff;
    text-align: right;
    letter-spacing: .08rem;
    line-height: .5rem
}
.list p{
    width: 4.65rem;
    height: .32rem;
    line-height: .32rem;
    position: absolute;
    bottom: .25rem;
    left: .3rem;
}
.list i{
    display: block;
    width: 1.65rem;
    height: .32rem;
    line-height: .32rem;
    position: absolute;
    bottom: .25rem;
    right: .25rem;
}
.list u{
    display: none;
    width: .99rem;
    height: .98rem;
    position: absolute;
    top: 1.1rem;
    right: 2.9rem;
    background: url('../assets/play.png')no-repeat;
    background-size: 100% 100%;
}
.list .box_img{
    width: 100%;
    height: 100%;
    display: block;
}
.ac u{
    display: block;
}
</style>


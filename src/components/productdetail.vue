<template>
    <div class="box">
       <div class="header">
           <i class="icon" @click="toback"></i><p class="title">配件购买详情</p>
       </div>
       <div class="main">
           <img :src="src1" alt="" class="product_img">
           <ol>
               <li>适配机型</li>
               <li class="ac mb">规格说明</li>
               <li>图文详情</li>
           </ol>
           <div class="specification">
              <h3>AS100系列产品型号对照表</h3>
              <table>
                    <tr>
                        <td valign="top" class="td01">类型</td>
                        <td valign="top" class="td02">CPAP</td>
                        <td valign="top" class="td03">AUTO CPAP</td>
                    </tr>
                    <tr>
                        <td valign="top" class="td01">模式</td>
                        <td valign="top" class="td02">CPAP</td>
                        <td valign="top" class="td03">CPAP、AUTO CPAP</td>
                    </tr>
                    <tr>
                        <td valign="top" class="td01">压力（cmH2O）</td>
                        <td valign="top" class="td02">4-20</td>
                        <td valign="top" class="td03">4-20</td>
                    </tr>
                    <tr>
                        <td valign="top" class="td01">延时升压（min）</td>
                        <td valign="top" class="td02">0-60</td>
                        <td valign="top" class="td03">0-60</td>
                    </tr>
                    <tr>
                        <td valign="top" class="td01">呼气末压力释放</td>
                        <td valign="top" class="td02">ELex 1-7级</td>
                        <td valign="top" class="td03">ELex 1-7级</td>
                    </tr>
                    <tr>
                        <td valign="top" class="td01">中枢型呼吸暂停识别</td>
                        <td valign="top" class="td02">√</td>
                        <td valign="top" class="td03">√</td>
                    </tr>
                    <tr>
                        <td valign="top" class="td01">AS-Dry干燥技术</td>
                        <td valign="top" class="td02">√</td>
                        <td valign="top" class="td03">√</td>
                    </tr>
                     <tr>
                        <td valign="top" class="td01">自动开/关</td>
                        <td valign="top" class="td02">√</td>
                        <td valign="top" class="td03">√</td>
                    </tr>
                     <tr>
                        <td valign="top" class="td01">漏气补偿</td>
                        <td valign="top" class="td02">√</td>
                        <td valign="top" class="td03">√</td>
                    </tr>
                    <tr>
                        <td valign="top" class="td01">手动压力滴定</td>
                        <td valign="top" class="td02">选配</td>
                        <td valign="top" class="td03">选配</td>
                    </tr>
                    <tr>
                        <td valign="top" class="td01">治疗数据存储</td>
                        <td valign="top" class="td02">有，SD卡</td>
                        <td valign="top" class="td03"></td>
                    </tr>
                </table>
           </div>
       </div>
       <div class="shopping">
           <span></span>
           <div class="sp_anniu">
               <i class="" @click="minus"></i>
               <input type="text" v-model="num">
               <i class="ac" @click="plus"></i>
           </div>
           <p>￥：{{money}}</p>
           <u>立即购买</u>
       </div>
    </div>
</template>

<script>
export default {
    name:'repair',
    data(){
        return {
          src1:require("../assets/tu_img01.png"),
          num:'1',
          price:'500',
          money:'500'
        }
    },
   
    watch: {
        price(){
            return this.money = this.price;
        },
        num(){
            return this.money = this.num * this.price;
        }
    },
    methods:{
        toback(){
            this.$router.go(-1);
        },
        toyiyuan(){
            this.$router.push({
                path: "/custser"
            });
        },
        //++
        plus(){
            this.num++
        },
        //--
        minus(){
            if(this.num=='1')return;
            this.num--
        }
        
    }
}
</script>
<style scoped>

.main{
    margin: .16rem .34rem ;
    padding-bottom: 1.32rem
}
.main .product_img{
    width: 6.8rem;
    height: 4.7rem;
    display: block;
}
.main ol{
    height: 1.07rem;
    width: 6.8rem;
}
.main ol li{
    width: 1.35rem;
    height: .64rem;
    line-height: .64rem;
    float: left;
    font-size: .32rem;
    color: #000;
    padding: .26rem 0rem 0;
    text-align: center;
}

.main .mb{
    margin: 0 1.22rem .15rem;
}
.main ol .ac{
    border-bottom: .01rem #592d8d solid;
    color: #592d8d;
}

.main .specification{
    width: 6.24rem;
    padding: .18rem .28rem;
    background: #fff;
    
}
.main .specification h3{
    width: 6.24rem;
    background: #eeeaf3;
    font-size: .25rem;
    line-height: .62rem;
    height: .62rem;
    text-align: center;
    margin-bottom: .13rem;
}

.main .specification table{
    width: 6.24rem;
    height: auto;
    font-size: .24rem;
    color: #919191;
    min-height: .52rem;
    line-height: .52rem;
    text-align: left;
    table-layout:fixed;word-wrap:break-word;
    vertical-align: top;
    
}


.main .specification table .td01{
    width: 2.8rem;
}
.main .specification table .td02{
    width: 1.8rem;
}
.main .specification table .td03{
    width: 1.5rem;
}

.shopping {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 7.5rem;
    height: .97rem;
    background: #fff;
}
.shopping span{
    float: left;
    width: .57rem;
    height: .54rem;
    background: url('../assets/icon_yun.png')no-repeat;
    background-size: 100% 100%;
    margin: .24rem .37rem 0;
}
.shopping .sp_anniu{
    float: left;
    width: 1.68rem;
    height: .47rem;
    margin-top: .26rem;
}
.shopping .sp_anniu i{
    display: block;
    width: .45rem;
    height: .47rem;
    background: url('../assets/icon_minus.png')no-repeat;
    background-size: 100% 100%;
    float: left;
}
.shopping .sp_anniu .ac{
    background: url('../assets/icon_plus_ac.png')no-repeat;
    background-size: 100% 100%;
}
.shopping .sp_anniu input{
    width: .71rem;
    height: .45rem;
    border: .01rem #bbb1e4 solid;
    float: left;
    padding-left: .05rem;
    border-left: none;
    border-right: none;
}
.shopping p{
    font-size: .28rem;
    color: #998bd6;
    height: .97rem;
    line-height: .97rem;
    width: 2.1rem;
    float: left;
    margin-left: .3rem;
}
.shopping u{
    display: block;
    font-size: .28rem;
    color: #fff;
    height: .97rem;
    line-height: .97rem;
    width: 2.1rem;
    float: left;
    background: #998bd6;
    text-align: center
}

</style>


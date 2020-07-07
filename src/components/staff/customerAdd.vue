<template>
    <div class="box">
        <div class="header">
            <i class="icon" @click="toback"></i><p class="title">客户个人信息</p>
        </div>
        <div class="main">
            <ul >
                <li><p>省份</p><input type="text" value="河南"><i></i></li>
                <li><p>产品线</p><input type="text" value="呼吸机"><i></i></li>
                <li><p>型号</p><input type="text" value="Shangrila520"><i ></i></li>
                <li><p>安装日期</p><input type="text" value="2019-04-30"><i></i></li>
                <li><p>客户</p><input type="text" value="河南省洛阳工人龙门疗养院"><i></i></li>
                <li><p>产品</p><input type="text" value="112000021"><i ></i></li>
                <li><p>级别</p><input type="text" value="二级"><i></i></li>
                <li><p>联系人</p><input type="text" value="李主任"><i></i></li>
                <li><p>派工单号</p><input type="text" value="AZ-20100623-0018"><i></i></li>
                <li><p>联系电话</p><input type="text" value="13525468731"><i></i></li>
                <li><p>序列号</p><input type="text" value="SL520YZZV039"><i></i></li>
                <li><p>安装人</p><input type="text" value="袁志超"><i></i></li>
                <li><p>科室</p><input type="text" value="内科"><i></i></li>
                <li><p>保修结束日期</p><input type="text" value="2011-07-05"><i></i></li>
                <li><p>保修开始日期</p><input type="text" value="2010-07-06"><i></i></li>
                <li><p>创建时间</p><input type="text" value="2010-07-07 11:44:41"><i></i></li>
                <!-- <li><p>故障现象</p><textarea  maxlength="85" placeholder="请描述故障" ></textarea><i></i></li> -->
                <li><p>城市</p><input type="text" value="洛阳"><i></i></li>
            </ul>
        </div>
       <div class="sendbtn mt">添加客户</div>
    </div>
</template>

<script>
export default {
    name:'position',
    data(){
        return {
          src1:'../../assets/code.png'
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
        }
        
    }
}
</script>
<style scoped>
.main {
  background: #fff;
}
.main h3 {
  width: 7.26rem;
  height: 1.02rem;
  line-height: 1.02rem;
  padding-left: 0.24rem;
  background: #eeeaf3;
  font-size: 0.28rem;
  position: relative;
}
.main h3 i {
  display: block;
  width: 0.15rem;
  height: 0.27rem;
  line-height: 1.02rem;
  background: url("../../assets/icon_you.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0.4rem;
  right: 0.25rem;
}
.main ul {
  overflow: hidden;
  transform: all 0.3;
}

.main li {
  width: 7.02rem;
  line-height: 0.89rem;
  background: #fff;
  position: relative;
  margin-bottom: 0.02em;
  margin: 0 0.24rem;
  border-bottom: 0.01rem #f2f2f2 solid;
  transform: all 0.3;
}
.main li span {
  height: 0.89rem;
  line-height: 0.89rem;
  width: 5.3rem;
  color: #666666;
  font-size: 0.28rem;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 1.5rem;
  background: border-box;
  text-align: right;
}

.main li input {
  height: 0.89rem;
  line-height: 0.89rem;
  width: 5.3rem;
  color: #666666;
  font-size: 0.28rem;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 1.5rem;
  background: border-box;
  text-align: right;
}
.main li span {
  height: 0.89rem;
  line-height: 0.89rem;
  width: 5.3rem;
  color: #323232;
  font-size: 0.28rem;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 1.5rem;
  background: border-box;
  text-align: right;
}
.main li p {
  height: 0.89rem;
  color: #323232;
  font-size: 0.28rem;
}
.main li i {
  display: none;
  position: absolute;
  top: 0.3rem;
  right: 0rem;
  color: #acacac;
  font-style: normal;
  width: 0.17rem;
  height: 0.28rem;
  background: url("../../assets/arrow_r.png") no-repeat;
  background-size: 100% 100%;
}

.main li textarea {
    line-height: .34rem;
    height: 1.6rem;
    width: 6.8rem;
    color: #666666;
    font-size: 0.28rem;
}

.main li .ac {
  display: block;
}
.main .rm_ac {
  border-bottom: none;
  line-height: 0.59rem;
}
.main .rm_ac01 {
  border-bottom: none;
  line-height: 0.79rem;
}
.main li .mr {
  width: 6.8rem;
  padding: 0.2rem 0;
  height: 0.97rem;
  line-height: 0.42rem;
  border: none;
}

.main li .hg {
  height: 0.54rem;
  line-height: 0.54rem;
  display: inline-block;
  vertical-align: top;
  width: 6rem;
  margin-left: 0.25rem;
}

.main li u {
  display: inline-block;
  width: 0.39rem;
  height: 0.39rem;
  background: url("../../assets/phone.png") no-repeat;
  background-size: 100% 100%;
  vertical-align: top;
  margin-top: 0.08rem;
}

.main .rm_ac01 u {
  background: url("../../assets/diqiu.png") no-repeat;
  background-size: 100% 100%;
}

.mt {
  margin: 0.8rem 0 1rem 0.35rem;
  display: inline-block;
  vertical-align: top;
}

.main .hg_ac {
  height: auto;
}



</style>


<template>
  <div class="box">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">进度详情</p>
    </div>
    <div class="maiList">
      <!-- <ul class="list ac" v-show="user_type=='01'"> -->
            <ul class="list ac">
        <li>
          <h3>客户基本信息</h3>
           <div
            class="chakanxiangqing"
           v-show="list1.status == 7 || list1.status == 6"
            @click="pdfIMg(list1.assignId)"
          >查看签字</div>
        </li>
        <li>
          <p><i class="malistlistme">医院名称：</i><em class="malistlistmeac">{{list1.customerName}}</em></p>
        </li>
        <!-- <li>
          <p>级别：{{this.$store.state.letter.history.customer_level}}</p>
        </li>
        <li>
          <p><i class="malistlistme">地址：</i><em class="malistlistmeac" style="    width: 5.1rem;">{{this.$store.state.letter.history.address}}</em></p>
        </li>
        <li>
          <p>邮编：{{this.$store.state.letter.history.zip_code}}</p>
        </li>
        <li>
          <p>使用科室：{{this.$store.state.letter.user.department}}</p>
        </li> -->
          <li>
          <p>联系人：{{list1.contacts}}</p>
        </li>
        <li>
          <p>联系电话：{{list1.phone}}</p>
        </li>
          <li>
          <p>服务内容：{{list1.serviceContent}}</p>
        </li>
         <li>
          <p>约定时间：{{list1.appointmentDate | timeslce(list1.appointmentDate)}}</p>
        </li>
        <li>
          <p>到位时间：{{list1.achieveDate == null?"待确定":list1.achieveDate ==""? "待确定":list1.achieveDate | timeslce(list1.achieveDate)}}</p>
        </li>
      
          
        <!-- <li>
          <p>维修类别：保外</p>
        </li>-->
      </ul>

      <!-- <ul class="list ac" v-show="user_type=='02'">
        <li>
          <h3>渠道信息</h3>
        </li>
        <li>
          <p><i class="malistlistme">渠道名称：</i><em class="malistlistmeac">{{this.$store.state.letter.user.channel_name}}</em></p>
        </li>
        <li>
           <p><i class="malistlistme">地址：</i><em class="malistlistmeac" style="    width: 5.1rem;">{{this.$store.state.letter.history.address}}</em></p>
        </li>
        <li>
          <p>邮编：{{this.$store.state.letter.history.zip_code}}</p>
        </li>

        <li>
          <p>联系电话：{{this.$store.state.letter.user.phone}}</p>
        </li>
        <li>
          <p>联系人：{{this.$store.state.letter.user.contacts_name}}</p>
        </li>
      </ul>

      <ul class="list ac" v-show="user_type=='03'">
        <li>
          <h3>家庭基本信息</h3>
        </li>
        <li>
          <p>联系人姓名：{{this.$store.state.letter.user.name}}</p>
        </li>
        <li>
          <p>手机号：{{this.$store.state.letter.user.phone}}</p>
        </li>
        <li>
           <p><i class="malistlistme">地址：</i><em class="malistlistmeac" style="    width: 5.1rem;">{{this.$store.state.letter.history.address}}</em></p>
        </li>
        <li>
          <p>产品线：{{this.$store.state.letter.history.productLine}}</p>
        </li>
        <li>
          <p>产品型号：{{this.$store.state.letter.history.model}}</p>
        </li>
        <li>
          <p>购买日期：{{this.$store.state.letter.history.buy_date.substring(0,10)}}</p>
        </li>
      </ul> -->
      <ul class="list ac" v-for="(listcont,index) in list2" :key="index">
        <li>
          <h3>服务前产品信息</h3>
        </li>
         <li>
         <p>工单号：{{list1.assignId}}</p>
         </li>
        <li>
          <p>产品线：{{listcont.productLine}}</p>
        </li>
          <li>
          <p>型号：{{listcont.model}}</p>
        </li>
        <!-- <li>
          <p>故障信息</p>
        </li>-->
      </ul>
      <!-- <ul class="list">
        <li>
          <h3>产品故障信息</h3>
        </li>
        <li>
          <ul v-for="(listcont,index) in list" :key="index">
            <li>
              <p>工单号：{{list1.assignId}}</p>
            </li>
            <li>
              <p>产品线：{{listcont.productLine}}</p>
            </li>
            <li>
              <p>型&nbsp;&nbsp;&nbsp;号：{{listcont.model}}</p>
            </li>
            <li v-show="list1.applyType == 'WX'">
              <p>故障部件：{{listcont.product}}</p>
            </li>
            <li v-show="list1.applyType == 'WX'">
              <div class="listdiv">
                <h4>故障描述：</h4>
                <p>{{listcont.customerNo}}</p>
              </div>
            </li> -->

            <!-- <li>
              <p>产品状态：正常使用</p>
            </li>-->
          <!-- </ul>
        </li>
      </ul> -->
    </div>
     <div class="hg"></div>
     <div class="model" v-show="yulanShow">
      <div class="bg_yanse"></div>
      <baseImgtu class="yulanImng" :pdfimglist="pdfImg" :class="{yulanImngac:yulanShow}"></baseImgtu>
      <!-- <a :href="baseUrlxiazai+pdfImg" download class="xiazaiwenjian">- 点击下载</a> -->
      <div class="xiazaiwenjian xiazaiwenjian1" @click="yinchang">- 关闭预览</div>
    </div>

  </div>
  
</template>

<script>
import baseUrl from "../../api/baseUrl.js";
import Cookie from "../../api/cookie.js";
import { Toast, MessageBox, Indicator } from "mint-ui";
import baseImgtu from "../workorder/pdf";
// import pdf from "vue-pdf";
var _this;
export default {
  name: "position",
  filters: {
    dicFilter: function(v, filter) {
      let i = filter.findIndex(item => {
        return v == item.value;
      });
      return i > -1 ? filter[i].lable : v;
    },
    timeslce(d, n) {
      if (d != "" && d != undefined && d != null) {
        return d.substr(0, 10);
      }
    }
  },
  data() {
    return {
      user_type: "",
      userdetali: {},
      appointmentDate: "",
      maintenanceInfo: "",
      list: [],
      list1: [],
      list2: [],
      productLine: [],
      CUSTOMER_LEVEL: [],
      yulanShow: false,
      listcont:[],
      applyJobInfo:[],
      yulanShow: false,
      pdfImg: ""
    };
    
  }, 
   components: {
    baseImgtu
  },
  created() {
    _this = this;
    if (Cookie.getCookie("avatar") == "0") {
      this.user_type = "01";
    } else if (Cookie.getCookie("avatar") == "1") {
      this.user_type = "02";
    } else if (Cookie.getCookie("avatar") == "3") {
      this.user_type = "03";
    }
    if (this.$route.query.appointmentDate) {
      this.appointmentDate = this.$route.query.appointmentDate.substring(0, 10);
    }
    // var id = "groupId=" + this.$route.query.listid;
    var id = { groupId: this.$route.query.id };
  
    //设备号  翻译
    this.$Axios
      .post(
        baseUrl + "/dicCode/queryDicByMoreType?type=PRODUCT_LINE,CUSTOMER_LEVEL"
      )
      .then(function(response) {
        //重复点击
        // _this.is_ajax = false;
        if (response.data.code == 200) {
          for (
            let custLevel = 0;
            custLevel <= response.data.data.length - 1;
            custLevel++
          ) {
            if (response.data.data[custLevel].type == "PRODUCT_LINE") {
              _this.productLine.push(response.data.data[custLevel]);
            }
            if (response.data.data[custLevel].type == "CUSTOMER_LEVEL") {
              if (
                response.data.data[custLevel].value == _this.$route.query.level
              ) {
                _this.$store.state.letter.history.customer_level =
                  response.data.data[custLevel].lable;
              }
            }
          }
          _this.producti(id);
        }
      })
      .catch(function(error) {
        // _this.is_ajax = false;
      });
  },
  methods: {
      pdfIMg(assignId) {
    
      let urk = "/reportType/queryReportByGroupId?assignId=" + assignId;

      _this.$Axios
        .post(baseUrl + urk)
        .then(res => {
          //重复点击
          if (res.data == "loginTimeout") {
            _this
              .$confirm("登录超时，请重新登录", "提示", {
                confirmButtonText: "确定",
                showCancelButton: false,
                type: "warning"
              })
              .then(() => {
                Cookie.clearCookie();
                _this.$router.replace({
                  path: "/"
                });
              });

            return;
          }
          // _this.is_ajax = false;
          if (res.data.code == 200) {
            _this.yulanShow = true;
            _this.pdfImg = "/" + res.data.data;
          }
        })
        .catch(error => {
          Indicator.close();
        });
    },
    //产品线类型
    producti(id) {
      this.letid=id
      _this.$Axios
        .post(baseUrl + "/applyJob/queryScheduleInfo", id)
        .then(function(response) {
          //重复点击
          // _this.is_ajax = false;

          if (response.data == "loginTimeout") {
            _this
              .$confirm("登录超时，请重新登录", "提示", {
                confirmButtonText: "确定",
                showCancelButton: false,
                type: "warning"
              })
              .then(() => {
                Cookie.clearCookie();
                _this.$router.replace({
                  path: "/"
                });
              });

            return;
          }

          if (response.data.msg == "进度查询成功") {
            let addlist = response.data.data.applyJobInfo;
         
            
            // Console.log(addlist +"78788787878")
            for (
              var pronum1 = 0;
              pronum1 <= response.data.data.productInfo.length - 1;
              pronum1++
            ) {
              //产品线
              for (
                var pronum = 0;
                pronum <= _this.productLine.length - 1;
                pronum++
              ) {
                if (
                  response.data.data.productInfo[pronum1].productLine ==
                  _this.productLine[pronum].value
                  
                ) {
                  response.data.data.productInfo[pronum1].productLine =
                    _this.productLine[pronum].lable;
                   
                }
               
              }
              _this.userdetali = response.data.data.applyJobGroupInfo;
         
              //故障描述
              for (let ids = 0; ids <= addlist.length - 1; ids++) {
                let datalsitwo = addlist[ids].deviceId.split(",");
                       
                for (let idsd = 0; idsd <= datalsitwo.length - 1; idsd++) {

                   
                  if (
                    datalsitwo[idsd].toLowerCase() ==
                    response.data.data.productInfo[
                      pronum1
                    ].deviceId.toLowerCase()
                  ) {
                    response.data.data.productInfo[pronum1].customerNo =
                      addlist[ids].faultDescribe;
                  }

                }
                
              }
            }
            _this.list = response.data.data.productInfo;
          
            _this.list1 = response.data.data.applyJobGroupInfo;
            _this.list2 = response.data.data.applyJobInfo;
            
          }
        })
        .catch(function(error) {});
    },
  
     //pdf  隐藏
    yinchang() {
      this.yulanShow = false;
      var body = document.body;
      body.style.position = "static";
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      );
      body.style.top = "";
      _this.pdfImg = "";
      _this.numPages = [];
    },
    toback() {
      this.$router.replace({
        path: "/orderlist"
      });
    },
    toyiyuan() {
      this.$router.replace({
        path: "/custser"
      });
    }
  }
};
</script>
<style scoped>
.maiList {
  padding: 0.1rem 0.28rem;
  margin: 0.16rem 0.35rem 0.5rem;
  width: 6.24rem;
  background: #fff;
}
.maiList .ac {
  border-bottom: 0.01rem #e5e5e5 solid;
}
.maiList .list {
  padding: 0.1rem 0;
}
.maiList .list li h3 {
  width: 6.24rem;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.32rem;
  color: #000;
}
.maiList .list li {
  min-height: 0.35rem;
}

.maiList .list li p {
  width: 6.24rem;
  /* height: 0.55rem; */
  line-height: 0.55rem;
  font-size: 0.28rem;
  color: #919191;
}

.ulac {
  border-top: 1px solid #e5e5e5;
}
.listdiv {
  margin-bottom: 0.2rem;
}
.listdiv h4 {
  width: 1.4rem;
  font-size: 0.28rem;
  font-weight: 300;
  /* display: inline-block;
  
  vertical-align: top; */
  float: left;
}
.maiList .list li .listdiv p {
  width: 4.8rem;
  font-size: 0.28rem;
  font-weight: 300;
  /* display: inline-block;
  vertical-align: top; */
  word-wrap: break-word;
  line-height: 0.38rem;
  overflow: hidden;
}
.malistlistme{
  display: inline-block;
    vertical-align: top;
}

.malistlistmeac{
      font-style: normal;
    width: 4.7rem;
    display: inline-block;
    vertical-align: top;
}
.chakanxiangqing {
  color: red;
  font-size: 0.3rem;
  line-height: 0.3rem;
  height: 0.3rem;
  background: aqua;
  display: inline-block;
  padding: 0.2rem;
  border-radius: 0.2rem;
  position: absolute;
  top: -.1rem;
  right: 0rem;
}

.malistlistme{
  display: inline-block;
    vertical-align: top;
}

.malistlistmeac{
      font-style: normal;
    width: 4.7rem;
    display: inline-block;
    vertical-align: top;
}

.model {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 7.5rem;
  height: 100%;
  z-index: 9999;
}
.bg_yanse {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
}

.slots_list {
  width: 7.5rem;
  background: #fff;
  text-align: center;
  position: fixed;
  bottom: 4rem;
  left: 0;
}
.slots_list h2 {
  font-size: 0.4rem;
  line-height: 1rem;
  height: 1rem;
  font-weight: 500;
}
.slots_list span {
  width: 1.5rem;
  height: 0.4rem;
  font-size: 0.3rem;
  position: absolute;
  top: 0.3rem;
  right: 0;
}

.demo_transform3 {
  animation: zhankai 0.3s ease-in both;
}
.demo_transform4 {
  animation: shouqi 0.3s ease-in both;
}

.picker-slot.picker-slot-right {
  text-align: center;
}

@keyframes shouqi {
  0% {
    transform: translate(0, 9rem);
  }
  100% {
    transform: translate(0, 4rem);
  }
}
@keyframes zhankai {
  0% {
    transform: translate(0, 9rem);
  }
  100% {
    transform: translate(0, 4rem);
  }
}

.isbtnac {
  pointer-events: none;
  background: #ccc;
}

.xiazaiwenjian {
  width: 1.7rem;
  position: fixed;
  top: 88.2%;
  left: 4.6%;
  font-size: 0.32rem;
  text-decoration: none;
  text-align: center;
  height: 0.42rem;
  line-height: 0.42rem;
  padding: 0.2rem;
  border: 1px solid;
  border-radius: 0.35rem;
  z-index: 100;
  background: #cce;
}
.xiazaiwenjian1 {
  right: 4.6%;
  left: initial;
}

.base64imgrotimg {
  position: absolute;
  z-index: -100;
  top: 0;
}

.yulanImng {
  position: fixed;
  top: -100rem;
  left: 0.15rem;
  height: 85%;
  width: 7.2rem;
  overflow: scroll;
  z-index: 100;
}

.yulanImngac {
  top: 7%;
}
/* 弹框 */

.maiList {
  padding: 0.1rem 0.28rem;
  margin: 0.16rem 0.35rem 0;
  width: 6.24rem;
  background: #fff;
}
.maiList .ac {
  border-bottom: 0.01rem #e5e5e5 solid;
}
.maiList .list {
  padding: 0.1rem 0;
}
.maiList .list li {
  min-height: 0.6rem;
  position: relative;
}
.maiList .list li h3 {
  width: 6.24rem;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.32rem;
  color: #000;
}
.maiList .list li p {
  width: 6.24rem;
  /* height: 0.55rem; */
  line-height: 0.55rem;
  font-size: 0.26rem;
  color: #919191;
}
.main li {
  width: 6.5rem;
  line-height: 1.16rem;
  position: relative;
  margin-bottom: 0.02em;
}
.main li p {
  height: 1.14rem;
  width: 6.5rem;
  color: #000;
  font-size: 0.32rem;
}
.main li i {
  position: absolute;
  top: 0.45rem;
  right: 0.35rem;
  width: 0.17rem;
  height: 0.28rem;
  background: url("../../assets/arrow_r.png") no-repeat;
  background-size: 100% 100%;
}

textarea {
  width: 5.8rem;
  height: 1.28rem;
  line-height: 0.32rem;
  font-size: 0.24rem;
  line-height: 0.32rem;
  color: #919191;
  margin-bottom: 0.3rem;
  overflow: hidden;
}
.hg {
  height: 1rem;
  width: 7.5rem;
}
.mt {
  margin-top: 0.5rem;
}
.ac1 {
  border-top: 1px #e5e5e5 solid;
}

.listdiv {
  margin-bottom: 0.2rem;
}
.listdiv h4 {
  width: 1.4rem;
  font-size: 0.28rem;
  font-weight: 300;
  /* display: inline-block;
  vertical-align: top; */
  float: left;
}
.maiList .list li .listdiv p {
  width: 4.8rem;
  font-size: 0.28rem;
  font-weight: 300;
  /* display: inline-block;
  vertical-align: top; */
  word-wrap: break-word;
  line-height: 0.38rem;
  overflow: hidden;
  height: auto;
}
.chakanxiangqing {
  color: red;
  font-size: 0.3rem;
  line-height: 0.3rem;
  height: 0.3rem;
  background: aqua;
  display: inline-block;
  padding: 0.2rem;
  border-radius: 0.2rem;
  position: absolute;
  top: -.1rem;
  right: 0rem;
}

.malistlistme{
  display: inline-block;
    vertical-align: top;
}

.malistlistmeac{
      font-style: normal;
    width: 4.7rem;
    display: inline-block;
    vertical-align: top;
}
</style>


<template>
  <div class="box">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">进度详情</p>
    </div>
    <div class="maiList">
      <ul class="list ac">
        <li>
          <h3>客户、产品基本信息</h3>
          <div
            class="chakanxiangqing"
            v-show="userdetali.status == 7 || userdetali.status == 6"
            @click="pdfIMg(userdetali.assignId)"
          >查看签字</div>
        </li>
        <li>
          <p><i class="malistlistme">医院名称：</i><em class="malistlistmeac">{{userdetali.customerName}}</em></p>
        </li>
        <li>
          <p>级别：{{userdetali.customerLevel}}</p>
        </li>
        <li>
          <p><i class="malistlistme">地址：</i><em class="malistlistmeac" style="    width: 5.1rem;">{{userdetali.address}}</em></p>
        </li>
        <li>
          <p>邮编：{{userdetali.zipCode}}</p>
        </li>
        <li>
          <p>使用科室：{{userdetali.useDepartment}}</p>
        </li>
       
        <li>
          <p>联系人：{{userdetali.contacts}}</p>
        </li>
         <li>
          <p>联系电话：{{userdetali.phone}}</p>
        </li>

        <!-- <li>
          <p>维修类别：保外</p>
        </li>-->

        <li>
          <p>约定时间：{{userdetali.appointmentDate == null ? "": userdetali.appointmentDate == "" ? "": userdetali.appointmentDate == undefined ? "": userdetali.appointmentDate.substring(0,10)}}</p>
        </li>
        <li>
          <p>到位时间：{{userdetali.achieveDate == null ?"待确定":userdetali.achieveDate == ""? "待确定": userdetali.achieveDate == undefined ? "待确定": userdetali.achieveDate.substring(0,10)}}</p>
        </li>
        <li>
          <h3>服务前产品信息</h3>
        </li>
      </ul>
      <div v-for="(listtext,listIndex) in list" :key="listIndex" :class="{ac1:listIndex!=0}">
        <ul class="list">
          <li>
            <p>工单号：{{userdetali.assignId}}</p>
          </li>
          <li>
            <p>序列号：{{listtext.deviceId}}</p>
          </li>
          <li>
            <p>产品名称：{{listtext.product}}</p>
          </li>

          <li>
            <p>产品线：{{listtext.productLine}}</p>
          </li>
          <li>
            <p>型&nbsp;&nbsp;号：{{listtext.model}}</p>
          </li>
          <li v-show="userdetali.applyType =='WX' ">
            <p>故障部件：{{listtext.product}}</p>
          </li>

          <li v-show="userdetali.applyType =='WX' ">
            <div class="listdiv">
              <h4>故障描述：</h4>
              <p>{{listtext.customerNo}}</p>
            </div>
          </li>

          <!-- <li>
            <div class="listdiv">
              <h4>服务内容：</h4>
              <p>{{listtext.serviceContent}}</p>
            </div>
          </li>-->
          <!-- <li>
            <p>产品状态：{{listtext.productNotes}}</p>
          </li>-->
        </ul>
      </div>
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
import { Toast, MessageBox, Indicator } from "mint-ui";
import Cookie from "../../api/cookie.js";

import baseUrl from "../../api/baseUrl.js";
import baseImgtu from "./pdf";
var _this;
export default {
  name: "position",
  data() {
    return {
      src1: "../../assets/code.png",
      userdetali: {},
      userdetali1: {},
      list: [],
      productLine: [],
      CUSTOMER_LEVEL: [],
      DEPARTMENT: [],
      yulanShow: false,
      pdfImg: ""
    };
  },
  components: {
    baseImgtu
  },
  created() {
    _this = this;
    // var id = "groupId=" + this.$route.query.listid;
    var id = { groupId: _this.$route.query.id};
 console.log(_this.$route.query.id)
    //设备号  翻译
    this.$Axios
      .post(
        baseUrl +
          "/dicCode/queryDicByMoreType?type=PRODUCT_LINE,CUSTOMER_LEVEL,DEPARTMENT"
      )
      .then(function(response) {
        //重复点击
        // _this.is_ajax = false;
        if (response.data.code == 200) {
          for (let numli = 0; numli <= response.data.data.length - 1; numli++) {
            if (response.data.data[numli].type == "PRODUCT_LINE") {
              _this.productLine.push(response.data.data[numli]);
            }

            if (response.data.data[numli].type == "CUSTOMER_LEVEL") {
              _this.CUSTOMER_LEVEL.push(response.data.data[numli]);
            }
            if (response.data.data[numli].type == "DEPARTMENT") {
              _this.DEPARTMENT.push(response.data.data[numli]);
            }
          }

          _this.producti(id);
        }
      })
      .catch(function(error) {});
  },
  methods: {
    //产品线类型
    producti(id) {
      Indicator.open({
        text: "加载中，请稍后",
        spinnerType: "fading-circle"
      });
      _this.$Axios
        .post(baseUrl + "/applyJob/queryScheduleInfo", id)
        .then(function(response) {
          Indicator.close();
          //重复点击
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
          // _this.is_ajax = false;
          if (response.data.code == 200) {
            _this.list1 = response.data.data.applyJobInfo[0];
            let addlist = response.data.data.applyJobInfo;
            for (
              var prolist4 = 0;
              prolist4 <= _this.DEPARTMENT.length - 1;
              prolist4++
            ) {
              if (
                response.data.data.applyJobGroupInfo.useDepartment ==
                _this.DEPARTMENT[prolist4].value
              ) {
                response.data.data.applyJobGroupInfo.useDepartment =
                  _this.DEPARTMENT[prolist4].lable;
              }
            }
            
            _this.userdetali = response.data.data.applyJobGroupInfo;

            for (
              var pronum1 = 0;
              pronum1 <= response.data.data.productInfo.length - 1;
              pronum1++
            ) {
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

              for (
                var pronum2 = 0;
                pronum2 <= _this.CUSTOMER_LEVEL.length - 1;
                pronum2++
              ) {
                if (
                  response.data.data.applyJobGroupInfo.customerLevel ==
                  _this.CUSTOMER_LEVEL[pronum2].value
                ) {
                  response.data.data.applyJobGroupInfo.customerLevel =
                    _this.CUSTOMER_LEVEL[pronum2].lable;
                }
              }

              for (
                var prolist4 = 0;
                prolist4 <= _this.DEPARTMENT.length - 1;
                prolist4++
              ) {
                if (
                  response.data.data.applyJobGroupInfo.department ==
                  _this.DEPARTMENT[prolist4].value
                ) {
                  response.data.data.applyJobGroupInfo.department =
                    _this.DEPARTMENT[prolist4].lable;
                }
              }

              //故障描述
              for (let ids = 0; ids <= addlist.length - 1; ids++) {
                let datalsitwo = addlist[ids].deviceId.split(",");

                for (let idsd = 0; idsd <= datalsitwo.length - 1; idsd++) {
                  if (
                    datalsitwo[idsd].toLowerCase()==
                    response.data.data.productInfo[pronum1].deviceId.toLowerCase()
                  ) {
                    response.data.data.productInfo[pronum1].customerNo =
                      addlist[ids].faultDescribe;
                  }
                }
              }
            }
            _this.list = response.data.data.productInfo;
          }
        })
        .catch(function(error) {
          Indicator.close();
        });
    },
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
.box {
  position: relative;
}
/* 弹框 */

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


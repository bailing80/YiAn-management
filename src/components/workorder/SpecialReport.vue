<template>
  <div class="box xiongmao007">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">专项服务报告单</p>
    </div>
    <heraderTab :listBtn="listBtn" @tabAc="showBTN"></heraderTab>
    <div
      class="main"
      v-show="showBtn==torIndex"
      v-for="(text,torIndex) in torepoteList"
      :key="torIndex"
    >
      <h3 @click="showhide(0)">
        一、服务事项
        <mt-badge type="error" size="small" v-show="Identification00"></mt-badge>
        <i></i>
      </h3>
      <ul :class="{hg_ac:hg_ac_bool == 'hg_ac00'}">
        <li>
          <p>服务需求单位/人</p>
          <input type="text" v-model="text.demand" />
          <i class="ac"></i>
        </li>
        <li>
          <p>申请人类型</p>
          <mt-radio v-model="text.applicantType" :options="['客户','非客户']" align="left"></mt-radio>
        </li>

        <li>
          <textarea placeholder="服务内容描述" maxlength="110" v-model="text.sDescribe"></textarea>
        </li>
        <li>
          <p>服务分类</p>
          <i class="ac"></i>
          <ol :class="{hg_ac:true}">
            <mt-radio
              v-model="text.classification"
              :options="['呼吸线','麻醉线','医疗系统','展会','验收','其它']"
              align="left"
            ></mt-radio>
            <li v-show="text.classification=='其它'">
              <input
                type="text"
                placeholder="请描述"
                style="left:0;text-align:left;width:6rem"
                v-model="text.QTFL"
              />
            </li>
          </ol>
        </li>

        <li @click="shouxie(1,torIndex)">
          <p>服务申请人签字</p>
          <img v-show="text.cImg" :src="text.cImg" alt class="magin_t" />
          <i class="ac"></i>
        </li>
        <li>
          <p>联系电话</p>
          <input type="text" v-model="text.aPhone" maxlength="11" />
          <i class="ac"></i>
        </li>
        <li @click="Selectiontime(torIndex,1,text.aTime)">
          <p>日期</p>
          <span>{{text.aTime}}</span>
          <i class="ac"></i>
        </li>

        <!-- <li @click="shouxie(0,torIndex)">
          <p>服务人员签名</p>
          <img v-show="text.sImg" :src="text.sImg" alt class="magin_t" />
          <i class="ac"></i>
        </li>-->
        <li>
          <p>服务地点</p>
          <input type="text" v-model="text.sAddres" />
          <i class="ac"></i>
        </li>
        <li @click="Selectiontime(torIndex,0,text.sTime)">
          <p>服务时间</p>
          <span>{{text.sTime}}</span>
          <i class="ac"></i>
        </li>
      </ul>

      <h3 @click="showhide(3)">
        二、联系我们
        <i></i>
      </h3>
      <ul :class="{hg_ac:hg_ac_bool == 'hg_ac03'}">
        <li class="rm_ac">
          <p class="mr">非常感谢您选择谊安的产品,希望我们的产品和服务能使您满意。如需帮助，请拨打客户服务专线。</p>
        </li>
        <li class="rm_ac">
          <u></u>
          <p class="hg">800-810-8333 &nbsp;&nbsp;&nbsp;&nbsp;400-610-8333</p>
        </li>
        <li class="rm_ac01">
          <u></u>
          <p class="hg">http://www.aeonmed.com</p>
        </li>
      </ul>
      <div class="sendbtn mt" :class="{isbtnac:text.isstatus}" @click="yulan(torIndex)">预览</div>
      <div class="sendbtn mt" :class="{isbtnac:text.isstatus}" @click="yulan(torIndex,'提交')">提交</div>
    </div>
    <!-- 选择时间 -->
    <TimeComponent :boosl="timebool" :datitme1="datitme" @cancelTime="cancelTime"></TimeComponent>

    <signature v-show="signatureShow" ref="Clear" @signatureFn="signatureImg"></signature>

    <div class="model" v-show="yulanShow">
      <div class="bg_yanse"></div>
      <baseImgtu class="yulanImng" :pdfimglist="pdfImg" :class="{yulanImngac:yulanShow}"></baseImgtu>
      <!-- <a :href="baseUrlxiazai+pdfImg" download class="xiazaiwenjian">- 点击下载</a> -->
      <div class="xiazaiwenjian xiazaiwenjian1" @click="yinchang">- 关闭预览</div>
    </div>

    <!-- 图片旋转  -->
    <base64roter :base64img="base64imgrot" @signatureFn11="base64IMg" class="base64imgrotimg"></base64roter>
    <!-- pdf显示 -->
  </div>
</template>

<script>
import baseImg from "../../api/BASEImg.js";
import { Toast, Indicator } from "mint-ui";
import Cookie from "../../api/cookie.js";
import baseImgtu from "./pdf";
import baseUrlxiazai from "../../api/baseUrlxiazai.js";

import signature from "./signature";
import baseUrl from "../../api/baseUrl.js";
import heraderTab from "./herderTba";

import base64roter from "./signatureImg";

import axios from "axios";

import pdf from "vue-pdf";

import TimeComponent from "./TimeComponent";

var _this;
var nowYear;
var nowMonth;
var nowDay;

export default {
  name: "maintain",
  data() {
    return {
     
      baseUrl: baseImg,
      baseUrlxiazai: baseUrlxiazai,
      base64imgrot: "",
      Identification00: false,
      hg_ac_bool: "hg_ac00",
      hg_ac_bool01: "hg_ac00",

      productLine: [],

      multiple: true,
      formDate: "",
      noneshow: false,
      yulanShow: false,
      pdfImg: "",
      numPages: [],

      listBtn: [],
      showBtn: 0,
      title: "",
      bool: false,
      signatureShow: false,

      numid: 0,
      numid1: 0,

      // dataVal1: new Date(),

      //选择时间
      timelist: 0,

      ispartsName: [], //提交过的数据
      CUSTOMER_LEVEL: [],

      // 选择时间  id    显示隐藏
      timebool: false,
      listid: 0, //list  数据  第一个产品线
      timeboolid: 0, //第几个的时间
      datitme: "",

      torepoteList: [
        // {
        //   userId: "",
        //   groupId: "",
        //   report: "安装",
        //   serviceNumber: "",
        //   productLine: "",
        //   demand: "", //服务需求单位/人
        //   applicantType: "", //申请人类型
        //   sImg: "", //服务人员
        //   sAddres: "", //服务地点
        //   sTime: "", //服务时间
        //   sDescribe: "", //服务内容描述
        //   classification: "", //服务分类
        //   // HX: "",//服务分类  呼吸线
        //   // MZ: "",//服务分类   麻醉线
        //   // YL: "",//服务分类  医疗系统
        //   // ZH: "",//服务分类  展会
        //   // YS: "",//服务分类 验收
        //   // QT: "",//服务分类  其它
        //   QTFL: "", //服务分类--其它的内容
        //   cImg: "", //服务申请人签名图片
        //   cTime: "", //客户签字日期
        //   cPhone: "" //服务申请联系电话
        // }
      ] //
    };
  },
  components: {
    signature,
    heraderTab,
    pdf,
    TimeComponent,
    baseImgtu,
    base64roter
  },
  created() {
    _this = this;
    // var id = "groupId=" + this.$route.query.listid;

    nowYear = new Date().getFullYear().toString();
    nowMonth = (new Date().getMonth() + 1).toString();
    nowDay = new Date().getDate().toString();
    _this.istosend();
  },
  methods: {
    istosend() {
      Indicator.open({
        text: "加载中，请稍后",
        spinnerType: "fading-circle"
      });

      var id = { groupId: _this.$route.query.id };

      _this.$Axios
        .post(baseUrl + "/reportType/getAll", {
          groupId: id.groupId,
          products: "专项"
        })
        .then(function(response) {
          if (response.data == "loginTimeout") {
            Indicator.close();
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

          if (response.data.code == 200) {
            _this.ispartsName = response.data.data.special;

            _this.$Axios
              .post(
                baseUrl +
                  "/dicCode/queryDicByMoreType?type=PRODUCT_LINE,CUSTOMER_LEVEL"
              )
              .then(function(response) {
                if (response.data.code == 200) {
                  for (let i = 0; i <= response.data.data.length - 1; i++) {
                    if (response.data.data[i].type == "PRODUCT_LINE") {
                      _this.productLine.push(response.data.data[i]);
                    }
                    if (response.data.data[i].type == "CUSTOMER_LEVEL") {
                      _this.CUSTOMER_LEVEL.push(response.data.data[i]);
                    }
                  }

                  _this.producti(id);
                }
              })
              .catch(function(error) {
                Indicator.close();
                Toast(error.error);
              });
          }
        })
        .catch(function() {
          Indicator.close();
        });
    },

    //点击签字
    shouxie(n, id) {
      if (n == 0) {
        this.$refs.Clear.clear();
        this.signatureShow = true;
      } else if (n == 1) {
        this.$refs.Clear.clear();
        this.signatureShow = true;
      }
      this.numid = n;
      this.numid1 = id;
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.cssText += "position:fixed;top:-" + scrollTop + "px;";
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
    //确定签字

    signatureImg(n) {
      if (n.sta == 0) {
        this.signatureShow = false;
      } else if (n.sta == 1) {
        if (this.numid == 0) {
          // this.torepoteList[this.numid1].sImg = n.img;
        } else if (this.numid == 1) {
          // this.torepoteList[this.numid1].cImg = n.img;
          this.base64imgrot = n.img;
        }
      }
      var body = document.body;
      body.style.position = "static";
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      );
      body.style.top = "";
      this.signatureShow = false;
    },
    base64IMg(n) {
      this.torepoteList[this.numid1].cImg = n.base64data;
      var body = document.body;
      body.style.position = "static";
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      );
      body.style.top = "";
    },

    //设置时间的  0
    timeAdd0(str) {
      if (str.length <= 1) {
        str = "0" + str;
      }
      return str;
    },
    //产品线类型
    producti(id) {
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
            _this.userdetali = response.data.data.applyJobGroupInfo;
            _this.userdetali1 =response.data.data.applyJobInfo;
      
            _this.userdetaliarray = response.data.data;

            let proLine = "";
            let isstatus = false;
            // let productLine2=response.data.data.applyJobInfo[0].productLine
            //遍历   list 数组
            for (
              var pronum1 = 0;
              pronum1 <= response.data.data.applyJobInfo.length - 1;
              pronum1++
            ) {
              //查询产品线
              for (
                var pronum2 = 0;
                pronum2 <= _this.productLine.length - 1;
                pronum2++
              ) {
                if (
                  response.data.data.applyJobInfo[pronum1].productLine ==
                  _this.productLine[pronum2].value
                ) {
                  proLine += _this.productLine[pronum2].lable;
                  _this.listBtn.push({
                    name: _this.productLine[pronum2].lable
                  });
                }
              }

              if (_this.ispartsName != "") {
                //是否提交过数据
                for (
                  var pronum4 = 0;
                  pronum4 <= _this.ispartsName.length - 1;
                  pronum4++
                ) {
                  if (proLine == _this.ispartsName[pronum4].partsName) {
                    isstatus = true;
                  }
                }
              }

              var data = {
                Cpid: response.data.data.applyJobGroupInfo.id, //
                staffId: response.data.data.applyJobGroupInfo.staffId, //员工id
                staffName: response.data.data.applyJobGroupInfo.staffName, //员工名称

                partsName: proLine, //产品线
                isstatus: isstatus, //是否提交过数据  true  =  提交过
                HospitalName: response.data.data.applyJobGroupInfo.customerName,
                userId: response.data.data.applyJobGroupInfo.staffId,
                groupId: response.data.data.applyJobGroupInfo.groupId,
                report: "专项",
                serviceNumber: response.data.data.applyJobGroupInfo.assignId,
                productModel: response.data.data.applyJobInfo[pronum1].model,
                productNumber:
                  response.data.data.applyJobInfo[pronum1].deviceId,
                applyType: response.data.data.applyJobGroupInfo.applyType,
                Call: response.data.data.applyJobGroupInfo.contacts,
                Contact: response.data.data.applyJobGroupInfo.phone,

                productLine:  response.data.data.applyJobInfo[0].productLine,
                
                demand: "", //服务需求单位/人
                applicantType: "", //申请人类型

                sImg: "", //服务人员
                sAddres: "", //服务地点
                sTime:
                  _this.timeAdd0(nowYear) +
                  "-" +
                  _this.timeAdd0(nowMonth) +
                  "-" +
                  _this.timeAdd0(nowDay), //服务时间
                sDescribe: "", //服务内容描述

                classification: "", //服务分类
                // HX: "",//服务分类  呼吸线
                // MZ: "",//服务分类   麻醉线
                // YL: "",//服务分类  医疗系统
                // ZH: "",//服务分类  展会
                // YS: "",//服务分类 验收
                // QT: "",//服务分类  其它
                QTFL: "", //服务分类--其它的内容

                cImg: "", //服务申请人签名图片
                aTime:
                  _this.timeAdd0(nowYear) +
                  "-" +
                  _this.timeAdd0(nowMonth) +
                  "-" +
                  _this.timeAdd0(nowDay), //客户签字日期
                aPhone: "" //服务申请联系电话
              };
          console.log( response.data.data.applyJobGroupInfo)
              //查询医院等级
              for (
                var pronum = 0;
                pronum <= _this.CUSTOMER_LEVEL.length - 1;
                pronum++
              ) {
                if (
                  response.data.data.applyJobGroupInfo.customerLevel ==
                  _this.CUSTOMER_LEVEL[pronum].value
                ) {
                  data.level = _this.CUSTOMER_LEVEL[pronum].lable;
                }
              }

              data.partsName = proLine;
              data.productLine = response.data.data.applyJobInfo[0].productLine,
           
       
              proLine = "";
              isstatus = false;
              // return;
              //整理所需要的数据
              _this.torepoteList.push(data);


              _this.noneshow = true;
            }
          }
        })
        .catch(function() {
          Indicator.close();
        });
    },
    showBTN(n) {
      this.showBtn = n.id;
    },

    toback() {
      this.$router.push({
        path: "/orderlist"
      });
    },
    showhide(n) {
      if (n == 0) {
        this.hg_ac_bool = "hg_ac00";
      } else if (n == 1) {
        this.hg_ac_bool = "hg_ac01";
      } else if (n == 2) {
        this.hg_ac_bool = "hg_ac02";
      } else if (n == 3) {
        this.hg_ac_bool = "hg_ac03";
      } else if (n == 4) {
        this.hg_ac_bool = "hg_ac04";
      } else if (n == 5) {
        this.hg_ac_bool = "hg_ac05";
      } else if (n == 6) {
        this.hg_ac_bool = "hg_ac06";
      }
    },

    yulan(n, submission) {
      var opj = this.torepoteList[n];

      this.Identification00 = false;
      if (opj.demand == "") {
        Toast("服务需求单位人数不能为空");
        this.Identification00 = true;
        return;
      }
      if (opj.applicantType == "") {
        Toast("申请人类型不能为空");
        this.Identification00 = true;
        return;
      }
      if (opj.sDescribe == "") {
        Toast("服务内容描述不能为空");
        this.Identification00 = true;
        return;
      }
      if (opj.classification == "") {
        Toast("服务分类不能为空");
        this.Identification00 = true;
        return;
      }
      if (opj.cImg == "") {
        Toast("申请人签名不能为空");
        this.Identification00 = true;
        return;
      }

      if (opj.aPhone == "") {
        Toast("申请人电话不能为空");
        this.Identification00 = true;
        return;
      }
      // if (opj.sImg == "") {
      //   Toast("服务人员签名不能为空");
      //   this.Identification00 = true;
      //   return;
      // }
      if (opj.sAddres == "") {
        Toast("服务地点不能为空");
        this.Identification00 = true;
        return;
      }
      if (opj.sTime == "") {
        Toast("服务时间不能为空");
        this.Identification00 = true;
        return;
      }

      // if(opj.cImg == ''){
      //   Toast('服务申请人不能为空')
      //   return;
      // }

      var data = {
        staffId: opj.staffId, //员工id
        userId: opj.userId,
        groupId: opj.groupId,
        report: "专项",
        serviceNumber: opj.serviceNumber,
        productLine: opj.productLine,
        demand: opj.demand, //服务需求单位/人

        // applicantType:"",//
        customer: "□", //客户
        nCustomer: "□", //非客户
        // classification: "", //服务分类
        HX: "□", //服务分类  呼吸线
        MZ: "□", //服务分类   麻醉线
        YL: "□", //服务分类  医疗系统
        ZH: "□", //服务分类  展会
        YS: "□", //服务分类 验收
        QT: "□", //服务分类  其它
        QTFL: opj.QTFL, //服务分类--其它的内容

        sImg: "", //服务人员
        sAddres: opj.sAddres, //服务地点
        sTime: opj.sTime, //服务时间
        sDescribe: opj.sDescribe, //服务内容描述

        cImg: "", //服务申请人签名图片
        aTime: opj.aTime, //客户签字日期
        aPhone: opj.aPhone //服务申请联系电话
      };
      data.sImg = opj.sImg.replace("data:image/png;base64,", "");
      data.cImg = opj.cImg.replace("data:image/png;base64,", "");

      if (opj.applicantType == "客户") {
        data.customer = "■";
      } else if (opj.applicantType == "非客户") {
        data.nCustomer = "■";
      }

      if (opj.classification == "呼吸线") {
        data.HX = "■";
      } else if (opj.classification == "麻醉线") {
        data.MZ = "■";
      } else if (opj.classification == "医疗系统") {
        data.YL = "■";
      } else if (opj.classification == "展会") {
        data.ZH = "■";
      } else if (opj.classification == "验收") {
        data.YS = "■";
      } else if (opj.classification == "其它") {
        data.QT = "■";
      }

      if(data.QT != '■'){
        data.QTFL = '';
        opj.QTFL = '';
      }

      // _this.subPicForm(data, submission, n);
      _this.isAjax(data, submission, n);
    },
    tijiao(n) {
      var opj = this.torepoteList[n];
      var data = {
        id: opj.Cpid, //id
        staffId: opj.staffId, //员工id
        installOne: opj.staffName, //员工名称
        partsName: opj.partsName, //产品线

        userId: opj.userId,
        groupId: opj.groupId,
        serviceNumber: opj.serviceNumber,
        productLine: opj.productLine,
        demand: opj.demand, //服务需求单位/人

        applicantType: opj.applicantType,

        // customer: "false", //客户
        // nCustomer: "false", //非客户
        // classification: "", //服务分类
        hX: "false", //服务分类  呼吸线
        mZ: "false", //服务分类   麻醉线
        yL: "false", //服务分类  医疗系统
        zH: "false", //服务分类  展会
        yS: "false", //服务分类 验收
        qT: "false", //服务分类  其它
        qTFL: opj.QTFL, //服务分类--其它的内容

        sImg: "", //服务人员
        sAddres: opj.sAddres, //服务地点
        sTime: opj.sTime, //服务时间
        sDescribe: opj.sDescribe, //服务内容描述

        cImg: "", //服务申请人签名图片
        cTime: opj.aTime, //客户签字日期
        cPhone: opj.aPhone //服务申请联系电话
      };
      data.sImg = opj.sImg.replace("data:image/png;base64,", "");
      data.cImg = opj.cImg.replace("data:image/png;base64,", "");

      if (opj.classification == "呼吸线") {
        data.HX = "true";
      } else if (opj.classification == "麻醉线") {
        data.MZ = "true";
      } else if (opj.classification == "医疗系统") {
        data.YL = "true";
      } else if (opj.classification == "展会") {
        data.ZH = "true";
      } else if (opj.classification == "验收") {
        data.YS = "true";
      } else if (opj.classification == "其它") {
        data.QT = "true";
      }
      //提交
      Indicator.open({
        text: "数据提交中，请稍后",
        spinnerType: "fading-circle"
      });

      this.$Axios
        .post(baseUrl + "/reportType/insertSpecialData", data)
        .then(function(response) {
          //重复点击
          // _this.is_ajax = false;
          if (response.data == "loginTimeout") {
            Indicator.close();
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

          if (response.data.code == 200) {
            _this.torepoteList[n].isstatus = true;

            let issubmitsend = true;
            for (
              let issubmit = 0;
              issubmit <= _this.torepoteList.length - 1;
              issubmit++
            ) {
              if (issubmit > 4) {
                return;
              }
              if (_this.torepoteList[issubmit].isstatus == false) {
                issubmitsend = false;
              }
            }
            //是否  提交工单    添加产品档案
            if (issubmitsend) {
              _this.Monitoringoperation("完成工单");
              _this.productArchives(data);
            } else {
              _this.Monitoringoperation("工单签字");
              _this.$message.success("还有未签字报修产品线");
              Indicator.close();
            }
          }
        })
        .catch(function() {
          Indicator.close();
        });
    },

    //产品档案
    productArchives(data) {
      let Matchingdata = [];
      let Archivesdata = {};
      let laver = "";
      //  循环  最外面一层数据
      for (
        let Archives = 0;
        Archives <= _this.torepoteList.length - 1;
        Archives++
      ) {
        //超过4条  不执行
        if (Archives > 4) {
          return;
        }
        //  根据设备号进行循环
        // str.indexOf("3") != -1
        let listarray = _this.torepoteList[Archives].productNumber.split(","); //设备号
        let modelarray = _this.torepoteList[Archives].productModel.split(","); //机型

        // return
        //遍历设备号
        for (
          let productNumber = 0;
          productNumber <= listarray.length - 1;
          productNumber++
        ) {
          //匹配医院等级
          for (
            let levelnum = 0;
            levelnum <= _this.CUSTOMER_LEVEL.length - 1;
            levelnum++
          ) {
            if (
              _this.torepoteList[Archives].level ==
              _this.CUSTOMER_LEVEL[levelnum].lable
            ) {
              laver = _this.CUSTOMER_LEVEL[levelnum].value;
            }
          }

          Archivesdata = {
            customerId: _this.userdetaliarray.applyJobGroupInfo.customerId, //客户id
            customerCode: _this.userdetaliarray.applyJobGroupInfo.customerCode, //客户编码
            province: _this.userdetaliarray.applyJobGroupInfo.province, //省份，字典表
            productLine: _this.userdetali1[0].productLine, //产品线，字典表
            model: modelarray[productNumber], //产品型号
            installTime: _this.userdetaliarray.productInfo.installDate, //安装日期
            customer: _this.torepoteList[Archives].HospitalName, //客户
            productName: "", //产品名称
            productLevel: laver, //级别
            contacts: _this.torepoteList[Archives].Call, //联系人
            phone: _this.torepoteList[Archives].Contact, //联系方式
            dispatchingOrder: _this.torepoteList[Archives].serviceNumber, //派工单号   ★★★★★
            deviceId: listarray[productNumber], //序列号（设备号）
            installOne: _this.userdetaliarray.applyJobGroupInfo.staffName, //安装人员
          //  note:_this.userdetaliarray.applyJobGroupInfo.serviceContent,//服务内容
            department: "", //科室
            applyType: _this.torepoteList[Archives].applyType, //申请类型，字典表
            warrantyEndDate:
              _this.userdetaliarray.productInfo.guaranteeBeginDate, //保修结束日期
            warrantyStartDate:
              _this.userdetaliarray.productInfo.guaranteeEndDate, //保修开始日期
            note:_this.userdetaliarray.applyJobGroupInfo.serviceContent, //备注              %%%%%
            city: _this.userdetaliarray.applyJobGroupInfo.city //城市，字典表         %%%%%
          };
          Matchingdata.push(Archivesdata);
        }
       
      }

      for (let matching = 0; matching <= Matchingdata.length - 1; matching++) {
        for (
          let match = 0;
          match <= _this.userdetaliarray.productInfo.length - 1;
          match++
        ) {
          if (
            Matchingdata[matching].deviceId ==
            _this.userdetaliarray.productInfo[match].deviceId
          ) {
            if (
              _this.userdetaliarray.productInfo[match].installDateStart == null
            ) {
              _this.userdetaliarray.productInfo[match].installDateStart = "";
            }

            Matchingdata[matching].productLine =
              _this.userdetaliarray.productInfo[match].productLine;

            Matchingdata[matching].installTime =
              _this.userdetaliarray.productInfo[match].installDateStart; //安装日期
            Matchingdata[matching].productName =
              _this.userdetaliarray.productInfo[match].product;
            Matchingdata[matching].installOne =
              _this.userdetaliarray.applyJobGroupInfo.staffName;
            Matchingdata[matching].department =
              _this.userdetaliarray.applyJobGroupInfo.department;
            Matchingdata[matching].warrantyEndDate =
              _this.userdetaliarray.productInfo[match].guaranteeBeginDate;
            Matchingdata[matching].warrantyStartDate =
              _this.userdetaliarray.productInfo[match].guaranteeEndDate;
          }
        }
      }

      _this.$Axios
        .post(baseUrl + "/productArchives/insertProductArchives", Matchingdata)
        .then(function(response) {
          if (response.data == "loginTimeout") {
            Indicator.close();
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

          if (response.data.code == 200) {
            _this.workorder(data);
          }
        })
        .catch(function() {
          Indicator.close();
        });
    },

    //work order   改变工单  状态
    workorder(data) {
      // _this.is_ajax = false;
      let complete = {
        id: data.id,
        staffId: data.staffId,
        staffName: data.staffName,
        status: 6,
        applyType: "ZX"
      };

      _this.$Axios
        .post(baseUrl + "/applyJob/updApplyJobInfo", complete)
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
          if (response.data.code == 200) {
            Toast({
              message: "签字提交成功",
              duration: 1000
            });
            // localStorage.signature = JSON.stringify(demolist);
            _this.$router.push({
              path: "/orderlist"
            });
          }
        })
        .catch(function() {
          Indicator.close();
        });
    },
    //操作流程 监控
    Monitoringoperation(issta) {
      let url = baseUrl + "/applyJob/addApplyRecord";
      let pagt = {
        groupId: _this.$route.query.id, //添加派工单历史记录   必填
        name: _this.$store.state.repairorder.repaiName, //操作人姓名   姓名
        type: "员工", //操作人类型   员工   还是管理员
        operation: "", //具体操作  审核  ，  撤销 ，  通过    派单
        operationRemarks: "", //操作备注
        examine: "", //审核是否通过
        examineRemarks: "" //审核备注
      };

      if (issta == "工单签字") {
        pagt.operation = "专项签字模板";
        pagt.examineRemarks = "签字成功";
      } else if (issta == "完成工单") {
        pagt.operation = "专项签字模板";
        pagt.examineRemarks = "成功完成工单";
      }

      _this.$Axios
        .post(url, pagt)
        .then(function(response) {
        })
        .catch(function() {});
    },

    //文件上传 --------------------------------------------------
    uploadFile(file) {
      this.formDate.append("file", file.file);
    },
    //提交图片  视频
    subPicForm(data, submission, id) {
      this.formDate = new FormData();
      _this.$refs.upload.submit();

      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      if (this.formDate.get("file") == null) {
        Toast("请附带上一张现场图片");
        return;
      }

      // return;
      axios
        .post(baseUrl + "/upload/image", this.formDate, config)
        .then(res => {
          if (res.data.code == 200) {
            _this.isAjax(data, submission, id);
          }
        })
        .catch(() => {});
    },
    //文件上传 --------------------------------------------------

    isAjax(data, submission, id) {
      Indicator.open({
        text: "数据生成中，请稍后",
        spinnerType: "fading-circle"
      });

      this.$Axios
        .post(baseUrl + "/reportType/preview", data)
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
            if (submission == "提交") {
              _this
                .$confirm("提交后不能修改，确定提交吗？", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                .then(() => {
                  _this.tijiao(id);
                })
                .catch(() => {
                  _this.$message({
                    type: "info",
                    message: "已取消"
                  });
                });
            } else {
              //签字 pdf
              _this.pdfImg = '';
              _this.pdfImg = "/" + response.data.data;

              _this.yulanShow = true;

              var scrollTop =
                document.body.scrollTop || document.documentElement.scrollTop;
              document.body.style.cssText +=
                "position:fixed;top:-" + scrollTop + "px;";
            }
          }
        })
        .catch(function() {
          Indicator.close();
        });
    },

    //弹框
    onValuesChange(picker, values) {
      this.values = values[0] + "-" + values[1] + "-" + values[2];
    },
    xuanzhe(n) {
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.cssText += "position:fixed;top:-" + scrollTop + "px;";
      this.timelist = n;
      this.bool = !this.bool;
    },

    quxiao() {
      this.bool = !this.bool;
      var body = document.body;
      body.style.position = "static";
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      );
      body.style.top = "";
    },
    dateClick1() {
      this.$refs.picker1.open();
    },
    parserDate(date) {
      var t = Date.parse(date);
      if (!isNaN(t)) {
        return new Date(Date.parse(date.replace(/-/g, "/")));
      }
    },
    //选择时间方法   组件方法
    Selectiontime(listid, id, startTime) {
      this.datitme = startTime;
      this.timebool = true; //显示隐藏  时间
      this.listid = listid;
      this.timeboolid = id;
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.cssText += "position:fixed;top:-" + scrollTop + "px;";
    },

    cancelTime(data) {
      if (data.name == "取消") {
        this.timebool = false;
      } else if (data.name == "确定") {
        if (this.timeboolid == 0) {
          if (
            new Date(this.torepoteList[this.listid].aTime).getTime() <=
            new Date(data.time).getTime()
          ) {
            this.torepoteList[this.listid].sTime = data.time;
          } else {
            this.$message.error("请选择与客户相同或之后的时间");
          }
        } else if (this.timeboolid == 1) {
          this.torepoteList[this.listid].aTime = data.time;
        }
        this.timebool = false;
      }

      var body = document.body;
      body.style.position = "static";
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      );
      body.style.top = "";
    },

    queding() {
      this.torepoteList[this.timelist].sTime = this.values;

      var body = document.body;
      body.style.position = "static";
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      );
      body.style.top = "";

      this.bool = !this.bool;
    },

    //弹框
    showhide01(n) {
      if (n == 0) {
        this.hg_ac_bool01 = "hg_ac00";
      } else if (n == 1) {
        this.hg_ac_bool01 = "hg_ac01";
      } else if (n == 2) {
        this.hg_ac_bool01 = "hg_ac02";
      } else if (n == 3) {
        this.hg_ac_bool01 = "hg_ac03";
      } else if (n == 4) {
        this.hg_ac_bool01 = "hg_ac04";
      } else if (n == 5) {
        this.hg_ac_bool01 = "hg_ac05";
      } else if (n == 6) {
        this.hg_ac_bool01 = "hg_ac06";
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    var body = document.body;
    body.style.position = "static";
    var top = body.style.top;
    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
      top
    );
    body.style.top = "";

    this.signatureShow = false;
    next();
  }
};
</script>
<style>
.xiongmao007 .mint-badge.is-size-small {
  border-radius: 0.25rem;
  line-height: 0.35rem;
  height: 0.35rem;
  font-size: 0.28rem;
  float: right;
  margin: 0.28rem 0.6rem;
}
.xiongmao007 .mint-checkbox-input:checked + .mint-checkbox-core {
  background-color: #998bd6;
  border-color: #998bd6;
}

.xiongmao007 .mint-checklist .mint-cell .mint-checkbox-label {
  font-size: 0.26rem;
}
.xiongmao007 .mint-checklist .mint-cell .mint-checkbox-core {
  width: 0.3rem;
  height: 0.3rem;
}
.xiongmao007 .mint-checkbox-core::after {
  top: 0.7px;
  left: 4.2px;
}

.xiongmao007 .mint-radio-input:checked + .mint-radio-core {
  background-color: #998bd6;
  border-color: #998bd6;
}
.xiongmao007 .mint-radio-core {
  width: 13.5px;
  height: 13.9px;
}
.xiongmao007 .mint-radio-core::after {
  top: 3px;
  left: 3px;
  width: 6px;
  height: 6px;
}
.xiongmao007 .mint-radio-label {
  font-size: 0.26rem;
}

.xiongmao007 .mint-radio-input:checked + .mint-radio-core:after {
  transform: scale(0) !important;
}
.xiongmao007 .el-message-box {
  width: 5rem;
}
</style>

<style scoped>
.box {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}

/* 弹框 */

.model {
  position: fixed;
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
/* 弹框 */

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
  height: 0;
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
.main li input {
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
  overflow: hidden;
}
.main li em {
  display: inline-block;
  vertical-align: top;
  font-style: normal;
  line-height: 0.89rem;
  height: 0.89rem;
  font-size: 0.24rem;
}
.main li p {
  height: 0.89rem;
  color: #323232;
  font-size: 0.28rem;
}
.main li .p_ac {
  height: auto;
  line-height: 0.44rem;
  font-size: 0.26rem;
  color: #919191;
  padding: 0.2rem 0;
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
  height: 1.6rem;
  width: 6.8rem;
  color: #323232;
  font-size: 0.28rem;
  padding: 0.3rem 0;
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

.main li ol li {
  height: 0.89rem;
  color: #323232;
  font-size: 0.28rem;
  width: 6.4rem;
  margin: 0 0.54rem;
  position: relative;
}

.main li ol {
  height: 0;
}

.mt {
  margin: 0.8rem 0 1rem 0.35rem;
  width: 3.2rem;
  display: inline-block;
  vertical-align: top;
}

.main .hg_ac {
  height: auto;
}

.magin_t {
  width: 3.5rem;
  height: 5rem;
  margin-bottom: 0.4rem;
  /* transform: rotate(-90deg); */
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
.yulanImng::-webkit-scrollbar {
  -webkit-overflow-scrolling: touch;
}

.yulanImng img {
  height: 14rem;
  width: 12rem;
}

.yulanImng .miaos {
  position: absolute;
  bottom: -1.9rem;
  left: 4.9rem;
  font-size: 0.38rem;
  color: #998bd6;
}
.yulanImngac {
  top: 7%;
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
  width: 7.5rem;
}
</style>


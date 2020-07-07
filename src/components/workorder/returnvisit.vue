<template>
  <div class="box daxiong" style="position: relative;">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">上门回访维护记录单-{{tabpage}}</p>
    </div>
    <heraderTab :listBtn="listBtn" @tabAc="showBTN"></heraderTab>
    <Anesthesiamachine
      v-show="tabpage == '麻醉机'"
      v-if="publicdata"
      :publicdata="publicdata"
      :anesthesia="anesthesia"
      :department="DEPARTMENT"
      @change="shouxie"
    ></Anesthesiamachine>
    <!--麻醉机-->
    <Breathingmachine
      v-show="tabpage == '呼吸机'"
      v-if="publicdata1"
      :publicdata="publicdata1"
      :breathing="breathing"
      :department="DEPARTMENT"
      @change="shouxie"
    ></Breathingmachine>
    <!--呼吸机-->
    <Surgicalbed
      v-show="tabpage == '手术床'"
      v-if="publicdata2"
      :publicdata="publicdata2"
      :surgical="surgical"
      :department="DEPARTMENT"
      @change="shouxie"
    ></Surgicalbed>
    <Astrallamp
      v-show="tabpage == '无影灯'"
      v-if="publicdata3"
      :publicdata="publicdata3"
      :astrallamp="astrallamp"
      :department="DEPARTMENT"
      @change="shouxie"
    ></Astrallamp>

    <Towerbridge
      v-show="tabpage == '塔桥'"
      v-if="publicdata4"
      :publicdata="publicdata4"
      :Bridge="Bridge"
      :department="DEPARTMENT"
      @change="shouxie"
    ></Towerbridge>

    <signature v-show="signatureShow" ref="Clear" @signatureFn="signatureImg"></signature>

    <!-- 图片旋转  -->
    <base64roter :base64img="base64imgrot" @signatureFn11="base64IMg" class="base64imgrotimg"></base64roter>
    <!-- pdf显示 -->
  </div>
</template>
<script>
import heraderTab from "./herderTba"; //tab  头部
import Anesthesiamachine from "./Anesthesiamachine"; //回访 - 麻醉机
import Breathingmachine from "./Breathingmachine"; //回访 - 呼吸机
import Surgicalbed from "./Surgicalbed"; //回访 - 手术床
import Astrallamp from "./Astrallamp"; //回访 - 无影灯
import Towerbridge from "./Towerbridge"; //回访 - 无影灯

import base64roter from "./signatureImg";

import signature from "./signature";

import baseUrl from "../../api/baseUrl.js";
import baseImg from "../../api/BASEImg.js";
import axios from "axios";
import { Toast, MessageBox, Indicator } from "mint-ui";
import Cookie from "../../api/cookie.js";
import { constants } from "crypto";

var _this;
export default {
  name: "returnvisit",
  data() {
    return {
      basetuImg: "",
      listBtn: [],
      base64imgrot: "", //旋转图片

      arrayList: {}, //所有数据
      productLine: [], //产品线
      DEPARTMENT: [], //科室
      CUSTOMER_LEVEL: [],

      userdetali: {},
      userdetaliarray: [],

      anesthesia: {
        sImg: "",
        cImg: ""
      },

      breathing: {
        sImg: "",
        cImg: ""
      },
      surgical: {
        sImg: "",
        cImg: ""
      },

      astrallamp: {
        sImg: "",
        cImg: ""
      },
      //塔桥
      Bridge: {
        sImg: "",
        cImg: ""
      },

      signatureShow: false,
      tpyename: "",
      //麻醉机
      publicdata: {
        Cpid: "",
        staffId: "",
        staffName: "",
        userId: "",
        groupId: "",
        customerId: "",
        serviceNumber: "",
        HospitalName: "",
        useDepartment: "",
        model: "",
        deviceId: "",
        installDate: "",
        isstatus: false,
        isstatus1: 0,

        province: "",
        productLine: "",
        department: "",
        productname: "",
        customerLevel: "",
        contacts: "",
        phone: "",
        assignId: "",
        city: ""
      },
      //呼吸机
      publicdata1: {
        Cpid: "",
        staffId: "",
        staffName: "",
        userId: "",
        groupId: "",
        customerId: "",
        serviceNumber: "",
        HospitalName: "",
        useDepartment: "",
        model: "",
        deviceId: "",
        installDate: "",
        isstatus: false,
        isstatus1: 0,

        province: "",
        productLine: "",
        department: "",
        productname: "",
        customerLevel: "",
        contacts: "",
        phone: "",
        assignId: "",
        city: ""
      },
      //手术床
      publicdata2: {
        Cpid: "",
        staffId: "",
        staffName: "",
        userId: "",
        groupId: "",
        customerId: "",
        serviceNumber: "",
        HospitalName: "",
        useDepartment: "",
        model: "",
        deviceId: "",
        installDate: "",
        isstatus: false,
        isstatus1: 0,

        province: "",
        productLine: "",
        department: "",
        productname: "",
        customerLevel: "",
        contacts: "",
        phone: "",
        assignId: "",
        city: ""
      },
      //无影灯
      publicdata3: {
        Cpid: "",
        staffId: "",
        staffName: "",
        userId: "",
        groupId: "",
        customerId: "",
        serviceNumber: "",
        HospitalName: "",
        useDepartment: "",
        model: "",
        deviceId: "",
        installDate: "",
        isstatus: false,
        isstatus1: 0,

        province: "",
        productLine: "",
        department: "",
        productname: "",
        customerLevel: "",
        contacts: "",
        phone: "",
        assignId: "",
        city: ""
      },

      //塔桥
      publicdata4: {
        Cpid: "",
        staffId: "",
        staffName: "",
        userId: "",
        groupId: "",

        customerId: "",
        serviceNumber: "",
        HospitalName: "",
        useDepartment: "",
        productModel: "",
        machineNumber: "",
        installTime: "",
        totalTime: "",
        mFrequency: "",
        mDepartment: "",
        isstatus: false,
        isstatus1: 0,

        province: "",
        productLine: "",
        department: "",
        productname: "",
        customerLevel: "",
        contacts: "",
        phone: "",
        assignId: "",
        city: ""
      },

      showBtn: 0, //显示tab  页
      tabpage: "",
      numid: "",
      isfalse: true //是否可以提交了
    };
  },
  components: {
    heraderTab,
    Anesthesiamachine,
    Breathingmachine,
    Surgicalbed,
    Astrallamp,
    signature, //签字模板
    base64roter,
    Towerbridge
  },
  created() {
    _this = this;
    var id = { groupId: _this.$route.query.id };
    _this.$Axios
      .post(
        baseUrl +
          "/dicCode/queryDicByMoreType?type=CUSTOMER_LEVEL,PRODUCT_LINE,DEPARTMENT"
      )
      .then(function(response) {
        if (response.data.code == 200) {
          for (let i = 0; i <= response.data.data.length - 1; i++) {
            if (response.data.data[i].type == "CUSTOMER_LEVEL") {
              _this.CUSTOMER_LEVEL.push(response.data.data[i]);
            }
            if (response.data.data[i].type == "PRODUCT_LINE") {
              _this.productLine.push(response.data.data[i]);
            }
            if (response.data.data[i].type == "DEPARTMENT") {
              _this.DEPARTMENT.push(response.data.data[i]);
            }
          }
          _this.Ajaxlist(id);
        }
      })
      .catch(function(error) {});
  },
  methods: {
    Ajaxlist(id) {
      Indicator.open({
        text: "加载中，请稍后",
        spinnerType: "fading-circle"
      });

      _this.$Axios
        .post(baseUrl + "/applyJob/queryScheduleInfo", id)
        .then(function(response) {
          //重复点击
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
          // _this.is_ajax = false;
          if (response.data.code == 200) {
            _this.arrayList = response.data.data;
            let proLine = "";
            for (
              let num = 0;
              num <= _this.arrayList.applyJobInfo.length - 1;
              num++
            ) {
              if (_this.arrayList.applyJobInfo[num].productLine == "mz") {
                proLine += "麻醉机,";
              }
              if (_this.arrayList.applyJobInfo[num].productLine == "hx") {
                proLine += "呼吸机,";
              }
              if (_this.arrayList.applyJobInfo[num].productLine == "ssc") {
                proLine += "手术床,";
              }
              if (_this.arrayList.applyJobInfo[num].productLine == "wyd") {
                proLine += "无影灯,";
              }
              if (_this.arrayList.applyJobInfo[num].productLine == "ta") {
                proLine += "塔桥,";
              }
              // if (_this.arrayList.applyJobInfo[num].productLine == "ta") {
              //   proLine += "塔桥,";
              // }
            }
            //删除最后一个字符   ，
            proLine =
              proLine.slice(proLine.length - 1) === ","
                ? proLine.slice(0, -1)
                : proLine;
            _this.istijiao(id, proLine);
          }
        })
        .catch(function(error) {
          Indicator.close();
        });
    },
    istijiao(id, proLine) {
      _this.$Axios
        .post(baseUrl + "/reportType/getAll", {
          groupId: id.groupId,
          products: proLine
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
            _this.typedatalist = response.data.data;
            _this.bianlishu(response.data.data);
          }
        })
        .catch(function(error) {
          Indicator.close();
        });
    },

    bianlishu(data) {
      for (let num = 0; num <= _this.arrayList.applyJobInfo.length - 1; num++) {
        //使用科室
        for (let keshi = 0; keshi <= _this.DEPARTMENT.length - 1; keshi++) {
          if (
            _this.arrayList.applyJobGroupInfo.useDepartment ==
            _this.DEPARTMENT[keshi].value
          ) {
            _this.arrayList.applyJobGroupInfo.useDepartment =
              _this.DEPARTMENT[keshi].lable;
          }
        }
        
        if (
          _this.arrayList.productInfo[0].installDate != null ||
          _this.arrayList.productInfo[0].installDate != "" ||
          _this.arrayList.productInfo[0].installDate != undefined
        ) {
          _this.arrayList.productInfo[0].installDate = _this.arrayList.productInfo[0].installDate.substr(
            0,
            10
          );
        }

        if (_this.arrayList.applyJobInfo[num].productLine == "mz") {
          _this.publicdata.Cpid = _this.arrayList.applyJobGroupInfo.id;
          _this.publicdata.staffId = _this.arrayList.applyJobGroupInfo.staffId;
          _this.publicdata.staffName =
            _this.arrayList.applyJobGroupInfo.staffName;
          _this.publicdata.customerId =
            _this.arrayList.applyJobGroupInfo.customerId;

          _this.publicdata.province =
            _this.arrayList.applyJobGroupInfo.province; //省份
          _this.publicdata.productLine =
            _this.arrayList.applyJobInfo[num].productLine; //产品线
          _this.publicdata.department =
            _this.arrayList.applyJobInfo[num].department; //产品线
          _this.publicdata.productname = _this.arrayList.productInfo; //产品名称
          _this.publicdata.customerLevel =
            _this.arrayList.applyJobGroupInfo.customerLevel; //医院级别
          _this.publicdata.contacts =
            _this.arrayList.applyJobGroupInfo.contacts; //联系人
          _this.publicdata.phone = _this.arrayList.applyJobGroupInfo.phone; //联系人电话
          _this.publicdata.assignId =
            _this.arrayList.applyJobGroupInfo.assignId; //派工单号
          _this.publicdata.city = _this.arrayList.applyJobGroupInfo.city; //城市

          _this.publicdata.userId = _this.arrayList.applyJobGroupInfo.staffId;
          _this.publicdata.groupId = _this.arrayList.applyJobGroupInfo.groupId;
          _this.publicdata.serviceNumber =
            _this.arrayList.applyJobGroupInfo.assignId;
          _this.publicdata.HospitalName =
            _this.arrayList.applyJobGroupInfo.customerName;
          _this.publicdata.useDepartment =
            _this.arrayList.productInfo[0].useDepartment;

          _this.publicdata.model = _this.arrayList.applyJobInfo[num].model;
          _this.publicdata.deviceId =
            _this.arrayList.applyJobInfo[num].deviceId;
          _this.publicdata.installDate =
            _this.arrayList.productInfo[0].installDate;

          if (data.anesthetic && data.anesthetic != null) {
            _this.publicdata.isstatus = true;
          } else {
            _this.publicdata.isstatus = false;
          }
          if (data.anesthetic) {
            _this.publicdata.isstatus1 = 1;
          } else {
            _this.publicdata.isstatus1 = 2;
          }

          _this.listBtn.push({ name: "麻醉机" });
        }
        if (_this.arrayList.applyJobInfo[num].productLine == "hx") {
          _this.publicdata1.Cpid = _this.arrayList.applyJobGroupInfo.id;
          _this.publicdata1.staffId = _this.arrayList.applyJobGroupInfo.staffId;
          _this.publicdata1.staffName =
            _this.arrayList.applyJobGroupInfo.staffName;
          _this.publicdata1.customerId =
            _this.arrayList.applyJobGroupInfo.customerId;

          _this.publicdata1.province =
            _this.arrayList.applyJobGroupInfo.province; //省份
          _this.publicdata1.productLine =
            _this.arrayList.applyJobInfo[num].productLine; //产品线
          _this.publicdata1.department =
            _this.arrayList.applyJobInfo[num].department; //产品线
          _this.publicdata1.productname = _this.arrayList.productInfo; //产品名称
          _this.publicdata1.customerLevel =
            _this.arrayList.applyJobGroupInfo.customerLevel; //医院级别
          _this.publicdata1.contacts =
            _this.arrayList.applyJobGroupInfo.contacts; //联系人
          _this.publicdata1.phone = _this.arrayList.applyJobGroupInfo.phone; //联系人电话
          _this.publicdata1.assignId =
            _this.arrayList.applyJobGroupInfo.assignId; //派工单号
          _this.publicdata1.city = _this.arrayList.applyJobGroupInfo.city; //城市

          _this.publicdata1.userId = _this.arrayList.applyJobGroupInfo.staffId;
          _this.publicdata1.groupId = _this.arrayList.applyJobGroupInfo.groupId;
          _this.publicdata1.serviceNumber =
            _this.arrayList.applyJobGroupInfo.assignId;
          _this.publicdata1.HospitalName =
            _this.arrayList.applyJobGroupInfo.customerName;
          _this.publicdata1.useDepartment =
            _this.arrayList.productInfo[0].useDepartment;
          _this.publicdata1.model = _this.arrayList.applyJobInfo[num].model;
          _this.publicdata1.deviceId =
            _this.arrayList.applyJobInfo[num].deviceId;
          _this.publicdata1.installDate =
            _this.arrayList.productInfo[0].installDate;

          if (data.breath && data.breath != null) {
            _this.publicdata1.isstatus = true;
          } else {
            _this.publicdata1.isstatus = false;
          }
          if (data.breath) {
            _this.publicdata1.isstatus1 = 1;
          } else {
            _this.publicdata1.isstatus1 = 2;
          }
          _this.listBtn.push({ name: "呼吸机" });
        }
        if (_this.arrayList.applyJobInfo[num].productLine == "ssc") {
          _this.publicdata2.Cpid = _this.arrayList.applyJobGroupInfo.id;
          _this.publicdata2.staffId = _this.arrayList.applyJobGroupInfo.staffId;
          _this.publicdata2.staffName =
            _this.arrayList.applyJobGroupInfo.staffName;
          _this.publicdata2.customerId =
            _this.arrayList.applyJobGroupInfo.customerId;

          _this.publicdata2.province =
            _this.arrayList.applyJobGroupInfo.province; //省份
          _this.publicdata2.productLine =
            _this.arrayList.applyJobInfo[num].productLine; //产品线
          _this.publicdata2.department =
            _this.arrayList.applyJobInfo[num].department; //产品线
          _this.publicdata2.productname = _this.arrayList.productInfo; //产品名称
          _this.publicdata2.customerLevel =
            _this.arrayList.applyJobGroupInfo.customerLevel; //医院级别
          _this.publicdata2.contacts =
            _this.arrayList.applyJobGroupInfo.contacts; //联系人
          _this.publicdata2.phone = _this.arrayList.applyJobGroupInfo.phone; //联系人电话
          _this.publicdata2.assignId =
            _this.arrayList.applyJobGroupInfo.assignId; //派工单号
          _this.publicdata2.city = _this.arrayList.applyJobGroupInfo.city; //城市

          _this.publicdata2.userId = _this.arrayList.applyJobGroupInfo.staffId;
          _this.publicdata2.groupId = _this.arrayList.applyJobGroupInfo.groupId;
          _this.publicdata2.serviceNumber =
            _this.arrayList.applyJobGroupInfo.assignId;
          _this.publicdata2.HospitalName =
            _this.arrayList.applyJobGroupInfo.customerName;
          _this.publicdata2.useDepartment =
            _this.arrayList.productInfo[0].useDepartment;
          _this.publicdata2.model = _this.arrayList.applyJobInfo[num].model;
          _this.publicdata2.deviceId =
            _this.arrayList.applyJobInfo[num].deviceId;
          _this.publicdata2.installDate =
            _this.arrayList.productInfo[0].installDate;

          if (data.surgical && data.surgical != null) {
            _this.publicdata2.isstatus = true;
          } else {
            _this.publicdata2.isstatus = false;
          }
          if (data.surgical) {
            _this.publicdata2.isstatus1 = 1;
          } else {
            _this.publicdata2.isstatus1 = 2;
          }
          _this.listBtn.push({ name: "手术床" });
        }

        if (_this.arrayList.applyJobInfo[num].productLine == "wyd") {
          _this.publicdata3.Cpid = _this.arrayList.applyJobGroupInfo.id;
          _this.publicdata3.staffId = _this.arrayList.applyJobGroupInfo.staffId;
          _this.publicdata3.staffName =
            _this.arrayList.applyJobGroupInfo.staffName;
          _this.publicdata3.customerId =
            _this.arrayList.applyJobGroupInfo.customerId;

          _this.publicdata3.province =
            _this.arrayList.applyJobGroupInfo.province; //省份
          _this.publicdata3.productLine =
            _this.arrayList.applyJobInfo[num].productLine; //产品线
          _this.publicdata3.department =
            _this.arrayList.applyJobInfo[num].department; //产品线
          _this.publicdata3.productname = _this.arrayList.productInfo; //产品名称
          _this.publicdata3.customerLevel =
            _this.arrayList.applyJobGroupInfo.customerLevel; //医院级别
          _this.publicdata3.contacts =
            _this.arrayList.applyJobGroupInfo.contacts; //联系人
          _this.publicdata3.phone = _this.arrayList.applyJobGroupInfo.phone; //联系人电话
          _this.publicdata3.assignId =
            _this.arrayList.applyJobGroupInfo.assignId; //派工单号
          _this.publicdata3.city = _this.arrayList.applyJobGroupInfo.city; //城市

          _this.publicdata3.userId = _this.arrayList.applyJobGroupInfo.staffId;
          _this.publicdata3.groupId = _this.arrayList.applyJobGroupInfo.groupId;
          _this.publicdata3.serviceNumber =
            _this.arrayList.applyJobGroupInfo.assignId;
          _this.publicdata3.HospitalName =
            _this.arrayList.applyJobGroupInfo.customerName;
          _this.publicdata3.useDepartment =
            _this.arrayList.productInfo[0].useDepartment;
          _this.publicdata3.model = _this.arrayList.applyJobInfo[num].model;
          _this.publicdata3.deviceId =
            _this.arrayList.applyJobInfo[num].deviceId;

          _this.publicdata3.installDate =
            _this.arrayList.productInfo[0].installDate;
          if (data.lamp && data.lamp != null) {
            _this.publicdata3.isstatus = true;
          } else {
            _this.publicdata3.isstatus = false;
          }
          if (data.lamp) {
            _this.publicdata3.isstatus1 = 1;
          } else {
            _this.publicdata3.isstatus1 = 2;
          }

          _this.listBtn.push({ name: "无影灯" });
        }

        if (_this.arrayList.applyJobInfo[num].productLine == "ta") {
          _this.publicdata4.Cpid = _this.arrayList.applyJobGroupInfo.id;
          _this.publicdata4.staffId = _this.arrayList.applyJobGroupInfo.staffId;
          _this.publicdata4.staffName =
            _this.arrayList.applyJobGroupInfo.staffName;
          _this.publicdata4.customerId =
            _this.arrayList.applyJobGroupInfo.customerId;

          _this.publicdata4.province =
            _this.arrayList.applyJobGroupInfo.province; //省份
          _this.publicdata4.productLine =
            _this.arrayList.applyJobInfo[num].productLine; //产品线
          _this.publicdata4.department =
            _this.arrayList.applyJobInfo[num].department; //产品线
          _this.publicdata4.productname = _this.arrayList.productInfo; //产品名称
          _this.publicdata4.customerLevel =
            _this.arrayList.applyJobGroupInfo.customerLevel; //医院级别
          _this.publicdata4.contacts =
            _this.arrayList.applyJobGroupInfo.contacts; //联系人
          _this.publicdata4.phone = _this.arrayList.applyJobGroupInfo.phone; //联系人电话
          _this.publicdata4.assignId =
            _this.arrayList.applyJobGroupInfo.assignId; //派工单号
          _this.publicdata4.city = _this.arrayList.applyJobGroupInfo.city; //城市

          _this.publicdata4.userId = _this.arrayList.applyJobGroupInfo.staffId;
          _this.publicdata4.groupId = _this.arrayList.applyJobGroupInfo.groupId;
          _this.publicdata4.serviceNumber =
            _this.arrayList.applyJobGroupInfo.assignId;
          _this.publicdata4.HospitalName =
            _this.arrayList.applyJobGroupInfo.customerName;
          _this.publicdata4.useDepartment =
            _this.arrayList.productInfo[0].useDepartment;
          _this.publicdata4.productModel =
            _this.arrayList.applyJobInfo[num].model;
          _this.publicdata4.machineNumber =
            _this.arrayList.applyJobInfo[num].deviceId;
          _this.publicdata4.installTime =
            _this.arrayList.productInfo[0].installDate; //安装时间
          _this.publicdata4.totalTime = ""; //使用总计时间
          _this.publicdata4.mFrequency = ""; //维护频率：
          _this.publicdata4.mDepartment = ""; //维护科室：

          if (data.towerBridge && data.towerBridge != null) {
            _this.publicdata4.isstatus = true;
          } else {
            _this.publicdata4.isstatus = false;
          }
          if (data.towerBridge) {
            _this.publicdata4.isstatus1 = 1;
          } else {
            _this.publicdata4.isstatus1 = 2;
          }

          _this.listBtn.push({ name: "塔桥" });
        }

        _this.tabpage = _this.listBtn[0].name;
        Indicator.close();
      }
    },
    shouxie(n) {
      if (n.btnid == 0) {
        if (n.name == "麻醉机") {
          this.tpyename = n.name;
          this.numid = n.id;
        } else if (n.name == "呼吸机") {
          this.tpyename = n.name;
          this.numid = n.id;
        } else if (n.name == "手术床") {
          this.tpyename = n.name;
          this.numid = n.id;
        } else if (n.name == "无影灯") {
          this.tpyename = n.name;
          this.numid = n.id;
        } else if (n.name == "塔桥") {
          this.tpyename = n.name;
          this.numid = n.id;
        }

        var scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        document.body.style.cssText +=
          "position:fixed;top:-" + scrollTop + "px;";
        this.$refs.Clear.clear();
        this.signatureShow = true;
      } else if (n.btnid == 1) {
        // debugger;

        if (n.box == 0) {
          this.publicdata.isstatus = true;
        } else if (n.box == 1) {
          this.publicdata1.isstatus = true;
        } else if (n.box == 2) {
          this.publicdata2.isstatus = true;
        } else if (n.box == 3) {
          this.publicdata3.isstatus = true;
        } else if (n.box == 4) {
          this.publicdata4.isstatus = true;
        }
        this.isfalse = true;
        //麻醉机
        if (_this.publicdata.isstatus1 == 2) {
          if (_this.publicdata.isstatus == false) {
            this.isfalse = false;
          }
        }
        //呼吸机
        if (_this.publicdata1.isstatus1 == 2) {
          if (_this.publicdata1.isstatus == false) {
            this.isfalse = false;
          }
        }
        //手术床
        if (_this.publicdata2.isstatus1 == 2) {
          if (_this.publicdata2.isstatus == false) {
            this.isfalse = false;
          }
        }
        //无影灯
        if (_this.publicdata3.isstatus1 == 2) {
          if (_this.publicdata3.isstatus == false) {
            this.isfalse = false;
          }
        }
        //塔桥
        if (_this.publicdata4.isstatus1 == 2) {
          if (_this.publicdata4.isstatus == false) {
            this.isfalse = false;
          }
        }

        // 结束工单
        if (this.isfalse) {
          _this.Monitoringoperation("完成工单");
          _this.workorder();
        } else {
          _this.Monitoringoperation("工单签字");
          _this.$message.success("还有未签字报修产品线");
          Indicator.close();
        }
      }
    },
    workorder() {
      let complete = {
        id: _this.arrayList.applyJobGroupInfo.id,
        staffId: _this.arrayList.applyJobGroupInfo.staffId,
        staffName: _this.arrayList.applyJobGroupInfo.staffName,
        status: 6,
        applyType: "HF"
      };

      _this.$Axios
        .post(baseUrl + "/applyJob/updApplyJobInfo", complete)
        .then(function(response) {
          //重复点击
          Indicator.close();

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
            _this.$router.replace({
              path: "/orderlist"
            });
          }
        })
        .catch(function(error) {
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
        pagt.operation = "回访签字模板";
        pagt.examineRemarks = "签字成功";
      } else if (issta == "完成工单") {
        pagt.operation = "回访签字模板";
        pagt.examineRemarks = "成功完成工单";
      }

      _this.$Axios
        .post(url, pagt)
        .then(function(response) {})
        .catch(function() {});
    },
    //签字图片
    signatureImg(n) {
      if (this.tpyename == "麻醉机") {
        //  n.sta = 0  点击取消
        if (n.sta == 0) {
          this.signatureShow = false;
          //  n.sta = 1  点击确定
        } else if (n.sta == 1) {
          if (this.numid == 0) {
            // _this.anesthesia.sImg = n.img;
            this.base64imgrot = n.img;
          } else if (this.numid == 1) {
            // _this.anesthesia.cImg = n.img;
            this.base64imgrot = n.img;
          }
        }
      } else if (this.tpyename == "呼吸机") {
        if (n.sta == 0) {
          this.signatureShow = false;
        } else if (n.sta == 1) {
          if (this.numid == 0) {
            // _this.breathing.sImg = n.img;
            this.base64imgrot = n.img;
          } else if (this.numid == 1) {
            // _this.breathing.cImg = n.img;
            this.base64imgrot = n.img;
          }
        }
      } else if (this.tpyename == "手术床") {
        if (n.sta == 0) {
          this.signatureShow = false;
        } else if (n.sta == 1) {
          if (this.numid == 0) {
            // _this.surgical.sImg = n.img;
            this.base64imgrot = n.img;
          } else if (this.numid == 1) {
            // _this.surgical.cImg = n.img;
            this.base64imgrot = n.img;
          }
        }
      } else if (this.tpyename == "无影灯") {
        if (n.sta == 0) {
          this.signatureShow = false;
        } else if (n.sta == 1) {
          if (this.numid == 0) {
            // _this.astrallamp.sImg = n.img;
            this.base64imgrot = n.img;
          } else if (this.numid == 1) {
            this.base64imgrot = n.img;
            // _this.astrallamp.cImg = n.img;
          }
        }
      } else if (this.tpyename == "塔桥") {
        if (n.sta == 0) {
          this.signatureShow = false;
        } else if (n.sta == 1) {
          if (this.numid == 0) {
            // _this.astrallamp.sImg = n.img;
            this.base64imgrot = n.img;
          } else if (this.numid == 1) {
            this.base64imgrot = n.img;
            // _this.astrallamp.cImg = n.img;
          }
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
      if (this.tpyename == "麻醉机") {
        if (n.sta == 0) {
          this.signatureShow = false;
        } else if (n.sta == 1) {
          if (this.numid == 0) {
            _this.anesthesia.sImg = n.base64data;
          } else if (this.numid == 1) {
            _this.anesthesia.cImg = n.base64data;
          }
        }
      } else if (this.tpyename == "呼吸机") {
        if (n.sta == 0) {
          this.signatureShow = false;
        } else if (n.sta == 1) {
          if (this.numid == 0) {
            _this.breathing.sImg = n.base64data;
          } else if (this.numid == 1) {
            _this.breathing.cImg = n.base64data;
          }
        }
      } else if (this.tpyename == "手术床") {
        if (n.sta == 0) {
          this.signatureShow = false;
        } else if (n.sta == 1) {
          if (this.numid == 0) {
            _this.surgical.sImg = n.base64data;
          } else if (this.numid == 1) {
            _this.surgical.cImg = n.base64data;
          }
        }
      } else if (this.tpyename == "无影灯") {
        if (n.sta == 0) {
          this.signatureShow = false;
        } else if (n.sta == 1) {
          if (this.numid == 0) {
            _this.astrallamp.sImg = n.base64data;
          } else if (this.numid == 1) {
            _this.astrallamp.cImg = n.base64data;
          }
        }
      } else if (this.tpyename == "塔桥") {
        if (n.sta == 0) {
          this.signatureShow = false;
        } else if (n.sta == 1) {
          if (this.numid == 0) {
            _this.Bridge.sImg = n.base64data;
          } else if (this.numid == 1) {
            _this.Bridge.cImg = n.base64data;
          }
        }
      }

      var body = document.body;
      body.style.position = "static";
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      );
      body.style.top = "";
    },

    toback() {
      this.$router.push({ path: "/orderlist" });
    },
    showBTN(n) {
      this.tabpage = n.name;
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

<style scoped>
.base64imgrotimg {
  position: absolute;
  z-index: -100;
  top: 0;
}
</style>


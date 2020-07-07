<template>
  <div class="box xiongmao004" v-cloak>
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">培训记录单</p>
    </div>
    <heraderTab :listBtn="listBtn" @tabAc="showBTN"></heraderTab>
    <div
      class="main"
      v-show="showBtn==torIndex"
      v-for="(text,torIndex) in torepoteList"
      :key="torIndex"
    >
      <h3 @click="showhide(0)">
        一、产品信息productLine
        <i></i>
      </h3>

      <ul :class="{hg_ac:hg_ac_bool == 'hg_ac00'}">
        <li>
          <p>派工单号</p>
          <span>{{text.assignId}}</span>
        </li>
        <li>
          <p>产品线</p>
          <span>{{text.productLine}}</span>
        </li>
        <li>
          <p>产品型号</p>
          <span>{{text.productModel}}</span>
        </li>
        <li>
          <p>机器编号</p>
          <span>{{text.productNumber}}</span>
        </li>
       <li>
          <p>使用科室</p>
          <!-- <span>{{text.useDepartment}}</span> -->
          <span>
            <el-select v-model="text.useDepartment" placeholder="请选择" clearable>
              <el-option
                v-for="item in keshi_list"
                :key="item.id"
                :label="item.lable"
                :value="item.lable"
              ></el-option>
            </el-select>
          </span>

          <i class="ac"></i>
        </li>
        <li>
          <p>客户名称</p>
          <span>{{text.cName}}</span>
        </li>
        <li>
          <p>联系人</p>
          <span>{{text.lName}}</span>
        </li>
        <li>
          <p>联系电话</p>
          <span>{{text.lPhone}}</span>
        </li>
      </ul>

      <h3 @click="showhide(1)">
        二、培训内容
        <mt-badge type="error" size="small" v-show="Identification00"></mt-badge>
        <i></i>
      </h3>
      <ul :class="{hg_ac:hg_ac_bool == 'hg_ac01'}">
        <!-- <li @click="signature(0,torIndex)">
          <p>培训讲师签字</p>
          <img v-show="text.sImg" :src="text.sImg" alt class="magin_t" />
          <i class="ac"></i>
        </li>-->
        <li>
          <p>整机介绍-客户评价</p>
          <i class="ac"></i>
          <mt-radio v-model="text.introduced" :options="['非常满意','满意','一般','不满意']" align="left"></mt-radio>
        </li>
        <li>
          <p>操作讲解-客户评价</p>
          <i class="ac"></i>
          <mt-radio v-model="text.operation" :options="['非常满意','满意','一般','不满意']" align="left"></mt-radio>
        </li>

        <li>
          <p>维护保养-客户评价</p>
          <i class="ac"></i>
          <mt-radio v-model="text.maintenance" :options="['非常满意','满意','一般','不满意']" align="left"></mt-radio>
        </li>
        <li @click="signature(1,torIndex)">
          <p>客户签名</p>
          <img v-show="text.cImg" :src="text.cImg" alt class="magin_t" />
          <i class="ac"></i>
        </li>
        <li>
          <p>联系电话</p>
          <input type="text" v-model="text.cPhone" maxlength="11" />
          <i></i>
        </li>
        <li @click="xuantime(torIndex,0,text.customerWriteTime)">
          <p>日期</p>
          <span>{{text.customerWriteTime}}</span>
          <i class="ac"></i>
        </li>
      </ul>
      <h3 @click="showhide(2)">
        三、客户建议
        <mt-badge type="error" size="small" v-show="Identification01"></mt-badge>
        <i></i>
      </h3>
      <ul :class="{hg_ac:hg_ac_bool == 'hg_ac02'}">
        <li>
          <textarea placeholder="客户建议" maxlength="110" v-model="text.advice"></textarea>
        </li>
      </ul>
      <h3 @click="showhide(3)">
        四、联系我们
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

    <!-- <div
      v-show="noneshow"
      style="width: 6.9rem; height: auto; background: #fff; padding: 0 .3rem 1rem;"
    >
      <el-upload
        :multiple="multiple"
        action="http://192.168.133.163/upload/image"
        list-type="picture-card"
        :auto-upload="false"
        :http-request="uploadFile"
        ref="upload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>-->
    <!-- 选择时间 -->
    <TimeComponent :boosl="bool" :datitme1="datitme" @cancelTime="cancelTime"></TimeComponent>

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
import signature from "./signature";
import baseUrl from "../../api/baseUrl.js";
import baseUrlxiazai from "../../api/baseUrlxiazai.js";
import heraderTab from "./herderTba";

import baseImgtu from "./pdf";

import base64roter from "./signatureImg";

import { Toast, Indicator } from "mint-ui";
import Cookie from "../../api/cookie.js";

import axios from "axios";

var _this;
var nowYear;
var nowMonth;
var nowDay;

import pdf from "vue-pdf";
import TimeComponent from "./TimeComponent";

export default {
  data() {
    return {
      baseUrl: baseImg,
      xiazaiUrl: "", //下载PDF
      baseUrlxiazai: baseUrlxiazai,

      Identification00: false,
      Identification01: false,
      base64imgrot: "",

      hg_ac_bool: "hg_ac00",
      hg_ac_bool01: "hg_ac00",

      productLine: [],
      CUSTOMER_LEVEL: [], //医院等级
      DEPARTMENT: [], //科室
      ispartsName: [], //已签过的数据

      multiple: true,
      formDate: "",
      noneshow: false,
      yulanShow: false,
      pdfImg: "",
      numPages: [],

      listBtn: [],
      showBtn: 0,
      title: "",
      bool: false, // 选择时间
      boolid: 0, //选择时间  第一个
      signatureShow: false,

      torepoteList: [],
 keshi_list: [],
      numid: 0,
      numid1: 0,
      listid: 0, //选择 第几个产品线的ID

      //选择时间
      datitme: ""
    };
  },
  created() {
    _this = this;
    nowYear = new Date().getFullYear().toString();
    nowMonth = (new Date().getMonth() + 1).toString();
    nowDay = new Date().getDate().toString();
    //获取是否提交过
    _this.istosend();
  },
  components: {
    signature,
    heraderTab,
    pdf,
    TimeComponent,
    baseImgtu,
    base64roter
  },
  mounted() {},
  methods: {
    istosend() {
      var id = { groupId: _this.$route.query.id };

      Indicator.open({
        text: "加载中，请稍后",
        spinnerType: "fading-circle"
      });

      _this.$Axios
        .post(baseUrl + "/reportType/getAll", {
          groupId: id.groupId,
          products: "培训"
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
            _this.ispartsName = response.data.data.train;

            _this.$Axios
              .post(
                baseUrl +
                  "/dicCode/queryDicByMoreType?type=PRODUCT_LINE,CUSTOMER_LEVEL,DEPARTMENT"
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
                    if (response.data.data[i].type == "DEPARTMENT") {
                      _this.DEPARTMENT.push(response.data.data[i]);
                    }
                  }
                  _this.producti(id);
                }
              })
              .catch(function() {
                Indicator.close();
              });

               _this.$Axios
              .post(baseUrl + "/dicCode/queryDicByMoreType?type=DEPARTMENT")
              .then(function(response) {
                //重复点击
                if (response.data.code == 200) {
                  _this.keshi_list = response.data.data;
                }
              })
              .catch(function(error) {});
          }
        })
        .catch(function() {
          Indicator.close();
        });
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
          if (response.data.msg == "进度查询成功") {
            _this.userdetali = response.data.data.applyJobGroupInfo;

            _this.userdetaliarray = response.data.data;
            let proLine = "";
            let isstatus = false;

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
                  _this.listBtn.push({
                    name: _this.productLine[pronum2].lable
                  });
                  proLine += _this.productLine[pronum2].lable;
                }
              }
              if (_this.ispartsName != "") {
                //是否提交过数据
                for (
                  var pronum4 = 0;
                  pronum4 <= _this.ispartsName.length - 1;
                  pronum4++
                ) {
                  if (proLine == _this.ispartsName[pronum4].productLine) {
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

                userId: response.data.data.applyJobGroupInfo.staffId,
                groupId: response.data.data.applyJobGroupInfo.groupId,
                assignId: response.data.data.applyJobGroupInfo.assignId,
                report: "培训",
                serviceNumber: response.data.data.applyJobGroupInfo.assignId,

                productLine: "",
                cName: response.data.data.applyJobGroupInfo.customerName, //客户名称
                lName: response.data.data.applyJobGroupInfo.contacts, //联系人
                lPhone: response.data.data.applyJobGroupInfo.phone, //联系电话
                productModel: response.data.data.applyJobInfo[pronum1].model, //产品型号
                productNumber:
                  response.data.data.applyJobInfo[pronum1].deviceId, //机器编号

                applyType: response.data.data.applyJobGroupInfo.applyType,
                Call: response.data.data.applyJobGroupInfo.contacts,
                Contact: response.data.data.applyJobGroupInfo.phone,

                useDepartment: response.data.data.productInfo[0].useDepartment, //使用科室
                sImg: "", //培训讲师  签字
                introduced: "", //整机介绍客户评价
                operation: "", //操作讲解客户评价
                maintenance: "", //维护保养客户评价  签字
                cImg: "", //客户签名图片  签字
                customerWriteTime:
                  _this.timeAdd0(nowYear) +
                  "-" +
                  _this.timeAdd0(nowMonth) +
                  "-" +
                  _this.timeAdd0(nowDay), //客户签字日期  签字
                cPhone: "",
                advice: "" //客户建议  签字
              };
              //使用科室
              for (
                let keshi = 0;
                keshi <= _this.DEPARTMENT.length - 1;
                keshi++
              ) {
                if (
                  response.data.data.applyJobGroupInfo.useDepartment ==
                  _this.DEPARTMENT[keshi].value
                ) {
                  data.useDepartment = _this.DEPARTMENT[keshi].lable;
                }
              }

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
              data.productLine = proLine;
console.log(response.data.data.productInfo[0].customerId)
              proLine = "";
              isstatus = false;
              // return;.

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
    xuantime(listid, n, startTime) {
      this.datitme = startTime;
      this.bool = true;
      this.boolid = n;
      this.listid = listid;

      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.cssText += "position:fixed;top:-" + scrollTop + "px;";
    },
    //选择时间方法   组件方法
    cancelTime(data) {
      if (data.name == "取消") {
        this.bool = false;
      } else if (data.name == "确定") {
        this.torepoteList[this.listid].customerWriteTime = data.time;
        this.bool = false;
      }
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
    //
    signature(n, id) {
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

    //文件上传 --------------------------------------------------
    uploadFile(file) {
      this.formDate.append("file", file.file);
    },
    //提交图片  视频
    subPicForm(data, datlist, id) {
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
            _this.iSAjax(data, datlist, id);
          }
        })
        .catch(() => {});
    },
    //文件上传 --------------------------------------------------

    //隐藏PDF
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
    //签字模块
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

    //产品线切换 tab
    showBTN(n) {
      this.showBtn = n.id;
    },

    toback() {
      this.$router.go(-1);
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
    //预览提交
    iSAjax(data, datlist, n) {
      Indicator.open({
        text: "数据生成中，请稍后",
        spinnerType: "fading-circle"
      });

      this.$Axios
        .post(baseUrl + "/reportType/preview", data)
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
          // _this.is_ajax = false;
          if (response.data.code == 200) {
            if (datlist == "提交") {
              _this
                .$confirm("提交后不能修改，确定提交吗？", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                .then(() => {
                  _this.tijiao(n);
                })
                .catch(() => {
                  _this.$message({
                    type: "info",
                    message: "已取消"
                  });
                });
              return;
            } else {
              _this.pdfImg = "/" + response.data.data;
              _this.xiazaiUrl = "/" + response.data.data;

              pdf.createLoadingTask(_this.pdfImg).then(pdf => {
                _this.numPages = pdf.numPages;
              });

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

    yulan(n, datlist) {
      var opj = this.torepoteList[n];
      this.Identification00 = false;
      this.Identification01 = false;
      // if (opj.sImg == "") {
      //   Toast("培训讲师签字不能为空");
      //   this.Identification00 = true;
      //   return;
      // }
      if (opj.introduced == "") {
        Toast("整机介绍不能为空");
        this.Identification00 = true;
        return;
      }
      if (opj.operation == "") {
        Toast("操作讲解不能为空");
        this.Identification00 = true;
        return;
      }
      if (opj.maintenance == "") {
        Toast("维护保养不能为空");
        this.Identification00 = true;
        return;
      }
      if (opj.cImg == "") {
        Toast("客户签字不能为空");
        this.Identification00 = true;
        return;
      }
      if (opj.cPhone == "") {
        Toast("客户联系电话不能为空");
        this.Identification00 = true;
        return;
      }
      if (opj.advice == "") {
        Toast("客户建议不能为空");
        this.Identification01 = true;
        return;
      }
      var data = {
        staffId: opj.staffId, //员工id
        groupId: opj.groupId,
        report: "培训",
        serviceNumber: opj.serviceNumber, //服务单号
        productLine: opj.productLine, //产品线，
        cName: opj.cName, //客户名称
        lName: opj.lName, //联 系 人
        lPhone: opj.lPhone, //联系电话
        productModel: Cookie.StringConversion(opj.productModel,15), //产品型号
        machineNumber: Cookie.StringConversion(opj.productNumber,28), //机器编号
        useDepartment: opj.useDepartment, //使用科室

        sImg: "□", //培训讲师  签字

        PV: "□", //非常满意   整机介绍
        PM: "□", //满意   整机介绍
        PG: "□", //一般   整机介绍
        PNM: "□", //不满意   整机介绍

        JV: "□", //非常满意   操作讲解
        JM: "□", //满意   操作讲解
        JG: "□", //一般   操作讲解
        JNM: "□", //不满意   操作讲解

        BV: "□", //非常满意   维护保养
        BM: "□", //满意   维护保养
        BG: "□", //一般   维护保养
        BNM: "□", //不满意   维护保养

        cImg: "", //客户签名图片  签字

        cPhone: opj.cPhone, //电话
        time: opj.customerWriteTime, //时间

        advice: opj.advice //建议
      };

      data.sImg = opj.sImg.replace("data:image/png;base64,", "");
      data.cImg = opj.cImg.replace("data:image/png;base64,", "");

      if (opj.introduced == "非常满意") {
        data.PV = "■";
      } else if (opj.introduced == "满意") {
        data.PM = "■";
      } else if (opj.introduced == "一般") {
        data.PG = "■";
      } else if (opj.introduced == "不满意") {
        data.PNM = "■";
      }

      if (opj.operation == "非常满意") {
        data.JV = "■";
      } else if (opj.operation == "满意") {
        data.JM = "■";
      } else if (opj.operation == "一般") {
        data.JG = "■";
      } else if (opj.operation == "不满意") {
        data.JNM = "■";
      }

      if (opj.maintenance == "非常满意") {
        data.BV = "■";
      } else if (opj.maintenance == "满意") {
        data.BM = "■";
      } else if (opj.maintenance == "一般") {
        data.BG = "■";
      } else if (opj.maintenance == "不满意") {
        data.BNM = "■";
      }

      // _this.subPicForm(data, datlist, n);
      _this.iSAjax(data, datlist, n);

      let customeris = {
       //id: _this.userdetali.customerId,
         id:_this.userdetaliarray.productInfo[0].customerId,
        useDepartment: opj.useDepartment
      };
      this.$Axios
        .post(baseUrl + "/customerAdmin/updCustomerDepartment", customeris)
        .then(function(response) {
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
        })
        .catch(function() {});
    },
    tijiao(n) {
      var opj = this.torepoteList[n];
      var data = {
        id: opj.Cpid, //id
        staffId: opj.staffId, //员工id
        installOne: opj.staffName, //员工名称
        userId: opj.userId,
        groupId: opj.groupId,
        serviceNumber: opj.serviceNumber, //服务单号
        productLine: opj.productLine, //产品线，
        cName: opj.cName, //客户名称
        lName: opj.lName, //联 系 人
        lPhone: opj.lPhone, //联系电话
        productModel: opj.productModel, //产品型号
        machineNumber: opj.productNumber, //机器编号
        useDepartment: "", //使用科室
        sImg: "□", //培训讲师  签字
        introduced: opj.introduced, //整机介绍客户评价
        operation: opj.operation, //操作讲解客户评价
        maintenance: opj.maintenance, //维护保养客户评价  签字
        cImg: "", //客户签名图片  签字
        cPhone: opj.cPhone, //电话
        customerWriteTime: opj.customerWriteTime, //时间
        advice: opj.advice //建议
      };

      //使用科室
      for (let keshi = 0; keshi <= _this.DEPARTMENT.length - 1; keshi++) {
        if (opj.useDepartment == _this.DEPARTMENT[keshi].lable) {
          data.useDepartment = _this.DEPARTMENT[keshi].value;
        }
      }

      data.sImg = opj.sImg.replace("data:image/png;base64,", "");
      data.cImg = opj.cImg.replace("data:image/png;base64,", "");

      Indicator.open({
        text: "数据提交中，请稍后",
        spinnerType: "fading-circle"
      });

      //提交  维修工单签字
      this.$Axios
        .post(baseUrl + "/reportType/insertTrainData", data)
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
              _this.$message.success("还有未签字培训产品线");
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
            province: _this.userdetaliarray.applyJobGroupInfo.province, //省份，字典表
            productLine: "", //产品线，字典表
            model: modelarray[productNumber], //产品型号
            installTime: _this.userdetaliarray.productInfo.installDate, //安装日期
            customer: _this.torepoteList[Archives].cName, //客户
            productName: "", //产品名称
            productLevel: laver, //级别
            contacts: _this.torepoteList[Archives].Call, //联系人
            phone: _this.torepoteList[Archives].Contact, //联系方式
            dispatchingOrder: _this.torepoteList[Archives].serviceNumber, //派工单号   ★★★★★
            deviceId: listarray[productNumber], //序列号（设备号）
            installOne: "", //安装人员
            department: "", //科室
            applyType: _this.torepoteList[Archives].applyType, //申请类型，字典表
            warrantyEndDate:
              _this.userdetaliarray.productInfo.guaranteeBeginDate, //保修结束日期
            warrantyStartDate:
              _this.userdetaliarray.productInfo.guaranteeEndDate, //保修开始日期
            note: "", //备注              %%%%%
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
        .catch(function() {});
    },

    //work order   改变工单  状态
    workorder(data) {
      // _this.is_ajax = false;
      let complete = {
        id: data.id,
        staffId: data.staffId,
        staffName: data.staffName,
        status: 6,
        applyType: "PX"
      };

      _this.$Axios
        .post(baseUrl + "/applyJob/updApplyJobInfo", complete)
        .then(function(response) {
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
          // _this.is_ajax = false;
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
        pagt.operation = "培训签字模板";
        pagt.examineRemarks = "签字成功";
      } else if (issta == "完成工单") {
        pagt.operation = "培训签字模板";
        pagt.examineRemarks = "成功完成工单";
      }

      _this.$Axios
        .post(url, pagt)
        .then(function(response) {
        })
        .catch(function() {});
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
.xiongmao004 .mint-badge.is-size-small {
  border-radius: 0.25rem;
  line-height: 0.35rem;
  height: 0.35rem;
  font-size: 0.28rem;
  float: right;
  margin: 0.28rem 0.6rem;
}
.xiongmao004 .mint-checkbox-input:checked + .mint-checkbox-core {
  background-color: #998bd6;
  border-color: #998bd6;
}

.xiongmao004 .mint-checklist .mint-cell .mint-checkbox-label {
  font-size: 0.26rem;
}
.xiongmao004 .mint-checklist .mint-cell .mint-checkbox-core {
  width: 0.3rem;
  height: 0.3rem;
}
.xiongmao004 .mint-checkbox-core::after {
  top: 0.7px;
  left: 4.2px;
}

.xiongmao004 .mint-radio-input:checked + .mint-radio-core {
  background-color: #998bd6;
  border-color: #998bd6;
}
.xiongmao004 .mint-radio-core {
  width: 13.5px;
  height: 13.9px;
}
.xiongmao004 .mint-radio-core::after {
  top: 3px;
  left: 3px;
  width: 6px;
  height: 6px;
}
.xiongmao004 .mint-radio-label {
  font-size: 0.26rem;
}

.xiongmao004 .mint-radio-input:checked + .mint-radio-core:after {
  transform: scale(0) !important;
}

.xiongmao004 .el-message-box {
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
  height: 12rem;
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

div.page {
  max-width: 100vw;
  text-align: left;
}

.pinch-zoom-parent {
  height: 80vh;
  width: 90vw;
}

img {
  height: 90vh;
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
</style>


<template>
  <div class="box xiongmao008">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">安装报告单</p>
    </div>
    <heraderTab :listBtn="listBtn" @tabAc="showBTN"></heraderTab>
    <div
      class="main"
      v-show="showBtn==torIndex"
      v-for="(text,torIndex) in torepoteList"
      :key="torIndex"
    >
      <h3 @click="showhide(0)">
        一、客户信息
        <mt-badge type="error" size="small" v-show="Identification00"></mt-badge>
        <i></i>
      </h3>
      <ul :class="{hg_ac:hg_ac_bool == 'hg_ac00'}">
        <li>
          <p>医院名称</p>
       <!-- <input type="text"  v-model="text.c" /> -->
         <span>{{text.hospitalName}}</span> 
          <i></i>
        </li>
        <li>
          <p>级别</p>
          <span>{{text.level}}</span>
          <!-- <input type="text"> -->
          <i></i>
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
          <p>联系人</p>
          <input type="text" v-model="text.contactB" />
          <i class="ac"></i>
        </li>
        <li>
          <p>联系电话</p>
          <input type="text" maxlength="11" v-model="text.callB" />
          <i class="ac"></i>
        </li>
        <li>
          <p>产品型号</p>
          <span>{{text.productModel}}</span>
          <i></i>
        </li>
        <li>
          <p>产品编号</p>
          <span>{{text.productNumber}}</span>
          <!-- <input type="text"> -->
          <i></i>
        </li>
        <li>
          <p>采购科室</p>
          <input type="text" v-model="text.procurement" />
          <i class="ac"></i>
        </li>
        <li>
          <p>联系人</p>
          <span>{{text.contactA}}</span>
          <i></i>
        </li>
        <li>
          <p>联系电话</p>
          <span>{{text.callA}}</span>
          <i></i>
        </li>
        <li>
          <p>邮编</p>
          <span>{{text.postcode}}</span>
          <i></i>
        </li>
        <li>
          <p>地址</p>
          <!-- <span>{{text.address}}</span> -->
           <input type="text" placeholder="请输入地址"   v-model="text.address" />
          <i></i>
        </li>
        <li>
          <p>选配</p>
          <input type="text" v-model="text.optional" />
          <i class="ac"></i>
        </li>
      </ul>
      <h3 @click="showhide(1)">
        二、服务标准，客户评价
        <mt-badge type="error" size="small" v-show="Identification01"></mt-badge>
        <i></i>
      </h3>
      <ul :class="{hg_ac:hg_ac_bool == 'hg_ac01'}">
        <li @click="showhide01(0)">
          <p>机器安装</p>
          <mt-checklist v-model="text.installation" :options="['产品安装位置，符合客户要求','产品安装后，现场清理完毕']"></mt-checklist>
        </li>
        <li @click="showhide01(1)">
          <p>产品培训人员范围</p>
          <mt-checklist v-model="text.scope" :options="['受训人员，符合客户产品培训范围要求']"></mt-checklist>
        </li>
        <li @click="showhide01(2)">
          <p>培训内容</p>
          <mt-checklist
            v-model="text.trainingContent"
            :options="[ '组件、配件介绍',
        '组件附件连接演示',
        '功能介绍',
        '操作指导讲解',
        '清洁和消毒',
        '维护保养及常见故障处理',
        '产品使用注意事项']"
          ></mt-checklist>
        </li>

        <li>
          <p>产品验收情况：</p>
        </li>
        <li>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;外观完好</p>
          <mt-radio
            v-model="text.appearance"
            style="width: 6.82rem;
    margin-left: 0.2rem;
}"
            :options="list2"
            align="left"
          ></mt-radio>
        </li>
        <li>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;配件是否齐全</p>
          <mt-radio
            v-model="text.accessories"
            style="width: 6.82rem;
    margin-left: 0.2rem;
}"
            :options="list2"
            align="left"
          ></mt-radio>
        </li>
        <li>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;调试是否良好</p>
          <mt-radio
            v-model="text.debugging"
            style="width: 6.82rem;
    margin-left: 0.2rem;
}"
            :options="list2"
            align="left"
          ></mt-radio>
        </li>
        <li>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;工作是否正常</p>
          <mt-radio
            v-model="text.work"
            style="width: 6.82rem;
    margin-left: 0.2rem;
}"
            :options="list2"
            align="left"
          ></mt-radio>
        </li>
        <li>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;随机文件是否齐套</p>
          <mt-radio
            v-model="text.randomFile"
            style="width: 6.82rem;
    margin-left: 0.2rem;
}"
            :options="list2"
            align="left"
          ></mt-radio>
        </li>

        <li @click="showhide01(4)">
          <p>综合服务评价</p>
          <mt-radio
            v-model="text.evaluation"
            style="width: 6.82rem;
    margin-left: 0.2rem;
}"
            :options="['非常满意', '满意', '一般', '不满意']"
            align="left"
          ></mt-radio>
        </li>
      </ul>
      <h3 @click="showhide(2)">
        三、产品保修和免责声明
        <i></i>
      </h3>
      <ul :class="{hg_ac:hg_ac_bool == 'hg_ac02'}">
        <!-- <li @click="xuanzhe(0,torIndex)"> -->
        <li @click="Selectiontime(torIndex,0,text.startTime)">
          <p>保修开始日期</p>
          <span>{{text.startTime}}</span>
          <!-- <input type="text" v-model="text.startTime"> -->
          <i class="ac"></i>
        </li>
        <!-- <li @click="xuanzhe(1,torIndex)"> -->
        <li @click="Selectiontime(torIndex,1,text.endTime)">
          <p>保修结束日期</p>
          <span>{{text.endTime}}</span>
          <!-- <input type="text" v-model="text.endTime"> -->
          <i class="ac"></i>
        </li>
        <li>
          <p>声明：</p>
        </li>
        <li>
          <p>1、产品主机保修参照保修期限；</p>
        </li>
        <li>
          <p>2、产品零配件保修3个月；</p>
        </li>
        <li>
          <p>3、产品消耗品不保修。</p>
        </li>
        <li>
          <p class="p_ac">注：1、具体产品保修相关内容以订货合同为准。</p>
        </li>
        <li>
          <p class="p_ac">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、产品外包装自安装之日起，保留2周。</p>
        </li>
        <li>
          <p class="p_ac">注 意：因客户未能严格按照产品使用说明书要求使用，而造成的产品损坏,将不列入保修范围，包括但不局限于以下情形：</p>
        </li>
        <li>
          <p class="p_ac">1、非授权人员擅自拆机检查，造成的产品损坏；</p>
        </li>
        <li>
          <p class="p_ac">2、非正常使用或产品防护不当，造成的产品损坏；</p>
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
      <h3 @click="showhide(4)">
        五、产品验收确认
        <mt-badge type="error" size="small" v-show="Identification02"></mt-badge>
        <i></i>
      </h3>
      <ul :class="{hg_ac:hg_ac_bool == 'hg_ac04'}">
        <li @click="shouxie(1,torIndex)">
          <p>客户签名</p>
          <img v-show="text.cImg" :src="text.cImg" alt class="magin_t" />
          <i class="ac"></i>
        </li>
        <li @click="Selectiontime(torIndex,3,text.customerWriteTime)">
          <p>客户签字日期</p>
          <span>{{text.customerWriteTime}}</span>
          <i class="ac"></i>
        </li>
        <!-- <li @click="shouxie(0,torIndex)">
          <p>服务人员签名</p>
          <img v-show="text.sImg" :src="text.sImg" alt class="magin_t" />
          <i class="ac"></i>
        </li>-->
        <li @click="Selectiontime(torIndex,2,text.serviceWriteTime)">
          <p>服务人员签字日期</p>
          <span>{{text.serviceWriteTime}}</span>
          <i class="ac"></i>
        </li>
        <!-- <li>
          <p>现场照片</p>
          <i class="ac"></i>
        </li>-->
      </ul>
      <div class="sendbtn mt" :class="{isbtnac:text.isstatus}" @click="yulan(torIndex)">预览</div>
      <div class="sendbtn mt" :class="{isbtnac:text.isstatus}" @click="yulan(torIndex,'提交')">提交</div>
    </div>
    <!-- 时间组件 -->
    <TimeComponent :boosl="timebool" :datitme1="datitme" @cancelTime="cancelTime"></TimeComponent>
    <!-- 签字模板 -->
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
import baseUrlxiazai from "../../api/baseUrlxiazai.js";
import baseImgtu from "./pdf";
import signature from "./signature";
import baseUrl from "../../api/baseUrl.js";
import heraderTab from "./herderTba";
import axios from "axios";

import base64roter from "./signatureImg";

var _this;
var nowYear;
var nowMonth;
var nowDay;

import pdf from "vue-pdf";

import TimeComponent from "./TimeComponent";

export default {
  name: "maintain",

  data() {
    return {
      baseUrl: baseImg,
      xiazaiUrl: "",
      baseUrlxiazai: baseUrlxiazai,
      base64imgrot: "",
      letinstallDate:"",
      Identification00: false,
      Identification01: false,
      Identification02: false,
      //选择时间
      values: "",
      timelist: 0,
      bool: false, //
      titleTime: "", //
      torIndexnum: 0,
      signatureShow: false,

      hg_ac_bool: "hg_ac00",
      hg_ac_bool01: "hg_ac00",

      noneshow: false,
      yulanShow: false,
      pdfImg: "",
      numPages: [], //pdf 分页

      userdetaliarray: [], //工单完整信息
      ispartsName: [], //提交过的数据

      multiple: true,
      formDate: "",

      title: "",
      listBtn: [],

      showBtn: "0",
      numid: 0,
      numid1: 0,

      torepoteList: [],
      list2: [
        {
          label: "是",
          value: "true"
        },
        {
          label: "否",
          value: "false"
        }
      ],
      CUSTOMER_LEVEL: [],
      DEPARTMENT: [], //科室
      productLine: [],

      timebool: false,
      datitme: "",
      keshi_list: []
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
    nowYear = new Date().getFullYear().toString();
    nowMonth = (new Date().getMonth() + 1).toString();
    nowDay = new Date().getDate().toString();
    this.istosend();
  },
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
          products: "安装"
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
            _this.ispartsName = response.data.data.install;

            _this.$Axios
              .post(
                baseUrl +
                  "/dicCode/queryDicByMoreType?type=CUSTOMER_LEVEL,PRODUCT_LINE,DEPARTMENT"
              )
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

                  _this.producti(id);
                }
              })
              .catch(function() {
                Indicator.close();
                Toast({
                  message: "网络开小差，请稍后重试",
                  duration: 1000
                });
              });
          }
        })
        .catch(function() {
          Indicator.close();
        });

      this.$Axios
        .post(baseUrl + "/dicCode/queryDicByMoreType?type=DEPARTMENT")
        .then(function(response) {
          //重复点击
          if (response.data.code == 200) {
            _this.keshi_list = response.data.data;
          }
        })
        .catch(function(error) {});
    },
    //设置时间的  0
    timeAdd0(str) {
      if (str.length <= 1) {
        str = "0" + str;
      }
      return str;
    },

    //选择时间
    xuanzhe(n, torIndex) {
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.cssText += "position:fixed;top:-" + scrollTop + "px;";

      if (n == 0) {
        this.titleTime = "保修开始日期";
      } else if (n == 1) {
        this.titleTime = "保修结束日期";
      }

      this.timelist = n;
      this.torIndexnum = torIndex;
      this.bool = !this.bool;
    },
    queding() {
      if (this.timelist == 0) {
        this.torepoteList[this.torIndexnum].startTime = this.values;
      } else if (this.timelist == 1) {
        this.torepoteList[this.torIndexnum].endTime = this.values;
      }

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
    onValuesChange(picker, values) {
      this.values = values[0] + "-" + values[1] + "-" + values[2];
    },

    //产品线类型
    producti(id) {
      _this.$Axios
        .post(baseUrl + "/applyJob/queryScheduleInfo", id)
        .then(function(response) {
          Indicator.close();
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
         
            _this.userdetali = response.data.data.applyJobGroupInfo;
            console.log(_this.userdetali)
            _this.userdetaliarray = response.data.data;
             console.log(_this.userdetaliarray)

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
                isstatus: isstatus,

                userId: response.data.data.applyJobGroupInfo.staffId,
                groupId: response.data.data.applyJobGroupInfo.groupId,
                report: "安装",
                applyType: response.data.data.applyJobGroupInfo.applyType,
                serviceNumber: response.data.data.applyJobGroupInfo.assignId,
                hospitalName: response.data.data.applyJobGroupInfo.customerName,
                level: "", //级别
                address: response.data.data.applyJobGroupInfo.address, //地址
                postcode: response.data.data.applyJobGroupInfo.zipCode, //邮编
                procurement: "", //采购科室
                callA: response.data.data.applyJobGroupInfo.phone, //联系电话
                contactA: response.data.data.applyJobGroupInfo.contacts, //联系人
                useDepartment: response.data.data.productInfo[0].useDepartment, //使用科室
                callB: "", //使用科室 电话
                contactB: "", //使用科室 联系人
                productModel: response.data.data.applyJobInfo[pronum1].model, //产品型号
                productNumber:
                  response.data.data.applyJobInfo[pronum1].deviceId, //产品编号
                optional: "", //选配

                installation: [],
                // iMeet: "", //产品安装位置，符合客户要求
                // iClear: "", //产品安装后，现场清理完毕

                scope: [], //产品培训人员范围

                trainingContent: [], //培训内容
                // zIntroduce: "", //组件、配件介绍
                // demo: "", // 组件附件连接演示
                // gIntroduce: "", //功能介绍
                // explain: "", //操作指导讲解
                // cleanDisinfection: "", //清洁和消毒
                // maintenance: "", //维护保养及常见故障处理
                // useAttention: "", //产品使用注意事项

                appearance: "", //外观是否完好
                accessories: "", //配件是否齐全
                debugging: "", //// 调试是否良好
                work: "", //工作是否正常
                randomFile: "", //随机文件是否齐套

                evaluation: "", //综合服务评价

                startTime: "", //保修期限年限开始日期
                endTime: "", //保修期限年限结束日期
                sImg: "", //服务人员签名图片
                cImg: "", //客服签名图片
                serviceWriteTime:
                  _this.timeAdd0(nowYear) +
                  "-" +
                  _this.timeAdd0(nowMonth) +
                  "-" +
                  _this.timeAdd0(nowDay), //服务人员签字日期
                customerWriteTime:
                  _this.timeAdd0(nowYear) +
                  "-" +
                  _this.timeAdd0(nowMonth) +
                  "-" +
                  _this.timeAdd0(nowDay) //客户签字日期
              };
             
               

              if (
                response.data.data.productInfo[0].guaranteeBeginDate != "" ||
                response.data.data.productInfo[0].guaranteeBeginDate != undefined
              ) {
                data.startTime = response.data.data.productInfo[0].guaranteeBeginDate.substr(
                  0,
                  10
                );
              }
              if (
                response.data.data.productInfo[0].guaranteeEndDate != "" ||
                response.data.data.productInfo[0].guaranteeEndDate != undefined
              ) {
                data.endTime = response.data.data.productInfo[0].guaranteeEndDate.substr(
                  0,
                  10
                );
              }

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
          Toast({
            message: "网络开小差，请稍后重试222222",
            duration: 1000
          });
        });
    },

    toback() {
      this.$router.push({
        path: "/orderlist"
      });
    },

    showBTN(n) {
      this.showBtn = n.id;
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

    yulan(n, submission) {
      var opj = this.torepoteList[n];
      this.Identification00 = false;
      this.Identification01 = false;
      this.Identification02 = false;

      if (opj.contactB == "") {
        Toast("使用科室联系人不能为空");
        this.Identification00 = true;
        return;
      }
      if (opj.callB == "") {
        Toast("使用科室电话不能为空");
        this.Identification00 = true;
        return;
      }
      if (opj.procurement == "") {
        Toast("采购科室不能为空");
        this.Identification00 = true;
        return;
      }
      if (opj.address == "") {
        Toast("地址不能为空");
        this.Identification00 = true;
        return;
      }
      if (opj.optional == "") {
        Toast("选配不能为空");
        this.Identification00 = true;
        return;
      }
      if (opj.installation == "") {
        Toast("机器安装不能为空");
        this.Identification01 = true;
        return;
      }
      if (opj.trainingContent == "") {
        Toast("培训内容不能为空");
        this.Identification01 = true;
        return;
      }

      if (opj.appearance == "") {
        Toast("外观是否完好不能为空");
        this.Identification01 = true;
        return;
      }
      if (opj.accessories == "") {
        Toast("配件齐全不能为空");
        this.Identification01 = true;
        return;
      }
      if (opj.debugging == "") {
        Toast("调试良好不能为空");
        this.Identification01 = true;
        return;
      }
      if (opj.work == "") {
        Toast("工作正常不能为空");
        this.Identification01 = true;
        return;
      }
      if (opj.randomFile == "") {
        Toast("随机文件齐套不能为空");
        this.Identification01 = true;
        return;
      }
      if (opj.evaluation == "") {
        Toast("服务评价不能为空");
        this.Identification01 = true;
        return;
      }
      if (opj.startTime == "") {
        Toast("保修开始日期不能为空");
        return;
      }
      if (opj.endTime == "") {
        Toast("保修结束日期不能为空");
        return;
      }

      // if (opj.sImg == "") {
      //   Toast("服务人员签字不能为空");
      //   this.Identification02 = true;
      //   return;
      // }
      if (opj.serviceWriteTime == "") {
        Toast("服务人员签字日期不能为空");
        this.Identification02 = true;
        return;
      }

      if (opj.cImg == "") {
        Toast("客户人员签字不能为空");
        this.Identification02 = true;
        return;
      }

      if (opj.customerWriteTime == "") {
        Toast("客户人员签字日期不能为空");
        this.Identification02 = true;
        return;
      }

      var data = {
        staffId: opj.staffId, //员工id
        userId: opj.userId,
        groupId: opj.groupId,
        report: "安装",
        serviceNumber: opj.serviceNumber,
        HospitalName: opj.hospitalName,
        level: opj.level, //级别
        address: opj.address, //地址
        postcode: opj.postcode, //邮编
        procurement: opj.procurement, //采购科室
        CallA: opj.callA, //联系电话
        ContactA: opj.contactA, //联系人
        useDepartment: opj.useDepartment, //使用科室
        CallB: opj.callB, //使用科室 电话
        ContactB: opj.contactB, //使用科室联系人
        productModel: Cookie.StringConversion(opj.productModel,15), //产品型号
        productNumber: Cookie.StringConversion(opj.productNumber,22), //产品编号
        optional: opj.optional, //选配

        iMeet: "□", //产品安装位置，符合客户要求
        iClear: "□", //产品安装后，现场清理完毕
        CoincidenceRange: "□", //受训人员，符合客户产品培训范围要求
        zIntroduce: "□", //组件、配件介绍
        demo: "□", //组件附件连接演示
        gIntroduce: "□", //功能介绍
        explain: "□", //操作指导讲解
        cleanDisinfection: "□", //清洁和消毒
        maintenance: "□", //维护保养及常见故障处
        useAttention: "□", //产品使用注意事项

        perfect: "□", //是    外观完好
        notPerfect: "□", //否    外观完好

        complete: "□", //是    配件齐全
        notComplete: "□", //否    配件齐全

        good: "□", //是    调试良好
        notGood: "□", //否    调试良好

        normal: "□", //是    工作正常
        notNormal: "□", //否    工作正常

        qiSet: "□", //是    随机文件齐套
        notQi: "□", //否    随机文件齐套

        verySatisfied: "□", //非常满意
        meet: "□", //满意
        general: "□", //一般
        notMeet: "□", //不满意

        startN: opj.startTime.substr(0, 4), //  保修期限   年
        startY: opj.startTime.substr(5, 2), //  保修期限   年
        startR: opj.startTime.substr(8, 2), //  保修期限   年

        endN: opj.endTime.substr(0, 4), //  保修期限   年
        endY: opj.endTime.substr(5, 2), //  保修期限   年
        endR: opj.endTime.substr(8, 2), //  保修期限   年

        sImg: "", //服务人员
        cImg: "", //客户

        SNN: opj.serviceWriteTime.substr(0, 4), //签字日期   服务人员
        SYY: opj.serviceWriteTime.substr(5, 2), //签字日期   服务人员
        SRR: opj.serviceWriteTime.substr(8, 2), //签字日期   服务人员

        CNN: opj.customerWriteTime.substr(0, 4), //签字日期  客户
        CYY: opj.customerWriteTime.substr(5, 2), //签字日期  客户
        CRR: opj.customerWriteTime.substr(8, 2) //签字日期  客户
      };
      data.sImg = opj.sImg.replace("data:image/png;base64,", "");
      data.cImg = opj.cImg.replace("data:image/png;base64,", "");
      opj.installation.forEach(function(value) {
        if (value == "产品安装位置，符合客户要求") {
          data.iMeet = "■";
        } else if (value == "产品安装后，现场清理完毕") {
          data.iClear = "■";
        }
      });

      opj.scope.forEach(function(value) {
        if (value == "受训人员，符合客户产品培训范围要求") {
          data.CoincidenceRange = "■";
        }
      });
      opj.trainingContent.forEach(function(value) {
        if (value == "组件、配件介绍") {
          data.zIntroduce = "■";
        } else if (value == "组件附件连接演示") {
          data.demo = "■";
        } else if (value == "功能介绍") {
          data.gIntroduce = "■";
        } else if (value == "操作指导讲解") {
          data.explain = "■";
        } else if (value == "清洁和消毒") {
          data.cleanDisinfection = "■";
        } else if (value == "维护保养及常见故障处理") {
          data.maintenance = "■";
        } else if (value == "产品使用注意事项") {
          data.useAttention = "■";
        }
      });

      if (opj.appearance == "true") {
        data.perfect = "■"; //外观是否完好   正常
      } else {
        data.notPerfect = "■"; //外观是否完好    故障
      }
      if (opj.accessories == "true") {
        data.complete = "■"; //配件齐全   正常
      } else {
        data.notComplete = "■"; //配件齐全    故障
      }
      if (opj.debugging == "true") {
        data.good = "■"; //调试良好   正常
      } else {
        data.notGood = "■"; //调试良好    故障
      }
      if (opj.work == "true") {
        data.normal = "■"; //工作正常   正常
      } else {
        data.notNormal = "■"; //工作正常    故障
      }
      if (opj.randomFile == "true") {
        data.qiSet = "■"; //随机文件齐套   正常
      } else {
        data.notQi = "■"; //随机文件齐套    故障
      }

      if (opj.evaluation == "非常满意") {
        data.verySatisfied = "■"; //随机文件齐套   正常
      } else if (opj.evaluation == "满意") {
        data.meet = "■"; //随机文件齐套    故障
      } else if (opj.evaluation == "一般") {
        data.general = "■"; //随机文件齐套    故障
      } else if (opj.evaluation == "不满意") {
        data.notMeet = "■"; //随机文件齐套    故障
      }
      // _this.subPicForm(data, submission,n);
      _this.isAjax(data, submission, n);

      let customeris = {
        //id: _this.userdetali.customerId,
        id: _this.userdetaliarray.productInfo[0].customerId,
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
        partsName: opj.partsName, //产品线
        userId: opj.userId,
        groupId: opj.groupId,
        serviceNumber: opj.serviceNumber,
        hospitalName: opj.hospitalName,
        level: opj.level, //级别
        address: opj.address, //地址
        postcode: opj.postcode, //邮编
        procurement: opj.procurement, //采购科室
        callA: opj.callA, //联系电话
        contactA: opj.contactA, //联系人
        useDepartment: opj.useDepartment, //使用科室
        callB: opj.callB, //使用科室 电话
        contactB: opj.contactB, //使用科室 联系人
        productModel: opj.productModel, //产品型号
        productNumber: opj.productNumber, //产品编号
        optional: opj.optional, //选配
        iMeet: "false", //产品安装位置，符合客户要求
        iClear: "false", //产品安装后，现场清理完毕
        coincidenceRange: "false", //受训人员，符合客户产品培训范围要求
        zIntroduce: "false", //组件、配件介绍
        demo: "false", //组件附件连接演示
        gIntroduce: "false", //功能介绍
        explain: "false", //操作指导讲解
        cleanDisinfection: "false", //清洁和消毒
        maintenance: "false", //维护保养及常见故障处
        useAttention: "false", //产品使用注意事项
        appearance: opj.appearance, //外观是否完好
        accessories: opj.accessories, //配件是否齐全
        debugging: opj.debugging, //// 调试是否良好
        work: opj.work, //工作是否正常
        randomFile: opj.randomFile, //随机文件是否齐套
        evaluation: opj.evaluation, //综合服务评价
        startTime:
          opj.startTime.substr(0, 4) +
          "-" +
          opj.startTime.substr(5, 2) +
          "-" +
          opj.startTime.substr(8, 2), //保修期限
        endTime:
          opj.endTime.substr(0, 4) +
          "-" +
          opj.endTime.substr(5, 2) +
          "-" +
          opj.endTime.substr(8, 2),

        sImg: "", //服务人员
        cImg: "", //客户
        serviceWriteTime: opj.serviceWriteTime, //签字日期   服务人员
        customerWriteTime: opj.customerWriteTime //签字日期   服务人员
      };
      this.letinstallDate= data.customerWriteTime
      console.log(this.letinstallDate+"安装日期")
      //使用科室
      for (let keshi = 0; keshi <= _this.DEPARTMENT.length - 1; keshi++) {
        if (opj.useDepartment == _this.DEPARTMENT[keshi].lable) {
          data.useDepartment = _this.DEPARTMENT[keshi].value;
        }
      }

      data.sImg = opj.sImg.replace("data:image/png;base64,", "");
      data.cImg = opj.cImg.replace("data:image/png;base64,", "");

      opj.installation.forEach(function(value) {
        if (value == "产品安装位置，符合客户要求") {
          data.iMeet = "true";
        } else if (value == "true") {
          data.iClear = "■";
        }
      });

      opj.scope.forEach(function(value) {
        if (value == "受训人员，符合客户产品培训范围要求") {
          data.CoincidenceRange = "true";
        }
      });
      opj.trainingContent.forEach(function(value) {
        if (value == "组件、配件介绍") {
          data.zIntroduce = "true";
        } else if (value == "组件附件连接演示") {
          data.demo = "true";
        } else if (value == "功能介绍") {
          data.gIntroduce = "true";
        } else if (value == "操作指导讲解") {
          data.explain = "true";
        } else if (value == "清洁和消毒") {
          data.cleanDisinfection = "true";
        } else if (value == "维护保养及常见故障处理") {
          data.maintenance = "true";
        } else if (value == "产品使用注意事项") {
          data.useAttention = "true";
        }
      });

      Indicator.open({
        text: "数据提交中，请稍后",
        spinnerType: "fading-circle"
      });

      //提交  安装工单签字
      this.$Axios
        .post(baseUrl + "/reportType/insertInstallData", data)
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
          //重复点击
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

        let listarray = _this.torepoteList[Archives].productNumber.split(","); //设备号
        let modelarray = _this.torepoteList[Archives].productModel.split(","); //机型

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
            // installTime:_this.letinstallDate, //安装日期
            installTime:"",
            customer: _this.torepoteList[Archives].hospitalName, //客户
            customerId:_this.userdetaliarray.productInfo[0].customerId,
            productName: "", //产品名称
            productLevel: laver, //级别
            contacts: _this.torepoteList[Archives].contactA, //联系人
            phone: _this.torepoteList[Archives].callA, //联系方式
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
            // Matchingdata[matching].installTime =
            //   _this.letinstallDate; //安装日期
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
        staffName: data.installOne,
        status: 6,
        applyType: "AZ",
        guaranteeBeginDate:data.startTime,
        guaranteeEndDate:data.endTime,
        deviceId:_this.userdetali.deviceId,
        assignId:_this.userdetali.assignId
      };
  
      _this.$Axios
        .post(baseUrl + "/applyJob/updApplyJobInfo", complete)
        .then(function(response) {
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
          //重复点击
          if (response.data.code == 200) {
            Toast({
              message: "签字提交成功",
              duration: 1000
            });
            // localStorage.signature = JSON.stringify(demolist);
            _this.$router.replace({
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
        pagt.operation = "安装签字模板";
        pagt.examineRemarks = "签字成功";
      } else if (issta == "完成工单") {
        pagt.operation = "安装签字模板";
        pagt.examineRemarks = "成功完成工单";
      }

      _this.$Axios
        .post(url, pagt)
        .then(function(response) {})
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
        .catch(() => {
          Toast({
            message: "网络开小差，请稍后重试33333",
            duration: 1000
          });
        });
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
          //重复点击
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
              _this.pdfImg = "/" + response.data.data;
              _this.xiazaiUrl = "/" + response.data.data;

              // pdf.createLoadingTask(_this.pdfImg).then(pdf => {
              //   _this.numPages = pdf.numPages;
              // });

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

    //选择时间方法   组件方法
    cancelTime(data) {
      var body = document.body;
      body.style.position = "static";
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      );
      body.style.top = "";

      if (data.name == "取消") {
        this.timebool = false;
      } else if (data.name == "确定") {
        if (this.timeboolid == 0) {
          this.torepoteList[this.listid].startTime = data.time;
        } else if (this.timeboolid == 1) {
          this.torepoteList[this.listid].endTime = data.time;
        } else if (this.timeboolid == 2) {
          if (
            new Date(
              this.torepoteList[this.listid].customerWriteTime
            ).getTime() <= new Date(data.time).getTime()
          ) {
            this.torepoteList[this.listid].serviceWriteTime = data.time;
          } else {
            this.$message.error("请选择与客户相同或之后的时间");
          }
        } else if (this.timeboolid == 3) {
          this.torepoteList[this.listid].customerWriteTime = data.time;
        }
        this.timebool = false;
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
.xiongmao008 .mint-badge.is-size-small {
  border-radius: 0.25rem;
  line-height: 0.35rem;
  height: 0.35rem;
  font-size: 0.28rem;
  float: right;
  margin: 0.28rem 0.6rem;
}
.xiongmao008 .mint-checkbox-input:checked + .mint-checkbox-core {
  background-color: #998bd6;
  border-color: #998bd6;
}

.xiongmao008 .mint-checklist .mint-cell .mint-checkbox-label {
  font-size: 0.26rem;
}
.xiongmao008 .mint-checklist .mint-cell .mint-checkbox-core {
  width: 0.3rem;
  height: 0.3rem;
}
.xiongmao008 .mint-checkbox-core::after {
  top: 0.7px;
  left: 4.2px;
}

.xiongmao008 .mint-radio-input:checked + .mint-radio-core {
  background-color: #998bd6;
  border-color: #998bd6;
}
.xiongmao008 .mint-radio-core {
  width: 13.5px;
  height: 13.9px;
}
.xiongmao008 .mint-radio-core::after {
  top: 3px;
  left: 3px;
  width: 6px;
  height: 6px;
}
.xiongmao008 .mint-radio-label {
  font-size: 0.26rem;
}

.xiongmao008 .mint-radio-input:checked + .mint-radio-core:after {
  transform: scale(0) !important;
}

.xiongmao008 .el-message-box {
  width: 5rem;
}
</style>

<style scoped>
.box {
  position: absolute;
  top: 0;
  left: 0;
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

.btnTab {
  height: 0.82rem;
  width: 7.5rem;
  background: #fff;
}
.btnTab li {
  line-height: 0.8rem;
  width: 3.75rem;
  background: #fff;
  display: inline-block;
  vertical-align: top;
  font-size: 0.3rem;
  color: #000;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.btnTab li i {
  display: none;
  position: absolute;
  bottom: 0;
  left: 1.12rem;
  width: 1.55rem;
  height: 1px;
  background: #6b4499;
}
.btnTab .ac {
  color: #6b4499;
}
.btnTab .ac i {
  display: block;
}
.btnTabAc li {
  width: 2.5rem;
}
.btnTabAc .ac i {
  left: 0.62rem;
  display: block;
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
}
</style>


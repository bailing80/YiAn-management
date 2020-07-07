<template>
  <div class="xiongmao011">
    <!-- <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">上门回访维护记录单-麻醉机</p>
    </div>-->
    <div class="main">
      <h3 @click="showhide(0)">
        一、产品使用维护基本信息
        <mt-badge type="error" size="small" v-show="Identification00"></mt-badge>
        <i></i>
      </h3>
      <ul :class="{hg_ac:hg_ac_bool == 'hg_ac00'}">
        <li>
          <p>医院名称</p>
          <span>{{publicdata.HospitalName}}</span>
        </li>
        <!-- <li>
          <p>使用科室</p>
          <span>{{publicdata.useDepartment}}</span>
        </li>-->

        <li>
          <p>使用科室</p>
          <!-- <span>{{text.useDepartment}}</span> -->
          <span>
            <el-select v-model="publicdata.useDepartment" placeholder="请选择" clearable>
              <el-option
                v-for="item in department"
                :key="item.id"
                :label="item.lable"
                :value="item.lable"
              ></el-option>
            </el-select>
          </span>

          <i class="ac"></i>
        </li>
        <li>
          <p>产品型号</p>
          <span>{{publicdata.model}}</span>
        </li>
        <li>
          <p>机器编号</p>
          <span>{{publicdata.deviceId}}</span>
        </li>
        <li>
          <p>安装时间</p>
          <span>{{publicdata.installDate | dicFilter(publicdata.installDate)}}</span>
        </li>
        <li>
          <p>使用频率 -小时/周</p>
          <input type="text" v-model="anesthesiamac.useFrequency" />
          <i class="ac"></i>
        </li>
        <li>
          <p>维护频率 -次/周</p>
          <input type="text" v-model="anesthesiamac.mFrequency" />
          <i class="ac"></i>
        </li>
        <li>
          <p>维护科室</p>
          <input type="text" v-model="anesthesiamac.mDepartment" />
          <i class="ac"></i>
        </li>
      </ul>
      <h3 @click="showhide(1)">
        二、产品参数检测（运行检查）
        <mt-badge type="error" size="small" v-show="Identification01"></mt-badge>
        <i></i>
      </h3>
      <ul :class="{hg_ac:hg_ac_bool == 'hg_ac01'}">
        <li>
          <p>基础设定</p>
          <input type="text" v-model="anesthesiamac.set" />
        </li>
        <li>
          <!-- <p>基础项目</p> -->
          <textarea placeholder="基础项目" maxlength="200" v-model="anesthesiamac.jcProjects"></textarea>
        </li>

        <li></li>
        <li>
          <p>潮气量监测</p>
          <mt-radio v-model="anesthesiamac.tidalVolume" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>触发功能检测</p>
          <mt-radio v-model="anesthesiamac.trigger" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>

        <li>
          <p>压力报警检测</p>
          <mt-radio v-model="anesthesiamac.pressure" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>电池功能检测</p>
          <mt-radio v-model="anesthesiamac.battery" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>

        <li>
          <p>APL阀溢气值检测</p>
          <mt-radio v-model="anesthesiamac.AZW" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>风箱密封检测</p>
          <mt-radio v-model="anesthesiamac.bellowsSeal" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>手动机控转换检测</p>
          <mt-radio v-model="anesthesiamac.SZW" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>回路气密检测</p>
          <mt-radio v-model="anesthesiamac.HZW" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <textarea placeholder="情况说明" maxlength="110" v-model="anesthesiamac.instructions"></textarea>
        </li>
        <li>
          <p>检测结论</p>
          <mt-radio v-model="anesthesiamac.detectionConclusion" :options="list2" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
      </ul>
      <h3 @click="showhide(2)">
        三、进行项目单
        <mt-badge type="error" size="small" v-show="Identification02"></mt-badge>
        <i></i>
      </h3>
      <ul :class="{hg_ac:hg_ac_bool == 'hg_ac02'}">
        <li @click="showhide01(0)">
          <p>产品维护保养逐项进行项目单</p>
          <i class="ac"></i>
          <ol :class="{hg_ac:hg_ac_bool01 == 'hg_ac00'}">
            <mt-checklist
              v-model="anesthesiamac.Productmaintenance"
              :options="['APL阀功能检查','排水阀清洁及检查','压紧装置功能检查','支脚和脚轮紧固检查','回路压力表功能检查','流量计浮标及联动检查','转换开关模块功能检查','整机回路风箱表面清洁','蒸发器度盘灵活度检查','折叠囊密封圈老化检查','平行管及探头老化检查','波纹管活瓣罩老化检查']"
            ></mt-checklist>
          </ol>
        </li>
        <li @click="showhide01(1)">
          <p>维护保养结果确认</p>
          <i class="ac"></i>
          <ol :class="{hg_ac:hg_ac_bool01 == 'hg_ac01'}">
            <mt-radio
              v-model="anesthesiamac.maintenanceResult"
              :options="['状态良好','部分部件老化，建议更换','停止使用，更换老化部件']"
              align="left"
            ></mt-radio>
          </ol>
        </li>
      </ul>
      <h3 @click="showhide(3)">
        四、工程师建议
        <mt-badge type="error" size="small" v-show="Identification03"></mt-badge>
        <i></i>
      </h3>
      <ul :class="{hg_ac:hg_ac_bool == 'hg_ac03'}">
        <li>
          <textarea placeholder="产品维护情况" maxlength="110" v-model="anesthesiamac.situation"></textarea>
        </li>
        <li>
          <div class="btn_icon">
            <i class="icon_minus" @click="ClassList_minus()"></i>
            <i @click="ClassList_plus()"></i>
          </div>
        </li>
        <li>
          <div v-for="(acctext,accIndex) in anesthesiamac.accessoriesList" :key="accIndex">
            <input type="text" class="left" placeholder="更换配件的名称" v-model="acctext.accessoriesName" />
          </div>
        </li>
        <li>
          <textarea placeholder="其他" maxlength="110" v-model="anesthesiamac.other"></textarea>
        </li>
        <!-- <li @click="shouxie(0)">
          <p>服务人员签名</p>
          <img v-show="anesthesia.sImg" :src="anesthesia.sImg" alt class="magin_t" />
          <i class="ac"></i>
        </li>-->
        <li @click="Selectiontime(0,anesthesiamac.serviceWriteTime)">
          <p>服务人员签字日期</p>
          <span>{{anesthesiamac.serviceWriteTime}}</span>
          <i class="ac"></i>
        </li>
      </ul>
      <h3 @click="showhide(4)">
        五、客户确认及建议
        <mt-badge type="error" size="small" v-show="Identification04"></mt-badge>
        <i></i>
      </h3>
      <ul :class="{hg_ac:hg_ac_bool == 'hg_ac04'}">
        <li>
          <p>工程师对规定项目栏内项目是否逐一检查确认</p>
          <mt-radio v-model="anesthesiamac.item" :options="list3" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>工程师的服务水平是否满意</p>
          <mt-radio v-model="anesthesiamac.engineerServiceLevel" :options="list3" align="left"></mt-radio>

          <i class="ac"></i>
        </li>
        <li>
          <p>产品质量综合评价是否满意</p>
          <mt-radio v-model="anesthesiamac.productQuality" :options="list3" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <textarea placeholder="客户建议" maxlength="110" v-model="anesthesiamac.advice"></textarea>
        </li>
        <li @click="shouxie(1)">
          <p>客户签名</p>
          <img v-show="anesthesia.cImg" :src="anesthesia.cImg" alt class="magin_t" />
          <i class="ac"></i>
        </li>

        <li>
          <p>联系电话</p>
          <input type="text" v-model="anesthesiamac.phone" maxlength="11" />
        </li>
      </ul>
    </div>

    <!-- <div style="width: 6.9rem; height: auto; background: #fff; padding: .3rem ">
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

    <div class="sendbtn mt" :class="{isbtnac:publicdata.isstatus}" @click="yulan()">预览</div>
    <div class="sendbtn mt" :class="{isbtnac:publicdata.isstatus}" @click="yulan('提交')">提交</div>

    <!-- 选择时间 -->
    <TimeComponent :boosl="timebool" :datitme1="datitme" @cancelTime="cancelTime"></TimeComponent>

    <div class="model" v-show="yulanShow">
      <div class="bg_yanse"></div>
      <baseImgtu class="yulanImng" :pdfimglist="pdfImg" :class="{yulanImngac:yulanShow}"></baseImgtu>
      <!-- <a :href="baseUrlxiazai+pdfImg" download class="xiazaiwenjian">- 点击下载</a> -->
      <div class="xiazaiwenjian xiazaiwenjian1" @click="yinchang">- 关闭预览</div>
    </div>
  </div>
</template>

<script>
import baseImg from "../../api/BASEImg.js";
import baseUrl from "../../api/baseUrl.js";
// import signature from "./signature";
import axios from "axios";
import { Toast, Indicator } from "mint-ui";
import Cookie from "../../api/cookie.js";
import TimeComponent from "./TimeComponent";
import baseImgtu from "./pdf";
import baseUrlxiazai from "../../api/baseUrlxiazai.js";

var _this;
var nowYear;
var nowMonth;
var nowDay;

import pdf from "vue-pdf";

export default {
  filters: {
    dicFilter: function(v, filter) {
      if (
        v != null ||
        v != "" ||
        v != undefined
      ) {
        v = v.substr(0, 10);
      }
      return v != "" ? v : "";
    }
  },
  name: "maintain",
  props: {
    publicdata: Object,
    anesthesia: Object,
    department: Array,
  },
  components: {
    // signature
    TimeComponent,
    pdf,
    baseImgtu
  },
  data() {
    return {
      baseUrl: baseImg,
      xiazaiUrl: "",
      baseUrlxiazai: baseUrlxiazai,

      Identification00: false,
      Identification01: false,
      Identification02: false,
      Identification03: false,
      Identification04: false,
      basetuImg: "",
      hg_ac_bool: "hg_ac00",
      hg_ac_bool01: "hg_ac00",
      clientSignature: this.$route.query.src,

      multiple: true,
      formDate: "",

      signatureShow: false, //签字显示隐藏
      numid: 0, //客户还是员工

      yulanShow: false,
      pdfImg: "", //pdfwenj
      numPages: [], //pdf fenye

      time: "",
      keshi_list: [],
      anesthesiamac: {
        userId: this.publicdata.userId,
        groupId: this.publicdata.groupId,
        customerId: this.publicdata.customerId,
        report: "麻醉机回访",
        serviceNumber: this.publicdata.serviceNumber,
        HospitalName: this.publicdata.HospitalName,
        useDepartment: this.publicdata.useDepartment,
        productModel: this.publicdata.productModel,
        productNumber: this.publicdata.productNumber,

        installTime: this.publicdata.installDate, //安装时间

        useFrequency: "", //使用频率
        mFrequency: "", //// 维护频率
        mDepartment: "", //维护科室
        set: "", //基础设定
        jcProjects: "",
        tidalVolume: "", //潮气量检测是否正常    boolean
        trigger: "", //触发功能检测是否正常       boolean
        pressure: "", //压力报警检测是否正常      boolean
        battery: "", //电池检测是否正常      boolean
        AZW: "", //APL阀溢气值检测是否正常      boolean
        bellowsSeal: "", //风箱密封检测是否正常      boolean
        SZW: "", //手动机控转换检测是否正常      boolean
        HZW: "", //回路气密检测      boolean
        instructions: "", //情况说明      String
        detectionConclusion: "", //检测结论      String

        Productmaintenance: [], //产品维修保养

        APL: "", //APL阀功能检查是否已完成      boolean
        drainValve: "", //排水阀清洁及检查是否已完成      boolean
        compaction: "", //压紧装置功能检查是否已完成      boolean
        fastening: "", //支脚和脚轮紧固检查是否已完成      boolean
        loop: "", //回路压力表功能检查是否已完成      boolean
        traffic: "", //流量计浮标及联动检查是否已完成      boolean
        conversion: "", //转换开关模块功能检查是否已完成      boolean
        bellows: "", //整机回路风箱表面清洁是否已完成      boolean
        evaporator: "", //蒸发器度盘灵活度检查是否已完成      boolean
        aging: "", //折叠囊密封圈老化检查是否已完成      boolean
        parallel: "", //平行管及探头老化检查是否已完成      boolean
        corrugated: "", //波纹管活瓣罩老化检查是否已完成      boolean

        maintenanceResult: "", //维护保养确认结果      boolean

        situation: "", //产品维护情况      boolean

        //建议更换部件1      String
        accessoriesList: [
          {
            accessoriesName: "",
            accessoriesNum: ""
          }
        ],

        other: "", //// 其他      String
        sImg: "", //服务人员签名图片      String
        serviceWriteTime:
          new Date().getFullYear().toString() +
          "-" +
          this.timeAdd0((new Date().getMonth() + 1).toString()) +
          "-" +
          this.timeAdd0(new Date().getDate().toString()), //服务人员签名日期      String
        item: "", //工程师对规定项目栏内项目是否逐一检查确认      boolean
        engineerServiceLevel: "", //工程师的服务水平是否满意      boolean
        productQuality: "", //产品质量综合评价是否满意      boolean
        advice: "", //客户建议      String
        cImg: "", //客户签字图片      String
        phone: "" //客户联系电话      String
      },

      value1: [],
      value2: [],

      list1: [
        {
          label: "正常",
          value: "true"
        },
        {
          label: "故障",
          value: "false"
        }
      ],
       list3: [
        {
          label: "是",
          value: "true"
        },
        {
          label: "否",
          value: "false"
        }
      ],
      list2: [
        {
          label: "各项参数正常，运行良好",
          value: "true"
        },
        {
          label: "停止使用，建议维修",
          value: "false"
        }
      ],

      // 选择时间  id    显示隐藏
      timebool: false,
      listid: 0, //list  数据  第一个产品线
      timeboolid: 0, //第几个的时间
      datitme: ""
    };
  },
  created() {
    _this = this;
    nowYear = new Date().getFullYear().toString();
    nowMonth = (new Date().getMonth() + 1).toString();
    nowDay = new Date().getDate().toString();

    //  if (
    //   this.$store.state.repairorder.signPic != null &&
    //   this.$store.state.repairorder.signPic != "" &&
    //   this.$store.state.repairorder.signPic != undefined
    // ) {
    //   this.basetuImg =
    //     "http://39.105.157.251:9997" + this.$store.state.repairorder.signPic;
    // }

   
  },
  methods: {
    // toback() {
    //   this.$router.go(-1);
    // },
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
    },

    //选择时间方法   组件方法
    Selectiontime(id, startTime) {
      this.datitme = startTime;
      this.timebool = true; //显示隐藏  时间
      this.timeboolid = id;
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.cssText += "position:fixed;top:-" + scrollTop + "px;";
    },

    //选择时间
    cancelTime(data) {
      if (data.name == "取消") {
        this.timebool = false;
      } else if (data.name == "确定") {
        if (this.timeboolid == 0) {
          _this.anesthesiamac.serviceWriteTime = data.time;
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

    //设置时间的  0
    timeAdd0(str) {
      if (str.length <= 1) {
        str = "0" + str;
      }
      return str;
    },
    //＋＋   添加组
    ClassList_plus() {
      if (this.anesthesiamac.accessoriesList.length - 1 > 8) return;
      this.anesthesiamac.accessoriesList.push({
        accessoriesName: "",
        accessoriesNum: ""
      });
    },
    //--    减去组
    ClassList_minus() {
      if (this.anesthesiamac.accessoriesList.length - 1 == 0) return;
      this.anesthesiamac.accessoriesList.splice(
        this.anesthesiamac.accessoriesList.length - 1,
        1
      );
    },

    //文件上传 --------------------------------------------------
    uploadFile(file) {
      this.formDate.append("file", file.file);
    },
    //提交图片  视频
    subPicForm(data, submission, jsonInformationlist) {
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
            _this.isAjax(data, submission, jsonInformationlist);
          }
        })
        .catch(() => {});
    },
    //文件上传 --------------------------------------------------

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
    shouxie(n) {
      this.$emit("change", { btnid: 0, box: "", name: "麻醉机", id: n });
    },
    yulan(submission) {
      
      var anest = this.anesthesiamac;

      var data = {
        staffId: this.publicdata.staffId,
        groupId: this.publicdata.groupId,
        customerId: this.publicdata.customerId,
        report: "麻醉机回访",
        serviceNumber: this.publicdata.serviceNumber,
        HospitalName: this.publicdata.HospitalName,
        useDepartment: this.publicdata.useDepartment,
        productModel: Cookie.StringConversion(this.publicdata.model,17),
        machineNumber:Cookie.StringConversion(this.publicdata.deviceId,27), 
        installTime: this.publicdata.installDate,

        useFrequency: anest.useFrequency,
        mFrequency: anest.mFrequency,
        mDepartment: anest.mDepartment,
        set: anest.set,
        jcProjects: anest.jcProjects,

        QZ: "□", //潮气量检测   正常
        QG: "□", //潮气量检测    故障

        CZ: "□", //触发功能检测    正常
        CG: "□", //触发功能检测    故障
        YZ: "□", //压力报警检测    正常
        YG: "□", //压力报警检测    故障

        DZ: "□", //电池功能检测    正常
        DG: "□", //电池功能检测    故障

        AZ: "□", //APL阀溢气值检测    正常
        AG: "□", //APL阀溢气值检测    故障
        FZ: "□", //风箱密封检测    正常
        FG: "□", //风箱密封检测    故障
        SZ: "□", //手动机控转换检测    正常
        SG: "□", //手动机控转换检测    故障
        HZ: "□", //回路气密检测    正常
        HG: "□", //回路气密检测    故障

        instructions: anest.instructions, //情况说明
        good: "□", //检测结论    各项参数正常，运行良好
        stop: "□", //检测结论   停止使用，建议维修

        APL: "□", //APL阀功能检查
        drainValve: "□", //排水阀清洁及检查
        compaction: "□", //压紧装置功能检查
        fastening: "□", //支脚和脚轮紧固检查
        loop: "□", //回路压力表功能检查
        traffic: "□", //流量计浮标及联动检查
        conversion: "□", //转换开关模块功能检查
        bellows: "□", //整机回路风箱表面清洁
        evaporator: "□", //蒸发器度盘灵活度检查
        aging: "□", //折叠囊密封圈老化检查
        parallel: "□", //平行管及探头老化检查
        corrugated: "□", //波纹管活瓣罩老化检查

        SG: "□", //维护保养结果确认     状态良好$
        change: "□", //维护保养结果确认    部分部件老化，建议更换
        ST: "□", //维护保养结果确认    停止使用，更换老化部件

        situation: anest.situation, //产品维护情况：

        jsonInformation: "[", //建议更换部件  ’‘’‘’‘’‘’‘’‘’‘’

        other: anest.other, //其他：

        SNN: anest.serviceWriteTime.substr(0, 4), //服务人员签名  时间  年
        SYY: anest.serviceWriteTime.substr(5, 2), //服务人员签名  时间  月
        SRR: anest.serviceWriteTime.substr(8, 2), //服务人员签名  时间  日

        sImg: "", //服务人员签名
        CY: "□", //工程师对规定项目栏内项目是否逐一检查确认    是
        CN: "□", //工程师对规定项目栏内项目是否逐一检查确认    否

        SY: "□", //工程师的服务水平是否满意：    是
        SN: "□", //工程师的服务水平是否满意：    否

        MY: "□", //产品质量综合评价是否满意：     是
        MN: "□", //产品质量综合评价是否满意：     否

        advice: anest.advice, //客户建议     否

        cImg: "", //用户签名
        CNN: _this.timeAdd0(nowYear), //客户签名  时间  年
        CYY: _this.timeAdd0(nowMonth), //客户签名  时间  年
        CRR: _this.timeAdd0(nowDay), //客户签名  时间  年
        phone: anest.phone //客户签名  电话
      };
      if (anest.tidalVolume == "true") {
        data.QZ = "■"; //潮气量检测   正常
      } else {
        data.QG = "■"; //潮气量检测    故障
      }
      if (anest.trigger == "true") {
        data.CZ = "■"; //触发功能检测   正常
      } else {
        data.CG = "■"; //触发功能检测    故障
      }
      if (anest.pressure == "true") {
        data.YZ = "■"; //压力报警检测   正常
      } else {
        data.YG = "■"; //压力报警检测    故障
      }
      if (anest.battery == "true") {
        data.DZ = "■"; //电池功能检测   正常
      } else {
        data.DG = "■"; //电池功能检测    故障
      }

      if (anest.AZW == "true") {
        data.AZ = "■"; //APL阀溢气值检测   正常
      } else {
        data.AG = "■"; //APL阀溢气值检测    故障
      }

      if (anest.bellowsSeal == "true") {
        data.FZ = "■"; //风箱密封检测   正常
      } else {
        data.FG = "■"; //风箱密封检测    故障
      }
      if (anest.SZW == "true") {
        data.SZ = "■"; //手动机控转换检测   正常
      } else {
        data.SG = "■"; //手动机控转换检测    故障
      }

      if (anest.HZW == "true") {
        data.HZ = "■"; //回路气密检测   正常
      } else {
        data.HG = "■"; //回路气密检测    故障
      }

      if (anest.detectionConclusion == "true") {
        data.good = "■"; //检测结论   正常
      } else {
        data.stop = "■"; //检测结论    故障
      }

      anest.Productmaintenance.forEach(function(value) {
        if (value == "APL阀功能检查") {
          data.APL = "■";
        } else if (value == "排水阀清洁及检查") {
          data.drainValve = "■";
        } else if (value == "压紧装置功能检查") {
          data.compaction = "■";
        } else if (value == "支脚和脚轮紧固检查") {
          data.fastening = "■";
        } else if (value == "回路压力表功能检查") {
          data.loop = "■";
        } else if (value == "流量计浮标及联动检查") {
          data.traffic = "■";
        } else if (value == "转换开关模块功能检查") {
          data.conversion = "■";
        } else if (value == "整机回路风箱表面清洁") {
          data.bellows = "■";
        } else if (value == "蒸发器度盘灵活度检查") {
          data.evaporator = "■";
        } else if (value == "折叠囊密封圈老化检查") {
          data.aging = "■";
        } else if (value == "平行管及探头老化检查") {
          data.parallel = "■";
        } else if (value == "波纹管活瓣罩老化检查") {
          data.corrugated = "■";
        }
      });

      if (anest.maintenanceResult == "状态良好") {
        data.SLG = "■";
      } else if (anest.maintenanceResult == "部分部件老化，建议更换") {
        data.change = "■";
      } else if (anest.maintenanceResult == "停止使用，更换老化部件") {
        data.ST = "■";
      }

      if (anest.item == "true") {
        data.CY = "■"; //工程师对规定项目栏内项目是否逐一检查确认   正常
      } else {
        data.CN = "■"; //工程师对规定项目栏内项目是否逐一检查确认    故障
      }
      if (anest.engineerServiceLevel == "true") {
        data.SY = "■"; //工程师的服务水平是否满意：   正常
      } else {
        data.SN = "■"; //工程师的服务水平是否满意：    故障
      }
      if (anest.productQuality == "true") {
        data.MY = "■"; //产品质量综合评价是否满意：   正常
      } else {
        data.MN = "■"; //产品质量综合评价是否满意：    故障
      }

      data.sImg = this.anesthesia.sImg.replace("data:image/png;base64,", "");
      data.cImg = this.anesthesia.cImg.replace("data:image/png;base64,", "");

      switch (anest.accessoriesList.length - 1) {
        case 0:
          data.jsonInformation +=
            '{"partsA":"' +
            anest.accessoriesList[0].accessoriesName +
            '","partsB":""}';
          break;
        case 1:
          data.jsonInformation +=
            '{"partsA":"' +
            anest.accessoriesList[0].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[1].accessoriesName +
            '"}';
          break;
        case 2:
          data.jsonInformation +=
            '{"partsA":"' +
            anest.accessoriesList[0].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[1].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[2].accessoriesName +
            '","partsB":""}';
          break;
        case 3:
          data.jsonInformation +=
            '{"partsA":"' +
            anest.accessoriesList[0].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[1].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[2].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[3].accessoriesName +
            '"},';
          break;
        case 4:
          data.jsonInformation +=
            '{"partsA":"' +
            anest.accessoriesList[0].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[1].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[2].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[3].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[4].accessoriesName +
            '"},';
          break;
        case 5:
          data.jsonInformation +=
            '{"partsA":"' +
            anest.accessoriesList[0].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[1].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[2].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[3].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[4].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[5].accessoriesName +
            '"},';
          break;
        case 6:
          data.jsonInformation +=
            '{"partsA":"' +
            anest.accessoriesList[0].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[1].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[2].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[3].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[4].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[5].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[6].accessoriesName +
            '"},';
          break;
        case 7:
          data.jsonInformation +=
            '{"partsA":"' +
            anest.accessoriesList[0].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[1].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[2].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[3].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[4].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[5].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[6].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[7].accessoriesName +
            '"},';
          break;
        case 8:
          data.jsonInformation +=
            '{"partsA":"' +
            anest.accessoriesList[0].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[1].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[2].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[3].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[4].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[5].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[6].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[7].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[8].accessoriesName +
            '"},';
          break;
        case 9:
          data.jsonInformation +=
            '{"partsA":"' +
            anest.accessoriesList[0].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[1].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[2].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[3].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[4].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[5].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[6].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[7].accessoriesName +
            '"},{"partsA":"' +
            anest.accessoriesList[8].accessoriesName +
            '","partsB":"' +
            anest.accessoriesList[9].accessoriesName +
            '"},';
          break;
      }
      data.jsonInformation =
        data.jsonInformation.slice(data.jsonInformation.length - 1) === ","
          ? data.jsonInformation.slice(0, -1)
          : data.jsonInformation;

      data.jsonInformation += "]";

      this.Identification00 = false;
      this.Identification01 = false;
      this.Identification02 = false;
      this.Identification03 = false;
      this.Identification04 = false;

      if (anest.useFrequency == "") {
        Toast("使用频率不能为空");
        this.Identification00 = true;
        return;
      }
      if (anest.mFrequency == "") {
        Toast("维护频率不能为空");
        this.Identification00 = true;
        return;
      }
      if (anest.mDepartment == "") {
        Toast("维护科室不能为空");
        this.Identification00 = true;
        return;
      }
      if (anest.set == "") {
        Toast("基础设定不能为空");
        this.Identification01 = true;
        return;
      }
      if (anest.jcProjects == "") {
        Toast("基础项目不能为空");
        this.Identification01 = true;
        return;
      }
      if (anest.tidalVolume == "") {
        Toast("潮气量检测不能为空");
        this.Identification01 = true;
        return;
      }
      if (anest.trigger == "") {
        Toast("触发功能检测不能为空");
        this.Identification01 = true;
        return;
      }
      if (anest.pressure == "") {
        Toast("压力报警检测不能为空");
        this.Identification01 = true;
        return;
      }
      if (anest.battery == "") {
        Toast("电池功能检测不能为空");
        this.Identification01 = true;
        return;
      }

      if (anest.AZW == "") {
        Toast("APL阀溢气值检测不能为空");
        this.Identification01 = true;
        return;
      }
      if (anest.bellowsSeal == "") {
        Toast("风箱密封检测不能为空");
        this.Identification01 = true;
        return;
      }

      if (anest.SZW == "") {
        Toast("手动机控转换检测不能为空");
        this.Identification01 = true;
        return;
      }
      if (anest.HZW == "") {
        Toast("回路气密检测不能为空");
        this.Identification01 = true;
        return;
      }
      if (anest.instructions == "") {
        Toast("情况说明不能为空");
        this.Identification01 = true;
        return;
      }

      if (anest.detectionConclusion == "") {
        Toast("检测结论不能为空");
        this.Identification01 = true;
        return;
      }
      if (anest.Productmaintenance == "") {
        Toast("产品维护保养逐项进行项目单不能为空");
        this.Identification02 = true;
        return;
      }
      if (anest.maintenanceResult == "") {
        Toast("维护保养结果不能为空");
        this.Identification02 = true;
        return;
      }
      if (anest.situation == "") {
        Toast("产品维修情况不能为空");
        this.Identification03 = true;
        return;
      }

      if (anest.accessoriesList[0].accessoriesName == "") {
        Toast("更换配件名称不能为空");
        this.Identification03 = true;
        return;
      }
      if (anest.other == "") {
        Toast("其他不能为空");
        this.Identification03 = true;
        return;
      }
      // if (this.anesthesia.sImg == "") {
      //   Toast("服务人员签名不能为空");
      //   this.Identification03 = true;
      //   return;
      // }
      if (anest.item == "") {
        Toast("工程师对规定项目栏内项目不能为空");
        this.Identification04 = true;
        return;
      }
      if (anest.engineerServiceLevel == "") {
        Toast("工程师的服务水平是否满意不能为空");
        this.Identification04 = true;
        return;
      }
      if (anest.productQuality == "") {
        Toast("产品质量综合评价是否满意不能为空");
        this.Identification04 = true;
        return;
      }

      if (anest.advice == "") {
        Toast("客户建议不能为空");
        this.Identification04 = true;
        return;
      }
      if (this.anesthesia.cImg == "") {
        Toast("客户签名不能为空");
        this.Identification04 = true;
        return;
      }
      if (anest.phone == "") {
        Toast("客户联系电话不能为空");
        this.Identification04 = true;
        return;
      }
      _this.isAjax(data, submission, data.jsonInformationlist); 

      let customeris = {
        id: data.customerId,
        useDepartment: data.useDepartment
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

    isAjax(data, submission, jsonInformationlist) {
      Indicator.open({
        text: "数据生成中，请稍后",
        spinnerType: "fading-circle"
      });
      this.$Axios
        .post(baseUrl + "/reportType/preview", data)
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

          if (response.data.code == 200) {
            if (submission == "提交") {
              _this
                .$confirm("提交后不能修改，确定提交吗？", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                .then(() => {
                  _this.tijiao(jsonInformationlist);
                })
                .catch(() => {
                  _this.$message({
                    type: "info",
                    message: "已取消"
                  });
                });
            } else {
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

    tijiao(jsonInformationlist) {
      let anest = this.anesthesiamac;

      let data = {
        Cpid: this.publicdata.Cpid,
        staffId: this.publicdata.staffId,
        staffName: this.publicdata.staffName,
        customerId:this.publicdata.customerId,
        userId: this.publicdata.userId,
        groupId: this.publicdata.groupId,
        serviceNumber: this.publicdata.serviceNumber,
        hospitalName: this.publicdata.HospitalName,
        useDepartment: this.publicdata.useDepartment,
        productModel: this.publicdata.model,
        machineNumber: this.publicdata.deviceId,
        installTime: this.publicdata.installDate, //安装时间
        useFrequency: anest.useFrequency, //使用频率
        mFrequency: anest.mFrequency, //// 维护频率
        mDepartment: anest.mDepartment, //维护科室
        set: anest.set, //基础设定
        jcProjects: anest.jcProjects,

        tidalVolume: anest.tidalVolume, //潮气量检测是否正常    boolean
        trigger: anest.trigger, //触发功能检测是否正常       boolean
        pressure: anest.pressure, //压力报警检测是否正常      boolean
        battery: anest.battery, //电池检测是否正常      boolean
        AZW: anest.AZW, //APL阀溢气值检测是否正常      boolean
        bellowsSeal: anest.bellowsSeal, //风箱密封检测是否正常      boolean
        SZW: anest.SZW, //手动机控转换检测是否正常      boolean
        HZW: anest.HZW, //回路气密检测      boolean
        instructions: anest.instructions, //情况说明      String
        detectionConclusion: "", //检测结论      String

        APL: "false", //APL阀功能检查是否已完成      boolean
        drainValve: "false", //排水阀清洁及检查是否已完成      boolean
        compaction: "false", //压紧装置功能检查是否已完成      boolean
        fastening: "false", //支脚和脚轮紧固检查是否已完成      boolean
        loop: "false", //回路压力表功能检查是否已完成      boolean
        traffic: "false", //流量计浮标及联动检查是否已完成      boolean
        conversion: "false", //转换开关模块功能检查是否已完成      boolean
        bellows: "false", //整机回路风箱表面清洁是否已完成      boolean
        evaporator: "false", //蒸发器度盘灵活度检查是否已完成      boolean
        aging: "false", //折叠囊密封圈老化检查是否已完成      boolean
        parallel: "false", //平行管及探头老化检查是否已完成      boolean
        corrugated: "false", //波纹管活瓣罩老化检查是否已完成      boolean

        maintenanceResult: anest.maintenanceResult, //维护保养确认结果      boolean

        situation: anest.situation, //产品维护情况      String

        jsonInformation: jsonInformationlist, //建议更换部件1      String
        other: anest.other, //// 其他      String
        sImg: "", //服务人员签名图片      String
        serviceWriteTime: anest.serviceWriteTime, //服务人员签名日期      String
        item: anest.item, //工程师对规定项目栏内项目是否逐一检查确认      boolean
        engineerServiceLevel: anest.engineerServiceLevel, //工程师的服务水平是否满意      boolean
        productQuality: anest.productQuality, //产品质量综合评价是否满意      boolean
        advice: anest.advice, //客户建议      String
        cImg: "", //客户签字图片      String
        phone: anest.phone //客户联系电话      String
      };

      data.sImg = this.anesthesia.sImg.replace("data:image/png;base64,", "");
      data.cImg = this.anesthesia.cImg.replace("data:image/png;base64,", "");

      if (anest.detectionConclusion == "true") {
        data.detectionConclusion = "各项参数正常，运行良好";
      } else {
        data.detectionConclusion = "停止使用，建议维修";
      }

      anest.Productmaintenance.forEach(function(value) {
        if (value == "APL阀功能检查") {
          data.APL = "true";
        } else if (value == "排水阀清洁及检查") {
          data.drainValve = "true";
        } else if (value == "压紧装置功能检查") {
          data.compaction = "true";
        } else if (value == "支脚和脚轮紧固检查") {
          data.fastening = "true";
        } else if (value == "回路压力表功能检查") {
          data.loop = "true";
        } else if (value == "流量计浮标及联动检查") {
          data.traffic = "true";
        } else if (value == "转换开关模块功能检查") {
          data.conversion = "true";
        } else if (value == "整机回路风箱表面清洁") {
          data.bellows = "true";
        } else if (value == "蒸发器度盘灵活度检查") {
          data.evaporator = "true";
        } else if (value == "折叠囊密封圈老化检查") {
          data.aging = "true";
        } else if (value == "平行管及探头老化检查") {
          data.parallel = "true";
        } else if (value == "波纹管活瓣罩老化检查") {
          data.corrugated = "true";
        }
      });

      Indicator.open({
        text: "数据提交中，请稍后",
        spinnerType: "fading-circle"
      });
      //提交  回访 麻醉机  工单签字
      this.$Axios
        .post(baseUrl + "/reportType/insertAnestheticData", data)
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
            _this.productArchives(data);
          }
        })
        .catch(function() {
          Indicator.close();
        });
    },

    //产品档案
    productArchives() {
      let Matchingdata = [];
      let Archivesdata = {};

      let listarray = this.publicdata.deviceId.split(","); //设备号
      let modelarray = this.publicdata.model.split(","); //机型
      for (let Archtiv = 0; Archtiv <= listarray.length - 1; Archtiv++) {
        Archivesdata = {
          province: this.publicdata.province, //省份，字典表
          customerId:this.publicdata.customerId,
          productLine: this.publicdata.productLine, //产品线，字典表
          model: modelarray[Archtiv], //产品型号
          installTime: "", //安装日期
          customer: this.publicdata.HospitalName, //客户
          productName: "", //产品名称
          productLevel: this.publicdata.customerLevel, //级别
          contacts: this.publicdata.contacts, //联系人
          phone: this.publicdata.phone, //联系方式
          dispatchingOrder: this.publicdata.assignId, //派工单号   ★★★★★
          deviceId: listarray[Archtiv], //序列号（设备号）
          installOne: this.publicdata.staffName, //安装人员
          department: this.publicdata.useDepartment, //科室
          applyType: "HF", //申请类型，字典表
          warrantyEndDate: "", //保修结束日期
          warrantyStartDate: "", //保修开始日期
          note: "", //备注        白玲修改      %%%%%
          city: this.publicdata.city //城市，字典表         %%%%%
        };

        if (
          this.publicdata.installDate == undefined ||
          this.publicdata.installDate == null
        ) {
          Archivesdata.installTime = "";
        } else {
          Archivesdata.installTime = this.publicdata.installDate;
        }

        for (
          let proname = 0;
          proname <= this.publicdata.productname.length - 1;
          proname++
        ) {
          if (
            this.publicdata.productname[proname].deviceId == listarray[Archtiv]
          ) {
            if (
              this.publicdata.productname[proname].guaranteeBeginDate ==
                undefined ||
              this.publicdata.productname[proname].guaranteeBeginDate == null
            ) {
              Archivesdata.warrantyEndDate = "";
            } else {
              Archivesdata.warrantyEndDate = this.publicdata.productname[
                proname
              ].guaranteeBeginDate;
            }

            if (
              this.publicdata.productname[proname].guaranteeEndDate ==
                undefined ||
              this.publicdata.productname[proname].guaranteeEndDate == null
            ) {
              Archivesdata.warrantyStartDate = "";
            } else {
              Archivesdata.warrantyStartDate = this.publicdata.productname[
                proname
              ].guaranteeEndDate;
            }

            Archivesdata.installOne = this.publicdata.productname[
              proname
            ].installer;
            Archivesdata.warrantyEndDate = this.publicdata.productname[
              proname
            ].guaranteeBeginDate;
            Archivesdata.warrantyStartDate = this.publicdata.productname[
              proname
            ].guaranteeEndDate;
            Archivesdata.productName = this.publicdata.productname[
              proname
            ].product;
          }
        }
        Matchingdata.push(Archivesdata);
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
            _this.$emit("change", { btnid: 1, box: 0 });
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
        id: data.Cpid,
        staffId: data.staffId,
        staffName: data.staffName,
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
        .catch(function() {
          Indicator.close();
        });
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
    }
  }
};
</script>
<style>
.xiongmao011 .mint-badge.is-size-small {
  border-radius: 0.25rem;
  line-height: 0.35rem;
  height: 0.35rem;
  font-size: 0.28rem;
  float: right;
  margin: 0.28rem 0.6rem;
}
.xiongmao011 .mint-checkbox-input:checked + .mint-checkbox-core {
  background-color: #998bd6;
  border-color: #998bd6;
}

.xiongmao011 .mint-checklist .mint-cell .mint-checkbox-label {
  font-size: 0.26rem;
}
.xiongmao011 .mint-checklist .mint-cell .mint-checkbox-core {
  width: 0.3rem;
  height: 0.3rem;
}
.xiongmao011 .mint-checkbox-core::after {
  top: 0.7px;
  left: 4.2px;
}

.xiongmao011 .mint-radio-input:checked + .mint-radio-core {
  background-color: #998bd6;
  border-color: #998bd6;
}
.xiongmao011 .mint-radio-core {
  width: 13.5px;
  height: 13.9px;
}
.xiongmao011 .mint-radio-core::after {
  top: 3px;
  left: 3px;
  width: 6px;
  height: 6px;
}

.xiongmao011 .mint-radio-label {
  font-size: 0.26rem;
}
.xiongmao011 .mint-radio-input:checked + .mint-radio-core:after {
  transform: scale(0) !important;
}

.xiongmao011 .el-message-box {
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

.main li input.left {
  height: 0.89rem;
  line-height: 0.89rem;
  width: 4.7rem;
  padding-left: 0.2rem;
  color: #323232;
  font-size: 0.28rem;
  display: inline-block;
  position: initial;
  background: border-box;
  text-align: left;
  border-right: 1px #f2f2f2 solid;
}
.main li input.right {
  height: 0.89rem;
  line-height: 0.89rem;
  padding-left: 0.2rem;
  width: 1.8rem;
  color: #323232;
  font-size: 0.28rem;
  display: inline-block;
  position: initial;
  background: border-box;
  text-align: left;
}
.main li input.text {
  height: 0.89rem;
  line-height: 0.89rem;
  width: 6.7rem;
  padding-left: 0.2rem;
  color: #323232;
  font-size: 0.28rem;
  display: inline-block;
  position: initial;
  background: border-box;
  text-align: left;
  border-bottom: 1px #f2f2f2 solid;
}

.main .btn_icon {
  width: 6.92rem;
  height: 1.03rem;
}
.main .btn_icon i {
  position: inherit;
  float: right;
  display: block;
  width: 0.47rem;
  height: 0.47rem;
  background: url("../../assets/icon_plus.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 0.29rem;
}
.main .btn_icon .icon_minus {
  background: url("../../assets/icon_minus.png") no-repeat;
  background-size: 100% 100%;
  margin-left: 0.16rem;
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
</style>


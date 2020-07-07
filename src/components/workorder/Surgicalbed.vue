<template>
  <div class="xiongmao006">
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
        </li>
        <li>
          <p>维护频率 -次/周</p>
          <input type="text" v-model="anesthesiamac.mFrequency" />
        </li>
        <li>
          <p>维护科室</p>
          <input type="text" v-model="anesthesiamac.mDepartment" />
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
          <i></i>
        </li>
        <li>
          <!-- <p>基础项目</p> -->
          <textarea placeholder="基础项目" maxlength="200" v-model="anesthesiamac.jcProjects"></textarea>
        </li>
        <li>
          <p>床体升降</p>
          <mt-radio v-model="anesthesiamac.lift" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>腰桥抬升</p>
          <mt-radio v-model="anesthesiamac.waistBridge" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>

        <li>
          <p>背板上折</p>
          <mt-radio v-model="anesthesiamac.bsw" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>床体前倾</p>
          <mt-radio v-model="anesthesiamac.qw" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>

        <li>
          <p>头板上折</p>
          <mt-radio v-model="anesthesiamac.tsw" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>背板下折</p>
          <mt-radio v-model="anesthesiamac.bxw" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>床体后倾</p>
          <mt-radio v-model="anesthesiamac.hqw" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>头板下折</p>
          <mt-radio v-model="anesthesiamac.txw" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>

        <li>
          <p>台面凹凸情况</p>
          <mt-radio v-model="anesthesiamac.atw" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>床体左倾</p>
          <mt-radio v-model="anesthesiamac.czw" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>腿板分叉</p>
          <mt-radio v-model="anesthesiamac.tfw" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>床垫状况</p>
          <mt-radio v-model="anesthesiamac.cdw" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>床体右倾</p>
          <mt-radio v-model="anesthesiamac.cyw" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>腿板下折</p>
          <mt-radio v-model="anesthesiamac.tbw" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>手持控制器</p>
          <mt-radio v-model="anesthesiamac.scw" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>床体锁死</p>
          <mt-radio v-model="anesthesiamac.csw" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>头腿板互换</p>
          <mt-radio v-model="anesthesiamac.ttw" :options="list1" align="left"></mt-radio>
          <i class="ac"></i>
        </li>
        <li>
          <p>辅助控制器</p>
          <mt-radio v-model="anesthesiamac.fzw" :options="list1" align="left"></mt-radio>
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
              :options="['设备清洁擦拭','液压油渗漏情况检查','熔断器检查','电源线检查','蓄电池状态检查','附件检查']"
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
          <img v-show="surgical.sImg" :src="surgical.sImg" alt class="magin_t" />
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
          <i></i>
        </li>
        <li>
          <p>工程师的服务水平是否满意</p>
          <mt-radio v-model="anesthesiamac.engineerServiceLevel" :options="list3" align="left"></mt-radio>
          <i></i>
        </li>
        <li>
          <p>产品质量综合评价是否满意</p>
          <mt-radio v-model="anesthesiamac.productQuality" :options="list3" align="left"></mt-radio>

          <i></i>
        </li>
        <li>
          <textarea placeholder="客户建议" maxlength="110" v-model="anesthesiamac.advice"></textarea>
        </li>
        <li @click="shouxie(1)">
          <p>客户签名</p>
          <img v-show="surgical.cImg" :src="surgical.cImg" alt class="magin_t" />
          <i class="ac"></i>
        </li>
        <li>
          <p>联系电话</p>
          <input type="text" v-model="anesthesiamac.phone" maxlength="11" />
          <i></i>
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

    <div class="sendbtn mt" :class="{isbtnac:publicdata.isstatus}" @click="yulan">预览</div>
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
import baseUrl from "../../api/baseUrl.js";

import baseImg from "../../api/BASEImg.js";
import baseUrlxiazai from "../../api/baseUrlxiazai.js";
import axios from "axios";
import baseImgtu from "./pdf";
import { Toast, Indicator } from "mint-ui";
import Cookie from "../../api/cookie.js";

var _this;
var nowYear;
var nowMonth;
var nowDay;
import pdf from "vue-pdf";

import TimeComponent from "./TimeComponent";

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
    surgical: Object,
    department: Array
  },
  components: {
    pdf,
    TimeComponent,
    baseImgtu
  },
  data() {
    return {
      baseUrl: baseImg,
      baseUrlxiazai: baseUrlxiazai,
      xiazaiUrl: "",
      Identification00: false,
      Identification01: false,
      Identification02: false,
      Identification03: false,
      Identification04: false,
      basetuImg: "",
      hg_ac_bool: "hg_ac00",
      hg_ac_bool01: "hg_ac00",
      clientSignature: this.$route.query.src,

      yulanShow: false,
      pdfImg: "",
      numPages: [], //pdf分页

      multiple: true,
      formDate: "",

      signatureShow: false,

      value1: [],
      value2: [],

      anesthesiamac: {
        Cpid: this.publicdata.Cpid,
        userId: this.publicdata.userId,
        groupId: this.publicdata.groupId,
        report: "呼吸机回访",
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
        jcProjects: "", //基础设定

        // tidalVolume: "", //潮气量检测是否正常    boolean

        lift: "", //床体升降是否正常       boolean
        waistBridge: "", //腰桥抬升是否正常      boolean
        bsw: "", //背板上折是否正常      boolean
        qw: "", //床体前倾是否正常      boolean
        tsw: "", // 头板上折是否正常      boolean
        bxw: "", //背板下折是否正常      boolean
        hqw: "", //床体后倾是否正常      boolean
        txw: "", //头板下折是否正常      String
        atw: "", //体面凹凸是否正常      String
        czw: "", //床体左倾是否正常      String
        tfw: "", //腿板分叉是否正常      String
        cdw: "", //床垫状况是否正常      String
        cyw: "", //床体右倾是否正常      String
        tbw: "", //腿板下折是否正常      String
        scw: "", //手持控制器是否正常      String
        csw: "", //床体锁死是否正常      String
        ttw: "", //头腿板互换是否正常      String
        fzw: "", //辅助控制器是否正常      String

        instructions: "", //情况说明      String
        detectionConclusion: "", //检测结论      String

        Productmaintenance: [], //产品维修保养

        equipment: "", //设备清洁擦拭      boolean
        oil: "", //液压油渗漏情况检查      boolean
        fuse: "", //熔断器检查      boolean
        powerCord: "", //电源线检查      boolean
        battery: "", //蓄电池状态检查      boolean
        attachment: "", //附件检查      boolean

        maintenanceResult: "", //维护保养确认结果      String

        situation: "", //产品维护情况      String

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

    // if (
    //   this.$store.state.repairorder.signPic != null &&
    //   this.$store.state.repairorder.signPic != "" &&
    //   this.$store.state.repairorder.signPic != undefined
    // ) {
    //   this.basetuImg =
    //     "http://39.105.157.251:9997" + this.$store.state.repairorder.signPic;
    // }
  },
  methods: {
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
    //签字
    shouxie(n) {
      this.$emit("change", { btnid: 0, box: "", name: "手术床", id: n });
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
                  _this.tijiao(jsonInformationlist);
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

    yulan(submission) {
      var anest = this.anesthesiamac;
      var islist = [
        { name: anest.useFrequency, content: "使用频率", idn: 0 },
        { name: anest.mFrequency, content: "维护频率", idn: 0 },
        { name: anest.mDepartment, content: "维护科室", idn: 0 },
        { name: anest.set, content: "基础设定", idn: 1 },
        { name: anest.jcProjects, content: "基础项目", idn: 1 },

        { name: anest.lift, content: "床体升降", idn: 1 },
        { name: anest.waistBridge, content: "腰桥抬升是否", idn: 1 },
        { name: anest.bsw, content: "背板上折", idn: 1 },
        { name: anest.qw, content: "床体前倾", idn: 1 },
        { name: anest.tsw, content: "头板上折", idn: 1 },
        { name: anest.bxw, content: "背板下折", idn: 1 },
        { name: anest.hqw, content: "床体后倾", idn: 1 },
        { name: anest.txw, content: "头板下折", idn: 1 },
        { name: anest.atw, content: "台面凹凸", idn: 1 },
        { name: anest.czw, content: "床体左倾", idn: 1 },

        { name: anest.tfw, content: "腿板分叉", idn: 1 },
        { name: anest.cdw, content: "床垫状况", idn: 1 },
        { name: anest.cyw, content: "床体右倾", idn: 1 },
        { name: anest.tbw, content: "腿板下折", idn: 1 },
        { name: anest.scw, content: "手持控制器", idn: 1 },
        { name: anest.csw, content: "床体锁死", idn: 1 },
        { name: anest.ttw, content: "头腿板互换", idn: 1 },
        { name: anest.fzw, content: "辅助控制器", idn: 1 },
        { name: anest.instructions, content: "情况说明", idn: 1 },
        { name: anest.detectionConclusion, content: "检测结论", idn: 1 },
        {
          name: anest.Productmaintenance,
          content: "产品维护保养逐项进行项目单",
          idn: 2
        },
        { name: anest.maintenanceResult, content: "维护保养结果", idn: 2 },
        { name: anest.situation, content: "产品维修情况", idn: 3 },
        {
          name: anest.accessoriesList[0].accessoriesName,
          content: "更换配件名称",

          idn: 3
        },
        { name: anest.other, content: "其他", idn: 3 },
        // { name: this.surgical.sImg, content: "服务人员签名", idn: 3 },
        { name: anest.item, content: "工程师对规定项目栏内项目", idn: 4 },
        {
          name: anest.engineerServiceLevel,
          content: "工程师的服务水平是否满意",
          idn: 4
        },
        {
          name: anest.productQuality,
          content: "产品质量综合评价是否满意",
          idn: 4
        },
        { name: anest.advice, content: "客户建议", idn: 4 },
        { name: this.surgical.cImg, content: "客户签名", idn: 4 },
        { name: anest.phone, content: "客户联系电话", idn: 4 }
      ];
      this.Identification00 = false;
      this.Identification01 = false;
      this.Identification02 = false;
      this.Identification03 = false;
      this.Identification04 = false;
      for (var islistnum = 0; islistnum <= islist.length - 1; islistnum++) {
        if (islist[islistnum].name == "") {
          Toast(islist[islistnum].content + "不能为空");

          if (islist[islistnum].idn == 0) {
            this.Identification00 = true;
          }
          if (islist[islistnum].idn == 1) {
            this.Identification01 = true;
          }
          if (islist[islistnum].idn == 2) {
            this.Identification02 = true;
          }
          if (islist[islistnum].idn == 3) {
            this.Identification03 = true;
          }
          if (islist[islistnum].idn == 4) {
            this.Identification04 = true;
          }
          return;
        }
      }

      var data = {
        staffId: this.publicdata.staffId,
        groupId: this.publicdata.groupId,
        customerId: this.publicdata.customerId,
        report: "手术床回访",
        serviceNumber: this.publicdata.serviceNumber,
        HospitalName: this.publicdata.HospitalName,
        useDepartment: this.publicdata.useDepartment,
        productModel: Cookie.StringConversion(this.publicdata.model,19),
        machineNumber:  Cookie.StringConversion(this.publicdata.deviceId,26),
        installTime: this.publicdata.installDate,

        useFrequency: anest.useFrequency,
        mFrequency: anest.mFrequency,
        mDepartment: anest.mDepartment,
        set: anest.set,
        jcProjects: anest.jcProjects,

        CSZ: "□", //床体升降   正常
        CSG: "□", //潮气量检测    故障

        YQZ: "□", //腰桥抬升    正常
        YQG: "□", //腰桥抬升    故障

        BSZ: "□", //背板上折    正常
        BSG: "□", //背板上折    故障

        QZ: "□", //床体前倾    正常
        QG: "□", //床体前倾    故障

        TSZ: "□", //头板上折    正常
        TSG: "□", //头板上折    故障

        BXZ: "□", //背板下折    正常
        BXG: "□", //背板下折    故障

        HZ: "□", //床体后倾    正常
        HG: "□", //床体后倾    故障

        TXZ: "□", //头板下折    正常
        TXG: "□", //头板下折    故障

        ATZ: "□", //台面凹凸情况    正常
        ATG: "□", //台面凹凸情况    故障

        ZZ: "□", //床体左倾    正常
        ZG: "□", //床体左倾    故障

        TFZ: "□", //腿板分叉    正常
        TFG: "□", //腿板分叉    故障

        CDZ: "□", //床垫状况    正常
        CDG: "□", //床垫状况    故障

        YZ: "□", //床体右倾    正常
        YG: "□", //床体右倾    故障

        TBZ: "□", //腿板下折    正常
        TBG: "□", //腿板下折    故障

        KZZ: "□", //手持控制器    正常
        KZG: "□", //手持控制器    故障

        TZ: "□", //床体锁死    正常
        TG: "□", //床体锁死    故障

        TTZ: "□", //头腿板互换    正常
        TTG: "□", //头腿板互换    故障

        FZZ: "□", //辅助控制器    正常
        FZG: "□", //辅助控制器    故障

        instructions: anest.instructions, //情况说明
        good: "□", //检测结论    各项参数正常，运行良好
        stop: "□", //检测结论   停止使用，建议维修

        equipment: "□", //设备清洁擦拭
        oil: "□", //液压油渗漏情况检查
        fuse: "□", //熔断器检查

        powerCord: "□", //电源线检查
        battery: "□", //蓄电池状态检查
        attachment: "□", //附件检查

        //------------------------------------------
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

      if (anest.lift == "true") {
        data.CSZ = "■"; //床体升降   正常
      } else {
        data.CSG = "■"; //床体升降    故障
      }
      if (anest.waistBridge == "true") {
        data.YQZ = "■"; //腰桥抬升是否   正常
      } else {
        data.YQG = "■"; //腰桥抬升是否    故障
      }
      if (anest.bsw == "true") {
        data.BSZ = "■"; //背板上折   正常
      } else {
        data.BSG = "■"; //背板上折    故障
      }
      if (anest.qw == "true") {
        data.QZ = "■"; //床体前倾是否正常   正常
      } else {
        data.QG = "■"; //床体前倾是否正常    故障
      }
      if (anest.tsw == "true") {
        data.TSZ = "■"; //头板上折是否正常   正常
      } else {
        data.TSG = "■"; //头板上折是否正常    故障
      }
      if (anest.bxw == "true") {
        data.BXZ = "■"; //背板下折是否正常   正常
      } else {
        data.BXG = "■"; //背板下折是否正常    故障
      }
      if (anest.hqw == "true") {
        data.HZ = "■"; //床体后倾是否正常   正常
      } else {
        data.HG = "■"; //床体后倾是否正常    故障
      }
      if (anest.txw == "true") {
        data.TXZ = "■"; //头板下折是否正常   正常
      } else {
        data.TXG = "■"; //头板下折是否正常    故障
      }
      if (anest.atw == "true") {
        data.ATZ = "■"; //台面凹凸是否正常   正常
      } else {
        data.ATG = "■"; //台面凹凸是否正常    故障
      }
      if (anest.czw == "true") {
        data.ZZ = "■"; //床体左倾是否正常   正常
      } else {
        data.ZG = "■"; //床体左倾是否正常    故障
      }
      if (anest.tfw == "true") {
        data.TFZ = "■"; //腿板分叉是否正常   正常
      } else {
        data.TFG = "■"; //腿板分叉是否正常    故障
      }
      if (anest.cdw == "true") {
        data.CDZ = "■"; //床垫状况是否正常   正常
      } else {
        data.CDG = "■"; //床垫状况是否正常    故障
      }
      if (anest.cyw == "true") {
        data.YZ = "■"; //床体右倾是否正常   正常
      } else {
        data.YG = "■"; //床体右倾是否正常    故障
      }
      if (anest.tbw == "true") {
        data.TBZ = "■"; //腿板下折是否正常   正常
      } else {
        data.TBG = "■"; //腿板下折是否正常    故障
      }
      if (anest.scw == "true") {
        data.KZZ = "■"; //手持控制器是否正常   正常
      } else {
        data.KZG = "■"; //手持控制器是否正常    故障
      }
      if (anest.csw == "true") {
        data.TZ = "■"; //床体锁死是否正常   正常
      } else {
        data.TG = "■"; //床体锁死是否正常    故障
      }
      if (anest.ttw == "true") {
        data.TTZ = "■"; //头腿板互换   正常
      } else {
        data.TTG = "■"; //头腿板互换    故障
      }
      if (anest.fzw == "true") {
        data.FZZ = "■"; //辅助控制器   正常
      } else {
        data.FZG = "■"; //辅助控制器    故障
      }

      if (anest.detectionConclusion == "true") {
        data.good = "■"; //检测结论   正常
      } else {
        data.stop = "■"; //检测结论    故障
      }
      anest.Productmaintenance.forEach(function(value) {
        if (value == "设备清洁擦拭") {
          data.equipment = "■";
        } else if (value == "液压油渗漏情况检查") {
          data.oil = "■";
        } else if (value == "熔断器检查") {
          data.fuse = "■";
        } else if (value == "电源线检查") {
          data.powerCord = "■";
        } else if (value == "蓄电池状态检查") {
          data.battery = "■";
        } else if (value == "附件检查") {
          data.attachment = "■";
        }
      });

      if (anest.maintenanceResult == "状态良好") {
        data.SG = "■";
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

      data.sImg = this.surgical.sImg.replace("data:image/png;base64,", "");
      data.cImg = this.surgical.cImg.replace("data:image/png;base64,", "");

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
    tijiao(jsonInformationlist) {
      let anest = this.anesthesiamac;
      let data = {
        Cpid: this.publicdata.Cpid,
        staffId: this.publicdata.staffId,
        staffName: this.publicdata.staffName,

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

        lift: anest.lift, //床体升降是否正常       boolean
        waistBridge: anest.waistBridge, //腰桥抬升是否正常      boolean
        bsw: anest.bsw, //背板上折是否正常      boolean
        qw: anest.qw, //床体前倾是否正常      boolean
        tsw: anest.tsw, // 头板上折是否正常      boolean
        bxw: anest.bxw, //背板下折是否正常      boolean
        hqw: anest.hqw, //床体后倾是否正常      boolean
        txw: anest.txw, //头板下折是否正常      String
        atw: anest.atw, //体面凹凸是否正常      String
        czw: anest.czw, //床体左倾是否正常      String
        tfw: anest.tfw, //腿板分叉是否正常      String
        cdw: anest.cdw, //床垫状况是否正常      String
        cyw: anest.cyw, //床体右倾是否正常      String
        tbw: anest.tbw, //腿板下折是否正常      String
        scw: anest.scw, //手持控制器是否正常      String
        csw: anest.csw, //床体锁死是否正常      String
        ttw: anest.ttw, //头腿板互换是否正常      String
        fzw: anest.fzw, //辅助控制器是否正常      String

        instructions: anest.instructions, //情况说明      String
        detectionConclusion: "", //检测结论      String

        equipment: "false", //设备清洁擦拭      boolean
        oil: "false", //液压油渗漏情况检查      boolean
        fuse: "false", //熔断器检查      boolean
        powerCord: "false", //电源线检查      boolean
        battery: "false", //蓄电池状态检查      boolean
        attachment: "false", //附件检查      boolean

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

      data.sImg = this.surgical.sImg.replace("data:image/png;base64,", "");
      data.cImg = this.surgical.cImg.replace("data:image/png;base64,", "");

      if (anest.detectionConclusion == "true") {
        data.detectionConclusion = "各项参数正常，运行良好";
      } else {
        data.detectionConclusion = "停止使用，建议维修";
      }

      anest.Productmaintenance.forEach(function(value) {
        if (value == "设备清洁擦拭") {
          data.equipment = "true";
        } else if (value == "液压油渗漏情况检查") {
          data.oil = "true";
        } else if (value == "熔断器检查") {
          data.fuse = "true";
        } else if (value == "电源线检查") {
          data.powerCord = "true";
        } else if (value == "蓄电池状态检查") {
          data.battery = "true";
        } else if (value == "附件检查") {
          data.attachment = "true";
        }
      });
      Indicator.open({
        text: "数据提交中，请稍后",
        spinnerType: "fading-circle"
      });

      //提交  回访 麻醉机  工单签字
      this.$Axios
        .post(baseUrl + "/reportType/insertSurgicalData", data)
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
          installOne: "", //安装人员
          department: this.publicdata.department, //科室
          applyType: "HF", //申请类型，字典表
          warrantyEndDate: "", //保修结束日期
          warrantyStartDate: "", //保修开始日期
          note: "", //备注              %%%%%
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
            _this.$emit("change", { btnid: 1, box: 2 });
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
            _this.$router.push({
              path: "/orderlist"
            });
          }
        })
        .catch(function() {
          Indicator.close();
        });
    }
  }
};
</script>
<style>
.xiongmao006 .mint-badge.is-size-small {
  border-radius: 0.25rem;
  line-height: 0.35rem;
  height: 0.35rem;
  font-size: 0.28rem;
  float: right;
  margin: 0.28rem 0.6rem;
}
.xiongmao006 .mint-checkbox-input:checked + .mint-checkbox-core {
  background-color: #998bd6;
  border-color: #998bd6;
}

.xiongmao006 .mint-checklist .mint-cell .mint-checkbox-label {
  font-size: 0.26rem;
}
.xiongmao006 .mint-checklist .mint-cell .mint-checkbox-core {
  width: 0.3rem;
  height: 0.3rem;
}
.xiongmao006 .mint-checkbox-core::after {
  top: 0.7px;
  left: 4.2px;
}

.xiongmao006 .mint-radio-input:checked + .mint-radio-core {
  background-color: #998bd6;
  border-color: #998bd6;
}
.xiongmao006 .mint-radio-core {
  width: 13.5px;
  height: 13.9px;
}
.xiongmao006 .mint-radio-core::after {
  top: 3px;
  left: 3px;
  width: 6px;
  height: 6px;
}
.xiongmao006 .mint-radio-label {
  font-size: 0.26rem;
}

.xiongmao006 .mint-radio-input:checked + .mint-radio-core:after {
  transform: scale(0) !important;
}
.xiongmao006 .el-message-box {
  width: 5rem;
}
</style>

<style scoped>
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
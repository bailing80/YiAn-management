<template>
  <div class="box">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">确认报修</p>
    </div>
    <div class="lstis">
      <ul v-for="(orderlist,orderIndex) in this.$store.state.ClassList" :key="orderIndex">
        <li>
          <em>序列号</em>
          <div class="xuhao">
            <ol>
              <li v-for="(number,numberIndex) in orderlist.list" :key="numberIndex">{{number.name}}</li>
            </ol>
          </div>
        </li>
        <li>
          <em>产品线</em>
          <i>{{orderlist.productLine}}</i>
        </li>
        <li>
          <em>机型</em>
          <i style="line-height: 0.9rem;height:.9rem">
            <em
              style="font-style: normal;"
              v-for="(mode,modenum) in  orderlist.models"
              :key="modenum"
            >{{mode.name}}</em>
          </i>
        </li>
        <li v-show="boloso">
          <em>故障类型</em>
          <i>{{orderlist.type}}</i>
        </li>
        <li v-show="boloso">
          <em>故障描述</em>
          <p>{{orderlist.content}}</p>
        </li>
        <!-- <li>
          物料编码
          <i>{{orderlist.coding}}</i>
        </li>-->
      </ul>
      <ul v-show="userType=='01'">
        <li>
          申请类型
          <i>{{this.$store.state.letter.user.application}}</i>
        </li>
        <li>
          客户名称
          <i>{{this.$store.state.letter.user.hospital_name}}</i>
        </li>

        <li>
          联系人姓名
          <i>{{this.$store.state.letter.user.name}}</i>
        </li>
        <li>
          联系人电话
          <i>{{this.$store.state.letter.user.phone}}</i>
        </li>
        <li>
          联系人职务
          <i>{{this.$store.state.letter.user.position}}</i>
        </li>
        <li>
          预约时间
          <i>{{this.$store.state.letter.user.time}}</i>
        </li>
      </ul>
      <ul v-show="userType=='02'">
        <li>
          客户名称
          <i>{{this.$store.state.letter.user.channel_name}}</i>
        </li>

        <li>
          联系人姓名
          <i>{{this.$store.state.letter.user.contacts_name}}</i>
        </li>
        <li>
          联系人电话
          <i>{{this.$store.state.letter.user.phone}}</i>
        </li>
        <li>
          联系人职务
          <i>{{this.$store.state.letter.user.position}}</i>
        </li>
        <li>
          预约时间
          <i>{{this.$store.state.letter.user.time}}</i>
        </li>
      </ul>
      <ul v-show="userType=='03'">
        <li>
          联系人姓名
          <i>{{this.$store.state.letter.user.name}}</i>
        </li>
        <li>
          联系人电话
          <i>{{this.$store.state.letter.user.phone}}</i>
        </li>
        <!-- <li>
          联系人职务
          <i>{{this.$store.state.letter.user.position}}</i>
        </li>-->
      </ul>
    </div>

    <div
      style="font-size:.24rem;color:red;text-align: center;margin: .2rem 0;  "
      v-show="this.$store.state.letter.user.application == '维修'"
    >附带机器故障图片，最多上传三张故障图片，且大小不能超过8M</div>
    <div style="margin:.4rem .4rem" v-show="this.$store.state.letter.user.application == '维修'">
      <el-upload
        :multiple="multiple"
        :headers="{token:token}"
        :action="baseUrl1+'/upload/image'"
        list-type="picture-card"
        :on-remove="handleRemove"
        :on-change="fileChange"
        :on-success="uploadFileSuccess"
        :before-upload="uploadBeforeCheck"
        :on-error="errorimg"
        :on-exceed="exceedAstrict"
        ref="upload"
        :limit="3"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <!-- <el-button @click="subPicForm">提交上传</el-button> -->
    </div>

    <div v-show="this.$store.state.letter.user.application == '维修'">
      <!-- action必选参数, 上传的地址 -->
      <el-upload
        class="avatar-uploader el-upload--text"
        :action="baseUrl1+'/upload/image'"
        :headers="{token:token}"
        accept="video/mp4, video/ogg, video/flv, video/avi, video/wmv, video/rmvb"
        :show-file-list="false"
        :file-list="vidoList"
        :on-success="handleVideoSuccess"
        :before-upload="beforeUploadVideo"
        :on-progress="uploadVideoProcess"
        :on-error="errorimg1"
        :limit="3"
      >
        <video
          style="width: 7.5rem;height:5rem"
          v-if="form.videoUrl !='' && videoFlag == false"
          :src="baseUrl1+form.videoUrl"
          class="avatar"
          controls="controls"
        >您的浏览器不支持视频播放</video>

        <el-button
          style="margin-left:.4rem"
          v-else-if="form.videoUrl =='' && videoFlag == false"
          slot="trigger"
          size="small"
          type="primary"
        >选取视频文件</el-button>
        <el-progress
          v-if="videoFlag == true"
          type="circle"
          :percentage="videoUploadPercent"
          style="margin-top:30px;"
        ></el-progress>
      </el-upload>
      <div
        v-if="form.videoUrl !=''"
        @click="delVideo"
        style="    margin-left: 0.4rem;
    display: block;
    height: .3rem;
    line-height: .3rem;
    font-size: .244rem;
    width: 1.75rem;
    padding: .2rem .3rem;
    text-align: center;
    color: #9889da;
    background: #fff;
    border-radius: 0.1rem;"
      >移除视频</div>
    </div>

    <div class="sendbtn rb" @click="istijao">提交</div>
  </div>
</template>

<script>
import Cookie from "../../api/cookie.js";
import { Toast, MessageBox, Indicator } from "mint-ui";

import baseUrl from "../../api/baseUrl.js";
import BASEImg from "../../api/BASEImg.js";
import baseUrlimg from "../../api/baseUrlxiazai.js";
import axios from "axios";
import { all } from "q";

var _this;
export default {
  name: "repair",
  data() {
    return {
      // 视频列表
      vidoList: [],
      videoFlag: false,
      baseUrlimg: baseUrlimg,
      BASEImg: BASEImg,
      baseUrl1: baseUrl,
      token: Cookie.getCookie("token"),
      // 上传进度
      videoUploadPercent: 0,
      // 表单数据
      form: {
        videoUrl: "",
        picUrls: ""
      },

      userType: "01",
      boloso: false,

      multiple: true,
      formDate: "",
      listimg: [],
      listvideo: [],
      istosend: false,

      imgURLList: [],
      tuImg: "",
      isChange: false,

      ClassList: []
    };
  },
  created() {
    _this = this;
    var type = "";
    if (Cookie.getCookie("avatar") == "0") {
      this.userType = "01";
      type = "POSITION";
    } else if (Cookie.getCookie("avatar") == "1") {
      this.userType = "02";
      type = "CHANNEL_POSITION";
    } else if (Cookie.getCookie("avatar") == "3") {
      this.userType = "03";
    }

    var storage = window.localStorage;
    this.$store.state.ClassList = JSON.parse(storage.getItem("ClassList"));
    let isScan = storage.getItem("isScan");
    let arr = JSON.parse(storage.getItem("setApplicationType")); //维修类型

    this.$store.state.letter.user.application = arr.name;
    this.$store.state.letter.user.applicationid = arr.id;
    this.$store.state.letter.user.time = arr.time;

    if (this.$store.state.letter.user.application == "维修") {
      this.boloso = true;
    }

    this.$store.commit("getCookieUser");

    var storage = window.localStorage;
    this.ClassList = JSON.parse(storage.getItem("ClassList"));
  },

  methods: {
    toback() {
      this.$router.replace({
        path: "/prorepair"
      });
    },
    // -----------------------------------------------

    uploadBeforeCheck(file) {
      // 验证上传的图片格式及大小
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt3M = file.size / 1024 / 1024 < 10;

      if (!isJPG && !isPNG) {
        Toast({
          message: "图片仅支持 jpg、png 格式，且大小不超过 8M",
          duration: 1000
        });
      }
      if (!isLt3M) {
        Toast({
          message: "图片大小不能超过 8MB",
          duration: 1000
        });
      }
      return (isJPG || isPNG) && isLt3M;
    },
    //上传失败
    errorimg(err, file, fileList) {
      this.$message.warning("上传失败!");
    },
    // 图片超出限制
    exceedAstrict() {
      this.$message.warning("最多只能上传3张图片哦!");
    },

    //移除图片
    handleRemove(file, fileList) {
      this.form.picUrls = "";
      for (let i = 0; i <= fileList.length - 1; i++) {
        this.form.picUrls += fileList[i].response.data[0] + ",";
      }
    },
    //验证图片格式
    fileChange(file, fileList) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (
        file.name.lastIndexOf(".jpeg") == -1 &&
        file.name.lastIndexOf(".jpg") == -1 &&
        file.name.lastIndexOf(".png") == -1
      ) {
        this.$message.error("请上传正确的图片格式哦!");
        return false;
      }
      if (!isLt10M) {
        this.$message.error("上传图片大小不能超过10MB哦!");
        return false;
      }
    },
    // 上传图片
    uploadFileSuccess(response, file, fileList) {
      this.form.picUrls += response.data[0] + ",";
    },

    // 视频上传失败
    errorimg1() {
      Indicator.close();
      this.form.videoUrl == "";
      this.videoFlag = false;
      this.$message.warning("上传失败!");
    },

    // 视频上传成功
    handleVideoSuccess(res, file, fileList) {
      //获取上传图片地址
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      Indicator.close();
      if (res.code == 200) {
        this.form.videoUrl = res.data[0];
        this.videoFlag = false;
        this.vidoList = [];
      } else {
        this.$message.error("视频上传失败，请重新上传！");
        return false;
      }
    },
    // 验证上传视频文件
    beforeUploadVideo(file) {
      const isLt50M = file.size / 1024 / 1024 < 50;
      // if (
      //   [
      //     "video/mp4",
      //     "video/ogg",
      //     "video/flv",
      //     "video/avi",
      //     "video/wmv",
      //     "video/rmvb"
      //   ].indexOf(file.type) == -1
      // ) {
      //   this.$message.error("请上传正确的视频格式哦!");
      //   return false;
      // }
      if (!isLt50M) {
        this.$message.error("上传视频大小不能超过50MB哦!");
        return false;
      }
      Indicator.open({
        text: "视频上传中，请稍后",
        spinnerType: "fading-circle"
      });
    },
    // 上传进度显示
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = Number(file.percentage.toFixed(0));
    },

    // 移除当前视频
    delVideo() {
      this.form.videoUrl = "";
      this.vidoList = [];
    },

    // ------------------------------------------------
    //判断设备号是否被提交
    istijao() {
      var paramList = [];
      var arr = {};
      var sol = this.$store.state.letter.user;
      var slo = this.$store.state.ClassList;

      for (
        let numlist = 0;
        numlist <= this.$store.state.ClassList.length - 1;
        numlist++
      ) {
        if (Cookie.getCookie("avatar") == "0") {
          arr = {
            deviceId: "",
            customerName: sol.hospital_name,
            customerLevel: this.$store.state.letter.history.customer_level, //医院等级
            contacts: sol.name, //联系人
            owner: "0", //0客户  1员工（无字典表，直接写死）
            phone: sol.phone,
            position: sol.position_id, //职位
            productLine: slo[numlist].productLine_id,
            model: "", //设备机型
            materielCode: slo[numlist].coding, //物料编码
            faultDescribe: slo[numlist].content, //故障描述（报修原因）
            faultType: slo[numlist].type_id, //故障类型id
            applyType: sol.applicationid,
            userId: sol.user_id,
            zipCode: this.$store.state.letter.history.zip_code, //邮编
            address: this.$store.state.letter.history.address, //地址
            department: sol.department_id, //科室
            useDepartment: this.$store.state.letter.history.use_department, //使用科室
            appointmentDate: this.$store.state.letter.user.time // 预约时间
          };
        }
        //设备号
        for (
          let listnum = 0;
          listnum <= this.$store.state.ClassList[numlist].list.length - 1;
          listnum++
        ) {
          if (listnum == this.$store.state.ClassList[numlist].list.length - 1) {
            arr.deviceId += this.$store.state.ClassList[numlist].list[
              listnum
            ].name;
          } else {
            arr.deviceId +=
              this.$store.state.ClassList[numlist].list[listnum].name + ",";
          }
        }
        //机型
        for (
          let modelist = 0;
          modelist <= this.$store.state.ClassList[numlist].models.length - 1;
          modelist++
        ) {
          if (
            modelist ==
            this.$store.state.ClassList[numlist].models.length - 1
          ) {
            arr.model += this.$store.state.ClassList[numlist].models[
              modelist
            ].name;
          } else {
            arr.model +=
              this.$store.state.ClassList[numlist].models[modelist].name + ",";
          }
        }

        if (this.$store.state.ClassList[numlist].models == "") {
          Toast({
            message: "设备机型不能为空",
            duration: 1000
          });
          return;
        }
        if (this.$store.state.ClassList[numlist].list == "") {
          Toast({
            message: "序列号不能为空",
            duration: 1000
          });
        }

        paramList.push(arr);
      }

      Indicator.open({
        text: "数据提交中，请稍后",
        spinnerType: "fading-circle"
      });

      //判断设备号是否 提报过了
      this.$Axios
        .post(baseUrl + "/applyJob/checkDeviceExis", paramList)
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

          if (response.data.code == -100) {
            Toast({
              message: response.data.data.message,
              duration: 1000
            });
            Indicator.close();
          }

          if (response.data.code == 200) {
            _this.tijiao();
          }
        })
        .catch(function(error) {});
    },

    //提交数据
    tijiao() {
      var paramList = [];
      var arr = {};
      var sol = this.$store.state.letter.user;
      var slo = this.$store.state.ClassList;

      for (
        let numlist = 0;
        numlist <= this.$store.state.ClassList.length - 1;
        numlist++
      ) {
        if (Cookie.getCookie("avatar") == "0") {
          arr = {
            deviceId: "",
            customerName: sol.hospital_name,
            customerId: this.$store.state.letter.history.customerId, //医院等级
            customerLevel: this.$store.state.letter.history.customer_level, //医院等级

            contacts: sol.name, //联系人
            owner: "0", //0客户  1员工（无字典表，直接写死）
            phone: sol.phone,
            position: sol.position_id, //职位
            productLine: slo[numlist].productLine_id,
            model: "", //设备机型
            materielCode: slo[numlist].coding, //物料编码
            faultDescribe: slo[numlist].content, //故障描述（报修原因）
            faultType: slo[numlist].type_id, //故障类型id
            applyType: sol.applicationid, //申请类型
            userId: sol.user_id,
            department: sol.department_id, //科室
            appointmentDate: this.$store.state.letter.user.time, // 预约时间
            useDepartment: this.$store.state.letter.history.use_department, //使用科室

            zipCode: this.$store.state.letter.history.zip_code, //邮编
            address: this.$store.state.letter.history.address, //地址
            image: this.form.picUrls, //
            video: this.form.videoUrl //视频
          };
        }
        //视频
        for (
          let lislivideo = 0;
          lislivideo <= this.listvideo.length - 1;
          lislivideo++
        ) {
          arr.video = this.listvideo[lislivideo];
        }

        for (
          let listnum = 0;
          listnum <= this.$store.state.ClassList[numlist].list.length - 1;
          listnum++
        ) {
          if (listnum == this.$store.state.ClassList[numlist].list.length - 1) {
            arr.deviceId += this.$store.state.ClassList[numlist].list[
              listnum
            ].name;
          } else {
            arr.deviceId +=
              this.$store.state.ClassList[numlist].list[listnum].name + ",";
          }
        }

        for (
          let modelist = 0;
          modelist <= this.$store.state.ClassList[numlist].models.length - 1;
          modelist++
        ) {
          if (
            modelist ==
            this.$store.state.ClassList[numlist].models.length - 1
          ) {
            arr.model += this.$store.state.ClassList[numlist].models[
              modelist
            ].name;
          } else {
            arr.model +=
              this.$store.state.ClassList[numlist].models[modelist].name + ",";
          }
        }
        paramList.push(arr);
      }

      this.$Axios
        .post(baseUrl + "/applyJob/productRepair", paramList)
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

          if (response.data.code == 200) {
            _this.Monitoringoperation(response.data.data.groupId);

            let storage = window.localStorage;

            let ClassList = [
              {
                list: [], //设备号数组
                shebeihao_class: "", //输入时的设备号
                productLine: "", //产品线
                productLine_id: "", //产品线id
                title: "", //
                models: [], //机型
                type: "", //类型
                type_id: "", //类型id
                content: "", //描述
                coding: "" //  物料编码
              }
            ];
            let arr1 = {
              name: "",
              id: "",
              time: ""
            };

            storage.setItem("setApplicationType", JSON.stringify(arr1));
            storage.setItem("ClassList", JSON.stringify(ClassList));

            Toast({
              message: "提报成功",
              duration: 1000
            });
            _this.$store.state.ClassList = [
              {
                list: [], //设备号数组
                shebeihao_class: "", //输入时的设备号
                productLine: "", //产品线
                productLine_id: "", //产品线id
                title: "", //
                models: [], //机型
                type: "", //类型
                type_id: "", //类型id
                content: "", //描述
                coding: "" //  物料编码
              }
            ];
            //预约时间
            _this.$store.state.letter.user.time = "";
            _this.$store.state.letter.user.application = "";
            _this.$store.state.letter.user.applicationid = "";

            _this.$router.replace({
              path: "/progress"
            });
          } else {
            Toast({
              message: response.data.data.message,
              duration: 1000
            });

            return;
          }
        })
        .catch(function(error) {
          Indicator.close();
        });
    },
    Monitoringoperation(issta) {
      let url = baseUrl + "/applyJob/addApplyRecord";
      let pagt = {
        groupId: issta, //添加派工单历史记录   必填
        name: Cookie.getCookie("name"), //操作人姓名   姓名
        type: "医院用户", //操作人类型   员工   还是管理员
        operation: "提报工单", //具体操作  审核  ，  撤销 ，  通过    派单
        operationRemarks: "", //操作备注
        examine: "", //审核是否通过
        examineRemarks: "" //审核备注
      };

      _this.$Axios
        .post(url, pagt)
        .then(function(response) {})
        .catch(function() {});
    }
  },
  beforeMount() {
    Indicator.close();
  }
};
</script>
<style scoped>
.lstis ul {
  margin-bottom: 0.16rem;
}
.lstis ul li {
  width: 7.16rem;
  background: #fff;
  font-size: 0.28rem;
  color: #000;
  line-height: 0.97rem;
  padding-left: 0.34rem;
  border-bottom: 0.01rem #e8e8e8 solid;
}
.lstis ul li i {
  float: right;
  margin-right: 0.5rem;
  width: 4.3rem;
  text-align: right;
  overflow: hidden;
  height: 0.9rem;
}
.lstis ul li em {
  display: inline-block;
  vertical-align: top;
  font-style: normal;
}
.lstis ul li p {
  width: 5.2rem;
  line-height: 0.5rem;
  /* padding-bottom: 0.3rem; */
  word-wrap: break-word;
  color: #999;
  display: inline-block;
  vertical-align: top;
  margin-left: 0.3rem;
  margin-top: 0.2rem;
  text-align: right
}

.rb {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.lstis .xuhao {
  margin-bottom: 0.2rem;
}
.lstis .xuhao ol li {
  max-width: 5rem;
  height: 0.49rem;
  line-height: 0.49rem;
  padding: 0 0.55rem 0 0.2rem;
  border: 1px #999999 solid;
  border-radius: 0.25rem;
  font-size: 0.24rem;
  color: #998bd6;
  display: inline-block;
  vertical-align: top;
  margin: 0.22rem 0 0 0.4rem;
  position: relative;
}
.lstis .xuhao ol li span {
  display: block;
  width: 0.26rem;
  height: 0.26rem;
  background: url("../../assets/cha.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0.13rem;
  right: 0.25rem;
}

.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>


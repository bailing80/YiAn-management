<template>
  <div style="position:relative" class="xiongxiong12">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">确认报修</p>
    </div>
    <ul class="main">
      <li>
        <p>申请类型：{{this.$store.state.repairorder.ApplicationType}}</p>
      </li>
       <li>
        <p>客户名称：{{this.$route.query.customerName}}</p>
        <!-- <i></i> -->
      </li>
      <li>
        <p>产品线：{{this.$route.query.productLine}}</p>
        <!-- <i></i> -->
      </li>
     <li>
        <p>型号：{{this.$route.query.model}}</p>
        <!-- <i></i> -->
      </li>
      <li>
        <span>联系人：{{this.$store.state.repairorder.contact}}</span>
      </li>
      <li>
        <span>电话：{{this.$store.state.repairorder.contactPhone}}</span>
      </li>

      <li v-show="isyuangong">
        <p>服务内容：{{this.$store.state.repairorder.serviceContent}}</p>
      </li>
      <li v-show="isyuangong">
        <p>员工编号：{{this.$store.state.repairorder.repaiNameshow}}</p>
      </li>
      <li v-show="isyuangong">
        <p>员工名称：{{this.$store.state.repairorder.repaiName}}</p>
      </li>
      <li>
        <p>时间：{{this.$store.state.repairorder.time}}</p>
      </li>
    </ul>
    <div v-show="this.$store.state.repairorder.ApplicationType =='维修'">
      <div v-show="this.$store.state.repairorder.image !=''">
        <img
          v-for=" (imgname,index) in  imgdatelist"
          :key="index"
          :src="baseUrl1+imgname.imgname"
          style="  width: 2.6rem;
    margin: 0.4rem;
    height: 2.6rem;
    display: inline-block;
    vertical-align: top;"
        />
      </div>
      <video
        style="width: 7.5rem;height:5rem;margin-bottom: .5rem;"
        v-if="this.$store.state.repairorder.video !='' && this.$store.state.repairorder.video != undefined  "
        :src="baseUrl1+this.$store.state.repairorder.video "
        class="avatar"
        controls="controls"
      >您的浏览器不支持视频播放</video>
    </div>

    <div class="sendbtn mb1" @click="issend">提交</div>
    <!-- <div class="sendbtn mb1" @click="updataCustomer">提交</div> -->
  </div>
</template>

<script>
import baseUrl from "../api/baseUrl.js";
import baseUrlimg from "../api/baseUrlxiazai.js";
import { Toast, MessageBox, Indicator } from "mint-ui";
import Cookie from "../api/cookie.js";

import axios from "axios";

var _this;
export default {
  data() {
    return {
      // 上传进度
      videoUploadPercent: 0,
      imgdatelist: [], //
      baseUrlimg: baseUrlimg,
      baseUrl1: baseUrl,
      // 表单数据
      form: {
        videoUrl: "",
        picUrls: ""
      },

      multiple: true,
      formDate: "",

      DeviceNumber: "", //设备号
      accessories: "", //配件名称
      MaterialCode: "", //物料编号
      solution: "", //解决方法
      serviceContent: "", //服务内容
      repairWhy: "", //报修原因
      isAjax: false,

      imgURLList: [],

      tuImg: "",
      isChange: false,
      tuImg: "",
      isChange: false,

      time_bool: false,
      content: "",
      bool: false,
      bool01: 0,

      isyuangong: true,
      isyuangong1: true, //不是个人才显示
      isyuangong2: false, //不是个人才显示

      title: "",

      slots: [
        {
          flex: 1,
          values: [],
          className: "slots",
          textAlign: "center"
        }
      ],
      //级别
      customerLevels: [],
      Customer: {
        id: "",
        // customerName: "",
        // customerLevel: "",
        contacts: "",
        phone: "",
        productLine:"",
        model:"",
        serviceContent:""
        // contactList: []
      }
    };
  },
  created() {
   
    _this = this;
    this.DeviceNumber = this.$store.state.repairorder.DeviceNumber;
    this.MaterialCode = this.$store.state.repairorder.MaterialCode;
    this.accessories = this.$store.state.repairorder.accessories;
    this.bool01 = this.$store.state.repairorder.isshifu;
    this.solution = this.$store.state.repairorder.solution;
    this.serviceContent = this.$store.state.repairorder.serviceContent;
    this.repairWhy = this.$store.state.repairorder.repairWhy;

    if (Cookie.getCookie("avatar") == 2) {
      //员工
      this.isyuangong = true;
      this.isyuangong1 = true;
      this.isyuangong2 = true;
      
    } else if (Cookie.getCookie("avatar") == "1") {
      //渠道
      this.isyuangong = false;
      this.isyuangong1 = true;
    } else if (Cookie.getCookie("avatar") == "3") {
      //个人
      this.isyuangong = false;
      this.isyuangong1 = false;
      this.isyuangong2 = false;
    }
    //获取缓存里的 产品   ClassList  对象
    var storage = window.localStorage;
    let arr = JSON.parse(storage.getItem("setApplicationType")); //维修类型
    this.$store.state.repairorder.ApplicationType = arr.name;
    this.$store.state.repairorder.ApplicationType_id = arr.id;

    let data = JSON.parse(storage.getItem("staffClassList"));
    this.$store.state.repairorder.customerId = data.customerId;
    this.$store.state.repairorder.ClassList = data.ClassList;
    this.$store.state.repairorder.proID = data.proID;
    this.$store.state.repairorder.productLine_id = data.productLine_id;
    this.$store.state.repairorder.productLine = data.productLine;
    this.$store.state.repairorder.model = data.model;
    this.$store.state.repairorder.DeviceType = data.DeviceType;
    this.$store.state.repairorder.contact = data.contact;
    this.$store.state.repairorder.contactPhone = data.contactPhone;
    this.$store.state.repairorder.level = data.level;
    this.$store.state.repairorder.customer_level = data.customer_level;
    this.$store.state.repairorder.name = data.name;
    this.$store.state.repairorder.customer_code = data.customer_code;
    this.$store.state.repairorder.address = data.address;
    this.$store.state.repairorder.country = data.country;
    this.$store.state.repairorder.city = data.city;
    this.$store.state.repairorder.customer_level_id = data.customer_level_id;
    this.$store.state.repairorder.customer_service_level =
      data.customer_service_level;
    this.$store.state.repairorder.zip_code = data.zip_code;
    this.$store.state.repairorder.use_department = data.use_department;
    this.$store.state.repairorder.customerType = data.customerType;

    this.$store.state.repairorder.modelNumber = data.modelNumber;
    this.$store.state.repairorder.modelNumber_id = data.modelNumber_id;

    this.$store.state.repairorder.solution = data.solution; //解决方法
    this.$store.state.repairorder.serviceContent = data.serviceContent; //服务内容
    this.$store.state.repairorder.repairWhy = data.repairWhy; //报修原因
    this.solution = data.solution;
    this.serviceContent = data.serviceContent;
    this.repairWhy = data.repairWhy;
    this.MaterialCode = data.MaterialCode;
    this.accessories = data.accessories;
    this.bool01 = data.isshifu;

    this.$store.state.repairorder.contactPhone = data.contactPhone;

    // accessories
    this.imgdatelist = [];
    let dataaa = this.$store.state.repairorder.image;

    dataaa =
      dataaa.slice(dataaa.length - 1) === "," ? dataaa.slice(0, -1) : dataaa;
    //图片遍历对象
    let datiimg = dataaa.split(",");
    //图片遍历对象
    for (let iimg = 0; iimg <= datiimg.length - 1; iimg++) {
      this.imgdatelist.push({
        imgname: datiimg[iimg].replace("undefined", "")
      });
    }
  },
  mounted() {
    //类型查找
    this.typelist();
  },
  methods: {
    //级别类型
    
    typelist() {
      this.$Axios
        .post(
          baseUrl +
            "/dicCode/queryAdminDicByType?type=DEPARTMENT,USERTYPE,PROVINCE,CUSTOMER_SERVICE_LEVEL,CUSTOMER_TYPE,CUSTOMER_LEVEL,COUNTRY,CITY"
        )
        .then(res => {
         
           let data = JSON.parse(res.data);
          console.log("222100"+res.data)
          console.log("22282100"+res.data.productLine)
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
          if (res.data.code == 200) {
            // // 获取所有客户类型
            // this.userTypes = res.data.data.USERTYPE;
            // // 获取所有科室
            // this.departments = res.data.data.DEPARTMENT;
            // // 获取所有客户服务等级
            // this.customerServiceLevels = res.data.data.CUSTOMER_SERVICE_LEVEL;
            // // 获取所有终端客户类型
            // this.customerTypes = res.data.data.CUSTOMER_TYPE;
            // 获取所有终端客户级别
            this.productLine =res.data.data.productLine;
            //this.customerLevels = res.data.data.CUSTOMER_LEVEL;
            // // 获取所有国家
            // this.countrys = res.data.data.COUNTRY;
            // // 获取所有省份
            // this.provinces = res.data.data.PROVINCE;
            // // 获取所有城市
            // this.citys = res.data.data.CITY;
          }
        })
        // .catch(() => {
        //   Toast({
        //     message: "网络开小差了，请稍后重试",
        //     duration: 1000
        //   });
        // });
    },
    toback() {
      if (Cookie.getCookie("avatar") == 2) {
        this.$router.push({ path: "/repairorder-zhuanxiang" });
      } else if (Cookie.getCookie("avatar") == "1") {
        this.$router.push({ path: "/repairorder-zhuanxiang" });
      } else if (Cookie.getCookie("avatar") == "3") {
        this.$router.push({ path: "/repairorder-zhuanxiang" });
      }
    },

    // //文件上传 --------------------------------------------------
    // // 修改客户信息
    // updataCustomer() {
    //   var storage = window.localStorage;
    //   let data = JSON.parse(storage.getItem("staffClassList"));
    //   this.Customer.contactList = [];
    //   if (data.contactList.length - 1 != 0) {
    //     for (let i = 0; i < data.contactList.length; i++) {
    //       this.Customer.contactList.push({
    //         contacts: data.contactList[i].contacts,
    //         phone: data.contactList[i].phone
    //       });
    //     }
    //   }
      
    //  // this.Customer.id = data.customerId;
    //   this.Customer.contacts = data.contact;
    //  // this.Customer.customerLevel = data.customer_level_id;
    //   //this.Customer.customerName = data.name;
    //   this.Customer.phone = data.contactPhone;
    //   this.Customer.productLine =data.productLine;
    //   this.Customer.serviceContent =data.serviceContent;
      

    //   if (data.newid != undefined && data.newid != "") {
    //     this.Customer.id = data.newid;
    //   }
    //   this.$Axios
    //     .post(baseUrl + "/customerAdmin/updCustomerInfoById", this.Customer)
    //     .then(res => {
    //       if (res.data.code == 200) {
    //         if (data.newid != undefined && data.newid != "") {
    //           let deviceIDList = [];

    //           for (
    //             let ix = 0;
    //             ix < this.$store.state.repairorder.ClassList.length;
    //             ix++
    //           ) {
    //             deviceIDList.push(
    //               this.$store.state.repairorder.ClassList[ix].name
    //             );
    //           }


    //           this.$Axios
    //             .post(baseUrl + "/productArchives/updateArchivesCustomer", {
    //               customerId: data.newid,
    //               deviceIDList: deviceIDList
    //             })
    //             .then(res1 => {
    //               if (res1.data.code == 200) {

    //                 this.send();
    //               }
    //             })
    //             .catch(() => {
    //               Toast({
    //                 message: "网络开小差了，请稍后重试",
    //                 duration: 1000
    //               });
    //             });
    //         } else {
    //           this.send();
    //         }
    //       }
    //     })
    //     .catch(() => {
    //       Toast({
    //         message: "网络开小差了，请稍后重试",
    //         duration: 1000
    //       });
    //     });
    // },

    //判断设备号是否提交过
    issend() {
      if (this.$store.state.repairorder.ApplicationType == "") {
        Toast("申请类型不能为空");
        return;
      }
      // if (this.$store.state.repairorder.ClassList.length - 1 < 0) {
      //   Toast("序列号不能为空");
      //   return;
      // }
      // if (this.$store.state.repairorder.productLine == "") {
      //   Toast("产品线不能为空");
      //   return;
      // }

      if (this.$store.state.repairorder.ApplicationType == "维修") {
        if (this.$store.state.repairorder.modelNumber_id == "") {
          Toast("故障类型不能为空");
          return;
        }
      }
      // if (Cookie.getCookie("avatar") != "3") {
      //   if (this.$store.state.repairorder.name == "") {
      //     Toast("客户名称不能为空");
      //     return;
      //   }
      //   if (
      //     this.$store.state.repairorder.customer_level_id == "" ||
      //     this.$store.state.repairorder.customer_level_id == null
      //   ) {
      //     Toast("终端客户级别不能为空");
      //     return;
      //   }
      // }

// if (this.$store.state.repairorder.model == "") {
//         Toast("型号不能为空");
//         return;
//       }
//     if (this.$route.query.name == "") {
//         Toast("客户名称不能为空");
//         return;
//       }
     if (this.$store.state.repairorder.serviceContent == "") {
        Toast("服务内容不能为空");
        return;
      }

      if (this.$store.state.repairorder.contact == "") {
        Toast("联系人不能为空");
        return;
      }
      if (this.$store.state.repairorder.contactPhone == "") {
        Toast("联系人电话不能为空");
        return;
      }
      if (this.bool01 == 1) {
        if (this.accessories == "" || this.accessories == undefined) {
          Toast("配件名称不能为空");
          return;
        }
        if (this.MaterialCode == "" || this.MaterialCode == undefined) {
          Toast("物料编号不能为空");
          return;
        }
      }
      if (this.$store.state.repairorder.ApplicationType == "维修") {
        if (
          this.$store.state.repairorder.repairWhy == "" ||
          this.$store.state.repairorder.repairWhy == undefined
        ) {
          Toast("报修原因不能为空");
          return;
        }

        if (
          this.$store.state.repairorder.serviceContent == "" ||
          this.$store.state.repairorder.serviceContent == undefined
        ) {
          Toast("服务内容不能为空");
          return;
        }
      }

      if (this.isAjax) return;
      this.isAjax = true;
      var repairorder = this.$store.state.repairorder;

      var data = {
        deviceId: "", //设备号
        customerId: repairorder.customerId, //客户id
        customerName: repairorder.name, //客户名称  （）医院名称
        customerLevel: repairorder.customer_level_id, //医院等级
        contacts: repairorder.contact, //联系人
        owner: "1", //0客户  1员工（无字典表，直接写死）
        phone: repairorder.contactPhone,
        
        productLine: repairorder.productLine_id,
        model:  repairorder.model, //设备机型
        accessories: repairorder.accessories, //物料编码
        materielCode: repairorder.MaterialCode, //物料编码
        faultDescribe: repairorder.repairWhy, //故障描述（报修原因）
        faultType: repairorder.modelNumber_id, //故障类型id
        applyType: repairorder.ApplicationType_id, //申请类型   WX  AZ
        department: repairorder.use_department, //科室
        appointmentDate: repairorder.time, // 预约时间
        isParts: repairorder.isshifu, //是否更换配件
        staffId: repairorder.repairorderId, //员工ID
        staffName: repairorder.repaiName, //员工名称
        serviceContent: repairorder.serviceContent, //服务内容
        resolvent: repairorder.solution, //解决方法
        address: repairorder.address, //客户地址
        zipCode: repairorder.zip_code, //邮编
        useDepartment: repairorder.use_department, //使用科室
        priority: "0", //默认值 0  优先级
        image: _this.$store.state.repairorder.image, //
        video: _this.$store.state.repairorder.video //视频
      };
      if (Cookie.getCookie("avatar") != "2") {
        data.owner = "0";
      }

      for (
        let listnum = 0;
        listnum <= repairorder.ClassList.length - 1;
        listnum++
      ) {
        if (repairorder.ClassList.length - 1 == 0) {
          data.deviceId += repairorder.ClassList[listnum].name;
          data.model += repairorder.DeviceType[listnum].name;
        } else if (repairorder.ClassList.length - 1 == listnum) {
          data.deviceId += repairorder.ClassList[listnum].name;
          data.model += repairorder.DeviceType[listnum].name;
        } else {
          data.deviceId += repairorder.ClassList[listnum].name + ",";
          data.model += repairorder.DeviceType[listnum].name + ",";
        }
      }

      this.$Axios
        .post(baseUrl + "/applyJob/checkDeviceExis", [data])
        .then(function(response) {
          _this.isAjax = false;

          if (response.data.code == -100) {
            Toast({
              message: response.data.data.message,
              duration: 1000
            });
          }

          if (response.data.code == 200) {
           _this.send();
          }
        })
        .catch(function(error) {
          _this.isAjax = false;

          Toast({
            message: error,
            duration: 1000
          });
        });
    },

    //提交数据
    send() {
      if (this.isAjax) return;
      this.isAjax = true;
      var repairorder = this.$store.state.repairorder;

      let owner = "0";
      if (Cookie.getCookie("avatar") == 2) {
        owner = "1";
      }

      if (
        this.$store.state.repairorder.image != "" &&
        this.$store.state.repairorder.image != null &&
        this.$store.state.repairorder.image != undefined
      ) {
        this.$store.state.repairorder.image =
          this.$store.state.repairorder.image.slice(
            this.$store.state.repairorder.image.length - 1
          ) === ","
            ? this.$store.state.repairorder.image.slice(0, -1)
            : this.$store.state.repairorder.image;
      }
      
      var data = {
        userId: "",
        deviceId: "", //设备号
        customerId: repairorder.customerId, //客户id
        customerName: this.$route.query.customerName, //客户名称  （）医院名称
        customerId: this.$route.query.customerId,
        customerLevel: repairorder.customer_level_id, //医院等级
        contacts: repairorder.contact, //联系人
        owner: owner, //0客户  1员工（无字典表，直接写死）
        phone: repairorder.contactPhone,
        // productLineId:this.$route.query.productLineId,
        productLine: this.$route.query.productLineId,//白玲改
        model: this.$route.query.model, //设备机型
        materielCode: repairorder.MaterialCode, //物料编码
        faultDescribe: repairorder.repairWhy, //故障描述（报修原因）
        faultType: repairorder.modelNumber_id, //故障类型id
        applyType: repairorder.ApplicationType_id, //申请类型   WX  AZ
        department: repairorder.use_department, //科室
        appointmentDate: repairorder.time, // 预约时间
        isParts: repairorder.isshifu,
        staffId: repairorder.repairorderId, //员工ID
        staffName: repairorder.repaiName, //员工名称
        serviceContent: repairorder.serviceContent, //服务内容
        resolvent: repairorder.solution, //解决方法
        address: repairorder.address, //客户地址
        zipCode: repairorder.zip_code, //邮编
        useDepartment: repairorder.use_department, //使用科室
        priority: "0", //默认值 0  优先级

        image: _this.$store.state.repairorder.image, //
        video: _this.$store.state.repairorder.video //视频
      };
      if (Cookie.getCookie("avatar") != "2") {
        data.owner = "0";
        data.userId = Cookie.getCookie("userId");
      }
      for (
        let listnum = 0;
        listnum <= repairorder.ClassList.length - 1;
        listnum++
      ) {
        if (repairorder.ClassList.length - 1 == 0) {
          data.deviceId += repairorder.ClassList[listnum].name;
          data.model += repairorder.DeviceType[listnum].name;
        } else if (repairorder.ClassList.length - 1 == listnum) {
          data.deviceId += repairorder.ClassList[listnum].name;
          data.model += repairorder.DeviceType[listnum].name;
        } else {
          data.deviceId += repairorder.ClassList[listnum].name + ",";
          data.model += repairorder.DeviceType[listnum].name + ",";
        }
      }
      // console.log(data);
      // return;
      this.$Axios
        .post(baseUrl + "/applyJob/productRepair", [data])
        .then(function(response) {
          _this.Monitoringoperation(response.data.data.groupId);
          _this.isAjax = false;

          if (response.data.code == 200) {
            let storage = window.localStorage;
            _this.solution = "";
            _this.serviceContent = "";
            _this.repairWhy = "";
            _this.accessories = "";
            _this.MaterialCode = "";
            _this.bool01 = 0;
            _this.DeviceNumber = "";
            _this.$store.state.repairorder.ApplicationType = "";
            _this.$store.state.repairorder.productLine = "";
            _this.$store.state.repairorder.model = "";
            _this.$store.state.repairorder.productLine_id = "";
            _this.$store.state.repairorder.ClassList = [];
            _this.$store.state.repairorder.DeviceType = [];
            _this.$store.state.repairorder.modelNumber = "";
            _this.$store.state.repairorder.MaterialCode = "";
            _this.$store.state.repairorder.repairWhy = "";
            _this.$store.state.repairorder.modelNumber_id = "";
            _this.$store.state.repairorder.ApplicationType_id = "";
            _this.$store.state.repairorder.isshifu = "";
            _this.$store.state.repairorder.serviceContent = "";
            _this.$store.state.repairorder.solution = "";
            _this.$store.state.repairorder.proID = "";
            _this.$store.state.repairorder.contact = ""; //联系人
            _this.$store.state.repairorder.contactPhone = ""; //联系人电话
            _this.$store.state.repairorder.level = ""; //级别
            _this.$store.state.repairorder.customerId = ""; //id
            _this.$store.state.repairorder.name = ""; //客户名称  （医院名称）
            _this.$store.state.repairorder.customer_code = ""; //客户编码
            _this.$store.state.repairorder.address = ""; //地址
            _this.$store.state.repairorder.country = ""; // 国家
            _this.$store.state.repairorder.city = ""; //城市
            _this.$store.state.repairorder.province = ""; // 省份
            _this.$store.state.repairorder.customer_level_id = ""; //代理级别
            _this.$store.state.repairorder.customer_service_level = ""; //客户服务等级
            _this.$store.state.repairorder.address = ""; //地址
            _this.$store.state.repairorder.zip_code = ""; //邮编
            _this.$store.state.repairorder.use_department = ""; //使用科室
            _this.$store.state.repairorder.customerType = ""; //客户类型
            _this.$store.state.repairorder.customer_level = "";
            _this.$store.state.repairorder.video = "";
            _this.$store.state.repairorder.image = "";

            let staffClassList = {
              model:"",
              productLine:"",
              serviceContent:"",
              customerId: "",
              proID: "",
              productLine_id: "",
              ClassList: [],
              DeviceType: [],
              contact: "", //联系人
              contactPhone: "", //联系人电话
              level: "", //级别
              customer_level: "", //医院等级
              name: "", //客户名称  （医院名称）
              customer_code: "", //客户编码
              address: "", //地址
              country: "", //国家
              city: "", ///城市
              province: "", ///省份
              customer_level_id: "", ////代理级别
              customer_service_level: "", //客户服务等级
              zip_code: "", //邮编
              use_department: "", //使用科室
              customerType: "", ///客户类型
              modelNumber: "", //故障类型
              modelNumber_id: "", //故障类型id
              solution: "", //故障类型id
              serviceContent: "", //故障类型id
              repairWhy: "", //故障类型id
              MaterialCode: "", //故障类型id
              DeviceNumber: "",
              accessories: "", //故障类型id
              isshifu: 0,
              contactList:"",
            };
            let arr = {
              name: "",
              id: ""
            };
            _this.$store.state.repairorder.ApplicationType = "";
            _this.$store.state.repairorder.ApplicationType_id = "";
            storage.setItem("setApplicationType", JSON.stringify(arr));
            storage.setItem("staffClassList", JSON.stringify(staffClassList));

            Toast({
              message: "提报成功",
              duration: 1000
            });
            if (Cookie.getCookie("avatar") == 2) {
              _this.$router.push({
                path: "/orderlist"
              
              });
            } else if (Cookie.getCookie("avatar") == "1") {
              _this.$router.push({ path: "/progress" });
            } else if (Cookie.getCookie("avatar") == "3") {
              _this.$router.push({ path: "/progress" });
            }
          } else {
            Toast({
              message: response.data.data.message,
              duration: 1000
            });
          }
        })
        .catch(function(error) {
          _this.isAjax = false;
          Toast({
            message: error,
            duration: 1000
          });
        });
    },

    Monitoringoperation(issta) {
      let url = baseUrl + "/applyJob/addApplyRecord";
      let pagt = {
        groupId: issta, //添加派工单历史记录   必填
        name: "", //操作人姓名   姓名
        type: "", //操作人类型   员工   还是管理员
        operation: "提报工单", //具体操作  审核  ，  撤销 ，  通过    派单
        operationRemarks: "", //操作备注
        examine: "", //审核是否通过
        examineRemarks: "" //审核备注
      };
      if (Cookie.getCookie("avatar") == 2) {
        pagt.name = this.$store.state.repairorder.repaiName;
        pagt.type = "员工";
      } else if (Cookie.getCookie("avatar") == "1") {
        pagt.name = Cookie.getCookie("contactsName");
        pagt.type = "渠道用户";
      } else if (Cookie.getCookie("avatar") == "3") {
        pagt.name = Cookie.getCookie("name");
        pagt.type = "家庭用户";
      }

      this.$Axios
        .post(url, pagt)
        .then(function() {})
        .catch(function() {});
    }
  }
};
</script>
<style >
.xiongxiong12 .el-select > .el-input {
  height: 0.84rem;
}
.xiongxiong12 .el-select {
  vertical-align: top;
  margin-top: 0.15rem;
}
.xiongxiong12 .el-select .el-input .el-select__caret {
  height: 0.85rem;
  vertical-align: top;
}
.xiongxiong12 .el-select .el-input .is-reverse {
  height: 0.65rem;
  vertical-align: top;
}
</style>
<style scoped>
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
  font-size: 0.34rem;
  color: #26a2ff;
  position: absolute;
  top: 0.3rem;
  right: 0;
}
.slots_list .span1 {
  left: 0;
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

.main li {
  width: 7.5rem;
  /* height: 1.15rem; */
  line-height: 1.16rem;
  background: #fff;
  position: relative;
  margin-bottom: 0.02em;
}
.main li input {
  height: 1.14rem;
  width: 5.1rem;
  color: #919191;
  background: border-box;
}
.main li input::-webkit-input-placeholder {
  color: #919191;
}
.main li p {
  margin-left: 0.35rem;
  height: 1.14rem;
  width: 6.7rem;
  color: #919191;
  font-size: 0.28rem;
}
.main li u {
  display: block;
  vertical-align: top;
  margin-left: 0.35rem;
  width: 1.3rem;
  color: #919191;
  font-size: 0.28rem;
}

.main li s {
  display: inline-block;
  vertical-align: top;
  margin-left: 0.35rem;
  line-height: 0.34rem;
  width: 5.5rem;
  color: #919191;
  font-size: 0.28rem;
  word-wrap: break-word;
  text-decoration: none;
  line-height: 0.4rem;
  margin: 0.35rem 0 0.2rem;
}

.main li i {
  position: absolute;
  top: 0.45rem;
  right: 0.35rem;
  color: #acacac;
  font-style: normal;
  width: 0.17rem;
  height: 0.28rem;
  background: url("../assets/arrow_r.png") no-repeat;
  background-size: 100% 100%;
}
.main li span {
  display: inline-block;
  height: 1.14rem;
  line-height: 1.14rem;
  vertical-align: top;
  font-size: 0.28rem;
  color: #919191;
  margin-left: 0.35rem;
}
.main li u {
  display: inline-block;
  vertical-align: top;
}
.main li textarea {
  width: 6.6rem;
  height: 1.28rem;
  line-height: 0.32rem;
  margin: 0.27rem 0 0.38rem 0.35rem;
  font-size: 0.28rem;
  line-height: 0.32rem;
  color: #919191;
}
.main li textarea::-webkit-input-placeholder {
  color: #969696;
  font-size: 0.26rem;

  font-weight: 600;
}

.baoxiuyuanyin {
  width: 6.4rem;
  height: 1.28rem;
  line-height: 0.32rem;
  margin: 0.17rem 0 0.38rem 0.35rem;
  font-size: 0.28rem;
  line-height: 0.32rem;
  padding: 0.2rem;
  color: #919191;
}
.mb {
  height: 1rem;
  width: 7.5rem;
}

.jiance {
  margin-top: 0.15rem;
  width: 0.8rem;
  height: 0.8rem;
  background: url("../assets/icon_jia02.png") no-repeat;
  background-size: 100% 100%;
}

.xuhao .showac {
  padding-bottom: 0.5rem;
}

.xuhao ol li {
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
  margin: 0.37rem 0 0 0.75rem;
  position: relative;
}
.xuhao ol li span {
  display: block;
  width: 0.26rem;
  height: 0.26rem;
  background: url("../assets/cha.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0.13rem;
  right: 0.25rem;
}

.miaosu {
  position: absolute;
  top: 0;
  left: 1.4rem;
  width: 5.1rem;
  line-height: 0.95rem;
  height: 0.95rem;
  font-size: 0.3rem;
  color: #919191;
  text-align: left;
  overflow: hidden;
}
.miaosu em {
  font-style: normal;
}

.mb1 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>


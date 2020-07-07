<template>
  <div style="position:relative" class="xiongxiong1">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">提报工单</p>
    </div>
    <ul class="main">
      <li>
        <p>申请类型：专项</p>
      </li>
<div class="box">
    <div class="main">
      <div class="grabble">
        <input style="height:40px;margin-left:10px" type="text" placeholder="请输入客户名称" v-model="pagelist.customerName"  />
        <el-button  style="width:90px;height:40px;background-color: #9180CA;position: absolute;top:1px;margin-left:10px;" type="primary" icon="el-icon-search" @click="search1">搜索</el-button>
        <!-- <span @click="xuanzhe(0)">00000000</span> -->
      </div>

    </div>
   
    <ul
      class="list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >   
      <li
        :class="{ac:index%2==0}"
         v-for="(itme,index) in user_list"
        @click="xuanze(itme.customerName)"
        :key="index"
      >
        <p class="wg"  >{{itme.customerName}}</p>
      </li>
    </ul>
  <ul>
        <li class="sous">
<li>
       <span>产品线：</span>
       <select v-model="productLine"  style="width:200px;height:30px;position: absolute;margin-top:16px;border-radius:4px; " @change="bailing(productLine)">
       <option value>请选择</option>
       <option :value="productcont.lable" v-for="(productcont,productindex) in productList"  :key="productindex">{{productcont.lable}}</option>
       </select>
       </li>
       <li>
       <span>型号：</span>
       <select v-model="modelLine" style="width:200px;height:30px;position: absolute;margin-top:18px;margin-left:15px;border-radius:4px; " :disabled="disabledModel">
        <option value>请选择</option>
       <option :value="modelcont.lable" v-for="(modelcont,modelListindex) in modelList" :key="modelListindex" >{{modelcont.lable}}</option>
       </select>
 </li>
           <!-- <span>产品线：</span>
           <el-select v-model="productLine">
            <option
              :value="productcont.value"
              v-for="(productcont,productindex) in productList"
              :key="productindex"
            >{{productcont.lable}}</option>
          </el-select>
          <br>
           <span>型号：</span>
             <el-select v-model="modelLine" :disabled="disabledModel">
            <el-option
              :value="modelcont.value"
              v-for="(modelcont,modelListindex) in modelList"
              :key="modelListindex"
            >{{modelcont.value}}</el-option>
          </el-select> -->
          <!-- <el-select v-model="Customer.modelLine" placeholder="请选择" >
            <el-option :value="modelcont.lable"  v-for="(modelcont,modelListindex) in modelList"  :key="modelListindex"  >{{modelcont.lable}}</el-option>
          </el-select> -->
    
      </ul>
  </div>
      <li v-show="isyuangong && this.$store.state.repairorder.customerId ==''">
        <span>联系人：</span>
        <input type="text" placeholder maxlength="50" v-model="Customer.contacts" style="width:3.6rem" />
      </li>
      <li v-show="isyuangong && this.$store.state.repairorder.customerId ==''">
        <span>电话：</span>
        <input type="text" placeholder maxlength="50" v-model="Customer.phone" style="width:3.6rem" />
      </li>
      <li v-show="isyuangong && this.$store.state.repairorder.customerId ==''">
        <span>服务内容：</span>
        <input type="text" placeholder maxlength="50" v-model="Customer.serviceContent" style="width:3.6rem" />
      </li>
       <li v-show="isyuangong && this.$store.state.repairorder.customerId ==''">
       <li v-show="isyuangong">
        <p>员工编号：{{this.$store.state.repairorder.repaiNameshow}}</p>
      </li>
      <li v-show="isyuangong">
        <p>员工名称：{{this.$store.state.repairorder.repaiName}}</p>
      </li>
      <li @click="xuantime">
        <p>时间：{{this.$store.state.repairorder.time}}</p>
        <i></i>
      </li>
    </ul>

    <div class="sendbtn" style="margin-top: 50px;" @click=" issend ">下一步</div>
    <div class="mb"></div>


    <div class="model" v-show="bool">
      <div class="bg_yanse"></div>
      <div class="slots_list" :class="{demo_transform3:!bool,demo_transform4:bool}">
        <h2>{{title}}</h2>
        <span @click="quxiao" class="span1">取消</span>
        <span @click="queding">确定</span>
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </div>
    </div>

    <!-- 选择时间 -->
    <TimeComponent :boosl="timebool" :datitme1="datitme" @cancelTime="cancelTime"></TimeComponent>
  </div>
</template>

<script>
import baseUrl from "../api/baseUrl.js";
import BASEImg from "../api/BASEImg.js";
import baseUrlimg from "../api/baseUrlxiazai.js";
// import { getAllDict, getModel } from "@/api/common";
import { Toast, MessageBox, Indicator } from "mint-ui";
import Cookie from "../api/cookie.js";

import TimeComponent from "@/components/workorder/TimeComponent";

import axios from "axios";

var _this;
export default {
  name: "repairorder",
  data() {
    return {
      prod1:"",
      user_list:[],
      productLine: "",
      productList: [],
      customerLine:"",
      customerNameLine:"",
      customerList:[],
      customerNameList:[],
      modelLine: "",
      modelList: [],
      modelList1: [],
      modelList2: [],
      phoneObj: {},
       disabledModel: true,
      // 视频列表
      vidoList: [],
      videoFlag: false,
      BASEImg: BASEImg,
      baseUrlimg: baseUrlimg,
      baseUrl1: baseUrl,
      productLines: [],
     
      // 产品线对应的型号下拉
      models: [],
      // 表格数据
      productMessageList: [],
      // 选中表格数据
      multipleSelection: [],
      token: Cookie.getCookie("token"),
      // 上传进度
      videoUploadPercent: 0,
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
      //serviceContent: "", //服务内容
      repairWhy: "", //报修原因
      isAjax: false,
      imgURLList: [],
      imglistlist: [],
      tuImg: "",
      isChange: false,
      time_bool: false,
      content: "",
      bool: false,
      bool01: 0,
      isyuangong: true,
      isyuangong1: true, //不是个人才显示
      title_num01: "",
      title: "",
      liexing: [],
      list1: [],
      list2: [],
      list3: ["维修"],
      kehumingcheng:"",
      PRODUCT_LINE: [],
      CUSTOMER_LEVEL: [],

      list4: ["是", "否"],
      slots: [
        {
          flex: 1,
          values: [],
          className: "slots",
          textAlign: "center"
        }
      ],

      // 选择时间  id    显示隐藏
      timebool: false,
      datitme: "",
      pagelist: {
        userType: "",
        province: Cookie.getCookie("repaiProvince"),
        customerNameLine: "",
        receptionDate: "",
        page: 2,
        rows: 10,
        total: 0,
        createDateBegin: "",
        createDateEnd: "",
        customerName:"",
        productLineId:""
      },
      Customer: {
        // productLine:"",
        // modelLine:"",
        id: "",
        customerNameLine: "",
        customerLevel: "",
        contacts: "",
        phone: "",
        newid: "",
        serviceContent:"",
        model:""
      }, 
      customerLevels: [],
      lianxiren1: [],
      restaurants: [],
      contacts: "",
      Customershow: false
    };
  },
  components: {
    TimeComponent
  },
  created() {
   
    // 获取所有字典值
        _this = this;
        this.$Axios
        .post(baseUrl + "/customerAdmin/queryAdminCustomerList", this.pagelist)
        .then(function(response) {
          if (response.data.code == 200) {
            let arr = Object.keys(response.data.data.list);
                _this.user_list = response.data.data.list;
              
            }
               _this.list();
        })  .catch(function() {
        // Toast({
        //   message: "网络开小差了，请稍后重试",
        //   duration: 1000
        // });
      });

    this.$Axios
      .post(
        baseUrl +
          "/dicCode/queryDicByMoreType?type=PRODUCT_LINE,EQUI_MODEL"
      )
      .then(function(response) {
        //重复点击
        if (response.data.code == 200) {
          for (let nulist = 0; nulist < response.data.data.length; nulist++) {
            if (response.data.data[nulist].type == "PRODUCT_LINE") {
              _this.productList.push(response.data.data[nulist]);
            }
            if (response.data.data[nulist].type == "EQUI_MODEL") {
              _this.modelList.push(response.data.data[nulist]);
              _this.modelList1.push(response.data.data[nulist]);            
            }
          }  
        }   
      })
    
      // .catch(function(error) {
      //   Toast({
      //     message: "网络开小差，请稍后重试",
      //     duration: 1000
      //   });
      // });
    if (
      _this.$store.state.repairorder.video != "" &&
      _this.$store.state.repairorder.video != undefined
    ) {
      this.form.videoUrl = _this.$store.state.repairorder.video;
    }
    if (
      _this.$store.state.repairorder.image != "" &&
      _this.$store.state.repairorder.image != undefined
    ) {
      this.imglistlist = [];
      let dataaa = this.$store.state.repairorder.image;
      dataaa =
        dataaa.slice(dataaa.length - 1) === "," ? dataaa.slice(0, -1) : dataaa;
      //图片遍历对象
      let datiimg = dataaa.split(",");

      for (let iimg = 0; iimg <= datiimg.length - 1; iimg++) {
        this.imglistlist.push({
          url: this.baseUrl1 + datiimg[iimg].replace("undefined", "")
        });
      }
    }

    this.DeviceNumber = this.$store.state.repairorder.DeviceNumber;

    if (Cookie.getCookie("avatar") == 2) {
      //员工
      this.isyuangong = true;
      this.isyuangong1 = true;
      this.isyuangong2 = true;
    } else if (Cookie.getCookie("avatar") == "1") {
      //渠道
      this.isyuangong = false;
      this.isyuangong1 = true;
      this.isyuangong2 = true;
    } else if (Cookie.getCookie("avatar") == "3") {
      //个人
      this.isyuangong = false;
      this.isyuangong1 = false;
      this.isyuangong2 = false;
    }

   
 this.$Axios
      .post(
        baseUrl +
          "/dicCode/queryAdminDicByType?type=EQUI_MODEL&parentId=（？）"
      )
      .then(function(response) {
        //重复点击

        if (response.data.code == 200) {
       
          for (let num = 0; num <= response.data.data.length - 1; num++) {
            if (response.data.data[num].type == "APPLY_TYPE") {
              _this.liexing.push(response.data.data[num]);

              if (Cookie.getCookie("avatar") == 2) {
                _this.list1.push(response.data.data[num].lable);
              } else if (Cookie.getCookie("avatar") == "1") {
                if ("维修" == response.data.data[num].lable) {
                  _this.list2.push(response.data.data[num].lable);
                }
                if ("安装" == response.data.data[num].lable) {
                  _this.list2.push(response.data.data[num].lable);
                }
                if ("培训" == response.data.data[num].lable) {
                  _this.list2.push(response.data.data[num].lable);
                }
              }
            }

            if (response.data.data[num].type == "PRODUCT_LINE") {
              _this.PRODUCT_LINE.push(response.data.data[num]);
            }

            if (response.data.data[num].type == "CUSTOMER_LEVEL") {
              _this.CUSTOMER_LEVEL.push(response.data.data[num]);
            }
          }
        }
      })
      // .catch(function(error) {
      //   Toast({
      //     message: "网络开小差了，请稍后重试",
      //     duration: 1000
      //   });
      // });




    //获取缓存里的 产品   ClassList  对象
    var storage = window.localStorage;
    let arr = JSON.parse(storage.getItem("setApplicationType")); //维修类型

    //显示  添加客户按钮
    if (arr.name != "" && arr.name == "安装") {
      this.Customershow = true;
    } else {
      this.Customershow = false;
    }
    //显示  添加客户按钮

    this.$store.state.repairorder.ApplicationType = arr.name;
    this.$store.state.repairorder.ApplicationType_id = arr.id;

    let data = JSON.parse(storage.getItem("staffClassList"));
    this.$store.state.repairorder.customerId = data.customerId;
    this.$store.state.repairorder.modelNumber = data.modelNumber;
    this.$store.state.repairorder.modelNumber_id = data.modelNumber_id;
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
    this.$store.state.repairorder.newid = data.newid;
    this.$store.state.repairorder.serviceContent = data.serviceContent;
    this.Customer.id = data.customerId;
    this.Customer.modelLine =data.modelLine;
    this.Customer.newid = data.newid;
    this.Customer.contactList = data.contactList;
    this.Customer.customerName = data.name;
    this.Customer.customerLevel = data.customer_level_id;
    this.Customer.customerNameLine = data.customerNameLine;
    this.Customer.contacts = data.contact;
    this.Customer.phone = data.contactPhone;
    this.Customer.productLine = data.productLine;
    this.Customer.model = data.model;
    this.Customer.serviceContent = data.serviceContent;
    this.phoneObj = {
      value: data.contact,
      phone: data.contactPhone
    };

    this.$store.state.repairorder.customer_code = data.customer_code;
    this.$store.state.repairorder.address = data.address;
    this.$store.state.repairorder.country = data.country;
    this.$store.state.repairorder.city = data.city;
    this.$store.state.repairorder.customer_level_id = data.customer_level_id;
    this.$store.state.repairorder.customer_service_level = data.customer_service_level;
    this.$store.state.repairorder.zip_code = data.zip_code;
    this.$store.state.repairorder.use_department = data.use_department;
    this.$store.state.repairorder.solution = data.solution; //解决方法
    this.$store.state.repairorder.serviceContent = data.serviceContent; //服务内容
    this.$store.state.repairorder.repairWhy = data.repairWhy; //报修原因
    this.solution = data.solution;
    this.serviceContent = data.serviceContent;
    this.repairWhy = data.repairWhy;
    this.MaterialCode = data.MaterialCode;
    this.accessories = data.accessories;
    this.bool01 = data.isshifu;
    let isStaffScan = storage.getItem("isStaffScan");
    if (isStaffScan == "true") {
      this.DeviceNumber = this.GetQueryString("qrresult");
      this.isproductLine();
    }
    //类型查找
    this.typelist();
  },
  watch: { 
   productLine() {
    
      this.search();
      let ids = "";
      _this.modelList = [];
        this.disabledModel = false ;
      for (let pri = 0; pri <= _this.productList.length - 1; pri++) {
        if (_this.prod1 == _this.productList[pri].value) {
          ids = _this.productList[pri].id;
        
        this.productLineId=_this.prod1
        }
     }
      for (let i = 0; i <= _this.modelList1.length - 1; i++) {
        if (_this.modelList1[i].parentId == ids) {
          _this.modelList.push(_this.modelList1[i]);
        }else if(ids == ""){
          _this.modelList.push(_this.modelList1[i]);
        }
       
      }
    },
      modelLine() {
      this.search();
    },
    classLine() {
      this.search();
    },
    formatLine() {
      this.search();
    },
    DeviceNumber() {
      _this.$store.commit("setDeviceNumber", this.DeviceNumber);
    },
    accessories() {
      _this.$store.commit("setaccessories", this.accessories);
    },
    MaterialCode() {
      _this.$store.commit("setMaterialCode", this.MaterialCode);
    },
    solution() {
      _this.$store.commit("setsolution", this.solution);
    },
    serviceContent() {
      _this.$store.commit("setserviceContent", this.serviceContent);
    },
    repairWhy() {
      _this.$store.commit("setrepairWhy", this.repairWhy);
    }
  },

  methods: {
    
    bailing(n){
        for (let pri = 0; pri <= _this.productList.length - 1; pri++) {
       if (n == _this.productList[pri].lable) {
         let prod=_this.productList[pri].value
            this.prod1=prod
     
       }
    
        }
    },
    //   // 获取所有字典值
    // fetchAllDict() {
    //   this.$Axios
    //   .post(
    //     baseUrl +
    //       "/dicCode/queryAdminDicByType?type=PRODUCT_LINE"
    //   )
    //   .then(function(response) {
    //     if (response.data.code == 200) {
    //     let datlist = [response.data.data.PRODUCT_LINE];
       
    
    //   console.log(response.data.data.PRODUCT_LINE[1].lable)
    //   this.pageQuery.productLine=response.data.data.PRODUCT_LINE[1].lable;
    //     // 获取所有产品线
    //    // this.pageQuery.productLines = response.data.data.PRODUCT_LINE[4].lable;
      
    //     // 获取所有型号
    //    // this.pageQuery.models = response.data.data.PRODUCT_LINE[3];
       
    //   }});
    // },
  search() {
      if (!this.isAjax) return;
      this.isAjax = false;
      this.page = 0;
      var url = {
        customerId: this.$store.state.letter.user.user_id,
        productLine: this.productLine,
        model: this.modelLine,
        type: this.classLine,
        format: this.formatLine,
        rows: this.rows,
        owner: "0,2"
      };
      this.$Axios
        .post(baseUrl + "/repairSkillGuidance/queryGuidanceList", url)
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
          _this.isAjax = true;
          if (response.data.code == 200) {
            if (response.data.data.list.length == 0) {
              Toast({
                message: "未查询到相关指导内容",
                duration: 1000
              });
              _this.booler = false;
              return;
            } else {
              _this.booler = true;
              if (response.data.data.total > _this.rows) {
                _this.page++;
              }
              _this.list = response.data.data.list;
              console.log(_this.list)
              
              _this.boolershow = true;

              let proid = 0;
              for (let ipro = 0; ipro <= _this.productList.length - 1; ipro++) {
                if (_this.productList[ipro].value == _this.productLine) {
                  proid = _this.productList[ipro].id;
                }
              }
              _this.modelList = [];
              for (let i = 0; i <= _this.modelList1.length - 1; i++) {
                if (_this.modelList1[i].parentId == proid) {
                  _this.modelList.push(_this.modelList1[i]);
                }
              }
              if (_this.productLine == "") {
                _this.modelList = _this.modelList1;
              }
            }
          }
        })
        // .catch(function(error) {});
    },
    toback() {
        this.$router.go(-1);
    },
 loadMore() {
      if (this.boolershow) {
        if (
          Math.ceil(this.pagelist.total / this.pagelist.rows) >
          this.pagelist.page
        ) {
          this.pagelist.page = this.pagelist.page + 1;
        } else {
          Toast({
            message: "数据已经加载完毕",
            duration: 1000
          });
          this.boolershow = false;
          return;
        }

        this.$Axios
          .post(
            baseUrl + "/customerAdmin/queryAdminCustomerList",
            this.pagelist
          )
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
              _this.pagelist.total = response.data.data.total;
              for (
                let citylist = 0;
                citylist <= response.data.data.list.length - 1;
                citylist++
              ) {
                for (
                  let citynum = 0;
                  citynum <= _this.PROVINCE.length - 1;
                  citynum++
                ) {
                  if (
                    _this.PROVINCE[citynum].value ==
                    response.data.data.list[citylist].province
                  ) {
                    response.data.data.list[citylist].province =
                      _this.PROVINCE[citynum].lable;
                  }
                }
                _this.user_list.push(response.data.data.list[citylist]);
              }
            }
          })
          // .catch(function() {
          //   Toast({
          //     message: "网络开小差了，请稍后重试",
          //     duration: 1000
          //   });
          // });
      }
    },

  //  search() {
  //     if (!this.isAjax) return;
  //     this.isAjax = false;
  //     this.page = 0;
  //     var url = {
  //       customerId: this.$store.state.letter.user.user_id,
  //       productLine: this.Customer.productLine,
  //       model: this.Customer.modelLine,
       
  //       rows: this.rows,
  //       page: this.page,
  //       owner: "1,2"
  //     };},
    //替换芯联系人
    addCustomerinfo() {
      var storage = window.localStorage;
      let data = JSON.parse(storage.getItem("staffClassList"));

      this.$Axios
        .post(baseUrl + "/customerAdmin/queryAdminCustomerByName", {
          customerName: this.Customer.customerName
        })
        .then(res => {
          if (res.data.code == 200) {
            Toast({
              message: "查询成功",
              duration: 1000
            });
            data.newid = res.data.data.id;
            data.customer_level_id = res.data.data.customerLevel;
            data.name = res.data.data.customerName;
            data.contact = res.data.data.contacts;
            data.contactPhone = res.data.data.phone;
            data.contactList = res.data.data.contactList;

            this.phoneObj = {
              value: res.data.data.contacts,
              phone: res.data.data.phone
            };

            data.address = res.data.data.address;
            data.city = res.data.data.city;
            data.country = res.data.data.country;
            data.province = res.data.data.province;
            // data.use_department  = res.data.data.contactList;
            data.zip_code = res.data.data.zipCode;

            this.Customer.customerName = res.data.data.customerName;
            this.Customer.customerLevel = res.data.data.customerLevel;
            this.Customer.contacts = res.data.data.contacts;
            this.Customer.phone = res.data.data.phone;
            this.Customer.contactList = res.data.data.contactList;
            this.Customer.newid = res.data.data.id;

            if (res.data.data.contactList.length != 0) {
              let contactListdata = res.data.data.contactList;
              let arr = [];
              for (let i = 0; i <= contactListdata.length - 1; i++) {
                arr.push({
                  value: contactListdata[i].contacts,
                  phone: contactListdata[i].phone
                });
              }
              this.restaurants = arr;
            } else {
              this.restaurants = [];
            }
            storage.setItem("staffClassList", JSON.stringify(data));
          }
          if (res.data.code == -100) {
            Toast({
              message: "未找到" + this.Customer.customerName + "的信息",
              duration: 1000
            });
          }
        })
        // .catch(() => {
        //   Toast({
        //     message: "网络开小差了，请稍后重试",
        //     duration: 1000
        //   });
        // });
    },

    xiugaiyonghu() {
      if (this.$store.state.repairorder.customerId == "") return;
      var storage = window.localStorage;
      let data = JSON.parse(storage.getItem("staffClassList"));
      //存起来

      let arrstr = [];
      for (let i in this.restaurants) {
        if (this.phoneObj.value != this.restaurants[i].value) {
          if (i == this.restaurants.length - 1) {
            if (this.Customer.contacts != this.phoneObj.value) {
              arrstr.push({
                contacts: this.phoneObj.value,
                phone: this.phoneObj.phone
              });
            }
          }
        }
        arrstr.push({
          contacts: this.restaurants[i].value,
          phone: this.restaurants[i].phone
        });
      }

      this.Customer.contactList = arrstr;

      this.$Axios
        .post(baseUrl + "/customerAdmin/updCustomerInfoById", this.Customer)
        .then(res => {
          if (res.data.code == 200) {
            data.customer_level_id = this.Customer.customerLevel;
            data.name = this.Customer.customerName;
            data.contact = this.Customer.contacts;
            data.contactPhone = this.Customer.phone;
            data.solution = this.solution;
            data.serviceContent = this.serviceContent;
            data.repairWhy = this.repairWhy;
            data.MaterialCode = this.MaterialCode;
            data.accessories = this.accessories;
            data.isshifu = this.bool01;

            this.$store.state.repairorder.customer_level_id = this.Customer.customerLevel;
            this.$store.state.repairorder.name = this.Customer.customerName;
            this.$store.state.repairorder.contact = this.Customer.contacts;
            this.$store.state.repairorder.contactPhone = this.Customer.phone;

            if (Cookie.getCookie("avatar") == 2) {
              _this.$router.push({
                path: "/repairconfirm-zhuanxiang",
                query: { id: 2 }
              });
            } else if (Cookie.getCookie("avatar") == "1") {
              _this.$router.push({
                path: "/repairconfirm-zhuanxiang",
                query: { id: 2 }
              });
            } else if (Cookie.getCookie("avatar") == "3") {
              _this.$router.push({
                path: "/repairconfirm-zhuanxiang",
                query: { id: 2 }
              });
            }
          }

          storage.setItem("staffClassList", JSON.stringify(data));
        })
        // .catch(() => {
        //   Toast({
        //     message: "网络开小差了，请稍后重试",
        //     duration: 1000
        //   });
        // });
    },

    //级别类型
    typelist() {
      this.$Axios
        .post(
          baseUrl +
            "/dicCode/queryAdminDicByType?type=DEPARTMENT,USERTYPE,PROVINCE,CUSTOMER_SERVICE_LEVEL,CUSTOMER_TYPE,CUSTOMER_LEVEL,COUNTRY,CITY"
        )
        .then(res => {
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
            this.customerLevels = res.data.data.CUSTOMER_LEVEL;
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
    xuantime() {
      this.timebool = true;
      this.datitme = this.$store.state.repairorder.time;

      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.cssText += "position:fixed;top:-" + scrollTop + "px;";
    },

      search1() {
      this.pagelist.page = 1;
      this.list();
    },
     //列表查询
    list() {
      Indicator.open({
        text: "加载中，请稍后",
        spinnerType: "fading-circle"
      });
      this.$Axios
        .post(baseUrl + "/customerAdmin/queryAdminCustomerList", this.pagelist)
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
            let arr = Object.keys(response.data.data.list);
         
          
            //空
            if (arr.length == 0) {
              _this.user_list = [];
              Toast({
                message: "未查询到客户",
                duration: 1000
              });
              return;
            } else {
              _this.pagelist.total = response.data.data.total;
              _this.user_list = response.data.data.list;
              _this.boolershow = true;
            }
          }
        })
    },
    cancelTime(data) {
      if (data.name == "取消") {
        this.timebool = false;
      } else if (data.name == "确定") {
        this.$store.state.repairorder.time = data.time;
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

    // toback() {
    //   if (Cookie.getCookie("avatar") == 2) {
    //     this.$router.push({ path: "/staffserver" });
    //   } else if (Cookie.getCookie("avatar") == "1") {
    //     this.$router.push({ path: "/custser" });
    //   } else if (Cookie.getCookie("avatar") == "3") {
    //     this.$router.push({ path: "/custser" });
    //   }
    // },
    See() {
      let storage = window.localStorage;
      storage.setItem("isStaffScan", "true");
      window.location.href =
        "http://sao315.com/w/api/saoyisao/?redirect_uri=http%3A%2F%2Fwxkef.aeonmed.com%2F%23%2Fprorepair";
    },
    //获取扫一扫回来的参数
    GetQueryString(name) {
      var reg = new RegExp("\\b" + name + "=([^&]*)");
      var r = location.href.match(reg);
      if (r != null) return unescape(r[1]);
    },
    //删除设备号
    deviceNumber_minus_class(index) {
      let storage = window.localStorage;
      let staffClassList1 = JSON.parse(storage.getItem("staffClassList"));
      _this.$store.state.repairorder.ClassList.splice(index, 1);
      _this.$store.state.repairorder.DeviceType.splice(index, 1);

      if (_this.$store.state.repairorder.ClassList.length - 1 == -1) {
        _this.$store.state.repairorder.productLine_id = "";
        _this.$store.state.repairorder.productLine = "";
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

        _this.$store.state.repairorder.modelNumber = "";
        _this.$store.state.repairorder.modelNumber_id = "";
        _this.$store.state.repairorder.solution = "";
        _this.$store.state.repairorder.serviceContent = "";
        _this.$store.state.repairorder.repairWhy = "";
        _this.$store.state.repairorder.MaterialCode = "";
        _this.$store.state.repairorder.accessories = "";
        _this.solution = "";
        _this.serviceContent = "";
        _this.repairWhy = "";
        _this.MaterialCode = "";
        _this.accessories = "";
        _this.bool01 = 0;

        _this.Customer.id = "";
        _this.Customer.customerName = "";
        _this.Customer.customerLevel = "";
        _this.Customer.contacts = "";
        _this.Customer.phone = "";
        _this.contacts = "";
        let staffClassList = {
          customerId: "",
          proID: "",
          productLine_id: "",
          productLine: "",
          model:"",
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
          contactList: []
        };
        let arr = {
          name: "",
          id: ""
        };

        _this.$store.state.repairorder.ApplicationType = "";
        _this.$store.state.repairorder.ApplicationType_id = "";
        storage.setItem("setApplicationType", JSON.stringify(arr));
        storage.setItem("staffClassList", JSON.stringify(staffClassList));
      } else {
        staffClassList1.ClassList.splice(index, 1);
        staffClassList1.DeviceType.splice(index, 1);
        storage.setItem("staffClassList", JSON.stringify(staffClassList1));
      }
    },
 xuanzhe() {
      this.pagelist.createDateBegin = "";
      this.pagelist.createDateEnd = "";
      this.bool1 = !this.bool1;
      // document.body.style.overflow = "hidden";

      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.cssText += "position:fixed;top:-" + scrollTop + "px;";
    },
    //检查设备号是否存在
    isproductLine() {
      if (this.DeviceNumber != "") {
        var storage = window.localStorage;
        storage.setItem("isStaffScan", "false");
        //判断设备号是否存在
        for (
          var nul = 0;
          nul <= _this.$store.state.repairorder.ClassList.length - 1;
          nul++
        ) {
          if (
            _this.$store.state.repairorder.ClassList[nul].name ==
            this.DeviceNumber
          ) {
            Toast({
              message: "序列号已存在了，请不要重复添加",
              duration: 1000
            });

            return;
          }
        }

        //是否是回访
        if (_this.$store.state.repairorder.ApplicationType == "回访") {
          //判断设备是否存在   是否是回访
          axios
            .post(baseUrl + "/applyJob/isExist", {
              deviceId: _this.DeviceNumber
            })
            .then(function(response) {
              //是否超时
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

              //产品不存在
              if (response.data.msg == "产品档案不存在") {
                Toast({
                  message: response.data.msg,
                  duration: 1000
                });
                return;
              }

              if (response.data.msg == "产品档案存在") {
                if (_this.$store.state.repairorder.customerId != "") {
                  if (
                    _this.$store.state.repairorder.customerId !=
                    response.data.data.customerId
                  ) {
                    Toast({
                      message: "客户未用有此产品，无法报修",
                      duration: 1000
                    });
                    return;
                  }
                }

                if (_this.$store.state.repairorder.customerId != "") {
                  if (
                    _this.$store.state.repairorder.customerId !=
                    response.data.data.customerId
                  ) {
                    Toast({
                      message: "客户未用有此产品，无法报修",
                      duration: 1000
                    });
                    return;
                  }
                }

                if (_this.$store.state.repairorder.ClassList.length > 0) {
                  if (
                    _this.$store.state.repairorder.proID !=
                    response.data.data.customerId
                  ) {
                    Toast({
                      message: "此产品不属于同一个客户，无法提报",
                      duration: 1000
                    });
                    return;
                  }
                } else {
                  _this.$store.state.repairorder.proID =
                    response.data.data.customerId;
                }

                if (
                  response.data.data.productLine == "mz" ||
                  response.data.data.productLine == "hx" ||
                  response.data.data.productLine == "ssc" ||
                  response.data.data.productLine == "wyd" ||
                  response.data.data.productLine == "dt" ||
                  response.data.data.productLine == "ta"
                ) {
                  if (_this.$store.state.repairorder.productLine_id != "") {
                    if (
                      _this.$store.state.repairorder.productLine_id ==
                      response.data.data.productLine
                    ) {
                      Toast({
                        message: "匹配成功",
                        duration: 1000
                      });

                      // return;
                      let data = JSON.parse(storage.getItem("staffClassList"));

                      data.ClassList.push({
                        name: _this.DeviceNumber
                      });
                      _this.$store.state.repairorder.ClassList.push({
                        name: _this.DeviceNumber
                      });

                      _this.DeviceNumber = "";

                      data.DeviceType.push({
                        name: response.data.data.model
                      });
                      _this.$store.state.repairorder.DeviceType.push({
                        name: response.data.data.model
                      });
                      storage.setItem("staffClassList", JSON.stringify(data));
                    } else {
                      Toast({
                        message: "产品线不一致，无法添加",
                        duration: 1000
                      });
                    }
                  } else {
                    Toast({
                      message: "匹配成功",
                      duration: 1000
                    });

                    // return;
                    _this.$store.state.repairorder.ClassList.push({
                      name: _this.DeviceNumber
                    });

                    _this.$store.state.repairorder.productLine_id =
                      response.data.data.productLine;

                    _this.DeviceNumber = "";

                    _this.$store.state.repairorder.DeviceType.push({
                      name: response.data.data.model
                    });

                    //产品线
                    for (let i = 0; i <= _this.PRODUCT_LINE.length - 1; i++) {
                      if (
                        _this.$store.state.repairorder.productLine_id ==
                        _this.PRODUCT_LINE[i].value
                      ) {
                        _this.$store.state.repairorder.productLine =
                          _this.PRODUCT_LINE[i].lable;
                      }
                    }
                    //医院等级
                    for (let i = 0; i <= _this.CUSTOMER_LEVEL.length - 1; i++) {
                      if (
                        response.data.data.customerLevel ==
                        _this.CUSTOMER_LEVEL[i].value
                      ) {
                        _this.$store.state.repairorder.customer_level =
                          _this.CUSTOMER_LEVEL[i].lable;
                      }
                    }

                    _this.Customer.id = response.data.data.customerId;
                    _this.Customer.newid = "";
                    _this.Customer.customerName =
                      response.data.data.customerName;
                    _this.Customer.customerLevel =
                      response.data.data.customerLevel;
                    _this.Customer.contacts = response.data.data.contacts;
                    _this.contacts = response.data.data.contacts;
                    _this.Customer.phone = response.data.data.phone;

                    _this.phoneObj = {
                      value: response.data.data.contacts,
                      phone: response.data.data.phone
                    };

                    _this.$store.state.repairorder.contact =
                      response.data.data.contacts; //联系人
                    _this.$store.state.repairorder.contactPhone =
                      response.data.data.phone; //联系人电话
                    _this.$store.state.repairorder.level =
                      response.data.data.customerLevel; //级别
                    _this.$store.state.repairorder.customerId =
                      response.data.data.customerId; //id
                    _this.$store.state.repairorder.name =
                      response.data.data.customerName; //客户名称  （医院名称）
                    _this.$store.state.repairorder.customer_code =
                      response.data.data.customerCode; //客户编码
                    _this.$store.state.repairorder.address =
                      response.data.data.address; //地址
                    _this.$store.state.repairorder.country =
                      response.data.data.country; // 国家
                    _this.$store.state.repairorder.city =
                      response.data.data.city; //城市
                    _this.$store.state.repairorder.province =
                      response.data.data.province; // 省份
                    _this.$store.state.repairorder.customer_level_id =
                      response.data.data.customerLevel; //代理级别
                    _this.$store.state.repairorder.customer_service_level =
                      response.data.data.customerServiceLevel; //客户服务等级
                    _this.$store.state.repairorder.address =
                      response.data.data.address; //地址
                    _this.$store.state.repairorder.zip_code =
                      response.data.data.zipCode; //邮编
                    _this.$store.state.repairorder.use_department =
                      response.data.data.useDepartment; //使用科室
                    _this.$store.state.repairorder.customerType =
                      response.data.data.customerType; //客户类型

                    let staffClassList = {
                      customerId: _this.$store.state.repairorder.customerId,
                      newid: "",
                      proID: _this.$store.state.repairorder.proID,
                      productLine_id:
                        _this.$store.state.repairorder.productLine_id,
                      productLine: _this.$store.state.repairorder.productLine,
                      ClassList: _this.$store.state.repairorder.ClassList,
                      DeviceType: _this.$store.state.repairorder.DeviceType,
                      contact: _this.$store.state.repairorder.contact, //联系人
                      contactPhone: _this.$store.state.repairorder.contactPhone, //联系人电话
                      level: _this.$store.state.repairorder.level, //级别
                      customer_level:
                        _this.$store.state.repairorder.customer_level, //医院等级
                      name: _this.$store.state.repairorder.name, //客户名称  （医院名称）
                      customer_code:
                        _this.$store.state.repairorder.customer_code, //客户编码
                      address: _this.$store.state.repairorder.address, //地址
                      country: _this.$store.state.repairorder.country, //国家
                      city: _this.$store.state.repairorder.city, ///城市
                      province: _this.$store.state.repairorder.province, ///省份
                      customer_level_id:
                        _this.$store.state.repairorder.customer_level_id, ////代理级别
                      customer_service_level:
                        _this.$store.state.repairorder.customer_service_level, //客户服务等级
                      zip_code: _this.$store.state.repairorder.zip_code, //邮编
                      use_department:
                        _this.$store.state.repairorder.use_department, //使用科室
                      customerType: _this.$store.state.repairorder.customerType ///客户类型
                    };
                    storage.setItem(
                      "staffClassList",
                      JSON.stringify(staffClassList)
                    );
                    _this.loadAll();
                  }
                } else {
                  Toast({
                    message: "回访类里没有此产品线",
                    duration: 1000
                  });
                  return;
                }
              }
            })
            // .catch(function(error) {
            //   Toast({
            //     message: "网络开小差了，请稍后重试",
            //     duration: 1000
            //   });
            //   return;
            // });
        } else {
          //判断设备是否存在  不是回访
          axios
            .post(baseUrl + "/applyJob/isExist", {
              deviceId: _this.DeviceNumber
            })
            .then(function(response) {
              //登录超时
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

              //产品线 id
              if (response.data.msg == "产品档案不存在") {
                Toast({
                  message: response.data.msg,
                  duration: 1000
                });
                return;
              }
              if (response.data.msg == "产品档案存在") {
                //客户未用有此产品，无法报修
                if (
                  _this.$store.state.repairorder.customerId != undefined &&
                  _this.$store.state.repairorder.customerId != ""
                ) {
                  if (
                    _this.$store.state.repairorder.customerId !=
                    response.data.data.customerId
                  ) {
                    Toast({
                      message: "客户未用有此产品，无法报修",
                      duration: 1000
                    });
                    return;
                  }
                }

                if (_this.$store.state.repairorder.ClassList.length > 0) {
                  if (
                    _this.$store.state.repairorder.proID !=
                    response.data.data.customerId
                  ) {
                    Toast({
                      message: "此产品不属于同一个客户，无法提报",
                      duration: 1000
                    });
                    return;
                  }
                } else {
                  _this.$store.state.repairorder.proID =
                    response.data.data.customerId;
                }

                //产品线  不为空时 判断
                if (_this.$store.state.repairorder.productLine_id != "") {
                  if (
                    _this.$store.state.repairorder.productLine_id ==
                    response.data.data.productLine
                  ) {
                    Toast({
                      message: "匹配成功",
                      duration: 1000
                    });
                    // return;
                    let data = JSON.parse(storage.getItem("staffClassList"));

                    data.ClassList.push({
                      name: _this.DeviceNumber
                    });
                    _this.$store.state.repairorder.ClassList.push({
                      name: _this.DeviceNumber
                    });

                    _this.DeviceNumber = "";

                    data.DeviceType.push({
                      name: response.data.data.model
                    });
                    _this.$store.state.repairorder.DeviceType.push({
                      name: response.data.data.model
                    });
                    storage.setItem("staffClassList", JSON.stringify(data));
                  } else {
                    Toast({
                      message: "产品线不一致，无法添加",
                      duration: 1000
                    });
                  }
                } else {
                  Toast({
                    message: "匹配成功",
                    duration: 1000
                  });
                  // return;
                  _this.$store.state.repairorder.ClassList.push({
                    name: _this.DeviceNumber
                  });

                  _this.$store.state.repairorder.productLine_id =
                    response.data.data.productLine;

                  _this.DeviceNumber = "";

                  _this.$store.state.repairorder.DeviceType.push({
                    name: response.data.data.model
                  });

                  //产品线
                  for (let i = 0; i <= _this.PRODUCT_LINE.length - 1; i++) {
                    if (
                      _this.$store.state.repairorder.productLine_id ==
                      _this.PRODUCT_LINE[i].value
                    ) {
                      _this.$store.state.repairorder.productLine =
                        _this.PRODUCT_LINE[i].lable;
                    }
                  }
                  //医院等级
                  for (let i = 0; i <= _this.CUSTOMER_LEVEL.length - 1; i++) {
                    if (
                      response.data.data.customerLevel ==
                      _this.CUSTOMER_LEVEL[i].value
                    ) {
                      _this.$store.state.repairorder.customer_level =
                        _this.CUSTOMER_LEVEL[i].lable;
                    }
                  }

                  _this.Customer.id = response.data.data.customerId;
                  _this.Customer.newid = "";
                  _this.Customer.customerName = response.data.data.customerName;
                  _this.Customer.customerLevel =
                    response.data.data.customerLevel;
                  _this.Customer.contacts = response.data.data.contacts;
                  _this.contacts = response.data.data.contacts;
                  _this.Customer.phone = response.data.data.phone;

                  _this.phoneObj = {
                    value: response.data.data.contacts,
                    phone: response.data.data.phone
                  };

                  _this.$store.state.repairorder.contact =
                    response.data.data.contacts; //联系人
                  _this.$store.state.repairorder.contactPhone =
                    response.data.data.phone; //联系人电话
                  _this.$store.state.repairorder.level =
                    response.data.data.customerLevel; //级别
                  _this.$store.state.repairorder.customerId =
                    response.data.data.customerId; //id
                  _this.$store.state.repairorder.name =
                    response.data.data.customerName; //客户名称  （医院名称）
                  _this.$store.state.repairorder.customer_code =
                    response.data.data.customerCode; //客户编码
                  _this.$store.state.repairorder.address =
                    response.data.data.address; //地址
                  _this.$store.state.repairorder.country =
                    response.data.data.country; // 国家
                  _this.$store.state.repairorder.city = response.data.data.city; //城市
                  _this.$store.state.repairorder.province =
                    response.data.data.province; // 省份
                  _this.$store.state.repairorder.customer_level_id =
                    response.data.data.customerLevel; //代理级别
                  _this.$store.state.repairorder.customer_service_level =
                    response.data.data.customerServiceLevel; //客户服务等级
                  _this.$store.state.repairorder.address =
                    response.data.data.address; //地址
                  _this.$store.state.repairorder.zip_code =
                    response.data.data.zipCode; //邮编
                  _this.$store.state.repairorder.use_department =
                    response.data.data.useDepartment; //使用科室
                  _this.$store.state.repairorder.customerType =
                    response.data.data.customerType; //客户类型

                  let staffClassList = {
                    customerId: _this.$store.state.repairorder.customerId,
                    newid: "",
                    proID: _this.$store.state.repairorder.proID,
                    productLine_id:
                      _this.$store.state.repairorder.productLine_id,
                    productLine: _this.$store.state.repairorder.productLine,
                    ClassList: _this.$store.state.repairorder.ClassList,
                    DeviceType: _this.$store.state.repairorder.DeviceType,
                    contact: _this.$store.state.repairorder.contact, //联系人
                    contactPhone: _this.$store.state.repairorder.contactPhone, //联系人电话
                    level: _this.$store.state.repairorder.level, //级别
                    customer_level:
                      _this.$store.state.repairorder.customer_level, //医院等级
                    name: _this.$store.state.repairorder.name, //客户名称  （医院名称）
                      model: _this.$store.state.repairorder.model, //客户名称  （医院名称）
                    customer_code: _this.$store.state.repairorder.customer_code, //客户编码
                    address: _this.$store.state.repairorder.address, //地址
                    country: _this.$store.state.repairorder.country, //国家
                    city: _this.$store.state.repairorder.city, ///城市
                    province: _this.$store.state.repairorder.province, ///省份
                    customer_level_id:
                      _this.$store.state.repairorder.customer_level_id, ////代理级别
                    customer_service_level:
                      _this.$store.state.repairorder.customer_service_level, //客户服务等级
                    zip_code: _this.$store.state.repairorder.zip_code, //邮编
                    use_department:
                      _this.$store.state.repairorder.use_department, //使用科室
                    customerType: _this.$store.state.repairorder.customerType ///客户类型
                  };
                  storage.setItem(
                    "staffClassList",
                    JSON.stringify(staffClassList)
                  );
                  _this.loadAll();
                }
              }
            })
            // .catch(function(error) {
            //   Toast({
            //     message: "网络开小差了，请稍后重试",
            //     duration: 1000
            //   });
            // });
        }
      } else {
        Toast({
          message: "序列号不能为空",
          duration: 1000
        });
        return;
      }
    },
    //设备机型
    toDeviceNumber() {
      this.$router.push({
        path: "/DeviceNumber"
      });
    },
    xuanze(n){
      
      this.pagelist.customerName=n;
      
    },
    //故障
 // 获取所有生产线对应的型号
    // productLineChange(value) {
    //  //var xxx=this.Customer.productLine;
    //  //var line=JSON.parse()

    //   this.Customer.model = "";
    //   this.disabledModel = false ;
    //          axios
    //         .post(baseUrl + "/productInfo/selectModeByProductline", {
    //             productLine:this.Customer.productLine
    //         })
    //         .then(function(response) {
    //           console.log(response)
    //          for (let nulist = 0; nulist < response.data.data.length; nulist++) {
    //          if (response.data.data[nulist].type == "EQUI_MODEL") {
    //           _this.modelList2.push(response.data.data[nulist]);
    //           }
    //           }  
    //           })
    //           },


    //     getModel(data).then(res => {
    //       if (JSON.stringify(res.data) != "{}") {
    //         this.Customer.models = res.data.EQUI_MODEL;
    //       } else {
    //         this.Customer.modelLine = [];
    //       }
    //     });
    //   }
    // },  
    // 选择客户
    customer() {
      if (Cookie.getCookie("avatar") == 2) {
        this.$router.push({
          path: "/cityYiyuan"
        });
      } else if (Cookie.getCookie("avatar") == "1") {
        Cookie.setCookie("Isregistered", 4);
        this.$router.push({
          path: "/cityYiyuan"
        });
      } else if (Cookie.getCookie("avatar") == "3") {
        // Cookie.setCookie('Isregistered',4);
        this.$router.push({
          path: "/cityYiyuan"
        });
      }
    },

    //弹框
    onValuesChange(picker, values) {
      this.values = values[0];
    },
    // xuanzhe(n) {
    //   if (n == 0) {
    //     this.title = "申报类型";
    //     if (Cookie.getCookie("avatar") == 2) {
    //       this.slots[0].values = this.list1;
    //     } else if (Cookie.getCookie("avatar") == "1") {
    //       this.slots[0].values = this.list2;
    //     } else if (Cookie.getCookie("avatar") == "3") {
    //       this.slots[0].values = this.list3;
    //     }

    //     // this.values = this.list1[0];
    //   } else if (n == 3) {
    //     this.slots[0].values = this.list4;
    //     this.values = this.list4[0];
    //   }
    //   this.bool = !this.bool;
    //   this.title_num01 = n;

    //   var scrollTop =
    //     document.body.scrollTop || document.documentElement.scrollTop;
    //   document.body.style.cssText += "position:fixed;top:-" + scrollTop + "px;";
    // },

    //取消
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
    queding() {
      con
      if (this.title_num01 == 0) {
        let storage = window.localStorage;
        // this.ApplicationType = this.values;
        for (let num = 0; num <= _this.liexing.length - 1; num++) {
          if (_this.liexing[num].lable == this.values) {
            this.Customershow = false; //是否显示客户添加按钮

            // if (this.values == "回访") {
            //   if (
            //     this.$store.state.repairorder.productLine != "mz" ||
            //     this.$store.state.repairorder.productLine != "hxj" ||
            //     this.$store.state.repairorder.productLine != "ssc" ||
            //     this.$store.state.repairorder.productLine != "wyd"
            //   ) {
            this.$store.state.repairorder.productLine = "";
            this.$store.state.repairorder.ClassList = [];
            this.$store.state.repairorder.DeviceType = [];
            this.$store.state.repairorder.proID = "";
            _this.DeviceNumber = "";
            _this.$store.state.repairorder.productLine_id = "";
            _this.$store.state.repairorder.productLine = "";
            _this.$store.state.repairorder.proID;
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

            _this.$store.state.repairorder.modelNumber = "";
            _this.$store.state.repairorder.modelNumber_id = "";
            _this.$store.state.repairorder.solution = "";
            _this.$store.state.repairorder.serviceContent = "";
            _this.$store.state.repairorder.repairWhy = "";
            _this.$store.state.repairorder.MaterialCode = "";
            _this.$store.state.repairorder.accessories = "";
            _this.solution = "";
            _this.serviceContent = "";
            _this.repairWhy = "";
            _this.MaterialCode = "";
            _this.accessories = "";
            _this.bool01 = 0;

            let staffClassList = {
              customerId: "",
              proID: "",
              productLine_id: "",
              productLine: "",
              model:"",
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
              contactList: []
            };

            storage.setItem("staffClassList", JSON.stringify(staffClassList));
            //   }
            // }

            if (this.values != "维修") {
              this.$store.state.repairorder.image = "";
              this.$store.state.repairorder.video = "";
              this.$store.state.repairorder.modelNumber = "";
              this.$store.state.repairorder.modelNumber_id = "";
              this.DeviceNumber = "";
              this.accessories = "";
              this.$store.state.repairorder.isshifu = 0;
              this.MaterialCode = "";
              this.repairWhy = "";
              this.serviceContent = "";
              this.solution = "";
              this.form.videoUrl = "";
              this.imglistlist = [];
              this.bool01 = 0;

              let staffClassList = JSON.parse(
                storage.getItem("staffClassList")
              );
              staffClassList.isshifu = 0;
              staffClassList.DeviceNumber = "";
              staffClassList.accessories = "";
              staffClassList.MaterialCode = "";
              staffClassList.serviceContent = "";
              staffClassList.repairWhy = "";
              staffClassList.solution = "";
              staffClassList.modelNumber = "";
              staffClassList.modelNumber_id = "";

              storage.setItem("staffClassList", JSON.stringify(staffClassList));
            }
            if (_this.liexing[num].lable == "安装") {
              this.Customershow = true; //是否显示客户添加按钮
            }

            //白玲加
           if (_this.liexing[num].lable == "专项") {
          
             this.$router.push({
              path: "/repairconfirm-zhuanxiang",
              query: { id: this.$store.state.repairorder.customerId }
              });
            }
          //白玲加
            let arr = {
              name: _this.liexing[num].lable,
              id: _this.liexing[num].value
            };

            storage.setItem("setApplicationType", JSON.stringify(arr));

            _this.$store.commit("setApplicationType", {
              name: _this.liexing[num].lable,
              id: _this.liexing[num].value
            });
          }
        }
      } else if (this.title_num01 == 3) {
        if (this.values == "是") {
          _this.$store.commit("setisshifu", "1");
          this.bool01 = 1;
        } else if (this.values == "否") {
          _this.$store.commit("setisshifu", "0");
          this.accessories = "";
          this.MaterialCode = "";
          _this.$store.commit("setaccessories", "");
          _this.$store.commit("setMaterialCode", "");
          this.bool01 = 0;
        }
      }
      this.bool = !this.bool;
      var body = document.body;
      body.style.position = "static";
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      );
      body.style.top = "";
    },

//     //文件上传 --------------------------------------------------
//     uploadBeforeCheck(file) {
//       // 验证上传的图片格式及大小
//       const isJPG = file.type === "image/jpeg";
//       const isPNG = file.type === "image/png";
//       const isLt3M = file.size / 1024 / 1024 < 10;

//       if (!isJPG && !isPNG) {
//         Toast({
//           message: "图片仅支持 jpg、png 格式，且大小不超过 8M",
//           duration: 1000
//         });
//       }
//       if (!isLt3M) {
//         Toast({
//           message: "图片大小不能超过 8MB",
//           duration: 1000
//         });
//       }
//       return (isJPG || isPNG) && isLt3M;
//     },
//     //上传失败
//     errorimg(err, file, fileList) {
//       this.$message.warning("上传失败!");
//     },

//     // 图片超出限制
//     exceedAstrict() {
//       this.$message.warning("最多只能上传3张图片哦!");
//     },
//  tostaffdetail(n) {
//       this.$router.push({
//         path: "/customerlist",
//         query: { id: n }
//       });
      // this.$router.push({
      //   path: "/staffdetail",
      //   query: { id: n }
      // });
  // },
    // //移除图片
    // handleRemove(file, fileList) {
    //   if (file.response == undefined) {
    //     let dataurl = file.url.replace("http://124.207.242.89:9999", "");
    //     this.$store.state.repairorder.image =
    //       this.$store.state.repairorder.image.slice(
    //         this.$store.state.repairorder.image.length - 1
    //       ) === ","
    //         ? this.$store.state.repairorder.image.slice(0, -1)
    //         : this.$store.state.repairorder.image;
    //     let datiimg = this.$store.state.repairorder.image.split(",");
    //     for (let iimg = 0; iimg <= datiimg.length - 1; iimg++) {
    //       if (datiimg[iimg].indexOf(dataurl) != -1) {
    //         delete datiimg[iimg];
    //       }
    //     }
    //     this.$store.state.repairorder.image = "";
    //     for (let iimg1 = 0; iimg1 <= datiimg.length - 1; iimg1++) {
    //       if (datiimg[iimg1] != undefined) {
    //         this.$store.state.repairorder.image += datiimg[iimg1] + ",";
    //       }
    //     }
    //   } else {
    //     let arrlisut = file.response.data[0];
    //     this.$store.state.repairorder.image =
    //       this.$store.state.repairorder.image.slice(
    //         this.$store.state.repairorder.image.length - 1
    //       ) === ","
    //         ? this.$store.state.repairorder.image.slice(0, -1)
    //         : this.$store.state.repairorder.image;

    //     let datiimg = this.$store.state.repairorder.image.split(",");
    //     for (let iimg = 0; iimg <= datiimg.length - 1; iimg++) {
    //       if (datiimg[iimg].indexOf(arrlisut) != -1) {
    //         delete datiimg[iimg];
    //       }
    //     }
    //     this.$store.state.repairorder.image = "";
    //     for (let iimg1 = 0; iimg1 <= datiimg.length - 1; iimg1++) {
    //       if (datiimg[iimg1] != undefined) {
    //         this.$store.state.repairorder.image += datiimg[iimg1] + ",";
    //       }
    //     }
    //   }
    // },
    // //验证图片格式
    // fileChange(file) {
    //   const isLt10M = file.size / 1024 / 1024 < 10;
    //   if (
    //     file.name.lastIndexOf(".jpeg") == -1 &&
    //     file.name.lastIndexOf(".jpg") == -1 &&
    //     file.name.lastIndexOf(".png") == -1
    //   ) {
    //     this.$message.error("请上传正确的图片格式哦!");
    //     return false;
    //   }
    //   if (!isLt10M) {
    //     this.$message.error("上传图片大小不能超过10MB哦!");
    //     return false;
    //   }
    // },
    // // 上传图片
    // uploadFileSuccess(response, file, fileList) {
    //   this.$store.state.repairorder.image += response.data[0] + ",";
    // },

    // // 视频上传失败
    // errorimg1() {
    //   Indicator.close();
    //   this.form.videoUrl == "";
    //   this.videoFlag = false;
    //   this.$message.warning("上传失败!");
    // },

    // // 视频上传成功
    // handleVideoSuccess(res) {
    //   //获取上传图片地址
    //   this.videoFlag = false;
    //   this.videoUploadPercent = 0;
    //   Indicator.close();
    //   if (res.code == 200) {
    //     this.$store.state.repairorder.video = res.data[0];
    //     this.form.videoUrl = res.data[0];
    //     this.videoFlag = false;
    //     this.vidoList = [];
    //   } else {
    //     this.$message.error("视频上传失败，请重新上传！");
    //     return false;
    //   }
    // },
    // // 验证上传视频文件
    // beforeUploadVideo(file) {
    //   const isLt50M = file.size / 1024 / 1024 < 50;
    //   // if (
    //   //   [
    //   //     "video/mp4",
    //   //     "video/ogg",
    //   //     "video/flv",
    //   //     "video/avi",
    //   //     "video/wmv",
    //   //     "video/rmvb"
    //   //   ].indexOf(file.type) == -1
    //   // ) {
    //   //   this.$message.error("请上传正确的视频格式哦!");
    //   //   return false;
    //   // }
    //   if (!isLt50M) {
    //     this.$message.error("上传视频大小不能超过50MB哦!");
    //     return false;
    //   }
    //   Indicator.open({
    //     text: "视频上传中，请稍后",
    //     spinnerType: "fading-circle"
    //   });
    // },
    // // 上传进度显示
    // uploadVideoProcess(event, file, fileList) {
    //   this.videoFlag = true;
    //   this.videoUploadPercent = Number(file.percentage.toFixed(0));
    // },

    // // 移除当前视频
    // delVideo() {
    //   this.form.videoUrl = "";
    //   this.vidoList = [];
    //   _this.$store.state.repairorder.video = "";
    // },

    tokehu() {
      this.$router.push({
        path: "/Customerinfo",
        query: { id: this.$store.state.repairorder.customerId }
      });
    },

    //文件上传 --------------------------------------------------

    //判断设备号是否提交过
    issend() {
      // if (this.$store.state.repairorder.ApplicationType == "") {
      //   Toast("申请类型不能为空");
      //   return;
      // }
      // if (this.$store.state.repairorder.ClassList.length - 1 < 0) {
      //   console.log(this.$store.state.repairorder.ClassList.length)
      //   Toast("序列号不能为空");
      //   return;
      // }
      // if (this.$store.state.repairorder.productLine_id == "") {
      //   Toast("产品线不能为空");
      //   return;
      // }

      // if (this.$store.state.repairorder.ApplicationType == "维修") {
      //   if (
      //     this.$store.state.repairorder.modelNumber_id == "" ||
      //     this.$store.state.repairorder.modelNumber_id == undefined
      //   ) {
      //     Toast("故障类型不能为空");
      //     return;
      //   }
      // }
      // if (Cookie.getCookie("avatar") != "3") {
      //   if (this.Customer.customerName == "") {
      //     Toast("客户名称不能为空");
      //     return;
      //   }
      //   if (
      //     this.Customer.customerLevel == "" ||
      //     this.Customer.customerLevel == null
      //   ) {
      //     Toast("终端客户级别不能为空");
      //     return;
      //   }
      // }

      if (this.Customer.contacts == "") {
        Toast("联系人不能为空");
        return;
      }
      if (this.Customer.phone == "") {
        Toast("联系人电话不能为空");
        return;
      }
      // if (this.bool01 == 1) {
      //   if (this.accessories == "" || this.accessories == undefined) {
      //     Toast("配件名称不能为空");
      //     return;
      //   }
      //   if (this.MaterialCode == "" || this.MaterialCode == undefined) {
      //     Toast("物料编号不能为空");
      //     return;
      //   }
      // }
      // if (this.$store.state.repairorder.ApplicationType == "维修") {
      //   if (
      //     this.$store.state.repairorder.repairWhy == "" ||
      //     this.$store.state.repairorder.repairWhy == undefined
      //   ) {
      //     Toast("报修原因不能为空");
      //     return;
      //   }

        // if (
        //   this.$store.state.repairorder.serviceContent == "" ||
        //   this.$store.state.repairorder.serviceContent == undefined
        // ) {
        //   Toast("服务内容不能为空");
        //   return;
        // }
     
      if (this.$store.state.repairorder.ApplicationType == "安装") {
        this.$Axios
          .post(baseUrl + "/customerAdmin/queryAdminCustomerByName", {
            customerName: this.Customer.customerName
          })
          .then(res => {
            if (res.data.code == 200) {
              this.totosend();
            }
            if (res.data.code == -100) {
              Toast({
                message: "未找到" + this.Customer.customerName + "的信息",
                duration: 1000
              });
            }
          })
         
      } else {
        this.totosend();
      }

      // this.xiugaiyonghu();
    },
    totosend() {
      var storage = window.localStorage;
      let data = JSON.parse(storage.getItem("staffClassList"));
      let arrstr = [];
      for (let i in this.restaurants) {
        if (this.phoneObj.value != this.restaurants[i].value) {
          if (i == this.restaurants.length - 1) {
            if (this.Customer.contacts != this.phoneObj.value) {
              arrstr.push({
                contacts: this.phoneObj.value,
                phone: this.phoneObj.phone,
                serviceContent:this.phoneObj.serviceContent,
              });
            }
          }
        }
        arrstr.push({
          contacts: this.restaurants[i].value,
          phone: this.restaurants[i].phone,
          serviceContent:this.restaurants[i].serviceContent
        });
      }

      data.customer_level_id = this.Customer.customerLevel;
      data.customerNameLine=this.Customer.customerNameLine;
      data.modelLine =this.Customer.modelLine;
      data.name = this.customerName;
      data.contact = this.Customer.contacts;
      data.contactPhone = this.Customer.phone;
      data.serviceContent = this.Customer.serviceContent;
      data.productLine =this.productLine;
       data.model=this.modelLine;
      data.contactList = arrstr;
      data.solution = this.solution;
     // data.serviceContent = this.serviceContent;
      data.repairWhy = this.repairWhy;
      data.MaterialCode = this.MaterialCode;
      data.accessories = this.accessories;
      data.isshifu = this.bool01;
      storage.setItem("staffClassList", JSON.stringify(data));
      for(let i=0;i<_this.user_list.length;i++){
        if(this.pagelist.customerName==_this.user_list[i].customerName){
          let bailing111=_this.user_list[i].id
          this.kehumingcheng=bailing111
        }
      
      }
      if (Cookie.getCookie("avatar") == "2") {
        _this.$router.push({
          path: "/repairconfirm-zhuanxiang",
          query: { id: 2,model:this.modelLine,productLine:this.productLine,customerName:this.pagelist.customerName,customerId:this.kehumingcheng,productLineId:this.productLineId}
        });
      } else if (Cookie.getCookie("avatar") == "1") {
        _this.$router.push({
          path: "/repairconfirm-zhuanxiang",
          query: { id: 2 }
        });
      } else if (Cookie.getCookie("avatar") == "3") {
        _this.$router.push({
          path: "/repairconfirm-zhuanxiang",
          query: { id: 2 }
        });
      }
    },

    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },

    loadAll() {
      let arr = [];
      let id = "";
      if (
        this.$store.state.repairorder.newid != undefined &&
        this.$store.state.repairorder.newid != ""
      ) {
        id = this.$store.state.repairorder.newid;
      } else {
        id = this.$store.state.repairorder.customerId;
      }
      this.$Axios
        .post(baseUrl + "/customerAdmin/queryContactsByName", {
          id: id
        })
        .then(res => {
          if (res.data.code == 200) {
            this.Customer.contactList = res.data.data[0].contactList;
            let data = res.data.data[0].contactList;
            for (let i = 0; i <= data.length - 1; i++) {
              arr.push({ value: data[i].contacts, phone: data[i].phone });
              // arr.push({id:data[i].id , value: data[i].contacts, phone: data[i].phone });
            }
            this.restaurants = arr;
          }
        })
        .catch(() => {});
      // return arr;
    },
    // handleSelect(item, i) {
   
    //   //中间变量
    //   let phoneObj = this.phoneObj;

    //   for (let i in this.restaurants) {
    //     if (this.restaurants[i].value == item.value) {
    //       this.Customer.contacts = this.restaurants[i].value;
    //       this.Customer.phone = this.restaurants[i].phone;

    //       this.phoneObj = {
    //         value: this.restaurants[i].value,
    //         phone: this.restaurants[i].phone
    //       };

    //       //中间变量
    //       this.restaurants[i].value = phoneObj.value;
    //       this.restaurants[i].phone = phoneObj.phone;
    //     }
    //   }
    // }
  },
  mounted() {
    if (this.$store.state.repairorder.customerId == "") {
      return;
    } else {
      this.restaurants = this.loadAll();
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
    this.timebool = false;
    next();
  }
};
</script>
<style >
.xiongxiong1 .el-select > .el-input {
  height: 0.84rem;
}
.xiongxiong1 .el-select {
  vertical-align: top;
  margin-top: 0.15rem;
}
.xiongxiong1 .el-select .el-input .el-select__caret {
  height: 0.85rem;
  vertical-align: top;
}
.xiongxiong1 .el-select .el-input .is-reverse {
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
.box {
  position: relative;
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
.main li {
  width: 7.5rem;
  /* height: 1.15rem; */
  line-height: 1.16rem;
  background: #fff;
  position: relative;
  margin-bottom: 0.02em;
}
.grabble {
  width: 100%;
  margin: 0.16rem 0;
  height: 0.96rem;
  left:  0.8rem;
}
.grabble {
  width: 100%;
  margin: 0.16rem 0;
  height: 0.96rem;
}
.grabble input {
  width: 4.55rem;
  height: 0.96rem;
  border: 0.01rem #b8b8ba solid;
  line-height: 0.96rem;
  font-size: 0.25rem;
  padding-left: 0.25rem;
  float: left;
}
.grabble i {
  display: block;
  float: left;
  width: 0.83rem;
  height: 0.98rem;
  line-height: 0.96rem;
  background: #919191;
  position: relative;
}
.grabble i u {
  display: block;
  width: 0.33rem;
  height: 0.37rem;
  position: absolute;
  top: 0.34rem;
  left: 0.26rem;
  background: url("/../../assets/b_fadajing.png") no-repeat;
  background-size: 100% 100%;
}
.grabble span {
  color: #592d8d;
  font-size: 0.26rem;
  line-height: 0.96rem;
  width: 0.59rem;
  height: 0.58rem;
  float: left;
  margin: 0.23rem 0 0 0.46rem;
  background: url("/../../assets/staff_icon05.png") no-repeat;
  background-size: 100% 100%;
}

.grabble .ac {
  background: url("/../../assets/icon_plus_ac.png") no-repeat;
  background-size: 100% 100%;
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
  margin-top: 0.25rem;
  width: 0.7rem;
  height: 0.7rem;
  background: url("../assets/icon_jia02.png") no-repeat;
  background-size: 100% 100%;
  margin-left: 0.3rem;
}
.jiance1 {
  margin-top: 0.25rem;
  width: 0.7rem;
  height: 0.7rem;
  background: url("../assets/erweima.png") no-repeat;
  background-size: 100% 100%;
  margin-left: 0.2rem;
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

.anniu {
  width: 6.8rem;
  margin: 0.4rem 0;
  height: 0.63rem;
}

.anniu i {
  display: inline-block;
  width: 1.5rem;
  height: 0.63rem;
  font-size: 0.28rem;
  line-height: 0.63rem;
  text-align: center;
  vertical-align: top;
  margin-left: 0.7rem;
}
.anniu .ac {
  background: #dcdcdc;
}
i[data-v-16c71cda] {
  display: block;
  float: left;
  width: 0.83rem;
  height: 0.98rem;
  line-height: 0.96rem;
  background: #919191;
  position: relative;
}
.sous i {
  display: block;
  float: left;
  width: 0.83rem;
  height: 0.98rem;
  line-height: 0.96rem;
  background: #919191;
  position: relative;
}
</style>


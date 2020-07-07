<template>
  <div></div>
</template>

<script>
import Cooike from "../api/cookie.js";
import { Toast } from "mint-ui";
import baseUrl from "../api/baseUrl.js";
export default {
  data() {
    return {
      token: "",
      avatar: "",
      phone: "",
      VerificationCode: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.token = Cooike.getCookie("token");
      vm.avatar = Cooike.getCookie("avatar");
      vm.phone = Cooike.getCookie("phone");


      //设置产品报修  list 初始对象  ——--------------
      var storage = window.localStorage;

      var ClassList = [
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
          coding: "", //  物料编码
          customerId: "" //客户id
        }
      ];

      let staffClassList = {
        customerId: "",
        proID: "",
        productLine_id: "",
        productLine: "",
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
        customerType: "" ///客户类型
      };
      let arrtype = {
        name: "",
        id: ""
      };

      storage.setItem("setApplicationType", JSON.stringify(arrtype));
      storage.setItem("ClassList", JSON.stringify(ClassList));
      storage.setItem("staffClassList", JSON.stringify(staffClassList));
      storage.setItem("isScan", "false");
      storage.setItem("isStaffScan", "false");

      vm.$store.state.repairorder = {
        ClassList: [], //多个设备号
        customerId: "", //客户id
        repairorderId: "", //员工编号
        repaiName: "", //员工名称
        repaiPhone: "", //员工电话
        ApplicationType: "", //申请类型
        ApplicationType_id: "", //申请类型id
        DeviceNumber: "", //设备号
        DeviceType: [],
        modelNumber: "", //机型
        modelNumber_id: "", //机型编码
        productLine: "", //产品线
        productLine_id: "", // //产品线 id
        level: "", //级别
        time:
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() < 9
            ? "0" + parseInt(new Date().getMonth() + 1)
            : new Date().getMonth() + 1) +
          "-" +
          (new Date().getDate() < 9
            ? "0" + parseInt(new Date().getDate() + 1)
            : new Date().getDate()), //时间
        repaiProvince: "", // 员工 省份

        // ===================================
        name: "", //医院或者渠道名称
        customer_code: "", //客户编码
        address: "", //地址
        country: "", //国家
        city: "", //城市
        province: "", //省份
        customer_level: "", //代理级别
        customer_level_id: "", //代理级别id

        customer_service_level: "", //客户服务等级
        zip_code: "", //邮编
        use_department: "", //使用科室
        customerType: "", //客户类型
        contact: "", //联系人
        contactPhone: "", //联系人电话
        position: "", //职位

        // ===================================
        isshifu: "", //是否更换配件
        solution: "", //解决方法
        accessories: "", //配件名称
        MaterialCode: "", //物料编码
        serviceContent: "", //服务内容
        repairWhy: "" //报修原因
      };

      //---------------------------------
      vm.$Axios
        .post(baseUrl + "/admin/exemptionLogin")
        .then(function(response) {
          let arr = Object.keys(response.data.data);
          //空
          if (arr.length == 0) {
            vm.$router.replace({
              path: "/userLogin",
              query: { id: vm.$route.query.id }
            });
          } else {
            //不为空
            Cooike.setCookie("token", vm.token);
            Cooike.setCookie("avatar", vm.avatar);
            Cooike.setCookie("phone", vm.phone);

            if (Cooike.getCookie("avatar") == 0) {
              vm.isshuxin(vm);
              vm.$router.replace({
                path: "/custser"
              });
            } else if (Cooike.getCookie("avatar") == 1) {
              vm.isshuxin(vm);
              vm.$router.replace({
                path: "/custser"
              });
            } else if (Cooike.getCookie("avatar") == 2) {
              vm.isshuxin(vm,'员工');
              vm.$router.replace({
                path: "/staffserver"
              });
            } else if (Cooike.getCookie("avatar") == 3) {
              vm.isshuxin(vm);
              vm.$router.replace({
                path: "/custser"
              });
            }
          }
          //重复点击
        })
        .catch(function() {
          Toast({
            message: "网络开小差，请稍后重试",
            duration: 500
          });
          vm.$router.replace({
            path: "/"
          });
        });
    });
  },
  methods: {
    isshuxin(vm,yuangong) {
      if (Cooike.getCookie("avatar") == 0) {
        //医院的
        vm.$store.commit("Qeruyhospital", {
          position_id: Cooike.getCookie("position_id"),
          department_id: Cooike.getCookie("department_id"),
          type1: "POSITION",
          type2: "DEPARTMENT"
        });
      } else if (Cooike.getCookie("avatar") == 1) {
        vm.$store.commit("Qeruyregister", {
          channelLevel_id: Cooike.getCookie("channelLevel_id"),
          position_id: Cooike.getCookie("position_id"),
          type1: "CHANNEL_LEVEL",
          type2: "CHANNEL_POSITION"
        });
        //渠道的
      } else if (Cooike.getCookie("avatar") == 3) {
        //家庭的
        vm.$store.commit("Qeruyfamily", {
          productLine_id: Cooike.getCookie("productLine_id"),
          model_id: Cooike.getCookie("model_id"),
          type1: "PRODUCT_LINE",
          type2: "EQUI_MODEL",
          name: "model"
        });
      }
      if(yuangong == '员工'){
        vm.$store.commit("getemployees");
      }
      
    }
  }
};
</script>
<style scoped>
</style>


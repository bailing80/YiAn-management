<template>
  <div style="position:relative">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">客户产品信息</p>
    </div>
    <ul class="main" v-for="(name,ide) in list" :key="ide">
      <li>
        <p>机器名称：{{name.product}}</p>
      </li>
      <li>
        <p>序列号：{{name.deviceId}}</p>
      </li>
     
      <li>
        <p>安装时间：{{name.installDate}}</p>
      </li>
      <!-- <li>
        <p>创建时间：{{name.createDate}}</p>
      </li> -->
      <li>
        <p>保修开始时间：{{name.guaranteeBeginDate}}</p>
      </li>
      <li>
        <p>保修结束时间：{{name.guaranteeEndDate}}</p>
      </li>
       <li>
        <p>安装人：{{name.installer}}</p>
      </li>
    </ul>
    
  </div>
</template>

<script>
import baseUrl from "../../api/baseUrl.js";
import { Toast, MessageBox, Indicator } from "mint-ui";
import Cookie from "../../api/cookie.js";
import axios from "axios";

var _this;
export default {
  name: "repairorder",
  data() {
    return {
      list: []
    };
  },

  created() {
    _this = this;
    this.listlie();
  },

  methods: {
    listlie() {
      this.$Axios
        .post(baseUrl + "/customerAdmin/queryAdminCustomerById", {
          id: this.$route.query.id
        })
        .then(function(response) {
          if (response.data.code == 200) {
            let datalist = response.data.data.productInfo;
            // for (let num = 0; num <= _this.CITY.length - 1; num++) {
            //   if (_this.CITY[num].value == datalist.city) {
            //     datalist.city = _this.CITY[num].lable;
            //   }
            // }
            // for (let num = 0; num <= _this.PROVINCE.length - 1; num++) {
            //   if (_this.PROVINCE[num].value == datalist.province) {
            //     datalist.province = _this.PROVINCE[num].lable;
            //   }
            // }
            // for (let num = 0; num <= _this.CUSTOMER_LEVEL.length - 1; num++) {
            //   if (_this.CUSTOMER_LEVEL[num].value == datalist.customerLevel) {
            //     datalist.customerLevel = _this.CUSTOMER_LEVEL[num].lable;
            //   }
            // }
            // for (
            //   let num = 0;
            //   num <= _this.CUSTOMER_SERVICE_LEVEL.length - 1;
            //   num++
            // ) {
            //   if (
            //     _this.CUSTOMER_SERVICE_LEVEL[num].value ==
            //     datalist.customerServiceLevel
            //   ) {
            //     datalist.customerServiceLevel =
            //       _this.CUSTOMER_SERVICE_LEVEL[num].lable;
            //   }
            // }
            // for (let num = 0; num <= _this.CUSTOMER_TYPE.length - 1; num++) {
            //   if (_this.CUSTOMER_TYPE[num].value == datalist.customerType) {
            //     datalist.customerType = _this.CUSTOMER_TYPE[num].lable;
            //   }
            // }
            // for (let num = 0; num <= _this.DEPARTMENT.length - 1; num++) {
            //   if (_this.DEPARTMENT[num].value == datalist.useDepartment) {
            //     datalist.useDepartment = _this.DEPARTMENT[num].lable;
            //   }
            // }
            _this.list = datalist;
          }
        })
        .catch(function(error) {
          Toast({
            message: "网络开小差了，请稍后重试",
            duration: 1000
          });
        });
    },
    toback() {
      this.$router.go(-1);
    }
  }
};
</script>

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
.main {
  padding-bottom: .2rem;
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
.main li i {
  position: absolute;
  top: 0.45rem;
  right: 0.35rem;
  color: #acacac;
  font-style: normal;
  width: 0.17rem;
  height: 0.28rem;
  background: url("../../assets/arrow_r.png") no-repeat;
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
  background: url("../../assets/icon_jia02.png") no-repeat;
  background-size: 100% 100%;
  margin-left: 0.3rem;
}
.jiance1 {
  margin-top: 0.25rem;
  width: 0.7rem;
  height: 0.7rem;
  background: url("../../assets/erweima.png") no-repeat;
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
  background: url("../../assets/cha.png") no-repeat;
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
</style>


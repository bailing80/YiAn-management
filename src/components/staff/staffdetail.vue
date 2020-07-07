<template>
  <div class="box">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">客户信息</p>
    </div>
    <div class="main">
      <ul>
       
        <!-- <li>
          <p>安装日期</p>
          <span>2010-07-06</span>
          <i></i>
        </li>-->
        <li>
          <p>客户</p>
          <span>{{list.customerName}}</span>
          <i></i>
        </li>
        <!-- <li>
          <p>产品</p>
          <span>112000021</span>
          <i></i>
        </li>-->
        <li>
          <p>级别</p>
          <span>{{list.customerLevel}}</span>
          <i></i>
        </li>
        <li>
          <p>服务级别</p>
          <span>{{list.customerServiceLevel}}</span>
          <i></i>
        </li>
        <li>
          <p>客户类型</p>
          <span>{{list.customerType}}</span>
          <i></i>
        </li>
        <li>
          <p>联系人</p>
          <span>{{list.contacts}}</span>
          <i></i>
        </li>
        <!-- <li><p>派工单号</p><span>AZ-20100623-0018</span><i></i></li> -->
        <li>
          <p>联系电话</p>
          <span>{{list.phone}}</span>
          <i></i>
        </li>
         <li>
          <p>省份</p>
          <span>{{list.province}}</span>
          <i></i>
        </li>
        <li>
          <p>地址</p>
          <span>{{list.address}}</span>
          <i></i>
        </li>
        <li>
          <p>创建时间</p>
          <span>{{list.createDate}}</span>
          <i></i>
        </li>
        <!-- <li>
          <p>设备号</p>
          <span>SL520YZZV039</span>
          <i></i>
        </li>-->
        <!-- <li>
          <p>安装人</p>
          <span>袁志超</span>
          <i></i>
        </li>-->
        <!-- <li>
          <p>科室</p>
          <span>内科</span>
          <i></i>
        </li>-->
        <!-- <li>
          <p>保修结束日期</p>
          <span>2011-07-05</span>
          <i></i>
        </li>
        <li>
          <p>保修开始日期</p>
          <span>2010-07-06</span>
          <i></i>
        </li> -->
        <!-- <li>
          <p>使用科室</p>
          <span>{{list.useDepartment}}</span>
          <i></i>
        </li> -->
        <li>
          <p>邮政编码</p>
          <span>{{list.zipCode}}</span>
          <i></i>
        </li>
       
        <!-- <li>
          <p>故障现象</p>
          <textarea maxlength="85" placeholder="请描述故障"></textarea>
          <i></i>
        </li>-->
        <!-- <li>
          <p>城市</p>
          <span>洛阳</span>
          <i></i>
        </li>-->
      </ul>
    </div>
  </div>
</template>

<script>
import baseUrl from "../../api/baseUrl.js";
import { Toast } from "mint-ui";

var _this;
export default {
  name: "position",
  data() {
    return {
      src1: "../../assets/code.png",
      list: {},
      CITY: [],
      PROVINCE:[],
      CUSTOMER_LEVEL:[],
      CUSTOMER_SERVICE_LEVEL:[],
      CUSTOMER_TYPE:[],
      DEPARTMENT:[],
    };
  },
  created() {
    _this = this;

    this.$Axios
      .post(baseUrl + "/dicCode/queryDicByMoreType?type=CITY,PROVINCE,CUSTOMER_LEVEL,CUSTOMER_SERVICE_LEVEL,CUSTOMER_TYPE,DEPARTMENT")
      .then(function(response) {
        //重复点击
        if (response.data.code == 200) {
          for (let num = 0; num <= response.data.data.length - 1; num++) {
            if (response.data.data[num].type == "CITY") {
              _this.CITY.push(response.data.data[num]);
            }
            if (response.data.data[num].type == "PROVINCE") {
              _this.PROVINCE.push(response.data.data[num]) ;
            }
            if (response.data.data[num].type == "CUSTOMER_LEVEL") {
              _this.CUSTOMER_LEVEL.push(response.data.data[num]);
            }
            if (response.data.data[num].type == "CUSTOMER_SERVICE_LEVEL") {
              _this.CUSTOMER_SERVICE_LEVEL.push(response.data.data[num]) ;
            }
            if (response.data.data[num].type == "CUSTOMER_TYPE") {
              _this.CUSTOMER_TYPE.push(response.data.data[num]);
            }
            if (response.data.data[num].type == "DEPARTMENT") {
              _this.DEPARTMENT.push(response.data.data[num]);
            }
          }
        }
        _this.listlie();
      })
      .catch(function(error) {
         Toast({
            message: "网络开小差了，请稍后重试",
            duration: 1000
          });
      });
  },
  methods: {
    listlie() {
      this.$Axios
        .post(baseUrl + "/customerAdmin/queryAdminCustomerById", {
          id: this.$route.query.id
        })
        .then(function(response) {
          if (response.data.code == 200) {
            let datalist = response.data.data.customerInfo
            for (let num = 0; num <= _this.CITY.length - 1; num++) {
              if (_this.CITY[num].value == datalist.city) {
                datalist.city = _this.CITY[num].lable;
              }
            }
            for (let num = 0; num <= _this.PROVINCE.length - 1; num++) {
              if (_this.PROVINCE[num].value == datalist.province) {
                datalist.province = _this.PROVINCE[num].lable;
              }
            }
            for (let num = 0; num <= _this.CUSTOMER_LEVEL.length - 1; num++) {
              if (_this.CUSTOMER_LEVEL[num].value == datalist.customerLevel) {
                datalist.customerLevel = _this.CUSTOMER_LEVEL[num].lable;
              }
            }
            for (let num = 0; num <= _this.CUSTOMER_SERVICE_LEVEL.length - 1; num++) {
              if (_this.CUSTOMER_SERVICE_LEVEL[num].value == datalist.customerServiceLevel) {
                datalist.customerServiceLevel = _this.CUSTOMER_SERVICE_LEVEL[num].lable;
              }
            }
            for (let num = 0; num <= _this.CUSTOMER_TYPE.length - 1; num++) {
              if (_this.CUSTOMER_TYPE[num].value == datalist.customerType) {
                datalist.customerType = _this.CUSTOMER_TYPE[num].lable;
              }
            }
            for (let num = 0; num <= _this.DEPARTMENT.length - 1; num++) {
              if (_this.DEPARTMENT[num].value == datalist.useDepartment) {
                datalist.useDepartment = _this.DEPARTMENT[num].lable;
              }
            }
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
    },
    toyiyuan() {
      this.$router.replace({
        path: "/custser"
      });
    }
  }
};
</script>
<style scoped>
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
.main li span {
  height: 0.89rem;
  line-height: 0.89rem;
  width: 5.3rem;
  color: #666666;
  font-size: 0.28rem;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 1.5rem;
  background: border-box;
  text-align: right;
}

.main li input {
  height: 0.89rem;
  line-height: 0.89rem;
  width: 5.3rem;
  color: #666666;
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
}
.main li p {
  height: 0.89rem;
  color: #323232;
  font-size: 0.28rem;
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
  line-height: 0.34rem;
  height: 1.6rem;
  width: 6.8rem;
  color: #666666;
  font-size: 0.28rem;
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

.mt {
  margin: 0.8rem 0 1rem 0.35rem;
  width: 3.2rem;
  display: inline-block;
  vertical-align: top;
}

.main .hg_ac {
  height: auto;
}
</style>


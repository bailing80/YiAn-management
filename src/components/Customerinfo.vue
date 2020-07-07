<template>
  <div class="xiongxiong">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">修改客户信息</p>
    </div>
    <ul class="main">
      <li>
        <span>客户名称：</span>
        <input
          type="text"
          placeholder="客户名称"
          maxlength="50"
          v-model="datalist.customerName"
          style="width:3.6rem"
        />
      </li>

      <li>
        <span>省份：</span>
        <!-- <input type="text" placeholder="省份" /> -->

        <el-select v-model="datalist.province" placeholder="请选择" clearable>
          <el-option
            v-for="item in provinces"
            :key="item.id"
            :label="item.lable"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li>
        <span>城市：</span>
        <el-select v-model="datalist.city" placeholder="请选择">
          <el-option v-for="item in citys" :key="item.id" :label="item.lable" :value="item.value"></el-option>
        </el-select>
      </li>

      <li>
        <span>联系人：</span>
        <input type="text" placeholder="联系人" v-model="datalist.contacts" />
      </li>
      <li>
        <span>电话：</span>
        <input type="text" placeholder="电话" v-model="datalist.phone" maxlength="11" />
      </li>
      <li>
        <span>地址：</span>
        <input type="text" placeholder="地址" v-model="datalist.address" />
      </li>
      <li>
        <span>邮编：</span>
        <input type="text" placeholder="邮编" v-model="datalist.zipCode" />
      </li>
      <li>
        <span>使用科室：</span>
        <el-select v-model="datalist.useDepartment" placeholder="请选择">
          <el-option
            v-for="item in departments"
            :key="item.id"
            :label="item.lable"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li>
        <span>客户服务等级：</span>
        <el-select v-model="datalist.customerServiceLevel" placeholder="请选择">
          <el-option
            v-for="item in customerServiceLevels"
            :key="item.id"
            :label="item.lable"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li>
        <span>终端客户级别：</span>
        <el-select v-model="datalist.customerLevel" placeholder="请选择">
          <el-option
            v-for="item in customerLevels"
            :key="item.id"
            :label="item.lable"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li>
        <span>终端客户类型：</span>
        <el-select v-model="datalist.customerType" placeholder="请选择">
          <el-option
            v-for="item in customerTypes"
            :key="item.id"
            :label="item.lable"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      
      <li>
        <span>国家：</span>
        <el-select v-model="datalist.country" placeholder="请选择">
          <el-option
            v-for="item in countrys"
            :key="item.id"
            :label="item.lable"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
    </ul>
    <div>
      <i class="sendbtn mt" >修改</i>
      <i class="sendbtn mt" @click="toback">返回</i>
    </div>

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
import { Toast, MessageBox, Indicator } from "mint-ui";
import Cookie from "../api/cookie.js";

import TimeComponent from "@/components/workorder/TimeComponent";

var _this;
export default {
  name: "repairorder",
  data() {
    return {
      bool: false,
      title: "123",
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

      datalist: {
        userType: "",
        customerCode: "",
        customerName: "",
        province: "",
        city: "",
        contacts: "",
        phone: "",
        customerLevel: "",
        customerType: "",
        customerServiceLevel: "",
        address: "",
        zipCode: "",
        useDepartment: "",
        department: "",
        country: ""
      },
      // 获取所有客户类型
      userTypes: [],
      // 获取所有科室
      departments: [],
      // 获取所有客户服务等级
      customerServiceLevels: [],
      // 获取所有终端客户类型
      customerTypes: [],
      // 获取所有终端客户级别
      customerLevels: [],
      // 获取所有国家
      countrys: [],
      // 获取所有省份
      provinces: [],
      // 获取所有城市
      citys: []
    };
  },
  components: {
    TimeComponent
  },
  created() {
    _this = this;
  },

  mounted() {
    //类型查找
    this.typelist();
    //查客户信息
    this.addOrEdit();
  },

  methods: {
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
            // 获取所有客户类型
            this.userTypes = res.data.data.USERTYPE;
            // 获取所有科室
            this.departments = res.data.data.DEPARTMENT;
            // 获取所有客户服务等级
            this.customerServiceLevels = res.data.data.CUSTOMER_SERVICE_LEVEL;
            // 获取所有终端客户类型
            this.customerTypes = res.data.data.CUSTOMER_TYPE;
            // 获取所有终端客户级别
            this.customerLevels = res.data.data.CUSTOMER_LEVEL;
            // 获取所有国家
            this.countrys = res.data.data.COUNTRY;
            // 获取所有省份
            this.provinces = res.data.data.PROVINCE;
            // 获取所有城市
            this.citys = res.data.data.CITY;
          }
        })
        .catch(() => {
          Toast({
            message: "网络开小差了，请稍后重试",
            duration: 1000
          });
        });
    },
    addOrEdit() {
      let id = this.$route.query.id;

      this.$Axios
        .post(baseUrl + "/customerAdmin/queryCustomernfoById?", { id: id })
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
            console.log(res)
            this.datalist.customerName = res.data.data.customerName;
            this.datalist.province = res.data.data.province;
            this.datalist.city = res.data.data.city;
            this.datalist.contacts = res.data.data.contacts;
            this.datalist.phone = res.data.data.phone;
            this.datalist.customerServiceLevel =
              res.data.data.customerServiceLevel;
            this.datalist.customerLevel = res.data.data.customerLevel;
            this.datalist.customerType = res.data.data.customerType;
            this.datalist.useDepartment = res.data.data.useDepartment;
            this.datalist.address = res.data.data.address;
            this.datalist.zipCode = res.data.data.zipCode;
            this.datalist.country = res.data.data.country;
          }
        })
        .catch(() => {
          Toast({
            message: "网络开小差了，请稍后重试",
            duration: 1000
          });
        });
    },
    
    toback() {
      this.$router.go(-1);
    },
    quxiao() {},
    queding() {},
    onValuesChange() {},
    cancelTime(data) {
      if (data.name == "取消") {
        this.timebool = false;
      } else if (data.name == "确定") {
        this.$store.state.repairorder.time = data.time;
        this.timebool = false;
      }
      document.body.style.overflow = "inherit";
    }
  }
};
</script>
<style >
.xiongxiong .el-select > .el-input {
  height: 0.84rem;
}
.xiongxiong .el-select {
  vertical-align: top;
  margin-top: 0.15rem;
}
.xiongxiong .el-select .el-input .el-select__caret {
  height: 0.85rem;
  vertical-align: top;
}
.xiongxiong .el-select .el-input .is-reverse {
  height: 0.65rem;
  vertical-align: top;
}
</style>

<style scoped>
.mt {
  margin: 0.5rem 0 1.5rem 0.35rem;
  width: 3.2rem;
  display: inline-block;
  vertical-align: top;
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
</style>


<template>
  <div class="box daxiong001">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">渠道信息</p>
    </div>
    <div>
      <ul class="select dl">
        <li @click="toyiyuan">
          <i>代理商名称</i>
          <p class="input01">{{this.$store.state.letter.user.channel_name}}</p>
        </li>

        <li @click="xuanzhe(0)">
          <i>代理商级别</i>
          <p class="input01">{{this.$store.state.letter.user.channel_level}}</p>
          <u></u>
        </li>
        <li @click="xuanzhe(1)">
          <i>是否签约</i>
          <p class="input01">{{this.$store.state.letter.user.is_signing == 1 ? '是':'否' }}</p>
          <u></u>
        </li>
      </ul>
      <ul class="select mb dl">
        <li @click="tozhiwu">
          <i>职位</i>
          <p class="input01">{{this.$store.state.letter.user.position}}</p>
          <u></u>
        </li>
      </ul>
      <ul class="select de">
        <li>
          <i>姓名</i>
          <p>
            <input type="text" class="input" placeholder="请输入姓名" v-model="name" />
          </p>
        </li>
        <li>
          <i>性别</i>
          <mt-radio v-model="sex" :options="['男', '女']"></mt-radio>
        </li>
      </ul>
    </div>
    <ul class="select mb xiugai">
      <li>
        <i>手机号</i>
        <p>{{this.$store.state.letter.user.phone}}</p>
        <!-- <u></u> -->
      </li>
    </ul>

    <div class="sendbtn mt" @click="tohome">提交</div>

    <div class="model" v-show="!model_bool">
      <div class="bg_yanse"></div>
      <div class="slots_list" :class="{demo_transform3:!model_bool,demo_transform4:model_bool}">
        <h2>{{title}}</h2>
        <span @click="quxiao" class="span1">取消</span>
        <span @click="queding">确定</span>
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </div>
    </div>
  </div>
</template>

<script>
import baseUrl from "../api/baseUrl.js";
import Cookie from "../api/cookie.js";
import { Toast } from "mint-ui";

var _this;
export default {
  name: "repair",
  data() {
    return {
      sex: "",
      name: "",
      title: "",
      values: "",
      valuesNum: "",
      distribution: [],
      isSigning: "否",
      model_bool: true,
      is_ajax: false,

      detail: {
        leixing: "",
        keshi: "",
        zhiwei: "",
        name: ""
      },

      isagent: true,
      level: [],
      is: ["是", "否"],
      slots: [
        {
          flex: 1,
          values: "",
          className: "slots",
          textAlign: "center"
        }
      ]
    };
  },
  created() {
    _this = this;
    if (this.$store.state.letter.user.sex == "0") {
      this.sex = "男";
    } else if (this.$store.state.letter.user.sex == "1") {
      this.sex = "女";
    }

    this.name = this.$store.state.letter.user.contacts_name;

    this.$Axios
      .post(baseUrl + "/dicCode/queryDicByMoreType?type=CHANNEL_LEVEL")
      .then(function(response) {
        if ((response.data.code = 200)) {
          _this.distribution = response.data.data;
          for (let i = 0; i < response.data.data.length; i++) {
            _this.level.push(response.data.data[i].lable);
          }
        }
      })
      .catch(function(error) {
        Toast({
          message: "网络开小差，请稍后重试",
          duration: 1000
        });
      });
  },
  watch: {
    sex() {
      if (this.sex == "男") {
        this.$store.commit("setsex", "0");
      } else {
        this.$store.commit("setsex", "1");
      }
    },
    name() {
      this.$store.commit("setchannelname", this.name);
    }
  },
  methods: {
    //返回上一页
    toback() {
      this.$router.push({
        path: "/userlogin?id=1"
      });
    },
    //进入医院类别选择
    toyiyuan() {
      _this.$store.commit("setIsregistered", 2);
      this.$router.push({
        path: "/cityYiyuan"
      });
    },
    //进入科室类别选择
    tokeshi() {
      this.$router.push({
        path: "/keshilist"
      });
    },

    //进入职务类别选择
    tozhiwu() {
      this.$store.commit("setIsposition", 0);
      this.$router.push({
        path: "/position"
      });
    },

    tohome() {
      if (_this.is_ajax) {
        Toast({
          message: "提交中，请勿重复提交",
          duration: 1000
        });
        return;
      }

      if (this.$store.state.letter.user.channel_name === "") {
        Toast("请核对输入的代理商名称");
        return;
      }
      if (this.$store.state.letter.user.channelLevel_id === "") {
        Toast("请核对选择的代理商级别");
        return;
      }
      // if(this.$store.state.letter.user.is_signing === '' ){
      //   Toast('请核对是否签约');
      //   return;
      // }
      if (this.$store.state.letter.user.position_id === "") {
        Toast("请核对选择的职位");
        return;
      }
      if (this.$store.state.letter.user.contacts_name === "") {
        Toast("请核对输入的姓名");
        return;
      }
      if (this.$store.state.letter.user.sex === "") {
        Toast("请核对选择的性别");
        return;
      }

      var datelist = {
        channelName: this.$store.state.letter.user.channel_name,
        customerId: this.$store.state.letter.history.customerId, //客户ID
        channelLevel: this.$store.state.letter.user.channelLevel_id,
        isSigning: this.$store.state.letter.user.is_signing,
        contactsName: this.$store.state.letter.user.contacts_name,
        phone: this.$store.state.letter.user.phone,
        position: this.$store.state.letter.user.position_id,
        sex: this.$store.state.letter.user.sex,
        customerCode: this.$store.state.letter.history.customer_code,
        city: this.$store.state.letter.history.city,
        province: this.$store.state.letter.history.province,
        customerServiceLevel: this.$store.state.letter.history
          .customer_service_level,
        address: this.$store.state.letter.history.address,
        zipCode: this.$store.state.letter.history.zip_code,
        useDepartment: this.$store.state.letter.history.use_department,
        customerType: this.$store.state.letter.history.customer_type,
        country: this.$store.state.letter.history.country
      };
      // return;
      this.is_ajax = true;

      this.$Axios
        .post(baseUrl + "/admin/isExist", {
          phone: this.$store.state.letter.user.phone,
          userType: "0", //医院  =   0     渠道  ==  1
          hospitalType: "1" // 医院   == 0     家庭 == 1
        })
        .then(function(response) {
          if (response.data.code == 200) {
            _this.$Axios
              .post(baseUrl + "/admin/registerChannel", datelist)
              .then(function(response) {
                //重复点击
                _this.is_ajax = false;
                if (response.data.msg == "注册成功") {
                  _this.$store.commit("setCookie", response.data.data.result);
                  _this.$store.commit("settoken", response.data.data.token);
                  _this.$store.state.letter.user.user_id =
                    response.data.data.result.userId;
                  window.localStorage.removeItem("CodeTime");
                  _this.$router.push({
                    path: "/custser"
                  });
                }
              })
              .catch(function(error) {
                _this.is_ajax = false;
                Toast({
                  message: "网络开小差，请稍后重试",
                  duration: 1000
                });
              });
          } else {
            _this.is_ajax = false;
            Toast({
              message: "当前手机号已被注册过了",
              duration: 1000
            });
          }
          //重复点击
        })
        .catch(function(error) {
          _this.is_ajax = false;
        });
    },
    //选择框
    onValuesChange(picker, values) {
      this.values = values[0];
    },
    xuanzhe(n) {
      if (n == 0) {
        this.title = "代理商级别";
        this.slots[0].values = this.level;
      } else if (n == 1) {
        this.title = "是否签约";
        this.slots[0].values = this.is;
      }
      this.valuesNum = n;
      this.model_bool = !this.model_bool;
    },
    quxiao() {
      this.model_bool = !this.model_bool;
    },
    queding() {
      if (this.valuesNum == 0) {
        for (let numi = 0; numi <= this.distribution.length - 1; numi++) {
          if (this.values == this.distribution[numi].lable) {
            this.$store.commit("setchannelLevel", {
              channelLevel: this.distribution[numi].lable,
              channelLevel_id: this.distribution[numi].value
            });
          }
        }
      } else if (this.valuesNum == 1) {
        if (this.values == "是") {
          this.$store.commit("setisSigning", "1");
          this.isSigning = "是";
        } else if (this.values == "否") {
          this.$store.commit("setisSigning", "0");
          this.isSigning = "否";
        }
      }

      this.model_bool = !this.model_bool;
    }
    //选择框
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/userlogin") {
      this.$confirm("注册尚未完成是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          next();
        })
        .catch(() => {
          next(false);
        });
    } else {
      next();
    }
  }
};
</script>
<style>

.daxiong001 .mint-cell {
  margin-top: 0.08rem;
  width: 1.8rem;
  float: left;
  border: none;
  background-image: none;
}

.daxiong001 .mint-cell-wrapper {
  background-image: none;
  padding-right: 0;
}

.daxiong001 .mint-radio-input:checked + .mint-radio-core::after {
  background-color: #998bd6;
  transform: scale(2.5);
}
.daxiong001 .mint-radio-input:checked + .mint-radio-core {
  border-color: #998bd6;
  background-color: #fff;
  transform: scale(0.8);
}
.daxiong001 .mint-radio-core {
  transform: scale(0.8);
}
.daxiong001 .mint-cell:last-child {
  background-image: none;
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
  bottom: 0;
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
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 200px);
  }
}
@keyframes zhankai {
  0% {
    transform: translate(0, 200px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 7.5rem;
}
.select {
  width: 7.5rem;
  height: auto;
  border-top: 0.01rem #eaeaea solid;
  border-bottom: 0.01rem #eaeaea solid;
  background: #fff;
}
.select li {
  height: 1.16rem;
  width: 7.5rem;
  position: relative;
}
.select li p {
  height: 1.16rem;
  width: 5.4rem;
  border-bottom: 0.01rem #eaeaea solid;
  font-size: 0.28rem;
  line-height: 1.16rem;
  text-align: right;
  padding-right: 0.75rem;
  float: left;
}

.select li .input {
  height: 0.32rem;
  width: 4.95rem;
  border: 0.01rem #c5c5c5 solid;
  font-size: 0.25rem;
  line-height: 0.32rem;
  float: left;
  margin: 0.2rem 0 0 0.58rem;
  padding: 0.2rem 0.2rem;
}

.select li .input01 {
  height: 1.16rem;
  width: 4.4rem;
  border-bottom: 0.01rem #eaeaea solid;
  font-size: 0.28rem;
  line-height: 1.16rem;
  text-align: right;
  padding-right: 0.75rem;
  float: left;
  overflow: hidden;
}

.select li .input02 {
  height: 1.16rem;
  width: 5.4rem;
  border-bottom: 0.01rem #eaeaea solid;
  font-size: 0.28rem;
  line-height: 1.16rem;
  text-align: right;
  padding-right: 0.75rem;
  float: left;
}

.select li i {
  display: block;
  width: 1rem;
  height: 1.16rem;
  font-size: 0.28rem;
  line-height: 1.16rem;
  float: left;
  font-style: normal;
  text-align: left;
  margin-left: 0.35rem;
}
.select li u {
  display: block;
  height: 0.28rem;
  width: 0.17rem;
  background: url("../assets/arrow_r.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0.45rem;
  right: 0.35rem;
}

.dl li i {
  width: 2rem;
}

.dl li p {
  width: 4.94rem;
}
.de li p {
  width: 5.4rem;
}
.de li .input {
  margin: 0.2rem 0 0 0.38rem;
}

.mb {
  margin: 0.16rem 0;
}

.xiugai li i {
  width: 1.3rem;
}
.xiugai li p {
  width: 5.1rem;
}
.mt {
  margin: 2rem 0 1rem 0.35rem;
}
</style>


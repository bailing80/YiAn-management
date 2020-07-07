<template>
  <div class="box xiongmao012">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">客户信息</p>
    </div>
    <ul class="select">
      <li @click="toyiyuan">
        <i>医院</i>
        <p>{{this.$store.state.letter.user.hospital_name}}</p>
        <u></u>
      </li>
      <li class="rb" @click="tokeshi">
        <i>科室</i>
        <p>{{this.$store.state.letter.user.department}}</p>
        <u></u>
      </li>
    </ul>
    <ul class="select mb">
      <li @click="tozhiwu">
        <i>职位</i>
        <p>{{this.$store.state.letter.user.position}}</p>
        <u></u>
      </li>
    </ul>
    <ul class="select">
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
    <ul class="select mb xiugai">
      <li>
        <i>手机号</i>
        <p>{{this.$store.state.letter.user.phone}}</p>
        <!-- <u></u> -->
      </li>
    </ul>
    <div class="sendbtn mt" @click="tohome">提交</div>
  </div>
</template>

<script>
var _this;
import Cookie from "../../api/cookie.js";
import baseUrl from "../../api/baseUrl.js";
import { Toast } from "mint-ui";

export default {
  name: "repair",
  data() {
    return {
      sex: "",
      name: "",
      is_ajax: false
    };
  },
  created() {
    _this = this;

    if (this.$store.state.letter.user.sex == "0") {
      this.sex = "男";
    } else if (this.$store.state.letter.user.sex == "1") {
      this.sex = "女";
    }

    this.name = this.$store.state.letter.user.name;
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
      this.$store.commit("setName", this.name);
    }
  },

  methods: {
    //返回上一页
    toback() {
      this.$router.push({
        path: "/userlogin",
        query: {
          id: "0"
        }
      });
    },
    //进入医院类别选择
    toyiyuan() {
      _this.$store.commit("setIsregistered", 0);
      this.$router.push({
        path: "/cityYiyuan"
      });
    },
    //进入科室类别选择
    tokeshi() {
      _this.$store.commit("setIsdepartment", 0);
      this.$router.push({
        path: "/keshilist"
      });
    },

    //进入职务类别选择
    tozhiwu() {
      _this.$store.commit("setIsposition", 0);
      this.$router.push({
        path: "/position"
      });
    },
    //进入电话编辑
    tophone() {
      this.$router.push({
        path: "/phone"
      });
    },
    //提交
    tohome() {
      if (_this.is_ajax) {
        Toast({
          message: "提交中，请勿重复提交",
          duration: 1000
        });
        return;
      }

      if (this.$store.state.letter.user.hospital_name === "") {
        Toast("请核对输入的医院名称");
        return;
      }
      if (this.$store.state.letter.user.department_id === "") {
        Toast("请核对输入的科室");
        return;
      }
      if (this.$store.state.letter.user.position_id === "") {
        Toast("请核对输入的职位");
        return;
      }
      if (this.$store.state.letter.user.name === "") {
        Toast("请核对输入的姓名");
        return;
      }
      if (this.$store.state.letter.user.sex === "") {
        Toast("请核对输入的性别");
        return;
      }

      var hospitalType = "";
      if (Cookie.getCookie("avatar") == 0) {
        hospitalType = "0";
      } else if (Cookie.getCookie("avatar") == 3) {
        hospitalType = "1";
      }

      var datelist = {
        phone: this.$store.state.letter.user.phone,
        customerId: this.$store.state.letter.history.customerId,
        position: this.$store.state.letter.user.position_id,
        sex: this.$store.state.letter.user.sex,
        customerCode: this.$store.state.letter.history.customer_code,
        city: this.$store.state.letter.history.city,
        province: this.$store.state.letter.history.province,
        customerLevel: this.$store.state.letter.history.customer_level,
        customerServiceLevel: this.$store.state.letter.history
          .customer_service_level,
        address: this.$store.state.letter.history.address,
        zipCode: this.$store.state.letter.history.zip_code,
        useDepartment: this.$store.state.letter.history.use_department,
        customerType: this.$store.state.letter.history.customer_type,
        country: this.$store.state.letter.history.country,
        department: this.$store.state.letter.user.department_id,
        hospitalName: this.$store.state.letter.user.hospital_name,
        name: this.$store.state.letter.user.name,
        userType: Cookie.getCookie("userType"),
        hospitalType: hospitalType
      };
      this.is_ajax = true;
      // return;

      this.$Axios
        .post(baseUrl + "/admin/isExist", {
          phone: this.$store.state.letter.user.phone,
          userType: "0", //医院  =   0     渠道  ==  1
          hospitalType: "0" // 医院   == 0     家庭 == 1
        })
        .then(function(response) {
          if (response.data.code == 200) {
            _this.$Axios
              .post(baseUrl + "/admin/registerHospital", datelist)
              .then(function(response) {
                //重复点击
                _this.is_ajax = false;
                if (response.data.code == 200) {
                  Toast({
                    message: response.data.msg,
                    duration: 1000
                  });
                  _this.$store.commit("setCookie", response.data.data.result);
                  _this.$store.commit("settoken", response.data.data.token);
                  _this.$store.state.letter.user.user_id =
                    response.data.data.result.userId;
                  window.localStorage.removeItem("CodeTime");
                  _this.$router.replace({
                    path: "/custser"
                  });
                } else {
                  _this.is_ajax = false;
                  Toast({
                    message: "注册失败",
                    duration: 1000
                  });
                }
              })
              .catch(function(error) {
                _this.is_ajax = false;
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
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/userlogin") {
      this
        .$confirm("注册尚未完成是否继续？", "提示", {
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

.xiongmao012 .mint-cell {
  margin-top: 0.08rem;
  width: 1.8rem;
  float: left;
  border: none;
  background-image: none;
}
.xiongmao012 .mint-cell-wrapper {
  background-image: none;
  padding-right: 0;
}
.xiongmao012 .mint-radio-core {
  transform: scale(0.8);
}

.xiongmao012 .mint-radio-input:checked + .mint-radio-core::after {
  background-color: #998bd6;
  transform:scale(2.5);
  margin: -0.01rem;
}
.xiongmao012 .mint-radio-input:checked + .mint-radio-core {
  border-color: #998bd6;
  background-color: #fff;
  transform: scale(0.8);
}
.xiongmao012 .mint-cell:last-child {
  background-image: none;
}
</style>


<style scoped>
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
  width: 5.75rem;
  border-bottom: 0.01rem #eaeaea solid;
  font-size: 0.28rem;
  line-height: 1.16rem;
  text-align: right;
  padding-right: 0.75rem;
  float: left;
  overflow: hidden;
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

.select li i {
  display: block;
  width: 1rem;
  height: 1.16rem;
  font-size: 0.28rem;
  line-height: 1.16rem;
  float: left;
  font-style: normal;
  text-align: right;
}
.select li u {
  display: block;
  height: 0.28rem;
  width: 0.17rem;
  background: url("../../assets/arrow_r.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0.45rem;
  right: 0.35rem;
}
.mb {
  margin: 0.16rem 0;
}

.xiugai li i {
  width: 1.3rem;
}
.xiugai li p {
  width: 5.45rem;
}
.mt {
  margin: 2rem 0 1rem 0.35rem;
}
</style>


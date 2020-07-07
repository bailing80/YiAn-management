<template>
  <div class="box xiongmao013">
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
          <input type="text" class="input" placeholder="请输入姓名" v-model="name">
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
import baseUrl from "../../api/baseUrl.js";
import cookie from "../../api/cookie.js";
import { Toast, MessageBox } from "mint-ui";

var _this;
export default {
  name: "repair",
  data() {
    return {
      is_ajax: false,
      sex: "",
      name: "",
      bool: false,
      values: "",
      slots: [
        {
          flex: 1,
          values: ["医院", "个人"],
          className: "slots",
          textAlign: "center"
        }
      ]
    };
  },
  created() {
    _this = this;

    if (cookie.getCookie("sex") == 0) {
      this.sex = "男";
    } else {
      this.sex = "女";
    }
    this.name = cookie.getCookie("name");
    if (this.$route.query.name != undefined && this.$route.query.name != "" ) {
      this.$store.state.letter.user.hospital_name = this.$route.query.name;
    }
  },

  methods: {
    //返回上一页
    toback() {
      this.$router.replace({
        path: "/custser"
      });
    },
    //进入医院类别选择
    toyiyuan() {
      _this.$store.commit("setIsregistered", 1);
      this.$router.push({
        path: "/cityYiyuan"
      });
    },
    //进入科室类别选择
    tokeshi() {
      _this.$store.commit("setIsdepartment", 1);
      this.$router.push({
        path: "/keshilist"
      });
    },

    //进入职务类别选择
    tozhiwu() {
      _this.$store.commit("setIsposition", 1);
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
    tohome() {
      if (this.is_ajax) {
        Toast({
          message: "提交中，请稍后",
          duration: 1000
        });
        return;
      }

      if (this.name === "") {
        Toast({
          message: "请核对输入的姓名",
          duration: 1000
        });
        return;
      }

      var sex_id = "";
      if (this.sex == "男") {
        sex_id = 0;
      } else {
        sex_id = 1;
      }

      var zhuanhuan = {
        userId: this.$store.state.letter.user.user_id,
        customerId: this.$store.state.letter.history.customerId,
        phone: this.$store.state.letter.user.phone,
        address: this.$store.state.letter.history.address,
        buyDate: this.$store.state.letter.history.buy_date,
        city: this.$store.state.letter.history.city,
        country: this.$store.state.letter.history.country,
        customerCode: this.$store.state.letter.history.customer_code,
        customerLevel: this.$store.state.letter.history.customer_level,
        customerServiceLevel: this.$store.state.letter.history
          .customer_service_level,
        customerType: this.$store.state.letter.history.customer_type,
        department: this.$store.state.letter.user.department_id,
        hospitalName: this.$store.state.letter.user.hospital_name,
        model: this.$store.state.letter.history.model,
        name: this.name,
        position: this.$store.state.letter.user.position_id,
        productLine: this.$store.state.letter.history.productLine,
        province: this.$store.state.letter.history.province,
        sex: sex_id,
        useDepartment: this.$store.state.letter.history.use_department,
        userType: this.$store.state.letter.user.userType,
        zipCode: this.$store.state.letter.history.zip_code
      };
      this.is_ajax = true;
      // return;
      this.$Axios
        .post(baseUrl + "/hospital/updHospitalInfoById", zhuanhuan)
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
            Toast({
              message: "成功修改信息",
              duration: 1000
            });
            _this.$store.commit("setsex", sex_id);
            _this.$store.commit("setName", _this.name);
            _this.$store.commit("setCookie", zhuanhuan);

            // _this.$store.commit('setCookie',datelist)
            //重复点击
            _this.is_ajax = false;
            _this.$router.push({
              path: "/custser"
            });
          }
        })
        .catch(function(error) {
          _this.is_ajax = false;
        });
    }
  }
};
</script>
<style>
.xiongmao013 .mint-cell {
  margin-top: 0.08rem;
  width: 1.8rem;
  float: left;
  border: none;
  background-image: none;
}
.xiongmao013 .mint-cell-wrapper {
  background-image: none;
  padding-right: 0;
}

.xiongmao013 .mint-radio-input:checked + .mint-radio-core::after {
  background-color: #998bd6;
  transform:scale(2.5);
}
.xiongmao013 .mint-radio-input:checked + .mint-radio-core {
  border-color: #998bd6;
  background-color: #fff;
}
.xiongmao013 .mint-radio-core {
  transform: scale(0.8);
}

.xiongmao013 .mint-cell:last-child {
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
    line-height: .32rem;
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


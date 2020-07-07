<template>
  <div class="box">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">选择科室</p>
    </div>
    <div class="lstis">
      <ul>
        <li
          :class="{ac:index%2==0}"
          v-for="(itme,index) in keshi_list"
          @click="xuanzhe(itme)"
          :key="index"
        >{{itme.lable}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import baseUrl from "../../api/baseUrl.js";
import Cookie from "../../api/cookie.js";
import { Toast, MessageBox } from "mint-ui";
var _this;
export default {
  name: "repair",
  data() {
    return {
      keshi_list: [],
    };
  },

  created() {
    _this = this;
    this.$Axios
      .post(baseUrl + "/dicCode/queryDicByMoreType?type=DEPARTMENT")
      .then(function(response) {
        //重复点击
        if (response.data.code == 200) {
          _this.keshi_list = response.data.data;
        }
      })
      .catch(function(error) {});
  },

  methods: {
    toback() {
      if (Cookie.getCookie("avatar") == "0") {
        if (Cookie.getCookie("Isdepartment") == 0) {
          this.$router.replace({
            path: "/userdetails"
          });
        } else if (Cookie.getCookie("Isdepartment") == 1) {
          this.$router.replace({
            path: "/userupdate"
          });
        }
      }
    },

    xuanzhe(n) {
      if (Cookie.getCookie("avatar") == "0") {
        if (Cookie.getCookie("Isdepartment") == 0) {
          this.$store.commit("setdepartment", n);
          this.$router.replace({
            path: "/userdetails"
          });
        } else if (Cookie.getCookie("Isdepartment") == 1) {
          this.$store.commit("setdepartment", n);
          this.$router.replace({
            path: "/userupdate"
          });
        }
      }
    }
  }
};
</script>
<style scoped>
.main {
  margin: 0 0.34rem;
}
.grabble {
  width: 100%;
  margin: 0.16rem 0;
  height: 0.96rem;
}
.grabble input {
  width: 4.45rem;
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
  background: url("../../assets/b_fadajing.png") no-repeat;
  background-size: 100% 100%;
}
.grabble span {
  color: #592d8d;
  font-size: 0.26rem;
  line-height: 0.96rem;
  height: 0.96rem;
  float: left;
  margin-left: 0.16rem;
}

.region {
  position: relative;
  width: 6.11rem;
  height: 1.8rem;
  background: #fff;
  padding: 0.69rem 0.34rem 0.4rem 0.34rem;
}
.region p {
  position: absolute;
  top: 0.28rem;
  left: 0.27rem;
  font-size: 0.25rem;
  color: #919191;
}
.region .list li {
  width: 1.23rem;
  height: 0.62rem;
  line-height: 0.62rem;
  text-align: center;
  margin: 0.14rem;
  float: left;
  background: #dcdcdc;
  font-size: 0.25rem;
}

.lstis ul li {
  width: 7.16rem;
  height: 0.97rem;
  background: #fff;
  font-size: 0.28rem;
  color: #000;
  line-height: 0.97rem;
  padding-left: 0.34rem;
}
.lstis ul .ac {
  background: #f2f3f7;
}
</style>


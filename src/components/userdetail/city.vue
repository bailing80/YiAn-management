<template>
  <div class="box">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">选择城市</p>
    </div>
    <div class="main">
      <!-- <div class="grabble">
        <input type="text" placeholder="请输入城市">
        <i>
          <u></u>
        </i>
      </div>-->
      <ul class="fenlei">
        <li class="sous">
          <select v-model="PROVINCEtext">
            <option value>选择省</option>
            <option
              :value="PROVINCElist.value"
              v-for="(PROVINCElist,PROVINCEindex) in PROVINCE"
              :key="PROVINCEindex"
            >{{PROVINCElist.lable}}</option>
          </select>
        </li>
      </ul>
    </div>
    <div class="lstis">
      <ul>
        <li
          :class="{ac:i%2==0}"
          @click="xuanzhe(itme)"
          v-for="(itme,i) in list"
          :key="i"
        >{{itme.lable}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
var _this;
import baseUrl from "../../api/baseUrl.js"; //请求ip地址
import { Toast, MessageBox, Indicator } from "mint-ui";
import Cookie from "../../api/cookie.js";

export default {
  data() {
    return {
      list: [],
      PROVINCE: [],
      PROVINCEtext: "",
      isPROVINCEtext: false
    };
  },
  created() {
    _this = this;
    _this.chaxun();
  },
  watch: {
    PROVINCEtext() {
      if (this.isPROVINCEtext) {
        Toast({
          message: "查询中，请稍后重试",
          duration: 1000
        });
        return;
      }
      this.isPROVINCEtext = true;

      _this.$Axios
        .post(baseUrl + "/dicCode/queryDicTwoByType", {
          parentId: this.PROVINCEtext
        })
        .then(function(response) {
          _this.isPROVINCEtext = false;
          _this.list = [];

          if (response.data.code == 200) {
            _this.list = response.data.data;
          }
        })
        .catch(function(error) {
          _this.isPROVINCEtext = false;
          Toast({
            message: "网络开小差，请稍后重试",
            duration: 1000
          });
        });
    }
  },
  methods: {
    chaxun() {
      Indicator.open({
        text: "加载中，请稍后",
        spinnerType: "fading-circle"
      });

      this.$Axios
        .post(baseUrl + "/dicCode/queryDicByMoreType?type=CITY,PROVINCE")
        .then(function(response) {
          //重复点击
          Indicator.close();
          if (response.data.code == 200) {
            for (
              var numlist = 0;
              numlist <= response.data.data.length - 1;
              numlist++
            ) {
              if (response.data.data[numlist].type == "CITY") {
                _this.list.push(response.data.data[numlist]);
              }
              if (response.data.data[numlist].type == "PROVINCE") {
                _this.PROVINCE.push(response.data.data[numlist]);
              }
            }
          } else if (response.data.code == -100) {
            Toast({
              message: "数据加载失败",
              duration: 1000
            });
          }
        })
        .catch(function(error) {
          Indicator.close();
          Toast({
            message: "网络开小差，请稍后重试",
            duration: 1000
          });
        });
    },

    toback() {
      this.$router.replace({
        path: "/cityYiyuan"
      });
    },

    //选择地区
    xuanzhe(cont) {
      this.$router.push({
        name: "cityYiyuan",
        params: { conti: cont.value }
      });
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
  width: 5.55rem;
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
.fenlei select {
  width: 1.7rem;
  height: 0.7rem;
  padding: 0.1rem 0.08rem;
  margin: 0.25rem 0.2rem 0.25rem 0;
  color: #555;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  vertical-align: middle;
  background: #fbfbfb;
  box-shadow: 2px 2px 5px #eee;
  transition: all 0.5s ease-out;
  -webkit-transition: all 0.5s ease-out;
  margin-right: 0.2rem;
}

.fenlei select:focus {
  outline: none;
}
.fenlei i[data-v-16c71cda] {
  display: block;
  float: left;
  width: 0.83rem;
  height: 0.98rem;
  line-height: 0.96rem;
  background: #919191;
  position: relative;
}
</style>


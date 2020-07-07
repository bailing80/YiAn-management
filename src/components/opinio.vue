<template>
  <div class="box">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">产品意见反馈</p>
    </div>
    <ul class="main">
      <div class="user">
        <h2>产品线</h2>
        <p @click="xuanzhe(0)">{{productLinetext}}</p>
        <u></u>
      </div>
      <div class="user">
        <h2>机型</h2>
        <p @click="xuanzhe(1)">{{modelstext}}</p>
        <u></u>
      </div>

      <div class="user">
        <h2>产品名称</h2>
        <input type="text" placeholder="请输入产品名称" v-model="productname" />
      </div>

      <div class="user" v-show="isfamily1">
        <h2>客户名称</h2>
        <p v-show="isfamily">{{this.$store.state.letter.user.hospital_name}}</p>
        <p v-show="!isfamily">{{this.$store.state.letter.user.channel_name}}</p>
      </div>
      <div class="user">
        <h2>联系人名称</h2>
        <p v-show="isfamily">{{this.$store.state.letter.user.name}}</p>
        <p v-show="!isfamily">{{this.$store.state.letter.user.contacts_name}}</p>
      </div>
      <div class="user">
        <h2>手机号</h2>
        <p>{{this.$store.state.letter.user.phone}}</p>
      </div>
      <div class="xinglist">
        <p>反馈产品的评价</p>
        <ul>
          <li
            v-for="(itme_ac , index) in 5"
            :key="index"
            :class="star_serve.indexOf(index) > -1 ? 'ac':''"
            @click="forlist03(index)"
          ></li>
        </ul>
      </div>
      <div class="user">
        <h2>反馈建议</h2>
        <textarea placeholder="请输入反馈意见" v-model="feedback"></textarea>
      </div>
    </ul>
    <div class="sendbtn dw" @click="tosend">提交</div>

    <div class="model" v-show="bool">
      <div class="bg_yanse"></div>
      <div class="slots_list" :class="{demo_transform3:!bool,demo_transform4:bool}">
        <h2>选择产品线</h2>
        <span @click="quxiao(0)" class="span1">取消</span>
        <span @click="queding(0)">确定</span>
        <mt-picker :slots="list" @change="onValuesChange"></mt-picker>
      </div>
    </div>

    <div class="model" v-show="bool1">
      <div class="bg_yanse"></div>
      <div class="slots_list" :class="{demo_transform3:!bool,demo_transform4:bool}">
        <h2>型号</h2>
        <span @click="quxiao(1)" class="span1">取消</span>
        <span @click="queding(1)">确定</span>
        <mt-picker :slots="modelsList" @change="onValuesChange1"></mt-picker>
      </div>
    </div>
  </div>
</template>

<script>
import baseUrl from "../api/baseUrl.js";
import Cookie from "../api/cookie.js";
import { Toast, MessageBox } from "mint-ui";
var _this;
export default {
  data() {
    return {
      bool: false,
      bool1: false,
      isAjax: true,
      values1: "",
      values: "",
      isfamily: true,
      feedback: "",
      star_serve: [],
      numid: "",
      productname: "",

      productLine: [],
      productLinetext: "",
      productLinetext_id: "",
      list: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ],

      modelsLine: [],
      modelstext: "",
      modelstext_id: "",
      modelsList: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ]
    };
  },
  created() {
    if (Cookie.getCookie("avatar") == "0") {
      this.isfamily = true;
      this.isfamily1 = true;
    } else if (Cookie.getCookie("avatar") == "1") {
      this.isfamily = false;
      this.isfamily1 = true;
    } else if (Cookie.getCookie("avatar") == "3") {
      this.isfamily = true;
      this.isfamily1 = false;
    }

    _this = this;
    //产品线
    this.$Axios
      .post(baseUrl + "/dicCode/queryDicByType", { type: "PRODUCT_LINE" })
      .then(function(response) {
        //重复点击
        // _this.is_ajax = false;
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
          _this.productLine = response.data.data;
          for (var i = 0; i <= response.data.data.length - 1; i++) {
            _this.list[0].values.push(response.data.data[i].lable);
          }
        }
      })
      .catch(function(error) {
        Toast({
          message: "网络开小差，请稍后重试",
          duration: 1000
        });
      });

    //机型
    this.$Axios
      .post(baseUrl + "/dicCode/queryDicByType", { type: "EQUI_MODEL" })
      .then(function(response) {
        //重复点击
        // _this.is_ajax = false;
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
          _this.modelsLine = response.data.data;
          if (response.data.msg == "成功查询信息") {
            for (var i = 0; i <= response.data.data.length - 1; i++) {
              _this.modelsList[0].values.push(response.data.data[i].lable);
            }
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
  methods: {
    dictionary(id) {
      this.$Axios
        .post(baseUrl + "/dicCode/queryDicTwoByType", { parentId: id })
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

          if (response.data.code == 200) {
            _this.slotsLine = response.data.data;
            _this.modelsList[0].values = [];

            for (let num = 0; num <= response.data.data.length - 1; num++) {
              _this.modelsList[0].values.push(response.data.data[num].lable);
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

    toback() {
      this.$router.replace({
        path: "/custser"
      });
    },
    tosend() {
      if (!this.isAjax) {
        Toast({
          message: "提交中不能重复提交",
          duration: 1000
        });
        return;
      }
      if (this.productLinetext_id == "") {
        Toast({
          message: "产品线不能为空",
          duration: 1000
        });
        return;
      }
      // if (this.modelstext_id == "") {
      //   Toast({
      //     message: "产品型号不能为空",
      //     duration: 1000
      //   });
      //   return;
      // }
      if (this.productname == "") {
        Toast({
          message: "产品名称不能为空",
          duration: 1000
        });
        return;
      }

      if (this.feedback == "") {
        Toast({
          message: "反馈意见不能为空",
          duration: 1000
        });
        return;
      }

      this.isAjax = false;
      var datelist = {};
      if (Cookie.getCookie("avatar") == 0) {
        datelist = {
          productLine: this.productLinetext_id,
          model: this.modelstext_id,
          product: this.productname,
          hospital: this.$store.state.letter.user.hospital_name,
          userName: this.$store.state.letter.user.name,
          phone: this.$store.state.letter.user.phone,
          feedbackEvaluation: this.star_serve.length,
          feedback: this.feedback
        };
      } else if (Cookie.getCookie("avatar") == 1) {
        datelist = {
          productLine: this.productLinetext_id,
          model: this.modelstext_id,
          product: this.productname,
          hospital: this.$store.state.letter.user.channel_name,
          userName: this.$store.state.letter.user.contacts_name,
          phone: this.$store.state.letter.user.phone,
          feedbackEvaluation: this.star_serve.length,
          feedback: this.feedback
        };
      } else if (Cookie.getCookie("avatar") == 3) {
        datelist = {
          productLine: this.productLinetext_id,
          model: this.modelstext_id,
          product: this.productname,
          userName: this.$store.state.letter.user.name,
          phone: this.$store.state.letter.user.phone,
          feedbackEvaluation: this.star_serve.length,
          feedback: this.feedback
        };
      }
      this.$Axios
        .post(baseUrl + "/opinionFeedBack/addOpinionFeed", datelist)
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

          if (response.data.code == 200) {
            _this.isAjax = true;
            Toast({
              message: "产品意见反馈成功",
              duration: 1000
            });
            _this.$router.replace({
              path: "/custser"
            });
          }
        })
        .catch(function(error) {
          _this.isAjax = true;
          Toast({
            message: "网络开小差，请稍后重试",
            duration: 1000
          });
        });
    },
    forlist03(index) {
      this.star_serve = [];
      for (var i = 0; i <= index; i++) {
        this.star_serve.push(i);
      }
    },

    //弹框
    onValuesChange(picker, values) {
      this.values = values[0];
    },

    //弹框
    onValuesChange1(picker, values) {
      this.values1 = values[0];
    },
    xuanzhe(n) {
      if (n == 0) {
        this.bool = true;
      } else if (n == 1) {
        this.bool1 = true;
      }

      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.cssText += "position:fixed;top:-" + scrollTop + "px;";
    },
    quxiao(n) {
      if (n == 0) {
        this.bool = false;
      } else if (n == 1) {
        this.bool1 = false;
      }
      var body = document.body;
      body.style.position = "static";
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      );
      body.style.top = "";
    },
    queding(n) {
      if (n == 0) {
        if (this.productLine == undefined) {
          this.bool = false;
          this.bool1 = false;
          return;
        }

        for (var pronum = 0; pronum <= this.productLine.length - 1; pronum++) {
          if (this.productLine[pronum].lable == this.values) {
            this.productLinetext = this.values;
            this.productLinetext_id = this.productLine[pronum].value;
            this.dictionary(this.productLine[pronum].id);
            this.modelstext = "";
            this.modelstext_id = "";
          }
        }
      } else if (n == 1) {
        for (var pronum = 0; pronum <= this.modelsLine.length - 1; pronum++) {
          if (this.modelsLine[pronum].lable == this.values1) {
            this.modelstext = this.values1;
            this.modelstext_id = this.modelsLine[pronum].value;
          }
        }
      }
      this.bool = false;
      this.bool1 = false;
       var body = document.body;
      body.style.position = "static";
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      );
      body.style.top = "";
    }
    //弹框
  },
  beforeRouteLeave(to, from, next) {
    var body = document.body;
    body.style.position = "static";
    var top = body.style.top;
    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
      top
    );
    body.style.top = "";
    next();
  }
};
</script>

<style scoped>
.model {
  position: fixed;
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
  padding: 0.1rem 0;
  margin: 0.16rem 0.35rem 0;
  width: 6.8rem;
}
.main .user {
  position: relative;
}
.main .user h2 {
  width: 6.8rem;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.32rem;
  font-weight: 500;
  margin-top: 0.13rem;
}
.main .user input {
  width: 6.56rem;
  height: 0.32rem;
  line-height: 0.32rem;
  font-size: 0.28rem;
  color: #919191;
  padding-left: 0.28rem;
  border: 0.01rem #919191 solid;
  margin-top: 0.15rem;
  padding: 0.34rem 0 0.34rem 0.2rem;
}

.main .user p {
  width: 6.56rem;
  height: 0.95rem;
  line-height: 0.95rem;
  font-size: 0.3rem;
  color: #919191;
  padding-left: 0.28rem;
  border: 0.01rem #919191 solid;
  margin-top: 0.15rem;
  background: #fff;
}

.main .user u {
  display: block;
  width: 0.17rem;
  height: 0.28rem;
  background: url("../assets/arrow_r.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 1.1rem;
  right: 0.3rem;
}

.main .user textarea {
  width: 6.3rem;
  height: 2.24rem;
  line-height: 0.34rem;
  font-size: 0.28rem;
  color: #919191;
  padding: 0.28rem;
  margin-top: 0.15rem;
}

.xinglist {
  width: 6.56rem;
  height: 0.43rem;
  margin: 0.2rem 0;
}

.xinglist p,
.details p {
  float: left;
  font-size: 0.34rem;
  color: #000;
}
.xinglist ul {
  float: left;
  margin-left: 0.2rem;
}
.xinglist ul li {
  float: left;
  width: 0.46rem;
  height: 0.43rem;
  background: url("../assets/icon_xing.png") no-repeat;
  background-size: 100% 100%;
  margin-left: 0.15rem;
}
.xinglist ul .ac {
  background: url("../assets/icon_xing_ac.png") no-repeat;
  background-size: 100% 100%;
}

.jixing {
  width: 6.8rem;
  background: #fff;
  margin-bottom: 0.16rem;
  position: relative;
  border: 1px #919191 solid;
}
.jixing p {
  width: 5.62rem;
  height: 0.97rem;
  line-height: 0.97rem;
  background: #fff;
  margin-left: 0.28rem;
  font-size: 0.26rem;
  color: #919191;
}

.jixing .miaosu {
  position: absolute;
  top: 0;
  left: 0.25rem;
  width: 6.1rem;
  line-height: 0.95rem;
  height: 0.95rem;
  font-size: 0.3rem;
  color: #919191;
  text-align: left;
}

.jixing u {
  display: block;
  width: 0.17rem;
  height: 0.28rem;
  background: url("../assets/arrow_r.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0.35rem;
  right: 0.3rem;
}

.dw {
  margin: 1rem 0 1rem 0.35rem;
}
</style>


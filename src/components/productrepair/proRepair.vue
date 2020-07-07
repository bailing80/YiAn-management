<template>
  <div style="position: absolute; height: 100%;" >
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">产品报修</p>
    </div>
    <div class="main">
      <div class="yuyue" @click="xuanzhe(1)">
        <p>申请类型:</p>
        <span class="miaosu">{{this.$store.state.letter.user.application}}</span>
        <u></u>
      </div>

      <div class="btn_icon">
        <i class="icon_minus" @click="ClassList_minus"></i>
        <i @click="ClassList_plus"></i>
      </div>
      <div class="inner">
        <ul class="list" v-for="(numlist,i) in this.$store.state.ClassList" :key="i">
          <li class="ac">
            <div>
              <input
                type="text"
                placeholder="序列号或扫码录入"
                maxlength="50"
                v-model="numlist.shebeihao_class"
              />
              <i class="jia" @click="deviceNumber_plus_class(i)"></i>
              <!-- <i></i> -->
              <i @click="See(i)"></i>
              <div class="xuhao">
                <ol>
                  <li v-for="(numlist_class,i_num) in numlist.list" :key="i_num">
                    {{numlist_class.name}}
                    <span @click="deviceNumber_minus_class(i,i_num)"></span>
                  </li>
                </ol>
              </div>
            </div>
            <div class="jixing">
              <p>产品线</p>
              <span class="miaosu">{{numlist.productLine}}</span>
              <!-- <u></u> -->
            </div>
            <div class="jixing">
              <p>设备机型</p>
              <span class="miaosu">
                <em v-for="(modelist,modenum) in numlist.models" :key="modenum">{{modelist.name}}</em>
              </span>
            </div>

            <div class="jixing" @click="tofaultType(i)" v-show="boloso">
              <p>故障类型</p>
              <span class="miaosu">{{numlist.type}}</span>
              <u></u>
            </div>
            <textarea
              class="details"
              maxlength="200"
              v-show="boloso"
              placeholder="故障描述"
              v-model="numlist.content"
            ></textarea>
          </li>
        </ul>
      </div>
      <div class="yuyue" @click="xuanzhe(0)" v-show="isfamily">
        <p>预约时间</p>
        <span class="miaosu">{{this.$store.state.letter.user.time}}</span>
        <u></u>
      </div>

      <div class="sendbtn mt3" @click="toconfirm">下一步</div>
    </div>
    <!-- <iframe src="sol.html" frameborder="0"></iframe> -->

    <div class="model" v-show="bool">
      <div class="bg_yanse"></div>
      <div class="slots_list" :class="{demo_transform3:!bool,demo_transform4:bool}">
        <h2>选择筛选时间</h2>
        <span @click="queding">确定</span>
        <!-- <mt-picker :slots="slots" @change="onValuesChange"></mt-picker> -->
        <mt-datetime-picker
          v-show="bool"
          type="date"
          ref="picker1"
          cancelText="取消"
          confirmText="确定"
          :startDate="dataVal1"
          year-format="{value}"
          month-format="{value}"
          date-format="{value}"
          @cancel="quxiao"
          @confirm="handleConfirm1"
        ></mt-datetime-picker>
      </div>
    </div>
    <div class="model" v-show="bool1">
      <div class="bg_yanse"></div>
      <div class="slots_list" :class="{demo_transform3:!bool1,demo_transform4:bool1}">
        <h2>选择类型</h2>
        <span @click="quxiao" class="span1">取消</span>
        <span @click="queding">确定</span>
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from "../../api/cookie.js";
import baseUrl from "../../api/baseUrl.js";
import { Toast } from "mint-ui";
import Axios from "axios";

var _this;
export default {
  data() {
    return {
      shebeihao: "",
      msg: "12323122333",
      showBoolean: 1,
      isfamily: true,
      is_ajax: true,

      dataVal1: new Date(),
      date1: "", //默认值
      time: "",
      bool: false,
      boollog: false,
      PRODUCT_LINE: [], //产品线
      bool1: false, //
      boloso: false,
      slots: [
        {
          flex: 1,
          values: ["安装", "维修", "培训", "回访"],
          className: "slots",
          textAlign: "center"
        }
      ],
      numli: 0,
      application: "",
      type: [
        { name: "维修", id: "WX" },
        { name: "回访", id: "HF" },
        { name: "安装", id: "AZ" },
        { name: "培训", id: "PX" }
      ]
    };
  },

  created() {
    _this = this;

    //显示  预约时间
    if (Cookie.getCookie("avatar") == "0") {
      this.isfamily = true;
    } else if (Cookie.getCookie("avatar") == "1") {
      this.isfamily = true;
    } else if (Cookie.getCookie("avatar") == "3") {
      //家庭不显示
      this.isfamily = false;
    }

    //获取  产品线
    Axios.post(baseUrl + "/dicCode/queryDicByMoreType?type=PRODUCT_LINE")
      .then(function(response) {
        if (response.data.code == 200) {
          _this.PRODUCT_LINE = response.data.data;
        }
      })
      .catch(function() {});

    //获取缓存里的 产品   ClassList  对象
    var storage = window.localStorage;
    this.$store.state.ClassList = JSON.parse(storage.getItem("ClassList"));
    let isScan = storage.getItem("isScan");
    let arr = JSON.parse(storage.getItem("setApplicationType")); //维修类型

    this.$store.state.letter.user.application = arr.name;
    this.$store.state.letter.user.applicationid = arr.id;
    this.$store.state.letter.user.time = arr.time;

    if (this.$store.state.letter.user.application == "维修") {
      this.boloso = true;
    }
    //清除  ClassList
    // storage.removeItem("ClassList");
    if (isScan == "true") {
      let id = storage.getItem("EquipmentnumberNum");
      this.$store.state.ClassList[id].shebeihao_class = this.GetQueryString(
        "qrresult"
      );
      this.deviceNumber_plus_class(id);
    }
  },
  methods: {
    See(id) {
      let storage = window.localStorage;
      storage.setItem("EquipmentnumberNum", id);
      storage.setItem("isScan", "true");
      window.location.href =
        "http://sao315.com/w/api/saoyisao/?redirect_uri=http%3A%2F%2Fwxkef.aeonmed.com%2F%23%2Fprorepair";
    },
    //获取扫一扫回来的参数
    GetQueryString(name) {
      var reg = new RegExp("\\b" + name + "=([^&]*)");
      var r = location.href.match(reg);
      if (r != null) return unescape(r[1]);
    },
    //选择日期
    dateClick1() {
      this.$refs.picker1.open();
    },
    parserDate(date) {
      var t = Date.parse(date);
      if (!isNaN(t)) {
        return new Date(Date.parse(date.replace(/-/g, "/")));
      }
    },
    //设置时间前面的   零
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    //确定选择时间
    handleConfirm1(value) {
      let currentTime = new Date(new Date().setDate(new Date().getDate() - 1));
      let ClickTime = new Date(value).getTime();
      let d = new Date(value);
      let resDate =
        d.getFullYear() +
        "-" +
        this.p(d.getMonth() + 1) +
        "-" +
        this.p(d.getDate()); //年月日

      if (currentTime > ClickTime) {
        Toast({
          message: "预约不能小于当前时间",
          duration: 1000
        });
        this.bool = !this.bool;
        return;
      } else {
        this.$store.commit("settime", resDate);
      }
      this.bool = !this.bool;
      var body = document.body;
      body.style.position = "static";
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      );
      body.style.top = "";
    },
    //回到服务选择页
    toback() {
      this.$router.push({
        path: "/custser"
      });
    },
    //选择故障类型
    tofaultType(n) {
      // this.$store.state.FaultTypeIndex = n;

      let storage = window.localStorage;
      storage.setItem("FaultTypeIndex", n);
      this.$router.push({
        path: "/faultType"
      });
    },
    toconfirm() {
      if (this.$store.state.letter.user.applicationid == "") {
        Toast({
          message: "申请类型不能为空",
          duration: 1000
        });
        return;
      }

      for (
        let numi = 0;
        numi <= this.$store.state.ClassList.length - 1;
        numi++
      ) {
        if (this.$store.state.ClassList[numi].list.length < 1) {
          Toast("请核对输入的设备号");
          return;
        }
        if (this.$store.state.letter.user.application == "维修") {
          if (this.$store.state.ClassList[numi].type === "") {
            Toast("请核对选择的故障类型");
            return;
          }
        }
      }

      if (
        Cookie.getCookie("avatar") == "0" ||
        Cookie.getCookie("avatar") == "1"
      ) {
        if (this.$store.state.letter.user.time == undefined || this.$store.state.letter.user.time === "" ) {
          Toast("请核对预约的时间");
          return;
        }
      }

      this.$router.push({
        path: "/confirmrepair"
      });
    },
    //弹框
    onValuesChange(picker, values) {
      _this.application = values[0];
    },
    xuanzhe(n) {
      if (n == 0) {
        //时间
        this.bool = !this.bool;
      } else if (n == 1) {
        //申请类型
        this.bool1 = !this.bool1;
      }
      this.numli = n;

      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.cssText += "position:fixed;top:-" + scrollTop + "px;";
    },

    ///-------------------
    quxiao() {
      this.bool = false;
      this.bool1 = false;
      var body = document.body;
      body.style.position = "static";
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      );
      body.style.top = "";
    },
    queding() {
      let storage = window.localStorage;

      if (this.numli == 0) {
        this.bool = !this.bool;
        this.$store.commit("settime", this.values);
      } else if (this.numli == 1) {
        for (let nameid = 0; nameid <= _this.type.length - 1; nameid++) {
          if (_this.application == _this.type[nameid].name) {
            this.$store.commit("setapplication", {
              name: _this.type[nameid].name,
              id: _this.type[nameid].id
            });
            this.bool1 = !this.bool1;

            if (_this.type[nameid].name == "回访") {
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
              this.$store.state.ClassList = [
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
                  coding: "" //  物料编码
                }
              ];

              storage.setItem("ClassList", JSON.stringify(ClassList));
            }
            _this.boloso = true;
            if (_this.type[nameid].name != "维修") {
              _this.boloso = false;
              let dast = JSON.parse(storage.getItem("ClassList"));
              for (let i = 0; i < dast.length; i++) {
                dast[i].type = ''
                dast[i].type_id = ''
                dast[i].content = ''
              }
              this.$store.state.ClassList = dast;
              storage.setItem("ClassList",JSON.stringify(dast))
            }
          }
        }
      }

      var body = document.body;
      body.style.position = "static";
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      );
      body.style.top = "";
    },

    //＋＋   添加组
    ClassList_plus() {
      // this.$store.commit("ClassList_plus");
      let storage = window.localStorage;
      let data = JSON.parse(storage.getItem("ClassList"));

      if (data.length > 3) {
        Toast({
          message: "最多加4个产品线",
          duration: 1000
        });
        return;
      }
      data.push({
        list: [], //设备号数组
        shebeihao_class: "", //输入时的设备号
        productLine: "", //产品线
        productLine_id: "", //产品线id
        title: "", //
        models: [], //机型
        type: "", //类型
        content: "", //描述
        coding: "" //  物料编码
      });
      storage.setItem("ClassList", JSON.stringify(data));
      this.$store.state.ClassList = data;
    },
    //--    减去组
    ClassList_minus() {
      // this.$store.commit("ClassList_minus");

      let storage = window.localStorage;
      let data = JSON.parse(storage.getItem("ClassList"));
      if (data.length - 1 == 0) return;
      data.splice(data.length - 1, 1);
      storage.setItem("ClassList", JSON.stringify(data));
      this.$store.state.ClassList = data;
    },
    //按钮添加的  子类
    //＋＋
    deviceNumber_plus_class(n) {
      // this.$store.commit("deviceNumber_plus_class", n);
      let storage = window.localStorage;

      if (this.$store.state.ClassList[n].shebeihao_class == "") {
        //输入是否为空
        storage.setItem("isScan", "false");
        return;
      }
      for (
        var nul = 0;
        nul <= this.$store.state.ClassList[n].list.length - 1;
        nul++
      ) {
        if (
          this.$store.state.ClassList[n].list[nul].name ==
          this.$store.state.ClassList[n].shebeihao_class
        ) {
          Toast({
            message: "序列号已存在了，请不要重复添加",
            duration: 1000
          });

          storage.setItem("isScan", "false");
          return;
        }
      }

      if (_this.is_ajax == false) return; //防止重复点击

      _this.is_ajax = false;
      //判断设备是否存在
      Axios.post(baseUrl + "/applyJob/isExist", {
        deviceId: this.$store.state.ClassList[n].shebeihao_class
      })
        .then(function(response) {
          storage.setItem("isScan", "false");
          //产品线 id
          //登录超时
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
            _this.is_ajax = true; //可以点击
            if (
              _this.$store.state.letter.history.customerId ==
              response.data.data.customerId
            ) {
              //-----------------------------------

              if (_this.$store.state.letter.user.applicationid != "HF") {
                if (
                  _this.$store.state.ClassList[n].list == 0 &&
                  response.data.code == 200
                ) {
                  for (
                    let inde = 0;
                    inde <= _this.$store.state.ClassList.length - 1;
                    inde++
                  ) {
                    if (response.data.data.productLine == "") {
                      Toast({
                        message:
                          _this.$store.state.ClassList[n].shebeihao_class +
                          "序列号没有产品线，请核对数据",
                        duration: 1000
                      });
                      return;
                    } else {
                      if (
                        _this.$store.state.ClassList[inde].productLine_id ==
                        response.data.data.productLine
                      ) {
                        Toast({
                          message: "已有此产品线了",
                          duration: 1000
                        });
                        return;
                      }
                    }
                  }

                  _this.$store.state.ClassList[n].list.push({
                    name: _this.$store.state.ClassList[n].shebeihao_class,
                    sex: "",
                    msg: ""
                  });

                  _this.$store.state.ClassList[n].models.push({
                    name: response.data.data.model
                  });
                  _this.$store.state.ClassList[n].customerId =
                    response.data.data.customerId;
                  _this.$store.state.ClassList[n].productLine_id =
                    response.data.data.productLine;

                  for (let i = 0; i <= _this.PRODUCT_LINE.length - 1; i++) {
                    if (
                      _this.$store.state.ClassList[n].productLine_id ==
                      _this.PRODUCT_LINE[i].value
                    ) {
                      _this.$store.state.ClassList[n].productLine =
                        _this.PRODUCT_LINE[i].lable;
                    }
                  }
                  _this.$store.state.ClassList[n].shebeihao_class = "";

                  storage.setItem(
                    "ClassList",
                    JSON.stringify(_this.$store.state.ClassList)
                  );
                } else {
                  if (
                    _this.$store.state.ClassList[n].productLine_id ==
                    response.data.data.productLine
                  ) {
                    _this.$store.state.ClassList[n].list.push({
                      name: _this.$store.state.ClassList[n].shebeihao_class,
                      sex: "",
                      msg: ""
                    });

                    _this.$store.state.ClassList[n].models.push({
                      name: response.data.data.model
                    });

                    _this.$store.state.ClassList[n].shebeihao_class = "";

                    storage.setItem(
                      "ClassList",
                      JSON.stringify(_this.$store.state.ClassList)
                    );
                  } else {
                    _this.is_ajax = true; //可以点击
                    Toast({
                      message: "产品线不一致，请核对之后输入 ",
                      duration: 1000
                    });
                  }
                }
              } else {
                if (
                  response.data.data.productLine == "ssc" ||
                  response.data.data.productLine == "wyd" ||
                  response.data.data.productLine == "mz" ||
                  response.data.data.productLine == "hx"||
                  response.data.data.productLine == "dt"||
                  response.data.data.productLine == "ta"
                ) {
                  if (
                    _this.$store.state.ClassList[n].list == 0 &&
                    response.data.code == 200
                  ) {
                    for (
                      let inde = 0;
                      inde <= _this.$store.state.ClassList.length - 1;
                      inde++
                    ) {
                      if (response.data.data.productLine == "") {
                        Toast({
                          message:
                            _this.$store.state.ClassList[n].shebeihao_class +
                            "序列号没有产品线，请核对数据",
                          duration: 1000
                        });
                        return;
                      } else {
                        if (
                          _this.$store.state.ClassList[inde].productLine_id ==
                          response.data.data.productLine
                        ) {
                          Toast({
                            message: "已有此产品线了",
                            duration: 1000
                          });
                          return;
                        }
                      }
                    }

                    _this.$store.state.ClassList[n].list.push({
                      name: _this.$store.state.ClassList[n].shebeihao_class,
                      sex: "",
                      msg: ""
                    });

                    _this.$store.state.ClassList[n].models.push({
                      name: response.data.data.model
                    });
                    _this.$store.state.ClassList[n].customerId =
                      response.data.data.customerId;
                    _this.$store.state.ClassList[n].productLine_id =
                      response.data.data.productLine;

                    for (let i = 0; i <= _this.PRODUCT_LINE.length - 1; i++) {
                      if (
                        _this.$store.state.ClassList[n].productLine_id ==
                        _this.PRODUCT_LINE[i].value
                      ) {
                        _this.$store.state.ClassList[n].productLine =
                          _this.PRODUCT_LINE[i].lable;
                      }
                    }
                    _this.$store.state.ClassList[n].shebeihao_class = "";

                    storage.setItem(
                      "ClassList",
                      JSON.stringify(_this.$store.state.ClassList)
                    );
                  } else {
                    if (
                      _this.$store.state.ClassList[n].productLine_id ==
                      response.data.data.productLine
                    ) {
                      _this.$store.state.ClassList[n].list.push({
                        name: _this.$store.state.ClassList[n].shebeihao_class,
                        sex: "",
                        msg: ""
                      });

                      _this.$store.state.ClassList[n].models.push({
                        name: response.data.data.model
                      });
                      _this.$store.state.ClassList[n].shebeihao_class = "";

                      storage.setItem(
                        "ClassList",
                        JSON.stringify(_this.$store.state.ClassList)
                      );
                    } else {
                      _this.is_ajax = true; //可以点击
                      Toast({
                        message: "产品线不一致，请核对之后输入 ",
                        duration: 1000
                      });
                    }
                  }
                } else {
                  Toast({
                    message: "回访类型里没有此产品线，请核对之后在输入 ",
                    duration: 1000
                  });
                  return;
                }
              }

              //-----------------------------------
            } else {
              _this.is_ajax = true; //可以点击
              Toast({
                message: "客户未用有此产品，无法报修",
                duration: 1000
              });
            }
          }

          //没有查到
          if (response.data.code == -100) {
            _this.is_ajax = true;
            Toast({
              message: response.data.msg,
              duration: 1000
            });
          }
        })
        .catch(function() {
          storage.setItem("isScan", "false");
          _this.is_ajax = true;
          Toast({
            message: "网络开小差，请稍后重试",
            duration: 1000
          });
        });
    },
    //--
    deviceNumber_minus_class(n, index) {
      let storage = window.localStorage;

      _this.$store.state.ClassList = JSON.parse(storage.getItem("ClassList"));

      if (_this.$store.state.ClassList[n].list.length - 1 == 0) {
        _this.$store.state.ClassList[n].productLine = "";
        _this.$store.state.ClassList[n].productLine_id = "";
        _this.$store.state.ClassList[n].content = "";
        _this.$store.state.ClassList[n].type_id = "";
        _this.$store.state.ClassList[n].type = "";
      }
      _this.$store.state.ClassList[n].shebeihao_class = "";
      _this.$store.state.ClassList[n].list.splice(index, 1);
      _this.$store.state.ClassList[n].models.splice(index, 1);
      storage.setItem(
        "ClassList",
        JSON.stringify(_this.$store.state.ClassList)
      );

      // this.$store.commit("claerlist"); //清除  list 同级元素 内容
      // this.$store.commit("deviceNumber_minus_class", n, index);
    }
  },
  beforeRouteLeave(to, from, next) {
    var body = document.body;
    body.style.position = "static";
    var top = body.style.top;
    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
      top
    );
    body.style.top = "";

    var storage = window.localStorage;

    let arr = {
      name: this.$store.state.letter.user.application,
      id: this.$store.state.letter.user.applicationid,
      time: this.$store.state.letter.user.time
    };

    storage.setItem("setApplicationType", JSON.stringify(arr));
    storage.setItem("ClassList", JSON.stringify(this.$store.state.ClassList));
    next();
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
  touch-action: none;
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

.posibtn {
  position: absolute;
  bottom: 1rem;
  left: 0;
}

.main {
  margin: 0 0.34rem;
}
.main .btn_icon {
  width: 6.82rem;
  height: 1.03rem;
}
.main .btn_icon i {
  float: right;
  display: block;
  width: 0.47rem;
  height: 0.47rem;
  background: url("../../assets/icon_plus.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 0.29rem;
}
.main .btn_icon .icon_minus {
  background: url("../../assets/icon_minus.png") no-repeat;
  background-size: 100% 100%;
  margin-left: 0.16rem;
}

.inner {
  width: 6.82rem;
  height: auto;
}
.inner .list {
  width: 6.92rem;
  height: auto;
  margin-bottom: 0.5rem;
}
.inner .list li > div {
  background: #fff;
  margin-top: 0.2rem;
}

.inner .list li {
  width: 6.88rem;
  margin-bottom: 0.16rem;
  position: relative;
}

.inner .list li input {
  width: 4.8rem;
  height: 0.32rem;
  line-height: 0.32rem;
  background: #fff;
  margin-left: 0.28rem;
  color: #919191;
  padding: 0.25rem 0;
}

.inner .list li p {
  width: 5.62rem;
  height: 0.97rem;
  line-height: 0.97rem;
  background: #fff;
  margin-left: 0.28rem;
  font-size: 0.26rem;
  color: #919191;
}
.inner .list li i {
  display: block;
  width: 0.49rem;
  height: 0.5rem;
  background: url("../../assets/erweima.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0.45rem;
  right: 1.1rem;
}

.inner .list li .jia {
  background: url("../../assets/icon_jia02.png") no-repeat;
  background-size: 100% 100%;
  top: 0.45rem;
  right: 0.25rem;
}

.inner .list li u {
  display: block;
  width: 0.17rem;
  height: 0.28rem;
  background: url("../../assets/arrow_r.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0.35rem;
  right: 0.3rem;
}
.inner .list .ac {
  padding-top: 0.01rem;
  font-size: 0.3rem;
}

.inner .list .miaosu {
  position: absolute;
  top: 0;
  left: 2.4rem;
  width: 3.9rem;
  line-height: 0.95rem;
  height: 0.95rem;
  font-size: 0.3rem;
  color: #919191;
  text-align: right;
}

.main .details {
  font-size: 0.28rem;
  padding: 0.3rem;
  width: 6.27rem;
  height: 2.4rem;
  line-height: 0.38rem;
  background: #fff;
  color: #919191;
}
.main .details::-webkit-input-placeholder {
  color: #919191;
}
.mt3 {
  margin: 1rem 0;
}
.inner .xuhao ol {
  padding-bottom: 0.5rem;
}

.inner .xuhao ol li {
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
  margin: 0.37rem 0 0 0.35rem;
  position: relative;
}
.inner .xuhao ol li span {
  display: block;
  width: 0.26rem;
  height: 0.26rem;
  background: url("../../assets/cha.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0.13rem;
  right: 0.25rem;
}

.inner .jixing {
  width: 6.88rem;
  background: #fff;
  margin-bottom: 0.16rem;
  position: relative;
}
.inner .jixing p {
  width: 5.62rem;
  height: 0.97rem;
  line-height: 0.97rem;
  background: #fff;
  margin-left: 0.28rem;
  font-size: 0.26rem;
  color: #919191;
}

.inner .jixing .inputac {
  position: absolute;
  top: 0;
  left: 2.4rem;
  width: 3.8rem;
  line-height: 0.95rem;
  height: 0.95rem;
  font-size: 0.28rem;
  color: #919191;
  text-align: right;
}
.inner .jixing .inputac::placeholder {
  color: #919191;
}

.inner .jixing .miaosu {
  position: absolute;
  top: 0;
  left: 2.4rem;
  width: 3.9rem;
  line-height: 0.95rem;
  height: 0.95rem;
  font-size: 0.3rem;
  color: #919191;
  text-align: right;
  overflow: hidden;
}
.inner .jixing .miaosu em {
  font-style: normal;
}

.inner .jixing u {
  display: block;
  width: 0.17rem;
  height: 0.28rem;
  background: url("../../assets/arrow_r.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0.35rem;
  right: 0.3rem;
}

.yuyue {
  background: #fff;
  margin-top: 0.2rem;
  width: 6.78rem;
  background: #fff;
  margin-bottom: 0.16rem;
  position: relative;
}

.yuyue p {
  width: 5.62rem;
  height: 0.97rem;
  line-height: 0.97rem;
  background: #fff;
  margin-left: 0.28rem;
  font-size: 0.26rem;
  color: #919191;
}

.yuyue span {
  position: absolute;
  top: 0;
  left: 2.3rem;
  width: 3.9rem;
  line-height: 0.95rem;
  height: 0.95rem;
  font-size: 0.3rem;
  color: #919191;
  text-align: right;
}

.yuyue u {
  display: block;
  width: 0.17rem;
  height: 0.28rem;
  background: url("../../assets/arrow_r.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0.35rem;
  right: 0.3rem;
}
[v-cloak] {
  display: none !important;
}
</style>


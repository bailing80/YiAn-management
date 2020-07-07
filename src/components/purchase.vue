<template>
  <div class="box">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">配件咨询</p>
    </div>
    <div
      class="main"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <!-- 弹出层 -->
      <div class="fenlei" v-show="showbtn">
        <u class="sanjiao"></u>
        <ol>
          <li
            :class="{ac:btn_index == bool}"
            v-for="(btn_name,btn_index) in product"
            :key="btn_index"
            @click="btn(btn_index,btn_name)"
          >
            <!-- <img :src="btn_name.img" alt class="icon_img"> -->
            {{btn_name.lable}}
          </li>
        </ol>
        <ul v-for="(purchase,pur_index) in product" :key="pur_index" v-show="pur_index==bool">
          <li
            v-for="(purlist,purlist_index) in purchase.children"
            :key="purlist_index"
            :class="{ac:purlist.ac}"
            @click="listbtn(purlist_index,purlist)"
          >{{purlist.lable}}</li>
        </ul>
      </div>
      <!-- 弹出层 -->
      <!-- 搜索栏 -->
      <div class="grabble">
        <div class="anniu" @click="fold">
          <span></span>
          <p>分类</p>
        </div>
        <input type="text" placeholder="请输入配件名称" v-model="searchcont" />
        <i @click="search">
          <u></u>
        </i>
      </div>
      <!-- 搜索栏 -->

      <div class="list" v-for="(productTname,index) in productlist" :key="index">
        <img :src="productTname.picture" alt class="left_img" />
        <div class="right_box">
          <ul>
            <li>
              配件名称：
              <p>{{productTname.partsName}}</p>
            </li>
            <!-- <li>
              产品线：
              <p>{{productTname.partsName}}</p>
            </li>-->
            <li>
              <em>型号：</em>
              <span>{{productTname.model}}</span>
            </li>
            <li>
              产品代码：
              <p>{{productTname.materielCode}}</p>
            </li>

            <!-- <li>
              <i class="details" @click="toOnlinecustomer(productTname)">
                在线咨询
                <u v-show="productTname.haveMessage">new</u>
              </i>
            </li>-->
          </ul>
          <div class="btnan">
            <i class="details" @click="toOnlinecustomer(productTname)">
              在线咨询
              <u v-show="productTname.haveMessage">new</u>
            </i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import baseUrl from "../api/baseUrl.js";
import Cookie from "../api/cookie.js";
import { Toast, Indicator } from "mint-ui";
var _this;
export default {
  data() {
    return {
      productlist: [],
      forlist: [],
      forlist1: [],
      product: [],
      EQUI_MODEL: [], //设备机型

      bool: 0,
      bool1: "",
      boolnumber: "",
      searchcont: "",
      numBool: 1,
      showbtn: false,
      showlist: "true",
      issearch: false,
      pagelist: {
        endTime: "",
        model: "",
        oneType: "",
        page: 1,
        partsName: "",
        rows: 5,
        startTime: "",
        totalCount: 0,
        twoType: ""
      },
    };
  },
  created() {
    _this = this;

    this.sendbtn();
  },
  watch: {
    searchcont() {
      if (this.searchcont == "") {
        this.$Axios
          .post(baseUrl + "/partsBuy/queryPartsList", {
            customerId: this.$store.state.letter.user.user_id,
            partsName: "",
            oneType: "",
            twoType: "",
            page: _this.page,
            rows: _this.rows
          })
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
              for (
                let listnum = 0;
                listnum <= response.data.data.list.length - 1;
                listnum++
              ) {
                response.data.data.list[listnum].picture =
                  baseUrl +
                  response.data.data.list[listnum].picture.split(",")[0];
                for (
                  let equtnum = 0;
                  equtnum <= _this.EQUI_MODEL.length - 1;
                  equtnum++
                ) {
                  if (
                    response.data.data.list[listnum].model ==
                    _this.EQUI_MODEL[equtnum].value
                  ) {
                    response.data.data.list[listnum].model =
                      _this.EQUI_MODEL[equtnum].lable;
                  }
                }
              }
              _this.productlist = response.data.data.list;
            }
          })
          .catch(function() {});
      } else {
        this.search();
      }
    }
  },
  methods: {
    sendbtn() {
      Indicator.open({
        text: "加载中，请稍后",
        spinnerType: "fading-circle"
      });
      //一级按钮
      this.$Axios
        .post(
          baseUrl +
            "/dicCode/queryDicByMoreType?type=PARTS_TYPE_ONE,PARTS_TYPE_TWO,EQUI_MODEL"
        )
        .then(function(response) {
          if (response.data == "loginTimeout") {
            Indicator.close();
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
            for (var i = 0; i <= response.data.data.length - 1; i++) {
              if (response.data.data[i].type == "PARTS_TYPE_ONE") {
                _this.product.push(response.data.data[i]);
              }
              if (response.data.data[i].type == "PARTS_TYPE_TWO") {
                _this.forlist.push(response.data.data[i]);
              }
              if (response.data.data[i].type == "EQUI_MODEL") {
                _this.EQUI_MODEL.push(response.data.data[i]);
              }
            }

            for (let u = 0; u <= _this.product.length - 1; u++) {
              for (let j = 0; j <= _this.forlist.length - 1; j++) {
                if (_this.product[u].id == _this.forlist[j].parentId) {
                  _this.product[u].children.push(_this.forlist[j]);
                }
              }
            }
            _this.boolershow = true;
            //列表
            _this.issend();
          }
        })
        .catch(function() {
          Indicator.close();
        });
    },
    issend() {
      //查询配件列表
      this.$Axios
        .post(baseUrl + "/partsBuy/queryPartsList", this.pagelist)
        .then(function(response) {
          Indicator.close();
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
            for (
              let listnum = 0;
              listnum <= response.data.data.list.length - 1;
              listnum++
            ) {
              response.data.data.list[listnum].picture =
                baseUrl +
                response.data.data.list[listnum].picture.split(",")[0];

              for (
                let equtnum = 0;
                equtnum <= _this.EQUI_MODEL.length - 1;
                equtnum++
              ) {
                if (
                  response.data.data.list[listnum].model ==
                  _this.EQUI_MODEL[equtnum].value
                ) {
                  response.data.data.list[listnum].model =
                    _this.EQUI_MODEL[equtnum].lable;
                }
              }
            }

            _this.pagelist.totalCount = response.data.data.total;
            _this.productlist = response.data.data.list;
            //按钮
          }
        })
        .catch(function() {
          Indicator.close();
        });
    },

    toback() {
      this.$router.replace({
        path: "/custser"
      });
    },
    loadMore() {
      if (this.boolershow) {
        if (
          Math.ceil(this.pagelist.totalCount / this.pagelist.rows) >
          this.pagelist.page
        ) {
          this.pagelist.page = this.pagelist.page + 1;
        } else {
          Toast({
            message: "数据已经加载完毕",
            duration: 1000
          });
          this.boolershow = false;
          return;
        }
        //查询配件列表
        this.$Axios
          .post(baseUrl + "/partsBuy/queryPartsList", this.pagelist)
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
              for (
                let listnum = 0;
                listnum <= response.data.data.list.length - 1;
                listnum++
              ) {
                response.data.data.list[listnum].picture =
                  baseUrl +
                  response.data.data.list[listnum].picture.split(",")[0];

                for (
                  let equtnum = 0;
                  equtnum <= _this.EQUI_MODEL.length - 1;
                  equtnum++
                ) {
                  if (
                    response.data.data.list[listnum].model ==
                    _this.EQUI_MODEL[equtnum].value
                  ) {
                    response.data.data.list[listnum].model =
                      _this.EQUI_MODEL[equtnum].lable;
                  }
                }

                _this.productlist.push(response.data.data.list[listnum]);
              }
            }
          })
          .catch(function() {});
      }
    },

    btn(n, c) {
      this.pagelist.oneType = c.value;
      this.bool = n;
    },
    fold() {
      this.showbtn = !this.showbtn;
    },

    listbtn(n, c) {
      for (var num = 0; num < this.product.length; num++) {
        for (
          var num_lsit = 0;
          num_lsit < this.product[num].children.length;
          num_lsit++
        ) {
          this.product[num].children[num_lsit].ac = false;
        }
      }
      this.pagelist.page = 1;
      this.pagelist.twoType = c.value;
      // return;
      this.$Axios
        .post(baseUrl + "/partsBuy/queryPartsList", this.pagelist)
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

          if (response.data.data.list.length == 0) {
            _this.productlist = [];
            Toast({
              message: "未查询到相关配件",
              duration: 1000
            });
            return;
          } else {
            for (
              let listnum = 0;
              listnum <= response.data.data.list.length - 1;
              listnum++
            ) {
              response.data.data.list[listnum].picture =
                baseUrl +
                response.data.data.list[listnum].picture.split(",")[0];

              for (
                let equtnum = 0;
                equtnum <= _this.EQUI_MODEL.length - 1;
                equtnum++
              ) {
                if (
                  response.data.data.list[listnum].model ==
                  _this.EQUI_MODEL[equtnum].value
                ) {
                  response.data.data.list[listnum].model =
                    _this.EQUI_MODEL[equtnum].lable;
                }
              }
            }
            _this.pagelist.totalCount = response.data.data.total;
            _this.productlist = response.data.data.list;
          }
        })
        .catch(function() {});
      this.product[this.bool].children[n].ac = true;
      this.showbtn = false;
    },

    //搜索
    search() {
      if (this.issearch) {
        return;
      }
      if (this.searchcont != "") {
        var url = {
          oneType: "",
          twoType: "",
          partsName: this.searchcont,
          page: this.pagelist.page,
          rows: this.pagelist.rows
        };
        this.issearch = true;
        this.$Axios
          .post(baseUrl + "/partsBuy/queryPartsList", url)
          .then(function(response) {
            _this.issearch = false;
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
              if (response.data.data.list.length == 0) {
                _this.productlist = [];
                Toast({
                  message: "未查询到相关配件",
                  duration: 500
                });
                return;
              } else {
                for (
                  let listnum = 0;
                  listnum <= response.data.data.list.length - 1;
                  listnum++
                ) {
                  response.data.data.list[listnum].picture =
                    baseUrl +
                    response.data.data.list[listnum].picture.split(",")[0];

                  for (
                    let equtnum = 0;
                    equtnum <= _this.EQUI_MODEL.length - 1;
                    equtnum++
                  ) {
                    if (
                      response.data.data.list[listnum].model ==
                      _this.EQUI_MODEL[equtnum].value
                    ) {
                      response.data.data.list[listnum].model =
                        _this.EQUI_MODEL[equtnum].lable;
                    }
                  }
                }
                _this.pagelist.totalCount = response.data.data.total;
                _this.productlist = response.data.data.list;
              }
            }
          })
          .catch(function() {
            _this.issearch = false;
            Toast({
              message: "网络开小差，请稍后重试",
              duration: 500
            });
          });
      } else {
        Toast({
          message: "搜索内容不能为空",
          duration: 500
        });
      }
    },

    //在线咨询购买
    toOnlinecustomer(n) {
      var datelist = {};
      if (Cookie.getCookie("avatar") == 0) {
        datelist = {
          customerId: this.$store.state.letter.user.user_id,
          customerName: this.$store.state.letter.user.name,
          phone: this.$store.state.letter.user.phone,
          serviceId: 80,
          serviceTel: "谊安售后",
          productId: n.id,
          consultingType: 0
        };
      } else if (Cookie.getCookie("avatar") == 1) {
        datelist = {
          customerId: this.$store.state.letter.user.user_id,
          customerName: this.$store.state.letter.user.contacts_name,
          phone: this.$store.state.letter.user.phone,
          serviceId: 80,
          serviceTel: "谊安售后",
          productId: n.id,
          consultingType: 0
        };
      } else if (Cookie.getCookie("avatar") == 3) {
        datelist = {
          customerId: this.$store.state.letter.user.user_id,
          customerName: this.$store.state.letter.user.name,
          phone: this.$store.state.letter.user.phone,
          serviceId: 80,
          serviceTel: "谊安售后",
          productId: n.id,
          consultingType: 0
        };
      }
      // return;
      this.$Axios
        .post(baseUrl + "/customerService/queryContentList", datelist)
        .then(function(response) {
          // return;
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
            _this.userlist = response.data.data;
            _this.$router.push({
              path: "/onlinecustomer",
              query: {
                nid: n.id,
                tianjiaid: response.data.data.needId
              }
            });
          }
        })
        .catch(function() {
          Toast({
            message: "网络开小差，请稍后重试",
            duration: 1000
          });
        });
    }
  }
};
</script>
<style scoped>
.main {
  margin: 0 0.34rem;
  position: relative;
}
.fenlei {
  position: absolute;
  left: -0.34rem;
  top: 1.1rem;
  width: 7.2rem;
  height: auto;
  background: #fff;
  z-index: 100;
}
.fenlei .sanjiao {
  width: 0.15rem;
  height: 0.11rem;
  background: url("../assets/sanjiao_ico.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: -0.11rem;
  left: 0.5rem;
}

.fenlei ol {
  width: 1.9rem;
  display: inline-block;
  vertical-align: top;
  height: 10rem;
  overflow: scroll;
  overflow-x: hidden;
}
/* .fenlei ol::-webkit-scrollbar {
  display: none;
} */

.fenlei ol li {
  background: #f2f3f7;
  width: 1.6rem;
  height: 0.86rem;
  line-height: 0.86rem;
  font-size: 0.28rem;
  padding-left: 0.3rem;
  border-left: 0.03rem #f2f3f7 solid;
  position: relative;
  overflow: hidden;
}
.fenlei ol li i {
  display: block;
  width: 0.34rem;
  height: 0.34rem;
  background: url("../assets/banshou.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0.26rem;
  left: 0.17rem;
}

.fenlei ol li .icon_img {
  display: block;
  width: 0.34rem;
  height: 0.34rem;
  position: absolute;
  top: 0.26rem;
  left: 0.17rem;
}

.fenlei ol li .haocai {
  position: absolute;
  width: 0.37rem;
  height: 0.38rem;
  background: url("../assets/zhen.png") no-repeat;
  background-size: 100% 100%;
  top: 0.24rem;
  left: 0.14rem;
}
.fenlei ol .ac {
  background: #fff;
  border-left: 0.03rem #998bd6 solid;
  color: #998bd6;
}
.fenlei ol .ac i {
  background: url("../assets/banshou_ac.png") no-repeat;
  background-size: 100% 100%;
  top: 0.26rem;
  left: 0.17rem;
}
.fenlei ol .ac .haocai {
  background: url("../assets/zhen_ac.png") no-repeat;
  background-size: 100% 100%;
  top: 0.24rem;
  left: 0.14rem;
}

.fenlei ul {
  display: inline-block;
  width: 5.1rem;
  vertical-align: top;
  margin: 0.1rem 0 0.5rem 0.1rem;
  overflow: scroll;
  height: 9.3rem;
  overflow-x: hidden;
}
/* .fenlei ul::-webkit-scrollbar {
  display: none;
} */

.fenlei ul li {
  float: left;
  width: 1.65rem;
  height: 0.5rem;
  font-size: 0.28rem;
  line-height: 0.5rem;
  border: 1px #999999 solid;
  color: #999999;
  border-radius: 0.07rem;
  margin: 0.18rem 0.24rem 0.18rem 0.24rem;
  text-align: center;
  overflow: hidden; /*超出的部分隐藏起来。*/
  white-space: nowrap; /*不显示的地方用省略号...代替*/
  text-overflow: ellipsis; /* 支持 IE */
  padding: 0 0.15rem;
}
.fenlei ul .ac {
  border: 1px #998bd6 solid;
  color: #fff;
  background: #b2a7df;
}

.grabble {
  width: 100%;
  margin: 0.16rem 0;
  height: 0.96rem;
}

.grabble .anniu {
  float: left;
  width: 0.9rem;
  height: 0.96rem;
}
.grabble .anniu span {
  display: block;
  width: 0.55rem;
  height: 0.5rem;
  background: url("../assets/class.png") no-repeat;
  background-size: 100% 100%;
  margin: 0.05rem 0 0.15rem;
}
.grabble .anniu p {
  font-size: 0.26rem;
  line-height: 0.26rem;
  width: 0.55rem;
  height: 0.26rem;
  color: #919191;
}

.grabble input {
  width: 4.8rem;
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
  background: url("../assets/b_fadajing.png") no-repeat;
  background-size: 100% 100%;
}
.list {
  width: 6.42rem;
  /* height: 2.64rem; */
  /* height: 2.04rem; */
  background: #fff;
  margin-top: 0.16rem;
  padding: 0.28rem 0.1rem 0.28rem 0.28rem;
}

.list .left_img {
  display: inline-block;
  vertical-align: top;
  width: 1.52rem;
  height: 1.52rem;
  background: #f2f3f7;
}
.list .right_box {
  display: inline-block;
  vertical-align: top;
  width: 4.3rem;
  margin-left: 0.3rem;
}

.list .right_box ul li {
  width: 100%;
  font-size: 0.28rem;
  line-height: 0.3rem;
  margin-bottom: 0.2rem;
  overflow: hidden;
}
.list .right_box ul li p {
  float: right;
  width: 2.9rem;
  height: 0.3rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.list .right_box ul li em {
  font-style: normal;
  display: inline-block;
  vertical-align: top;
}
.list .right_box ul li span {
  width: 3.4rem;
  display: inline-block;
  max-height: 0.96rem;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  line-height: 0.32rem;
}

.list .right_box .btnan i {
  display: block;
  width: 1.45rem;
  height: 0.63rem;
  line-height: 0.63rem;
  text-align: center;
  font-size: 0.24rem;
  color: #fff;
  font-style: normal;
  float: left;
  border-radius: 0.07rem;
  position: relative;
}
.list .right_box .btnan i u {
  display: block;
  position: absolute;
  top: -0.22rem;
  right: -0.3rem;
  color: red;
  font-style: normal;
  width: 0.57rem;
  height: 0.32rem;
  font-size: 0.28rem;
  vertical-align: top;
  line-height: 0.32rem;
  z-index: 100;
  font-weight: 600;
}
.list .right_box .btnan .details {
  background: #998bd6;
  width: 2.15rem;
}

.list .right_box .btnan .evaluate {
  margin-left: 0.4rem;
  border: 0.01rem #998bd6 solid;
  color: #000;
}
</style>


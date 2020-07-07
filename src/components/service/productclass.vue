<template>
  <div class="box">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">产品信息查询</p>
    </div>
    <div
      class="main"
      v-show="booler"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div class="grabble">
        <input type="text" placeholder="请输入配件名称" v-model="productName" />
        <i @click="search()">
          <u></u>
        </i>
      </div>
      <div
        class="list"
        @click="toprodetail(listcont)"
        v-for="(listcont,index) in list"
        :key="index"
      >
        <img :src="listcont.picUrls" alt class="left_img" />
        <div class="right_box">
          <ul>
            <li>
              <h3>{{listcont.product}}</h3>
            </li>
            <li>序列号:{{listcont.deviceId}}</li>
            <li>产品线 : {{listcont.productLine}}</li>
            <li>
              型号 : {{listcont.model}}
              <!-- <i>型号 : {{listcont.model}}</i> -->
              <!-- <span>科室 : {{listcont.department}}</span> -->
            </li>
            <li>安装日期：{{listcont.installDate}}</li>
            <li>安装人：{{listcont.installer}}</li>
            <li>保修开始日期：{{listcont.guaranteeBeginDate}}</li>
            <li>保修结束日期：{{listcont.guaranteeEndDate}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main" v-show="!booler">
      <p class="tishi">没有查询到产品信息</p>
    </div>
  </div>
</template>

<script>
import baseUrl from "../../api/baseUrl.js";
import Cookie from "../../api/cookie.js";
import { Toast, MessageBox, Indicator } from "mint-ui";
var _this;
export default {
  name: "repair",
  data() {
    return {
      list: [],
      productLine: [],
      productName: "",
      isAjax: true,
      booler: true,

      page: 1,
      rows: 5,
      total: 0, //总页数
      boolershow: false
    };
  },
  watch: {
    productName() {
      this.search();
    }
  },
  created() {
    _this = this;
    //设备号  翻译
    this.$Axios
      .post(baseUrl + "/dicCode/queryDicByType", { type: "PRODUCT_LINE" })
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
          _this.productLine = response.data.data;
          _this.producti();
        }
        if (response.data.code == -100) {
          _this.booler = true;
        }
      })
      .catch(function(error) {});
  },

  methods: {
    //产品线类型
    producti() {
      Indicator.open({
        text: "加载中，请稍后",
        spinnerType: "fading-circle"
      });

      _this.$Axios
        .post(baseUrl + "/productInfo/queryProductInfo", {
          id: this.$store.state.letter.history.customerId,
          page: this.page,
          rows: this.rows
        })
        .then(function(response) {
          //重复点击
          Indicator.close();
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
            _this.total = response.data.data.total;
            _this.booler = true;

            let arr = Object.keys(response.data.data);
            if (arr.length == 0) {
              Toast({
                message: "未查询到产品信息",
                duration: 700
              });
              return;
            }

            for (
              var pronum1 = 0;
              pronum1 <= response.data.data.list.length - 1;
              pronum1++
            ) {
              for (
                var Pict = 0;
                Pict <= _this.$store.state.ProductPictures.length - 1;
                Pict++
              ) {
                if (
                  response.data.data.list[pronum1].productLine ==
                  _this.$store.state.ProductPictures[Pict].type
                ) {
                  response.data.data.list[pronum1].picUrls =
                    _this.$store.state.ProductPictures[Pict].img;
                }
              }

              for (
                var pronum = 0;
                pronum <= _this.productLine.length - 1;
                pronum++
              ) {
                if (
                  response.data.data.list[pronum1].productLine ==
                  _this.productLine[pronum].value
                ) {
                  response.data.data.list[pronum1].productLine =
                    _this.productLine[pronum].lable;
                }
              }

              //   pronum1,
              //   response.data.data.list[pronum1].installDate
              // );
              if (response.data.data.list[pronum1].installDate != null) {
                response.data.data.list[
                  pronum1
                ].installDate = response.data.data.list[
                  pronum1
                ].installDate.substring(0, 10);
              }

              if (response.data.data.list[pronum1].guaranteeBeginDate != null) {
                response.data.data.list[
                  pronum1
                ].guaranteeBeginDate = response.data.data.list[
                  pronum1
                ].guaranteeBeginDate.substring(0, 10);
              }
              if (response.data.data.list[pronum1].guaranteeEndDate != null) {
                response.data.data.list[
                  pronum1
                ].guaranteeEndDate = response.data.data.list[
                  pronum1
                ].guaranteeEndDate.substring(0, 10);
              }
            }

            _this.list = response.data.data.list;
            _this.boolershow = true;
          } else if (response.data.code == -100) {
            Toast({
              message: "未查询到产品信息",
              duration: 700
            });
            _this.booler = false;
          }
        })
        .catch(function(error) {
          Indicator.close();
        });
    },
    //下滑加载
    loadMore() {
      if (this.boolershow) {
        if (Math.ceil(this.total / this.rows) > this.page) {
          this.page = this.page + 1;
        } else {
          Toast({
            message: "数据已经加载完毕",
            duration: 1000
          });
          this.boolershow = false;
          return;
        }

        _this.$Axios
          .post(baseUrl + "/productInfo/queryProductInfo", {
          id: this.$store.state.letter.history.customerId,
            page: this.page,
            rows: this.rows
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

            //重复点击
            // _this.is_ajax = false;
            if (response.data.code == 200) {
              _this.booler = true; //是否显示  数据

              _this.total = response.data.data.total; //总条数

              for (
                var pronum1 = 0;
                pronum1 <= response.data.data.list.length - 1;
                pronum1++
              ) {
                for (
                  var Pict = 0;
                  Pict <= _this.$store.state.ProductPictures.length - 1;
                  Pict++
                ) {
                  if (
                    response.data.data.list[pronum1].productLine ==
                    _this.$store.state.ProductPictures[Pict].type
                  ) {
                    response.data.data.list[pronum1].picUrls =
                      _this.$store.state.ProductPictures[Pict].img;
                  }
                }

                for (
                  var pronum = 0;
                  pronum <= _this.productLine.length - 1;
                  pronum++
                ) {
                  if (
                    response.data.data.list[pronum1].productLine ==
                    _this.productLine[pronum].value
                  ) {
                    response.data.data.list[pronum1].productLine =
                      _this.productLine[pronum].lable;
                  }
                }

                if (response.data.data.list[pronum1].installDate != null) {
                  response.data.data.list[
                    pronum1
                  ].installDate = response.data.data.list[
                    pronum1
                  ].installDate.substring(0, 10);
                }

                if (
                  response.data.data.list[pronum1].guaranteeBeginDate != null
                ) {
                  response.data.data.list[
                    pronum1
                  ].guaranteeBeginDate = response.data.data.list[
                    pronum1
                  ].guaranteeBeginDate.substring(0, 10);
                }
                if (response.data.data.list[pronum1].guaranteeEndDate != null) {
                  response.data.data.list[
                    pronum1
                  ].guaranteeEndDate = response.data.data.list[
                    pronum1
                  ].guaranteeEndDate.substring(0, 10);
                }

                _this.list.push(response.data.data.list[pronum1]);
              }
              _this.boolershow = true;
            } else if (response.data.code == -100) {
              Toast({
                message: response.data.msg,
                duration: 1000
              });
              _this.booler = false;
            }
          })
          .catch(function(error) {});
      }
    },
    //搜索
    search() {
      if (!this.isAjax) return;
      this.isAjax = false;

      this.$Axios
        .post(baseUrl + "/productInfo/queryProductInfo", {
          product: this.productName,
          id: this.$store.state.letter.history.customerId
        })
        .then(function(response) {
          //重复点击
          _this.isAjax = true;

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
            let arr = Object.keys(response.data.data);
            if (arr.length == 0) {
              Toast({
                message: "未查询到产品信息",
                duration: 1000
              });
              return;
            }

            _this.booler = true;

            for (
              var pronum1 = 0;
              pronum1 <= response.data.data.list.length - 1;
              pronum1++
            ) {

               for (
                var Pict = 0;
                Pict <= _this.$store.state.ProductPictures.length - 1;
                Pict++
              ) {
                if (
                  response.data.data.list[pronum1].productLine ==
                  _this.$store.state.ProductPictures[Pict].type
                ) {
                  response.data.data.list[pronum1].picUrls =
                    _this.$store.state.ProductPictures[Pict].img;
                }
              }


              //产品线
              for (
                var pronum = 0;
                pronum <= _this.productLine.length - 1;
                pronum++
              ) {
                if (
                  response.data.data.list[pronum1].productLine ==
                  _this.productLine[pronum].value
                ) {
                  response.data.data.list[pronum1].productLine =
                    _this.productLine[pronum].lable;
                }
              }


              if (response.data.data.list[pronum1].installDate != null) {
                response.data.data.list[
                  pronum1
                ].installDate = response.data.data.list[
                  pronum1
                ].installDate.substring(0, 10);
              }

              if (response.data.data.list[pronum1].guaranteeBeginDate != null) {
                response.data.data.list[
                  pronum1
                ].guaranteeBeginDate = response.data.data.list[
                  pronum1
                ].guaranteeBeginDate.substring(0, 10);
              }
              if (response.data.data.list[pronum1].guaranteeEndDate != null) {
                response.data.data.list[
                  pronum1
                ].guaranteeEndDate = response.data.data.list[
                  pronum1
                ].guaranteeEndDate.substring(0, 10);
              }
            }
            _this.list = response.data.data.list;
          }
          // if (response.data.msg == "未查询到当前用户下的产品信息") {
          //   Toast({
          //     message: "未查询到当前用户下的产品信息",
          //     duration: 500
          //   });
          // }
        })
        .catch(function(error) {
          Toast({
            message: "网络开小差，请稍后重试",
            duration: 500
          });
        });
    },
    toback() {
      this.$router.push({
        path: "/custser"
      });
    },
    toprodetail(n) {
      return
      this.$router.push({
        path: "/prodetail",
        query: {
          detaliId: n.id,
          videoUrl: n.videoUrl
        }
      });
    }
  }
};
</script>
<style scoped>
.main {
  margin: 0 0.34rem;
}

.tishi {
  margin-top: 1rem;
  font-size: 0.4rem;
  color: #888;
  height: 0.42rem;
  line-height: 0.42rem;
  text-align: center;
}

.grabble {
  width: 100%;
  margin: 0.16rem 0;
  height: 0.96rem;
}
.grabble input {
  width: 5.3rem;
  height: 0.32rem;
  border: 0.01rem #b8b8ba solid;
  line-height: 0.32rem;
  font-size: 0.25rem;
  padding-left: 0.25rem;
  float: left;
  padding: 0.32rem;
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

.main .list {
  width: 6.24rem;
  height: 3rem;
  background: #fff;
  margin-top: 0.16rem;
  padding: 0.28rem;
}

.left_img {
  float: left;
  width: 2.4rem;
  height: 2.7rem;
  background: #f2f3f7;
  margin-top: 0.1rem;
}
.right_box {
  float: left;
  margin-left: 0.26rem;
  width: 3.5rem;
  height: 1.53rem;
}
.right_box li {
  max-height: 0.9rem;
  font-size: 0.24rem;
  color: #919191;
  word-wrap:break-word
}
.right_box h3 {
  width: 3.5rem;
  height: 0.32rem;
  font-size: 0.28rem;
  line-height: 0.32rem;
  color: #000;
  margin-bottom: 0.05rem;
}
.right_box i {
  display: block;
  width: 2.5rem;
  height: 0.22rem;
  font-size: 0.24rem;
  line-height: 0.24rem;
  color: #919191;
  float: left;
  font-style: normal;
  vertical-align: top;
}
.right_box i {
  width: 2.3rem;
  height: 0.42rem;
  font-size: 0.24rem;
  line-height: 0.42rem;
  color: #919191;
  float: left;
}
.right_box span {
  width: 1.2rem;
  height: 0.42rem;
  font-size: 0.24rem;
  line-height: 0.42rem;
  color: #919191;
  float: left;
}
</style>


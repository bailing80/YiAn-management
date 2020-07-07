<template>
  <div class="box">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">维修指导</p>
      <span class="zixun" @click="tosend">
        <u></u>在线咨询
      </span>
    </div>
    <div
      class="main"
      
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <ul>
        <li class="sous">
          <select v-model="productLine">
            <option value>产品线</option>
            <option
              :value="productcont.value"
              v-for="(productcont,productindex) in productList"
              :key="productindex"
            >{{productcont.lable}}</option>
          </select>
          <select v-model="modelLine">
            <option value>型号</option>
            <option
              :value="modelcont.value"
              v-for="(modelcont,modelListindex) in modelList"
              :key="modelListindex"
            >{{modelcont.lable}}</option>
          </select>
          <select v-model="classLine">
            <option value>类型</option>
            <option
              :value="classcont.value"
              v-for="(classcont,classindex) in classList"
              :key="classindex"
            >{{classcont.lable}}</option>
          </select>

          <select v-model="formatLine">
            <option value>格式</option>
            <option
              :value="formatcont.value"
              v-for="(formatcont,formatindex) in formatList"
              :key="formatindex"
            >{{formatcont.lable}}</option>
          </select>
        </li>
      </ul>
      <ul v-show="booler">
        <li
          @click="tomaintaindetail(listcont)"
          v-for="(listcont , listindex) in list"
          :key="listindex"
        >
          <p>◆ {{listcont.title}}</p>
          <i></i>
        </li>
      </ul>
    </div>
    <div class="main" style=" background:#f2f3f7;" v-show="!booler">
      <p class="tishi">无数据</p>
    </div>
  </div>
</template>

<script>
import { Toast, MessageBox, Indicator } from "mint-ui";
import baseUrl from "../../api/baseUrl.js";
import Cookie from "../../api/cookie.js";
var _this;
export default {
  name: "maintain",
  data() {
    return {
      productLine: "",
      productList: [],

      modelLine: "",
      modelList: [],
      modelList1: [],

      classLine: "",
      classList: [],

      formatLine: "",
      formatList: [],

      list: [],
      isAjax: true,
      booler: true,
      boolershow: false,
      page: 1,
      rows: 15,
      total: 0
    };
  },

  created() {
    _this = this;
    //产品线
    this.$Axios
      .post(
        baseUrl +
          "/dicCode/queryDicByMoreType?type=PRODUCT_LINE,EQUI_MODEL,DIRECT_TYPE,FORMAT_TYPE"
      )
      .then(function(response) {
        //重复点击
        if (response.data.code == 200) {
          for (let nulist = 0; nulist < response.data.data.length; nulist++) {
            if (response.data.data[nulist].type == "PRODUCT_LINE") {
              _this.productList.push(response.data.data[nulist]);
            }
            if (response.data.data[nulist].type == "EQUI_MODEL") {
              _this.modelList.push(response.data.data[nulist]);
              _this.modelList1.push(response.data.data[nulist]);
            }
            if (response.data.data[nulist].type == "DIRECT_TYPE") {
              _this.classList.push(response.data.data[nulist]);
            }
            if (response.data.data[nulist].type == "FORMAT_TYPE") {
              _this.formatList.push(response.data.data[nulist]);
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
    _this.issend();
  },
  watch: {
    productLine() {
      this.search();
      let ids = "";
      _this.modelList = [];
      for (let pri = 0; pri <= _this.productList.length - 1; pri++) {
        if (_this.productLine == _this.productList[pri].value) {
          ids = _this.productList[pri].id;
        }
      }
      for (let i = 0; i <= _this.modelList1.length - 1; i++) {
        if (_this.modelList1[i].parentId == ids) {
          _this.modelList.push(_this.modelList1[i]);
        }else if(ids == ""){
          _this.modelList.push(_this.modelList1[i]);
        }
       
      }
    },
    modelLine() {
      this.search();
    },
    classLine() {
      this.search();
    },
    formatLine() {
      this.search();
    }
  },
  methods: {
    issend() {
      Indicator.open({
        text: "加载中，请稍后",
        spinnerType: "fading-circle"
      });

      //列表
      this.$Axios
        .post(baseUrl + "/repairSkillGuidance/queryGuidanceList", {
          customerId: this.$store.state.repairorder.repairorderId,
          page: this.page,
          rows: this.rows,
          owner: "1,2"
        })
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
          //重复点击
          if (response.data.code == 200) {
            if (response.data.data.list.length == 0) {
              Toast({
                message: "未查询到相关指导内容",
                duration: 1000
              });
              _this.booler = false;
              return;
            } else {
              _this.booler = true;
              _this.list = response.data.data.list;
              _this.total = response.data.data.total;
              _this.boolershow = true;
            }
          }
          if (response.data.code == -100) {
            Toast({
              message: "未查询到维修技能指引",
              duration: 1000
            });
            _this.booler = false;
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

        //列表
        this.$Axios
          .post(baseUrl + "/repairSkillGuidance/queryGuidanceList", {
            customerId: this.$store.state.repairorder.repairorderId,
            page: this.page,
            rows: this.rows,
            owner: "1,2"
          })
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
            //重复点击
            if (response.data.code == 200) {
              if (response.data.data.list.length == 0) {
                Toast({
                  message: "未查询到相关指导内容",
                  duration: 1000
                });
                _this.booler = false;
                return;
              } else {
                _this.booler = true;
                for (
                  var listnum = 0;
                  listnum <= response.data.data.list.length - 1;
                  listnum++
                ) {
                  _this.list.push(response.data.data.list[listnum]);
                }
              }
            }

            if (response.data.code == -100) {
              Toast({
                message: "未查询到维修技能指引",
                duration: 1000
              });
              _this.booler = false;
            }
          })
          .catch(function(error) {
            Indicator.close();
            Toast({
              message: "网络开小差，请稍后重试",
              duration: 1000
            });
          });
      }
    },
    search() {
      if (!this.isAjax) return;
      this.isAjax = false;
      this.page = 0;
      var url = {
        customerId: this.$store.state.letter.user.user_id,
        productLine: this.productLine,
        model: this.modelLine,
        type: this.classLine,
        format: this.formatLine,
        rows: this.rows,
        page: this.page,
        owner: "1,2"
      };
      // return ;
      this.$Axios
        .post(baseUrl + "/repairSkillGuidance/queryGuidanceList", url)
        .then(function(response) {
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
          //重复点击
          if (response.data.code == 200) {
            if (response.data.data.list.length == 0) {
              Toast({
                message: "未查询到维修技能指引",
                duration: 1000
              });
              _this.booler = false;
              _this.list = [];
              return ;
            } else {
              _this.booler = true;
              if (response.data.data.total > _this.rows) {
                _this.page++;
              }
              _this.list = response.data.data.list;
              _this.boolershow = true;

              let proid = 0;
              for (let ipro = 0; ipro <= _this.productList.length - 1; ipro++) {
                if (_this.productList[ipro].value == _this.productLine) {
                  proid = _this.productList[ipro].id;
                }
              }
              _this.modelList = [];
              for (let i = 0; i <= _this.modelList1.length - 1; i++) {
                if (_this.modelList1[i].parentId == proid) {
                  _this.modelList.push(_this.modelList1[i]);
                }
              }

              if (_this.productLine == "") {
                _this.modelList = _this.modelList1;
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
    toback() {
      this.$router.replace({
        path: "/staffserver"
      });
    },
    tomaintaindetail(n) {
      this.$router.push({
        path: "/maintaindetailEmp",
        query: {
          nid: n.id,
          video: n.video
        }
      });
    },

    tosend() {
      
      var datelist = {
        customerId: this.$store.state.repairorder.repairorderId,
        customerName: this.$store.state.repairorder.repaiName,
        phone: this.$store.state.repairorder.repaiPhone,
        serviceId: 80,
        serviceTel: "谊安售后",
        productId: this.$route.query.nid,
        consultingType: 1
      };

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
            // _this.userlist = response.data.data;
            _this.$router.push({
              path: "/OnlineChatorder",
              query: {
                nid: _this.$route.query.nid,
                tianjiaid: response.data.data.needId
              }
            });
          }
        })
        .catch(function(error) {
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
.box {
  position: absolute;
  top: 0;
  left: 0;
}

.tishi {
  margin-top: 1rem;
  font-size: 0.4rem;
  color: #888;
  height: 0.42rem;
  line-height: 0.42rem;
  text-align: center;
}
/* 弹框 */

.main {
  background: #fff;
}
.main h3 {
  width: 7.26rem;
  height: 1.02rem;
  line-height: 1.02rem;
  padding-left: 0.24rem;
  background: #eeeaf3;
  font-size: 0.28rem;
  position: relative;
}
.main h3 i {
  display: block;
  width: 0.15rem;
  height: 0.27rem;
  line-height: 1.02rem;
  background: url("../../assets/icon_you.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0.4rem;
  right: 0.25rem;
}
.main ul {
  overflow: hidden;
  transform: all 0.3;
}

.main li {
  width: 7.02rem;
  line-height: 0.59rem;
  background: #fff;
  position: relative;
  margin-bottom: 0.02em;
  margin: 0 0.24rem;
  border-bottom: 0.01rem #f2f2f2 solid;
  transform: all 0.3;
}

.main li p {
  height: 0.79rem;
  color: #323232;
  font-size: 0.28rem;
  line-height: 0.8rem;
}
.main li i {
  display: none;
  position: absolute;
  top: 0.15rem;
  color: #acacac;
  font-style: normal;
  width: 0.17rem;
  height: 0.28rem;
  background: url("../../assets/arrow_r.png") no-repeat;
  background-size: 100% 100%;
}

.main li textarea {
  height: 1.6rem;
  width: 6.8rem;
  color: #323232;
  font-size: 0.28rem;
  padding: 0.3rem 0;
}

.main li .ac {
  display: block;
}
.main .rm_ac {
  border-bottom: none;
  line-height: 0.59rem;
}
.main .rm_ac01 {
  border-bottom: none;
  line-height: 0.79rem;
}
.main li .mr {
  width: 6.8rem;
  padding: 0.2rem 0;
  height: 0.97rem;
  line-height: 0.42rem;
  border: none;
}

.main li .hg {
  height: 0.54rem;
  line-height: 0.54rem;
  display: inline-block;
  vertical-align: top;
  width: 6rem;
  margin-left: 0.25rem;
}

.main li u {
  display: inline-block;
  width: 0.39rem;
  height: 0.39rem;
  background: url("../../assets/phone.png") no-repeat;
  background-size: 100% 100%;
  vertical-align: top;
  margin-top: 0.08rem;
}

.main .rm_ac01 u {
  background: url("../../assets/diqiu.png") no-repeat;
  background-size: 100% 100%;
}

.mt {
  margin: 0.8rem 0 1rem 0.35rem;
  width: 3.2rem;
  display: inline-block;
  vertical-align: top;
}

.main .hg_ac {
  height: auto;
}

select {
  width: 1.55rem;
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
select:focus {
  outline: none;
}
i[data-v-16c71cda] {
  display: block;
  float: left;
  width: 0.83rem;
  height: 0.98rem;
  line-height: 0.96rem;
  background: #919191;
  position: relative;
}
.sous i {
  display: block;
  float: left;
  width: 0.83rem;
  height: 0.98rem;
  line-height: 0.96rem;
  background: #919191;
  position: relative;
}

.header .zixun {
  font-size: 0.24rem;
  position: absolute;
  top: 0;
  right: 0;
  height: 1rem;
  line-height: 1.35rem;
  padding: 0 0.25rem;
  color: #fff;
  overflow: hidden;
}
.header .zixun u {
  position: absolute;
  top: 0.1rem;
  left: 0.5rem;
  width: 0.4rem;
  height: 0.4rem;
  background: url("../../assets/icon_yun1.png") no-repeat;
  background-size: 100% 100%;
}
</style>


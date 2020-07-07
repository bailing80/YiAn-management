<template>
  <div class="box xiong002">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">进度查询</p>
    </div>

    <div>
      <!-- <div class="yuyue">
        <p>创建时间:</p>
        <span class="miaosu" @click="xuanzhe(1)">{{createDate}}</span>
        <u @click="xuanzhe(2)"></u>
      </div>-->

      <div class="selctxuanzhebox">
        <div class="selctxuanzhe" @click="sotr_time(0)">
          <em :class="{'closren':sotr_sheng == true}">时间排序</em>
          <i
            :class="{'el-icon-arrow-down':sotr_sheng == true,'closren':sotr_sheng == true,'el-icon-arrow-up':sotr_sheng == false}"
          ></i>
        </div>
        <div class="selctxuanzhe" @click="sotr_time(1)">
          <em :class="{'closren':sotr_sheng1 == true}">优先</em>
          <i
            :class="{'el-icon-arrow-down':sotr_sheng1 == true ,'closren':sotr_sheng1 == true,'el-icon-arrow-up':sotr_sheng1 == false}"
          ></i>
        </div>
        <div class="selctxuanzhe" @click="sotr_time(2)">
          <em :class="{'closren':sotr_sheng2 == true}">状态</em>
          <i
            :class="{'el-icon-arrow-down':sotr_sheng2 == true,'closren':sotr_sheng2 == true,'el-icon-arrow-up':sotr_sheng2 == false}"
          ></i>
        </div>
        <!-- <el-select
          placeholder="优先级"
          v-model="priority"
          clearable
          class="selctxuanzhe"
          @change="statuslistto"
        >
          <el-option
            v-for="item in prioritylist"
            :key="item.id"
            :label="item.lable"
            :value="item.value"
          ></el-option>
        </el-select>-->
      </div>
    </div>
    <div
      class="maiList"
      v-show="booler"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div class="list" v-for="(listnum,index) in list" :key="index">
        <img :src="listnum.picUrls" alt class="left_img" />
        <div class="right_box">
          <ul>
            <!-- <li>设备机型：家用呼吸机</li> -->
            <li>工单编号：{{listnum.assignId}}</li>
            <li>报修日期：{{listnum.createDate}}</li>
            <li>处理状态：{{listnum.status==0? '待审核':listnum.status==1? '待派单':listnum.status==6? '已完成':listnum.status==7? '已结束':listnum.status==5? '已接单':listnum.status==4? '未接单':listnum.status==3? '再次派单':listnum.status==8? '已拒绝':'处理中'}}</li>
            <!-- <li>处理状态：{{listnum.status==0? '待审核':listnum.status==1? '待派单':listnum.status==6? '已完成':'二次处理'}}</li> -->
            <li>
              <i class="details" @click="toprogressdetail(listnum)">
                进度详情
                <mt-badge type="error" size="small" v-show="listnum.isRead == 0">+1</mt-badge>
              </i>
              <i
                class="evaluate"
                :class="{isbtnac:listnum.isHaveService || listnum.status !=6 }"
                @click="toevaluate(listnum)"
              >服务评价</i>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="maiList" v-show="!booler">
      <p class="tishi">未查询到报修进度</p>
    </div>

    <!-- 选择时间 -->
    <TimeComponent :boosl="timebool" :datitme1="createDate" @cancelTime="cancelTime"></TimeComponent>
  </div>
</template>

<script>
import baseUrl from "../../api/baseUrl.js";
import Cookie from "../../api/cookie.js";
import { Toast, Indicator } from "mint-ui";

import TimeComponent from "../workorder/TimeComponent";
var _this;
export default {
  name: "position",

  data() {
    return {
      src1: "",
      list: [],
      booler: true,
      boolershow: false,
      // 选择时间  id    显示隐藏
      timebool: false,
      sotr_sheng: false,
      sotr_sheng1: false,
      sotr_sheng2: false,
      createDate: "",
      status: "",
      priority: "",
      page: 1,
      rows: 6,
      total: 0, //总页数，
      usertype: "",
      prioritylist: [
        { id: 1, lable: "全部", value: "" },
        { id: 2, lable: "正常", value: "0" },
        { id: 3, lable: "加急", value: "1" },
        { id: 4, lable: "优先", value: "2" }
      ],
      statuslist: [
        { id: 1, lable: "全部", value: "" },
        { id: 2, lable: "未完成", value: "0,1,3,4,5" },
        // { id: 3, lable: "已完成", value: "6,7" },
        { id: 3, lable: "已完成", value: "6" },
        { id: 4, lable: "已拒绝", value: "8" },
       
      ]
    };
  },
  components: {
    TimeComponent
  },
  created() {
    _this = this;
    if (Cookie.getCookie("avatar") == "0") {
      //医院提报工单  医院信息
      this.userType = "0";
    } else if (Cookie.getCookie("avatar") == "1") {
      //渠道提报工单  医院信息
      this.userType = "1";
    } else if (Cookie.getCookie("avatar") == "3") {
      this.userType = "0";
    }

    _this.issend();
  },
  methods: {
    xuanzhe(n) {
      if (n == 1) {
        var scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        document.body.style.cssText +=
          "position:fixed;top:-" + scrollTop + "px;";
        this.timebool = !this.timebool;
      } else if (n == 2) {
        this.createDate = "";
        this.issend();
      }
    },
    //选择时间
    cancelTime(data) {
      if (data.name == "取消") {
        this.timebool = false;
      } else if (data.name == "确定") {
        this.createDate = data.time;
        this.timebool = false;
        this.issend();
      }
      var body = document.body;
      body.style.position = "static";
      var top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      );
      body.style.top = "";
    },
    statuslistto() {
      this.issend();
    },
    issend() {
      Indicator.open({
        text: "加载中，请稍后",
        spinnerType: "fading-circle"
      });

      this.$Axios
        .post(baseUrl + "/applyJob/queryRepairListReception", {
          userId: this.$store.state.letter.user.user_id,
          page: this.page,
          rows: this.rows,
          userType: this.userType,
          status: this.status,
          createDate: this.createDate,
          priority: this.priority
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

          if (response.data.data.list.length <= 0) {
            _this.booler = false;
            Toast({
              message: "未查询到报修进度",
              duration: 1000
            });
          }

          if (response.data.code == 200) {
            _this.total = response.data.data.total;
            _this.booler = true;
            for (
              var listnum = 0;
              listnum <= response.data.data.list.length - 1;
              listnum++
            ) {
              for (
                var Pict = 0;
                Pict <= _this.$store.state.WorkOrderType.length - 1;
                Pict++
              ) {
                if (
                  response.data.data.list[listnum].applyType ==
                  _this.$store.state.WorkOrderType[Pict].applyType
                ) {
                  response.data.data.list[listnum].picUrls =
                    _this.$store.state.WorkOrderType[Pict].img;
                }
              }
              response.data.data.list[
                listnum
              ].createDate = response.data.data.list[
                listnum
              ].createDate.substring(0, 10);
            }

            _this.list = response.data.data.list;
            _this.boolershow = true;
          }
        })
        .catch(function() {
          Indicator.close();
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

        this.$Axios
          .post(baseUrl + "/applyJob/queryRepairListReception", {
            userId: this.$store.state.letter.user.user_id,
            page: this.page,
            rows: this.rows,
            userType: this.userType,
            status: this.status,
            createDate: this.createDate,
            priority: this.priority
          })
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

            if (response.data.data.list.length <= 0) {
              _this.booler = false;
              Toast({
                message: "未查询到报修进度",
                duration: 1000
              });
            }

            if (response.data.code == 200) {
              _this.total = response.data.data.total;

              for (
                var listnum = 0;
                listnum <= response.data.data.list.length - 1;
                listnum++
              ) {
                for (
                  var Pict = 0;
                  Pict <= _this.$store.state.WorkOrderType.length - 1;
                  Pict++
                ) {
                  if (
                    response.data.data.list[listnum].applyType ==
                    _this.$store.state.WorkOrderType[Pict].applyType
                  ) {
                    response.data.data.list[listnum].picUrls =
                      _this.$store.state.WorkOrderType[Pict].img;
                  }
                }
                response.data.data.list[
                  listnum
                ].createDate = response.data.data.list[
                  listnum
                ].createDate.substring(0, 10);

                _this.list.push(response.data.data.list[listnum]);
              }
              _this.boolershow = true;
              _this.sotr_sheng = false;
              _this.sotr_sheng1 = false;
              _this.sotr_sheng2 = false;
            }
          })
          .catch(function() {});
      }
    },

    toback() {
      this.$router.push({
        path: "/custser"
      });
    },
    toyiyuan() {
      this.$router.push({
        path: "/custser"
      });
    },
    toprogressdetail(n) {
      this.$router.push({
        path: "/progressdetail",
        query: {
          listid: n.groupId,
          level: n.customerLevel,
          appointmentDate: n.appointmentDate
        }
      });
    },
    toevaluate(n) {
      if (n.status != 6) {
        Toast({
          message: "工单还没有完成，无法评价",
          duration: 1000
        });
      } else if (n.isHaveService) {
        Toast({
          message: "已经评价过了，不能重复评价",
          duration: 1000
        });
        return;
      } else {
        this.$router.push({
          path: "/evaluate",
          query: {
            listid: n.staffId,
            groupId: n.groupId
          }
        });
      }
    },
    //排序
    sotr_time(n) {
      if (n == 0) {
        if (this.sotr_sheng == true) {
          this.myFunction(this.list, function(a, b) {
            return (
              Date.parse(b.createDate.replace(/-/g, "/")) -
              Date.parse(a.createDate.replace(/-/g, "/"))
            );
          });
        } else {
          this.myFunction(this.list, function(a, b) {
            return (
              Date.parse(a.createDate.replace(/-/g, "/")) -
              Date.parse(b.createDate.replace(/-/g, "/"))
            );
          });
        }
        this.sotr_sheng = !this.sotr_sheng;
        this.sotr_sheng1 = false;
        this.sotr_sheng2 = false;
      } else if (n == 1) {
        if (this.sotr_sheng1 == true) {
          this.myFunction(this.list, function(d, c) {
            return d.status - c.status;
          });
        } else {
          this.myFunction(this.list, function(d, c) {
            return c.status - d.status;
          });
        }

        this.sotr_sheng = false;
        this.sotr_sheng2 = false;
        this.sotr_sheng1 = !this.sotr_sheng1;
      } else if (n == 2) {
        if (this.sotr_sheng2 == true) {
          this.myFunction(this.list, function(a, b) {
            return b.status - a.status;
          });
        } else {
          this.myFunction(this.list, function(a, b) {
            return a.status - b.status;
          });
        }

        this.sotr_sheng = false;
        this.sotr_sheng1 = false;
        this.sotr_sheng2 = !this.sotr_sheng2;
      }
    },
    //排序方法
    myFunction(d, n) {
      d.sort(n);
      return d;
    }
  }
};
</script>
<style >
.xiong002 .mint-badge.is-error {
  position: absolute;
  top: -7px;
  right: -7px;
  line-height: 7px;
}
.xiong002 .selctxuanzhebox {
  width: 7.5rem;
}
.xiong002 .toplist {
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
  margin: 0;
  width: 1.4rem;
  font-size: 0.3rem;
}

.xiong002 .selctxuanzhe {
  width: 1.7rem;
  font-size: 0.3rem;
  background: #fff;
  padding: 0.2rem;
  border-radius: 0.25rem;
  margin: 0.2rem;
  display: inline-block;
  vertical-align: top;
  text-align: center;
}
.xiong002 .selctxuanzhe .el-icon-arrow-down {
  margin-left: 0.2rem;
}
.xiong002 .selctxuanzhe .el-icon-arrow-up {
  margin-left: 0.2rem;
}
.xiong002 .selctxuanzhe em {
  font-style: normal;
  display: inline-block;
  vertical-align: top;
  text-align: center;
}
.xiong002 .closren {
  color: blueviolet;
}
</style>
<style scoped>
.tishi {
  margin-top: 1rem;
  font-size: 0.4rem;
  color: #888;
  height: 0.42rem;
  line-height: 0.42rem;
  text-align: center;
}
.maiList {
  margin: 0 0.25rem;
  width: 7rem;
}
.maiList .list {
  width: 6.6rem;
  height: 2.8rem;
  background: #fff;
  margin-top: 0.16rem;
  padding: 0.3rem 0.2rem;
  position: relative;
}

.left_img {
  float: left;
  width: 2.06rem;
  height: 1.94rem;
  background: #f2f3f7;
}
.right_box {
  float: right;
  width: 4.35rem;
  height: 2.6rem;
}

.right_box ul li {
      font-size: 0.28rem;
    line-height: 0.4rem;
    margin-bottom: 0.26rem;

}
.right_box ul li i {
  display: block;
  width: 1.45rem;
  height: 0.6rem;
  line-height: 0.63rem;
  text-align: center;
  font-size: 0.24rem;
  color: #fff;
  font-style: normal;
  float: left;
  border-radius: 0.07rem;
}
.right_box ul li .details {
  background: #998bd6;
  position: relative;
}

.right_box ul li .evaluate {
  margin-left: 0.4rem;
  border: 1px #998bd6 solid;
  color: #000;
}

.isbtnac {
  /* pointer-events: none; */
  background: #ccc;
}

.yuyue {
  background: #fff;
  margin-top: 0.2rem;
  width: 5.08rem;
  background: #fff;
  margin-bottom: 0.16rem;
  position: relative;
  display: inline-block;
  vertical-align: top;
}

.yuyue p {
  height: 0.97rem;
  line-height: 0.97rem;
  margin-left: 0.28rem;
  font-size: 0.26rem;
  color: #919191;
}

.yuyue span {
  position: absolute;
  top: 0;
  left: 0;
  width: 2.8rem;
  line-height: 0.95rem;
  height: 0.95rem;
  font-size: 0.3rem;
  color: #919191;
  text-align: left;
  padding-left: 1.5rem;
}

.yuyue u {
  display: block;
  width: 0.47rem;
  height: 0.48rem;
  background: url("../../assets/cha.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0.25rem;
  right: 0.3rem;
}
</style>


<template>
  <div class="box xiongma1">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">工单列表</p>
      <div class="selctxuanzhebox">
        <el-select
          placeholder="请选择"
          v-model="status"
          clearable
          class="selctxuanzhe"
          @change="statuslistto"
        >
          <el-option
            v-for="item in statuslist"
            :key="item.id"
            :label="item.lable"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>

    <div
      class="maiList"
      v-show="booloer"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <div class="list" v-for="(order_name,i) in orderList" :key="i" v-show="order_name.status != '待派单'" >
        <span
          :class="{icon_youxian:order_name.priority == '加急',icon_jin:order_name.priority == '优先',icon_pu:order_name.priority == '正常'}"
        >{{order_name.priority}}</span>
        <img :src="order_name.picUrls" alt class="left_img" />
        <div class="right_box">
          <ul>
            <li>工单编号：{{order_name.assignId}}</li>
            <li>工单类型：{{order_name.applyType1}}</li>
            <li >医院名称：<p style="position: absolute;margin-left:20%;top:31.5%">{{order_name.customerName}}</p></li>
            <li >优先级别：{{order_name.priority}}</li>
            <li>报修日期：{{order_name.createDate}}</li>
            <li>处理状态：{{order_name.status}}</li>
          </ul>
        </div>
        <div class="anniu" >
        
          <i  class="ac" @click="toorderdetail(order_name.groupId,order_name.applyType1)">
            工单详情
            <mt-badge type="error" size="small" v-show="order_name.isRead == 0">+1</mt-badge>
          </i>
          <i 
            :class="{isbtnac:order_name.status == '已接单' || order_name.status == '已完成' ||  order_name.status == '已结束' ||  order_name.status == '已结束'  }"
            @click="btn_yes('0',order_name,i)"  v-show="order_name.status != '未通过'"
          >接受</i>
          <i
            :class="{isbtnac:order_name.status == '已完成'  ||  order_name.status == '已结束' || order_name.status == '已结束'  }"
            @click="toreport(order_name.applyType,order_name.groupId,order_name.status)"  v-show="order_name.status != '未通过'"
          >签字</i>
          <i 
            :class="{isbtnac:order_name.status == '已完成'  ||  order_name.status == '已结束'}"
            @click="btn_yes('1',order_name,i,order_name.applyType)" v-show="order_name.status != '未通过'"
          >拒绝</i>

         <i  :class="{isbtnac:order_name.status == '未完成' }"
          @click="chongxintibao(order_name.groupId,order_name.customerId,order_name.applyType1)"  v-show="order_name.status == '未通过'" 
          >编辑</i>
      
        </div>
      </div>
    </div>
    <div class="maiList" v-show="!booloer">
      <p class="cloo">还没有分派工单，请等候</p>
    </div>
    <div class="model" v-show="model">
      <div class="bg"></div>
      <div class="queding" v-if="bool">
        <i></i>
        <p>是否确认接收工单</p>
        <ul>
          <li class="roder01 ac" @click="Monitoringoperation('接受工单')">确定</li>
          <li class="roder02" @click="quxiao">取消</li>
        </ul>
      </div>
      <div class="queding" v-else>
        <h3 @click="xuanzhe(0)">
          原因
          <span>{{title}}</span>
          <u></u>
        </h3>
        <textarea maxlength="75" placeholder="备注" v-model="refuseReasonRemarks"></textarea>
        <ul>
          <li class="roder01 ac" @click="Monitoringoperation('拒绝工单')">确定</li>
          <li class="roder02" @click="quxiao">取消</li>
        </ul>
      </div>
    </div>
    <div class="model_tankuang" v-show="bool_tankuang">
      <div class="bg_yanse"></div>
      <div
        class="slots_list"
        :class="{demo_transform3:!bool_tankuang,demo_transform4:bool_tankuang}"
      >
        <h2>拒绝原因</h2>
        <span @click="quxiao" class="span1">取消</span>
        <span @click="queding">确定</span>
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </div>
    </div>
  </div>
</template>

<script>
import baseUrl from "../../api/baseUrl.js";
import { Toast, Indicator } from "mint-ui";
import Cookie from "../../api/cookie.js";

var _this;
export default {
  name: "orderlist",
  data() {

    return {
      src1: "../../assets/code.png",
      model: "false",
      bool: "true",
   
      booloer: true, //数据为空 时  改为false

      PRIORITY: [],
      JOB_STATUS: [],
      APPLY_TYPE: [],
      nul: 0, //接受  或拒绝    0   接受   1 拒绝
      isReceipt: false, //是否接单
      workorder: {},
      workorder1: {},
      refuseReasonRemarks: "", //拒绝理由

      bool_tankuang: false,
      title: "",
      list1: [],
      list2: [],
      slots: [
        {
          flex: 1,
          values: [],
          className: "slots",
          textAlign: "center"
        }
      ],
      orderList: [], //列表
      page: 1,
      rows: 5,
      total: 0, //总页数
      boolershow: false, //是否发起请求了
      status: "",
      statuslist: [
        { id: 1, lable: "全部", value: "" },
        { id: 2, lable: "未完成", value: "0,1,3,4,5" },
        { id: 3, lable: "已完成", value: "6,7" },
        { id: 4, lable: "未审核", value: "0" },
        { id: 5, lable: "未通过", value: "8" },
        { id: 6, lable: "未接单", value: "4" },
        { id: 7, lable: "已接单", value: "5" },
      ]
    };
  },
  created() {
    _this = this;
    this.model = false;

    this.$Axios
      .post(
        baseUrl +
          "/dicCode/queryDicByMoreType?type=PRIORITY,JOB_STATUS,APPLY_TYPE,REFUSE_REASON"
      )
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
          //重复点击
          for (let nulist = 0; nulist < response.data.data.length; nulist++) {
            if (response.data.data[nulist].type == "PRIORITY") {
              _this.PRIORITY.push(response.data.data[nulist]);
            }
            if (response.data.data[nulist].type == "JOB_STATUS") {
              _this.JOB_STATUS.push(response.data.data[nulist]);
            }
            if (response.data.data[nulist].type == "APPLY_TYPE") {
              _this.APPLY_TYPE.push(response.data.data[nulist]);
            }
            if (response.data.data[nulist].type == "REFUSE_REASON") {
              if (response.data.data[nulist].value != 3) {
                _this.list2.push(response.data.data[nulist]);
                _this.list1.push(response.data.data[nulist].lable);
              }
            }
          }
          _this.listro();
        }
      })
      .catch(function() {
        Toast({
          message: "网络开小差，请稍后重试",
          duration: 1000
        });
      });
  },

  methods: {
   
    statuslistto() {
      this.listro();
    },
    //下滑执行
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
            staffId: this.$store.state.repairorder.repairorderId,
            page: _this.page,
            rows: _this.rows,
            status: _this.status
          })
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
              if (response.data.data.list.length - 1 <= -1) {
                _this.booloer = false;
              }
              for (
                let num = 0;
                num <= response.data.data.list.length - 1;
                num++
              ) {
                //时间
                response.data.data.list[
                  num
                ].createDate = response.data.data.list[
                  num
                ].createDate.substring(0, 10);
                //工单类型
                for (
                  let applyType = 0;
                  applyType <= _this.APPLY_TYPE.length - 1;
                  applyType++
                ) {
                  if (
                    _this.APPLY_TYPE[applyType].value ==
                    response.data.data.list[num].applyType
                  ) {
                    response.data.data.list[num].applyType1 =
                      _this.APPLY_TYPE[applyType].lable;
                  }
                }
                //处理状态
                for (
                  let status = 0;
                  status <= _this.JOB_STATUS.length - 1;
                  status++
                ) {
                  if (
                    _this.JOB_STATUS[status].value ==
                    response.data.data.list[num].status
                  ) {
                    response.data.data.list[num].status =
                      _this.JOB_STATUS[status].lable;
                  }
                }
                //优先级别
                for (
                  let priority = 0;
                  priority <= _this.PRIORITY.length - 1;
                  priority++
                ) {
                  if (
                    _this.PRIORITY[priority].value ==
                    response.data.data.list[num].priority
                  ) {
                    response.data.data.list[num].priority =
                      _this.PRIORITY[priority].lable;
                  }
                }
                //
                for (
                  var Pict = 0;
                  Pict <= _this.$store.state.WorkOrderType.length - 1;
                  Pict++
                ) {
                  if (
                    response.data.data.list[num].applyType ==
                    _this.$store.state.WorkOrderType[Pict].applyType
                  ) {
                    response.data.data.list[num].picUrls =
                      _this.$store.state.WorkOrderType[Pict].img;
                  }
                }
                _this.orderList.push(response.data.data.list[num]);

               
              }
            }
          })
          .catch(function() {
            Toast({
              message: "网络开小差，请稍后重试",
              duration: 1000
            });
          });
      }
    },
    listro() {
      _this.booloer = true;
      Indicator.open({
        text: "加载中，请稍后",
        spinnerType: "fading-circle"
      });
      _this.page = 1;
      this.$Axios
        .post(baseUrl + "/applyJob/queryRepairListReception", {
          staffId: this.$store.state.repairorder.repairorderId,
          page: _this.page,
          rows: _this.rows,
          status: _this.status
        })
        .then(function(response) {
          Indicator.close();
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
            if (response.data.data.list.length - 1 <= -1) {
              _this.booloer = false;
            }
            _this.total = response.data.data.total;

            for (
              let num = 0;
              num <= response.data.data.list.length - 1;
              num++
            ) {
              //时间
              response.data.data.list[num].createDate = response.data.data.list[
                num
              ].createDate.substring(0, 10);
              //工单类型
              for (
                let applyType = 0;
                applyType <= _this.APPLY_TYPE.length - 1;
                applyType++
              ) {
                if (
                  _this.APPLY_TYPE[applyType].value ==
                  response.data.data.list[num].applyType
                ) {
                  response.data.data.list[num].applyType1 =
                    _this.APPLY_TYPE[applyType].lable;
                }
              }
              //处理状态
              
              for (
                let status = 0;
                status <= _this.JOB_STATUS.length - 1;
                status++
              ) {
                if (
                  _this.JOB_STATUS[status].value ==
                  response.data.data.list[num].status
                ) {
                  response.data.data.list[num].status =
                    _this.JOB_STATUS[status].lable;
                }
              }
              //优先级别
              for (
                let priority = 0;
                priority <= _this.PRIORITY.length - 1;
                priority++
              ) {
                if (
                  _this.PRIORITY[priority].value ==
                  response.data.data.list[num].priority
                ) {
                  response.data.data.list[num].priority =
                    _this.PRIORITY[priority].lable;
                }
              }
              //
              for (
                var Pict = 0;
                Pict <= _this.$store.state.WorkOrderType.length - 1;
                Pict++
              ) {
                if (
                  response.data.data.list[num].applyType ==
                  _this.$store.state.WorkOrderType[Pict].applyType
                ) {
                  response.data.data.list[num].picUrls =
                    _this.$store.state.WorkOrderType[Pict].img;
                }
              }
            }
            _this.orderList = response.data.data.list;
            _this.boolershow = true;
          }
        })
        .catch(function() {
          Indicator.close();
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

    toorderdetail(n,m) {
      console.log(m)
      if(m == '专项'){
        this.$router.push({
        path: "/zhuanxianggongdanxiangqing",
        query: { id: n }
        })}else{
        this.$router.push({
        path: "/orderdetail",
        query: { id: n }
     })}
    },
   //白玲加

     chongxintibao(n,m,p) {
       if(p=='专项'){
 this.$router.push({
        path: "/repairconfirm-zhuanxiang",
        query: { id: n,leixing:p,id1:m,}
      });
       }else{
          let num = 0;
          let applyType = 0;
          let leixing= _this.APPLY_TYPE[applyType].lable;
          this.$router.push({
        path: "/chongxintibaoyemian",
        query: { id: n,leixing:p,id1:m,}
       
      }); }
// Toast({
//             message: "正在维护中，给您带来的不便还望谅解！",
//             duration: 1000
//           });
    },


    //签名
    toreport(n, id, s) {
      if (s == "已接单" || s == "已完成" || s == "已结束") {
        if (s == "已完成") {
          Toast({
            message: "工单已完成，无需重复签字",
            duration: 1000
          });
          return;
        }
        if (s == "已结束") {
          Toast({
            message: "工单已结束，无需重复签字",
            duration: 1000
          });
          return;
        }

        if (n == "WX") {
          //维修类型
          this.$router.push({
            path: "/toreport",
            query: { id: id }
          });
        } else if (n == "AZ") {
          //安装类型
          this.$router.push({
            path: "/installation",
            query: { id: id }
          });
        } else if (n == "PX") {
          //培训记录单
          this.$router.push({
            path: "/TrainingRecord",
            query: { id: id }
          });
        } else if (n == "ZX") {
          //专项服务报告单
          this.$router.push({
            path: "/SpecialReport",
            query: { id: id }
          });
        } else if (n == "HF") {
          //回访
          this.$router.push({
            path: "/returnvisit",
            query: { id: id }
          });
        } else if (n == 5) {
          //麻醉机
          this.$router.push({
            path: "/Anesthesiamachine",
            query: { id: id }
          });
        } else if (n == 6) {
          //手术床
          this.$router.push({
            path: "/Surgicalbed",
            query: { id: id }
          });
        } else if (n == 7) {
          //无影灯
          this.$router.push({
            path: "/Astrallamp",
            query: { id: id }
          });
        }
      } else {
        Toast({
          message: "还未接单或未完成，无法签字",
          duration: 1000
        });
      }
    },
    //操作流程 监控
    Monitoringoperation(issta) {
      let url = baseUrl + "/applyJob/addApplyRecord";
      let pagt = {
        groupId: "", //添加派工单历史记录   必填
        name: this.$store.state.repairorder.repaiName, //操作人姓名   姓名
        type: "员工", //操作人类型   员工   还是管理员
        operation: "", //具体操作  审核  ，  撤销 ，  通过    派单
        operationRemarks: "", //操作备注
        examine: "", //审核是否通过
        examineRemarks: this.refuseReasonRemarks //审核备注
      };
      if (issta == "接受工单") {
        pagt.groupId = this.workorder.groupId;
        pagt.operation = "接受工单";
        pagt.operationRemarks = "同意接受工单";
      } else if (issta == "拒绝工单") {
        pagt.groupId = this.workorder1.groupId;
        pagt.operation = "拒绝工单";
        pagt.operationRemarks = "拒绝接受工单";

        if (this.title == "") {
          Toast({
            message: "拒绝理由不能为空",
            duration: 1000
          });
          return;
        }
        if (this.refuseReasonRemarks == "") {
          Toast({
            message: "备注不能为空",
            duration: 1000
          });
          return;
        }
      }

      this.$Axios
        .post(url, pagt)
        .then(function() {
          if (issta == "接受工单") {
            _this.accept();
          } else if (issta == "拒绝工单") {
            _this.Refused();
          }
        })
        .catch(function() {});
    },

    btn_yes(n, c, id,p) {
   
      this.title = "";
      this.isReceipt = false;
      this.refuseReasonRemarks = "";
      //白玲加
//       if(p=='ZX'){
//       Toast({
//           message: "还未接单或未完成，无法拒绝",
//           duration: 1000
//         });
//         return;

// }
      if (_this.orderList[id].status == "已结束") {
        Toast({
          message: "工单已结束",
          duration: 1000
        });
        return;
      }

      if (_this.orderList[id].status == "已完成") {
        Toast({
          message: "工单已完成",
          duration: 1000
        });
        return;
      }

      if (_this.orderList[id].status == "已拒绝") {
        Toast({
          message: "工单已拒绝，无法做其它操作",
          duration: 1000
        });
        return;
      }
      if (n == 0) {
        //接受
        if (_this.orderList[id].status == "未审核") {
          Toast({
            message: "未审核，还不到接单状态，请稍后重试",
            duration: 1000
          });
          return;
        } else {
          if (n == "0") {
            if (_this.orderList[id].status == "已接单") {
              Toast({
                message: "工单已接单，无法做其它操作",
                duration: 1000
              });
              return;
            }
            this.model = true;
            this.workorder = c;
            this.bool = true;
            this.nul = id;
          }
        }
        //拒绝
      } else if (n == 1) {
        if (c.status == "已接单") {
          this.isReceipt = true;
        }
        this.model = true;
        this.workorder1 = c;
        this.bool = false;
        this.nul = id;
      }
    },

    //确定     接受工单
    accept() {
      let data = {
        id: this.workorder.id,
        staffId: this.workorder.staffId,
        staffName: this.workorder.staffName,
        groupId: this.workorder.groupId,
        status: 5,
        applyType: this.workorder.applyType
      };

      this.getAjax("/applyJob/acceptApplyJob", data);
    },
    //拒绝接单
    Refused() {
      if (this.title == "") {
        Toast({
          message: "拒绝理由不能为空",
          duration: 1000
        });
        return;
      }
      if (this.refuseReasonRemarks == "") {
        Toast({
          message: "备注不能为空",
          duration: 1000
        });
        return;
      }
      var tab = 0;
      for (let numlis = 0; numlis <= this.list2.length - 1; numlis++) {
        if (this.title == this.list2[numlis].lable) {
          tab = this.list2[numlis].value;
        }
      }
      let data = {};

      if (this.isReceipt) {
        data = {
          id: this.workorder1.id,
          staffId: this.$store.state.repairorder.repairorderId,
          staffName: this.$store.state.repairorder.repaiName,
          groupId: this.workorder1.groupId,
          status: 2,
          applyType: this.workorder1.applyType,
          refuseReason: tab, //拒绝理由
          refuseReasonRemarks: this.refuseReasonRemarks //拒绝理由备注
        };
        //接单之后再拒单
        this.getAjax("/applyJob/acceptAndRefuseApplyJob", data);
      } else {
        data = {
          id: this.workorder1.id,
          groupId: this.workorder1.groupId,
          staffId: this.$store.state.repairorder.repairorderId,
          staffName: this.$store.state.repairorder.repaiName,
          status: 2,
          applyType: this.workorder1.applyType,
          refuseReason: tab, //拒绝理由
          refuseReasonRemarks: this.refuseReasonRemarks //拒绝理由备注
        };
        //拒绝
        this.getAjax("/applyJob/refuseApplyJob", data);
      }
    },

    getAjax(url, data) {
      this.$Axios
        .post(baseUrl + url, data)
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
          if (response.data.code == 200) {
            if (data.status == 5) {
              _this.orderList[_this.nul].status = "已接单";
            }
            
            if (data.status == 2) {
              _this.orderList.splice(_this.nul, 1);
              _this.listro();
            }
            Toast({
              message: "操作成功",
              duration: 1000
            });
            _this.title = "";
            _this.refuseReasonRemarks = "";
            _this.model = false;
            _this.bool_tankuang = false;
          }
        })
        .catch(function() {});
    },
    quxiao() {
      this.model = false;
      this.bool_tankuang = false;
    },
    //弹框
    onValuesChange(picker, values) {
      this.values = values[0];
    },
    xuanzhe() {
      this.slots[0].values = this.list1;
      this.bool_tankuang = !this.bool_tankuang;
    },
    queding() {
      this.title = this.values;
      this.bool_tankuang = !this.bool_tankuang;
    }
    //弹框
  }
};
</script>
<style >
.xiongma1 .maiList .list .is-size-small {
  top: -0.26rem;
  right: -0.26rem;
  width: 0.4rem;
  height: 0.25rem;
  line-height: 0.24rem;
}
.xiongma1 .selctxuanzhebox {
  vertical-align: top;
  display: inline-block;
  height: 0.8rem;
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
}
.xiongma1 .selctxuanzhe {
  vertical-align: top;
  margin-left: 2.9rem;
  width: 2rem;
}
</style>
<style scoped>
.box {
  position: relative;
}

.cloo {
  font-size: 0.38rem;
  text-align: center;
  margin: 1rem 0;
  color: #777;
}

/* 弹框 */
.model_tankuang {
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
/* 弹框 */

.model {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.model .bg {
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
}
.model .queding {
  width: 5.4rem;
  height: 4rem;
  position: absolute;
  top: 34%;
  left: 15%;
  border-radius: 0.08rem;
  background: #fff;
}
.model .queding p {
  width: 100%;
  font-size: 0.28rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #333333;
  text-align: center;
}
.model .queding ul {
  height: 0.86rem;
  width: 5.4rem;
  position: absolute;
  bottom: 0;
  left: 0;
}
.model .queding ul li {
  background: #f1f0f0;

  color: #666666;
  font-size: 0.28rem;
  line-height: 0.86rem;
  height: 0.86rem;
  width: 50%;
  display: inline-block;
  vertical-align: top;
  text-align: center;
}
.model .queding ul .roder01 {
  border-radius: 0 0 0 0.08rem;
}
.model .queding ul .roder02 {
  border-radius: 0 0 0.08rem 0;
}
.model .queding ul .ac {
  color: #fff;
  background: #998bd6;
}

.model .queding h3 {
  width: 4.65rem;
  padding: 0 0.13rem;
  border-bottom: 0.01rem #dcdcdc solid;
  margin: 0 0.26rem;
  font-size: 0.28rem;
  line-height: 0.7rem;
  height: 0.7rem;
  margin-top: 0.2rem;
  position: relative;
}
.model .queding h3 span {
  display: inline-block;
  vertical-align: top;
  width: 3.7rem;
  text-align: right;
  height: 0.62rem;
  line-height: 0.62rem;
  color: #666666;
}

.model .queding h3 u {
  display: block;
  height: 0.28rem;
  width: 0.17rem;
  background: url("../../assets/arrow_r.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0.17rem;
  right: 0.15rem;
}

.model .queding i {
  display: block;
  margin: 0.75rem auto 0.35rem;
  width: 1rem;
  height: 1rem;
  background: url("../../assets/icon_queding.png") no-repeat;
  background-size: 100% 100%;
}

.model .queding textarea {
  margin: 0.23rem 0.4rem;
  width: 4.58rem;
  height: 1.8rem;
  line-height: 0.34rem;
  font-size: 0.28rem;
  color: #000;
  overflow: hidden;
}

.maiList {
  margin: 0 0.15rem;
  width: 6.8rem;
}
.maiList .list {
  width: 6.8rem;
  height: 4.4rem;
  background: #fff;
  margin-top: 0.25rem;
  padding: 0.4rem 0.18rem;
  position: relative;
}
.maiList .list span {
  position: absolute;
  top: -0.06rem;
  right: 0.24rem;
  width: 0.7rem;
  height: 0.45rem;
  font-size: 0.22rem;
  line-height: 0.34rem;
  color: #fff;
  text-align: center;
  padding-left: 0.15rem;
  letter-spacing: 0.04rem;
}
.maiList .list .icon_youxian {
  background: url("../../assets/icon_y.png") no-repeat;
  background-size: 100% 100%;
}
.maiList .list .icon_jin {
  background: url("../../assets/icon_jin.png") no-repeat;
  background-size: 100% 100%;
}
.maiList .list .icon_jia {
  background: url("../../assets/icon_jia.png") no-repeat;
  background-size: 100% 100%;
}
.maiList .list .icon_pu {
  background: url("../../assets/icon_pu.png") no-repeat;
  background-size: 100% 100%;
}

.left_img {
  display: inline-block;
  margin-top: 0.9rem;
  width: 1.7rem;
  height: 1.7rem;
  background: #f2f3f7;
}
.right_box {
  display: inline-block;
  width: 4.35rem;
  height: 1.9rem;
  margin-left: 0.56rem;
}

.right_box ul li {
  width:5rem;
  height: 0.52rem;
  font-size: 0.28rem;
  line-height: 0.3rem;
  margin-bottom: 0.10rem;
  overflow: hidden;
}
.anniu {
  height: 0.64rem;
  width: 6.24rem;
  margin-left: 0.35rem;
}
.anniu i {
  display: inline-block;
  width: 1.24rem;
  height: 0.6rem;
  line-height: 0.63rem;
  text-align: center;
  font-size: 0.24rem;
  color: #000;
  border-radius: 0.07rem;
  vertical-align: top;
  border: 1px #998bd6 solid;
  margin-right: 0.26rem;
}
.anniu .rm_mg {
  margin-right: 0;
}
.anniu .ac {
  background: #998bd6;
  color: #fff;
  position: relative;
}
.anniu .isbtnac {
  background: #ccc;
}
</style>


<template>
  <div class="box">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">进度详情</p>
    </div>
    <div class="maiList">
      <ul class="list ac" v-show="user_type=='01'">
        <li>
          <h3>客户基本信息</h3>
        </li>
        <li>
          <p><i class="malistlistme">医院名称：</i><em class="malistlistmeac">{{this.$store.state.letter.user.hospital_name}}</em></p>
        </li>
        <li>
          <p>级别：{{this.$store.state.letter.history.customer_level}}</p>
        </li>
        <li>
          <p><i class="malistlistme">地址：</i><em class="malistlistmeac" style="    width: 5.1rem;">{{this.$store.state.letter.history.address}}</em></p>
        </li>
        <li>
          <p>邮编：{{this.$store.state.letter.history.zip_code}}</p>
        </li>
        <li>
          <p>使用科室：{{this.$store.state.letter.user.department}}</p>
        </li>
        <li>
          <p>联系电话：{{this.$store.state.letter.user.phone}}</p>
        </li>
        <li>
          <p>联系人：{{this.$store.state.letter.user.name}}</p>
        </li>

        <!-- <li>
          <p>维修类别：保外</p>
        </li>-->
      </ul>

      <ul class="list ac" v-show="user_type=='02'">
        <li>
          <h3>渠道信息</h3>
        </li>
        <li>
          <p><i class="malistlistme">渠道名称：</i><em class="malistlistmeac">{{this.$store.state.letter.user.channel_name}}</em></p>
        </li>
        <li>
           <p><i class="malistlistme">地址：</i><em class="malistlistmeac" style="    width: 5.1rem;">{{this.$store.state.letter.history.address}}</em></p>
        </li>
        <li>
          <p>邮编：{{this.$store.state.letter.history.zip_code}}</p>
        </li>

        <li>
          <p>联系电话：{{this.$store.state.letter.user.phone}}</p>
        </li>
        <li>
          <p>联系人：{{this.$store.state.letter.user.contacts_name}}</p>
        </li>
      </ul>

      <ul class="list ac" v-show="user_type=='03'">
        <li>
          <h3>家庭基本信息</h3>
        </li>
        <li>
          <p>联系人姓名：{{this.$store.state.letter.user.name}}</p>
        </li>
        <li>
          <p>手机号：{{this.$store.state.letter.user.phone}}</p>
        </li>
        <li>
           <p><i class="malistlistme">地址：</i><em class="malistlistmeac" style="    width: 5.1rem;">{{this.$store.state.letter.history.address}}</em></p>
        </li>
        <li>
          <p>产品线：{{this.$store.state.letter.history.productLine}}</p>
        </li>
        <li>
          <p>产品型号：{{this.$store.state.letter.history.model}}</p>
        </li>
        <li>
          <p>购买日期：{{this.$store.state.letter.history.buy_date.substring(0,10)}}</p>
        </li>
      </ul>
      <ul class="list ac">
        <li>
          <h3>服务前产品信息</h3>
        </li>
        <li>
          <p>约定时间：{{list1.appointmentDate | timeslce(list1.appointmentDate)}}</p>
        </li>
        <li>
          <p>到位时间：{{list1.achieveDate == null?"待确定":list1.achieveDate ==""? "待确定":list1.achieveDate | timeslce(list1.achieveDate)}}</p>
        </li>
        <!-- <li>
          <p>故障信息</p>
        </li>-->
      </ul>
      <ul class="list">
        <li>
          <h3>产品故障信息</h3>
        </li>
        <li>
          <ul v-for="(listcont,index) in list" :key="index">
            <li>
              <p>工单号：{{list1.assignId}}</p>
            </li>
            <li>
              <p>产品线：{{listcont.productLine}}</p>
            </li>
            <li>
              <p>型&nbsp;&nbsp;&nbsp;号：{{listcont.model}}</p>
            </li>
            <li v-show="list1.applyType == 'WX'">
              <p>故障部件：{{listcont.product}}</p>
            </li>
            <li v-show="list1.applyType == 'WX'">
              <div class="listdiv">
                <h4>故障描述：</h4>
                <p>{{listcont.customerNo}}</p>
              </div>
            </li>

            <!-- <li>
              <p>产品状态：正常使用</p>
            </li>-->
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import baseUrl from "../../api/baseUrl.js";
import Cookie from "../../api/cookie.js";
import { Toast, MessageBox, Indicator } from "mint-ui";

var _this;
export default {
  name: "position",
  filters: {
    dicFilter: function(v, filter) {
      let i = filter.findIndex(item => {
        return v == item.value;
      });
      return i > -1 ? filter[i].lable : v;
    },
    timeslce(d, n) {
      if (d != "" && d != undefined && d != null) {
        return d.substr(0, 10);
      }
    }
  },
  data() {
    return {
      user_type: "",
      appointmentDate: "",
      maintenanceInfo: "",
      list: [],
      list1: [],
      productLine: [],
      CUSTOMER_LEVEL: []
    };
  },
  created() {
    _this = this;
    if (Cookie.getCookie("avatar") == "0") {
      this.user_type = "01";
    } else if (Cookie.getCookie("avatar") == "1") {
      this.user_type = "02";
    } else if (Cookie.getCookie("avatar") == "3") {
      this.user_type = "03";
    }
    if (this.$route.query.appointmentDate) {
      this.appointmentDate = this.$route.query.appointmentDate.substring(0, 10);
    }
    // var id = "groupId=" + this.$route.query.listid;
    var id = { groupId: this.$route.query.listid };

    //设备号  翻译
    this.$Axios
      .post(
        baseUrl + "/dicCode/queryDicByMoreType?type=PRODUCT_LINE,CUSTOMER_LEVEL"
      )
      .then(function(response) {
        //重复点击
        // _this.is_ajax = false;
        if (response.data.code == 200) {
          for (
            let custLevel = 0;
            custLevel <= response.data.data.length - 1;
            custLevel++
          ) {
            if (response.data.data[custLevel].type == "PRODUCT_LINE") {
              _this.productLine.push(response.data.data[custLevel]);
            }
            if (response.data.data[custLevel].type == "CUSTOMER_LEVEL") {
              if (
                response.data.data[custLevel].value == _this.$route.query.level
              ) {
                _this.$store.state.letter.history.customer_level =
                  response.data.data[custLevel].lable;
              }
            }
          }
          _this.producti(id);
        }
      })
      .catch(function(error) {
        // _this.is_ajax = false;
      });
  },
  methods: {
    //产品线类型
    producti(id) {
      _this.$Axios
        .post(baseUrl + "/applyJob/queryScheduleInfo", id)
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

          if (response.data.msg == "进度查询成功") {
            let addlist = response.data.data.applyJobInfo;
            for (
              var pronum1 = 0;
              pronum1 <= response.data.data.productInfo.length - 1;
              pronum1++
            ) {
              //产品线
              for (
                var pronum = 0;
                pronum <= _this.productLine.length - 1;
                pronum++
              ) {
                if (
                  response.data.data.productInfo[pronum1].productLine ==
                  _this.productLine[pronum].value
                ) {
                  response.data.data.productInfo[pronum1].productLine =
                    _this.productLine[pronum].lable;
                }
              }

              //故障描述
              for (let ids = 0; ids <= addlist.length - 1; ids++) {
                let datalsitwo = addlist[ids].deviceId.split(",");

                for (let idsd = 0; idsd <= datalsitwo.length - 1; idsd++) {
                  if (
                    datalsitwo[idsd].toLowerCase() ==
                    response.data.data.productInfo[
                      pronum1
                    ].deviceId.toLowerCase()
                  ) {
                    response.data.data.productInfo[pronum1].customerNo =
                      addlist[ids].faultDescribe;
                  }
                }
              }
            }
            _this.list = response.data.data.productInfo;
            _this.list1 = response.data.data.applyJobGroupInfo;
          }
        })
        .catch(function(error) {});
    },
    toback() {
      this.$router.replace({
        path: "/progress"
      });
    },
    toyiyuan() {
      this.$router.replace({
        path: "/custser"
      });
    }
  }
};
</script>
<style scoped>
.maiList {
  padding: 0.1rem 0.28rem;
  margin: 0.16rem 0.35rem 0.5rem;
  width: 6.24rem;
  background: #fff;
}
.maiList .ac {
  border-bottom: 0.01rem #e5e5e5 solid;
}
.maiList .list {
  padding: 0.1rem 0;
}
.maiList .list li h3 {
  width: 6.24rem;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.32rem;
  color: #000;
}
.maiList .list li {
  min-height: 0.35rem;
}

.maiList .list li p {
  width: 6.24rem;
  /* height: 0.55rem; */
  line-height: 0.55rem;
  font-size: 0.28rem;
  color: #919191;
}

.ulac {
  border-top: 1px solid #e5e5e5;
}
.listdiv {
  margin-bottom: 0.2rem;
}
.listdiv h4 {
  width: 1.4rem;
  font-size: 0.28rem;
  font-weight: 300;
  /* display: inline-block;
  
  vertical-align: top; */
  float: left;
}
.maiList .list li .listdiv p {
  width: 4.8rem;
  font-size: 0.28rem;
  font-weight: 300;
  /* display: inline-block;
  vertical-align: top; */
  word-wrap: break-word;
  line-height: 0.38rem;
  overflow: hidden;
}
.malistlistme{
  display: inline-block;
    vertical-align: top;
}

.malistlistmeac{
      font-style: normal;
    width: 4.7rem;
    display: inline-block;
    vertical-align: top;
}
</style>


<template>
  <div class="box">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">服务评价</p>
    </div>
    <div class="maiList">
      <div class="user">
        <h2>姓名</h2>
        <input type="text" placeholder="请输入姓名" v-model="employeesName">
      </div>
      <div class="user">
        <h2>员工编号</h2>
        <input type="text" placeholder="请输入员工编号" v-model="employeesNumber">
      </div>
      <div class="xinglist">
        <p>响应速度</p>
        <ul>
          <li
            v-for="(itme_ac , index) in 5"
            :key="index"
            :class="star_maintain.indexOf(index) > -1 ? 'ac':''"
            @click="forlist01(index)"
          ></li>
        </ul>
      </div>
      <div class="xinglist">
        <p>维修结果</p>
        <ul>
          <li
            v-for="(itme_ac , index) in 5"
            :key="index"
            :class="star_expressage.indexOf(index) > -1 ? 'ac':''"
            @click="forlist02(index)"
          ></li>
        </ul>
      </div>
      <div class="xinglist">
        <p>服务态度</p>
        <ul>
          <li
            v-for="(itme_ac , index) in 5"
            :key="index"
            :class="star_serve.indexOf(index) > -1 ? 'ac':''"
            @click="forlist03(index)"
          ></li>
        </ul>
      </div>
      <div class="details">
        <p>评价内容</p>
        <textarea placeholder="请输入评价内容" maxlength="150" v-model="textcont"></textarea>
      </div>
      <div class="evaluate">
        <ul>
          <li @click="evaluate(0)" :class="{ac:evaluate_bool=='evaluate00'}">
            <i class="icon01"></i>好评
          </li>
          <li @click="evaluate(1)" :class="{ac:evaluate_bool=='evaluate01'}">
            <i class="icon02"></i>中评
          </li>
          <li @click="evaluate(2)" :class="{ac:evaluate_bool=='evaluate02'}">
            <i class="icon03"></i>差评
          </li>
        </ul>
      </div>
      <div class="sendbtn btn_an" @click="tosend">提交</div>
      <div class="hezi"></div>
    </div>
  </div>
</template>

<script>
import baseUrl from "../../api/baseUrl.js";
import Cookie from "../../api/cookie.js";
import { Toast, MessageBox } from "mint-ui";

var _this;
export default {
  name: "position",
  data() {
    return {
      employeesName: "", //员工名称
      employeesNumber: "", //编号
      textcont: "", //评价
      evaluateType: "", //综合评价等级

      evaluate_bool: "",
      star_maintain: [], //响应速度
      star_expressage: [], //维修结果
      star_serve: [], //服务态度
      groupId: this.$route.query.groupId
      // staffId: this.$route.query.listid
    };
  },
  created() {
    _this = this;
  },
  methods: {
    toback() {
      this.$router.go(-1);
    },
    evaluate(n) {
      if (n == "0") {
        this.evaluate_bool = "evaluate00";
        this.evaluateType = "0";
      } else if (n == "1") {
        this.evaluate_bool = "evaluate01";
        this.evaluateType = "1";
      } else if (n == "2") {
        this.evaluate_bool = "evaluate02";
        this.evaluateType = "2";
      }
    },
    //维修速度
    forlist01(index) {
      this.star_maintain = [];
      for (var i = 0; i <= index; i++) {
        this.star_maintain.push(i);
      }
    },
    //快递速度
    forlist02(index) {
      this.star_expressage = [];
      for (var i = 0; i <= index; i++) {
        this.star_expressage.push(i);
      }
    },
    //服务态度
    forlist03(index) {
      this.star_serve = [];
      for (var i = 0; i <= index; i++) {
        this.star_serve.push(i);
      }
    },
    //提交数据
    tosend() {
      // var detaile =
      //   "groupId=" +
      //   this.groupId +
      //   "&staffId=" +
      //   this.employeesNumber +
      //   "&name=" +
      //   this.employeesName +
      //   "&repairSpeed=" +
      //   this.star_maintain.length +
      //   "&repairResult=" +
      //   this.star_expressage.length +
      //   "&serviceAttitude=" +
      //   this.star_serve.length +
      //   "&evaluate=" +
      //   this.textcont +
      //   "&evaluateType=" +
      //   this.evaluateType;
      var detaile = {
        userId: this.$store.state.letter.user.user_id,
        groupId: this.groupId,
        staffId: this.employeesNumber,
        name: this.employeesName,
        repairSpeed: this.star_maintain.length,
        repairResult: this.star_expressage.length,
        serviceAttitude: this.star_serve.length,
        evaluate: this.textcont,
        evaluateType: this.evaluateType
      };

      // return;
      this.$Axios
        .post(baseUrl + "/serviceEvaluate/addServiceEvaluate", detaile)
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

          // _this.is_ajax = false;
          if (response.data.code == 200) {
            
            _this.$router.push({
              path: "/progress"
            });
          }
        })
        .catch(function(error) {
          // _this.is_ajax = false;
        });
    }
  }
};
</script>
<style scoped>
.hezi {
  height: 1rem;
  width: 100%;
}

.maiList {
  padding: 0.1rem 0;
  margin: 0.16rem 0.35rem 0;
  width: 6.8rem;
}
.maiList .user h2 {
  width: 6.8rem;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.32rem;
  font-weight: 500;
}
.maiList .user input {
  width: 6.56rem;
  height: 0.95rem;
  line-height: 0.95rem;
  font-size: 0.28rem;
  color: #919191;
  padding-left: 0.28rem;
  border: 0.01rem #919191 solid;
  margin-top: 0.15rem;
}
.xinglist {
  width: 6.56rem;
  height: 0.43rem;
  margin-top: 0.43rem;
}
.details {
  width: 6.56rem;
  margin-top: 0.43rem;
}

.details textarea {
  margin-top: 0.26rem;
  width: 6.2rem;
  height: 2.5rem;
  background: #fff;
  font-size: 0.25rem;
  line-height: 0.34rem;
  padding: 0.2rem 0.3rem;
  color: #919191;
}

/* 服务评价 */

.evaluate {
  margin-top: 0.5rem;
  margin-left: 0.2rem;
}

.evaluate ul li {
  display: inline-block;
  vertical-align: top;
  padding-left: 0.9rem;
  width: 1.3rem;
  font-size: 0.26rem;
  height: 0.6rem;
  line-height: 0.6rem;
  position: relative;
}
.evaluate ul li i {
  display: block;
  width: 0.36rem;
  height: 0.41rem;
  position: absolute;
  top: 0.1rem;
  left: 0.3rem;
}
.evaluate ul li .icon01 {
  background: url("../../assets/evaluate.icon02.png") no-repeat;
  background-size: 100% 100%;
}
.evaluate ul li .icon02 {
  background: url("../../assets/evaluate.icon04.png") no-repeat;
  background-size: 100% 100%;
}
.evaluate ul li .icon03 {
  background: url("../../assets/evaluate.icon04.png") no-repeat;
  background-size: 100% 100%;
}

.evaluate ul .ac .icon01 {
  background: url("../../assets/evaluate.icon01.png") no-repeat;
  background-size: 100% 100%;
}

.evaluate ul .ac .icon02 {
  background: url("../../assets/evaluate.icon03.png") no-repeat;
  background-size: 100% 100%;
}
.evaluate ul .ac .icon03 {
  background: url("../../assets/evaluate.icon03.png") no-repeat;
  background-size: 100% 100%;
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
  background: url("../../assets/icon_xing.png") no-repeat;
  background-size: 100% 100%;
  margin-left: 0.15rem;
}
.xinglist ul .ac {
  background: url("../../assets/icon_xing_ac.png") no-repeat;
  background-size: 100% 100%;
}

.btn_an {
  margin-left: 0;
  margin-top: 0.5rem;
}
</style>


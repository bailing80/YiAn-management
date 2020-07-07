<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area" v-for="(item, index) in cities" :key="index" :ref="index">
        <div class="titleh3">{{index}}</div>
        <div
          class="item-list"
          v-for="(innerItem,innerItemIdex) in item"
          :key="innerItemIdex"
          @click="handleCityClick(innerItem)"
        >
          <div class="itemlist" :class="{ac:innerItemIdex%2==0}">{{innerItem.customerName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import Cookie from "../../../api/cookie.js";
import Bscroll from "better-scroll";
import { mapState, mapMutations } from "vuex";

import baseUrl from "../../../api/baseUrl.js"; //请求ip地址
var _this;
export default {
  name: "CityList",
  props: {
    hot: Array,
    cities: Object,
    letter: String,
    regionlist: Array,
    typeid: ""
  },
  data() {
    return {
      context: "",
      regionShow: true,
      istitle: ""
    };
  },
  created() {
    _this = this;
    if (Cookie.getCookie("avatar") == 0) {
      this.istitle = "01";
    } else if (Cookie.getCookie("avatar") == 1) {
      this.istitle = "02";
    } else if (Cookie.getCookie("avatar") == 2) {
      this.istitle = "03";
    }
  },
  computed: {
    ...mapState({
      currentCity: "city"
    })
  },
  watch: {
    //监听输入框是否为空  为空显示热门城市   不为空清除热门城市
    context() {
      if (this.context != "") {
        this.regionShow = false;
      } else {
        this.regionShow = true;
      }
    },
    // 监听 Alphabet 中传过来的letter，如有变化，则滚动区域自动滚动到对应元素上
    letter() {
      if (this.letter) {
        const element = this.$refs[this.letter][0]; // 获取对应字母的ref
        this.scroll.scrollToElement(element); // 利用better-scroll插件 滚动到指定元素element
      }
    }
  },

  methods: {
    ...mapMutations(["changeCity"]),
    handleCityClick(city) {
      if (Cookie.getCookie("avatar") == "0") {
        //医院提报工单  医院信息
        if (Cookie.getCookie("Isregistered") == 0) {
          this.$store.commit("sethistoryName", city);
          this.$router.push({
            path: "/userdetails"
          });
        } else if (Cookie.getCookie("Isregistered") == 1) {
          this.$store.commit("sethistoryName", city);
          this.$router.push({
            path: "/userupdate"
          });
        }
      } else if (Cookie.getCookie("avatar") == "1") {
        //渠道提报工单  医院信息
        if (Cookie.getCookie("Isregistered") == 2) {
          this.$store.commit("setchannelName", city);
          this.$router.push({
            path: "/registerlogin"
          });
        } else if (Cookie.getCookie("Isregistered") == 3) {
           
          this.$store.commit("setchannelName", city);
          this.$router.push({
            path: "/registerupdate"
          });
          //提报工单 数据
        } else if (Cookie.getCookie("Isregistered") == 4) {
          this.$store.commit("repairorderName", city);
          this.$router.push({
            path: "/repairorder"
          });
        }
      } else if (Cookie.getCookie("avatar") == "2") {
        //员工提报工单  医院信息
        this.$store.commit("repairorderName", city);
        this.$router.push({
          path: "/repairorder"
        });
      } else if (Cookie.getCookie("avatar") == "3") {
        //员工提报工单  医院信息
        this.$store.commit("repairorderName", city);
        this.$router.push({
          path: "/repairorder"
        });
      }
    },
    //切换城市
    city() {
      this.$router.push({
        path: "/city"
      });
    },
    //搜索客户
    search() {
      var userType = 0;
      if (Cookie.getCookie("avatar") == 0) {
        this.title = "选择医院";
        userType = "0";
      } else if (Cookie.getCookie("avatar") == 1) {
        this.title = "选择渠道";
        userType = "1";
      } else if (Cookie.getCookie("avatar") == 2) {
        this.title = "选择客户";
        userType = "0";
      }

      if (this.context == "") {
        Toast({
          message: "搜索名称不能为空",
          duration: 1000
        });
        return;
      }
      //医院查询
      this.$Axios
        .post(baseUrl + "/customerAdmin/queryCustomerList", {
          userType: userType,
          customerName: this.context
        })
        .then(function(response) {
          //重复点击
          if (response.data.code == 200) {
            _this.cities = response.data.data;
          }
        })
        .catch(function(error) {
          // _this.is_ajax = false;
        
        });
    },
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.wrapper, {
      click: true
    });
  }
};
</script>

<style scoped>
.list {
  position: absolute;
  top: 5.4rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.titleh3 {
  width: 7.16rem;
  height: 0.97rem;
  background: #fff;
  font-size: 0.28rem;
  color: #000;
  line-height: 0.97rem;
  padding-left: 0.34rem;
  font-weight: 500;
}
.button-list {
  overflow: hidden;
  padding: 10px 30px 10px 10px;
}
.button-wrapper {
  float: left;
  width: 33.33%;
}
.button {
  margin: 4px;
  padding: 4px 0;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  color: #555;
}
.itemlist {
  width: 7.16rem;
  height: 0.97rem;
  background: #fff;
  font-size: 0.28rem;
  color: #000;
  line-height: 0.97rem;
  padding-left: 0.34rem;
}

.main {
  padding-top: 0.02rem;
  margin: 0 0.34rem 0.25rem;
}
.grabble {
  width: 100%;
  margin: 0.16rem 0;
  height: 0.96rem;
}
.grabble input {
  width: 4.45rem;
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
  background: url("../../../assets/b_fadajing.png") no-repeat;
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
.region .regionlist li {
  width: 1.23rem;
  height: 0.62rem;
  line-height: 0.62rem;
  text-align: center;
  margin: 0.14rem;
  float: left;
  background: #dcdcdc;
  font-size: 0.25rem;
}

.ac {
  background: #f2f3f7;
}
</style>

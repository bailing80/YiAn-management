<template>
  <div class="box">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">故障类型</p>
    </div>
    <div class="mainList">
      <ul class="select">
        <li
          @click="toWriteHospital(num)"
          class="rb"
          :class="{ac:index%2==0}"
          v-for="(num,index) in list"
          :key="index"
        >
          <i>{{num.lable}}</i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import baseUrl from "../../api/baseUrl.js";
import { Toast } from "mint-ui";
export default {
  name: "repair",
  data() {
    return {
      list: []
    };
  },
  created() {
    var _this = this;
    this.$Axios
      .post(baseUrl + "/dicCode/queryDicByType", { type: "FAULT_TYPE" })
      .then(function(response) {
        if (response.data.code == 200) {
          _this.list = response.data.data;
        }
      })
      .catch(function(error) {});
  },
  methods: {
    //返回上一页
    toback() {
      
      this.$router.push({
        path:'/prorepair'
      });
    },
    toWriteHospital(context) {
      // this.$store.commit("FaultType", context);
      let storage = window.localStorage;
      let data = JSON.parse(storage.getItem("ClassList"));
      let id = storage.getItem("FaultTypeIndex");
      this.$store.state.ClassList = data;
      this.$store.state.ClassList[id].type = context.lable;
      this.$store.state.ClassList[id].type_id = context.value;
      storage.setItem("ClassList", JSON.stringify(data));
      storage.removeItem("FaultTypeIndex");
      this.$router.replace({
        path: "/prorepair"
      });
    }
  }
};
</script>
<style scoped>
.select li {
  position: relative;
  background: #f2f3f7;
}
.select li i {
  display: block;
  width: 7.15rem;
  height: 1.16rem;
  font-size: 0.28rem;
  line-height: 1.16rem;
  font-style: normal;
  margin-left: 0.35rem;
  text-align: left;
  border-bottom: 0.01rem #c5c5c5 solid;
  color: #323232;
}
.mainList p {
  height: 0.48rem;
  line-height: 0.48rem;
  font-size: 0.28rem;
  color: #919191;
  margin-left: 0.34rem;
}

.select .rb i {
  border-bottom: none;
}
.select .ac {
  background: #fff;
}
</style>


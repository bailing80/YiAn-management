<template>
  <div class="box">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">客户信息</p>
    </div>
    <ul class="list">
      <!-- <li
        :class="{ac:index%2==0}"
        v-for="(itme,index) in user_list"
        @click="tostaffdetail(itme.id)"
        :key="index"
      >
        <p class="wg">{{itme.customerName}}</p>
        <p>{{itme.province}}</p>
        <p>{{itme.contacts}}</p>
      </li>-->

      <li @click="tostaffdetail1('客户信息')">
        <p class="wg">基本信息</p>
        <i></i>
      </li>
      <li @click="tostaffdetail1('产品信息')">
        <p class="wg">机器信息</p>
        <i></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},

  methods: {
    toback() {
      this.$router.go(-1);
    },
    tostaffdetail1(n) {
      let id = this.$route.query.id;
      if (n == "客户信息") {
        this.$router.push({
          path: "/staffdetail",
          query: { id: id }
        });
      } else if (n == "产品信息") {
        this.$router.push({
          path: "/productline",
          query: { id: id }
        });
      }
    }
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
  font-size: 0.3rem;
  position: absolute;
  top: 0.3rem;
  right: 0;
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

.slots_list .main {
  width: 7.5rem;
  height: 4rem;
  margin: 0;
}
.slots_list .main p {
  height: 0.8rem;
  font-size: 0.32rem;
  text-align: left;
  line-height: 0.8rem;
  width: 6.6rem;
  margin: 0 0.25rem 0.5rem;
  border: 1px solid #ccc;
  padding: 0 0.2rem;
}
.slots_list .main h2 {
  position: relative;
}
.slots_list .main h2 .tankuangqx {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.32rem;
  height: 1rem;
  line-height: 1rem;
  color: aqua;
}
.slots_list .main h2 .tankuangqx1 {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 0.32rem;
  height: 1rem;
  line-height: 1rem;
  color: aqua;
}

.main {
  margin: 0 0.34rem;
}
.grabble {
  width: 100%;
  margin: 0.16rem 0;
  height: 0.96rem;
}
.grabble input {
  width: 4.55rem;
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
  background: url("../../assets/b_fadajing.png") no-repeat;
  background-size: 100% 100%;
}

.grabble span {
  color: #592d8d;
  font-size: 0.26rem;
  line-height: 0.96rem;
  width: 0.59rem;
  height: 0.58rem;
  float: left;
  margin: 0.23rem 0 0 0.46rem;
  background: url("../../assets/staff_icon05.png") no-repeat;
  background-size: 100% 100%;
}

.grabble .ac {
  background: url("../../assets/icon_plus_ac.png") no-repeat;
  background-size: 100% 100%;
}

.anniu {
  width: 6.8rem;
  margin: 0.4rem 0;
  height: 0.63rem;
}

.anniu i {
  display: inline-block;
  width: 1.5rem;
  height: 0.63rem;
  font-size: 0.28rem;
  line-height: 0.63rem;
  text-align: center;
  vertical-align: top;
  margin-left: 0.7rem;
}
.anniu .ac {
  background: #dcdcdc;
}

.list li {
  font-size: 0.28rem;
  height: 0.97rem;
  width: 7.5rem;
  line-height: 0.97rem;
  background: #fff;
  border-bottom: 1px solid #ccc;
}
.list li h3 {
  display: inline-block;
  vertical-align: top;
  width: 2rem;
  font-weight: 500;
}
.list li p {
  width: 1.38rem;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  margin-left: 0.5rem;
}
.list .wg {
  width: 2.7rem;
}
.list .ac {
  background: #f2f3f7;
}
</style>


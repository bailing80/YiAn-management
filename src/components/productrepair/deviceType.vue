<template>
  <div>
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">产品报修</p>
    </div>
    <div class="mainList">
      <p>C</p>
      <ul class="select">
        <li @click="toWriteHospital('MC3400小型泵站')" class="rb">
          <i>MC3400小型泵站</i>
        </li>
      </ul>
      <p>D</p>
      <ul class="select">
        <li @click="toWriteHospital('Hummer医用空气压缩机')" class="rb">
          <i>Hummer医用空气压缩机</i>
        </li>
      </ul>
      <p>M</p>
      <ul class="select">
        <li @click="toWriteHospital('MC340医用空压机')" class="rb">
          <i>MC340医用空压机</i>
        </li>
      </ul>
      <p>N</p>
      <ul class="select">
        <li @click="toWriteHospital('MC340B空气压缩机')">
          <i>MC340B空气压缩机</i>
        </li>
        <li @click="toWriteHospital('MC340A医用空压机')" class="rb">
          <i>MC340A医用空压机</i>
        </li>
      </ul>
      <p>S</p>
      <ul class="select">
        <li @click="toWriteHospital('OEM空压机')">
          <i>OEM空压机</i>
        </li>
        <li @click="toWriteHospital('MC340A医用空压机（国标）')" class="rb">
          <i>MC340A医用空压机（国标）</i>
        </li>
      </ul>
      <p>C</p>
      <ul class="select">
        <li @click="toWriteHospital('MC340A医用空压机（美标）')" class="rb">
          <i>MC340A医用空压机（美标）</i>
        </li>
      </ul>
      <p>D</p>
      <ul class="select">
        <li @click="toWriteHospital('MC340B医用空气压缩机')" class="rb">
          <i>MC340B医用空气压缩机</i>
        </li>
      </ul>
      <p>M</p>
      <ul class="select">
        <li @click="toWriteHospital('OL2570/50整体反射无影灯')" class="rb">
          <i>OL2570/50整体反射无影灯</i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "repair",
  data() {
    return {
      list: []
    };
  },
 
  methods: {
    //返回上一页
    toback() {
      this.$router.go(-1);
    },

    toWriteHospital(context) {
      this.$store.commit("DeviceType", context);
      this.$router.push({
        path: "/prorepair"
      });
    }
  }
};
</script>
<style scoped>
.mainList .select {
  background: #fff;
}
.mainList .select li {
  position: relative;
}
.mainList .select li i {
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

.mainList .select .rb i {
  border-bottom: none;
}
</style>


<template>
  <div class="bg">
    <div class="main">
      <!-- <ul>
                 <li class="qudao" @click="denglu(0)">客户登录</li>
                 <li class="yiyuan" @click="denglu(1)">渠道登录</li>
                 <li class="yuangong" @click="denglu(2)">员工登录</li>
                 <li class="shouhou" @click="tocommitment">售后服务</li>
      </ul>-->
      <ul>
        <li class="qudao" @click="denglu(0)">医院客户</li>
        <li class="yiyuan" @click="denglu(3)">家庭客户</li>
        <li class="yuangong1" @click="denglu(1)">渠道商</li>
        <li class="yuangong" @click="denglu(2)">员工</li>
        <li class="shouhou" @click="tocommitment">售后服务</li>
      </ul>
      <div class="bg_img"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "wechatserve",
  data() {
    return {
      m_text: "请选择设备机型",
      fault: "请选择故障类型",
      desc: "请输入故障描述"
    };
  },
  methods: {
    denglu(n) {
      if (n == "0") {
        this.$router.push({
          path: "/islogin",
          query: { id: 0 }
        });
      } else if (n == "1") {
        this.$router.push({
          path: "/islogin",
          query: { id: 1 }
        });
      } else if (n == "2") {
        this.$router.push({
          path: "/islogin",
          query: { id: 2 }
        });
      }else if (n == "3") {
        this.$router.push({
          path: "/islogin",
          query: { id: 3 }
        });
      }
    },
    tostaffPassage() {
      this.$router.push({
        path: "/staffPassage"
      });
    },
    tocommitment() {
      this.$router.push({
        path: "/commitment"
      });
    }
  }
};
</script>
<style scoped>
.bg {
  width: 7.5rem;
  height: 14.67rem;
  background: url("../assets/custs/bg.jpg") no-repeat;
  background-size: 100% 100%;
}
.bg .main {
  width: 5.45rem;
  height: 7.66rem;
  position: relative;
  float: right;
  margin-top: 0.2rem;
}
.bg .main .bg_img {
  position: absolute;
  top: 0;
  right: 0;
  width: 2.62rem;
  height: 7.66rem;
  background: url("../assets/custs/bg.png") no-repeat;
  background-size: 100% 100%;
  pointer-events: none;
}
.bg .main ul li {
  color: #592d8d;
  font-size: 0.33rem;
  height: 0.97rem;
  width: 2.43rem;
  line-height: 0.97rem;
  padding-left: 0.72rem;
  font-weight: 530;
}
.bg .main .qudao {
  position: absolute;
  top: 0.74rem;
  right: 1.18rem;
  background: url("../assets/custs/btn_bg01.png") no-repeat;
  background-size: 100% 100%;
}
.bg .main .yiyuan {
  position: absolute;
  top: 1.97rem;
  right: 2.16rem;

  background: url("../assets/custs/btn_bg02.png") no-repeat;
  background-size: 100% 100%;
}
.bg .main .yuangong {
  position: absolute;
  top: 4.47rem;
  right:2.18rem;
  width: 2.43rem;
  height: 1.32rem;
  line-height: 1.12rem;
  background: url("../assets/custs/action.png") no-repeat;
  background-size: 102% 100%;
  color: #fff;
}
.bg .main .yuangong1 {
  position: absolute;
  top: 3.22rem;
  right:2.44rem;
  background: url("../assets/custs/btn_bg02.png") no-repeat;
  background-size: 102% 100%;
}

.bg .main .shouhou {
  position: absolute;
  top: 5.9rem;
  right: 1.29rem;
  background: url("../assets/custs/btn_bg04.png") no-repeat;
  background-size: 100% 100%;
}
</style>
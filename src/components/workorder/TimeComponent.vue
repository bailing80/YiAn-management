
<template>
  <div class="model" v-show="boosl">
    <div class="bg_yanse"></div>
    <div class="slots_list" :class="{demo_transform3:!boosl,demo_transform4:boosl}">
      <h2>选择时间</h2>
      <mt-datetime-picker
        v-show="boosl"
        v-model="datitme2"
        type="date"
        ref="picker1"
        cancelText="取消"
        confirmText="确定"
        year-format="{value}"
        month-format="{value}"
        date-format="{value}"
        @cancel="quxiao"
        @confirm="handleConfirm1"
      ></mt-datetime-picker>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bool: true,
      datitme2:"",
    };
  },
  props: {
    boosl: Boolean,
    datitme1: String
  },
  watch:{
    datitme1(){
      return this.datitme2 = this.datitme1 ;
    },
  },
  methods: {
    quxiao() {
      this.datitme2 = this.datitme1
      this.$emit("cancelTime", { name: "取消" });
      document.body.style.overflow = "inherit";
    },
    //设置时间前面的   零
    p(s) {
      return s < 10 ? "0" + s : s;
    },
    //确定选择时间
    handleConfirm1(value) {
      let d = new Date(value);
      let resDate =
        d.getFullYear() +
        "-" +
        this.p(d.getMonth() + 1) +
        "-" +
        this.p(d.getDate()); //年月日
      this.$emit("cancelTime", { name: "确定", time: resDate });
      document.body.style.overflow = "inherit";
    }
  }
};
</script>

<style scoped>
/* 弹框 */
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
/* 弹框 */
</style>

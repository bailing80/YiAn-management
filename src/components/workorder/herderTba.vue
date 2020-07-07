<template>
  <ol class="btnTab btnTabAc4" >
    <li
      @click="showBTN(Btnshow.name,BtnIndex)"
      :class="{ac:BtnIndex==showBtn}"
      v-for="(Btnshow,BtnIndex) in listBtn"
      :key="BtnIndex"
      v-show="BtnIndex > 3 == false"
    >
      {{Btnshow.name}}
      <i></i>
    </li>
  </ol>
</template>
<script>
export default {
  name: "headerTba",
  data() {
    return {
      showBtn: 0,

    };
  },
  props: {
    listBtn: Array
  },
  methods: {
    showBTN(Btnshow,n) {
      this.showBtn = n;
      this.$emit("tabAc", {id:n,name:Btnshow});
    }
  }
};
</script>
 <style scoped>
.btnTab {
  height: 0.82rem;
  width: 7.5rem;
  background: #fff;
}
.btnTab li {
  line-height: 0.8rem;
  width: 3.75rem;
  background: #fff;
  display: inline-block;
  vertical-align: top;
  font-size: 0.3rem;
  color: #000;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.btnTab li i {
  display: none;
  position: absolute;
  bottom: 0;
  left: 1.12rem;
  width: 1.55rem;
  height: 1px;
  background: #6b4499;
}
.btnTab .ac {
  color: #6b4499;
}
.btnTab .ac i {
  display: block;
}
.btnTabAc1 {
  display: none;
}

.btnTabAc2 li {
  width: 3.6rem;
}
.btnTabAc2 .ac i {
  left: 1.22rem;
  display: block;
  width: 1.2rem;
}

.btnTabAc3 li {
  width: 2.4rem;
}
.btnTabAc3 .ac i {
  left: 0.82rem;
  display: block;
  width: 0.7rem;
}

.btnTabAc4 li {
  width: 1.8rem;
}
.btnTabAc4 .ac i {
  left: 0.52rem;
  display: block;
  width: 0.7rem;
}
</style>



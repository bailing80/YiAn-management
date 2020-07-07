<template>
  <div style="position: absolute;
    top: -1000px;
    left: 0;">
    <!-- <img
      crossorigin="anonymous"
      :src="userimgtus"
      alt
      style="width: 100px;height: 100px;"
      id="boximg"
    /> -->

    <img
      crossorigin="anonymous"
      alt
      style="width: 100px;height: 100px;"
      id="boximg"
    />
    <canvas id="canvasimg" style="width: 300px;height:300px"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    // userimgtus: ""
  },
  mounted() {
    this.onbaseImg();
  },
  methods: {
    onbaseImg: function() {
      var canvas = document.getElementById("canvasimg"); //获取canvas
      var imgpath = document.getElementById("boximg"); //获取canvas
      let ctx = canvas.getContext("2d"); //对应的CanvasRenderingContext2D对象(画笔)
      let base64 = "";
      imgpath.onload = ()=> {
        //图片加载完，再draw 和 toDataURL
        ctx.drawImage(imgpath, 0, 0,imgpath.offsetWidth,imgpath.offsetHeight);
        base64 = canvas.toDataURL("image/png");
        this.$emit("onbaseImg", { img: base64 });
      };
    }
  }
};
</script>

<style>
</style>

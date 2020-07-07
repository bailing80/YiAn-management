<template>

  <div id="signatureBox" @touchmove.prevent >
    <canvas id="canvas" width="350" height="770">Canvas画板</canvas>
    <p class="miaosu">请签字</p>
    <i class="mt-b" @click="clear">×</i>
    <i class="mt-a" @click="save">√</i>
    <!-- <i class="sendbtn" @click="fanhui">返回</i> -->
    <!-- <div style=" width: 100%;height: 150px;float: left;background: #fff;"></div> -->
  </div>
  

</template>

<script>
var draw;
var preHandler = function(e) {
  e.preventDefault();
};
class Draw {
  constructor(el) {
    this.el = el;
    this.canvas = document.getElementById(this.el);
    this.cxt = this.canvas.getContext("2d");
    this.stage_info = canvas.getBoundingClientRect();
  }
  init(btn) {
    var that = this;
    this.canvas.addEventListener("touchstart", function(event) {
      document.addEventListener("touchstart", preHandler, false);
      that.drawBegin(event);
    });
    this.canvas.addEventListener("touchend", function(event) {
      document.addEventListener("touchend", preHandler, false);
      that.drawEnd();
    });
    this.clear(btn);
  }
  //点击触发
  drawBegin(e) {
    var that = this;
    this.cxt.strokeStyle = "#000";
    this.cxt.beginPath();
    this.cxt.moveTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    canvas.addEventListener("touchmove", function() {
      that.drawing(event);
    });
  }
  ///滑动
  drawing(e) {
    this.cxt.lineTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    this.cxt.stroke();
  }
  drawEnd() {
    document.removeEventListener("touchstart", preHandler, false);
    document.removeEventListener("touchend", preHandler, false);
    document.removeEventListener("touchmove", preHandler, false);
  }
  clear() {
    this.cxt.clearRect(0, 0, 350, 770);
  }
  save() {
    return canvas.toDataURL("image/png");
  }
}
export default {
  data() {
    return {
      url: ""
    };
  },
  mounted() {
    draw = new Draw("canvas");
    draw.init();
  },
  created() {},
  methods: {
    //返回上一页
    // toback() {
    //   this.$router.go(-1);
    // },

    clear: function() {
      draw.clear();
    },
    save: function() {
      this.$emit("signatureFn", { sta: 1, img: draw.save() });
    },
    fanhui() {
      this.$emit("signatureFn", { sta: 0, img: "" });
    }
  }
};
</script>
<style >
#signatureBox .sendbtn {
  height: 0.64rem;
  line-height: 0.64rem;
  font-size: 0.23rem;
  /* transform: rotate(90deg); */
}
#signatureBox .mt {
  margin: 0.5rem 0 0.5rem 0.35rem;
}
</style>
<style scoped>
* {
  touch-action: pan-y;
}
#signatureBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 7.5rem;
  height:770px;
  z-index: 9999;
  background: #f2f3f7;
}
#canvas {
  display: block;
  margin: 0 auto;
  background: #fff;
  cursor: default;
  width: 7.5rem;
  height:100%;
}
#keyword-box {
  margin: 10px 0;
}
.miaosu {
  position: absolute;
  top: 40%;
  left: 2.1rem;
  transform: rotate(90deg);
  color: #ccc;
  opacity: 0.25;
  pointer-events: none;
}
.mt {
  margin: 0.8rem 0 1rem 0.35rem;
  width: 3.2rem;
  display: inline-block;
  vertical-align: top;
}
.mt-a{
  font-size: 40px;
  transform: rotate(90deg);
  font-family:宋体;
   /* margin: 0rem 0rem 1rem 0rem;  */
   position: absolute;
   margin-left:8%;
   top:3%;
   display: inline-block; 
   vertical-align: top; 
}
.mt-b{
 font-size: 38px;
  position: absolute;
  margin-left:85%;
  top:3%;
  font-family:宋体;
  transform: rotate(90deg);
  display: inline-block;
  /* vertical-align: top; */
}
</style>
<template>
  <div class="container">
    <div style="text-align:center;">
      <img id="img" src style="    width: 7.5rem;" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: "",
      edg: 0,
      url: "",
      num: 0
    };
  },
  props: {
    base64img: ""
  },
  watch: {
    base64img() {
      this.img = this.base64img;
      this.rotateImg(-90);
    }
  },
  methods: {
    rotateImg(d) {
      this.edg = this.edg + d;
      this.rotateBase64Img(this.base64img, this.edg, this.callback);
    },
    rotateBase64Img(src, edg, callback) {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      var imgW; //图片宽度
      var imgH; //图片高度
      var size; //canvas初始大小
      if (edg % 90 != 0) {
        console.error("旋转角度必须是90的倍数!");
        throw "旋转角度必须是90的倍数!";
      }

      edg < 0 && (edg = (edg % 360) + 360);
      // const quadrant = (edg / 90) % 4; //旋转象限
      const cutCoor = { sx: 0, sy: 0, ex: 0, ey: 0 }; //裁剪坐标
      
      edg = 270;
      let quadrant = 3;

      var image = new Image();
      image.crossOrigin = "anonymous";
      image.src = src;
      image.onload = function() {
        imgW = image.width;
        imgH = image.height;
        size = imgW > imgH ? imgW : imgH;
        canvas.width = size * 2;
        canvas.height = size * 2;
        switch (quadrant) {
          case 0:
            cutCoor.sx = size;
            cutCoor.sy = size;
            cutCoor.ex = size + imgW;
            cutCoor.ey = size + imgH;
            break;
          case 1:
            cutCoor.sx = size - imgH;
            cutCoor.sy = size;
            cutCoor.ex = size;
            cutCoor.ey = size + imgW;
            break;
          case 2:
            cutCoor.sx = size - imgW;
            cutCoor.sy = size - imgH;
            cutCoor.ex = size;
            cutCoor.ey = size;
            break;
          case 3:
            cutCoor.sx = size;
            cutCoor.sy = size - imgW;
            cutCoor.ex = size + imgH;
            cutCoor.ey = size + imgW;
            break;
        }
        ctx.translate(size, size);
        ctx.rotate((edg * Math.PI) / 180);
        ctx.drawImage(image, 0, 0);
        var imgData = ctx.getImageData(
          cutCoor.sx,
          cutCoor.sy,
          cutCoor.ex,
          cutCoor.ey
        );

        if (quadrant % 2 == 0) {
          canvas.width = imgW;
          canvas.height = imgH;
        } else {
          canvas.width = imgH;
          canvas.height = imgW;
        }
        ctx.putImageData(imgData, 0, 0);
        callback(canvas.toDataURL());
      };
    },
    callback(base64data) {
      document.getElementById("img").src = base64data;
      // this.num++;
      // if (this.num == 2) {
      this.$emit("signatureFn11", { sta: 1, base64data: base64data });
      // } else if (this.num == 4) {
      //   this.num = 0;
      // }
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
  height: 100%;
  z-index: 9999;
  background: #f2f3f7;
}
#canvas {
  display: block;
  margin: 0 auto;
  background: #fff;
  cursor: default;
  width: 7.5rem;
  /* transform: rotate(-90deg); */
}
#keyword-box {
  margin: 10px 0;
}
.miaosu {
  position: absolute;
  top: 3.7rem;
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
</style>
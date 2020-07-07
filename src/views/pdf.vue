<template>
  <div>
      1
    <div class="itemblock itemblock1">
      <el-form-item v-if="formInline.iAgree">
        <el-button type="primary" @click="onSubmit">下载无犯罪记录证明</el-button>
      </el-form-item>
    </div>
    <div id="imgPdf"></div>
    <canvas style="display: none;" id="the-canvas"></canvas>
  </div>
</template>


<script>


export default {

  data() {
    return {
      formInline: {
        chinese_name: "",
        origin: "",
        result: "",
        stated: "",
        applyNo: "",
        iAgree: false
      },
      batchInforRequestVO: {
        currentPage: 1,
        appkey: "",
        batchnum: ""
      },
      PDFData: ""
    };
  },

  method:{
    onSubmit() {
      const loading = this.$loading({
        lock: true,
        text: "正在查询数据...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      if (this.PDFData) {
        this.showPdf(this.converData(this.PDFData), this.saveFile);
        loading.close();
      } else {
        this.$axios
          .get(this.$global.wfzjl + "Criminalrecord/getPDFfile", {
            path: "/data/share/" + this.formInline.applyNo,
            flg: ""
          })
          .then(res => {
            this.PDFData = res.wfzjlpdf;
            this.showPdf(this.converData(res.wfzjlpdf), this.saveFile);
          })
          .catch(err => {
            this.$alert("服务器繁忙，请稍后重试", {
              confirmButtonText: "确定",
              showClose: false
            });
          })
          .finally(() => {
            loading.close();
          });
      }
    },
    showPdf(url, callback) {
      PDFJS.getDocument(url)
        .then(function getPdfHelloWorld(pdf) {
          // 获取第一页数据
          pdf.getPage(1).then(function getPageHelloWorld(page) {
            let scale = 1.5;
            let viewport = page.getViewport(scale);
            // Prepare canvas using PDF page dimensions
            let canvas = document.getElementById("the-canvas");
            let context = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            // Render PDF page into canvas context
            let renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            page.render(renderContext);
            if (callback && typeof callback === "function") {
              // 等待图片生成后下载数据
              setTimeout(function() {
                callback();
              }, 1000);
            }
          });
        })
        .catch(err => {
        });
    },
    /*将请求来的base64编码的pdf文件，替换多余的空格和换行（为了兼容其他浏览器）
     * 再使用浏览器自带的atob()的方式解析
     * */
    // 转化编码格式
    converData(data) {
      data = data.replace(/[\n\r]/g, "");
      // let raw = !window.atob ? new Base64().decode(data) : window.atob(data);
      var raw = new Base64().decode(data);
      let rawLength = raw.length;
      let array = new Uint8Array(new ArrayBuffer(rawLength));
      for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
    }
  }
};
</script>

<style>
</style>

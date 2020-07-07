<template>
  <swiper :options="swiperOption" class="daxiongmao">
    <swiper-slide>
      <div class="swiper-zoom-container">
        <img :src="imgrul" alt class="tpimg" />
        <!-- <pdf class="mosmoosl" v-for="i in numPages" :key="i" :page="i" :src="pdfImg"></pdf> -->
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import pdf from "vue-pdf";
import BASEImg from "../../api/BASEImg.js";
export default {
  data() {
    return {
      BASEImg: BASEImg,
      swiperOption: {
        zoom: true,
        autoHeight: "auto",
        pagination: {
          el: ".swiper-pagination"
        }
      },
      pdfImg: "",
      numPages: [],
      imgrul:""
    };
  },
  components: {
    pdf
  },
  props: {
    pdfimglist: String
  },
  watch: {
    pdfimglist() {
      var random = Math.ceil(Math.random() * 100000);
      let uurl = this.pdfimglist.slice(5,this.pdfimglist.indexOf("."));
      if(uurl != ''){
         this.imgrul = this.BASEImg+"/images/" + uurl + ".jpg"+'?'+random;
      }else{
        this.imgrul = '';
      }
      // this.pdfImg = this.pdfimglist;
      // pdf.createLoadingTask(this.pdfImg).then(pdf => {
      //   this.numPages = pdf.numPages;
      // });
    }
  }
};
</script>
<style scoped>
.daxiongmao {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 7.5rem;
  height: 100%;
  /* height: calc(100% - 2rem); */
}

.tpimg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* opacity: 0; */
}

.mosmoosl {
  max-width: 100%;
  max-height: 100%;
}
</style>

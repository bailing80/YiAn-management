<template>
  <div class="box">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">产品详细信息</p>
    </div>
    <div class="main">
      <div class="radio" v-show="this.$route.query.videoUrl != ''">
        <div class="mengban"></div>
        <video
          id="myVideo"
          class="video-js"
          controls
          preload="none"
          data-setup="{}"
          style="height: 4.22rem;width: 100%;object-fit: fill;"
          playsinline
          webkit-playsinline="true"
          x5-playsinline
          x-webkit-airplay="allow"
        >
          <source src id="srcImg" type="video/mp4">
        </video>
      </div>

      <!-- <div class="ditales">
        <p>产品图片</p>
        <mt-swipe :auto="0">
          <mt-swipe-item v-for="(picImg,Imgindex) in list.picUrls" :key="Imgindex">
            <img :src="picImg.name" alt>
          </mt-swipe-item>
        </mt-swipe>
      </div> -->
      <ul>
        <li>
          <p>产品线</p>
          <span>{{list.productLine}}</span>
          <i></i>
        </li>
        <li>
          <p>型号</p>
          <span>{{list.model}}</span>
          <i></i>
        </li>
        <li>
          <p>安装日期</p>
          <span>{{list.installDate   | timeslce(list.installDate)}}</span>
          <i></i>
        </li>
        <li>
          <p>产品名称</p>
          <span>{{list.product}}</span>
          <i></i>
        </li>
        <!-- <li>
          <p>设备号</p>
          <span>SL520YZZV039</span>
          <i></i>
        </li>-->
        <li>
          <p>安装人</p>
          <span>{{list.installer}}</span>
          <i></i>
        </li>

        <li>
          <p>保修开始日期</p>
          <span>{{list.guaranteeBeginDate | timeslce(list.guaranteeBeginDate)}}</span>
          <i></i>
        </li>
        <li>
          <p>保修结束日期</p>
          <span>{{list.guaranteeEndDate | timeslce(list.guaranteeEndDate)}}</span>
          <i></i>
        </li>
        <li>
          <p>创建时间</p>
          <span>{{list.createDate | timeslce(list.createDate)}}</span>
          <i></i>
        </li>

        <li>
          <p>产品备注:</p>
          <i></i>
        </li>
        <li>
          <p
            style="height:auto;word-wrap:break-word;    line-height: 0.5rem;width: 6.8rem;color: #888;"
          >{{list.productNotes}}</p>
          <i></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Cookie from "../../api/cookie.js";
import { Toast, MessageBox } from "mint-ui";

import baseUrl from "../../api/baseUrl.js";
import BASEimg from "../../api/BASEImg.js";
var _this;
export default {
  name: "position",
   filters: {
    dicFilter: function(v, filter) {
      let i = filter.findIndex(item => {
        return v == item.value;
      });
      return i > -1 ? filter[i].lable : v;
    },
    timeslce(d, n) {
      if (d != "" && d != undefined && d != null) {
        return d.substr(0, 10);
      }
    }
  },
  data() {
    return {
      prodetailImg: require("../../assets/tu_img01.png"),
      productLine: [],
      playImg: require("../../assets/playImg.jpg"),
      list: []
    };
  },
  created() {
    var detaliId = this.$route.query.detaliId;
    _this = this;

    //设备号  翻译
    this.$Axios
      .post(baseUrl + "/dicCode/queryDicByType", { type: "PRODUCT_LINE" })
      .then(function(response) {
        //重复点击
        if (response.data == "loginTimeout") {
          _this
            .$confirm("登录超时，请重新登录", "提示", {
              confirmButtonText: "确定",
              showCancelButton: false,
              type: "warning"
            })
            .then(() => {
              Cookie.clearCookie();
              _this.$router.replace({
                path: "/"
              });
            });

          return;
        }
        // _this.is_ajax = false;
        if (response.data.code == 200) {
          _this.productLine = response.data.data;
          _this.prodetail(detaliId);
        }
      })
      .catch(function(error) {
        // _this.is_ajax = false;
      });
  },
  mounted() {
    if (this.$route.query.videoUrl != "") {
      document.getElementById("srcImg").src = baseUrl + this.$route.query.videoUrl;
    }
  },
  methods: {
    prodetail(detaliId) {
      var listImg = [];
      var imgarray = [];
      _this.$Axios
        .post(baseUrl + "/productArchives/queryArchivesDetailNew", {
          id: detaliId
        })
        .then(function(response) {
          //重复点击

          if (response.data == "loginTimeout") {
            _this
              .$confirm("登录超时，请重新登录", "提示", {
                confirmButtonText: "确定",
                showCancelButton: false,
                type: "warning"
              })
              .then(() => {
                Cookie.clearCookie();
                _this.$router.replace({
                  path: "/"
                });
              });

            return;
          }
          // _this.is_ajax = false;
          if (response.data.code == 200) {
            imgarray = response.data.data.picUrls.split(",");

            for (var tuImg = 0; tuImg <= imgarray.length - 1; tuImg++) {
              listImg.push({ name: BASEimg + imgarray[tuImg] });
              response.data.data.picUrls = listImg;
            }

            for (
              var pronum = 0;
              pronum <= _this.productLine.length - 1;
              pronum++
            ) {
              if (
                response.data.data.productLine ==
                _this.productLine[pronum].value
              ) {
                response.data.data.productLine =
                  _this.productLine[pronum].lable;
                _this.list = response.data.data;
              }
            }

            _this.list = response.data.data;
          }
        })
        .catch(function(error) {
          // _this.is_ajax = false;
        });
    },

    toback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.video-js .vjs-play-control:focus {
  outline: none;
}

.mint-swipe-indicator.is-active {
  background: #998bd6;
}
.ditales p {
  font-size: 0.28rem;
  height: 0.28rem;
  line-height: 0.28rem;
  padding: 0.4rem 0.2rem;
}
.mint-swipe {
  height: 3.5rem;
}
.mint-swipe img {
  width: 100%;
  height: 100%;
}
</style>
<style scoped>
.radio {
  width: 7.5rem;
  height: 4rem;
  position: relative;
}
.radio img {
  width: 7.5rem;
  height: 4rem;
}
.radio .btn {
  position: absolute;
  top: 1.2rem;
  left: 2.9rem;
  width: 1.4rem;
  height: 1.4rem;
  background: url("../../assets/play.png") no-repeat;
  background-size: 100% 100%;
}

.main {
  background: #fff;
}
.main h3 {
  width: 7.26rem;
  height: 1.02rem;
  line-height: 1.02rem;
  padding-left: 0.24rem;
  background: #eeeaf3;
  font-size: 0.28rem;
  position: relative;
}
.main h3 i {
  display: block;
  width: 0.15rem;
  height: 0.27rem;
  line-height: 1.02rem;
  background: url("../../assets/icon_you.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 0.4rem;
  right: 0.25rem;
}
.main ul {
  overflow: hidden;
  transform: all 0.3;
}

.main li {
  width: 7.02rem;
  line-height: 0.89rem;
  background: #fff;
  position: relative;
  margin-bottom: 0.02em;
  margin: 0 0.24rem;
  border-bottom: 0.01rem #f2f2f2 solid;
  transform: all 0.3;
}
.main li span {
  height: 0.89rem;
  line-height: 0.89rem;
  width: 5.3rem;
  color: #666666;
  font-size: 0.28rem;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 1.5rem;
  background: border-box;
  text-align: right;
}

.main li input {
  height: 0.89rem;
  line-height: 0.89rem;
  width: 5.3rem;
  color: #666666;
  font-size: 0.28rem;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 1.5rem;
  background: border-box;
  text-align: right;
}
.main li span {
  height: 0.89rem;
  line-height: 0.89rem;
  width: 5.3rem;
  color: #323232;
  font-size: 0.28rem;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 1.5rem;
  background: border-box;
  text-align: right;
}
.main li p {
  height: 0.89rem;
  color: #323232;
  font-size: 0.28rem;
}
.main li i {
  display: none;
  position: absolute;
  top: 0.3rem;
  right: 0rem;
  color: #acacac;
  font-style: normal;
  width: 0.17rem;
  height: 0.28rem;
  background: url("../../assets/arrow_r.png") no-repeat;
  background-size: 100% 100%;
}

.main li textarea {
  line-height: 0.34rem;
  height: 1.6rem;
  width: 6.8rem;
  color: #666666;
  font-size: 0.28rem;
}

.main li .ac {
  display: block;
}
.main .rm_ac {
  border-bottom: none;
  line-height: 0.59rem;
}
.main .rm_ac01 {
  border-bottom: none;
  line-height: 0.79rem;
}
.main li .mr {
  width: 6.8rem;
  padding: 0.2rem 0;
  height: 0.97rem;
  line-height: 0.42rem;
  border: none;
}

.main li .hg {
  height: 0.54rem;
  line-height: 0.54rem;
  display: inline-block;
  vertical-align: top;
  width: 6rem;
  margin-left: 0.25rem;
}

.main li u {
  display: inline-block;
  width: 0.39rem;
  height: 0.39rem;
  background: url("../../assets/phone.png") no-repeat;
  background-size: 100% 100%;
  vertical-align: top;
  margin-top: 0.08rem;
}

.main .rm_ac01 u {
  background: url("../../assets/diqiu.png") no-repeat;
  background-size: 100% 100%;
}

.mt {
  margin: 0.8rem 0 1rem 0.35rem;
  width: 3.2rem;
  display: inline-block;
  vertical-align: top;
}

.main .hg_ac {
  height: auto;
}

.fujian {
  height: 2rem;
  margin: 0 0.25rem;
}
.fujian p {
  height: 0.28rem;
  line-height: 0.28rem;
  font-size: 0.28rem;
}
.fujian a {
  display: block;
  color: #000;
  font-size: 0.34rem;
  line-height: 0.34rem;
  height: 0.34rem;
  margin-top: 0.25rem;
}
</style>


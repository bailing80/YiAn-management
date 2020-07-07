

<template>
  <div>
    <div>
      <el-upload
        :multiple="multiple"
        action="http://192.168.133.163/upload/image"
        list-type="picture-card"
        :auto-upload="false"
        :http-request="uploadFile"
        ref="upload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-button @click="subPicForm">提交上传</el-button>
    </div>
  </div>
</template>

<script>
import baseUrl from "../../api/baseUrl.js";
import { Toast } from "mint-ui";
import axios from "axios";
export default {
  name: "flii",
  data() {
    return {
      multiple: true,
      formDate: ""
    };
  },
  created() {
   
  },
  methods: {
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    },
    uploadFile(file) {
      this.formDate.append("file", file.file);
    },
    subPicForm() {
      this.formDate = new FormData();

      this.$refs.upload.submit();

      this.formDate.append("WS_CODE", "12133");

      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      // return;
      axios
        .post(baseUrl + "/upload/image", this.formDate, config)
        .then(res => {
        })
        .catch(res => {
        });
    }
  }
};
</script>
<style scoped>
.xinglist {
  width: 6.56rem;
  height: 0.43rem;
  margin-top: 0.43rem;
}
.details {
  width: 6.56rem;
  margin-top: 0.43rem;
}

.details textarea {
  margin-top: 0.26rem;
  width: 6.2rem;
  height: 2.5rem;
  background: #fff;
  font-size: 0.25rem;
  line-height: 0.34rem;
  padding: 0.2rem 0.3rem;
  color: #919191;
}

.xinglist p,
.details p {
  float: left;
  font-size: 0.34rem;
  color: #000;
}
.xinglist ul {
  float: left;
  margin-left: 0.2rem;
}
.xinglist ul li {
  float: left;
  width: 0.46rem;
  height: 0.43rem;
  background: url("../../assets/icon_xing.png") no-repeat;
  background-size: 100% 100%;
  margin-left: 0.15rem;
}
.xinglist ul .ac {
  background: url("../../assets/icon_xing_ac.png") no-repeat;
  background-size: 100% 100%;
}
</style>

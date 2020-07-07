<template>
  <div>
    <div class="header" style="position: fixed;;top:0;left:0;z-index:100">
      <i class="icon" @click="toback"></i>
      <p class="title">维修在线指引</p>
    </div>
    <ul class="main">
      <li
        class="clear"
        :class="{ac:itme.userName == '谊安售后'}"
        v-for="(itme,index) in userlist"
        :key="index"
      >
        <i></i>
        <img :src="src1" alt>
        <span>{{itme.userName}}</span>
        <p>{{itme.content}}</p>
      </li>
    </ul>
    <div class="btn_tijiao">
      <input type="text" placeholder="我想问..." v-model="user_text">
      <!-- <i></i> -->
       <em class="fasongbent" @click="fasong">
        <span class="fasong">发送</span>
      </em>
    </div>
  </div>
</template>

<script>
import baseUrl from "../api/baseUrl.js";
import Cookie from "../api/cookie.js";
var _this;
export default {
  name: "maintain",
  data() {
    return {
      src1: require("../assets/yh.png"),
      user_text: "",
      userlist: []
    };
  },

  created() {
    _this = this;

    this.Ajx();

    //实时会话
    var socket;
    if (typeof WebSocket == "undefined") {
    } else {
      //实现化WebSocket对象，指定要连接的服务器地址与端口 建立连接
      //等同于socket = new WebSocket("ws://localhost:8083/checkcentersys/websocket/20");
      socket = new WebSocket(
        baseUrl.replace("http", "ws") +
          "/websocket/" +
          _this.$store.state.letter.user.user_id
      );

      //打开事件
      socket.onopen = function() {
        //socket.send("这是来自客户端的消息" + location.href + new Date());
      };
      //获得消息事件
      socket.onmessage = function(msg) {
        if (msg.data == "消息已发送") {
          _this.Ajx();
        }

        //发现消息进入 开始处理前端触发逻辑
      };
      //关闭事件
      socket.onclose = function() {};
      //发生了错误事件
      socket.onerror = function() {
        // alert("Socket发生了错误");
        //此时可以尝试刷新页面
      };
      //离开页面时，关闭socket
      //jquery1.8中已经被废弃，3.0中已经移除
      // $(window).unload(function(){
      // socket.close();
      //});
    }
  },
  mounted() {
    this.scrollToBottom();
  },
  updated: function() {
    this.scrollToBottom();
  },
  methods: {
    Ajx() {
      var datelist = {
        customerId: this.$store.state.letter.user.user_id,
        customerName: this.$store.state.letter.user.name,
        phone: this.$store.state.letter.user.phone,
        serviceId: 80,
        serviceTel: "谊安售后",
        productId: this.$route.query.nid,
        consultingType: 1 //配件购买 0     维修指导 1
      };

      // return;
      this.$Axios
        .post(baseUrl + "/customerService/queryContentList", datelist)
        .then(function(response) {
          // return;
          if (response.data.code == 200) {
            _this.userlist = response.data.data.data;
          }
        })
        .catch(function(error) {});
    },

    toback() {
      this.$router.go(-1);
    },
    fasong() {
      if (this.user_text == "") return;
      var datalist = {
        userId: this.$store.state.letter.user.user_id,
        userName: this.$store.state.letter.user.name,
        phone: this.$store.state.letter.user.phone,
        userType: 1,
        groupId: this.$route.query.tianjiaid,
        content: this.user_text
      };
      // return ;
      this.$Axios
        .post(baseUrl + "/customerService/replyContent", datalist)
        .then(function(response) {
          if (response.data.code == 200) {
            _this.$Axios
              .post(baseUrl + "/checkcenter/socket/push/80")
              .then(function(response) {})
              .catch(function(error) {});
            _this.userlist.push({
              userName: "yonghu",
              touxiang: require("../assets/yh.png"),
              content: _this.user_text
            });
            _this.user_text = "";
          }
        })
        .catch(function(error) {});
    },

    scrollToBottom() {
      this.$nextTick(() => {
        var main = document.getElementsByClassName("main")[0];
        main.scrollTop = main.scrollHeight;
      });
    }
  }
};
</script>
<style scoped>
.main {
  position: absolute;
  padding-bottom: 1.12rem;
  padding-top: 1.1rem;
  height: calc(
    100% - 2.3rem
  ); /**x是你上面的标题高底下标题的高   需要设置高  才能好使*/
  overflow-y: scroll;
}
.main li {
  width: 7rem;
  height: auto;
  margin: 0.25rem 0.24rem 0.48rem 0.24rem;
}
.main li i {
  display: none;
  float: left;
  width: 0.8rem;
  height: 0.8rem;
  background: url("../assets/kf.png") no-repeat;
  background-size: 100% 100%;
}
.main li img {
  margin-top: 0.12rem;
  float: right;
  width: 0.8rem;
  height: 0.8rem;
  background: url("../assets/kf.png") no-repeat;
  background-size: 100% 100%;
}
.main li span {
  display: none;

  float: left;
  width: 5.4rem;
  height: 0.24rem;
  font-size: 0.24rem;
  line-height: 0.26rem;
  margin-left: 0.12rem;
}

.main li p {
  float: right;
  max-width: 4.6rem;
  font-size: 0.24rem;
  line-height: 0.4rem;
  padding: 0.12rem 0.25rem;
  background: #beb5e2;
  border-radius: 0.07rem;
  margin: 0.12rem 0.12rem 0 0.12rem;
  word-wrap: break-word;
}

.main .ac p {
  float: left;
  background: #fff;
}
.main .ac span,
.main .ac i {
  display: block;
}
.main .ac img {
  display: none;
}

.btn_tijiao {
  height: 1.12rem;
  width: 7.5rem;
  background: #eae8e8;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
}
.btn_tijiao input {
  width: 4.55rem;
  height: 0.6rem;
  background: #fff;
  border-radius: 0.25rem;
  padding-left: 0.3rem;
  margin: 0.26rem 0 0 0.24rem;
  font-size: 0.24rem;
  color: #aca9a9;
  line-height: 0.6rem;
  padding-right: 0.9rem;
}

.btn_tijiao i {
  position: absolute;
  top: 0.34rem;
  right: 1.7rem;
  display: block;
  width: 0.46rem;
  height: 0.46rem;
  background: url("../assets/biaoqing.png") no-repeat;
  background-size: 100% 100%;
}
.btn_tijiao .fasong {
  display: block;
  width: 1rem;
  height: 0.7rem;
  background: #beb5e2;
  border-radius: 0.2rem;
  margin: 0.25rem;
  font-style: initial;
}

.fasongbent {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 1.5rem;
  height: 1.1rem;
  font-size: 0.28rem;
  line-height: 0.7rem;
  text-align: center;
  color: #fff;
}
</style>


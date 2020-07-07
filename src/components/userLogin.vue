<template>
  <div class="box userlogin">
    <div class="header">
      <i class="icon" @click="toback"></i>
      <p class="title">{{title}}</p>
    </div>
    <div v-if="user_type" style="margin:10px 20px">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="phone">
          <h2>手机号</h2>
          <el-input
            type="text"
            onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');"
            placeholder="请输入手机号"
            maxlength="11"
            v-model="ruleForm.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="tuxing_yzm">
          <h2>图形验证码</h2>
          <el-input
            v-model="ruleForm.tuxing_yzm"
            autocomplete="off"
            placeholder="请输入图形验证码"
            style="width:200px"
            maxlength="4"
          ></el-input>
          <ImgVerify @imgCode="imgCode" ref="imgVerify" style="float: right;" />
        </el-form-item>
        <el-form-item prop="duanxin_yzm">
          <h2>短信验证码</h2>
          <el-input
            v-model="ruleForm.duanxin_yzm"
            placeholder="请输入短信验证码"
            autocomplete="off"
            maxlength="6"
            style="width:200px"
          ></el-input>
          <i class="ac" v-show="!show_yzm" style="float: right;">{{text_yzm}}</i>
          <i class="ac" v-show="show_yzm" style="float: right;" @click="getCode('ruleForm')">获取验证码</i>
        </el-form-item>

        <el-form-item>
          <div
            class="sendbtn dw"
            :class="{sendbtnac:sendbtnshow}"
            @click="submitForm('ruleForm')"
          >登录</div>
        </el-form-item>
      </el-form>
    </div>

    <div v-else style="margin:10px 20px">
      <el-form :model="ruleForm1" :rules="rules4" ref="ruleForm1" class="demo-ruleForm">
        <el-form-item prop="employees_name">
          <h2>员工用户名</h2>
          <el-input
            type="text"
            placeholder="请输入用户名"
            maxlength="50"
            v-model="ruleForm1.employees_name"
          ></el-input>
        </el-form-item>
        <el-form-item prop="employees_pass">
          <h2>密码</h2>
          <el-input
            type="password"
            placeholder="请输入密码"
            maxlength="50"
            v-model="ruleForm1.employees_pass"
          ></el-input>
        </el-form-item>
        <!-- <el-Checkbox v-model="autoLogin" >记住密码</el-Checkbox>  -->
        <el-form-item>
          <div class="sendbtn dw" @click="submitForm1('ruleForm1',ruleForm1.employees_name,ruleForm1.employees_pass)">登录</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Cooike from "../api/cookie.js";
import Cookies from 'js-cookie'
import ImgVerify from "./imgVerify"; //验证码
import { Toast } from "mint-ui";
import baseUrl from "../api/baseUrl.js";

var _this;
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    var checkPhone1 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入图形验证码"));
      }
      if (value.toLowerCase() != this.code.toLowerCase()) {
        return callback(new Error("请核对图形验证码"));
      } else {
        callback();
      }
    };

    return {
      autoLogin:"",
      ruleForm: {
        phone: "",
        tuxing_yzm: "",
        duanxin_yzm: ""
      },
      rules: {
        phone: [
          {
            required: true,
            validator: checkPhone,
            trigger: "blur"
          }
        ],
        tuxing_yzm: [
          {
            required: true,
            validator: checkPhone1,
            trigger: "blur"
          }
        ]
      },
      rules1: {
        phone: [
          {
            required: true,
            validator: checkPhone,
            trigger: "blur"
          }
        ],
        tuxing_yzm: [
          {
            required: true,
            validator: checkPhone1,
            trigger: "blur"
          }
        ],
        duanxin_yzm: [
          {
            required: true,
            message: "请输入短信验证码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 6,
            message: "长度在 6 个字符",
            trigger: "blur"
          }
        ]
      },
      rules2: {
        phone: [
          {
            required: true,
            validator: checkPhone,
            trigger: "blur"
          }
        ],
        tuxing_yzm: [
          {
            required: true,
            validator: checkPhone1,
            trigger: "blur"
          }
        ]
      },
      ruleForm1: {
        employees_name: "",
        employees_pass: ""
      },
      rules4: {
        employees_name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        employees_pass: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },

      sendbtnshow: true, //显示提交按钮
      title: "客户登录",
      user_type: true,
      phone: "",
      code: "",
      tuxing_yzm: "",
      duanxin_yzm: "",
      AjaxYzm: "", //后台给的code
      user: {
        name: "xiongmao",
        password: "18381994300"
      },
      show_yzm: true,
      text_yzm: "输入验证码",
      timer: null,
      is_ajax: false,
      //员工
      employees_name: "",
      employees_pass: "",
      bailing:""
    };
  },
  watch: {
    ruleForm: {
      handler(n, o) {
        if (n.duanxin_yzm.length == 6) {
          this.sendbtnshow = false;
        } else {
          this.sendbtnshow = true;
        }
      },
      deep: true
    }
  },

  //图像二维码
  components: {
    ImgVerify
  },

  created() {
    this.getCookie();
    console.log()
    
    _this = this;

    //判断短信验证码是否过期
    this.iscode();

    Cooike.clearCookie();
    if (this.$route.query.id == "0") {
      // localStorage.avatar = "0";
      Cooike.setCookie("avatar", "0");
      this.title = "客户登录";
      this.user_type = true;
    } else if (this.$route.query.id == "1") {
      Cooike.setCookie("avatar", "1");
      this.title = "渠道登录";
      this.user_type = true;
    } else if (this.$route.query.id == "2") {
      Cooike.setCookie("avatar", "2");
      this.title = "员工登录";
      this.user_type = false;
    } else if (this.$route.query.id == "3") {
      Cooike.setCookie("avatar", "3");
      this.title = "家庭用户登录";
      this.user_type = true;
    }
    _this.$store.state.letter.user.power = "";
    _this.$store.state.letter.user.user_id = "";
    _this.$store.state.letter.user.phone = "";
    _this.$store.state.letter.user.hospital_name = "";
    _this.$store.state.letter.user.channel_level = "";
    _this.$store.state.letter.user.channelLevel_id = "";
    _this.$store.state.letter.user.department = "";
    _this.$store.state.letter.user.department_id = "";
    _this.$store.state.letter.user.position = "";
    _this.$store.state.letter.user.position_id = "";
    _this.$store.state.letter.user.name = "";
    _this.$store.state.letter.user.sex = "";
    _this.$store.state.letter.user.channel_name = "";
    _this.$store.state.letter.user.is_signing = "";
    _this.$store.state.letter.user.contacts_name = "";
    _this.$store.state.letter.user.userType = "";
    _this.$store.state.letter.user.time = "";
    _this.$store.state.letter.user.personaladdress = "";

    _this.$store.state.letter.history.customer_code = "";
    _this.$store.state.letter.history.city = "";
    _this.$store.state.letter.history.province = "";
    _this.$store.state.letter.history.customer_level = "";
    _this.$store.state.letter.history.customer_service_level = "";
    _this.$store.state.letter.history.address = "";
    _this.$store.state.letter.history.use_department = "";
    _this.$store.state.letter.history.customer_type = "";
    _this.$store.state.letter.history.country = "";
    _this.$store.state.letter.history.is_register = "";
    _this.$store.state.letter.history.productLine = "";
    _this.$store.state.letter.history.productLine_id = "";
    _this.$store.state.letter.history.model = "";
    _this.$store.state.letter.history.model_id = "";
    _this.$store.state.letter.history.buy_date = "";
  },
  // //页面加载调用获取cookie值

  methods: {
   
    submitForm(formName) {
      if (_this.is_ajax == false) {
        _this.$refs[formName].validate(valid => {
          if (valid) {
            let storage = window.localStorage;
            let currentTime = new Date().getTime(); //当前时间 戳
            if (storage.getItem("CodeTime") != null) {
              let CodeTm = JSON.parse(storage.getItem("CodeTime")); //设置时间
              if (currentTime > CodeTm.time) {
                Toast({
                  message: "验证码已过期重新获取",
                  duration: 1000
                });
                storage.removeItem("CodeTime");
                _this.AjaxYzm = "";
                return;
              } else {
                _this.AjaxYzm = CodeTm.code;

                if (_this.AjaxYzm == "") {
                  Toast({
                    message: "请核对输入的短信验证码",
                    duration: 500
                  });
                  return;
                } else if (_this.ruleForm.duanxin_yzm != _this.AjaxYzm) {
                  Toast({
                    message: "请核对输入的短信验证码",
                    duration: 500
                  });
                  return;
                } else {
                  //医院渠道登录
                  _this.is_ajax = true;
                  if (Cooike.getCookie("avatar") == 0) {
                    _this.isUser("0");
                  } else if (Cooike.getCookie("avatar") == 1) {
                    _this.isUser("1");
                  } else if (Cooike.getCookie("avatar") == 3) {
                    _this.isUser("3");
                  }
                }
              }
            } else if (_this.AjaxYzm == "") {
              Toast({
                message: "请核对输入的短信验证码",
                duration: 500
              });
              return;
            } else if (_this.ruleForm.duanxin_yzm != _this.AjaxYzm) {
              Toast({
                message: "请核对输入的短信验证码",
                duration: 500
              });
              return;
            } else {
              //医院渠道登录
              _this.is_ajax = true;
              if (Cooike.getCookie("avatar") == 0) {
                _this.isUser("0");
              } else if (Cooike.getCookie("avatar") == 1) {
                _this.isUser("1");
              } else if (Cooike.getCookie("avatar") == 3) {
                _this.isUser("3");
              }
            }
          } else {
            _this.is_ajax = false;
            return false;
          }
        });
      } else {
        Toast({
          message: "登录中，请稍后",
          duration: 500
        });
      }
    },

    //员工登录
    submitForm1(formName,username,password) {
 
     if (this.autoLogin) {    //如果选中了记住密码的选项
    this.setCookie(username,password, 7);  //则去设置cookie,username是要提交的用户名，password是密码，7是要存储的天数
} 
else {
    this.clearCookie()  //如果没有选中记住密码，那就清除cookie
}
      if (this.is_ajax == false) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            //员工登录
            this.is_ajax = true;
            this.employeesLoding();
          } else {
            this.is_ajax = false;
            return false;
          }
        });
      }
    },

 setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间

      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数

      //字符串拼接cookie

      document.cookie =

        "userName" + "=" +c_name+ ";path=/;expires=" + exdate.toGMTString();   
         //expires是设置cookie的过期时间，toGMTString是将日期转为GMT的字符串进行拼接

        document.cookie =
        "password" + "=" + c_pwd+ ";path=/;expires=" + exdate.toGMTString();
      console.log(document.cookie)
      
    },

    //读取cookie  将用户名和密码回显到input框中喽~~

    getCookie: function() {
    
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "+";"); //这里显示的格式需要切割一下自己可输出看下

        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值

          if (arr2[1] == "userName") {

            this.ruleForm1.employees_name = arr2[1]; //保存到保存数据的地方 （data中）

          } else if (arr2[2] == "password") {

            this.ruleForm1.employees_pass = arr2[2];

          }

        }

      }

    },

    //清除cookie

    clearCookie: function() {

      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了

    },

    toback() {
      this.$router.push({
        path: "/"
      });
    },
    tosend() {
      if (this.is_ajax == false) {
        //员工
        if (Cooike.getCookie("avatar") == 2) {
          //医院渠道登录
        } else if (
          Cooike.getCookie("avatar") == 1 ||
          Cooike.getCookie("avatar") == 0 ||
          Cooike.getCookie("avatar") == 3
        ) {
          let storage = window.localStorage;
          let currentTime = new Date().getTime(); //当前时间 戳

          if (storage.getItem("CodeTime") != null) {
            let CodeTm = JSON.parse(storage.getItem("CodeTime")); //设置时间
            if (currentTime > CodeTm.time) {
              Toast({
                message: "验证码已过期重新获取",
                duration: 1000
              });
              storage.removeItem("CodeTime");
              this.AjaxYzm = "";
              return;
            } else {
              this.AjaxYzm = CodeTm.code;
              if (this.AjaxYzm == "") {
                Toast({
                  message: "请核对输入的短信验证码",
                  duration: 500
                });
                return;
              } else if (this.ruleForm.duanxin_yzm != this.AjaxYzm) {
                Toast({
                  message: "请核对输入的短信验证码",
                  duration: 500
                });
                return;
              } else {
                //医院渠道登录
                this.is_ajax = true;
                if (Cooike.getCookie("avatar") == 0) {
                  this.isUser("0");
                } else if (Cooike.getCookie("avatar") == 1) {
                  this.isUser("1");
                } else if (Cooike.getCookie("avatar") == 3) {
                  this.isUser("3");
                }
              }
            }
          } else if (this.AjaxYzm == "") {
            Toast({
              message: "请核对输入的短信验证码",
              duration: 500
            });
            return;
          } else if (this.duanxin_yzm != this.AjaxYzm) {
            Toast({
              message: "请核对输入的短信验证码",
              duration: 500
            });
            return;
          } else {
            //医院渠道登录
            this.is_ajax = true;
            if (Cooike.getCookie("avatar") == 0) {
              this.isUser("0");
            } else if (Cooike.getCookie("avatar") == 1) {
              this.isUser("1");
            } else if (Cooike.getCookie("avatar") == 3) {
              this.isUser("3");
            }
          }
        }
        //---------------------------
      } else {
        Toast({
          message: "登录中，请稍后",
          duration: 500
        });
      }
    },

    //判断用户是否存在
    isUser(n) {
      //医院
      if (n == "") {
        n = 0;
      }
      //家庭
      if (n == 3) {
        n = 0;
      }

      var hospitalType = "";
      if (Cooike.getCookie("avatar") == 0) {
        hospitalType = "0";
      } else if (Cooike.getCookie("avatar") == 1) {
        hospitalType = "";
      } else if (Cooike.getCookie("avatar") == 3) {
        hospitalType = "1";
      }

      let data = {
        phone: this.ruleForm.phone,
        userType: n, //医院  =   0     渠道  ==  1
        hospitalType: hospitalType // 医院   == 0     家庭 == 1
      };

      this.$Axios
        .post(baseUrl + "/admin/isExist", data)
        .then(function(response) {
          //重复点击
          _this.is_ajax = false;
          if (response.data.msg == "用户已存在") {
            if (Cooike.getCookie("avatar") == 0) {
              _this.HospitalChannel("0");
              _this.$store.commit("setuserType", 0);
              _this.$store.commit("setCookie", response.data.data.data);
            } else if (Cooike.getCookie("avatar") == 1) {
              _this.HospitalChannel("1");
              _this.$store.commit("setCookie", response.data.data.data);
            } else if (Cooike.getCookie("avatar") == 3) {
              _this.HospitalChannel("0");
              _this.$store.commit("setuserType", 1);
              _this.$store.commit("setCookie", response.data.data.data);
            } else {
              Toast({
                message: "账号不存在，或者属于其它用户类型",
                duration: 1000
              });
              return;
            }
          } else if (response.data.msg == "可以注册") {
            Toast({
              message: "可以注册，请填写信息",
              duration: 1000
            });
            if (Cooike.getCookie("avatar") == 0) {
              _this.$store.commit("setPhone", _this.ruleForm.phone);
              _this.$store.commit("setuserType", 0);
              _this.$router.push({
                path: "/userdetails"
              });
            } else if (Cooike.getCookie("avatar") == 1) {
              _this.$store.commit("setPhone", _this.ruleForm.phone);
              _this.$router.push({
                path: "/registerlogin"
              });
            } else if (Cooike.getCookie("avatar") == 3) {
              _this.$store.commit("setuserType", 1);
              _this.$store.commit("setPhone", _this.ruleForm.phone);
              _this.$router.push({
                path: "/family"
              });
            }
          }
        })
        .catch(function() {
          _this.is_ajax = false;
        });
    },

    //医院渠道登录
    HospitalChannel(n) {
      // 判断用户是否存在/admin/isExist   参数phone电话号  userType用户类型  0医院 1渠道
      var hospitalType = "";
      if (Cooike.getCookie("avatar") == 0) {
        hospitalType = "0";
      } else if (Cooike.getCookie("avatar") == 1) {
        hospitalType = "";
      } else if (Cooike.getCookie("avatar") == 3) {
        hospitalType = "1";
      }

      let data = {
        userType: n,
        phone: this.ruleForm.phone,
        hospitalType: hospitalType
      };
      // return;
      this.$Axios
        .post(baseUrl + "/admin/login", data)
        .then(function(response) {
          //重复点击
          // return;
          if (response.data.code == -100) {
            _this.is_ajax = false;
            Toast({
              message: "账号不存在，或者属于其它用户类型",
              duration: 1000
            });
            return;
          }

          if (response.data.code == 200) {
            // return;
            _this.$store.commit("settoken", response.data.data.token, 1);
            _this.is_ajax = false;
            _this.$store.commit("getCookieUser");
            _this.isshuxin();
            window.localStorage.removeItem("CodeTime"); //登录成功清掉  验证码
            _this.$router.replace({
              path: "/custser"
            });
          }
        })
        .catch(function() {
          _this.is_ajax = false;
        });
    },

    isshuxin() {
      if (Cooike.getCookie("avatar") == 0) {
        //医院的
        _this.$store.commit("Qeruyhospital", {
          position_id: Cooike.getCookie("position_id"),
          department_id: Cooike.getCookie("department_id"),
          type1: "POSITION",
          type2: "DEPARTMENT"
        });
      } else if (Cooike.getCookie("avatar") == 1) {
        _this.$store.commit("Qeruyregister", {
          channelLevel_id: Cooike.getCookie("channelLevel_id"),
          position_id: Cooike.getCookie("position_id"),
          type1: "CHANNEL_LEVEL",
          type2: "CHANNEL_POSITION"
        });

        //渠道的
      } else if (Cooike.getCookie("avatar") == 3) {
        //家庭的
        _this.$store.commit("Qeruyfamily", {
          productLine_id: Cooike.getCookie("productLine_id"),
          model_id: Cooike.getCookie("model_id"),
          type1: "PRODUCT_LINE",
          type2: "EQUI_MODEL",
          name: "model"
        });
      }
    },
    //员工登录
    employeesLoding() {
      this.$Axios
        .post(baseUrl + "/staff/staffLogin", {
          userName: this.ruleForm1.employees_name,
          password: this.ruleForm1.employees_pass
        })
        .then(function(response) {
          //重复点击
          _this.is_ajax = false;
          if (response.data.code == 200) {
            _this.$store.commit("settoken", response.data.data.token, 1);
            _this.$store.commit("setemployees", response.data.data.result);
            _this.$store.commit("getemployees");
            _this.$router.replace({
              path: "/staffserver"
            });
          } else if (response.data.code == -100) {
            _this.is_ajax = false;
            Toast({
              message: response.data.msg,
              duration: 1000
            });
          }
        })
        .catch(function() {
          _this.is_ajax = false;
        });
    },

    //判断手机号
    checkPhone(n) {
      //限定 手机号
      if (!/^1[34578]\d{9}$/.test(n)) {
        //不限定手机号   限定长度
        // if (!/^1[0-9]{10}$/.test(n)) {
        return true;
      } else {
        return false;
      }
    },
    //判断验证码是否过期
    iscode() {
      //判断验证码  超时  时间
      let storage = window.localStorage;
      let currentTime = new Date().getTime(); //当前时间 戳
      if (storage.getItem("CodeTime") != null) {
        let CodeTm = JSON.parse(storage.getItem("CodeTime")); //设置时间
        if (currentTime > CodeTm.time) {
          storage.removeItem("CodeTime");
          this.AjaxYzm = "";
        } else {
          this.AjaxYzm = CodeTm.code;
        }
      }
    },

    //获取短信验证码 计时
    getCode(formName) {
      if (this.is_ajax != false) return;
      this.$refs[formName].validate(valid => {
        if (valid) {
          const TIME_COUNT = 60;
          this.ruleForm.duanxin_yzm = "";
          let storage = window.localStorage;
          let currentTime = new Date().getTime(); //当前时间 戳
          if (storage.getItem("CodeTime") != null) {
            let CodeTm = JSON.parse(storage.getItem("CodeTime")); //设置时间
            if (currentTime > CodeTm.time) {
              Toast({
                message: "请重新获取",
                duration: 1000
              });
              return false;
            } else {
              Toast({
                message: "验证码五分钟内有效",
                duration: 500
              });
              this.AjaxYzm = CodeTm.code;
              return false;
            }
          }
          if (!this.timer) {
            this.text_yzm = TIME_COUNT;
            this.show_yzm = false;
            this.timer = setInterval(() => {
              if (this.text_yzm > 0) {
                this.text_yzm--;
              } else {
                this.show_yzm = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000);

            //----------发起请求验证码 --------------------------
            this.$Axios
              .post(
                baseUrl + "/admin/sendMessage?smsMob=" + this.ruleForm.phone
              )
              .then(function(response) {
                if (response.data.code == 200) {
                  if (response.data.msg == "短信验证码发送成功") {
                    Toast({
                      message: "验证码发送成功，请注意查收",
                      duration: 700
                    });
                    _this.AjaxYzm = response.data.data.code;
                    // _this.AjaxYzm = "123456";
                    let storage = window.localStorage;
                    let data = {
                      time: new Date().getTime() + 60 * 1000 * 5,
                      code: _this.AjaxYzm
                    };
                    storage.setItem("CodeTime", JSON.stringify(data));
                  }
                } else {
                  Toast({
                    message: "验证码发送失败，请稍后重试",
                    duration: 700
                  });
                }
              })
              .catch(function() {});
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //图形验证码
    imgCode(code) {
      this.ruleForm.tuxing_yzm = "";
      this.code = code;
    }
  },
  mounted() {
 
            this.getCookie();
            console.log(window.document.cookie)
          // console.log(window.document.cookie+"00000000002222222")
				},
};
</script>

<style>
.userlogin .el-input__inner {
  height: 50px;
  line-height: 50px;
}

.userlogin .el-form-item {
  margin-bottom: 10px;
}
</style><style scoped>
.box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 7.5rem;
}

.main {
  margin: 0.2rem 0.34rem 0;
}

.main li {
  height: 1.68rem;
  width: 6.82rem;
  margin: 0.2rem 0;
}

.main li h2 {
  width: 6.8rem;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.32rem;
  font-weight: 500;
  margin: 0.13rem 0;
}

.main li input {
  height: 0.32rem;
  width: 4rem;
  border: 0.01rem #b8b8ba solid;
  font-size: 0.25rem;
  line-height: 0.32rem;
  padding-left: 0.22rem;
  float: left;
  padding: 0.3rem 0.2rem 0.3rem 0.22rem;
}

.demo-ruleForm h2 {
  width: 6.8rem;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.32rem;
  font-weight: 500;
  margin: 0.13rem 0;
}

.main li .w657 {
  width: 6.17rem;
}

.main li img {
  display: block;
  width: 1.95rem;
  height: 0.96rem;
  float: left;
  margin-left: 0.22rem;
  vertical-align: top;
}

.demo-ruleForm i {
  display: block;
  width: 1.95rem;
  height: 0.96rem;
  background: #998bd6;
  float: left;
  margin-left: 0.22rem;
  font-size: 0.25rem;
  color: #fff;
  font-style: normal;
  text-align: center;
  line-height: 0.96rem;
}

.main li i {
  display: block;
  width: 1.95rem;
  height: 0.96rem;
  background: #998bd6;
  float: left;
  margin-left: 0.22rem;
  font-size: 0.25rem;
  color: #fff;
  font-style: normal;
  text-align: center;
  line-height: 0.96rem;
}

.dw {
  margin: 1.5rem 0 0 0rem;
}

.sendbtnac {
  background: #b8b8ba;
  pointer-events: none;
}
</style>

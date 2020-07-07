<template>
<div class="box daxiong005" v-cloak>
    <div class="header">
        <i class="icon" @click="toback"></i>
        <p class="title">维修报告单</p>
    </div>

    <heraderTab :listBtn="listBtn" @tabAc="showBTN"></heraderTab>

    <div class="main" v-show="showBtn==torIndex && torIndex < 4" v-for="(text,torIndex) in torepoteList" :key="torIndex">
        <h3 @click="showhide(0)">
            一、客户、产品基本信息
            <mt-badge type="error" size="small" v-show="Identification00"></mt-badge>
            <i></i>
        </h3>
        <ul :class="{hg_ac:hg_ac_bool == 'hg_ac00'}">
            <li>
                <p>客户名称</p>
                <span>{{text.HospitalName}}</span>
            </li>
            <li>
                <p>级别</p>
                <span>{{text.level}}</span>
            </li>
            <li>
                <p>使用科室</p>
                <!-- <span>{{text.useDepartment}}</span> -->
                <span>
                    <el-select v-model="text.useDepartment" placeholder="请选择" clearable>
                        <el-option v-for="item in keshi_list" :key="item.id" :label="item.lable" :value="item.lable"></el-option>
                    </el-select>
                </span>

                <i class="ac"></i>
            </li>
            <li>
                <p>产品型号</p>
                <span>{{text.productModel}}</span>
            </li>
            <li>
                <p>产品编号</p>
                <span>{{text.productNumber}}</span>
            </li>
            <li>
                <p>维修类别</p>
                <!-- <span>{{text.productClass}}</span> -->
                <mt-radio v-model="text.productClass" :options="KeepInside" align="left"></mt-radio>
                <!-- <i class="ac"></i> -->
            </li>
            <li>
                <p>联系人</p>
                <span>{{text.Call}}</span>
            </li>
            <li>
                <p>联系电话</p>
                <span>{{text.Contact}}</span>
            </li>
            <li>
                <p>邮编</p>
                <span>{{text.postcode}}</span>
            </li>
            <li>
                <p>地址</p>
                 <input type="text" placeholder="请输入地址"   v-model="text.address" />
                <!-- <span>{{text.address}}</span> bailing -->
            </li>
        </ul>
        <h3 @click="showhide(1)">
            二、服务前产品信息
            <mt-badge type="error" size="small" v-show="Identification01"></mt-badge>
            <i></i>
        </h3>
        <ul :class="{hg_ac:hg_ac_bool == 'hg_ac01'}">
            <li>
                <p>约定时间</p>
                <span>{{text.appointmentDate.substring(0,10)}}</span>
                <!-- <i class="ac"></i> -->
            </li>
            <li @click="Selectiontime(torIndex,0,text.currentTime)">
                <p>到位时间</p>
                <span>{{text.currentTime}}</span>
                <i class="ac"></i>
            </li>
            <li>
                <p>产品状态</p>
                <span>{{text.productstate}}</span>
                <mt-radio v-model="text.productstate" :options="productStatuslist" align="left"></mt-radio>

                <i class="ac"></i>
            </li>
        </ul>
        <h3 @click="showhide(2)">
            三、故障信息
            <mt-badge type="error" size="small" v-show="Identification02"></mt-badge>
            <i></i>
        </h3>
        <ul :class="{hg_ac:hg_ac_bool == 'hg_ac02'}">
            <li>
                <textarea placeholder="故障部件" maxlength="110" v-model="text.faultComponents"></textarea>
            </li>
            <li>
                <textarea placeholder="故障现象" maxlength="110" v-model="text.faultPhenomenon"></textarea>
            </li>
        </ul>
        <h3 @click="showhide(3)">
            四、服务信息
            <mt-badge type="error" size="small" v-show="Identification03"></mt-badge>
            <i></i>
        </h3>
        <ul :class="{hg_ac:hg_ac_bool == 'hg_ac03'}">
            <li>
                <div class="btn_icon">
                    <i class="icon_minus" @click="ClassList_minus(torIndex)"></i>
                    <i @click="ClassList_plus(torIndex)"></i>
                </div>
            </li>
            <li>
                <div v-for="(acctext,accIndex) in text.accessoriesList" :key="accIndex">
                    <textarea placeholder="维修内容" maxlength="110" v-model="acctext.MaintenanceContent"></textarea>

                    <input type="text" class="left" placeholder="更换配件的名称" v-model="acctext.accessoriesName" />
                    <input type="text" class="right" placeholder="更换的数量" onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');" v-model="acctext.accessoriesNum" />
                    <input type="text" class="text" placeholder="输入对应的物料编码" onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');" maxlength="9" v-model="acctext.accessoriesPhone" />
                </div>
            </li>

            <li>
                <p>维修结果确认</p>
                <span>{{text.maintenance}}</span>
                <i class="ac"></i>
                <mt-radio v-model="text.maintenance" :options="['正常使用','局部使用','停止使用，需再次维修']" align="left"></mt-radio>
            </li>
            <li>
                <p>故障原因分析</p>
                <!-- <span style="width: 5.1rem;left: 1.7rem;overflow: hidden;">
            <em
              style="font-style: normal;"
              v-for="(faultname,faultindex) in text.fault"
              :key="faultindex"
            >{{faultname}}</em>
          </span>-->
                <mt-checklist v-model="text.fault" :options="faultyy"></mt-checklist>
                <mt-checklist v-model="text.fault1" :options="['其它']"></mt-checklist>
                <i class="ac"></i>
            </li>
            <li>
                <textarea placeholder="其它" maxlength="110" v-show="text.fault1.length != 0" v-model="text.faultqt"></textarea>
            </li>
             <li>
                <textarea placeholder="解决办法" maxlength="110" v-model="text.settlement"></textarea>
            </li>
        </ul>
        <h3 @click="showhide(4)">
            五、客户评价
            <mt-badge type="error" size="small" v-show="Identification04"></mt-badge>
            <i></i>
        </h3>
        <ul :class="{hg_ac:hg_ac_bool == 'hg_ac04'}">
            <li>
                <p>产品故障是否消除</p>
                <span>{{text.guzhuang}}</span>
                <mt-radio v-model="text.guzhuang" :options="guzhuangxiangcuo" align="left"></mt-radio>

                <i class="ac"></i>
            </li>
            <li>
                <p>综合服务评价</p>
                <span>{{text.ServiceEvaluation}}</span>
                <mt-radio v-model="text.ServiceEvaluation" :options="list7" align="left"></mt-radio>
                <i class="ac"></i>
            </li>
        </ul>
        <h3 @click="showhide(5)">
            六、联系我们
            <i></i>
        </h3>
        <ul :class="{hg_ac:hg_ac_bool == 'hg_ac05'}">
            <li class="rm_ac">
                <p class="mr">非常感谢您选择谊安的产品,希望我们的产品和服务能使您满意。如需帮助，请拨打客户服务专线。</p>
            </li>
            <li class="rm_ac">
                <u></u>
                <p class="hg">800-810-8333 &nbsp;&nbsp;&nbsp;&nbsp;400-610-8333</p>
            </li>
            <li class="rm_ac01">
                <u></u>
                <p class="hg">http://www.aeonmed.com</p>
            </li>
        </ul>
        <h3 @click="showhide(6)">
            七、客户确认
            <mt-badge type="error" size="small" v-show="Identification05"></mt-badge>
            <i></i>
        </h3>
        <ul :class="{hg_ac:hg_ac_bool == 'hg_ac06'}">
            <li @click="signature(1,torIndex)">
                <p>客户签名</p>
                <img v-show="text.userImg" :src="text.userImg" alt class="magin_t" />
                <i class="ac"></i>
            </li>
            <li @click="Selectiontime(torIndex,2,text.customertime)">
                <p>客户签字日期</p>
                <span>{{text.customertime}}</span>
                <i class="ac"></i>
            </li>
            <!-- <li @click="signature(0,torIndex)">
          <p>服务人员签名</p>
          <img v-show="text.employeesImg" :src="text.employeesImg" alt class="magin_t" />
          <i class="ac"></i>
        </li>-->
            <li @click="Selectiontime(torIndex,1,text.servicetime)">
                <p>服务人员签字日期</p>
                <span>{{text.servicetime}}</span>
                <i class="ac"></i>
            </li>
        </ul>

        <div class="sendbtn mt" :class="{isbtnac:text.isstatus}" @click="yulan(torIndex,'预览')">预览</div>
        <div class="sendbtn mt" :class="{isbtnac:text.isstatus}" @click="yulan(torIndex,'提交')">提交</div>
    </div>

    <div class="model" v-show="bool">
        <div class="bg_yanse"></div>
        <div class="slots_list" :class="{demo_transform3:!bool,demo_transform4:bool}">
            <h2>{{title}}</h2>
            <span @click="queding">确定</span>
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
        </div>
    </div>

    <!-- 选择时间 -->
    <TimeComponent :boosl="timebool" :datitme1="datitme" @cancelTime="cancelTime"></TimeComponent>

    <!-- 签字模块 -->
    <signature v-show="signatureShow" ref="Clear" @signatureFn="signatureImg"></signature>
    <!-- baser64  图片 -->
    <!-- <baseImgtu :userimgtus="basetuImg" @onbaseImg="fntuImg"></baseImgtu> -->

    <!-- <div class="model" v-show="yulanShow" @click="yinchang"> -->
    <div class="model" v-show="yulanShow">
        <div class="bg_yanse"></div>
        <!-- <div class="yulanImng" :class="{yulanImngac:yulanShow}">
        <pdf
          v-for="i in numPages"
          :key="i"
          :page="i"
          :src="pdfImg"
          style="width: 128.7%;
    margin: -14.6%;
"
        ></pdf>
        <a :href="baseUrlxiazai+xiazaiUrl" download class="xiazaiwenjian">- 下载</a>
      </div>-->

        <baseImgtu class="yulanImng" :pdfimglist="pdfImg" :class="{yulanImngac:yulanShow}"></baseImgtu>
        <!-- <a :href="baseUrlxiazai+pdfImg" download class="xiazaiwenjian">- 点击下载</a> -->

        <div class="xiazaiwenjian xiazaiwenjian1" @click="yinchang">- 关闭预览</div>
    </div>
    <!-- 图片旋转  -->
    <base64roter :base64img="base64imgrot" @signatureFn11="base64IMg" class="base64imgrotimg"></base64roter>
    <!-- pdf显示 -->
</div>
</template>

<script>
import baseUrl from "../../api/baseUrl.js";
import baseImg from "../../api/BASEImg.js";
import baseUrlxiazai from "../../api/baseUrlxiazai.js";

// import baseImgtu from "./base64img"; //BASE64 图转码

import signature from "./signature";

import base64roter from "./signatureImg";

import heraderTab from "./herderTba";
import baseImgtu from "./pdf";

import axios from "axios";

import {
    Toast,
    MessageBox,
    Indicator
} from "mint-ui";
import Cookie from "../../api/cookie.js";

var _this;
var nowYear;
var nowMonth;
var nowDay;

import pdf from "vue-pdf";

import TimeComponent from "./TimeComponent";

export default {
    name: "maintain",
    data() {
        return {
            baseUrl: baseImg,
            xiazaiUrl: "", //下载PDF  url
            baseUrlxiazai: baseUrlxiazai,
            base64imgrot: "",

            Identification00: false,
            Identification01: false,
            Identification02: false,
            Identification03: false,
            Identification04: false,
            Identification05: false,
            Identification06: false,

            basetuImg: "",
            yuangongtuping: "", //员工签字图片   base64
            baseImgtu: baseImg,
            //图片上传
            multiple: true,
            formDate: "",
            noneshow: false,
            //图片上传
            pdfImg: "", //pdf
            numPages: [], //pdf 分页

            yulanShow: false,
            signatureShow: false,
            time_bool: false,
            hg_ac_bool: "hg_ac00",
            clientSignature: "",
            clientSignature1: "",
            accessoriesList: [{
                MaintenanceContent: "",
                accessoriesName: "",
                accessoriesNum: "",
                accessoriesPhone: ""
            }],
            keshi_list: [],
            userdetali: {},
            listlist: [],
            productLine: [], //产品线
            CUSTOMER_LEVEL: [], //等级
            DEPARTMENT: [], //科室
            maintenance: "",
            fault: [],
            faultyy: [
                "密封件老化",
                "部件连接松动",
                "电压变化造成电器件损坏",
                "电器部件故障",
                "机械部件故障",
                "维护不当造成产品故障",
                "未按要求使用造成损坏",
                "非正常损坏",
                "消毒保养不当，造成部件损坏",
                "非授权拆机造成损坏"
            ],
            guzhuang: "",
            guzhuangxiangcuo: ["正常使用", "故障未解决，希望继续维修"],    
            value5: "",
            list7: ["非常满意", "满意", "一般", "不满意"],

            //产品状态
            productStatus: "",
            productStatuslist: ["正常使用", "局部使用", "完全停机"],

            KeepInside: [{
                    label: "保内",
                    value: "true"
                },
                {
                    label: "保外",
                    value: "false"
                }
            ],
            userdetaliarray: [], //工单完整信息
            listBtn: [],
            showBtn: "0",
            torepoteList: [], //产品线类型  数据
            torShow: "0",
            bool: false,
            title_num01: "",
            title: "",
            time: "",
            slots: [{
                flex: 1,
                values: [],
                className: "slots",
                textAlign: "center"
            }],
            //签字id
            numid: 0,
            numid1: 0,

            // 选择时间  id    显示隐藏
            timebool: false,
            listid: 0, //list  数据  第一个产品线
            timeboolid: 0, //第几个的时间
            datitme: "",

            //是否提交过
            ispartsName: [] //哪些提交过数据
        };
    },
    created() {
        _this = this;

        nowYear = new Date().getFullYear().toString();
        nowMonth = (new Date().getMonth() + 1).toString();
        nowDay = new Date().getDate().toString();
        _this.istosend();
        // if (
        //   this.$store.state.repairorder.signPic != null &&
        //   this.$store.state.repairorder.signPic != "" &&
        //   this.$store.state.repairorder.signPic != undefined
        // ) {
        //   this.basetuImg =
        //     "http://39.105.157.251:9997" + this.$store.state.repairorder.signPic;
        // }
    },

    components: {
        signature,
        heraderTab,
        pdf,
        TimeComponent,
        baseImgtu,
        base64roter
        // baseImgtu
    },
    mounted() {},
    methods: {
      
        istosend() {

            var id = {
                groupId: _this.$route.query.id
            };

            Indicator.open({
                text: "加载中，请稍后",
                spinnerType: "fading-circle"
            });
            _this.$Axios
                .post(baseUrl + "/reportType/getAll", {
                    groupId: id.groupId,
                    products: "维修"
                })
                .then(function (response) {
                    if (response.data == "loginTimeout") {
                        Indicator.close();
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
                
                    if (response.data.code == 200) {
                        _this.ispartsName = response.data.data.maintenance;

                        _this.$Axios
                            .post(
                                baseUrl +
                                "/dicCode/queryDicByMoreType?type=CUSTOMER_LEVEL,PRODUCT_LINE,DEPARTMENT"
                            )
                            .then(function (response) {
                                if (response.data.code == 200) {
                                    for (let i = 0; i <= response.data.data.length - 1; i++) {
                                        if (response.data.data[i].type == "CUSTOMER_LEVEL") {
                                            _this.CUSTOMER_LEVEL.push(response.data.data[i]);
                                        }
                                        if (response.data.data[i].type == "PRODUCT_LINE") {
                                            _this.productLine.push(response.data.data[i]);
                                        }
                                        if (response.data.data[i].type == "DEPARTMENT") {
                                            _this.DEPARTMENT.push(response.data.data[i]);
                                        }
                                    }

                                    _this.producti(id);
                                }
                            })
                            .catch(function () {
                                Indicator.close();
                            });

                        _this.$Axios
                            .post(baseUrl + "/dicCode/queryDicByMoreType?type=DEPARTMENT")
                            .then(function (response) {
                                //重复点击
                                if (response.data.code == 200) {
                                    _this.keshi_list = response.data.data;
                                }
                            })
                            .catch(function (error) {});
                    }
                })
                .catch(function () {
                    Indicator.close();
                });
        },
        //判断  月 日  前面的 0
        timeAdd0(str) {
            if (str.length <= 1) {
                str = "0" + str;
            }
            return str;
        },
        //产品线类型
        producti(id) {
            _this.$Axios
                .post(baseUrl + "/applyJob/queryScheduleInfo", id)
                .then(function (response) {
                    Indicator.close();
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
                        _this.userdetali = response.data.data.applyJobGroupInfo;
                        _this.userdetaliarray = response.data.data;
                        let proLine = "";
                        let isstatus = false;
                        //遍历   list 数组
                        for (
                            var pronum1 = 0; pronum1 <= response.data.data.applyJobInfo.length - 1; pronum1++
                        ) {
                            //查询医院等级
                            for (
                                var pronum = 0; pronum <= _this.CUSTOMER_LEVEL.length - 1; pronum++
                            ) {
                                if (
                                    response.data.data.applyJobGroupInfo.customerLevel ==
                                    _this.CUSTOMER_LEVEL[pronum].value
                                ) {
                                    _this.userdetali.level = _this.CUSTOMER_LEVEL[pronum].lable;
                                }
                            }
                            //查询产品线
                            for (
                                var pronum2 = 0; pronum2 <= _this.productLine.length - 1; pronum2++
                            ) {
                                console.log(response.data.data.applyJobInfo[pronum1].productLine,
                                    _this.productLine[pronum2].value)
                                if (
                                    response.data.data.applyJobInfo[pronum1].productLine ==
                                    _this.productLine[pronum2].value
                                ) {
                                    //产品线
                                    proLine = _this.productLine[pronum2].lable;
                                    //工单按钮  --  这是按钮
                                    _this.listBtn.push({
                                        name: _this.productLine[pronum2].lable
                                    });
                                }
                            } //科室

                            for (
                                var pronum3 = 0; pronum3 <= _this.DEPARTMENT.length - 1; pronum3++
                            ) {
                                if (
                                    response.data.data.applyJobGroupInfo.useDepartment ==
                                    _this.DEPARTMENT[pronum3].value
                                ) {
                                    response.data.data.applyJobGroupInfo.useDepartment =
                                        _this.DEPARTMENT[pronum3].lable;
                                }
                            }

                            if (_this.ispartsName != "") {
                                //是否提交过数据
                                for (
                                    var pronum4 = 0; pronum4 <= _this.ispartsName.length - 1; pronum4++
                                ) {
                                    if (proLine == _this.ispartsName[pronum4].partsName) {
                                        isstatus = true;
                                    }
                                }
                            }

                            //整理所需要的数据
                            _this.torepoteList.push({
                                Cpid: response.data.data.applyJobGroupInfo.id, //
                                staffId: response.data.data.applyJobGroupInfo.staffId, //员工id
                                staffName: response.data.data.applyJobGroupInfo.staffName, //员工名称
                                partsName: proLine, //产品线
                                isstatus: isstatus, //是否提交过数据  true  =  提交过      false = 没有提交
                                userId: response.data.data.applyJobGroupInfo.staffId,
                                groupId: response.data.data.applyJobGroupInfo.groupId,
                                report: "维修",
                                serviceNumber: response.data.data.applyJobGroupInfo.assignId,
                                HospitalName: response.data.data.applyJobGroupInfo.customerName,
                                level: _this.userdetali.level,
                                useDepartment: response.data.data.productInfo[0].useDepartment,
                                applyType: response.data.data.applyJobGroupInfo.applyType,
                                Call: response.data.data.applyJobGroupInfo.contacts,
                                Contact: response.data.data.applyJobGroupInfo.phone,
                                postcode: response.data.data.applyJobGroupInfo.zipCode,
                                address: response.data.data.applyJobGroupInfo.address,
                                appointmentDate: response.data.data.applyJobGroupInfo.appointmentDate,
                                productModel: response.data.data.applyJobInfo[pronum1].model,
                                productNumber: response.data.data.applyJobInfo[pronum1].deviceId,

                                productClass: "", //维修 类 别
                                productstate: "", //产品状态
                                maintenance: "", //维修结果
                                fault: [], //故障分析
                                fault1: [],
                                faultqt: "", //其它描述
                                guzhuang: "", //故障是否消除
                                ServiceEvaluation: "", //服务评价

                                currentTime: _this.timeAdd0(nowYear) +
                                    "-" +
                                    _this.timeAdd0(nowMonth) +
                                    "-" +
                                    _this.timeAdd0(nowDay),
                                faultComponents: "",
                                settlement:"",
                                faultPhenomenon: "",
                                accessoriesList: [{
                                    MaintenanceContent: "",
                                    accessoriesName: "",
                                    accessoriesNum: "",
                                    accessoriesPhone: ""
                                }],
                                userImg: "", //用户签名
                                employeesImg: "", //员工签名
                                servicetime: _this.timeAdd0(nowYear) +
                                    "-" +
                                    _this.timeAdd0(nowMonth) +
                                    "-" +
                                    _this.timeAdd0(nowDay), //服务人时间
                                customertime: _this.timeAdd0(nowYear) +
                                    "-" +
                                    _this.timeAdd0(nowMonth) +
                                    "-" +
                                    _this.timeAdd0(nowDay) //客户时间
                            });
                            proLine = "";
                            isstatus = false;
                            //开启图片上传
                            _this.noneshow = true;
                        }
                    }
                })
                .catch(function () {
                    Indicator.close();
                });
        },
        yinchang() {
            this.yulanShow = false;
            _this.pdfImg = "";
            _this.numPages = [];
        },
        toback() {
            this.$router.go(-1);
        },
        showBTN(n) {
            this.showBtn = n.id;
        },

        //＋＋   添加组
        ClassList_plus(id) {
            if (this.torepoteList[id].accessoriesList.length - 1 > 1) return;
            this.torepoteList[id].accessoriesList.push({
                accessoriesName: "",
                accessoriesNum: "",
                accessoriesPhone: ""
            });
        },
        //--    减去组
        ClassList_minus(id) {
            if (this.torepoteList[id].accessoriesList.length - 1 == 0) return;
            this.torepoteList[id].accessoriesList.splice(
                this.accessoriesList[id].length - 1,
                1
            );
        },

        showhide(n) {
            if (n == 0) {
                this.hg_ac_bool = "hg_ac00";
            } else if (n == 1) {
                this.hg_ac_bool = "hg_ac01";
            } else if (n == 2) {
                this.hg_ac_bool = "hg_ac02";
            } else if (n == 3) {
                this.hg_ac_bool = "hg_ac03";
            } else if (n == 4) {
                this.hg_ac_bool = "hg_ac04";
            } else if (n == 5) {
                this.hg_ac_bool = "hg_ac05";
            } else if (n == 6) {
                this.hg_ac_bool = "hg_ac06";
            }
        },
        quxiao() {
            this.signatureShow = false;
        },
        //打开签字
        signature(n, id) {
            if (n == 0) {
                this.$refs.Clear.clear();
                this.signatureShow = true;
            } else if (n == 1) {
                this.$refs.Clear.clear();
                this.signatureShow = true;
            }
            this.numid = n;
            this.numid1 = id;

            var scrollTop =
                document.body.scrollTop || document.documentElement.scrollTop;
            document.body.style.cssText += "position:fixed;top:-" + scrollTop + "px;";
        },
        //确定签字   取消签字
        signatureImg(n) {
            if (n.sta == 0) {
                this.signatureShow = false;
            } else if (n.sta == 1) {
                if (this.numid == 0) {
                    // this.torepoteList[this.numid1].employeesImg = n.img;
                    // this.base64imgrot = n.img;
                } else if (this.numid == 1) {
                    // this.torepoteList[this.numid1].userImg = n.img;
                    this.base64imgrot = n.img;
                }
            }
            this.signatureShow = false;
            var body = document.body;
            body.style.position = "static";
            var top = body.style.top;
            document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
                top
            );
            body.style.top = "";
        },
        base64IMg(n) {
            this.torepoteList[this.numid1].userImg = n.base64data;
            var body = document.body;
            body.style.position = "static";
            var top = body.style.top;
            document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
                top
            );
            body.style.top = "";
        },

        //   //字符串替换 空格
        //   StringConversion(str,zifuchangdu){
        // 	//字符长度
        // 	let strlen = str.length;
        // 	//一个放字符串截取 出来的数据
        // 	let arrlist  = [];
        // 	//循环截取 字符串  push 进 arrlist里     Math.ceil(strlen / zifuchangdu) 向上取整
        // 	for(let i = 0 ; i < Math.ceil(strlen / zifuchangdu) ;i++){
        // 		arrlist.push(str.slice(zifuchangdu*i,(i+1)*zifuchangdu))
        // 	}
        // 	//声明空字符串 添加空格 或 <br/>
        // 	let objstr = '';
        // 	//循环往后面添加空白 或 <<br/>
        // 	for(let k = 0 ; k <arrlist.length;k++){
        // 		if(k == arrlist.length-1){
        // 		//判断等于最后一个  不加空白  或  <br/>
        // 		objstr+= arrlist[k];
        // 		}else{
        // 		//不是最后一个
        // 		objstr+= arrlist[k]+' ';
        // 		}
        // 	}
        // 	return objstr;
        // },

        yulan(n, dat) {
            var opj = this.torepoteList[n];
            this.Identification00 = false;
            this.Identification01 = false;
            this.Identification02 = false;
            this.Identification03 = false;
            this.Identification04 = false;
            this.Identification05 = false;

            if (opj.productClass == "") {
                Toast("维修类型不能为空");
                this.Identification00 = true;
                return;
            }

            if (opj.productstate == "") {
                Toast("产品状态不能为空");
                this.Identification01 = true;
                return;
            }
            if (opj.faultComponents == "") {
                Toast("故障部件不能为空");
                this.Identification02 = true;
                return;
            }
           
            if (opj.faultPhenomenon == "") {
                Toast("故障现象不能为空");
                this.Identification02 = true;
                return;
            }
            if (opj.accessoriesList[0].MaintenanceContent == "") {
                Toast("维修内容不能为空");
                this.Identification03 = true;
                return;
            }
            if (opj.accessoriesList[0].accessoriesName == "") {
                Toast("更换配件名称不能为空");
                this.Identification03 = true;
                return;
            }
            if (opj.accessoriesList[0].accessoriesNum == "") {
                Toast("更换配件数量不能为空");
                this.Identification03 = true;
                return;
            }
            if (opj.accessoriesList[0].accessoriesPhone == "") {
                Toast("更换部件产品代码不能为空");
                this.Identification03 = true;
                return;
            }

            if (opj.maintenance == "") {
                Toast("维修结果不能为空");
                this.Identification03 = true;
                return;
            }
            if (opj.fault1.length == 0) {
                opj.faultqt = "";
                if (opj.fault.length <= 0) {
                    Toast("故障原因不能为空");
                    this.Identification03 = true;
                    return;
                }
            }
            if (opj.fault1.length != 0) {
                if (opj.faultqt == "") {
                    Toast("其他内容不能为空");
                    this.Identification03 = true;
                    return;
                }
            }
             if (opj.settlement == "") {
                Toast("解决办法不能为空");
                this.Identification03 = true;
                return;
             }
            
            if (opj.guzhuang == "") {
                Toast("产品故障是否消除不能为空");
                this.Identification04 = true;
                return;
            }
            if (opj.ServiceEvaluation == "") {
                Toast("综合评价不能为空");
                this.Identification04 = true;
                return;
            }

            // if (_this.yuangongtuping == "") {
            //   Toast("服务人员签字不能为空");
            //   return;
            // }
            if (opj.userImg == "") {
                Toast("客户签字不能为空");
                this.Identification05 = true;
                return;
            }
            // if (opj.employeesImg == "") {
            //   Toast("员工签字不能为空");
            //   this.Identification05 = true;
            //   return;
            // }
               
            var data = {
                staffId: opj.staffId, //员工id
                groupId: opj.groupId,
                report: "维修",
                serviceNumber: opj.serviceNumber, //服务单号
                HospitalName: opj.HospitalName, //客户名称
                level: opj.level, //客户等级
                address: opj.address, //地址
                postcode: opj.postcode, //邮编
                useDepartment: opj.useDepartment, //使用科室
                Call: opj.Contact, //联系人
                Contact: opj.Call, //联系人电话
                productModel: Cookie.StringConversion(opj.productModel,17), //型号
                productNumber: Cookie.StringConversion(opj.productNumber, 22), //产品编号
                nei: "□", //保内
                wai: "□", //保外
                startN: opj.appointmentDate.substr(0, 4), //约定时间  年
                startY: opj.appointmentDate.substr(5, 2), //约定时间  月
                startR: opj.appointmentDate.substr(8, 2), //约定时间  日
                endN: opj.currentTime.substr(0, 4), //到位时间  年
                endY: opj.currentTime.substr(5, 2), //到位时间  月
                endR: opj.currentTime.substr(8, 2), //到位时间  日
                cNormal: "□", //正常使用
                cLocal: "□", //局部使用
                stopCompletely: "□", //完全停机

                jsonInformation: "[",

                //  partsOne: opj.faultComponents, //故障部件
                // phenomenonA: opj.faultPhenomenon, //故障现象

                // contentA: "", //维修内容1
                // nameA: "", //配件名称
                // numA: "", //配件数量
                // noteA: "", //物料编号

                // contentB: "", //维修内容1
                // nameB: "", //配件名称
                // numB: "", //配件数量
                // noteB: "", //物料编号

                // contentC: "", //维修内容1
                // nameC: "", //配件名称
                // numC: "", //配件数量
                // noteC: "", //物料编号

                wNormal: "□", //维修结果确认    正常使用
                wLocal: "□", //维修结果确认    局部使用
                ST: "□", //维修结果确认    停止使用，需再次维修

                aging: "□", //故障原因分析     密封件老化
                loose: "□", //故障原因分析     部件连接松动
                damage: "□", //故障原因分析     电压变化造成电器件损坏
                DG: "□", //故障原因分析     电器部件故障
                JXG: "□", //故障原因分析     机械部件故障
                WHG: "□", //故障原因分析     维护不当造成产品故障
                FG: "□", //故障原因分析     未按要求使用造成损坏
                FZH: "□", //故障原因分析     非正常损坏
                BYBG: "□", //故障原因分析     消毒保养不当，造成部件损坏
                FSQ: "□", //故障原因分析              非授权拆机造成损坏
                other: _this.faultqt, //故障原因分析              其他

                solve: "□", //产品故障是否消除      正常使用
                nSolve: "□", //产品故障是否消除      故障未解决，希望继续维修
                verySatisfied: "□", //综合服务评价    非常满意
                meet: "□", //满意
                general: "□", //一般
                notMeet: "□", //不满意

                SNN: opj.servicetime.substr(0, 4), //服务人员签名  时间  年
                SYY: opj.servicetime.substr(5, 2), //服务人员签名  时间  月
                SRR: opj.servicetime.substr(8, 2), //服务人员签名  时间  日
                CNN: opj.customertime.substr(0, 4), //客户签名  时间  年
                CYY: opj.customertime.substr(5, 2), //客户签名  时间  年
                CRR: opj.customertime.substr(8, 2), //客户签名  时间  年
                sImg: "", //服务人员签名
                cImg: "" //用户签名
            };

            data.sImg = opj.employeesImg.replace("data:image/png;base64,", "");
            data.cImg = opj.userImg.replace("data:image/png;base64,", "");

            //保内 还是保外
            if (opj.productClass == "true") {
                data.nei = "■";
            } else if (opj.productClass == "false") {
                data.wai = "■";
            }

            if (opj.productstate == "正常使用") {
                data.cNormal = "■";
            } else if (opj.productstate == "局部使用") {
                data.cLocal = "■";
            } else if (opj.productstate == "完全停机") {
                data.stopCompletely = "■";
            }

            for (
                let accessoriesNum = 0; accessoriesNum <= opj.accessoriesList.length - 1; accessoriesNum++
            ) {
                if (accessoriesNum == 0) {
                    data.jsonInformation +=
                        '{"parts":"' +
                        opj.faultComponents +
                        '","phenomenon":"' +
                        opj.faultPhenomenon +
                        '","content":"' +
                        opj.accessoriesList[accessoriesNum].MaintenanceContent +
                        '","name":"' +
                        opj.accessoriesList[accessoriesNum].accessoriesName +
                        '","num":"' +
                        opj.accessoriesList[accessoriesNum].accessoriesNum +
                        '","note":"' +
                        opj.accessoriesList[accessoriesNum].accessoriesPhone +
                        '"},';
                } else {
                    if (opj.accessoriesList.length - 1 == accessoriesNum) {
                        data.jsonInformation +=
                            '{"parts":"","phenomenon":"","content":"' +
                            opj.accessoriesList[accessoriesNum].MaintenanceContent +
                            '","name":"' +
                            opj.accessoriesList[accessoriesNum].accessoriesName +
                            '","num":"' +
                            opj.accessoriesList[accessoriesNum].accessoriesNum +
                            '","note":"' +
                            opj.accessoriesList[accessoriesNum].accessoriesPhone +
                            '"}';
                    } else {
                        data.jsonInformation +=
                            '{"parts":"","phenomenon":"","content":"' +
                            opj.accessoriesList[accessoriesNum].MaintenanceContent +
                            '","name":"' +
                            opj.accessoriesList[accessoriesNum].accessoriesName +
                            '","num":"' +
                            opj.accessoriesList[accessoriesNum].accessoriesNum +
                            '","note":"' +
                            opj.accessoriesList[accessoriesNum].accessoriesPhone +
                            '"},';
                    }
                }
            }
            data.jsonInformation =
                data.jsonInformation.slice(data.jsonInformation.length - 1) === "," ?
                data.jsonInformation.slice(0, -1) :
                data.jsonInformation;
            data.jsonInformation += "]";

            if (opj.maintenance == "正常使用") {
                data.wNormal = "■";
            } else if (opj.maintenance == "局部使用") {
                data.wLocal = "■";
            } else if (opj.maintenance == "停止使用，需再次维修") {
                data.ST = "■";
            }

            opj.fault.forEach(function (value) {
                if (value == "密封件老化") {
                    data.aging = "■";
                } else if (value == "部件连接松动") {
                    data.loose = "■";
                } else if (value == "电压变化造成电器件损坏") {
                    data.damage = "■";
                } else if (value == "电器部件故障") {
                    data.DG = "■";
                } else if (value == "机械部件故障") {
                    data.JXG = "■";
                } else if (value == "维护不当造成产品故障") {
                    data.WHG = "■";
                } else if (value == "未按要求使用造成损坏") {
                    data.FG = "■";
                } else if (value == "非正常损坏") {
                    data.FZH = "■";
                } else if (value == "消毒保养不当，造成部件损坏") {
                    data.BYBG = "■";
                } else if (value == "非授权拆机造成损坏") {
                    data.FSQ = "■";
                }
            });

            opj.fault1.forEach(function (value) {
                if (value == "其它") {
                    data.other = opj.faultqt;
                }
            });

            if (opj.guzhuang == "正常使用") {
                data.solve = "■";
            } else if (opj.guzhuang == "故障未解决，希望继续维修") {
                data.nSolve = "■";
            }

            //综合评价
            if (opj.ServiceEvaluation == "非常满意") {
                data.verySatisfied = "■";
            } else if (opj.ServiceEvaluation == "满意") {
                data.meet = "■";
            } else if (opj.ServiceEvaluation == "一般") {
                data.general = "■";
            } else if (opj.ServiceEvaluation == "不满意") {
                data.notMeet = "■";
            }

            //上传图片
            // _this.subPicForm(data,dat,n);
            Indicator.open({
                text: "数据提交中，请稍后",
                spinnerType: "fading-circle"
            });

            _this.iSAjax(data, dat, n);

            let customeris = {
                //id: _this.userdetali.customerId,
                id: _this.userdetaliarray.productInfo[0].customerId,
                useDepartment: opj.useDepartment
            };

            this.$Axios
                .post(baseUrl + "/customerAdmin/updCustomerDepartment", customeris)
                .then(function (response) {
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
                })
                .catch(function () {});
        },

        //预览提交
        iSAjax(data, dat, n) {
            this.$Axios
                .post(baseUrl + "/reportType/preview", data)
                .then(function (response) {
                    //重复点击
                    Indicator.close();
                    // _this.is_ajax = false;
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
                    if (response.data.code == 200) {
                        // alert('可以提交')
                        if (dat == "提交") {
                            _this
                                .$confirm("提交后不能修改，确定提交吗？", "提示", {
                                    confirmButtonText: "确定",
                                    cancelButtonText: "取消",
                                    type: "warning"
                                })
                                .then(() => {
                                    _this.tijiao(n);
                                })
                                .catch(() => {
                                    _this.$message({
                                        type: "info",
                                        message: "已取消"
                                    });
                                });

                            return;
                        } else {
                            //签字 pdf
                            _this.pdfImg = "/" + response.data.data;

                            // pdf.createLoadingTask(_this.pdfImg).then(pdf => {
                            //   _this.numPages = pdf.numPages;
                            // });
                            _this.yulanShow = true;
                        }
                    }
                })
                .catch(function () {
                    Indicator.close();
                });
        },
        //预览提交

        tijiao(n) {
            var opj = this.torepoteList[n];
            // return;
            var data = {
                id: opj.Cpid, //id
                staffId: opj.staffId, //员工id
                installOne: opj.staffName, //员工名称
                partsName: opj.partsName, //产品线
                userId: opj.userId, //当前员工id
                groupId: opj.groupId,
                serviceNumber: opj.serviceNumber, //服务单号
                hospitalName: opj.HospitalName, //客户名称
                level: opj.level, //客户等级
                address:opj.address, //地址
                postcode: opj.postcode, //邮编
                useDepartment: opj.useDepartment, //使用科室
                call: opj.Call, //联系人
                contact: opj.Contact, //联系人电话
                productModel: opj.productModel, //型号
                productNumber: opj.productNumber, //产品编号
                serviceCategory: "true", //服务类型   保内  保外
                startTime: opj.appointmentDate, //约定开始时间
                endTime: opj.currentTime, //约定到位时间
                productStatus: opj.productstate, //产品状态   String
                jsonInformation: "[",
                maintenanceResult: opj.maintenance, //维修确认结果
                settlement:opj.settlement,
                aging: "false", //密封件老化    boolean
                loose: "false", //部件连接松动   boolean
                damage: "false", //电压变化造成电器件损坏    boolean
                dG: "false", //电器部件故障     boolean
                jXG: "false", //机械部件故障     boolean
                wHG: "false", //维护不当造成产品故障    boolean
                fG: "false", //未按要求使用造成损坏   boolean
                fZH: "false", //非正常损坏   boolean
                bYBG: "false", //消毒保养不当，造成部件损坏    boolean
                fSQ: "false", //非授权拆机造成损坏    boolean
                other: opj.faultqt, //非正常损坏

                faultClearance: "true", //产品故障是否消除   boolean
                serviceEvaluation: opj.ServiceEvaluation, //综合服务评价
                sImg: "", // 服务人员签名图片
                cImg: "", //客服签名图片
                serviceWriteTime: opj.servicetime, //服务人员签字日期
                customerWriteTime: opj.customertime //客户签字日期
            };
            console.log(data.settlement+"000000000000044444444")
            data.sImg = opj.employeesImg.replace("data:image/png;base64,", "");
            data.cImg = opj.userImg.replace("data:image/png;base64,", "");

            //保内 还是保外
            if (opj.productClass == "保内") {
                data.serviceCategory = "true";
            } else if (opj.productClass == "保外") {
                data.serviceCategory = "false";
            }

            for (
                let accessoriesNum = 0; accessoriesNum <= opj.accessoriesList.length - 1; accessoriesNum++
            ) {
                if (accessoriesNum == 0) {
                    data.jsonInformation +=
                        '{"parts":"' +
                        opj.faultComponents +
                        '","phenomenon":"' +
                        opj.faultPhenomenon +
                        '","content":"' +
                        opj.accessoriesList[accessoriesNum].MaintenanceContent +
                        '","name":"' +
                        opj.accessoriesList[accessoriesNum].accessoriesName +
                        '","num":"' +
                        opj.accessoriesList[accessoriesNum].accessoriesNum +
                        '","note":"' +
                        opj.accessoriesList[accessoriesNum].accessoriesPhone +
                        '"},';
                } else {
                    if (opj.accessoriesList.length - 1 == accessoriesNum) {
                        data.jsonInformation +=
                            '{"parts":"","phenomenon":"","content":"' +
                            opj.accessoriesList[accessoriesNum].MaintenanceContent +
                            '","name":"' +
                            opj.accessoriesList[accessoriesNum].accessoriesName +
                            '","num":"' +
                            opj.accessoriesList[accessoriesNum].accessoriesNum +
                            '","note":"' +
                            opj.accessoriesList[accessoriesNum].accessoriesPhone +
                            '"}';
                    } else {
                        data.jsonInformation +=
                            '{"parts":"","phenomenon":"","content":"' +
                            opj.accessoriesList[accessoriesNum].MaintenanceContent +
                            '","name":"' +
                            opj.accessoriesList[accessoriesNum].accessoriesName +
                            '","num":"' +
                            opj.accessoriesList[accessoriesNum].accessoriesNum +
                            '","note":"' +
                            opj.accessoriesList[accessoriesNum].accessoriesPhone +
                            '"},';
                    }
                }
            }

            data.jsonInformation =
                data.jsonInformation.slice(data.jsonInformation.length - 1) === "," ?
                data.jsonInformation.slice(0, -1) :
                data.jsonInformation;

            data.jsonInformation += "]";

            opj.fault.forEach(function (value) {
                if (value == "密封件老化") {
                    data.aging = "true";
                } else if (value == "部件连接松动") {
                    data.loose = "true";
                } else if (value == "电压变化造成电器件损坏") {
                    data.damage = "true";
                } else if (value == "电器部件故障") {
                    data.dG = "true";
                } else if (value == "机械部件故障") {
                    data.jXG = "true";
                } else if (value == "维护不当造成产品故障") {
                    data.wHG = "true";
                } else if (value == "未按要求使用造成损坏") {
                    data.fG = "true";
                } else if (value == "非正常损坏") {
                    data.fZH = "true";
                } else if (value == "消毒保养不当，造成部件损坏") {
                    data.bYBG = "true";
                } else if (value == "非授权拆机造成损坏") {
                    data.fSQ = "true";
                }
            });
            opj.fault1.forEach(function (value) {
                if (value == "其它") {
                    data.other = opj.faultqt;
                }
            });

            if (opj.guzhuang == "正常使用") {
                data.faultClearance = "true";
            } else if (opj.guzhuang == "故障未解决，希望继续维修") {
                data.faultClearance = "false";
            }

            //  let  demolist = JSON.parse(localStorage.signature);
            //  demolist.push({gorid:opj.Cpid})

            Indicator.open({
                text: "数据提交中，请稍后",
                spinnerType: "fading-circle"
            });

            // return;
            //提交  维修工单签字
            this.$Axios
                .post(baseUrl + "/reportType/insertMaintenanceData", data)
                .then(function (response) {
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
                    if (response.data.code == 200) {
                        _this.torepoteList[n].isstatus = true;

                        let issubmitsend = true;
                        for (
                            let issubmit = 0; issubmit <= _this.torepoteList.length - 1; issubmit++
                        ) {
                            if (issubmit > 4) {
                                return;
                            }
                            if (_this.torepoteList[issubmit].isstatus == false) {
                                issubmitsend = false;
                            }
                        }

                        //是否  提交工单    添加产品档案
                        if (issubmitsend) {
                            _this.productArchives(data);
                            _this.Monitoringoperation("完成工单");
                        } else {
                            _this.Monitoringoperation("工单签字");
                            _this.$message.success("还有未签字报修产品线");
                            Indicator.close();
                        }
                    }
                })
                .catch(function () {
                    Indicator.close();
                });
        },

        //产品档案
        productArchives(data) {
            let Matchingdata = [];
            let Archivesdata = {};
            let laver = "";
            //  循环  最外面一层数据
            for (
                let Archives = 0; Archives <= _this.torepoteList.length - 1; Archives++
            ) {
                //超过4条  不执行
                if (Archives > 4) {
                    return;
                }
                //  根据设备号进行循环

                let listarray = _this.torepoteList[Archives].productNumber.split(","); //设备号
                let modelarray = _this.torepoteList[Archives].productModel.split(","); //机型

                //遍历设备号
                for (
                    let productNumber = 0; productNumber <= listarray.length - 1; productNumber++
                ) {
                    //匹配医院等级
                    for (
                        let levelnum = 0; levelnum <= _this.CUSTOMER_LEVEL.length - 1; levelnum++
                    ) {
                        if (
                            _this.torepoteList[Archives].level ==
                            _this.CUSTOMER_LEVEL[levelnum].lable
                        ) {
                            laver = _this.CUSTOMER_LEVEL[levelnum].value;
                        }
                    }
                    Archivesdata = {
                        customerId: _this.userdetaliarray.productInfo.customerId, //客户id
                        customerCode: _this.userdetaliarray.applyJobGroupInfo.customerCode, //客户编码
                        province: _this.userdetaliarray.applyJobGroupInfo.province, //省份，字典表
                        productLine: "", //产品线，字典表
                        model: modelarray[productNumber], //产品型号
                        installTime: _this.userdetaliarray.productInfo.installDate, //安装日期
                        customer: _this.torepoteList[Archives].HospitalName, //客户
                        productName: "", //产品名称
                        productLevel: laver, //级别
                        contacts: _this.torepoteList[Archives].Call, //联系人
                        phone: _this.torepoteList[Archives].Contact, //联系方式
                        dispatchingOrder: _this.torepoteList[Archives].serviceNumber, //派工单号   ★★★★★
                        deviceId: listarray[productNumber], //序列号（设备号）
                        installOne: "", //安装人员
                        department: "", //科室
                        applyType: _this.torepoteList[Archives].applyType, //申请类型，字典表
                        warrantyEndDate: _this.userdetaliarray.productInfo.guaranteeBeginDate, //保修结束日期
                        warrantyStartDate: _this.userdetaliarray.productInfo.guaranteeEndDate, //保修开始日期
                        note: data.settlement, //备注    //白玲改          %%%%%
                        city: _this.userdetaliarray.applyJobGroupInfo.city //城市，字典表         %%%%%
                    };
                    Matchingdata.push(Archivesdata);
                    
                }
            }

            for (let matching = 0; matching <= Matchingdata.length - 1; matching++) {
                for (
                    let match = 0; match <= _this.userdetaliarray.productInfo.length - 1; match++
                ) {
                    if (
                        Matchingdata[matching].deviceId ==
                        _this.userdetaliarray.productInfo[match].deviceId
                    ) {
                        if (
                            _this.userdetaliarray.productInfo[match].installDateStart == null
                        ) {
                            _this.userdetaliarray.productInfo[match].installDateStart = "";
                        }

                        Matchingdata[matching].productLine =
                            _this.userdetaliarray.productInfo[match].productLine;
                        Matchingdata[matching].installTime =
                            _this.userdetaliarray.productInfo[match].installDateStart; //安装日期
                        Matchingdata[matching].productName =
                            _this.userdetaliarray.productInfo[match].product;
                        Matchingdata[matching].installOne =
                            _this.userdetaliarray.applyJobGroupInfo.staffName;
                        Matchingdata[matching].department =
                            _this.userdetaliarray.applyJobGroupInfo.department;
                        Matchingdata[matching].warrantyEndDate =
                            _this.userdetaliarray.productInfo[match].guaranteeBeginDate;
                        Matchingdata[matching].warrantyStartDate =
                            _this.userdetaliarray.productInfo[match].guaranteeEndDate;
                    }
                }
            }
            // return;
            _this.$Axios
                .post(baseUrl + "/productArchives/insertProductArchives", Matchingdata)
                .then(function (response) {
                    if (response.data == "loginTimeout") {
                        MessageBox.alert("登录超时，请重新登录").then(() => {
                            Cookie.clearCookie();
                            _this.$router.replace({
                                path: "/"
                            });
                        });
                        return;
                    }

                    if (response.data.code == 200) {
                        _this.workorder(data);
                    }
                })
                .catch(function () {});
        },
        //work order   改变工单  状态
        workorder(data) {
            // _this.is_ajax = false;
            let complete = {
                id: data.id,
                staffId: data.staffId,
                staffName: data.staffName,
                status: 6,
                applyType: "WX"
            };

            _this.$Axios
                .post(baseUrl + "/applyJob/updApplyJobInfo", complete)
                .then(function (response) {
                    Indicator.close();
                    if (response.data == "loginTimeout") {
                        MessageBox.alert("登录超时，请重新登录").then(() => {
                            Cookie.clearCookie();
                            _this.$router.replace({
                                path: "/"
                            });
                        });
                        return;
                    }
                    //重复点击
                    if (response.data.code == 200) {
                        Toast({
                            message: "签字提交成功",
                            duration: 1000
                        });

                        _this.$router.push({
                            path: "/orderlist"
                        });
                    }
                })
                .catch(function () {
                    Indicator.close();
                });
        },

        //操作流程 监控
        Monitoringoperation(issta) {
            let url = baseUrl + "/applyJob/addApplyRecord";
            let pagt = {
                groupId: _this.$route.query.id, //添加派工单历史记录   必填
                name: _this.$store.state.repairorder.repaiName, //操作人姓名   姓名
                type: "员工", //操作人类型   员工   还是管理员
                operation: "", //具体操作  审核  ，  撤销 ，  通过    派单
                operationRemarks: "", //操作备注
                examine: "", //审核是否通过
                examineRemarks: "" //审核备注
            };

            if (issta == "工单签字") {
                pagt.operation = "维修签字模板";
                pagt.examineRemarks = "签字成功";
            } else if (issta == "完成工单") {
                pagt.operation = "维修签字模板";
                pagt.examineRemarks = "成功完成工单";
            }

            _this.$Axios
                .post(url, pagt)
                .then(function (response) {})
                .catch(function () {});
        },

        //文件上传 --------------------------------------------------
        uploadFile(file) {
            this.formDate.append("file", file.file);
        },
        //提交图片  视频
        subPicForm(data, dat, id) {
            this.formDate = new FormData();
            _this.$refs.upload.submit();

            let config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            };
            if (this.formDate.get("file") == null) {
                Toast("请附带上一张现场图片");
                return;
            }

            // return;
            axios
                .post(baseUrl + "/upload/image", this.formDate, config)
                .then(res => {
                    if (res.data.code == 200) {
                        _this.iSAjax(data, dat, id);
                    }
                })
                .catch(() => {});
        },
        //文件上传 --------------------------------------------------

        //弹框
        onValuesChange(picker, values) {
            this.values = values[0];
        },
        xuanzhe(n) {
            if (n == 0) {
                (this.title = "维修类型"), (this.slots[0].values = this.list1);
            } else if (n == 1) {
                this.title = "选择外科";
                this.slots[0].values = this.list2;
            } else if (n == 2) {
                this.title = "选择职务";
                this.slots[0].values = this.list3;
            }
            this.bool = !this.bool;
            this.title_num01 = n;
        },
        queding() {
            if (this.title_num01 == 0) {
                this.title = this.values;
            } else if (this.title_num01 == 1) {
                this.title = this.values;
            } else if (this.title_num01 == 2) {
                this.title = this.values;
            }
            this.bool = !this.bool;
        },
        //弹框

        //选择时间方法   组件方法
        Selectiontime(listid, id, startTime) {
            // if(id == 1){
            //   if(this.torepoteList.customertime == ""){
            //      this.$message.error("请先选择客户时间");
            //      return;
            //   }
            // }
            this.datitme = startTime;
            this.timebool = true; //显示隐藏  时间
            this.listid = listid;
            this.timeboolid = id;

            var scrollTop =
                document.body.scrollTop || document.documentElement.scrollTop;
            document.body.style.cssText += "position:fixed;top:-" + scrollTop + "px;";
        },

        cancelTime(data) {
            if (data.name == "取消") {
                this.timebool = false;
            } else if (data.name == "确定") {
                if (this.timeboolid == 0) {
                    this.torepoteList[this.listid].currentTime = data.time;
                } else if (this.timeboolid == 1) {
                    if (
                        new Date(this.torepoteList[this.listid].customertime).getTime() <=
                        new Date(data.time).getTime()
                    ) {
                        this.torepoteList[this.listid].servicetime = data.time;
                    } else {
                        this.$message.error("请选择与客户相同或之后的时间");
                    }
                } else if (this.timeboolid == 2) {
                    this.torepoteList[this.listid].customertime = data.time;
                }
                this.timebool = false;
            }

            var body = document.body;
            body.style.position = "static";
            var top = body.style.top;
            document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
                top
            );
            body.style.top = "";
        }
    },
    beforeRouteLeave(to, from, next) {
        var body = document.body;
        body.style.position = "static";
        var top = body.style.top;
        document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
            top
        );
        body.style.top = "";
        this.signatureShow = false;
        next();
    }
};
</script>

<style>
.daxiong005 .mint-badge.is-size-small {
    border-radius: 0.25rem;
    line-height: 0.35rem;
    height: 0.35rem;
    font-size: 0.28rem;
    float: right;
    margin: 0.28rem 0.6rem;
}

.daxiong005 .mint-checkbox-input:checked+.mint-checkbox-core {
    background-color: #998bd6;
    border-color: #998bd6;
}

.daxiong005 .mint-checklist .mint-cell .mint-checkbox-label {
    font-size: 0.26rem;
}

.daxiong005 .mint-checklist .mint-cell .mint-checkbox-core {
    width: 0.3rem;
    height: 0.3rem;
}

.daxiong005 .mint-checkbox-core::after {
    top: 0.7px;
    left: 4.2px;
}

.daxiong005 .mint-radio-input:checked+.mint-radio-core {
    background-color: #998bd6;
    border-color: #998bd6;
}

.daxiong005 .mint-radio-core {
    width: 13.5px;
    height: 13.9px;
}

.daxiong005 .mint-radio-core::after {
    top: 3px;
    left: 3px;
    width: 6px;
    height: 6px;
    transform: scale(0);
}

.daxiong005 .mint-radio-label {
    font-size: 0.26rem;
}

.daxiong005 .mint-radio-input:checked+.mint-radio-core:after {
    transform: scale(0) !important;
}

.daxiong005 .el-message-box {
    width: 5rem;
}
</style><style scoped>
.box {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
}

/* 弹框 */

.model {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 7.5rem;
    height: 100%;
    z-index: 9999;
}

.bg_yanse {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
}

.slots_list {
    width: 7.5rem;
    background: #fff;
    text-align: center;
    position: fixed;
    bottom: 4rem;
    left: 0;
}

.slots_list h2 {
    font-size: 0.4rem;
    line-height: 1rem;
    height: 1rem;
    font-weight: 500;
}

.slots_list span {
    width: 1.5rem;
    height: 0.4rem;
    font-size: 0.3rem;
    position: absolute;
    top: 0.3rem;
    right: 0;
}

.demo_transform3 {
    animation: zhankai 0.3s ease-in both;
}

.demo_transform4 {
    animation: shouqi 0.3s ease-in both;
}

.picker-slot.picker-slot-right {
    text-align: center;
}

@keyframes shouqi {
    0% {
        transform: translate(0, 9rem);
    }

    100% {
        transform: translate(0, 4rem);
    }
}

@keyframes zhankai {
    0% {
        transform: translate(0, 9rem);
    }

    100% {
        transform: translate(0, 4rem);
    }
}

/* 弹框 */

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
    height: 0;
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
    border-bottom: 1px #f2f2f2 solid;
    transform: all 0.3;
}

.main li input {
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

.main li input.left {
    height: 0.89rem;
    line-height: 0.89rem;
    width: 4.7rem;
    padding-left: 0.2rem;
    color: #323232;
    font-size: 0.28rem;
    display: inline-block;
    position: initial;
    background: border-box;
    text-align: left;
    border-right: 1px #f2f2f2 solid;
}

.main li input.right {
    height: 0.89rem;
    line-height: 0.89rem;
    padding-left: 0.2rem;
    width: 1.8rem;
    color: #323232;
    font-size: 0.28rem;
    display: inline-block;
    position: initial;
    background: border-box;
    text-align: left;
}

.main li input.text {
    height: 0.89rem;
    line-height: 0.89rem;
    width: 6.7rem;
    padding-left: 0.2rem;
    color: #323232;
    font-size: 0.28rem;
    display: inline-block;
    position: initial;
    background: border-box;
    text-align: left;
    border-bottom: 1px #f2f2f2 solid;
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
    /* display: none; */
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

.main li .acshow {
    display: none;
}

.main li textarea {
    height: 1.6rem;
    width: 6.8rem;
    color: #323232;
    font-size: 0.28rem;
    padding: 0.3rem 0;
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

.main .btn_icon {
    width: 6.92rem;
    height: 1.03rem;
}

.main .btn_icon i {
    position: inherit;
    float: right;
    display: block;
    width: 0.47rem;
    height: 0.47rem;
    background: url("../../assets/icon_plus.png") no-repeat;
    background-size: 100% 100%;
    margin-top: 0.29rem;
}

.main .btn_icon .icon_minus {
    background: url("../../assets/icon_minus.png") no-repeat;
    background-size: 100% 100%;
    margin-left: 0.16rem;
}

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

.btnTabAc li {
    width: 1.8rem;
}

.btnTabAc .ac i {
    left: 0.62rem;
    display: block;
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

.magin_t {
    width: 3.5rem;
    height: 5rem;
    margin-bottom: 0.4rem;
    /* transform: rotate(-90deg); */
}

.yulanImng {
    position: fixed;
    top: -100rem;
    left: 0.15rem;
    height: 85%;
    width: 7.2rem;
    overflow: scroll;
    z-index: 100;
}

.yulanImng::-webkit-scrollbar {
    -webkit-overflow-scrolling: touch;
}

.yulanImng img {
    height: 14rem;
    width: 12rem;
}

.yulanImng .miaos {
    position: absolute;
    bottom: -1.9rem;
    left: 4.9rem;
    font-size: 0.38rem;
    color: #998bd6;
}

.yulanImngac {
    top: 7%;
}

.isbtnac {
    pointer-events: none;
    background: #ccc;
}

.imgtupian {
    width: 100px;
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
}

.xiazaiwenjian {
    width: 1.7rem;
    position: fixed;
    top: 88.2%;
    left: 4.6%;
    font-size: 0.32rem;
    text-decoration: none;
    text-align: center;
    height: 0.42rem;
    line-height: 0.42rem;
    padding: 0.2rem;
    border: 1px solid;
    border-radius: 0.35rem;
    z-index: 100;
    background: #cce;
}

.xiazaiwenjian1 {
    right: 4.6%;
    left: initial;
}

.base64imgrotimg {
    position: absolute;
    z-index: -100;
    top: 0;
}
</style>

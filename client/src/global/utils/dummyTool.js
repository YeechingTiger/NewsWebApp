/**
 * Created by pz on 2017/6/20.
 */
import URL from "../constants/urlConstants";
import METHOD from "../constants/methodConstants";
import wslTool from "./wslTool";
import network from "./network";
require('babel-polyfill');
class dummyTool {

    // 构造
    constructor() {
        wslTool.getWslLoginUser();
        this.accessToken = "";
        this.refreshToken = ""
        this.signSecret = "";
        this.dummyUser = {};
        this.isInit = false;
        // this.accessToken = "";
        // this.accessToken = "";
    }

    async init() {
        //模拟登陆取得身份
        var that = this;
        var data = wslTool.getWslRequestData(METHOD.AUTHTOKEN, {
            loginType: "01",
            userName: URL.DUMMYUSER.username,
            password: URL.DUMMYUSER.password,
            authCode: URL.DUMMYUSER.authCode
        });
        try {
            let authTokenObj = await network.ajaxPromise(URL.APPSERVER, "post", data);
            //console.log("I1", authTokenObj);
            var {loginKey, signSecret, operatorId} = authTokenObj.resp_data;
            var userCode = authTokenObj.resp_data.userInfo[URL.DUMMYUSER.loginUserNum].userCode;
            var sendData = {loginKey, userCode};
            var data = wslTool.getWslRequestData(METHOD.LOGINCHECK, sendData, "", signSecret);

            //
            that.signSecret = signSecret;
            that.dummyUser = authTokenObj.resp_data.userInfo[URL.DUMMYUSER.loginUserNum];
            that.dummyUser.operatorId = operatorId;
            let loginCheckObj = await network.ajaxPromise(URL.APPSERVER, "post", data)
            // console.log("I2", loginCheckObj);
            that.refreshToken = loginCheckObj.resp_data.refreshToken;
            that.accessToken = loginCheckObj.resp_data.accessToken


            //保存用户信息
            localStorage.setItem("wslUser", JSON.stringify(that.dummyUser));
            localStorage.setItem("signSecret", that.signSecret);
            localStorage.setItem("accessToken", that.accessToken);
            // console.log();
            console.warn("Dummy system 启动成功,用户身份:", await wslTool.getWslLoginUser());
            that.isInit = true;


        } catch (error) {
            console.error("Dummy System 启动失败", error);
        }
        return that;

    }
}
var backDummy = new dummyTool();
if (process.env.PRODUCTION == "true") {
} else {
    // backDummy.init();
}
export default backDummy;
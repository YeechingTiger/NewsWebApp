/**
 * Created by pz on 2017/6/20.
 */
require("./polyfill");
import utils from "./util";
import md5 from "./md5";
import BT from "./basictool";
var wslTool = {
    getWslRequestData: function (method, data, access_token, signSecret) {
        var methodData = {
            access_token: access_token || "123",
            busi_serial: wslTool.getWslBusiSerial(),
            debug_key: "1",
            device_type: "1",
            method: method,
            req_data: data || {},
            timestamp: wslTool.getWslTimestamp(),
        }
        signSecret = signSecret || "";
        // console.log(utils.json2post(methodData) + signSecret, utils.md5(utils.json2post(methodData) + signSecret));
        // console.log("abc",utils.json2post(methodData) + signSecret);
        methodData.sign = md5(utils.json2post(methodData) + signSecret).toUpperCase();
        // methodData
        return methodData;
    },
    getWslTimestamp: function () {
        // console.log("getWslTimestamp");
        return (new Date().Format("yyyyMMddhhmmss"));
    },
    getWslBusiSerial: function () {
        // console.log("getWslBusiSerial",new Date());
        return (new Date().Format("yyyyMMddhhmmss") + utils.CRandomCode(6, "0123456789"));
    },
    //promise获取用户
    getWslLoginUser: function () {
        if (process.env.NODE_ENV == "production") {
            //异步走流程
            return new Promise(function (resolve, reject) {
                // BT.
                BT.GETUSER(function (data) {
                    resolve(data);
                })
            })
        } else {
            return new Promise(function (resolve, reject) {
                // setTimeout(function () {
                var user = localStorage.getItem("wslUser");
                try {
                    if (!user) {
                        throw new Error("沃受理测试用户登录信息不存在，请重新执行Dummy System Init")
                    }
                    ;
                    user = JSON.parse(user);
                } catch (e) {
                    user = {}
                }
                resolve(user);
                // }, 0);
            })
        }
    }
}
export default wslTool;
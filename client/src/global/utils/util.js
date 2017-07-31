// import utilConstants from "../constants/utilConstant";
import md5 from "./md5";
require("./polyfill");
// import * as errorConstants from "../constants/errorConstants";

// import localstorage from "./localstorage";
// import verify from "./verify";
// import network from "./network";
// import wslTool from "./wslTool";
// import sha1 from "./sha1";
// var injectObj = [
//     localstorage,
//     verify,
//     network,
//     wslTool
// ]
var util = {

    // constants: utilConstants,
    // errorConstants: errorConstants,
    // md5: md5,
    // sha1: sha1,

    getPageBaseAddress: function () {
        if (document.location.href.indexOf("#") != -1) {
            return (document.location.href.substr(0, document.location.href.indexOf("#")));
        }
        return document.location.href;
    },
    CRandomCode: function (size, map) {
        var currentMap = (map || utilConstants.RAMDOM_MAP).split('');
        var mapLength = currentMap.length;
        size = size || 4;
        var tempArray = [];
        for (let i = 0; i < size; i++) {
            let randomSeed = Math.floor(mapLength * Math.random());
            tempArray.push(currentMap[randomSeed])
        }
        return tempArray.join("");
    },

    getUrlParam: function () {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },
    isMobileNum: function (phone) {
        if (!(/^1[34578]\d{9}$/.test(phone))) {
            return false;
        }
        return true;
    },
    getTimeStamp: function () {
        return Date.parse(new Date());
    },
    postJSON: function (url, obj, cb) {
        const req = new XMLHttpRequest()
        req.onload = function () {
            cb(JSON.parse(req.response))
        }
        req.open('GET', url)
        req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        //req.setRequestHeader('authorization', localStorage.token)
        req.send(JSON.stringify(obj))
    },
    URLCREATOR: function (data) {
        var sendStr = encodeURIComponent(JSON.stringify(data));
        var requestURL = utilConstants.NETWORK_INTERFACE + sendStr;
        return requestURL;
    },
    json2post: function (json) {
        var ar = [];
        for (var x in json) {
            ar.push(x + '=' + (typeof json[x] == "object" ? JSON.stringify(json[x]) : json[x]));
        }
        return ar.join("&");
    },
    json2get: function (json) {
        var ar = [];
        for (var x in json) {
            ar.push(x + '=' + encodeURIComponent(typeof json[x] == "object" ? JSON.stringify(json[x]) : json[x]));
        }
        return ar.join("&");
    },
    navUrlTran: function (turl, obj) {
        //console.log(turl, turl);
        //提取所有{url}
        var re = /\{[^\}]+\}/g
        if (!turl) {
            return turl;
        }
        if (turl.match(re) && turl.match(re).length > 0) {
            //处理匹配
            var matchlist = turl.match(re);
            for (var x in matchlist) {
                var item = matchlist[x].replace("\{", "").replace("\}", "");
                if (obj[item]) {
                    turl = turl.replace(matchlist[x], obj[item]);
                }
            }
        }
        return turl;
    },
    isLocalRouter: function (url) {
        if (url.substr(0, 1) == "#") {
            return true;
        } else {
            return false;
        }
    },
    formart00: function (s, n) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1], t = "";
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    },
    formatMoney: function (s, n) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "" : "");
        }
        return t.split("").reverse().join("") + "." + r;
    }
}
// util = Object.assign(util, ...injectObj);
export default util;
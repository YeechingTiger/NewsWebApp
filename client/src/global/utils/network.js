import utils from "./util";
// import gAC from "../actionCreators/globalActionCreator";
import BT from "./basictool";
import DummySystem from "./dummyTool";
import wslTool from "./wslTool";
// import  from "./network";
var network = {

    //自适应ajax
    ajax: async function (url, data, wslMethod, loading) {

        if (process.env.PRODUCTION == "true") {
            //调用BT插件;
            return BT.DummyCall("sendAJAX",wslMethod,data,loading);
        } else {
            if (!DummySystem.isInit) {
                await  DummySystem.init()
            }
            console.warn(wslMethod, data, DummySystem.accessToken, DummySystem.signSecret);
            var data = wslTool.getWslRequestData(wslMethod, data, DummySystem.accessToken, DummySystem.signSecret);
            return network.ajaxPromise(url, "POST", data);
        }
    }
    //内部 ajax
    , ajaxPromise: function (url, p2, data) {
        var dataType = "JSON", method;
        if (typeof(p2) == "object") {
            method = p2.method;
            dataType = p2.dataType || dataType;
        } else {
            method = p2;
        }

        method = method && typeof(method) == "string" && method.toUpperCase() || "POST";
        var request = {
            method: method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        if (!method) {
            throw new Error("ajaxRequest方法错误")
        } else if (method == "GET") {
            //处理url 组装参数为url
            let urldata = (utils.json2get(data))
            //判断url 有没有?
            if (url.indexOf("\?") == -1) {
                url += "?";
            }
            if (url.substr(url.length - 1, 1) != "?") {
                url += "&";
            }
            url += urldata;
        } else if (method == "POST") {
            request.body = utils.json2post(data);
        }
        return fetch(url, request)
            .then(response => {
                if (response.status == 400 || response.status == 401 || response.status == 402 || response.status == 403 || response.status == 404 || response.status == 405) {
                    throw new Error("服务器找不到资源错误:" + response.status);
                }
                return response.text()
            })
            .then(responseText => {
                if (!responseText || responseText == "") {
                    throw new Error("服务器返回为空");
                }
                responseText = responseText.replace(/[\r\n]/g, '');

                if (dataType == "JSON") {
                    //console.log(responseText);
                    var backData = (JSON.parse(responseText));
                    if (!backData || !backData.code /*|| backData.code != "0000"*/) {
                        throw new Error(backData.msg);
                    }
                    return backData;
                } else {
                    return (responseText);
                }

            })
        // .catch(function (e) {
        //     console.error("捕获异常", {url, method, data}, e);
        //     fc(e);
        // });
    },

    ajaxRequest: function (url, p2, data, sc, fc) {
        var dataType = "JSON", method;
        if (typeof(p2) == "object") {
            method = p2.method;
            dataType = p2.dataType || dataType;
        } else {
            method = p2;
        }

        method = method && typeof(method) == "string" && method.toUpperCase() || "POST";
        var request = {
            method: method,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        if (!method) {
            console.error("ajaxRequest方法错误,中断")
            return;
        } else if (method == "GET") {
            //处理url 组装参数为url
            let urldata = (utils.json2get(data))
            //判断url 有没有?
            if (url.indexOf("\?") == -1) {
                url += "?";
            }
            if (url.substr(url.length - 1, 1) != "?") {
                url += "&";
            }
            url += urldata;
        } else if (method == "POST") {
            request.body = utils.json2post(data);
        }
        fetch(url, request)
            .then(response => {
                if (response.status == 400 || response.status == 401 || response.status == 402 || response.status == 403 || response.status == 404 || response.status == 405) {
                    throw new Error("服务器找不到资源错误:" + response.status);
                }
                return response.text()
            })
            .then(responseText => {
                if (!responseText || responseText == "") {
                    throw new Error("服务器返回为空");
                }
                responseText = responseText.replace(/[\r\n]/g, '');

                if (dataType == "JSON") {
                    //console.log(responseText);
                    sc(JSON.parse(responseText));
                } else {
                    sc(responseText);
                }

            }).catch(function (e) {
            console.error("捕获异常", {url, method, data}, e);
            fc(e);
        });
    },
    //建立隐藏域实现js post跳转页面
    hiddenPostPage: function (url, data) {
        var inputs = [];
        for (var x in data) {
            inputs.push('<input type="hidden" name="' + x + '" value="' + data[x] + '"/>');
        }
        var form = document.createElement("form");
        form.setAttribute("action", url);
        form.setAttribute("method", "post");

        form.innerHTML = (inputs.join(""));
        form.submit();
    },
    //缓存ajax方法
    canCacheAjax: function (url, data, method, scb, fcb) {
        var hashStr = utils.md5(url + JSON.stringify(data));
        //查hashStr 是否缓存以及缓存时间
        var val = utils.getItem(hashStr);
        if (val) {
            scb((val))
            return;

        }
        utils.ajaxRequest(url, {method: method, dataType: "text"}, data, function (backstr) {
            utils.setItem(hashStr, backstr);
            scb((backstr));
        }, fcb)
    },
    canCacheAjaxCoustomCacheTime: function (url, data, method, cachetime, scb, fcb) {
        var hashStr = utils.md5(url + JSON.stringify(data));
        //查hashStr 是否缓存以及缓存时间
        var val = utils.getItem(hashStr, cachetime);
        if (val) {
            scb((val))
            return;

        }
        utils.ajaxRequest(url, {method: method, dataType: "text"}, data, function (backstr) {
            utils.setItem(hashStr, backstr);
            scb((backstr));
        }, fcb)
    }

}

export default network
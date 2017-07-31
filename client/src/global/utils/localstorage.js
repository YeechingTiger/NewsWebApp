//暂时只兼容localstorage 后续支持cookies
import utils from "./util";
var lc = {
    setItem: function (hash, data) {
        localStorage.setItem(hash, JSON.stringify({data: data, time: utils.getTimeStamp()}));
    },
    getItem: function (hash, exp) {
        //默认过期时间
        exp = exp || utils.constants.CACHETIME;
        try {
            var data = localStorage.getItem(hash);
            data = JSON.parse(data);
            if (data.time && utils.getTimeStamp() - parseInt(data.time) < 1000 * 60 * 60 * exp) {
                return data.data;
            }
            //alert(data.time,utils.getTimeStamp() - parseInt(data.time) < 1000 * 60 * 60 * exp)
        } catch (e) {
        }
    },
    cleanItem: function (hash) {
        localStorage.removeItem(hash);
    },
    cleanAll: function (cb) {
        //清空所有缓存
        localStorage.clear()
        cb();
    }
}

export default lc

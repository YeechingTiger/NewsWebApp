var CONFIG = {
    DEBUG: true,
}
if (process.env.PRODUCTION == "true") {
    CONFIG.DEBUG = false;
}

var BT = function () {

}
BT.DummyCall = function (FNAME, ...args) {
    // console.log(BT, BT[FNAME], typeof BT[FNAME] == "function");
    var promise = new Promise(function (resolve, reject) {
        if (BT && BT[FNAME] && typeof BT[FNAME] == "function") {
            BT[FNAME](function (data) {
                console.log("回传数据",JSON.stringify(data));
                resolve(data);
            }, function (error) {
                reject(error);
            },...args)
        } else {
            reject("错误,BT不存在方法", FNAME);
        }
    });
    return promise
}

BT.endtime = 0;
BT.timestamp = function () {
    return Date.parse(new Date()) / 1000;
};

BT.sendAJAX = function (succall, errcall,url, data,loading) {
    console.log("sendAjax :"+  data + " " + loading+" " +url);
    cordova.exec(
        function(data){
            succall(JSON.parse(data))
        },
        errcall,
        "WslNetPlugin",
        "wsl_post", [url, JSON.stringify(data),loading]
    );

}

BT.GETUSER = function (succall, errcall) {
    cordova.exec(
        function (data) {
            console.log(data);
            var data = JSON.parse(data);
            succall(data);
        },
        function (err) {
            console.log(err);
            errcall(err);
        },
        "ParamPlugin",
        "user_info", [""]
    );


}
BT.showToast = function (msg) {
    if (!CONFIG.DEBUG) {
        cordova.exec(function (succ) {
        }, function (err) {
        }, 'UIPlugin', 'TOAST', [msg]);
    } else {
        alert(msg);
    }
}
BT.showVer = function () {
    if (!CONFIG.DEBUG) {
        cordova.exec(function (succ) {
        }, function (err) {
        }, 'UIPlugin', 'showver', ['1']);
    } else {
        alert('调试模式');
    }
}
BT.showDialog = function (msg, title, call) {
    if (typeof(title) == "function") {
        call = title;
        title = "提示";
    }
    if (!CONFIG.DEBUG) {
        cordova.exec(function (succ) {
            if (typeof(call) == "function") {
                call(succ);
            }
        }, function (err) {
        }, 'UIPlugin', 'showdialog', [msg, title]);
    } else {
        alert(msg);
        if (typeof(call) == "function") {
            call();
        }

    }
}
BT.showDialogNew = function (msg, title, call) {
    if (typeof(title) == "function") {
        call = title;
        title = "提示";
    }
    if (!CONFIG.DEBUG) {
        cordova.exec(function (succ) {
            if (typeof(call) == "function") {
                call(succ);
            }
        }, function (err) {
        }, 'Notification', 'showdialog', [msg, title]);
    } else {
        alert(msg);
        if (typeof(call) == "function") {
            call();
        }

    }
}
BT.jumpURL = function (url) {
    window.location = url;
}
BT.INIT = function () {
    //        使用cordova
    if (!CONFIG.DEBUG) {
        cordova.exec(
            function (data) {
                localStorage.setItem("IMEI", data);
                console.log(data);
                window.location = "html/page/signin.html";
            },
            function (err) {
                console.log(err);
            },
            "InitPlugin",
            "DB_QUERY", ["DB_QUERY"]
        );
    }
}
BT.SIMREAD = function (succall, errcall) {
    if (!CONFIG.DEBUG) {
        cordova.exec(
            function (data) {
                console.log(data);
                var data = JSON.parse(data);
                succall(data);
            },
            function (err) {
                console.log(err);
                errcall(err);
            },
            "ReadWritePlugin",
            "READWRITE", [""]
        );
    }
    else {
        // succall({iccid:'8986011350741121250'})
        succall({iccid: '8986011687404145418'})
    }
}
BT.SIMWRITE = function (writeinfo, succall, errcall) {
    if (!CONFIG.DEBUG) {
        cordova.exec(
            function (data) {
                console.log(data);
                var obj;
                try {
                    obj = JSON.parse(data);
                    if (obj.success == "0") {
                        succall(data);
                    } else {
                        errcall("写卡失败");
                    }
                } catch (e) {
                    errcall("写卡失败");
                }
            },
            function (err) {
                console.log(err);
                errcall(err);
            },
            "ReadWritePlugin",
            "WRITE", writeinfo
        );
    } else {
        succall();
    }
}
BT.OCR_SCAN = function (succall, errcall) {
    if (!CONFIG.DEBUG) {
        cordova.exec(
            function (data) {
                console.log(data);
                var data = JSON.parse(data);
                succall(data);
            },
            function (err) {
                console.log(err);
            },
            "OcrPlugin",
            "OCR", [""]
        );
    } else {
        succall({
            "id": "430623198511296717",   //432524198508090059
            "sex": "男",
            "address": "沅江市建设路435号啊啊啊啊",
            "birthdate": "19891003",
            "userName": "黄平辉",
            "valid_period": "2006040720160407",
            "organize": "长沙市公安局开福分局",
            "nation": "汉族"
        });

    }

}
BT.BARCODE_SCAN = function (succall, errcall) {
    if (!CONFIG.DEBUG) {
        cordova.exec(
            function (data) {
                console.log(data);
                succall(data);
            },
            function (err) {
                console.log(err);
            },
            "BarCodePlugin",
            "BarCodeScan", [""]
        );
    } else {
        // alert(123);
        succall("35377105");
        // return ;
    }
}
BT.TAKE_PHOTO = function (succall, errcall) {
    if (CONFIG.DEBUG) {
        succall('data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMtaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTMxMTAwRjk0MTREMTFFN0FFRDI5QjJFN0VDMzg4RTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTMxMTAwRkE0MTREMTFFN0FFRDI5QjJFN0VDMzg4RTAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1MzExMDBGNzQxNEQxMUU3QUVEMjlCMkU3RUMzODhFMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1MzExMDBGODQxNEQxMUU3QUVEMjlCMkU3RUMzODhFMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uACZBZG9iZQBkwAAAAAEDABUEAwYKDQAACnwAABZJAAAdwQAA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')
    } else {
        cordova.exec(
            function (data) {
                console.log(data);
                succall("data:image/jpg;base64," + data);
            },
            function (err) {
                console.log(err);
            },
            "TakePhotoPlugin",
            "takePhoto", [""]
        );
    }

}

BT.showListDialog = function(action,data,succall, errcall) {
    //        使用cordova
    //console.log("使用cordova");
    cordova.exec(
        function(data) {
            console.log("back--->"+data);
            succall(data);
            //var data = JSON.parse(data);
        },
        function(err) {
            console.log(err);
            errcall(err);
        },
        "Notification",
        action, [data]
    );

};

export default BT;
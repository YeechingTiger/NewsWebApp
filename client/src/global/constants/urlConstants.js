/**
 * Created by pz on 2017/6/20.
 */
var urlConstants = {}

if (process.env.PRODUCTION == "true") {
    //确保上线打包不出错
    urlConstants.PRE = "http://www.73110010.com/weishop";
} else {
    // urlConstants.APPSERVER = "http://134.160.36.204:19401/woaccept/service/commHttpJsonService";
    urlConstants.APPSERVER = "http://192.168.1.114/wslappserver/route";
    urlConstants.APPSERVER = "http://134.160.36.204:2222/app/wslappserver/route";
    //
    // urlConstants.APPSERVER = "http://134.160.36.204:13081/wslappserver/route";
    urlConstants.APPSERVER = "http://119.39.227.91:16322/tstapp/wslappserver/route";

    urlConstants.WSLSERVER = "http://119.39.227.91:16322/app/wslappserver/route";
    urlConstants.DUMMYUSER ={
        loginType:"02",
        username:"Axxh01",
        password:"202cb962ac59075b964b07152d234b70",
        authCode: "808080",
        loginUserNum:"0"   //登陆用户顺序
    }
}

export default urlConstants;
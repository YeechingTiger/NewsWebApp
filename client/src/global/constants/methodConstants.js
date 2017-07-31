/**
 * Created by pz on 2017/6/20.
 */
var methodConstants = {}

if (process.env.PRODUCTION == "true") {
    //确保上线打包不出错
    methodConstants;
} else {
    methodConstants;
}

methodConstants.PRE = "api.wsl.app.wslserver.";
methodConstants.SEARCHWEB_PRE = "api.wsl.app.searchweb.";

methodConstants.AUTHTOKEN = methodConstants.PRE + "authtoken";          //账号登录
methodConstants.LOGINCHECK = methodConstants.PRE + "logincheck";        //选择工位
methodConstants.POSTIDCARDIMG = methodConstants.PRE + "postidcardimg";  //身份证上传
methodConstants.ADDRESSQRY = methodConstants.SEARCHWEB_PRE + 'addressqry';         //标准地址查询

methodConstants.DATATRANSFER = methodConstants.PRE + "datatransfer";      //通用转发


export default methodConstants;
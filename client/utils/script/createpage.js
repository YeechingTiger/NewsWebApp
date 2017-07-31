/**
 * Created by pz on 2017/6/11.
 */
var fs = require("fs");
var fileUtils = require("../utils/fileUtils");
var argv;
try {
    argv = JSON.parse(process.env.npm_config_argv).original;
} catch (ex) {
    argv = process.argv;
}
if (!argv || !argv[2]) {
    console.error("请带参输入页面唯一标识(英文)");
    // return 0;
} else {
    var pageName = argv[2];
    console.log('\x1B[33m%s\x1b[0m', "创建页面中:" + pageName);

    var floors = fs.readdirSync("./src/page");

    // var floorlist = [];
    var used = false;
    for (var item of floors) {
        if (fs.statSync("./src/page/" + item).isDirectory()&&item==pageName) {
            // floorlist.push(item);
            used = true;
        }
    }
    if(used&&false){
        console.log('\x1B[33m%s\x1b[0m', "已存在页面"+pageName+"请重新填写页面名称");
    }else{
        //创建目录
        fs.mkdirSync("./src/page/"+pageName);
        fs.mkdirSync("./src/page/"+pageName+"/route");
        fs.mkdirSync("./src/page/"+pageName+"/store");
        fs.mkdirSync("./src/page/"+pageName+"/redux");
        fs.mkdirSync("./src/page/"+pageName+"/libs");


        var floors = fs.readdirSync("./script/jsTpl");
        for(var v of floors){
            var names = v.split("_");
            fileUtils.copy(__dirname+"/../script/jsTpl/"+v,__dirname+"/../src/page/"+pageName+"/"+names[0]+(names[1]?"/"+names[1]:""));
        }
        console.log(floors);

        //复制模板页面到该处
    }

}


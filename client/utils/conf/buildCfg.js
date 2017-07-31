/**
 * Created by pz on 2017/6/14.
 */
var buildCfg = {};
buildCfg.SRCPWD = "./src";
buildCfg.PAGESPWD = buildCfg.SRCPWD+"/page";

buildCfg.BUILDRESPWD = "./res";
buildCfg.BUILDRES_JSPWD = buildCfg.BUILDRESPWD+"/js";
buildCfg.BUILDRES_CSSPWD = buildCfg.BUILDRESPWD+"/css";


buildCfg.BUILDPWDNAME = "build";
buildCfg.BUILDPWD = "./"+buildCfg.BUILDPWDNAME;
buildCfg.BUILD_LIBPWD = buildCfg.BUILDPWD+"/lib";

buildCfg.LIB_MANIFESTJSON = "lib-manifest.json";

buildCfg.CLIENT_LAUNCHER_RELATIVE_PATH = "/launcher/client.js";





module.exports = buildCfg;
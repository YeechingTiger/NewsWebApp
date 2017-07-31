import utils from "./util";
var verify = {
    checkMobile: function (mobile) {
        return mobile.test(/^1(3[0-2]|5[56]|8[56]|4[5]|7[56])\d{8}$/);
    },
    judgePassword: function (password) {
        var count = 0; //满足的规则数量
        var digital = /[0-9]/; //数字正则
        var capital = /[A-Z]/; //大写字母正则
        var lowercase = /[a-z]/; //小写字母正则
        var spec = /[,.<>{}~!@#$%^&*_]/; //特殊字符正则

        //判断密码是否包含数字
        if (digital.test(password)) {
            count++;
        }

        //判断密码是否包字母
        if (lowercase.test(password) || capital.test(password)) {
            count++;
        }

        //判断密码是否包含大小写
        if (lowercase.test(password) && capital.test(password)) {
            count++;
        }

        //判断密码是否包含特殊字符
        if (spec.test(password)) {
            count++;
        }
        if (count >= 3) {
            return true;
        } else {
            return false;
        }
    }
}

export default verify

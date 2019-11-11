import AuthManager from "./AuthManager"
import AuthUserInfoDialog from "./AuthUserInfoDialog";

export default class LoginManager {

    static login(params: LoginObject, cb) {
        //获取微信code，这是必须操作
        this.getCode(res => {
            let code = res.code
            //获取授权信息，必须经过用户授权才可以获取到用户个人信息
            cb({
                type: 5,
                platform: 6,
                js_code: code,
                device_info: swan.getSystemInfoSync(),
            })
                    
        })
    }
    /**
    * 调用百度登录,和微信不同
    */
    static getCode(cb) {
        swan.login({
            success:res=> {
                cb && cb(res);
            },
            fail:function() { 
                swan.showModal({
                    title: "登录失败",
                    content: "是否重新登录？",
                    cancelText: "退出游戏",
                    success: res => {
                        if (res.confirm) {
                            LoginManager.getCode(cb);
                        }
                        else if (res.cancel) {
                            swan.exit({});
                        }
                    }
                })
            }
        })
    }
  
    static checkSession(o) {
        swan.checkSession({
            success() {
                o.success && o.success()
            },
            fail() {
                o.fail && o.fail()
            }
        })
    }
    /**调用微信获取用户信息接口 */
    static getUserInfo(cb) {
        swan.getUserInfo({
            withCredentials: true,
            lang: "zh_CN",
            success(res) {
                cb && cb(res);
            },
            fail() { }
        })
    }

    static getUserInfoWithoutCredentials(cb) {
        swan.getUserInfo({
            lang: "zh_CN",
            withCredentials: false,
            success(res) {
                cb && cb(res);
            },
            fail() { }
        })
    }

    static showModal(title = '提示', content = '', confirmText = '知道了', confirmCallback = null, cancelText = "", cancelCallback = null) {
        var params: _showModalObject = {
            title: title,
            content: content,
            showCancel: cancelText ? true : false,
            cancelColor: '#000000',
            confirmColor: '#3cc51f',
            cancelText: cancelText,
            confirmText: confirmText,
            success: function (res) {
                if (res.confirm) { confirmCallback && confirmCallback() }
                if (res.cancel) { cancelCallback && cancelCallback() }
            },
            fail() { }
        }
        swan.showModal(params)
    }
}

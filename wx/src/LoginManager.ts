export default class LoginManager {

    static login(params: LoginObject, cb) {
        //获取微信code，这是必须操作
        this.getCode(res => {
            let code = res.code
            cb({
                type: 5,
                platform: 5,
                js_code: code,
                device_info: wx.getSystemInfoSync(),
            })
        })
    }
    /**
    * 调用微信登录
    */
    static getCode(cb) {
        wx.login({
            success(res) {
                cb && cb(res);
            },
            fail() { }
        })
    }
  
    static checkSession(o) {
        wx.checkSession({
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
        wx.getUserInfo({
            withCredentials: true,
            lang: "zh_CN",
            success(res) {
                cb && cb(res);
            },
            fail() { }
        })
    }

    static getUserInfoWithoutCredentials(cb) {
        wx.getUserInfo({
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
        wx.showModal(params)
    }
}

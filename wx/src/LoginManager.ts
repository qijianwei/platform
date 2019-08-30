import AuthManager from "./AuthManager"
import AuthUserInfoDialog from "./AuthUserInfoDialog";

export default class LoginManager {

    static login(params: LoginObject, cb) {
        //获取微信code，这是必须操作
        this.getCode(res => {
            let code = res.code
            //获取授权信息，必须经过用户授权才可以获取到用户个人信息
            this.auth({
                success(){
                    //获取用户信息，用于显示头像和昵称
                    if (params.requestUserInfo) {
                        LoginManager.getUserInfo(userInfo => {
                            cb({
                                type: 5,
                                platform: 5,
                                js_code: code,
                                device_info: wx.getSystemInfoSync(),
                                encrypted_data: userInfo.encryptedData,
                                iv: userInfo.iv,
                            })
                        })
                    } else {
                        cb({
                            type: 5,
                            platform: 5,
                            js_code: code,
                            device_info: wx.getSystemInfoSync(),
                        })
                    }
                },
                fail(){
                    Laya.Dialog.manager = null
                    UIConfig.closeDialogOnSide = false
                    let alert = new AuthUserInfoDialog()
                    alert.onReceiveUserInfo = function(userInfo){
                        cb({
                            type: 5,
                            platform: 5,
                            js_code: code,
                            device_info: wx.getSystemInfoSync(),
                            encrypted_data: userInfo.encryptedData,
                            iv: userInfo.iv,
                        })
                    }
                    alert.popup(true,false)
                }
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
    static auth(p) {
        let _this = this
        AuthManager.auth({
            scope: AuthManager.scope.userInfo,
            success() {
                p.success&&p.success()
            },
            fail() {
                // _this.showModal('授权失败', '请重新授权')
                p.fail&&p.fail()
            },
            alert(alertCb) {
                _this.showModal('提示', '需要您的授权才能正常使用', '去设置', () => {
                    alertCb()
                })
            }
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

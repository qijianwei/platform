export default class AuthManager {
    static scope = {
        userInfo: "scope.userInfo",
        userLocation: "scope.userLocation",
        address: "scope.address",
        invoiceTitle: "scope.invoiceTitle",
        werun: "scope.werun",
        record: "scope.record",
        writePhotosAlbum: "scope.writePhotosAlbum",
        camera: "scope.camera"
    }
    /**
     * 
     * @param scope 想要获取授权的标识，可以使用上面已经列举出来的权限
     * @param suc   授权成功回调
     * @param fail  授权失败回调
     * @param alert 当需要打开用户设置界面时，用于可以修改弹窗内容，方便用户确认操作
     */
    static auth(params: AuthObject) {
        let okHandler = function () {
            wx.openSetting({
                success(res) {
                    let result = res.authSetting[params.scope];
                    if (result) {
                        params.success && params.success()
                    } else {
                        params.alert && params.alert(okHandler)
                    }
                },
                fail() {
                    params.fail && params.fail()
                }
            })
        }
        wx.getSetting({
            success(res) {
                let result = res.authSetting[params.scope];
                if (result == undefined) { //没有获取过权限
                    /**如果请求用户权限失败，则直接return */
                    if (params.scope == AuthManager.scope.userInfo){
                        params.fail&&params.fail()
                        return
                    }
                    wx.authorize({
                        scope: params.scope,
                        success(res) {
                            params.success && params.success()
                        },
                        fail() {
                            params.alert && params.alert(okHandler)
                        },
                        complete() { }
                    })
                } else if (!result) { //当前权限为否
                    params.alert && params.alert(okHandler)
                } else {
                    params.success && params.success()
                }
            }
        })
    }
}

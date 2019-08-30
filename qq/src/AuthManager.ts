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
        params.success()
    }
}

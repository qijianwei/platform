export default class AuthUserInfoDialog extends Laya.Dialog {
    onReceiveUserInfo:Function
    constructor(){
        super()
        this.size(636,508)
        let image = new Laya.Image('local/auth/bg.png')
        this.addChild(image)
    }
    onOpened(){
        let frame = {
            x:26,
            y:400,
            width:588,
            height:85
        }
        let pos = this.localToGlobal(new Laya.Point(frame.x,frame.y))
        this.showUserInfoButton({
            x:pos.x,
            y:pos.y,
            width:frame.width,
            height:frame.height
        },(userInfo)=>{
            this.onReceiveUserInfo&&this.onReceiveUserInfo(userInfo)
            this.close()
        })
    }

    showUserInfoButton(rect,cb) {
        var stage = Laya.stage
        var screenWidth = Laya.Browser.width
        var screenHeight = Laya.Browser.height
        var width = stage.designWidth
        var height = stage.designHeight
        var scaleX = screenWidth / width
        let scale = scaleX/Laya.Browser.pixelRatio
        let style: WXUserInfoButtonStyle = {
            top: rect.y*scale,
            left: rect.x*scale,
            width: rect.width*scale,
            height: rect.height*scale,
            backgroundColor: '#ffffff',
            borderColor: '#ffffff',
            borderRadius: 10,
            borderWidth: 0,
            textAlign: 'center',
            fontSize: 24,
            lineHeight: 10
        }
        let button = wx.createUserInfoButton({
            type: 'image',
            image: 'local/auth/button.png',
            style: style,
            withCredentials: true,
            lang: 'zh_CN'
        })
        button.onTap((res) => {
            if (res.userInfo){
                cb(res)
                button.destroy()
            }
        })
    }
}
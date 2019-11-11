export default class AuthUserInfoDialog extends Laya.Dialog {
    onReceiveUserInfo:Function
    isNecessary:boolean
    constructor(isNecessary?:boolean){
        super()
        if(isNecessary!=undefined){
            this.isNecessary=isNecessary;
        }else{
            this.isNecessary=false;
        }
        this.size(636,508)
        let image = new Laya.Image('local/auth/bg.png')
        this.addChild(image)
    }
    onOpened(){
        let frame = {
            x: 26,
            y: 400,
            width: 588,
            height: 85
        };
        let pos = this.localToGlobal(new Laya.Point(frame.x,frame.y))
        this.showUserInfoButton({
            x:pos.x,
            y:pos.y,
            width:frame.width,
            height:frame.height
        })
    }

    showUserInfoButton(rect) {
        var stage = Laya.stage
        var screenWidth = Laya.Browser.width
        var screenHeight = Laya.Browser.height
        var width = stage.designWidth
        var height = stage.designHeight
          /* 这是竖版 */
       /*  var scaleX = screenWidth / width; */
        var scaleX = screenHeight / height;
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
        let button = swan.createUserInfoButton({
            type: 'image',
            image: 'local/auth/button.png',
            style: style,
            withCredentials: true,
            lang: 'zh_CN'
        })
        button.onTap((res) => {
            if (res.userInfo||!this.isNecessary){
                this.onReceiveUserInfo&&this.onReceiveUserInfo(res)
            }
            this.close()
            button.destroy()
        })
    }
}
interface GameStatus {
    /**游戏id	游戏的唯一标识 */
    gameId: number
    /**当前用户的标识	用户的唯一标识 */
    openId: string
    /**是否是房主	1为房主，0为参加者 */
    isMaster: number
    /**房间号	房主时为0，参加者时为具体房间号 */
    roomId: number
    /**游戏版本号	与游戏包强绑定的版本号。手Q测依赖此进行版本更新 */
    gameVersion: string
    /**平台类型	取值为 "ios"或"android" */
    platform: string
    /**手机qq版本	形如"7.1.0.0" */
    QQVer: string
    /**是否首次安装	1为首次安装 0非首次安装 */
    isFirstInstall: number
    /**是否第一次打开	1为第一次玩游戏 0非第一次。使用BK.Room的成员函数startGame后，置为0 */
    isFirstPlay: number
    /**网络类型	游戏启动时的网络类型。 1 电信 ，2 联通 ，3 移动 0: wifi或未知 */
    networkType: number
    /**游戏启动入口	100:实时PK，200:聊天窗游戏消息 */
    /**具体参考值为 https://hudong.qq.com/docs/engine/engine/native/framework/intro.html */
    src: number
    /**厘米秀小人spine动画的设计高度	点击查看厘米秀骨骼动画章节 */
    spriteDesignHeight: number
    /**厘米秀小人spine骨骼	点击查看厘米秀骨骼动画章节 */
    skltPath: number
    /**厘米秀衣服路径	点击查看厘米秀骨骼动画章节 */
    dressPath: object
    /**性别	1 男 2 女 */
    sex: number
    /**操作系统版本	例如"11.3" 表示iOS 11.3 */
    osVersion: string
    /**扩展参数	当使用其他玩家使用BK.QQ.shareToArk分享至手Q,并且填充扩展字段时，当前玩家就能从此处获取该数据 */
    gameParam: string
    /**当前聊天窗类型	1.双人聊天 4.群 5.讨论组 */
    aioType: number
    /**游戏类型	(手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏 */
    gameType: number
    /**网络连接类型	(手Q7.6.5及以上支持)，unknown:-1, no:0, wifi:1, 2G:2, 3G:3, 4G:4, CABLE:5 */
    connType: number
    /**访问密钥码	(手Q7.6.5及以上支持) 用于开发者自建服务器与腾讯服务器进行鉴权服务 0 ：老游戏不需要这个字段， 1：获取成功， 2：获取失败 */
    accessTokenCode: number
    /**访问密钥	(手Q7.6.5及以上支持) 用于开发者自建服务器与腾讯服务器进行鉴权服务 */
    accessToken: string
    /**游戏控制位	(手Q7.7.0及以上支持) */
    commFlagBits: number
    /**具体机型	(手Q7.6.3及以上支持) 形如 "PRO 6 Plus" */
    model: string
}
interface QQSystemInfo {
    /**游戏版本号 */
    gameVersion: string
    /**是否房主，1房主，0参加者 */
    isMaster: number
    /**房间号 */
    roomId: number
    /**游戏id */
    gameId: number
    /**系统版本 10.3 */
    osVersion: string
    /**网络类型 1 电信 ，2 联通 ，3 移动 0: wifi或未知 */
    networkType: number
    /**取值为 ios或android */
    platform: string
    /**当前用户的标识 */
    openId: string
    /**手机qq版本 */
    QQVer: string
    /**是否首次安装 1为首次安装 0非首次安装 */
    isFirstInstall: number
    /**当前聊天窗类型 1.双人聊天 4.群 5.讨论组 */
    aioType: number
    /**游戏启动入口 100:实时PK，200:聊天窗游戏消息 */
    src: number
    /**是否为该游戏管理账号用户，1是，0否 */
    isWhiteUser: number
    /**游戏类型 (手Q7.6.5及以上支持) 0: 普通游戏 1：红包游戏 */
    gameType: number
    /**具体机型 (手Q7.6.3及以上支持) 形如 "PRO 6 Plus" */
    model: number
    /**性别 1 男 2 女 */
    sex: number
    /**仅在开发环境下可以，手q环境下无该字段 */
    devPlatform: string
}
declare const GameStatusInfo: GameStatus
declare module BK {
    class QQ {
        static fetchOpenKey(cb: (errCode: number, cmd: string, data: FetchOpenKeyObject) => void): void
        static scoreUpload(data: Array<ScoreData>, cb: (errCode: number, cmd: string, data: FetchOpenKeyObject) => void): void
        static skipGame(desGameId: number, extendInfo: string)
        static createShortCut(extendInfo: string)

        // 当前不支持一次同时拉取多个排行榜，需要拉取多次，而且必须等上一个拉取回来后才能拉取另外一个排行榜
        // 先拉 score 排行榜
        /**
         * var attr = "score";//使用哪一种上报数据做排行，可传入score，a1，a2等
         * var order = 1;     //排序的方法：[ 1: 从大到小(单局)，2: 从小到大(单局)，3: 由大到小(累积)]
         * var rankType = 0; //要查询的排行榜类型，0: 好友排行榜
         */
        // 必须配置好周期规则后，才能使用数据上报和排行榜功能
        static getRankListWithoutRoom(attr: string, order: number, rankType: number, res: (errCode, cmd, data) => void)
        // gameMode: 游戏模式，如果没有模式区分，直接填 1
        // 必须配置好周期规则后，才能使用数据上报和排行榜功能
        static uploadScoreWithoutRoom(gameMode: number, data: any, res: (errCode, cmd, data) => void)
    }
    class Room {
        /** 1：赢，0：输，2：平局 */
        showOneMorePage(isWinner: number, openIds: Array<string>)
    }
    class UI {
        static showToast(params: QQToastObject)
        static hideToast(params: QQUIObject)
        static showLoading(params: QQLoadingObject)
        static hideLoading(params: QQUIObject)
        static showAlert(params: QQAlertObject)
    }
    class Device {
        static keepScreenOn(p: QQKeepScreenOnObject)
    }
    class Game {
        constructor(params: GameParams)
    }
    class Share {
        static share(params: ShareObject)
    }
    class Advertisement {
        static createVideoAd()
        static createBannerAd(params)
    }
    module MQQ {
        class Account {
            /**@warn 函数并不会为每个openId绑定一个callback函数。若多次调用getNick函数，最终只会调用最后一次绑定的callback。因此开发者需要在此函数作分发动作 */
            static getNick(openID: string, cb: (openID: string, nick: string) => void): void
            /**获取头像 并写到本地目录 imgPath为头像保存至本地的路径*/
            static getHeadEx(openID: string, cb: (openID: string, imgPath: string) => void): void
        }
    }
    /**其他方法 */
    export function getSystemInfoSync(): QQSystemInfo
    export function onAudioInterruptionStart(listener)
    export function onAudioInterruptionEnd(listener)

    /**生命周期方法 */
    export function onEnterForeground(Function)
    export function offEnterForeground(Function)
    export function onEnterBackground(Function)
    export function offEnterBackground(Function)
    export function onGameClose(Function)
    export function offGameClose(Function)
    export function onMaximize(Function)
    export function offMaximize(Function)
    export function onMinimize(Function)
    export function offMinimize(Function)
    export function onNetworkChange(p: (p: NetworkChangeNotification) => void)
    export function offNetworkChange(Function)
    export function onGameShareComplete(p: (p: GameShareNotification) => void)
    export function offGameShareComplete(Function)
    export function onGameShare(Function)
    export function offGameShare(Function)
}
interface FetchOpenKeyObject {
    openKey: string
}
interface GameParams {
    /**程序启动事件。游戏脚本加载完成后，进到此处 */
    onLoad(app, src: number, roomId: number)
    /**游戏关闭事件。用户点击右上角"关闭"图标，关闭游戏*/
    /**@warn 开发者需处理销毁动作：上报用户成绩 */
    onClose(app)
    /**最大化事件，用户点击"收起游戏" */
    onMaximize(app)
    /**最小化事件，用户点击"收起游戏" */
    onMinmize(app)
    /**退后台事件。用户按home键将手Q退至后台 */
    onEnterBackground(app)
    /**回到前台事件。手Q进程从后台回到前台 */
    onEnterForeground(app)
    /**分享事件。用户点击 “分享游戏”后触发 */
    /**@warn 手Q 7.6.5 后支持分享多渠道，开发者可自定义分享的数据 */
    /**多渠道分享指 开发者可以通过返回特定类型的数据，达到自定义分享数据的效果 通过返回带有特定字段的数据 */
    /**
     *  字段	          类型	 说明
        summary	        string	分享至QQ中，聊天窗气泡-标题
        picUrl	        string	分享至QQ中，必须为url，聊天窗气泡-图片
        extendInfo	    string	分享至QQ中，必须为string，用于聊天窗气泡-额外信息
        localPicPath	string	分享图片，必须为GameRes://或GameSandBox://为前缀。用于分享至 空间、微信、朋友圈
     */
    /**
     * 本分享与BK.QQ.Share相同，具体查看此处,分享成功/失败后，触发onShareComplete函数
     */
    onShare(app)
    /**分享结果事件。返回分享结果 */
    /**
     * 
     * @param app 
     * @param retCode 
     * @param shareDest 
     * @param isFirstShare 
     */
    onShareComplete(app, retCode: number, shareDest: number, isFirstShare)
    /**网络环境切换事件。网络环境进行切换时会触发本事件 */
    /**
     * 具体state的取值标识不同的切换情况。取值如下
     * 取值	说明
        1	无网络到蜂窝网络
        2	无网络到wifi
        3	蜂窝网络到wifi
        4	蜂窝网络到无网络
        5	wifi到无网络
        6	wifi网络到蜂窝网络
     */
    onNetworkChange(app, state)
    /**全局js异常/错误 */
    onException(app)
}
interface ScoreInfo {
    /**当游戏不为平局但两个玩家分数相同，需要填入 */
    winner: number
    /**用户得分，必须上报 */
    score: number
    /**附加参数，上报和使用都由第三方决定，最多支持5个附加参数，可选 */
    a1: any
    a2: any
}
interface ActInfo {
    /**活动数据由第三方配置定义，key值统一用p1,p2 */
    p1: any
    p2: any
}
interface ScoreData {
    openId: string
    scoreInfo: ScoreInfo
    actInfo: ActInfo
}
interface ShareObject {
    qqImgUrl: string  //分享到QQ的图片网络链接
    socialPicPath: string //分享到空间、微信、朋友圈的图片本地路径，可选，默认为游戏二维码，仅支持本地路径
    title: string //分享标题，可选，默认为'轻游戏'
    summary: string //分享内容，可选，默认为'一起来玩游戏吧~'
    extendInfo: string //扩展信息，可选，默认为‘’
    success: Function
    fail: Function
}
interface QQUIObject {
    /**接口调用结束的回调函数 选填 */
    complete?: () => void
}
interface QQToastObject extends QQUIObject {
    /**提示的内容 */
    title: string
    /**延迟时间 默认：2000ms */
    duration: number
}
interface QQLoadingObject extends QQUIObject {
    title: string
}
interface QQAlertObject {
    /**弹框标题 */
    title: string
    /**弹框内容 */
    content: string
    /**（comfirm 参数为 true 代表点击确认按钮， cancel 参数为 true 代表点击取消按钮） */
    success: (res: QQAlertSuccessObject) => void
    complete?: () => void
}
interface QQAlertSuccessObject {
    confirm: boolean
    cancel: boolean
}
interface QQKeepScreenOnObject {
    /**
     * true为保持屏幕常亮
     * false为取消屏幕常亮 
    */
    isKeepOn: boolean
}
interface NetworkChangeNotification {
    /**
     * state取值：

    {
        'NoneToMobileNetwork' = 1,   //无网络到移动网络
        'NoneToWifi' = 2,            //无网络到WiFi网络
        'MobileNetworkToWifi' = 3,     //移动网络到WiFi网络
        'MobileNetworkToNone' = 4,   //移动网络到无网络
        'WifiToNone' = 5,            //WiFi到无网络
        'WifiToMobileNetwork' = 6     //WiFi到移动网络
    }
     */
    state: number
}
interface GameShareNotification {
    /**0为成功 1为失败 2为取消 */
    retCode: number
    /**0为QQ 1为QZone 2为微信 3为朋友圈 */
    shareDest: number
    /**是否为第一次分享 */
    isFirstShare: boolean
}
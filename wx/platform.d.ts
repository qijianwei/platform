declare const py: PlatformInterface

declare interface PlatformInterface {

    init()
    isMiniGame(): boolean
    login(params: LoginObject, cb: (res: LoginSuccessObject) => void)
    auth(params: AuthObject)
    getUserInfo(params:GetUserInfoObject)

    stopGame?(result: GameResult)

    onShow(listener: (res: LaunchOption) => void)
    offShow(listener)
    onHide(listener: (res) => void)
    offHide(listener)

    getLaunchOptionsSync(): LaunchOption
    getSystemInfoSync(): object

    onShareAppMessage(listener: () => object)
    shareAppMessage(params: ShareInfo)
    getShareInfo(params)

    setKeepScreenOn(p: KeepScreenOnObject)

    getUpdateManager(): UpdateManager

    /**Andriod 发送游戏快捷方式到桌面 */
    createShortCut?(info: object)

    navigateToMiniProgram(params: NavigateToMiniProgramObject)
    exit(params?: any)

    /**声音 */
    onAudioInterruptionBegin(listener)
    onAudioInterruptionEnd(listener)

    /**支付 */
    requestPayment(params: PaymentObject)

    /**网络 */
    getNetworkType(params)
    onNetworkStatusChange(listener)
    offNetworkStatusChange(listener)

    /**Toast */
    showToast(object: ToastObject): void
    hideToast(params?: BaseObject): void
    showModal(params: ModalObject): void
    showLoading(params: LoadingObject): void
    hideLoading(params?: BaseObject): void
    showActionSheet(params: ActionSheetObject): void

    /**广告 */
    createBannerAd(params: BannerAdObject): BannerAd
    createRewardedVideoAd(params: RewardedVideoAdObject): RewardedVideoAd

    /**以下接口只针对微信有效 */
    setUserCloudStorage(params: UserCloudStorageObject): void
    openCustomerServiceConversation()
    previewImage(params: PreviewImageObject)
    setClipboardData(params: ClipboardDataObject)

    /**QQ特有接口 */
    requestFriendRankList?(p: FriendRankList)
    uploadScore?(p:UploadScoreObject)
}

declare class UpdateManager {
    onCheckForUpdate(listener: (res) => void)
    onUpdateReady(listener: Function)
    onUpdateFailed(listener: Function)
    applyUpdate()
}
interface GetUserInfoObject {
    openId:string
}
interface FailObject {
    errMsg: string
    errCode: number
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
declare interface GameResult {
    win: number
    result: Array<ScoreData>
}
interface BaseObject {
    success?: (res?:any) => void
    fail?: (res:FailObject) => void
    complete?: () => void
}
interface LaunchExtraData {
    baseURL?: string
    token?: string
    to: number
    p?: Object
}
interface LaunchReferrerInfo {
    extraData: LaunchExtraData
}
interface LaunchOption {
    path: string
    scene: number
    query: Object
    shareTicket?: string
    referrerInfo?: LaunchReferrerInfo
}
interface PaymentObject {
    env?: number
    offerId?: string
    currencyType?: string
    platform?: string
    buyQuantity: number
    zoneId?: string
    success: Function
    fail?: Function
}
interface AuthObject {
    scope: string,
    success: Function,
    fail: Function,
    alert: Function
}
interface LoginObject {
    requestUserInfo: boolean
}
interface LoginSuccessObject {
    code: string
    userInfo: any
}
interface ToastObject {
    /**
     * 提示的内容
     */
    title: string;

    /**
     * 图标，有效值 "success", "loading", "none"，默认：success
     */
    icon?: string;

    /**
     * 自定义图标的本地路径，image 的优先级高于 icon
     */
    image?: string;

    /**
     * 提示的延迟时间，单位毫秒，默认：1500
     */
    duration?: number;

    /**
     * 是否显示透明蒙层，防止触摸穿透，默认：false
     */
    mask?: boolean;

    /**
     * 接口调用成功的回调函数
     */
    success: () => void;

    /**
     * 接口调用失败的回调函数
     */
    fail?: () => void;

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => void;
}
interface ModalObject {
    /**
     * 提示的标题
     */
    title: string;

    /**
     * 提示的内容
     */
    content: string;

    /**
     * 是否显示取消按钮，默认为 true
     */
    showCancel?: boolean;

    /**
     * 取消按钮的文字，默认为"取消"，最多 4 个字符，默认：取消
     */
    cancelText?: string;

    /**
     * 取消按钮的文字颜色，默认为"#000000"
     */
    cancelColor?: any;

    /**
     * 确定按钮的文字，默认为"确定"，最多 4 个字符，默认：确定
     */
    confirmText?: string;

    /**
     * 确定按钮的文字颜色，默认为"#3CC51F"
     */
    confirmColor: any;

    /**
     * 接口调用成功的回调函数
     */
    success: (result: ModalSuccessObject) => void;

    /**
     * 接口调用失败的回调函数
     */
    fail?: () => void;

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => void;
}
interface ModalSuccessObject {
    /**为 true 时，表示用户点击了确定按钮 */
    confirm: boolean
    /**为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭） */
    cancel: boolean
}
interface LoadingObject extends BaseObject {
    title: string
    mask?: boolean
}
interface ActionSheetObject {
    /**按钮的文字数组，数组长度最大为 6 */
    itemList: Array<string>
    /**按钮的文字颜色 默认值：#000000*/
    itemColor?: string
    success: (res: ActionSheetSuccessObject) => void
    fail?: () => void
    complete?: () => void
}
interface ActionSheetSuccessObject {
    /**用户点击的按钮序号，从上到下的顺序，从0开始 */
    tapIndex: number
}
interface UserCloudStorageObject extends BaseObject {
    /**要修改的 KV 数据列表 */
    KVDataList: Array<KVData>
}
interface KVData {
    key: string
    value: string
}
interface BannerAdObject {
    /**广告单元 id */
    adUnitId: string
    viewId: number //必填。1001静态banner，1002动态banner，1003 广点通banner(7.8.0)
    style: BannerAdStyleObject //选填。viewId为1003时生效
}
interface BannerAdStyleObject {
    x: number
    y: number
    /**banner 广告组件的左上角横坐标 */
    left: number
    /**banner 广告组件的左上角纵坐标 */
    top: number
    /**banner 广告组件的宽度 */
    width: number
    /**banner 广告组件的高度 */
    height?: number
    /**banner 广告组件经过缩放后真实的宽度 */
    realWidth?: number
    /**banner 广告组件经过缩放后真实的高度 */
    realHeight?: number
}
interface BannerAd {
    /**显示 banner 广告 */
    show(): any
    /**隐藏 banner 广告 */
    hide(): any
    /**销毁 banner 广告 */
    destroy()
    /**监听 banner 广告尺寸变化事件 */
    onResize(listener)
    /**取消监听 banner 广告尺寸变化事件 */
    offResize(listener)
    /**监听 banner 广告加载事件 */
    onLoad(listener)
    /**取消监听 banner 广告加载事件 */
    offLoad(listener)
    /**监听 banner 广告错误事件 */
    onError(listener)
    /**取消监听 banner 广告错误事件 */
    offError(listener)
}
interface RewardedVideoAdObject {
    /**广告单元 id */
    adUnitId: string
}
interface RewardedVideoAd {
    /**隐藏激励视频广告 */
    load(): Promise<any>
    /**显示激励视频广告。激励视频广告将从屏幕下方推入 */
    show(): Promise<any>
    /**监听激励视频广告加载事件 */
    onLoad(listener)
    /**取消监听激励视频广告加载事件 */
    offLoad(listener)
    /**监听激励视频错误事件 */
    onError(listener)
    /**取消监听激励视频错误事件 */
    offError(listener)
    /**监听用户点击 关闭广告 按钮的事件 */
    onClose(listener)
    /**取消监听用户点击 关闭广告 按钮的事件 */
    offClose(listener)
}
interface NavigateToMiniProgramObject {
    /**
     * 要打开的小程序 appId
     */
    appId: string;

    /**
     * 打开的页面路径，如果为空则打开首页
     */
    path?: string;

    /**
     * 需要传递给目标小程序的数据，目标小程序可在 `App.onLaunch()`，`App.onShow()` 中获取到这份数据。[详情](../framework/app-service/app.md)
     */
    extraData?: object;

    /**
     * 要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版） ，仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是体验版或正式版，则打开的小程序必定是正式版。默认值 release
     */
    envVersion?: string;

    /**
     * 接口调用成功的回调函数
     */
    success: (result: NavigateToMiniProgramSuccessObject) => void;

    /**
     * 接口调用失败的回调函数
     */
    fail?: () => void;

    /**
     * 接口调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?: () => void;
}
interface NavigateToMiniProgramSuccessObject {
    /**
     * 调用结果
     */
    errMsg: string
}
interface PreviewImageObject extends BaseObject {
    /**
     * 当前显示图片的链接，不填则默认为 urls 的第一张
     */
    current?: string

    /**
     * 需要预览的图片链接列表
     */
    urls: any
}
interface ClipboardDataObject extends BaseObject {
    /**
     * 需要设置的内容
     */
    data: string
}
interface ShareInfo {
    title: string
    summary: string
    imageUrl: string //
    imagePath?: string //本地路径，默认为游戏根目录下的share.png
    query: string
    success: (res: ShareInfoSuccess) => void
    fail: (code: number, msg: object) => void
}
interface ShareInfoSuccess {
    code: number
    data: ShareInfoSuccessData
    shareTickets?: string
}
interface ShareInfoSuccessData {
    ret: number //成功：0；失败：1；取消：2
    isFirstShare: number //是否首次分享：首次分享：1；非首次分享：0
    aioType: number //当前聊天窗类型：双人聊天：1；群：4；讨论组：5
    shareTo: number //分享渠道：QQ：0；QZone：1；微信：2；朋友圈：3
}
interface FriendRankItem {
    /**头像的 url */
    url: string
    /**昵称 */
    nick: string
    /**分数 */
    score: number
    /**是否是自己 */
    selfFlag: boolean
}
interface FriendRankListSuccessData {
    ranking_list: Array<FriendRankItem>
}
interface FriendRankListSuccess {
    data: FriendRankListSuccessData
}
interface FriendRankList {
    success: (res: FriendRankListSuccess) => void
    fail: (res:FailObject) => void
}
interface UploadScoreObject extends BaseObject{
    /**用户分数 */
    score:number
    /**必填，游戏开始时间，单位为毫秒,结束时间已在SDK中处理，开发者不用关心 */
    startTime:number
}
interface KeepScreenOnObject {
    /**
     * true为保持屏幕常亮
     * false为取消屏幕常亮 
    */
    isKeepOn: boolean
}
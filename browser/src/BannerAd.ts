export default class BannerAd {
    constructor(params: BannerAdObject) {
      
    }
    /**显示 banner 广告 */
    show() {
      return new Promise((resolve,reject)=>{
           this.listenerError()
           reject(`当前版本不支持广告`);
      })
    }
    /**隐藏 banner 广告 */
    hide() {
        return new Promise((resolve,reject)=>{
          this.listenerError()
            reject(`当前版本不支持广告`);
       })
    }
    /**销毁 banner 广告 */
    destroy() {

    }
    /**监听 banner 广告尺寸变化事件 */
    onResize(listener) {
    
    }
    /**取消监听 banner 广告尺寸变化事件 */
    offResize(listener) {
    
    }
    /**监听 banner 广告加载事件 */
    onLoad(listener) {
      
    }
    /**取消监听 banner 广告加载事件 */
    offLoad(listener) {
      
    }
    /**监听 banner 广告错误事件 */
    onError(listener) {
      this.listenerError=listener;
    }
    /**取消监听 banner 广告错误事件 */
    offError(listener) {
    
    }
    listenerError(){
        
    }
}
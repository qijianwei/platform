const localStorage = {
    get length() {
      console.warn('获取localStorage的length并没有实现，固定返回0')
      return 0
    },
  
    key(n) {
    //   return BK.localStorage.key(n)
    return ''
    },
  
    getItem(key) {
    //   return BK.localStorage.getItem(key)
    return ''
    },
  
    setItem(key, value) {
    //   return BK.localStorage.setItem(key,value);
    return ''
    },
  
    removeItem(key) {
    //   BK.localStorage.removeItem(key)
    },
  
    clear() {
    //   BK.localStorage.clear()
    }
  }
  let _window = window as any
  _window.localStorage = localStorage
  export default localStorage
  
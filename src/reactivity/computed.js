/*
 * @Date: 2022-04-12 17:19:46
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-12 17:50:55
 * @FilePath: /mini-vue/src/reactivity/computed.js
 */
// computed 有 function 参数 和 options 参数两种方式
// function 自己手动实现 getter setter 

const { effect, track, trigger } = require('./util')
// options 
function computed(fncOrOps) {
  let getter, setter
  if (typeof fncOrOps === 'function') {
    // 函数传入
    getter = fncOrOps
    setter = () => console.warn('计算属性不可修改')
  } else {
    getter = fncOrOps.get
    setter = fncOrOps.set
  }
  return new computedTpl(getter, setter)
}
class computedTpl {
  constructor(getter, setter) {
    this._getter = getter
    this._setter = setter
    this._cacheValue = void 0
    this._dirty = true
    this.effect = effect(getter, {
      scheduler: () => {
        if (!this._dirty) {
          this._dirty = true
          trigger(this, 'value')
        }
      }
    })
  }
  get value() {
    track(this, 'value')
    if (this._dirty) {
      this._dirty = false
      this._cacheValue = this.effect()
    }
    return this._cacheValue
  }
  set value(val) {
    this._setter(val)
  }
}
module.exports = {
  computed
}
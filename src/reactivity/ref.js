/*
 * @Date: 2022-04-12 16:33:34
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-12 17:45:01
 * @FilePath: /mini-vue/src/reactivity/ref.js
 */
const { reactive } = require("./reactive")
const { trigger, track } = require("./util")
function ref(val,shallow = false) {
  if (isRef(val)) {
    return val
  }
  return new RefImpl(val,shallow)
}
function isRef(val) {
  return !!(val && val.__isRef)
}
class RefImpl {
  constructor(val,shallow) {
    this.__isRef = true
    this._val = convert(val,shallow)
    this._shallow = shallow
  }
  get value() {
    // track getter 放进 targetMap 中
    track(this, 'value')
    return this._val
  }
  set value(val) {
    if (val !== this._val) {
      this._val = convert(val,this._shallow)
      // 发生变化触发 trigger
      trigger(this, 'value')
    }

  }
}
function convert(val,shallow) {
  return typeof val === 'object' && val !== null  || shallow? reactive(val) : val
}
module.exports = {
  ref
}
/*
 * @Date: 2022-04-12 16:33:34
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-12 16:50:30
 * @FilePath: /mini-vue/src/reactivity/ref.js
 */
const { reactive } = require("./reactive")
const { trigger, track } = require("./util")
function ref(val) {
  if (isRef(val)) {
    return val
  }
  return new RefImpl(val)
}
function isRef(val) {
  return !!(val && val.__isRef)
}
class RefImpl {
  constructor(val) {
    this.__isRef = true
    this._val = convert(val)
  }
  get value() {
    // track getter 放进 targetMap 中
    track(this, 'value')
    return this._val
  }
  set value(val) {
    if (val !== this._val) {
      this._val = convert(val)
      // 发生变化触发 trigger
      trigger(this, 'value')
    }

  }
}
function convert(val) {
  return typeof val === 'object' && val !== null ? reactive(val) : val
}
module.exports = {
  ref
}
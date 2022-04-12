/*
 * @Date: 2022-04-11 16:20:19
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-12 16:22:01
 * @FilePath: /mini-vue/src/reactivity/mutableHandlers.js
 */

// const { reactive } = require("./reactive")
const { trigger, track } = require("./util")
// 只处理 getter 和 setter
const get = createGetter()
const set = createSetter()
// shallow 
function createGetter(shallow = false) {
  return function get(target, key, receiver) {
    // 使用反射获取值
    const res = Reflect.get(target, key, receiver)
   
    // track 收集依赖
    track(target, "get", key)
    // 看是不是浅层代理
    // if (typeof res === 'object' && res !== null) {
    //   return shallow ? res : reactive(res)
    // }
    return res
  }
}
function createSetter() {
  return function set(target, key, value, receiver) {
    // 使用反射更新数据
    const result = Reflect.set(target, key, value, receiver)
    // 出发 track 收集的依赖
    trigger(target, "set", key)
    // 返回更新结果
    return result
  }
}

module.exports = {
  mutableHandlers: {
    get,
    set
  }
}
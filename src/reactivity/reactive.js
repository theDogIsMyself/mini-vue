/*
 * @Date: 2022-04-11 16:18:39
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-11 16:19:48
 * @FilePath: /mini-vue/src/reactivity/reactive.js
 */

export function reactive(target){
  return new Proxy(target,mutableHandlers)
}
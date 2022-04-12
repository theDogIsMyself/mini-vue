/*
 * @Date: 2022-04-11 16:18:39
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-12 15:54:44
 * @FilePath: /mini-vue/src/reactivity/reactive.js
 */
const {mutableHandlers} = require('./mutableHandlers')
 const reactive = function(target){
  return new Proxy(target,mutableHandlers)
}
module.exports = {reactive}
/*
 * @Date: 2022-04-12 15:47:28
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-12 16:24:27
 * @FilePath: /mini-vue/src/reactivity/index.js
 */
const { reactive } = require("./reactive");
const { effect } = require("./util");
const obj = reactive({value:1})

effect(()=>{
  console.log(obj.count)
},{
  scheduler:queueJob
})
const queue = []
let isFlushing = false
const queueJob = function(){}
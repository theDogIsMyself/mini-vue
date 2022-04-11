/*
 * @Date: 2022-04-11 16:18:30
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-11 16:18:31
 * @FilePath: /mini-vue/src/reactivity/reactive.spec.js
 */

import { effect } from '../effect'
import { reactive } from '../reactive'

describe('测试响应式', () => {
  test('reactive基本使用', () => {
    const ret = reactive({ num: 0 })
    let val
    effect(() => {
      val = ret.num
    })
    expect(val).toBe(0)
    ret.num++
    expect(val).toBe(1)
    ret.num = 10
    expect(val).toBe(10)
  })
})
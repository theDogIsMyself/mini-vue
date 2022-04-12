/*
 * @Date: 2022-04-12 16:49:41
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-12 16:50:16
 * @FilePath: /mini-vue/src/reactivity/ref.spec.js
 */
/*
 * @Date: 2022-04-11 16:18:30
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-12 16:30:34
 * @FilePath: /mini-vue/src/reactivity/reactive.spec.js
 */

const {effect} = require('./util')
const {ref} = require('./ref')

describe('测试响应式', () => {
  test('ref基本使用', () => {
    const ret = ref(0)
    let val
    effect(() => {
      val = ret.value
    })
    expect(val).toBe(0)
    ret.value++
    expect(val).toBe(1)
    ret.value = 10
    expect(val).toBe(10)
  })
})
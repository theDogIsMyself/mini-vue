/*
 * @Date: 2022-04-12 17:41:18
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-14 15:08:23
 * @FilePath: /mini-vue/src/reactivity/computed.spec.js
 */
/*
 * @Date: 2022-04-11 16:18:30
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-12 16:30:34
 * @FilePath: /mini-vue/src/reactivity/reactive.spec.js
 */

const { effect } = require('./util')
const { computed } = require('./computed')
const { reactive } = require('./reactive')
const { ref } = require('./ref')

describe('测试响应式', () => {
  test('computed基本使用', () => {
    const ret = reactive({ num: 0 })
    const num = ref(2)
    const cmp = computed(() => num.value + ret.num)
    expect(cmp.value).toBe(2)
    num.value = 3
    expect(cmp.value).toBe(3)

  })
  test('computed options 基本使用', () => {

    const name = ref('cc')
    const text = ref('干饭')
    const cmp = computed({
      get() {
        return name.value + ':' + text.value
      },
      set(value) {
        [name.value, text.value] = value.split(":")
      }
    })
    expect(cmp.value).toBe('cc:干饭')
    cmp.value = '聪聪:吃饭' 
    expect(name.value).toBe('聪聪')
    expect(text.value).toBe('吃饭')
    
  })
})
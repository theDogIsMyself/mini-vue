/*
 * @Date: 2022-04-11 18:35:53
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-11 20:24:19
 * @FilePath: /mini-vue/src/reactivity/track.js
 */
// track 把绑定的依赖放在一个大的 targetMap 中，每一个 target 对应一个depsMap，其中存储callback
//
// targetMap = {
//   target： {
//     key1: [回调函数1，回调函数2],
//     key2: [回调函数3，回调函数4],
//   }  ,
//    target1： {
//     key3: [回调函数5]
//   }  

//  }
const targetMap = new WeakMap()
const activeEffect = null
function track(target, type, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
  }
  if (!deps.has(activeEffect) && activeEffect) {
    deps.add(activeEffect)
  }
  deps.set(key, deps)
}

function trigger(target, type, key) {
  const deps = targetMap.get(target)?.get(key)
  if (deps) {
    deps.forEach(effectFn => {
      // 如果有effect.scheduler 那么就需要通过scheduler确认执行世纪
      if (effectFn.scheduler) {
        effectFn.scheduler()
      } else {
        effectFn()
      }
    })
  }
}

function effect(fn, options = {}) {
  // effect 嵌套 通过队列管理
  const effectFn = () => {
    try {
      activeEffect = effectFn
      return fn()
    } finally {
      activeEffect = null
    }

  }
  // 如果没有配置 lazy 直接执行
  if (!options.lazy) {
    effectFn()
  }
  // 通过scheduler 来确认执行时机
  effectFn.scheduler = options.scheduler
  return effectFn
}

export {
  targetMap,
  track,
  trigger,
  effect
}
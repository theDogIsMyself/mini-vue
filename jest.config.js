/*
 * @Date: 2022-04-11 16:18:11
 * @LastEditors: 赵聪
 * @LastEditTime: 2022-04-11 16:18:11
 * @FilePath: /mini-vue/jest.config.js
 */
module.exports = {
  transform: {
    // '^.+\\.vue$': 'vue-jest', //vuejest 处理.vue
    '^.+\\.js$': 'babel-jest',  // babel jest处理js or jsx
  },
  testMatch: ['**/?(*.)+(spec).[jt]s?(x)'],
  "collectCoverage": true,
  "coverageReporters": ["json", "html"],
  testEnvironment: 'jsdom',

}
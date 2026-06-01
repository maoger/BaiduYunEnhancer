// ==UserScript==
// @name         BaiduYunEnhancer
// @namespace    http://tampermonkey.net/
// @homepage     https://github.com/maoger/BaiduYunEnhancer
// @version      0.6.0
// @description  通过伪造浏览器的操作系统/硬件平台（navigator.platform）尝试绕过 百度云/百度网盘 的下载限制。注：现代百度网盘的限制多由服务端与账号等级判断，本脚本仅作技术参考。
// @author       Maoger
// @match        http*://pan.baidu.com/*
// @run-at       document-start
// @grant        none
// @license      MIT
// @downloadURL  https://openuserjs.org/install/maoger/BaiduYunEnhancer.user.js
// @updateURL    https://openuserjs.org/meta/maoger/BaiduYunEnhancer.meta.js
// ==/UserScript==

(function () {
  "use strict";

  // 生成一个随机的、不可被固定黑名单匹配的平台标识字符串。
  function randomPlatform() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const len = 6 + Math.floor(Math.random() * 7); // 6~12 位随机长度
    let s = "";
    for (let i = 0; i < len; i++) {
      s += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return s;
  }

  // 关键修复：Tampermonkey 脚本默认运行在沙箱中，直接改写 navigator 不会影响页面
  // 真实的 navigator 对象。这里通过向页面注入 <script> 让伪造代码运行在页面上下文，
  // 并在 document-start 阶段尽早执行，赶在页面脚本读取 navigator.platform 之前。
  function injectIntoPage(platformValue) {
    const code =
      '(function(){try{Object.defineProperty(navigator,"platform",' +
      "{get:function(){return " +
      JSON.stringify(platformValue) +
      ";},configurable:true});}catch(e){}})();";
    const script = document.createElement("script");
    script.textContent = code;
    const parent = document.documentElement || document.head || document.body;
    parent.appendChild(script);
    // 注入完成后移除节点，不残留在 DOM 中。
    script.remove();
  }

  injectIntoPage(randomPlatform());
})();

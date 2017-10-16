// ==UserScript==
// @name         BaiduYunEnhancer
// @namespace    http://tampermonkey.net/
// @homepage     https://github.com/maoger/BaiduYunEnhancer
// @version      0.5.2
// @description  通过修改浏览器的操作系统和（或）硬件平台（navigator.platform），破解 百度云/百度网盘 的下载限制。
// @author       Maoger
// @match        http*://pan.baidu.com/*
// @run-at       document-start
// @updateURL    https://openuserjs.org/meta/maoger/BaiduYunEnhancer.meta.js

// ==/UserScript==

Object.defineProperty(navigator,'platform',{get:function(){return 'Maoger';}});
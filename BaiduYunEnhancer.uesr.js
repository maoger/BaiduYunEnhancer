// ==UserScript==
// @name         百度云下载助手
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  通过修改浏览器的操作系统和（或）硬件平台（navigator.platform），解决必须使用百度云软件下载的限制；使用此脚本后，您可以使用浏览器直接下载，或者使用迅雷下载。
// @author       Maoger
// @match        https://pan.baidu.com/*
// @match        http://pan.baidu.com/*

// ==/UserScript==

Object.defineProperty(navigator,'platform',{get:function(){return 'M';}});
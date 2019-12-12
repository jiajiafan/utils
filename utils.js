/** 
 *  @example browserType().ios 
 *  @param none
 *  @return {boolean} 是否是**浏览器
 */
function browserType() {
    let u = navigator.userAgent;
    // app = navigator.appVersion;
    return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == " qq" //是否QQ
    }
}

/**
 * 取url参数
 * @example ?id=12345
 * @return 12345
 */
function paramValue(key) {
    var reg = new RegExp(`(?:^|&)${key}=([^&]+)(?=&|$)`),
        qs = location.search || location.hash;
        qs = qs.slice(qs.indexOf('?') + 1);
    return (key = qs.match(reg)) == null ? null : key[1];
};

/**
 * @method toThousands
 * @param {number} amount 需要格式化的数字
 * @param {number} n 需要保留的小数位数
 * @return {string} 千分化的字符串
 */
function toThousands(amount, n=2) {
    return amount.toFixed(n).replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
};
/**
 * @method fmtDate
 * @param {string|number} _date 
 * @param {number} fmt 指定格式
 * @return {string} 格式化后的字符串
 */
function fmtDate(_date, fmt = 'YYYY-MM-DD hh:mm') {
    var date = new Date(_date)
    var o = {
        "Y": date.getFullYear(), //年份
        "M": date.getMonth() + 1, //月份
        "D": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    return fmt.replace(/Y{4}/, o.Y).replace(/M{2}/, o.M).replace(/D{2}/, o.D).replace(/hh/, o.h).replace(/mm/, o.m).replace(/SS/, o.S);
}
/**
 * 
 * @param {Number|dateString} date 
 * @return {string} 距离目前的时间
 */

function diffTime(date) {
    var now = +new Date;
    var text = '';
    var distance = now - date;
    if (distance <= 86400 * 1000) {
        text = "大约" + Math.round((now - date) / 3600000) + "小时以前";
    } else if (distance < 86400000 * 30) {
        text = Math.round((now - date) / 86400000) + "天以前";
    } else if (distance < 86400000 * 30 * 12) {
        text = Math.round((now - date) / 86400000 / 30) + "个月以前";
    } else {
        text = "一年以前";
    }
    return text;
}
/**
 * @desc 节流函数
 * @param {Function} fn 用ES5函数保证this指向；
 * @param {Number} delay 回调执行间隔时间
 * @return {Function} 
 */
function throttle(fn, delay = 500) {
    let timer,
        firstTime = true;
    let result = function (...args) {
        if (firstTime) {
            fn.call(this, args)
            firstTime = false;
        }
         if (!timer) {
             timer = setTimeout(() => {
                 timer = null;
                 fn.call(this, args)
             }, delay);
         }
    }
    return result;
}
/**
 * @desc 防抖函数
 * @param {Function} fn 回调函数
 * @param {number} delay 延迟执行时间
 */
function debounce(fn, delay = 500) {
     let timer;
     return function (...args) {
         if (timer) {
             clearTimeout(timer)
         }
         timer = setTimeout(() => {
             fn.apply(this, args)
         }, delay)
     }
};
/**
 * @desc 函数柯里化
 * @param {Function} fn 需要柯里化的函数
 * @return {Function} 
 */
function currying(fn, ar = []) {
    let len = fn.length;
    return function (...args) {
        ar = ar.concat(args);
        if (ar.length < len) {
            return currying(fn,ar)
        }
        return fn(...ar)
    }
}
/**
 * @desc 去除字符串前后空格
 * @param {string} str 
 * @return {string}
 */
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
}
/**
 * @desc 获取元素到body的偏移量
 * @param {element} curEle 
 * @return {object} 
  */
function offset(curEle) {
    var l = 0;
    var t = 0;
    var par = curEle.offsetParent;
    l += curEle.offsetLeft;
    t += curEle.offsetTop;
    while (par) {
        //IE8 offsetLeft/top已经包含了边框，但是其他浏览器不包含边框；
        if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
            l += par.clientLeft;
            t += par.clientTop;
        }
        l += par.offsetLeft;
        t += par.offsetTop;
        par = par.offsetParent;

    }
    return {
        left: l,
        top: t
    }
}
/**
 * @desc 判断一个对象是不是promise
 * @param {Object} obj 
 * @return {Boolean}
 */
function isPromise(obj) {
    if ((typeof obj === 'object' && obj != 'null')||typeof obj ==='function') {
        return typeof obj.then === 'function';
    } 
    return false;
}
export {
    currying,//函数柯里化
    throttle,//节流函数
    debounce,//防抖函数
    browserType, //判断浏览器类型
    paramVale,//获取url指定参数值
    toThousands,//格式化金额为千分位
    fmtData, //时间戳按指定格式转日期
    diffTime,//获取时间差
    trim,//去除字符串前后空格
    offset,//获取当前元素距离body的偏移量
    isPromise,//判断一个对象是不是promise
}
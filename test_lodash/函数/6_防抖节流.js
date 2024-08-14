const _ = require('loadsh');

/**
 *@see debounced(防抖动)函数
 **  _.debounce(func, [wait = 0], [options =])
 
 *?  func (Function): 要防抖动的函数。
 *?  [wait=0] (number): 需要延迟的毫秒数。
 *?  [options=] (Object): 选项对象。
 *?  [options.leading=false] (boolean): 指定在延迟开始前调用。
 *?  [options.maxWait] (number): 设置 func 允许被延迟的最大值。
 *?  [options.trailing=true] (boolean): 指定在延迟结束后调用。

*该函数会从上一次被调用后，延迟 wait 毫秒后调用 func 方法。
*options.leading 与|或 options.trailing 
*决定延迟前后如何触发（注：是 先调用后等待 还是 先等待后调用）。
* debounced(防抖动)函数提供一个 cancel 方法取消延迟的函数调用以及 flush 方法立即调用。
* "cancel" 功能通常指的是取消正在进行的延时调用。
 */

//在1.5秒后执行一次
const aa = _.debounce((a) => console.log('hello' + a), 1500)
// aa(1)
// setTimeout(() => aa(2), 1000)
// setTimeout(() => aa(3), 2000)//多次调用的时间间隔在1.5秒内，会重新计时。
// setTimeout(() => aa(4), 3600)//现在就能执行了，因为距离上次的调用的时间间隔超过了1.5秒。



/**
 * @see 自定义的防抖函数,不管调用多少次,最后都会在wait毫秒后执行一次。
 * @see 在wait毫秒内再次调用,则重新计时,wait毫秒后执行一次。
 * @param {function} func 
 * @param {number} wait 
 * @returns 
 */
function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// 使用
const myDebouncedFunction = debounce((a) => console.log('hello' + a), 1500);

// myDebouncedFunction(1)
// setTimeout(() => myDebouncedFunction(2), 1000)
// setTimeout(() => myDebouncedFunction(3), 2000)//多次调用的时间间隔在1.5秒内，会重新计时。
// setTimeout(() => myDebouncedFunction(4), 3600)//现在就能执行了，因为距离上次的调用的时间间隔超过了1.5秒。


/**
 *@see  节流函数
 ** _.throttle(func, [wait=0], [options=])
 *?  func (Function): 要节流的函数。
 *?  [wait=0] (number): 需要节流的毫秒。
 *?  [options=] (Object): 选项对象。
 *?  [options.leading=true] (boolean): 指定调用在节流开始前。
 *?  [options.trailing=true] (boolean): 指定调用在节流结束后。

* 在 wait 秒内最多执行 func 一次的函数。 该函数提供一个 cancel 方法取消延迟的函数调用以及 flush 方法立即调用。options.leading 与|或 options.trailing 决定 wait 前后如何触发。
* 注意: 如果 leading 和 trailing 都设定为 true 则 func 允许 trailing 方式调用的条件为: 在 wait 期间多次调用。
`
 */




/**
 * 如果 leading 和 trailing 都设定为 true ， leading 和 trailing默认为 true，
 * 则 func 允许 trailing 方式调用的条件为: 在 wait 期间多次调用。
 * !所以默认情况下_.throttle函数会在1.5秒内执行多次，
 * 因此需要设置trailing为false，或者设置leading为false。
 * 设置trailing为false，在wait时间内多次调用的函数中，第一次调用会执行。
 * 设置leading为false，在wait时间内多次调用的函数中，最后一次调用会执行。
 */
const bb = _.throttle((a) => console.log('hello' + a), 1500, { 'trailing': false })
//loadsh的节流函数，同步调用和异步调用是隔离的
bb(1)//此次调用，是有效的。
setTimeout(() => bb(2), 1000)//在1.5秒内只执行一次，此次调用是无效的。
setTimeout(() => bb(3), 1500)//超过了1.5秒,所以再次执行了


/**
 * @see 自定义的节流函数,多长时间后把inThrottle改为false,为false后才能再次执行。
 * @see 在limit毫秒内,不能再次执行。
 * @param {function} func 
 * @param {number} limit 
 * @returns 
 */
function throttle(func, limit) {
    let inThrottle;

    return function () {
        const args = arguments;
        const context = this;

        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 使用
const myThrottledFunction = throttle((a) => console.log('hello' + a), 1500);

// myThrottledFunction(1)//此次调用，是有效的。
// setTimeout(() => myThrottledFunction(2), 1000)//在1.5秒内只执行一次,此次调用是无效的。
// setTimeout(() => myThrottledFunction(3), 1500)//大于等于1.5秒,所以再次执行了,此次调用是有效的。


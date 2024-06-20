// function createHookedFunction(originalFunction, beforeHook, afterHook) {
//     //originalFunction需要执行的主要函数,函数执行前的钩子函数beforeHook, 函数执行后的钩子函数afterHook
//     return function (...args) {
//         if (beforeHook) {
//             beforeHook(...args);
//         }
//         const result = originalFunction.apply(this, args);
//         if (afterHook) {
//             afterHook(result, ...args);
//         }
//         return result;
//     };
// }

// // 示例目标函数
// function targetFunction(a, b) {
//     console.log(`Original function called with arguments: ${a}, ${b}`);
//     return a + b;
// }

// // 示例钩子函数
// function beforeHook(...args) {
//     console.log(`Before hook called with arguments: ${args}`);
// }

// function afterHook(result, ...args) {
//     console.log(`After hook called with result: ${result} and arguments: ${args}`);
// }

// // 创建带有钩子的函数
// const hookedFunction = createHookedFunction(targetFunction, beforeHook, afterHook);

// // 调用带有钩子的函数
// const result = hookedFunction(2, 3);
// console.log(`Result: ${result}`);


//class方法可读性更高,推荐使用class创建钩子函数
class HookedClass {
    constructor() {
        this.targetFunction = this.createHookedFunction(this.targetFunction.bind(this));
    }

    targetFunction(a, b) {
        console.log(`Original function called with arguments: ${a}, ${b}`);
        return a + b;
    }

    createHookedFunction(originalFunction) {
        const beforeHook = this.beforeHook.bind(this);
        const afterHook = this.afterHook.bind(this);
        return function (...args) {
            if (beforeHook) {
                beforeHook(...args);
            }
            const result = originalFunction(...args);
            if (afterHook) {
                afterHook(result, ...args);
            }
            return result;
        };
    }

    beforeHook(...args) {
        console.log(`Before hook called with arguments: ${args}`);
    }

    afterHook(result, ...args) {
        console.log(`After hook called with result: ${result} and arguments: ${args}`);
    }
}

// 创建实例
const hookedInstance = new HookedClass();

// 调用带有钩子的函数
const result = hookedInstance.targetFunction(2, 3);
console.log(`Result: ${result}`);
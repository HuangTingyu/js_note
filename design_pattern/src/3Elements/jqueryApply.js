/*
 * @Author: sakurahuang
 * @Description: 
 * @Date: 2024-06-26 16:00:16
 */
class jQuery {
    constructor(selector) {
        let slice = Array.prototype.slice
        let dom = slice.call(document.querySelectorAll(selector))
        let len = dom ? dom.length : 0
        for (let i = 0; i < len; i++) {
            this[i] = dom[i]
        }
        this.length = len
        this.selector = selector || ''
    }
    append(node) {
        // ...
    }
    addClass(name) {
        //...
    }
    html(data) {
            //...
        }
        // 此处省略N个API
}
window.$ = function(selector) {
    // 工厂模式
    return new jQuery(selector)
}

// 测试代码
// var $p = $('p')
// console.log($p)
// console.log($p.addClass)


// //自己封装的ajax,使用方法如下
// ajax({
//     url: '/getData',
//     type: 'Post',
//     dataType: 'json',
//     data: {
//         id: "123"
//     }
// })
// // 因为历史原因，代码里全是:
// // $.ajax({...})
// // 适配器模式
// var $ = {
//     ajax: function (options) {
//         return ajax(options)
//     }
// }

class ReadImg {
    constructor(fileName) {
        this.fileName = fileName
        this.loadFromDisk()
    }
    display() {
        console.log('display... ' + this.fileName)
    }
    loadFromDisk() {
        console.log('loading...' + this.fileName)
    }
}

class ProxyImg {
    constructor(fileName) {
        this.realImg = new ReadImg(fileName)
    }
    display() {
        this.realImg.display()
    }
}

// let proxyImg = new ProxyImg('1.png')
// proxyImg.display()


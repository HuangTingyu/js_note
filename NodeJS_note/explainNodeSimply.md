## 深入浅出Node.js笔记

## 2.模块规范

### 模块分类

Node模块分两类 —— 1.核心模块 = Node提供的模块 2.文件模块 = 用户 编写的模块

### 模块加载过程

1. 优先从缓存加载

   require()对引入的模块都进行缓存，对相同模块二次加载采用缓存优先的方式。

2. 分析路径，定位文件

3. 编译模块

通过 `require.extensions` 可以知道系统已有的扩展加载方式。

```
console.log(require.extensions)
```

打印出来的结果

```
[Object: null prototype] {
  '.js': [Function],
  '.json': [Function],
  '.node': [Function],
  '.mjs': [Function]
}
```

加载自定义扩展名的时候，需要将文件编译成JS文件。

### 核心模块

核心模块有些由C/C++编写，有些由C/C++完成核心部分，纯C/C++编写的统称内建模块。

Node的核心模块先被编译成二进制文件，然后再被编成可执行文件。Node项目src目录存放了C/C++文件，lib目录存放了js文件。

#### 举例

os模块引入流程 ——

`require("os")` ->

`NativeModule.require("os")` ->

`process.binding("os")` ->

`get_builtin_module("node_os")` ->

`NODE_MODULE(node_os, reg_func)` 

### 扩展模块

当JS出现性能瓶颈的时候，可以通过编写C/C++扩展模块提升性能。

C/C++扩展模块的加载 ——

使用require加载 `.node ` 文件时，需要经历以下过程。

`require("./hello.node")` (js)->

`process.dlopen("./hello.node", exports)` (原生模块)->

`uv_dlopen()/uv_dlsym()` (libuv) ->

`dlopen()/dlsym()` （*nix）`LoadLibraryExW()/GetProcAddress()` (Windows)

## 3.异步I/O

异步I/O的优点 ：1. 利用单线程，远离多线程死锁，状态同步等问题；2.让单线程远离阻塞，可以更好的利用CPU

### 实现方式

部分线程进行阻塞I/O或者非阻塞I/O加轮询完成数据获取，一个线程将I/O得到的数据进行传递。

Node并非单线程的，单线程只是对于执行js而言。无论*nix还是windows平台，Node内部都设置了线程池用于完成I/O任务。

#### 平台兼容性

由于Windows平台和*平台的差异，Node使用libuv处理平台兼容性，保证上层Node与下层自定义线程池和IOCP（windows平台下实现异步I/O的方式）之间各自独立。

### Node的异步I/O

事件循环、观察者、请求对象、I/O线程池构成了Node异步I/O的基本模型。

#### 第一步 ——

#### 组装好请求对象，送入I/O线程池等待执行

1.事件循环

进程启动，Node创建循环。Tick为每执行一次循环体的过程。

每个Tick查看是否有事件待处理，有就取出事件及其相关的回调函数。如果存在关联的回调函数就执行，然后进入下一个循环。直到没有事件需要处理，就退出进程。

2.观察者

判断是否有事件处理，需要观察者。

Node中，事件主要源于网络请求，文件I/O等，这些事件对应的观察者有文件I/O观察者，网络I/O观察者等。

事件循环，典型的生产者/消费者模型 ——

异步I/O、网络请求等是事件生产者，为Node提供不同类型的事件，这些事件送到对应的观察者。事件循环，从观察者那里取出事件并处理。

Windows下，这个循环基于IOCP创建，*nix基于多线程创建。

3.请求对象

从JS发起调用到内核执行完I/O操作的过渡过程，存在中间产物 —— 请求对象

例子，fs.open

调用过程，fs.open (fs.js) -> Open(node_file.cc) -> uv_fs_open(libuv/fs.c)

uv_fs_open() 的调用过程中，创建了一个FSReqWrap请求对象。从JS层传入的参数和当前方法都被封在这个请求对象中，回调函数被设置在oncomplete_sym属性上。

Windows下，QueueUserWorkItem()方法将这个 FSReqWrap 推入线程池中等待执行。

JS调用后可以继续执行其他操作，I/O操作在线程中等待执行，不管是否阻塞I/O都不会影响到JS的后续执行。

总结，以上是异步I/O第一步 —— 组装好请求对象，送入I/O线程池等待执行。

#### 第二步 ——

#### 回调通知

4.执行回调

线程池I/O调用完毕后，会将获取的结果存储在req -> result 属性上，然后调用PostQueuedCompletionStatus() 通知IOCP，告知当前对象操作已完成，并将线程归还线程池。

综上，js是单线程的，但Node自身是多线程的，除了用户代码无法并行执行，所有的I/O都是可以并行起来的。

### 非I/O的异步API

1.定时器

实现原理与异步I/O类似，只是不需要I/O线程池参与。

调用setTimeout()或setInterval()创建的定时器，会被插入到定时器观察者内部的红黑树。

每次Tick执行，从该红黑树种迭代取出定时器对象，检查是否超过定时事件，如果超过，就形成一个事件，它的回调函数立即执行。

这里创建定时器对象和迭代比较浪费性能。

2.process.nextTick()

process.nextTick() 的效果相当于

```
setTimeout(function(){
  // TODO
},0)
```

process.nextTick()相比setTimeout()轻量，每次调用只会将回调函数放入队列中，下一轮Tick时取出执行。

3.setImmediate()

类似process.nextTick()

process.nextTick() 优先级比setImmediate() 高，这样设计的原因，是保证每轮循环较快的执行结束，防止CPU占用过多而阻塞后续I/O

### 4.异步编程

### 函数式编程

1.高阶函数

返回值是函数，举例ES5中的forEach(), map(), reduce(), filter()等

2.偏函数

通过指定参数，从而产生新的定制函数。

举例 ——

```js
var isType = function(type){
    return function (obj){
        return toString.call(obj) == '[object '+type+']'
    }
}
var isString = isType('String')
var isFunction = isType('Function')

console.log(isString('abc'))
```

### 异步编程优势/难点

Node 最大的特点，非阻塞I/O模型，CPU与I/O并不相互依赖等待。

面对海量请求，当海量请求作用在单线程上，要防止任何一个计算耗费过多的CPU时间片。建议对CPU的耗用不超过10ms，或者将大量计算分解成小量计算，通过setImmediate()进行调度。

#### 解决方案

#### 事件发布/订阅模式

Node自身提供events模块，这是发布/订阅模式的简单实现。

Node中的事件订阅

```js
emitter.on("event1",function(message){
  console.log(message)
})
```

Node中用到事件订阅的例子

```js
var req = http.request(options,function(res){
  res.on('data',function(chunk){
    console.log('body' + chunk)
  })
})
```

#### Promise/Deferred模式

```
$.get('/api')
.success(onSuccess1)
.success(onSuccess2)
```

#### 并发控制

当我们异步发起大量并发调用时，可能导致下层服务器吃不消，抛错。

解决方案有bagpipe 以及 async

## 5.内存控制

### V8内存限制

Node通过JS使用内存时，只能使用部分内存。

当代码中申明变量并赋值时，使用对象的内存分配在堆中，如果已申请的堆空闲内存不够，分配新的对象，将继续申请堆内存，直到堆的大小超过V8的限制为止。

V8限制堆内存的原因 ——

V8的垃圾回收机制，V8做垃圾回收耗费时间长，并且会引起JS线程暂停执行，影响应用的性能和响应能力。

### 高效使用内存

JS执行过程中，无法立即回收的内存有两种情况 —— 闭包，全局变量。由于V8内存限制，要小心这两种情况造成的内存泄漏。

### 查看内存的使用情况

process.memoryUsage()

```
{
  rss: 20348928,
  heapTotal: 4608000,
  heapUsed: 2388264,
  external: 1392559
}
```

单位B，可以通过（/1024/1024）转为MB

heapTotal是V8申请到的堆内存，heapUsed是堆内存的使用量，rss是进程常驻内存。

一般来说，rss的值总是远大于heapTotal，因为Node的内存并非都是由V8分配的。

### 堆外内存

Node中的内存并非都是V8分配的，不通过V8分配的称为堆外内存。比如Buffer对象。

`code\garbageCollection.js`

```js
var useMem = function(fd){
    var size = 200 * 1024 *1024
    var buffer = new Buffer(size)
    for(var i=0; i < size; i++){
        buffer[i]=0
        getRAM(fd)
    }
    return buffer;
}

var getRAM = function(fd){
    var mem = process.memoryUsage();
    var format = function(bytes) { 
          return (bytes/1024/1024).toFixed(2)+'MB'; 
    };
    var ramStr = 'Process: heapTotal '+format(mem.heapTotal) + ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss)
    ramStr += '\n'
    fs.writeFile(fd,ramStr,function(err){
        if(err){
            throw err;
        }
    })
}

const fs = require('fs')

fs.open(__dirname + '/gc.log', 'a', function (err, fd) {
    if(err){
        throw err;
    }
    useMem(fd)
    
      
})
```

运行代码，发现rss不断增长，远远突破了V8的内存限制。

### 内存泄漏

Node对内存泄漏十分敏感，当内存泄漏造成堆积，垃圾回收过程将耗费更多时间进行对象扫描，应用响应缓慢，直到进程内存溢出，应用崩溃。

内存泄漏的情况不尽相同，实质只有一个，那就是应当回收的对象出现意外而没有回收。

通常，造成内存泄漏的原因有如下。

#### 1. 将内存当缓存

一个对象被当做缓存使用，就会长驻在内存中。用对象的键值对缓存，并不是严格意义上的缓存，因为严格意义的缓存有完善的过期策略，普通对象的键值对没有。

在前端页面这种短时应用的场景中，使用键值对缓存不存在大问题，但在Node中，执行量大和参数多样的情况下，将会因为内存占用引发大问题。

#### 2. 队列状况

JS可以通过队列完成许多特殊需求，当队列的消费速度低于生产速度，将会形成堆积。

例如，用数据库记录日志，数据库构建在文件系统之上，日志写入效率低于日志产生效率。这就会形成数据库写入操作的堆积，而JS中相关的作用域也得不到释放，内存占用不会回落，从而出现内存泄漏。

解决方法是，换用消费速度更快的技术。比如用文件写入日志，但是当生产速度激增，或者消费速度降低时，还是会出现内存泄漏。

深度解决方案，是监控队列的长度，一旦堆积，通过监控产生报警。另一个解决方案，是在异步调用中包含超时机制，一旦限定时间未完成响应，通过回调函数传递超时异常。

### 内存泄漏排查

node-heapdump，node-memwatch


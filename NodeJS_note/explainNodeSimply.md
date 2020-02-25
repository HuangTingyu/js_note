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


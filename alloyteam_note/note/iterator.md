## 迭代器

详细代码见 `code\iterator`

### 中止迭代器

```js
// 中止迭代器
var each = function(ary,callback){
    for (var i=0,l = ary.length;i<l;i++){
        if(callback(i,ary[i]) === false){
            break;
        }
    }
}

```

### 应用

不同浏览器对应不同的控件，根据浏览器选择控件

```js
var getUploadObj = function(){
    try{
        return new ActiveXObject("TXFTNActiveX.FTNUpload")
    } catch(e){
        if(supportFlash()){
            var str = '<object type="application/x-shockwave-flash"></object>'
            return $(str).appendTo($('body'))
        } else {
            var str = '<input name="file" type="file" />' // 表单上传
            return $(str).appendTo($('body'))
        }
    }
}
```

迭代器改造版 —— 

解耦，将这些方法挨个添加到迭代器中。

```js
//迭代器改造
var getActiveUploadObj = function(){
    try{
        return new ActiveXObject("TXFTNActiveX.FTNUpload")
    } catch(e){
        return false
    } 
}
var getFlashUploadObj = function(){
    if(supportFlash()){
        var str = '<object type="application/x-shockwave-flash"></object>'
        return $(str).appendTo($('body'))
    } 
}
var getFormUploadObj = function() {
    var str = '<input name="file" type="file" />' // 表单上传
    return $(str).appendTo($('body')) 
}
var iteratorUploadObj = function(){
    for(var i=0,fn;fn=arguments[i++];){
        var uploadObj = fn();
        if(uploadObj!==false){
            return uploadObj;
        }
    }
}
var uploadObj = iteratorUploadObj(getActiveUploadObj,getFlashUploadObj,getFormUploadObj)
```


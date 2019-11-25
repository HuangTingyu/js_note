### 命令模式

```js
	var button1 = document.getElementById('button1')
     var setCommand = function(button, command) {
            button.onclick = function() {
                command.execute()
            }
        }
        var MenuBar = {
            refresh: function() {
                console.log('reflesh')
            }
        }
        var RefreshMenuBarCommand = function(receiver) {
            this.receiver = receiver;
        }
        RefreshMenuBarCommand.prototype.execute = function() {
            this.receiver.refresh()
        }
        var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar)
        setCommand(button1, refreshMenuBarCommand)
```

对`button1` 执行的操作全部封装在execute里面，setCommand的意义，就是赋予button1 `execute` 方法。

ps.这个写法没啥意义，如果要绑定 `click` 事件，可以直接添加到 `onclick` 事件后面。命令模式最大的意义还是在于，撤销比较快。

### 撤销命令
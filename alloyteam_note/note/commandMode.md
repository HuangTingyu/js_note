### 命令模式

详细代码见 `code\commandMode`

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

```js
	    var ball = document.getElementById('ball')
        var pos = document.getElementById('pos')
        var moveBtn = document.getElementById('moveBtn')
        var cancelBtn = document.getElementById('cancelBtn')
        var MoveCommand = function(receiver, pos) {
            this.receiver = receiver
            this.pos = pos
            this.oldPos = null
        }
        MoveCommand.prototype.execute = function() {
            this.receiver.start('left', this.pos, 1000, 'strongEaseOut')
            this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName]
        }
        MoveCommand.prototype.undo = function() {
            this.receiver.start('left', this.oldPos, 1000, 'strongEaseOut')
        }
        var moveCommand;
        moveBtn.onclick = function() {
            var animate = new Animate(ball)
            moveCommand = new MoveCommand(animate, pos.value)
            moveCommand.execute()
        }
        cancelBtn.onclick = function() {
            moveCommand.undo()
        }
```

撤销，就是在MoveCommand里面加了个oldPos的标志位，用于记录小球一开始的位置。

点击 `cancelBtn` 按钮的时候，小球会回到 oldPos

点击 `moveBtn` 按钮的时候，会更新小球的 oldPos

### 重做

如果要撤销一系列命令，比如下了10步棋，要悔棋到第5步；比如在canvas画了一大堆的线，想要擦除并不是一件容易的事情。

那么，应该考虑的做法，是用一个栈把这些操作存起来；回退的时候，首先擦除整个画布，挨个把栈里的操作挨个 `shift` 出来，也就是重做一遍刚刚的操作。

```js
	var Ryu = {
            attack: function() {
                console.log('attack')
            },
            defense: function() {
                console.log('defense')
            },
            jump: function() {
                console.log('jump')
            },
            crouch: function() {
                console.log('crouch')
            }

        }
        var makeCommand = function(receiver, state) {
            return function() {
                receiver[state]()
            }
        }
        var commands = {
            "119": "jump", //W
            "115": 'crouch', // S
            "97": "defense", // A
            "100": "attack" // D
        }
        var commandStack = []
        document.onkeypress = function(ev) {
            var keyCode = ev.keyCode,
                command = makeCommand(Ryu, commands[keyCode])
            if (command) {
                command()
                commandStack.push(command)
            }

        }
        document.getElementById('replay').onclick = function() {
            var command
            while (command = commandStack.shift()) {
                command()
            }
        }
```

### 宏命令

宏命令是一组命令的集合，通过执行宏命令，可以一次执行一批命令。

```js
var closeDoorCommand = {
    execute: function() {
        console.log('关门')
    }
}
var openPcCommand = {
    execute: function() {
        console.log('开电脑')
    }
}
var openQQCommand = {
    execute: function() {
        console.log('登录QQ')
    }
}
var MacroCommand = function() {
    return {
        commandsList: [],
        add: function(command) {
            this.commandsList.push(command)
        },
        execute: function() {
            for (var i = 0, command; command = this.commandsList[i++];) {
                command.execute()
            }
        }
    }
}
var macroCommand = MacroCommand()
macroCommand.add(closeDoorCommand)
macroCommand.add(openPcCommand)
macroCommand.add(openQQCommand)
macroCommand.execute()
```

macroCommand.add，首先把要执行的命令全部push到 `commandList` 里面，然后macroCommand.execute()，再把队列里的命令依次执行。
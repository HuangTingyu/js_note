var RefreshMenuBarCommand = function(receiver) {
    return {
        execute: function() {
            receiver.refresh()
        }
    }
}
var setCommand = function(button, command) {
    button.onclick = function() {
        command.execute()
    }
}
var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar)
setCommand(button1, refreshMenuBarCommand)
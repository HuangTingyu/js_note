## 组合模式

组合模式将对象组合成树形结构，以表示 “部分-整体” 的层次结构。

组合模式的优点 —— 提供一种遍历树结构的方案，通过调用组合对象的execute方法，程序会递归调用组合下面的叶对象的execute方法。

请求从树最顶端的对象往下传递，组合对象会遍历它属下的子节点，将请求继续传递给这些子节点。
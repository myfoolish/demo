---
title: LWeb
date: 2022-11-11 00:00:00
categories:
- Develop
- 前端
tag: 
- JavaScript
- Vue
description: 这里是 LWeb（JavaScript「主」、Vue「主」、...）
---

# JavaScript 基础

## JavaScript 概述

### 什么是 JavaScript 

JavaScript 是 web 上一种功能强大的编程语言，用于开发交互式的 web 页面。它不需要进行编译，而是直接嵌入在 HTML 页面中，由浏览器执行。

- JavaScript 被设计用来向 HTML 页面添加交互行为。
- JavaScript 是一种脚本语言（脚本语言是一种轻量级的编程语言）。
- JavaScript 由数行可执行的计算机代码组成。
- JavaScript 通常被直接嵌入 HTML 页面。
- JavaScript 是一种解释性语言（代码执行不进行预编译）。

JavaScript 的组成：

1. **核心（ECMAScript）：语法，语句**
2. **文档对象模型（DOM,Document Object Model）：操作文档中的元素和内容**
3. **浏览器对象模型（BOM,Browser Object Model）：浏览器对象**

### JavaScript 的作用

使用 JavaScript 添加页面动画效果，提升用户操作体验。

主要应用有：嵌入动态文本于 HTML 页面、对浏览器事件做出响应、读写 HTML 元素、验证提交数据、检测访客的浏览器信息等。

### JavaScript 的引入

在 HTML 文件中引入 JavaScript 有两种方式，一种是在 HTML 文件中直接嵌入 JavaScript 脚本，称为内嵌式。另一种是链接外部 JavaScript 脚本文件。称为外联式。

内嵌式，在 HTML 文件中，通过<script>标签引入

```javascript
<script type="text/javascript">
	//js代码
</script>
```

外联式，在 HEML 文件中，通过<script src="">标签引入.js文件

```javascript
<script src="xxx.js" type="text/javascript" charset="utf-8"></script>
```

## 基本语法

### 变量

在使用 JavaScript 时，需要遵循以下命名规范：

- 必须以字母或下划线开头，中间可以是数字、字符和下划线
- 变量名不能包含空格等符号
- 不能使用 JavaScript 关键字作为变量名，如：function
- JavaScript 严格区分大小写

```javascript
// 遍历的声明
var 变量名;	// JavaScript 变量可以不声明，直接使用。默认值：undefined
// 变量的赋值
var 变量名 = 值;	// JavaScript 变量是弱类型，即同一个变量可以存放不同类型的数据
```

## BOM(Browser Object Mode)

### **Browser对象**

- DOM Window
- DOM Navigator
- DOM Screen
- DOM History
- DOM Location

#### Window 对象

方法：定时器

| 函数名          | 描述                                             |
| --------------- | ------------------------------------------------ |
| setInterval()   | 按照指定的周期（以毫秒计）来调用函数或计算表达式 |
| clearInterval() | 取消由 setInterval() 设置的 timeout              |
| setTimeOut()    | 在指定的毫秒数后调用函数或计算表达式             |
| clearTimeOut()  | 取消由 setTimeOut() 方法设置的 timeout           |

方法：消息框

| 函数名    | 描述                                                         |
| --------- | ------------------------------------------------------------ |
| alert()   | 显示带有一段消息和一个确认按钮的警告框![alert](https://myfoolish.github.io/picture/Develop/JavaScript/alert.png) |
| confirm() | 显示带有一段消息以及确认按钮和取消按钮的确认框![confirm](https://myfoolish.github.io/picture/Develop/JavaScript/confirm.png)确认框：确认返回  true 取消返回 |
| prompt()  | 显示可提示用户输入的提示框![prompt](https://myfoolish.github.io/picture/Develop/JavaScript/prompt.png)点击确定获取用户输入数据 |

#### Location 对象

| 属性     | 描述                                         |
| -------- | -------------------------------------------- |
| hash     | 设置或返回从井号（#）开始的 URL （锚）       |
| host     | 设置或返回主机名和当前 URL 的端口号          |
| hostname | 设置或返回当前 URL 的主机名                  |
| href     | 设置或返回完整的 URL                         |
| pathname | 设置或返回当前 URL 的路径部分                |
| port     | 设置或返回当前 URL 的端口号                  |
| protocol | 设置或返回当前 URL 的协议                    |
| search   | 设置或返回从问好（?）开始的 URL （查询部分） |

```js
<script type="text/javascript">
    function change(){
    	location.href = "https://myfoolish.github.io";
	}
</script>

<input type="button" value="点我" onclick="change()" />
```

#### History对象

go() 方法：跳转的指定页面

​	go(-1) 加载前一个链接，等效 back()

​	go(1) 加载后一个链接，等效forward()

| 方法      | 描述                              |
| --------- | --------------------------------- |
| back()    | 加载 history 列表中的前一个 URL   |
| forward() | 加载 history 列表中的下一个 URL   |
| go()      | 加载 history 列表中的某个具体页面 |

# JavaScript 高级
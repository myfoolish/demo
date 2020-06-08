---
title: Spring In Action
date: 2020-05-20 10:00:00
description: Spring实战
categories:
- Develop
tag: Java
---

# 第1部分	Spring的核心

## 第4章	面向切面的Spring

在软件开发中，散布于应用中多处的功能被称为横切关注点（cross-cutting concern）。通常来讲，这些横切关注点从概念上是与应用的业务逻辑相分离的（但是往往会直接嵌入到应用的业务逻辑之中）。把这些横切关注点与业务逻辑相分离正是面向切面编程（AOP）所要解决的问题。

### 4.1	**什么是面向切面编程**

如前所述，切面能帮助我们模块化横切关注点。简而言之，横切关注点可以被描述为影响应用多处的功能。例如，安全就是一个横切关注点，应用中的许多方法都会涉及到安全规则。图4.1直观呈现了横切关注点的概念。

![image.png](https://i.loli.net/2020/05/13/tfhbWzQIa8qsHA2.png)
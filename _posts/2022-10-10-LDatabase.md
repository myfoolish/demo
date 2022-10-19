---
title: LDatabase
date: 2022-10-10 00:00:00
description: 这里是数据库（关系型数据库 MySQL、Oracle 和非关系型数据库 Redis）
categories:
- Develop
- 数据库
tag: 
- MySQL
- Oracle
- Redis
description: 这里是 LDatabase（MySQL「主」、Oracle、...）
---

# 数据库

## 数据库概述

**什么是数据库？**

数据库就是存储数据的仓库，其本质是一个文件系统，数据按照特定的格式将数据存储起来，用户可以对数据库中的数据进行进行增、删、改、查操作。

**什么是数据库管理系统？**

数据库管理系统( DataBase Management System，DBMS )是一种操作和管理数据库的大型软件，用于建立、使用和维护数据库，对数据库进行统一管理和控制，以保证数据库的安全性和完整性。用户通过数据库管理系统访问数据库中表内的数据。

数据库与数据库管理系统的关系

![数据库与数据库管理系统的关系](https://myfoolish.github.io/picture/Develop/SQL/数据库与数据库管理系统的关系.png)

## 常见数据库

常见的数据库管理系统

- MySQL：开源免费的数据库，小型的数据库，已经被 Oracle 收购了，MySQL6.x 版本也开始收费
- Oracle：收费的大型数据库，Oracle 公司的产品。Oracle 收购 SUN 公司，收购 MySQL
- DB2：IBM公司的数据库产品，收费的。常应用在银行系统中
- SQLServer：MicroSoft 公司收费的中型的数据库。C#、.net等语言常使用
- SyBase：已经淡出历史舞台。提供了一个非常专业数据建模的工具 PowerDesigner
- SQLite：嵌入式的小型数据库，应用在手机端。

> 常用数据库：MYSQL、Oracle

 **这里主用 MySQL 数据库，MySQL 中可以有多个数据库，数据库是真正存储数据的地方**

关系型数据库：表与表之间有关系，一对一、一对多、多对多
非关系型数据库：表与表之间没关系

## 数据库表

数据库中以表为组织单位存储数据。根据表字段所规定的数据类型，我们可以向其中填入一条条的数据，而表中的每条数据类似类的实例对象。表中的 一行一行的信息我们称之为记录。

表记录与java类对象的对应关系

![数据库表记录类比Java类对象](https://myfoolish.github.io/picture/Develop/SQL/数据库表类比Java类.png)

## 数据库事务

事务的四个属性（ACID）

- 原子性：事务是由一个或一组相互关联的 SQL 语句组成，这些语句被认为是一个不可分割的单元
- 一致性：对于数据库的修改是一致的，即多个用户查的的数据是一样的。一致性主要由 mysql 的日志机制处理，它记录数据的变化，为事务恢复提供跟踪记录。
- 隔离性**：**每个事务都有自己的空间，和其他发生在系统中的事务隔离开来，而且事务的结果只在他完全被执行时才能看到
- 持久性：提交了这个事务之后对数据的修改更新就是永久的。当一个事务完成，数据库的日志已经被更新时，持久性即可发挥其特有的功效，在 mysql 中，如果系统崩溃或者数据存储介质被破坏，通过日志，系统能够恢复在重启前进行的最后一次成功更新，可以反应系统崩溃时处于执行过程的事物的变化。

事务的四种隔离级别

- READ UNCOMMITTED（未提交读）

  事务A对数据做的修改，即使没有提交，对于事务B来说也是可见的，这种问题叫脏读

- READ COMMITTED（提交读）

  事务A对数据做的修改，提交之后会对事务B可见，举例，事务B开启时读到数据1，接下来事务A开启，把这个数据改成2，提交，B再次读取这个数据，会读到最新的数据2

- REPEATABLE READ（可重复读）

  事务A对数据做的修改，提交之后，对于先于事务A开启的事务是不可见的。举例，事务B开启时读到数据1，接下来事务A开启，把这个数据改成2，提交，B再次读取这个数据，仍然只能读到1

- SERIALIZABLE（可串行化）

  可串行化是最高的隔离级别。这种隔离级别强制要求所有事物串行执行，在这种隔离级别下，读取的每行数据都加锁，会导致大量的锁征用问题，性能最差

事务的隔离级别是通过锁实现的，而事务的原子性、一致性和持久性则是通过事务日志实现的

# MySQL

和其他数据库系统相比，MySQL 有点与众不同，它的架构可以在多种不同场景中应用并发挥好的作用，但同时也会带来一点选择上的困难。MySQL 并不完美，却足够灵活，能够适应高要求的环境，例如 Web 类应用。同时，MySQL 既可以嵌入到应用程序中，也可以支持数据仓库、内容索引和部署软件、高可用的冗余系统、在线事务处理系统（OLTP）等各种应用类型。

为了充分发挥 MySQL 的性能并顺利地使用，就必须理解其设计。MySQL 的灵活性体现在很多方面。例如，你可以通过配置使它在不同的硬件上都运行得很好，也可以支持多种不同的数据类型。**但是，MySQL 最重要、最与众不同的特性是它的存储引擎架构，这种架构的设计将查询处理（Query Processing）及其他系统任务（Server Task）和数据的存储/提取相分离**。这种处理和存储分离的设计可以在使用时根据性能、特性以及其他需求来选择数据存储的方式。

本章概要地描述了 MySQL 的服务器架构、各种存储引擎之间的主要区别以及这些区别的重要性。另外也会回顾一下 MySQL 的历史背景和基准测试，并试图通过简化细节和演示案例来讨论 MySQL 的原理。这些讨论无论是对数据库一无所知的新手，还是熟知其他数据库的专家，都不无裨益。（摘自高性能 MySQL：第3版）

## 逻辑架构

如果能在头脑中构建出一幅 MySQL 各组件之间如何协同工作的架构图，就会有助于深入理解 MySQL 服务器。下展示了 MySQL 的逻辑架构图。

![MySQL逻辑架构](https://myfoolish.github.io/picture/coding/database/mysql/mysql_logical_architecture.png)

最上层并不是 MySQL 所独有的，大多数基于网络的客户端/服务器的工具或者服务都有类似的架构。比如连接处理、授权认证、安全等等。

第二层是 MySQL 比较有意思的部分。大多数 MySQL 的核心服务功能都在这一层，包括查询解析、分析、优化、缓存以及所有的内置函数（例如日期、时间、数学和加密函数），所有跨存储引擎的功能都在这一层实现：存储过程、触发器、视图等。

第三层存储引擎。存储引擎负责 MySQL 中数据的存储和提取。和 GNU/Linux下的各种文件系统一样，每个存储引擎都有它的优势和劣势。服务器通过 API 与存储引擎进行通信。这些接口屏蔽了不同存储引擎之间的差异，使得这些差异对上层的查询过程透明。存储引擎 API 包含几十个底层函数，用于执行诸如“开始一个事务”或者“根据主键提取一行记录”等操作。但存储引擎不会去解析 SQL，不同存储引擎之间也不会相互通信，而只是简单响应服务器的请求。

### 连接管理与安全性

每个客户端连接都会在服务器进程中拥有一个线程，这个连接的查询只会在这个单独的线程中执行，该线程只能轮流在某个 CPU 核心或者 CPU 中运行。服务器会负责缓存线程，因此不需要为每一个新建的连接创建或者销毁线程。

当客户端（应用）连接到 MySQL 服务器时，服务器需要对其进行认证。认证基于用户名、原始主机信息和密码。如果使用了安全套接字（SSL）的方式连接，还可以使用 X.509 证书认证。一旦客户端连接成功，服务器会继续验证该客户端是否具有执行某个特定查询的权限（例如是否允许客户端对 world 数据库的country表执行SELECT语句）。

### 优化与执行

MySQL 会解析查询，并创建内部数据结构（解析树），然后对其进行各种优化，包括重写查询、决定表的读取顺序以及选择合适的索引等。用户可以通过特殊的关键字提示（hint）优化器，影响它的决策过程，也可以请求优化器解释（explain）优化过程的各个因素，使用户可以知道服务器是如何进行优化决策的，并提供一个参考基准，便于用户重构查询和 schema、修改相关配置，使应用尽可能高效运行。

优化器并不关心表使用的是什么存储引擎，但存储引擎对于优化查询是有影响的。优化器会请求存储引擎提供容量或某个具体操作的开销信息，以及表数据的统计信息等。例如某些存储引擎的某种索引，可能对一些特定的查询有优化。

对于 SELECT 语句，在解析查询之前，服务器会先检查查询缓存（Query Cache），如果能够在其中找到对应的查询，服务器就不必再执行查询解析、优化和执行的整个过程，而是直接返回查询缓存中的结果集。

## 存储引擎

怎么查看mysql支持的存储引擎（SHOW ENGINES）

**登录MySQL数据库**

MySQL是一个需要账户名和密码才能登录的数据库，登陆后使用，它提供了一个默认的root账号，使用安装时设置的密码即可登录。

```shell
# 格式：cmd> mysql –u用户名 –p密码 (-h地址 -P端口)
cmd>mysql ‐uroot –proot
```

**MySQL数据库密码重置（扩展）**

1. 停止 mysql 服务器运行输入 services.msc 停止 mysql 服务

2. 在 cmd 下,输入 mysqld --console --skip-grant-tables 启动服务器,出现一下页面,不要关闭该窗口

   ![MySQL数据库密码重置](https://myfoolish.github.io/picture/Develop/SQL/MySQL数据库密码重置.png)

3. 新打开 cmd，输入 mysql -uroot 不需要密码

   ```sql
   use mysql;
   update user set password=password('abc') WHERE User='root';
   ```

4. 关闭两个 cmd 窗口

## SQL语句

SQL 结构化查询语言(Structured Query Language)是关系型数据库管理系统都需要遵循的规范。不同的数据库生产厂商都支持SQL语句，但都有特有内容。

![SQL概述](https://myfoolish.github.io/picture/Develop/SQL/SQL概述.png)

### 语法

- SQL 语句可以单行或多行书写，以分号结尾
- SQL 语句可以使用 -- 、#、/**/ 的方式完成注释
- SQL 语句可以使用空格和缩进来增强语句的可读性
- SQL 语句不区分大小写，关键字建议使用大写，例如：SELECT * FROM user;
- MySQL 中常使用的数据类型如下

| 数据类型     | 说明                                                   |
| ------------ | ------------------------------------------------------ |
| int(integer) | 整数类型                                               |
| varchar(M)   | 字符串类型， M为0~65535之间的整数                      |
| double       | 小数类型                                               |
| decimal(m,d) | 指定整数位与小数位长度的小数类型                       |
| timestamp    | 日期类型，时间戳                                       |
| date         | 日期类型，格式为yyyy-MM-dd，包含年月日，不包含时分秒   |
| datetime     | 日期类型，格式为 YYYY-MM-DD HH:MM:SS，包含年月日时分秒 |

### 操作

- **DDL 数据定义语言 (Data Definition Language) **用来定义数据库对象：数据库、表、列等。关键字：create、alter、drop等
- **DML 数据操作语言 (Data Manipulation Language) **用来对数据库中表的记录进行更新。关键字：insert、delete、update等
- **DCL 数据控制语言 (Data Control Language) **用来定义数据库的访问权限和安全级别以及创建用户
- **DQL 数据查询语言 (Data Query Language) **用来查询数据库中表的记录。关键字：select、 from、where等

#### DDL 数据库操作

##### 创建/删除数据库

```sql
# 创建数据库--数据库中数据的编码采用的是安装数据库时指定的默认编码 (utf8)
CREATE DATABASE springboot;
# 创建数据库--并指定数据库中数据的编码：CREATE DATABASE 数据库名 CHARACTER SET 字符集;
CREATE DATABASE spring CHARACTER SET utf8;
# 删除数据库：DROP DATABASE (IF EXISTS) 数据库名;
DROP DATABASE springboot;
```

##### 查看数据库

```sql
# 查看 MySQL 服务器中的所有的数据库: 
SHOW DATABASES;
# 查看正在使用的数据库: 
SELECT DATABASE();
# 查看某个数据库的定义的信息：SHOW CREATE DATABASE 数据库名;
SHOW CREATE DATABASE spring;
# 切换数据库：USE 数据库名;
USE springboot;
```

#### DDL 表操作

##### 创建/删除表

```sql
# 创建表
# create table 表名
# (
#	 字段名 类型(长度) [约束],
#	 字段名 类型(长度) [约束],
#	 ...
# );
CREATE TABLE personal
(
    id   INT PRIMARY KEY,
    name VARCHAR(32),
    age  INT
);

# 删除表：DROP TABLE 表名;
DROP TABLE personal;
```

> 类型： varchar(n) 字符串、 int 整形、 double 浮点、 date 时间、 timestamp 时间戳
>    约束：(后面详细介绍)	primary key 主键，被主键修饰字段中的数据，不能重复、不能为null。

##### 查看表&表结构

```sql
# 查看数据库中的所有表：
SHOW TABLES;
# 查看表结构：DESC 表名;
DESC personal;
```

##### 修改表结构

```sql
# (了解)修改表名：RENAME TABLE 表名 TO 新表名;
# 修改表名，personal 改为 personally
RENAME TABLE personal TO personally;

# (了解)修改表的字符集：ALTER TABLE 表名 CHARACTER SET 字符集;
# 修改表的字符集，utf8 改为 gbk
ALTER TABLE personal CHARACTER SET gbk;

# 添加列：ALTER TABLE 表名 ADD COLUMN 列名 类型(长度) [约束];
# 添加个人描述字段，类型 VARCHAR(20)
ALTER TABLE personal ADD COLUMN `desc` VARCHAR(20);

# 修改列的类型（长度）及约束：ALTER TABLE 表名 MODIFY 列名 类型(长度) [约束];
# 修改个人描述字段，类型 VARCHAR(32) 并添加约束 NOT NULL
ALTER TABLE personal MODIFY `desc` VARCHAR(32) NOT NULL;

# 修改列名：ALTER TABLE 表名 CHANGE 旧列名 新列名 类型(长度) [约束];
# 修改个人描述字段，description VARCHAR(32)
ALTER TABLE personal CHANGE `desc` `description` VARCHAR(32);

# 删除列：ALTER TABLE 表名 DROP 列名;	
# 删除个人描述字段，description VARCHAR(32)
ALTER TABLE personal DROP description;
```

#### DML 数据操作

##### 插入表记录：insert

```sql
# 向表中插入所有字段,字段的顺序为创建表时的顺序：INSERT INTO 表 VALUES (值1,值2,值3..);
# 向表中插入某些字段：INSERT INTO 表 (字段1,字段2,字段3..) VALUES (值1,值2,值3..);
insert into personal(id, name, age) VALUES (1, 'Passerby', 24);
insert into personal(id, name, age) VALUES (2, 'MyFoolish', 25);
insert into personal(id, name, age) VALUES (3, 'XwCoding', 25);
insert into personal(id, name) VALUES (4, 'Test1');
insert into personal(name, id) VALUES ('Test2', 5);
```

> 注意：
>
> - 值与字段必须对应，个数相同，类型相同
> - 值的数据大小必须在字段的长度范围内
> - 除了数值类型外，其它的字段类型的值必须使用引号引起。（建议单引号）
> - 如果要插入空值，可以不写字段，或者插入null。

##### 删除记录：delete

```sql
# 删除表中[指定条件的]所有记录：DELETE FROM 表名 [WHERE 条件];
DELETE FROM personal WHERE id=4;
```

> **面试题：删除表中所有记录使用 delete from 表名; 还是用 truncate table 表名; 有什么区别？**</br>
> 删除方式：</br>
> 	*delete 一条一条删除，不清空auto_increment记录数。*</br>
> 	*truncate 直接将表删除，重新建表，auto_increment将置为零，从新开始。*</br>
> DELETE FROM personal;</br>
> TRUNCATE TABLE personal;

##### 更新表记录：update

用来修改指定条件的数据，将满足条件的记录指定列修改为指定值

```sql
# 更新所有[符合条件]记录的指定字段：UPDATE 表名 SET 字段名=值,字段名=值,... [WHERE 条件];
UPDATE personal SET name='测试' WHERE id=5;
```

> 注意： 
>
> - 列名的类型与修改的值要一致
> - 修改值得时候不能超过最大长度
> - 除了数值类型外，其它的字段类型的值必须使用引号引起

#### DQL 数据操作

##### 单表查询

简单查询

```sql
# 别名查询，关键字 as（可省略）.列别名 .表别名
select name as n from personal as p;
# 去掉重复值：select [distinct] * | 列名,列名 from 表 where 条件
select distinct age from personal;
# 查询结果是表达式（运算查询）
select id,name,age-10 from personal;
```

条件查询

| 比较运算符 | >、<、<=、=、>=、<> | 大于、小于、大于(小于)等于、不等于                      |
| ---------- | ------------------- | ------------------------------------------------------- |
|            | BETWEEN ...AND...   | 显示在某一区间的值(含头含尾)                            |
|            | IN(set)             | 显示在 IN 列表中的值，例：IN(100,200)                   |
|            | LIKE ‘张 pattern’   | 模糊查询 LIKE，% 代表零个或多个任意字符，_ 代表一个字符 |
|            | IS NULL             | 判断是否为空                                            |
| 逻辑运行符 | AND                 | 多个条件同时成立                                        |
|            | OR                  | 多个条件任一成立                                        |
|            | NOT                 | 不成立，例： WHERE NOT(salary>100);                     |

```sql
# 查询 age 不是24的所有 name
select name from personal where age !=24;
select name from personal where age <>24;
select name from personal where not (age =24);

# 查询 age 在24到25之间所有 name
select name from personal where age BETWEEN 24 AND 25;
select name from personal where age >=24 and age <=25;

# 查询age在24或25的所有name
select name from personal where age IN (24,25);
select name from personal where age = 24 OR age = 25;

# 查询含有'o'字符的所有name
select * from personal where name LIKE '%o%';

# 查询第五个字符为'o'的所有name
select * from personal where name LIKE '____o%';

# 查询age不为null的所有name
select * from personal where age is not null;
```

排序查询是通过 order by 语句，可以将查询出的结果进行排序。暂时放置在 select 语句的最后。

```sql
# SELECT * FROM 表名 ORDER BY 排序字段 ASC|DESC;	#ASC 升序 (默认)	#DESC 降序
# 在age(降序)的基础上，以id排序(降序)
select * from personal order by age desc,id desc;
#显示age(去重复)，并排序(降序)
select distinct age personal user order by age desc;
```

**聚合（聚合函数）查询**是纵向查询，它是对一列的值进行计算，然后返回一个单一的值；另外聚合函数会忽略空值。

- COUNT(col)：统计指定列不为NULL的记录行数；
- SUM(col)：计算指定列的数值和，如果指定列类型不是数值类型，那么计算结果为0；
- AVG(col)：计算指定列的平均值，如果指定列类型不是数值类型，那么计算结果为0；
- MIN(col)：计算指定列的最小值，如果指定列是字符串类型，那么使用字符串排序运算；
- MAX(col)：计算指定列的最大值，如果指定列是字符串类型，那么使用字符串排序运算；
- GROUP_CONCAT(col)：返回由属于一组的列值连接组合而成的结果

分组查询是指使用 GROUP BY 字句对查询信息进行分组。

```sql
# SELECT 字段1,字段2… FROM 表名 GROUP BY分组字段 HAVING 分组条件;
# 统计各个age的个数
SELECT age ,COUNT(*) FROM personal GROUP BY age;
# 统计各个age的个数,且只显示个数大于1的信息
SELECT age ,COUNT(*) FROM personal GROUP BY age HAVING COUNT(*) > 1;
```

> *`分组操作中的having子语句，是用于在分组后对数据进行过滤的，作用类似于where条件。`*</br>
>*`having与where的区别:`* </br>
> 	*`having是在分组后对数据进行过滤.`* </br>
>	*`where是在分组前对数据进行过滤`* </br>
> 	*`having后面可以使用分组函数(统计函数)`*</br>
>	*`where后面不可以使用分组函数。`*</br>

分页查询在项目开发中常见，由于数据量很大，显示屏长度有限，因此对数据需要采取分页显示方式。

```sql
# SELECT 字段1，字段2... FROM 表明 LIMIT M,N
	# M: 整数，表示从第几条索引开始，计算方式 （当前页-1）*每页显示条数
	# N: 整数，表示查询多少条数据
#	例如数据共有30条，每页显示5条，第一页显示1-5条，第二页显示6-10条。
# SELECT 字段1，字段2... FROM 表明 LIMIT 0,5
# SELECT 字段1，字段2... FROM 表明 LIMIT 5,5
```

##### 多表查询

实际开发中，一个项目通常需要很多张表，且这些表之间存在一定的关系。例如：一个商城项目需要分类表 (category)、商品表  (products)、订单表 (orders) 等多张表，接下来在单表的基础上，进行多表方面的认识。

表与表之间的关系

- 一对一关系：（了解）在实际的开发中应用不多，因为一对一可以创建成一张表。
  - 两种建表原则：
    - 外键唯一：主表的主键和从表的外键（唯一），形成主外键关系，外键唯一 unique。
    - 外键是主键：主表的主键和从表的主键，形成主外键关系。
- 一对多关系：
  - 建表原则：在从表（多方）创建一个字段，字段作为外键指向主表（一方）的主键。
  - 常见实例：客户和订单，分类和商品，部门和员工
- 多对多关系：
  - 建表原则：需要创建第三张表，中间表中至少两个字段，这两个字段分别作为外键指向各自一方的主键。
  - 常见实例：学生和课程、用户和角色

一对多

现在我们有两张表“分类表”和“商品表”，为了表明商品属于哪个分类，通常情况下，我们将在商品表上添加一列，用于存放分类 cid 的信息，此列称为：外键，此时“分类表 category” 称为：主表，“cid” 我们称为主键。“商品表products” 称为：从表，category_id 称为外键。我们通过主表的主键和从表的外键来描述主外键关系，呈现就是一对多关系。

category 分类表，为一方，也就是主表，需要提供主键 cid；

products 商品表，为多方，也就是从表，需要提供外键 category_id；

多对多

商品和订单，将拆分成两个一对多。

products 商品表，为其中一个一对多的主表，需要提供主键 pid

orders 订单表，为另一个一对多的主表，需要提供主键 oid

productOrder 中间表，需要提供两个外键 oid 和 pid

```sql
# 分类表
DROP TABLE IF EXISTS category;
CREATE TABLE category
(
    cid   VARCHAR(32) PRIMARY KEY,
    cname VARCHAR(50)	# 分类名称
);
# 商品表
DROP TABLE IF EXISTS products;
CREATE TABLE products
(
    pid         VARCHAR(32) PRIMARY KEY,
    pname       VARCHAR(50),
    price       DOUBLE,
    flag        VARCHAR(2), #是否上架标记为：1表示上架、0表示下架
    category_id VARCHAR(32),
    CONSTRAINT products_fk FOREIGN KEY (category_id) REFERENCES category (cid)
);
# 订单表
DROP TABLE IF EXISTS orders;
CREATE TABLE orders
(
    oid        VARCHAR(32) PRIMARY KEY,
    totalPrice DOUBLE # 总计
);
# 中间表
DROP TABLE IF EXISTS productOrder;
CREATE TABLE productOrder
(
    pid VARCHAR(32), # 商品id
    oid VARCHAR(32)  # 订单id
);
# 添加外键约束
# 订单表和中间表的主外键关系
ALTER TABLE productOrder
    ADD CONSTRAINT productOrder_orders_fk FOREIGN KEY (oid) REFERENCES orders (oid);
# 商品表和中间表的主外键关系
ALTER TABLE productOrder
    ADD CONSTRAINT productOrder_products_fk FOREIGN KEY (pid) REFERENCES products (pid);
# 联合主键（可省略）
# alter table `orderitem` add primary key (oid, pid);

# 1、初始化分类表数据
INSERT INTO category (cid, cname) VALUES ('c001', '家电');
INSERT INTO category (cid, cname) VALUES ('c002', '服饰');
INSERT INTO category (cid, cname) VALUES ('c003', '化妆品');
# 2、初始化商品表数据	
# (1) 含有外键信息 (category 表中存在这条数据)
INSERT INTO products (pid, pname, price, flag, category_id) VALUES ('p001', '手机', 2499, '1', 'c001');
INSERT INTO products (pid, pname, price, flag, category_id) VALUES ('p002', '电脑', 13966, '1', 'c001');
INSERT INTO products (pid, pname, price, flag, category_id) VALUES ('p003', '短袖', 80, '1', 'c002');
INSERT INTO products (pid, pname, price, flag, category_id) VALUES ('p004', '长裤', 90, '1', 'c002');
INSERT INTO products (pid, pname, price, flag, category_id) VALUES ('p005', '洗面奶', 200, '1', 'c003');
INSERT INTO products (pid, pname, price, flag, category_id) VALUES ('p006', '面膜', 300, '1', 'c003');
# (2) 含有外键信息 (category 表中不存在这条数据) ‐‐ 失败，异常
INSERT INTO products (pid, pname, price, flag, category_id) VALUES ('p010', '房子', 300w, 1, 'c009');
# (3) 没有外键数据，默认为null
INSERT INTO products (pid, pname, price, flag) VALUES ('p010', '房子', 300w, 1);
# 3、初始化订单表数据
INSERT INTO orders (oid, totalPrice) VALUES ('o001', '998');
INSERT INTO orders (oid, totalPrice) VALUES ('o002', '100');
# 4、初始化中间表数据
# (1) (products, orders) 表中数据存在
INSERT INTO productOrder (pid, oid) VALUES ('p001', 'o001');
INSERT INTO productOrder (pid, oid) VALUES ('p001', 'o002');
INSERT INTO productOrder (pid, oid) VALUES ('p002', 'o002');
# (2) 删除中间表的数据
DELETE FROM productOrder WHERE pid='p002' AND oid = 'o002';
# (3) (products, orders) 表中数据不存在 ‐‐ 执行异常
INSERT INTO productOrder (pid, oid) VALUES ('p002', 'o003');
# 删除指定商品/分类(分类被商品使用/商品被中间表使用) ‐‐ 执行异常
DELETE FROM category WHERE cid = 'c001';
DELETE FROM products WHERE pid = 'p001';
```

交叉连接查询（基本不会使用-得到的是两个表的乘积） [了解]

```sql
SELECT * FROM A,B;
SELECT * FROM A CROSS JOIN B;
```

内连接查询（使用的关键字 INNER JOIN -- INNER可以省略）

```sql
# 隐式内连接：SELECT * FROM A,B WHERE 条件;
# 1、查询哪些分类的商品已经上架
SELECT DISTINCT cname
FROM category c,
     products p
WHERE c.cid = p.category_id
  and p.flag = '1';

# 显示内连接：SELECT * FROM A INNER JOIN B ON 条件;
SELECT DISTINCT c.cname
FROM category c
         INNER JOIN products p
                    ON c.cid = p.category_id
WHERE p.flag = '1';
```

外连接查询（使用的关键字 LEFT/RIGTH OUTER JOIN -- OUTER可以省略）

```sql
# 左外连接(LEFT OUTER JOIN)：SELECT * FROM A LEFT OUTER JOIN B ON 条件;
# 2、查询所有分类商品的个数
SELECT cname, COUNT(category_id)
FROM category c
         LEFT JOIN products p ON c.cid = p.category_id
GROUP BY cname;

#	右外连接(RIGHT OUTER JOIN)：SELECT * FROM A RIGHT OUTER JOIN B ON 条件;
# RIGHT 替换 LEFT，其他同上
```

下面通过一张图说明连接的区别

![SQL JOINS](https://myfoolish.github.io/picture/Develop/SQL/SQL JOINS.png)

（自连接）子查询（一条 SELECT 语句结果作为另一条 SELECT 语法一部分（查询条件、查询结果、表等））

为了给主查询（外部查询）提供数据而首先执行的查询（内部查询）被叫做子查询。也就是说，先执行子查询，根据子查询的结果，再执行主查询，效率低于连接查询，关键字： IN、NOT IN、EXIST、NOT EXIST、=、<>

```sql
#3、查询“化妆品”分类上架商品详情
# 以下三种查询结果一样
# 子查询——作为查询条件
select *
from products
where category_id = (
    select cid
    from category
    where cname = '化妆品'
);
# 子查询——作为另一张表
select *
from products p,
     (select cid
      from category
      where cname = '化妆品') c
 where p.category_id = c.cid;
# 隐式内连接
select p.*
from products p,
     category c
where p.category_id = c.cid
  and c.cname = '化妆品';
 
# 子查询——查询“化妆品”和“家电”两个分类上架商品详情
select *
from products
where category_id in (
    select cid
    from category
    where cname = '化妆品'
       or cname = '家电');
select *
from products p,
     (select cid
      from category
      where cname = '化妆品'
         or cname = '家电') c
where p.category_id = c.cid;
```

## SQL 约束

数据的完整性（添加表约束 = 添加表的数据完整性 ）

分类：实体完整性，域完整性，引用完整性

- 实体完整性：数据行约束，主键约束，唯一约束

- 域完整性：数据类型，默认约束，非空约束

- 引用完整性：外键约束

### 主键约束 (PRIMARY KEY) 

数据库表中每条记录的唯一标识。

- 每个表都应该有一个主键，有且只能有一个主键
- 主键必须包含唯一的值
- 主键列不能包含 NULL 值

#### 添加主键约束

```sql
# 方式一：创建表时，在字段描述处，声明指定字段为主键
DROP TABLE IF EXISTS personal;
CREATE TABLE personal
(
    id        INT PRIMARY KEY,
    LastName  VARCHAR(32),
    FirstName VARCHAR(32)
);
# 方式二：创建表时，在constraint约束区域，声明指定字段为主键：
# - 格式：[constraint 名称] primary key (字段列表)
# - 关键字constraint可以省略，如果需要为主键命名，constraint不能省略，主键名称一般没用。
# - 字段列表需要使用小括号括住，如果有多字段需要使用逗号分隔。声明两个以上字段为主键，我们称为 联合主键。
DROP TABLE IF EXISTS personal;
CREATE TABLE personal
(
    LastName  VARCHAR(32),
    FirstName VARCHAR(32),
    CONSTRAINT pk_PersonalID PRIMARY KEY (FirstName, LastName)
);
DROP TABLE IF EXISTS personal;
# 可以简写为
CREATE TABLE personal
(
    LastName  VARCHAR(32),
    FirstName VARCHAR(32),
    PRIMARY KEY (FirstName, LastName)
);
# 方式三：建表之后，通过修改表结构，声明指定字段为主键：
# - 格式：ALTER TABLE 表名 ADD [CONSTRAINT 名称] PRIMARY KEY (字段列表)
DROP TABLE IF EXISTS personal;
CREATE TABLE personal
(
    FirstName VARCHAR(32),
    LastName  VARCHAR(32)
);
ALTER TABLE personal ADD PRIMARY KEY (FirstName, LastName);

DESC personal;
```

#### 删除主键约束

```sql
-- 如需撤销 PRIMARY KEY 约束，请使用下面的 SQL：
ALTER TABLE personal DROP PRIMARY KEY;
```

### 自动增长列

通常希望在每次插入新记录时，数据库自动生成字段的值。此时可以在表中使用 AUTO_INCREMENT（自动增长列）关键字

数据类型**必须是整形**，必须为键 (一般是主键)。

```sql
# 向 personal 添加数据时，可以不为 id 字段设置值，也可以设置成 null，数据库将自动维护主键值
DROP TABLE IF EXISTS personal;
CREATE TABLE personal
(
    id   INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(32)
);
INSERT INTO personal (name) VALUES ('晓');
INSERT INTO personal (id, name) VALUES (NULL, '威');
```

> 扩展：默认AUTO_INCREMENT 的开始值是 1，如果希望修改起始值，请使用下列 SQL 语法：
>
> ALTER TABLE personal AUTO_INCREMENT = 100;	

### 唯一约束

UNIQUE 约束唯一标识数据库表中的每条记录。

UNIQUE 和 PRIMARY KEY 约束均为列或列集合提供了唯一性的保证。

PRIMARY KEY 拥有自动定义的 UNIQUE 约束。

>  请注意，每个表可以有多个 UNIQUE 约束，但是每个表只能 有一个 PRIMARY KEY 约束。

#### 添加唯一约束

虽然唯一性约束的列不可以出现重复值，但可以出现多个null值。
唯一键约束是通过参考索引实施的，如果插入的值均为NULL，则根据索引的原理，全NULL值不被记录在索引上，所以插入全NULL值时，可以有重复的，而其他的则不能插入重复值。


```sql
# 方式一：创建表时，在字段描述处，声明唯一：
DROP TABLE IF EXISTS personal;
CREATE TABLE personal
(
    id   INT UNIQUE,
    name VARCHAR(32)
);
# 方式二：创建表时，在约束区域，声明唯一：
DROP TABLE IF EXISTS personal;
CREATE TABLE personal
(
    id   INT,
    name VARCHAR(32),
    CONSTRAINT id UNIQUE (id)
);
# 方式三：创建表后，修改表结构，声明字段唯一：
DROP TABLE IF EXISTS personal;
CREATE TABLE personal
(
    id   INT,
    name VARCHAR(32)
);
ALTER TABLE personal ADD UNIQUE(Id);

DESC personal;
```

#### 删除唯一约束

```sql
-- 如需撤销 UNIQUE 约束，请使用下面的 SQL：
ALTER TABLE 表名 DROP INDEX 名称;
ALTER TABLE personal DROP INDEX Id_P;
```

如果添加唯一约束时，没有设置约束名称，默认是当前字段的字段名。

>  主键约束与唯一约束的区别：
>
>  主键：唯一、不能为空、一个表只能有一个主键，非业务数据
>
>  唯一：唯一、可以有空值，但只能有一个空值。一个表可以有多个唯一约束。

### 非空约束

NOT NULL 约束强制列不接受 NULL 值。

NOT NULL 约束强制字段始终包含值。这意味着，如果不向字段添加值，就无法插入新记录或者更新记录。

#### 添加非空约束


```sql
# 方式一：创建表时，在字段描述处，声明非空：
DROP TABLE IF EXISTS personal;
CREATE TABLE personal
(
    id   INT         NOT NULL,
    name VARCHAR(32) NOT NULL
);
# 方式二：创建表后，修改表结构，声明字段非空
DROP TABLE IF EXISTS personal;
CREATE TABLE personal
(
    id   INT NOT NULL,
    name VARCHAR(32)
);
ALTER TABLE personal MODIFY name VARCHAR(32) NOT NULL;

DESC Persons;
```

#### 删除非空约束

```sql
ALTER TABLE personal MODIFY name VARCHAR(32);
```

### 默认约束

在添加数据中，如果该字段不指定值，采用默认值处理

#### 添加默认约束

```sql
# 方式一：创建表时，在字段描述处，声明默认：
DROP TABLE IF EXISTS personal;
CREATE TABLE personal
(
    id   INT,
    name VARCHAR(32) DEFAULT 'XwCoding'
);
# 方式二：创建表后，修改表结构，声明字段默认：
DROP TABLE IF EXISTS personal;
CREATE TABLE personal
(
    id   INT,
    name VARCHAR(32)
);
ALTER TABLE personal MODIFY name VARCHAR(32) DEFAULT 'XwCoding';

DESC personal;
```

#### 删除默认约束

```sql
ALTER TABLE Persons MODIFY Address VARCHAR(32);
```

### 外键约束

- 使用外键目的：保证数据完整性
- 从表外键的值是对主表主键的引用
- 从表外键类型，必须与主表主键类型一致

#### 声明外键约束

```sql
# 方式一：创建表时，在 CONSTRAINT 约束区域，声明指定字段为外键：
# - 格式：[CONSTRAINT][外键名称] FOREIGN KEY (从表外键字段名) REFERENCES 主表(主表的主键)
# - 关键字 CONSTRAINT 可以省略，如果需要为外键命名，CONSTRAINT 不能省略，[外键名称]用于删除外键约束的，一般建议“_fk”结尾
DROP TABLE IF EXISTS category;
CREATE TABLE category
(
    cid   VARCHAR(32) PRIMARY KEY,
    cname VARCHAR(50)	# 分类名称
);
DROP TABLE IF EXISTS products;
CREATE TABLE products
(
    pid         VARCHAR(32) PRIMARY KEY,
    category_id VARCHAR(32),
    CONSTRAINT products_fk FOREIGN KEY (category_id) REFERENCES category (cid)
);
# 方式二：建表之后，通过修改表结构，声明指定字段为外键：
# - 格式：ALTER TABLE 从表 ADD [CONSTRAINT][外键名称] FOREIGN KEY (从表外键字段名) REFERENCES 主表(主表的主键)
DROP TABLE IF EXISTS products;
CREATE TABLE products
(
    pid         VARCHAR(32) PRIMARY KEY,
    category_id VARCHAR(32)
);
ALTER TABLE products ADD CONSTRAINT products_fk FOREIGN KEY (category_id) REFERENCES category (cid);
```

#### 删除外键约束

```sql
# ALTER TABLE 从表 DROP FOREIGN KEY 外键名称;
ALTER TABLE products DROP FOREIGN KEY products_fk;
```

## SQL 索引

**索引的概念**

索引是一种特殊的文件（InnoDB 数据表上的索引是表空间的一个组成部分），它们包含着数据表里所有文件的引用指针。可以类比为书的目录，可以加快数据库的查询速度。

索引是创建在数据库表对象上的，由表中的一个字段或多个字段生成的键组成，这些键存储在数据结构（ B-树或哈希表）中，通过 mysql 可以快速有效的查找与键值相关联的字段。

根据存储类型，分为 B 型树索引和哈希索引

​		InnoDB 和 MyISAM 支持 BTREE 类型索引（默认）

​		Memory 支持 HASH 类型的索引

**索引的种类**

众所周知，索引类似于字典的目录，可以提高查询的效率。

从逻辑上可以分为：普通索引、唯一索引、主键索引、联合索引、全文索引

从物理上可以分为：聚集索引、非聚集索引

**索引的常见模型**

索引的出现是为了提高查询效率，但是实现索引的方式却有很多种，所以这里也就引入了索引模型的概念。

可以用于提高读写效率的数据结构很多，这里介绍三种常见、也比较简单的数据结构，它们分别是哈希表、有序数组和搜索树。

**普通索引**

最基本的索引，没有任何限制，MyIASM 中默认的 BTREE 类型的索引，经常使用

```sql
# 1、直接创建索引
CREATE INDEX index_name ON table(column(length))
# 2、修改表结构的方式添加索引
ALTER TABLE table_name ADD INDEX index_name ON (column(length))
# 3、创建表的时候同时创建索引
CREATE TABLE `table` (
	`id` int(11) NOT NULL AUTO_INCREMENT ,
	`title` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
	`content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
	`time` int(10) NULL DEFAULT NULL ,
	PRIMARY KEY (`id`),
  INDEX index_name (title(length))
)
# 4、删除索引
DROP INDEX index_name ON table
```

**唯一索引**

与普通索引类似，不同的是：索引的列必须唯一，但允许有空值

创建方式如上，将 INDEX 替换为 UNIQUE INDEX

**主键索引**

它是一种特殊的唯一索引，不允许有空值

**联合索引**

它是指在创建索引的时候，所关联的字段不是一个字段，而是多个字段。虽然可以通过所关联的字段进行查询，但是只有查询条件中使用了所关联字段中的第一个字段，多列索引才会被使用

**全文索引**

FULLTEXT 索引仅仅可用于 MyISAM 表，它们可以从 CHAR、VARCHAR 或 TEXT 列中作为 CREATE TABLE 语句的一部分被创建，或是随后使用 ALTER TABLE 或 CREATE INDEX 被添加

*tip：大容量的表，使用全文索引虽然速度更快，但是生产全文索引是一个非常消耗时间消耗磁盘空间的做法*

**组合索引（最左前缀）**

所谓多列索引，是指在创建索引的时候，所关联的字段不是一个字段，而是多个字段。虽然可以通过所关联的字段进行查询，但是只有查询条件中使用了所关联字段中的第一个字段，多列索引才会被使用

**什么情况下适合创建索引**

1. 经常被查询的字段，即在 WHERE 子句中出现的字段
2. 在分组的字段，即在 GROUP BY 子句中出现的字段
3. 存在依赖关系的子表和父表之间的联合查询，即主键或外键字段
4. 设置唯一完整性约束的字段

**什么情况下不适合创建索引**

1. 在查询中很少使用的字段
2. 拥有许多重复值的字段

**索引失效**

1. 使用or关键字的时候索引失效，要想使用or，又想使用索引，只能将or条件中的每个列都加上索引
2. 对于多列索引，不是使用的第一部分，则不会使用索引
3. like查询是以%开头
4. 如果列类型是字符串，那一定要在条件中将数据使用引号引用起来,否则不使用索引
5. 如果mysql估计使用全表扫描要比使用索引快,则不使用索引
6. 对索引列进行运算导致索引失效(+，-，*，/，! 等)
7. 独立的列（对列变量需要计算（聚合运算、类型转换等））
8. 在JOIN操作中（需要从多个数据表提取数据时），MYSQL只有在主键和外键的数据类型相同时才能使用索引，否则即使建立了 索引也不会使用
9. 不使用NOT IN和<>操作，不会使用索引将进行全表扫描，NOT IN可以NOT EXISTS代替，id<>3则可使用id>3 or id<3来代替
10. 索引不会包含有NULL值的列。只要列中包含有NULL值都将不会被包含在索引中，复合索引中只要有一列含有NULL值，那么这一列对于此复合索引就是无效的。所以我们在数据库设计时不要让字段的默认值为NULL。

**查看索引**

```sql
 show status like 'Handler_read%';
```

**优化索引**

1. 索引不会包含有 NULL 值的列，因此数据库设计时不要让字段的默认值为NULL
2. 使用短索引
3. 索引列排序
4. 不要在列上进行运算

## SQL 优化

索引优化策略

1⃣️、不要在索引列上进行运算或使用函数	-- 在列上进行运算或使用函数会使索引失效，从而进行全表扫描。

如下面例子在 id、publish_time 列上分别加上索引，id 为 int 类型、publish_time 为 datetime 类型

```sql
-- 全表扫描
select * from article where id + 1 = 5
-- 走索引
select * from article where id = 4
-- 全表扫描
select * from article where year(publish_time) < 2019
-- 走索引
select * from article where publish_time < '2019-01-01'
```

2⃣️、小心隐式类型转换

如下面例子假设 id 为 varchar 类型

```sql
-- 全表扫描
select * from article where id = 100
-- 走索引
select * from article where id = '100'
```

为什么呢？

```sql
select * from article where id = 100
-- 等价于
select * from article where CAST(id AS signed int) = 100
```

上一条规则说过，不要在索引列上使用函数，隐式类型转换在索引字段上做了函数操作，因此会全表扫描

那么如果 id 是 int，执行下面这个语句是否会导致全表扫描呢？

```sql
select * from article where id = '100'
```

答案是会用到索引

3⃣️、前导模糊查询不会使用索引

```sql
-- 全表扫描
select * from article where author like '%李'
```

%李,%李%都会导致全表扫描，非前导模糊查询可以使用索引

```sql
-- 走索引
select * from article where author like '李%'
```

4⃣️、联合索引最左前缀原则

mysql 会一直向右匹配直到遇到范围查询 ( >、<、between、like ) 就停止匹配，比如 a = 1 and b = 2 and c > 3 and d = 4 如果建立 ( a,b,c,d ) 顺序的索引，d 是用不到索引的，如果建立 ( a,b,d,c ) 的索引则都可以用到，a,b,d 的顺序可以任意调整

1.将区分度最高的字段放在最左边	-- 当不需要考虑排序和分组时，将区分度最高的列放在前面通常是很好的。这时候索引的作用只是用于优化 WHERE 条件的查找

如果在 a b 列上建立联合索引，该如何建立，才能使查询效率最高

```sql
select count(distinct a) / count(*), count(distinct b) / count(*), count(*) from table
```

执行如下语句，假设3个输出依次为0.001,0.373,16049，可以看到 b 列的选择性最高，因此将其作为联合索引的第一列，即建立 ( b, a ) 的联合索引

2.查询时 = 可以乱序
如果建立了联合索引 ( a, b )， 例如下面的2个写法是等价的，因为 MySQL 会将查询的顺序优化成和联合索引的顺序一致

```sql
select * from table where a = '1' and b = '1'
select * from table where b = '1' and a = '1'
```

3.优化查询，避免出现 filesort

```sql
select * from table where a = ? and b = ? order by c
```

最左前缀原则不仅用在查询中，还能用在排序中。MySQL 中，有两种方式生成有序结果集：

1. 通过有序索引顺序扫描直接返回有序数据
2. Filesort排序，对返回的数据进行排序

因为索引的结构是 B+ 树，索引中的数据是按照一定顺序进行排列的，所以在排序查询中如果能利用索引，就能避免额外的排序操作。 EXPLAIN 分析查询时，Extra 显示为 Using index。

所有不是通过索引直接返回排序结果的操作都是Filesort排序，也就是说进行了额外的排序操作。EXPLAIN分析查询时，Extra显示为Using filesort，当出现Using filesort时对性能损耗较大，所以要尽量避免Using filesort

对于如下sql

```sql
select * from table where a = ? and b = ? order by c
```

可以建立联合索引（a, b, c）

如果索引中有范围查找，那么索引有序性无法利用，如

```sql
select * from table where a > 10 order by b
```

索引 ( a，b ) 无法排序。

放几个例子

```sql
-- 使用了a列
where a = 3
-- 使用了a b列
where a = 3 and b = 5
-- 使用了a b c列
where a = 3 and c = 4 and b = 5
-- 没有使用索引
where b = 3
-- 使用了a列 
where a = 3 and c = 4
-- 使用了a b列 
where a = 3 and b > 10 and c = 7
-- 使用了a b 列
where a = 3 and b like 'xx%' and c = 7
```

5⃣️、union，or，in都能命中索引，建议使用in

```sql
select * from article where id = 1 union all select * from article where id = 2
select * from article where id in (1 , 2)
```

新版MySQL的or可以命中索引

```sql
select * from article where id = 1 or id = 2
```

效率从高到低为 union，in，or。in和 union 的效率差别可以忽略不计，建议使用in

6⃣️、负向条件索引不会使用索引，建议用in	-- 负向条件有：!=、<>、not in、not exists、not like 等

```sql
-- 全表扫描
select * from article where id != 1 and id != 2
```

知道id的所有取值范围，可以改为类似如下形式

```sql
-- 走索引
select * from article where id in (0, 3, 4)
```

7⃣️、建立覆盖索引	-- 众所周知，表数据是放在一个聚集索引上的，而建立的索引为非聚集索引，非聚集索引的叶子节点存放索引键值，以及该索引键指向的主键。一般查找的过程是从非聚集索引上找到数据的主键，然后根据该主键到聚集索引上查找记录，这个过程称为回表，不清楚的看推荐阅读。

如有下面这个sql

```sql
select uid, login_time from user where username = ? and passwd = ?
```

可以建立(username, passwd, login_time)的联合索引，由于 login_time的值可以直接从索引中拿到，不用再回表查询，提高了查询效率

8⃣️、经常更改，区分度不高的列上不宜加索引	-- 更新会变更 B+ 树，更新频繁的字段建立索引会大大降低数据库性能。

“性别”这种区分度不大的属性，建立索引是没有什么意义的，不能有效过滤数据，性能与全表扫描类似。

一般区分度在80%以上的时候就可以建立索引，区分度可以使用 count(distinct(列名))/count(*) 来计算

9⃣️、明确知道只会返回一条记录，可以加 limit1

当查询确定只有一条记录时，可以加liimit1，让MySQL停止游标移动，提高查询效率

```sql
select uid from user where username = ? and passwd = ?
```

可改为

```sql
select uid from user where username = ? and passwd = ? limit 1
```

🔟、对文本建立前缀索引

用邮箱登录是一个常见的问题，如果对email整个字段建立索引，会让索引变得大且慢

```
select username from user where email='xxx';
```

这时我们可以索引开始的部分字符，这样可以大大节约索引空间，从而提高索引效率，但这样也会降低索引的区分度。索引的区分度是指，不重复的索引值和数据表的记录总数的比值。索引的区分度越高则查询效率越高，因为区分度高的索引可以让MySQL在查找时过滤掉更多的行。

因此我们选择足够长的前缀保证较高的区分度，同时又不能太长（以便节约空间）

可以进行如下实验

```sql
select count(distinct left(email, 5)) / count(*) as col5, count(distinct left(email, 6)) / count(*) as col6, count(distinct left(email, 7)) / count(*) as col7 from user
```

假设输出依次为 0.0305，0.0309，0.0310
查询显示当前缀长度达到7的时候，再增加前缀长度，区分度提升的幅度已经很小了，因此创建email(7)的前缀索引即可

需要注意的一点是，前缀索引不能使用覆盖索引，因为从索引中获取不到完整的数据，还得回表查询

1⃣️1⃣️、建立索引的列不为NULL	-- 只要列中包含有 NULL 值都将不会被包含在索引中，复合索引中只要有一列含有 NULL值，那么这一列对于此复合索引就是无效的。因此，在数据库设计时，除非有一个很特别的原因使用 NULL 值，不然尽量不要让字段的默认值为 NULL。

1⃣️2⃣️、分页查询优化	-- MySQL 并不是跳过 offset 行，而是取 offset+N 行，然后返回放弃前 offset 行，返回 N 行，那当 offset 特别大的时候，效率就非常的低下，要么控制返回的总页数，要么对超过特定阈值的页数进行 SQL 改写，单开一文来讲

推荐阅读

[MySQL索引为什么要用B+树实现？](http://mp.weixin.qq.com/s?__biz=MzIxMzk3Mjg5MQ==&mid=2247483916&idx=1&sn=bfc33b53f8176e6f4d7e64c087ad36a4&chksm=97afe0f8a0d869eeaa14d8b26eca9d6fa09f9fda4557b40cb22ebe75851aa4dfb67d822233d9&scene=21#wechat_redirect)

[图解： EXPLAIN 实战-1](http://mp.weixin.qq.com/s?__biz=MzIxMzk3Mjg5MQ==&mid=2247483986&idx=1&sn=1e5622dae2db09408e2df2a41a8b461b&chksm=97afe0a6a0d869b0f8af6c76206544b54d033fc9bd03b947a82aec87de28332d73aeb11ce72f&scene=21#wechat_redirect)

[你确定真正理解联合索引和最左前缀原则？](http://mp.weixin.qq.com/s?__biz=MzIxMzk3Mjg5MQ==&mid=2247484011&idx=1&sn=99f1807a62807dc47b3d9ca10fbd7369&chksm=97afe09fa0d869898f1059d7063aa805190186f324681cb8b7bb0ec06788f10851065ede61a8&scene=21#wechat_redirect)

避免 LEFT JOIN 和 NULL

​    当然，有很多时候您需要执行 LEFT JOIN 和使用 NULL 值。但是，它们并不适用于所有情况。改变 SQL 查询的构建方式可能会产生将一个花几分钟运行的报告缩短到只花几秒钟这样的天壤之别的效果。有时，必须在查询中调整数据的形态，使之适应应用程序所要求的显示方式。虽然 TABLE 数据类型会减少大量占用资源的情况，但在查询中还有许多区域可以进行优化。SQL 的一个有价值的常用功能是 LEFT JOIN。它可以用于检索第一个表中的所有行、第二个表中所有匹配的行、以及第二个表中与第一个表不匹配的所有行。例如，如果希望返回每个客户及其定单，使用 LEFT JOIN 则可以显示有定单和没有定单的客户。

此工具可能会被过度使用。LEFT JOIN 消耗的资源非常之多，因为它们包含与 NULL（不存在）数据匹配的数据。在某些情况下，这是不可避免的，但是代价可能非常高。LEFT JOIN 比 INNER JOIN 消耗资源更多，所以如果您可以重新编写查询以使得该查询不使用任何 LEFT JOIN，则会得到非常可观的回报（请参阅图 1 中的图）。

![img](http://www.microsoft.com/china/MSDN/library/data/sqlserver/art/5wayfig01.gif)

   加快使用 LEFT JOIN 的查询速度的一项技术涉及创建一个 TABLE 数据类型，插入第一个表（LEFT JOIN 左侧的表）中的所有行，然后使用第二个表中的值更新 TABLE 数据类型。此技术是一个两步的过程，但与标准的 LEFT JOIN 相比，可以节省大量时间。一个很好的规则是尝试各种不同的技术并记录每种技术所需的时间，直到获得用于您的应用程序的执行性能最佳的查询。

测试查询的速度时，有必要多次运行此查询，然后取一个平均值。因为查询（或存储过程）可能会存储在 SQL Server 内存中的过程缓存中，因此第一次尝试耗费的时间好像稍长一些，而所有后续尝试耗费的时间都较短。另外，运行您的查询时，可能正在针对相同的表运行其他查询。当其他查询锁定和解锁这些表时，可能会导致您的查询要排队等待。例如，如果您进行查询时某人正在更新此表中的数据，则在更新提交时您的查询可能需要耗费更长时间来执行。

避免使用 LEFT JOIN 时速度降低的最简单方法是尽可能多地围绕它们设计数据库。例如，假设某一产品可能具有类别也可能没有类别。如果 Products 表存储了其类别的 ID，而没有用于某个特定产品的类别，则您可以在字段中存储 NULL 值。然后您必须执行 LEFT JOIN 来获取所有产品及其类别。您可以创建一个值为“No Category”的类别，从而指定外键关系不允许 NULL 值。通过执行上述操作，现在您就可以使用 INNER JOIN 检索所有产品及其类别了。虽然这看起来好像是一个带有多余数据的变通方法，但可能是一个很有价值的技术，因为它可以消除 SQL 批处理语句中消耗资源较多的 LEFT JOIN。在数据库中全部使用此概念可以为您节省大量的处理时间。请记住，对于您的用户而言，即使几秒钟的时间也非常重要，因为当您有许多用户正在访问同一个联机数据库应用程序时，这几秒钟实际上的意义会非常重大。

UNION 和 UNION ALL 的区别

Union：对两个结果集进行并集操作，不包括重复行，同时进行默认规则的排序；

Union All：对两个结果集进行并集操作，包括重复行，不进行排序；

1、建库、建表并插入测试数据：

```sql
CREATE DATABASE learningsql;

CREATE TABLE table01(
	id INT NOT NULL,
	name VARCHAR(20) NOT NULL
);
CREATE TABLE table02(
	id INT NOT NULL,
	name VARCHAR(20) NOT NULL
);

INSERT INTO table01 VALUES (1,'姚羽');
INSERT INTO table01 VALUES (2,'边兵兵');
INSERT INTO table01 VALUES (3,'袁磊');
  
INSERT INTO table02 VALUES (1,'姚羽');
INSERT INTO table02 VALUES (2,'柳春平');
INSERT INTO table02 VALUES (3,'张永超');
INSERT INTO table02 VALUES (4,'刘华健');

SELECT * FROM table01;
SELECT * FROM table02;
```

2、测试：

![image-20191209175521827](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20191209175521827.png)

```sql
SELECT * FROM table01 UNION SELECT * FROM table02;

SELECT * FROM table01 UNION ALL SELECT * FROM table02;
```

| UNION |        |      | UNION ALL |        |
| ----- | ------ | ---- | --------- | ------ |
| id    | name   |      | id        | name   |
| 1     | 姚羽   |      | 1         | 姚羽   |
| 2     | 边兵兵 |      | 2         | 边兵兵 |
| 3     | 袁磊   |      | 3         | 袁磊   |
| 2     | 柳春平 |      | 1         | 姚羽   |
| 3     | 张永超 |      | 2         | 柳春平 |
| 4     | 刘华健 |      | 3         | 张永超 |
|       |        |      | 4         | 刘华健 |

## SQL备份与恢复

SQL备份

数据库的备份是指将数据库转换成对应的sql文件

MySQL命令备份

数据库导出sql脚本的格式：

```shell
mysqldump ‐u用户名 ‐p密码 数据库名>生成的脚本文件路径
例：mysqldump -uroot -proot dql>d:\dql.sql
```

以上备份数据库的命令中需要用户名和密码，即表明该命令要在用户没有登录的情况下使用

SQL恢复

数据库的恢复指的是使用备份产生的sql文件恢复数据库，即将sql文件中的sql语句执行就可以恢复数据库内容。

MySQL命令恢复

使用数据库命令备份的时候只是备份了数据库内容，产生的sql文件中没有创建数据库的sql语句，在恢复数据库之 前需要自己动手创建数据库。

在数据库外恢复

```shell
格式: mysql -uroot -p密码 数据库名<文件路径
例: mysql -uroot -proot dql<d:\dql.sql
```

在数据库内恢复

```shell
格式: source SQL脚本路径
例如: source d:\dql.sql
注意:使用这种方式恢复数据，首先要登录数据库
```

## 事务日志

事务的隔离级别是通过锁实现的，而事务的原子性、一致性和持久性则是通过事务日志实现的

**redo**

事务的实现是基于数据库的存储引擎，不同的存储引擎对事务的支持程度不一样，MySQL 中支持事务的存储引擎有 InnoDB，在 InnoDB 的存储引擎中，事务日志通过重做 (redo) 日志和 InnoDB 存储引擎的日志缓冲 (InnoDB Log Buffer) 实现。事务开启时，事务中的操作，都会先写入存储引擎的日志缓冲中，在事务提交之前，这些缓冲的日志都需要提前刷新到磁盘上持久化，这就是 DBA 们口中常说的“日志先行” (Write-Ahead Logging)。当事务提交之后，在 Buffer Pool 中映射的数据文件才会慢慢刷新到磁盘。此时如果数据库崩溃或者宕机，那么当系统重启进行恢复时，就可以根据 redo log 中记录的日志，把数据库恢复到崩溃前的一个状态。未完成的事务，可以继续提交，也可以选择回滚，这基于恢复的策略而定。

**undo**

undo log 主要为事务的回滚服务。在事务执行的过程中，除了记录 redo log，还会记录一定量的 undo log。undo log 记录了数据在每个操作前的状态，如果事务执行过程中需要回滚，就可以根据 undo log 进行回滚操作。单个事务的回滚，只会回滚当前事务做的操作，并不会影响到其他的事务做的操作。

## 存储过程

存储过程（Stored Procedure）是一种在数据库中存储复杂程序，以便外部程序调用的一种数据库对象。

存储过程是为了完成特定功能的SQL语句集，经编译创建并保存在数据库中，用户可通过指定存储过程的名字并给定参数(需要时)来调用执行。

存储过程思想上很简单，就是数据库 SQL 语言层面的代码封装与重用。

优点：

- 存储过程可封装，并隐藏复杂的商业逻辑。
- 存储过程可以回传值，并可以接受参数。
- 存储过程无法使用 SELECT 指令来运行，因为它是子程序，与查看表，数据表或用户定义函数不同。
- 存储过程可以用在数据检验，强制实行商业逻辑等。

缺点

- 存储过程，往往定制化于特定的数据库上，因为支持的编程语言不同。当切换到其他厂商的数据库系统时，需要重写原有的存储过程。
- 存储过程的性能调校与撰写，受限于各种数据库系统。

存储过程的创建和调用

- 存储过程就是具有名字的一段代码，用来完成一个特定的功能。
- 创建的存储过程保存在数据库的数据字典中。

创建存储过程

## SQL In Action

学生、课程、成绩、教师表

初始化

```sql
### 表结构
# 	Student(S#,SName,SAge,SSex) 学生表
# 	Course(C#,CName,T#) 课程表
# 	SC(S#,C#,score) 成绩表
# 	Teacher(T#,TName) 教师表
	
### 建表语句
drop table if exists student;
CREATE TABLE student
(
    `S#`  INT,
    #`S#` int DEFAULT NULL,
    SName VARCHAR(25),
    SAge  INT,
    SSex  VARCHAR(25)
)ENGINE InnoDB DEFAULT CHARSET utf8;

drop table if exists course;
CREATE TABLE course
(
    `C#` INT,
    CName VARCHAR(25),
    `T#`  INT
);

drop table if exists sc;
CREATE TABLE sc
(
    `S#` INT,
    `C#` INT,
    score  INT
);

drop table if exists teacher;
CREATE TABLE teacher
(
    `T#` INT,
    TName  VARCHAR(25)
);

# 插入测试数据
insert into Student select 1,N'刘一',18,N'男' union all
 select 2,N'钱二',19,N'女' union all
 select 3,N'张三',17,N'男' union all
 select 4,N'李四',18,N'女' union all
 select 5,N'王五',17,N'男' union all
 select 6,N'赵六',19,N'女';
 
 insert into Teacher select 1,N'叶平' union all
 select 2,N'贺高' union all
 select 3,N'杨艳' union all
 select 4,N'周磊';
 
 insert into Course select 1,N'语文',1 union all
 select 2,N'数学',2 union all
 select 3,N'英语',3 union all
 select 4,N'物理',4;
 
 insert into SC 
 select 1,1,56 union all 
 select 1,2,78 union all 
 select 1,3,67 union all 
 select 1,4,58 union all 
 select 2,1,79 union all 
 select 2,2,81 union all 
 select 2,3,92 union all 
 select 2,4,68 union all 
 select 3,1,91 union all 
 select 3,2,47 union all 
 select 3,3,88 union all 
 select 3,4,56 union all 
 select 4,2,88 union all 
 select 4,3,90 union all 
 select 4,4,93 union all 
 select 5,1,46 union all 
 select 5,3,78 union all 
 select 5,4,53 union all 
 select 6,1,35 union all 
 select 6,2,68 union all 
 select 6,4,71;
```

问题

```sql
1、查询“001”课程比“002”课程成绩高的所有学生的学号； 
  select a.S# from (select s#,score from SC where C#='001') a,(select s#,score 
  from SC where C#='002') b 
  where a.score>b.score and a.s#=b.s#; 
2、查询平均成绩大于60分的同学的学号和平均成绩； 
    select S#,avg(score) 
    from sc 
    group by S# having avg(score) >60; 
3、查询所有同学的学号、姓名、选课数、总成绩； 
  select Student.S#,Student.Sname,count(SC.C#),sum(score) 
  from Student left Outer join SC on Student.S#=SC.S# 
  group by Student.S#,Sname 
4、查询姓“李”的老师的个数； 
  select count(distinct(Tname)) 
  from Teacher 
  where Tname like '李%'; 
5、查询没学过“叶平”老师课的同学的学号、姓名； 
    select Student.S#,Student.Sname 
    from Student  
    where S# not in (select distinct( SC.S#) from SC,Course,Teacher where  SC.C#=Course.C# and Teacher.T#=Course.T# and Teacher.Tname='叶平'); 
6、查询学过“001”并且也学过编号“002”课程的同学的学号、姓名； 
  select Student.S#,Student.Sname from Student,SC where Student.S#=SC.S# and SC.C#='001'and exists( Select * from SC as SC_2 where SC_2.S#=SC.S# and SC_2.C#='002'); 
7、查询学过“叶平”老师所教的所有课的同学的学号、姓名； 
  select S#,Sname 
  from Student 
  where S# in (select S# from SC ,Course ,Teacher where SC.C#=Course.C# and Teacher.T#=Course.T# and Teacher.Tname='叶平' group by S# having count(SC.C#)=(select count(C#) from Course,Teacher  where Teacher.T#=Course.T# and Tname='叶平')); 
8、查询课程编号“002”的成绩比课程编号“001”课程低的所有同学的学号、姓名； 
  Select S#,Sname from (select Student.S#,Student.Sname,score ,(select score from SC SC_2 where SC_2.S#=Student.S# and SC_2.C#='002') score2 
  from Student,SC where Student.S#=SC.S# and C#='001') S_2 where score2 <score; 
9、查询所有课程成绩小于60分的同学的学号、姓名； 
  select S#,Sname 
  from Student 
  where S# not in (select S.S# from Student AS S,SC where S.S#=SC.S# and score>60); 
10、查询没有学全所有课的同学的学号、姓名； 
    select Student.S#,Student.Sname 
    from Student,SC 
    where Student.S#=SC.S# group by  Student.S#,Student.Sname having count(C#) <(select count(C#) from Course); 
11、查询至少有一门课与学号为“1001”的同学所学相同的同学的学号和姓名； 
    select distinct S#,Sname from Student,SC where Student.S#=SC.S# and SC.C# in (select C# from SC where S#='1001'); 
12、查询至少学过学号为“001”同学所有一门课的其他同学学号和姓名； 
    select distinct SC.S#,Sname 
    from Student,SC 
    where Student.S#=SC.S# and C# in (select C# from SC where S#='001'); 
13、把“SC”表中“叶平”老师教的课的成绩都更改为此课程的平均成绩； 
    update SC set score=(select avg(SC_2.score) 
    from SC SC_2 
    where SC_2.C#=SC.C# ) from Course,Teacher where Course.C#=SC.C# and Course.T#=Teacher.T# and Teacher.Tname='叶平'); 
14、查询和“1002”号的同学学习的课程完全相同的其他同学学号和姓名； 
    select S# from SC where C# in (select C# from SC where S#='1002') 
    group by S# having count(*)=(select count(*) from SC where S#='1002'); 
15、删除学习“叶平”老师课的SC表记录； 
    Delect SC 
    from course ,Teacher  
    where Course.C#=SC.C# and Course.T#= Teacher.T# and Tname='叶平'; 
16、向SC表中插入一些记录，这些记录要求符合以下条件：没有上过编号“003”课程的同学学号、2、 
    号课的平均成绩； 
    Insert SC select S#,'002',(Select avg(score) 
    from SC where C#='002') from Student where S# not in (Select S# from SC where C#='002'); 
17、按平均成绩从高到低显示所有学生的“数据库”、“企业管理”、“英语”三门的课程成绩，按如下形式显示： 学生ID,,数据库,企业管理,英语,有效课程数,有效平均分 
    SELECT S# as 学生ID 
        ,(SELECT score FROM SC WHERE SC.S#=t.S# AND C#='004') AS 数据库 
        ,(SELECT score FROM SC WHERE SC.S#=t.S# AND C#='001') AS 企业管理 
        ,(SELECT score FROM SC WHERE SC.S#=t.S# AND C#='006') AS 英语 
        ,COUNT(*) AS 有效课程数, AVG(t.score) AS 平均成绩 
    FROM SC AS t 
    GROUP BY S# 
    ORDER BY avg(t.score)  
18、查询各科成绩最高和最低的分：以如下形式显示：课程ID，最高分，最低分 
    SELECT L.C# As 课程ID,L.score AS 最高分,R.score AS 最低分 
    FROM SC L ,SC AS R 
    WHERE L.C# = R.C# and 
        L.score = (SELECT MAX(IL.score) 
                      FROM SC AS IL,Student AS IM 
                      WHERE L.C# = IL.C# and IM.S#=IL.S# 
                      GROUP BY IL.C#) 
        AND 
        R.Score = (SELECT MIN(IR.score) 
                      FROM SC AS IR 
                      WHERE R.C# = IR.C# 
                  GROUP BY IR.C# 
                    ); 
自己写的:select c# ,max(score)as 最高分 ,min(score) as 最低分 from dbo.sc  group by c#
19、按各科平均成绩从低到高和及格率的百分数从高到低顺序 
    SELECT t.C# AS 课程号,max(course.Cname)AS 课程名,isnull(AVG(score),0) AS 平均成绩 
        ,100 * SUM(CASE WHEN  isnull(score,0)>=60 THEN 1 ELSE 0 END)/COUNT(*) AS 及格百分数 
    FROM SC T,Course 
    where t.C#=course.C# 
    GROUP BY t.C# 
    ORDER BY 100 * SUM(CASE WHEN  isnull(score,0)>=60 THEN 1 ELSE 0 END)/COUNT(*) DESC 
20、查询如下课程平均成绩和及格率的百分数(用"1行"显示): 企业管理（001），马克思（002），OO&UML （003），数据库（004） 
    SELECT SUM(CASE WHEN C# ='001' THEN score ELSE 0 END)/SUM(CASE C# WHEN '001' THEN 1 ELSE 0 END) AS 企业管理平均分 
        ,100 * SUM(CASE WHEN C# = '001' AND score >= 60 THEN 1 ELSE 0 END)/SUM(CASE WHEN C# = '001' THEN 1 ELSE 0 END) AS 企业管理及格百分数 
        ,SUM(CASE WHEN C# = '002' THEN score ELSE 0 END)/SUM(CASE C# WHEN '002' THEN 1 ELSE 0 END) AS 马克思平均分 
        ,100 * SUM(CASE WHEN C# = '002' AND score >= 60 THEN 1 ELSE 0 END)/SUM(CASE WHEN C# = '002' THEN 1 ELSE 0 END) AS 马克思及格百分数 
        ,SUM(CASE WHEN C# = '003' THEN score ELSE 0 END)/SUM(CASE C# WHEN '003' THEN 1 ELSE 0 END) AS UML平均分 
        ,100 * SUM(CASE WHEN C# = '003' AND score >= 60 THEN 1 ELSE 0 END)/SUM(CASE WHEN C# = '003' THEN 1 ELSE 0 END) AS UML及格百分数 
        ,SUM(CASE WHEN C# = '004' THEN score ELSE 0 END)/SUM(CASE C# WHEN '004' THEN 1 ELSE 0 END) AS 数据库平均分 
        ,100 * SUM(CASE WHEN C# = '004' AND score >= 60 THEN 1 ELSE 0 END)/SUM(CASE WHEN C# = '004' THEN 1 ELSE 0 END) AS 数据库及格百分数 
  FROM SC 

21、查询不同老师所教不同课程平均分从高到低显示 
  SELECT max(Z.T#) AS 教师ID,MAX(Z.Tname) AS 教师姓名,C.C# AS 课程ＩＤ,MAX(C.Cname) AS 课程名称,AVG(Score) AS 平均成绩 
    FROM SC AS T,Course AS C ,Teacher AS Z 
    where T.C#=C.C# and C.T#=Z.T# 
  GROUP BY C.C# 
  ORDER BY AVG(Score) DESC 
22、查询如下课程成绩第 3 名到第 6 名的学生成绩单：企业管理（001），马克思（002），UML （003），数据库（004） 
    [学生ID],[学生姓名],企业管理,马克思,UML,数据库,平均成绩 
    SELECT  DISTINCT top 3 
      SC.S# As 学生学号, 
        Student.Sname AS 学生姓名 , 
      T1.score AS 企业管理, 
      T2.score AS 马克思, 
      T3.score AS UML, 
      T4.score AS 数据库, 
      ISNULL(T1.score,0) + ISNULL(T2.score,0) + ISNULL(T3.score,0) + ISNULL(T4.score,0) as 总分 
      FROM Student,SC  LEFT JOIN SC AS T1 
                      ON SC.S# = T1.S# AND T1.C# = '001' 
            LEFT JOIN SC AS T2 
                      ON SC.S# = T2.S# AND T2.C# = '002' 
            LEFT JOIN SC AS T3 
                      ON SC.S# = T3.S# AND T3.C# = '003' 
            LEFT JOIN SC AS T4 
                      ON SC.S# = T4.S# AND T4.C# = '004' 
      WHERE student.S#=SC.S# and 
      ISNULL(T1.score,0) + ISNULL(T2.score,0) + ISNULL(T3.score,0) + ISNULL(T4.score,0) 
      NOT IN 
      (SELECT 
            DISTINCT 
            TOP 15 WITH TIES 
            ISNULL(T1.score,0) + ISNULL(T2.score,0) + ISNULL(T3.score,0) + ISNULL(T4.score,0) 
      FROM sc 
            LEFT JOIN sc AS T1 
                      ON sc.S# = T1.S# AND T1.C# = 'k1' 
            LEFT JOIN sc AS T2 
                      ON sc.S# = T2.S# AND T2.C# = 'k2' 
            LEFT JOIN sc AS T3 
                      ON sc.S# = T3.S# AND T3.C# = 'k3' 
            LEFT JOIN sc AS T4 
                      ON sc.S# = T4.S# AND T4.C# = 'k4' 
      ORDER BY ISNULL(T1.score,0) + ISNULL(T2.score,0) + ISNULL(T3.score,0) + ISNULL(T4.score,0) DESC); 

23、统计列印各科成绩,各分数段人数:课程ID,课程名称,[100-85],[85-70],[70-60],[ <60] 
    SELECT SC.C# as 课程ID, Cname as 课程名称 
        ,SUM(CASE WHEN score BETWEEN 85 AND 100 THEN 1 ELSE 0 END) AS [100 - 85] 
        ,SUM(CASE WHEN score BETWEEN 70 AND 85 THEN 1 ELSE 0 END) AS [85 - 70] 
        ,SUM(CASE WHEN score BETWEEN 60 AND 70 THEN 1 ELSE 0 END) AS [70 - 60] 
        ,SUM(CASE WHEN score < 60 THEN 1 ELSE 0 END) AS [60 -] 
    FROM SC,Course 
    where SC.C#=Course.C# 
    GROUP BY SC.C#,Cname; 

24、查询学生平均成绩及其名次 
      SELECT 1+(SELECT COUNT( distinct 平均成绩) 
              FROM (SELECT S#,AVG(score) AS 平均成绩 
                      FROM SC 
                  GROUP BY S# 
                  ) AS T1 
            WHERE 平均成绩 > T2.平均成绩) as 名次, 
      S# as 学生学号,平均成绩 
    FROM (SELECT S#,AVG(score) 平均成绩 
            FROM SC 
        GROUP BY S# 
        ) AS T2 
    ORDER BY 平均成绩 desc; 
  
25、查询各科成绩前三名的记录:(不考虑成绩并列情况) 
      SELECT t1.S# as 学生ID,t1.C# as 课程ID,Score as 分数 
      FROM SC t1 
      WHERE score IN (SELECT TOP 3 score 
              FROM SC 
              WHERE t1.C#= C# 
            ORDER BY score DESC 
              ) 
      ORDER BY t1.C#; 
26、查询每门课程被选修的学生数 
  select c#,count(S#) from sc group by C#; 
27、查询出只选修了一门课程的全部学生的学号和姓名 
  select SC.S#,Student.Sname,count(C#) AS 选课数 
  from SC ,Student 
  where SC.S#=Student.S# group by SC.S# ,Student.Sname having count(C#)=1; 
28、查询男生、女生人数 
    Select count(Ssex) as 男生人数 from Student group by Ssex having Ssex='男'; 
    Select count(Ssex) as 女生人数 from Student group by Ssex having Ssex='女'； 
29、查询姓“张”的学生名单 
    SELECT Sname FROM Student WHERE Sname like '张%'; 
30、查询同名同性学生名单，并统计同名人数 
  select Sname,count(*) from Student group by Sname having  count(*)>1;; 
31、1981年出生的学生名单(注：Student表中Sage列的类型是datetime) 
    select Sname,  CONVERT(char (11),DATEPART(year,Sage)) as age 
    from student 
    where  CONVERT(char(11),DATEPART(year,Sage))='1981'; 
32、查询每门课程的平均成绩，结果按平均成绩升序排列，平均成绩相同时，按课程号降序排列 
    Select C#,Avg(score) from SC group by C# order by Avg(score),C# DESC ; 
33、查询平均成绩大于85的所有学生的学号、姓名和平均成绩 
    select Sname,SC.S# ,avg(score) 
    from Student,SC 
    where Student.S#=SC.S# group by SC.S#,Sname having    avg(score)>85; 
34、查询课程名称为“数据库”，且分数低于60的学生姓名和分数 
    Select Sname,isnull(score,0) 
    from Student,SC,Course 
    where SC.S#=Student.S# and SC.C#=Course.C# and  Course.Cname='数据库'and score <60; 
35、查询所有学生的选课情况； 
    SELECT SC.S#,SC.C#,Sname,Cname 
    FROM SC,Student,Course 
    where SC.S#=Student.S# and SC.C#=Course.C# ; 
36、查询任何一门课程成绩在70分以上的姓名、课程名称和分数； 
    SELECT  distinct student.S#,student.Sname,SC.C#,SC.score 
    FROM student,Sc 
    WHERE SC.score>=70 AND SC.S#=student.S#; 
37、查询不及格的课程，并按课程号从大到小排列 
    select c# from sc where scor e <60 order by C# ; 
38、查询课程编号为003且课程成绩在80分以上的学生的学号和姓名； 
    select SC.S#,Student.Sname from SC,Student where SC.S#=Student.S# and Score>80 and C#='003'; 
39、求选了课程的学生人数 
    select count(*) from sc; 
40、查询选修“叶平”老师所授课程的学生中，成绩最高的学生姓名及其成绩 
    select Student.Sname,score 
    from Student,SC,Course C,Teacher 
    where Student.S#=SC.S# and SC.C#=C.C# and C.T#=Teacher.T# and Teacher.Tname='叶平' and SC.score=(select max(score)from SC where C#=C.C# ); 
41、查询各个课程及相应的选修人数 
    select count(*) from sc group by C#; 
42、查询不同课程成绩相同的学生的学号、课程号、学生成绩 
  select distinct  A.S#,B.score from SC A  ,SC B where A.Score=B.Score and A.C# <>B.C# ; 
43、查询每门功成绩最好的前两名 
    SELECT t1.S# as 学生ID,t1.C# as 课程ID,Score as 分数 
      FROM SC t1 
      WHERE score IN (SELECT TOP 2 score 
              FROM SC 
              WHERE t1.C#= C# 
            ORDER BY score DESC 
              ) 
      ORDER BY t1.C#; 
44、统计每门课程的学生选修人数（超过10人的课程才统计）。要求输出课程号和选修人数，查询结果按人数降序排列，查询结果按人数降序排列，若人数相同，按课程号升序排列  
    select  C# as 课程号,count(*) as 人数 
    from  sc  
    group  by  C# 
    order  by  count(*) desc,c#  
45、检索至少选修两门课程的学生学号 
    select  S#  
    from  sc  
    group  by  s# 
    having  count(*)  >  =  2 
46、查询全部学生都选修的课程的课程号和课程名 
    select  C#,Cname  
    from  Course  
    where  C#  in  (select  c#  from  sc group  by  c#)  
47、查询没学过“叶平”老师讲授的任一门课程的学生姓名 
    select Sname from Student where S# not in (select S# from Course,Teacher,SC where Course.T#=Teacher.T# and SC.C#=course.C# and Tname='叶平'); 
48、查询两门以上不及格课程的同学的学号及其平均成绩 
    select S#,avg(isnull(score,0)) from SC where S# in (select S# from SC where score <60 group by S# having count(*)>2)group by S#; 
49、检索“004”课程分数小于60，按分数降序排列的同学学号 
    select S# from SC where C#='004'and score <60 order by score desc; 
50、删除“002”同学的“001”课程的成绩 
delete from Sc where S#='001'and C#='001'; 
```

借书卡、图书、借书记录表

初始化

```sql
问题描述：
本题用到下面三个关系表：
	CARD 借书卡、 CNO 卡号、NAME 姓名、CLASS 班级
	BOOKS 图书、BNO 书号、BNAME 书名、AUTHOR 作者、PRICE 单价、QUANTITY 库存册数
	BORROW 借书记录、 CNO 借书卡号、BNO 书号、RDATE 还书日期
备注：限定每人每种书只能借一本；库存册数随借书、还书而改变。
要求实现如下15个处理：
```

问题

```sql
1. 写出建立BORROW表的SQL语句，要求定义主码完整性约束和引用完整性约束
--实现代码：
CREATE TABLE BORROW(
    CNO int FOREIGN KEY REFERENCES CARD(CNO),
    BNO int FOREIGN KEY REFERENCES BOOKS(BNO),
    RDATE datetime,
    PRIMARY KEY(CNO,BNO)) 

2. 找出借书超过5本的读者,输出借书卡号及所借图书册数
--实现代码：
SELECT CNO,借图书册数=COUNT(*)
FROM BORROW
GROUP BY CNO
HAVING COUNT(*)>5

3. 查询借阅了"水浒"一书的读者，输出姓名及班级
--实现代码：
SELECT * FROM CARD c
WHERE EXISTS(
    SELECT * FROM BORROW a,BOOKS b 
    WHERE a.BNO=b.BNO
        AND b.BNAME=N'水浒'
        AND a.CNO=c.CNO) 

4. 查询过期未还图书，输出借阅者（卡号）、书号及还书日期
--实现代码：
SELECT * FROM BORROW 
WHERE RDATE<GETDATE() 

5. 查询书名包括"网络"关键词的图书，输出书号、书名、作者
--实现代码：
SELECT BNO,BNAME,AUTHOR FROM BOOKS
WHERE BNAME LIKE N'%网络%' 

6. 查询现有图书中价格最高的图书，输出书名及作者
--实现代码：
SELECT BNO,BNAME,AUTHOR FROM BOOKS
WHERE PRICE=(
    SELECT MAX(PRICE) FROM BOOKS) 

7. 查询当前借了"计算方法"但没有借"计算方法习题集"的读者，输出其借书卡号，并按卡号降序排序输出
--实现代码：
SELECT a.CNO
FROM BORROW a,BOOKS b
WHERE a.BNO=b.BNO AND b.BNAME=N'计算方法'
    AND NOT EXISTS(
        SELECT * FROM BORROW aa,BOOKS bb
        WHERE aa.BNO=bb.BNO
            AND bb.BNAME=N'计算方法习题集'
            AND aa.CNO=a.CNO)
ORDER BY a.CNO DESC 

8. 将"C01"班同学所借图书的还期都延长一周
--实现代码：
UPDATE b SET RDATE=DATEADD(Day,7,b.RDATE)
FROM CARD a,BORROW b
WHERE a.CNO=b.CNO
    AND a.CLASS=N'C01' 

9. 从BOOKS表中删除当前无人借阅的图书记录
--实现代码：
DELETE A FROM BOOKS a
WHERE NOT EXISTS(
    SELECT * FROM BORROW
    WHERE BNO=a.BNO) 

10. 如果经常按书名查询图书信息，请建立合适的索引
--实现代码：
CREATE CLUSTERED INDEX IDX_BOOKS_BNAME ON BOOKS(BNAME)

11. 在BORROW表上建立一个触发器，完成如下功能：如果读者借阅的书名是"数据库技术及应用"，就将该读者的借阅记录保存在BORROW_SAVE表中（注ORROW_SAVE表结构同BORROW表）
--实现代码：
CREATE TRIGGER TR_SAVE ON BORROW
FOR INSERT,UPDATE
AS
IF @@ROWCOUNT>0
INSERT BORROW_SAVE SELECT i.*
FROM INSERTED i,BOOKS b
WHERE i.BNO=b.BNO
    AND b.BNAME=N'数据库技术及应用' 

12. 建立一个视图，显示"力01"班学生的借书信息（只要求显示姓名和书名）
--实现代码：
CREATE VIEW V_VIEW
AS
SELECT a.NAME,b.BNAME
FROM BORROW ab,CARD a,BOOKS b
WHERE ab.CNO=a.CNO
    AND ab.BNO=b.BNO
    AND a.CLASS=N'力01'

13. 查询当前同时借有"计算方法"和"组合数学"两本书的读者，输出其借书卡号，并按卡号升序排序输出
--实现代码：
SELECT a.CNO
FROM BORROW a,BOOKS b
WHERE a.BNO=b.BNO
    AND b.BNAME IN(N'计算方法',N'组合数学')
GROUP BY a.CNO
HAVING COUNT(*)=2
ORDER BY a.CNO DESC 

14. 假定在建BOOKS表时没有定义主码，写出为BOOKS表追加定义主码的语句
--实现代码：
ALTER TABLE BOOKS ADD PRIMARY KEY(BNO) 

15.1 将NAME最大列宽增加到10个字符（假定原为6个字符）
--实现代码：
ALTER TABLE CARD ALTER COLUMN NAME varchar(10) 

15.2 为该表增加1列NAME（系名），可变长，最大20个字符
--实现代码：
ALTER TABLE CARD ADD 系名 varchar(20)
```

员工、课程、成绩表

初始化

```sql
问题描述：
为管理岗位业务培训信息，建立3个表:
S (S#,SN,SD,SA) S#,SN,SD,SA 分别代表学号、学员姓名、所属单位、学员年龄
C (C#,CN) C#,CN 分别代表课程编号、课程名称
SC (S#,C#,G) S#,C#,G 分别代表学号、所选修的课程编号、学习成绩
要求实现如下5个处理：
```

问题

```sql
1. 使用标准SQL嵌套语句查询选修课程名称为’税收基础’的学员学号和姓名 
--实现代码：
SELECT SN,SD FROM S
WHERE [S#] IN(
    SELECT [S#] FROM C,SC
    WHERE C.[C#]=SC.[C#]
        AND CN=N'税收基础')


2. 使用标准SQL嵌套语句查询选修课程编号为’C2’的学员姓名和所属单位
--实现代码：
SELECT S.SN,S.SD FROM S,SC
WHERE S.[S#]=SC.[S#]
    AND SC.[C#]='C2'

3. 使用标准SQL嵌套语句查询不选修课程编号为’C5’的学员姓名和所属单位
--实现代码：
SELECT SN,SD FROM S
WHERE [S#] NOT IN(
    SELECT [S#] FROM SC 
    WHERE [C#]='C5')

4. 使用标准SQL嵌套语句查询选修全部课程的学员姓名和所属单位
--实现代码：
SELECT SN,SD FROM S
WHERE [S#] IN(
    SELECT [S#] FROM SC 
        RIGHT JOIN C ON SC.[C#]=C.[C#]
    GROUP BY [S#]
    HAVING COUNT(*)=COUNT(DISTINCT [S#]))

5. 查询选修了课程的学员人数
--实现代码：
SELECT 学员人数=COUNT(DISTINCT [S#]) FROM SC

6. 查询选修课程超过5门的学员学号和所属单位
--实现代码：
SELECT SN,SD FROM S
WHERE [S#] IN(
    SELECT [S#] FROM SC 
    GROUP BY [S#]
    HAVING COUNT(DISTINCT [C#])>5)
```

# Oracle

# Redis

什么是 Redis ?

Redis 是 C 语言开发的一个完全开源免费的（遵从 BSD 协议）高性能键值对（key-value）的内存数据库，可以用作数据库、缓存、消息中间件等。

它是一种 NoSQL（not-only sql，泛指非关系型数据库）的数据库。

Redis 作为一个内存数据库：

- 性能优秀，数据在内存中，读写速度非常快，支持并发 10W QPS。
- 单进程单线程，是线程安全的，采用 IO 多路复用机制。
- 丰富的数据类型，支持字符串（strings）、散列（hashes）、列表（lists）、集合（sets）、有序集合（sorted sets）等。
- 支持数据持久化。可以将内存中的数据保存在磁盘中，重启时加载。
- 主从复制（即 master - slave 模式的数据备份），哨兵，高可用。
- 可以用作分布式锁。
- 可以作为消息中间件使用，支持发布订阅。

## 数据类型

Redis 支持 5 中数据类型：

**string**

String 是 Redis 最基本的数据类型，是二进制安全的。它可以包含任何数据，比如 jpg 图片或者序列化的对象，值最大能存储 512 MB。

**理解：**String 就像是 Java 中的 map 一样，一个 key 对应一个 value

![string 类型](http://p3.pstatp.com/large/pgc-image/7bb1dc8bb75a43c2a069a13ead61dcf7)

```shell
redis 127.0.0.1:6379> set name xw
OK
redis 127.0.0.1:6379> get name
"xw"
redis 127.0.0.1:6379> append name l # 拼接
(integer) 3
redis 127.0.0.1:6379> strlen name # 查看长度
(integer) 3
redis 127.0.0.1:6379> getrange name 0 -1  #  能够完整的取到整个 key 的值，-1 代表无穷大
"xwl"

redis 127.0.0.1:6379> setnx name liuxw # setnx 如果key存在，不会覆盖当前值，不存在则赋值
(integer) 0
redis 127.0.0.1:6379> setnx age 27
(integer) 1
redis 127.0.0.1:6379> del age
redis 127.0.0.1:6379> exists name
redis 127.0.0.1:6379> ttl name  # Time To Live 生存时间，-1 代表无穷大
(integer) -1
redis 127.0.0.1:6379> expire name 5 # 5s 后过期
(integer) 1
redis 127.0.0.1:6379> ttl name  # -2 代表过期
(integer) -2
redis 127.0.0.1:6379> setex name 5 xw # 等价于 set + expire
redis 127.0.0.1:6379> setne name xw # 如果 name 不存在就执行 set 创建
redis 127.0.0.1:6379> mset name1 v1 name2 v2
redis 127.0.0.1:6379> mget name1 name2
redis 127.0.0.1:6379> set age 26
redis 127.0.0.1:6379> incr age # 自增  1
(integer) 27
redis 127.0.0.1:6379> decr age # 自减 1
(integer) 26
redis 127.0.0.1:6379> incrby age 5 # 增加 5
(integer) 31
redis 127.0.0.1:6379> decrby age 5 # 减少 5
(integer) 26
```

**hash**

hash 是一个 string 类型的 key 和 value 的映射表，特别适合用于存储对象。

**理解：可以将 hash 看成一个 key - value 的集合。也可以将其想成一个 hash 对应着多个 string。**

**与 string 区别：string 是 一个 key - value 键值对，而 hash 是多个 key - value 键值对。**

![hash 数据类型](http://p1.pstatp.com/large/pgc-image/bcd13cc0172e429988beeaa029e6f512)

```shell
// hash-key 可以看成是一个键值对集合的名字,在这里分别为其添加了
// sub-key1 : value1、sub-key2 : value2、sub-key3 : value3 这三个键值对
redis 127.0.0.1:6379> hset hash-key sub-key1 value1 
(integer) 1
redis 127.0.0.1:6379> hset hash-key sub-key2 value2
(integer) 1
redis 127.0.0.1:6379> hset hash-key sub-key3 value3
(integer) 1
// 获取 hash-key 这个 hash 里面的所有键值对
redis 127.0.0.1:6379> hgetall hash-key
1) "sub-key1"
2) "value1"
3) "sub-key2"
4) "value2"
5) "sub-key3"
6) "value3"
// 删除 hash-key 这个 hash 里面的 sub-key2 键值对
redis 127.0.0.1:6379> hdel hash-key sub-key2
(integer) 1
redis 127.0.0.1:6379> hget hash-key sub-key2
(nil)
redis 127.0.0.1:6379> hget hash-key sub-key1
"value1"
redis 127.0.0.1:6379> hgetall hash-key
1) "sub-key1"
2) "value1"
3) "sub-key3"
4) "value3"
```

**list**

list（列表）是简单的字符串列表，按照插入顺序排序可以网列表的左边或者右边添加元素。

![list 数据类型](http://p1.pstatp.com/large/pgc-image/f5a6143900a44fcbaa133b5ea6fe27a8)

```shell
redis 127.0.0.1:6379> rpush list-key v1
(integer) 1
redis 127.0.0.1:6379> rpush list-key v2
(integer) 2
redis 127.0.0.1:6379> rpush list-key v1
(integer) 3
redis 127.0.0.1:6379> lrange list-key 0 -1
1) "v1"
2) "v2"
3) "v1"
redis 127.0.0.1:6379> lindex list-key 1
"v2"
redis 127.0.0.1:6379> lpop list
(nil)
redis 127.0.0.1:6379> lpop list-key
"v1"
redis 127.0.0.1:6379> lrange list-key 0 -1
1) "v2"
2) "v1"
```

我们可以看出 list 就是一个简单的字符串集合，和 Java 中的 list 相差不大，区别就是这里的 list 存放的是字符串。**list 内的元素是可重复的。**

**set**

set 是字符串类型的无序集合，集合是通过哈希表实现的，因此添加、删除、查找的复杂度都是 O（1）。

![set数据类型](http://p3.pstatp.com/large/pgc-image/c3f2dc9c36764c09a8860a6c955a8b99)

```shell
redis 127.0.0.1:6379> sadd k1 v1
(integer) 1
redis 127.0.0.1:6379> sadd k1 v2
(integer) 1
redis 127.0.0.1:6379> sadd k1 v3
(integer) 1
redis 127.0.0.1:6379> sadd k1 v1
(integer) 0
redis 127.0.0.1:6379> smembers k1
1) "v3"
2) "v2"
3) "v1"
redis 127.0.0.1:6379>
redis 127.0.0.1:6379> sismember k1 k4
(integer) 0
redis 127.0.0.1:6379> sismember k1 v1
(integer) 1
redis 127.0.0.1:6379> srem k1 v2
(integer) 1
redis 127.0.0.1:6379> srem k1 v2
(integer) 0
redis 127.0.0.1:6379> smembers k1
1) "v3"
2) "v1"
```

redis 的 set 与 java 中的 set 还是有点区别的。

redis 的 set 是一个 key 对应着 多个字符串类型的 value，也是一个字符串类型的集合

但是和 redis 的 list 不同的是 set 中的字符串集合元素不能重复，但是 list 可以。

**Zset**

zset 和 set 一样都是字符串类型元素的集合，并且集合内的元素不能重复。

不同的是 zset 每个元素都会关联一个 double 类型的分数。redis 通过分数来为集合中的成员进行从小到大的排序。

zset 的元素是唯一的，但是分数（score）却可以重复。

![Zset 数据类型](http://p9.pstatp.com/large/pgc-image/2bc191f91c9a40c4af37018814eb03ae)

```shell
redis 127.0.0.1:6379> zadd zset-key 728 member1
(integer) 1
redis 127.0.0.1:6379> zadd zset-key 982 member0
(integer) 1
redis 127.0.0.1:6379> zadd zset-key 982 member0
(integer) 0
redis 127.0.0.1:6379> zrange zset-key 0 -1 withscores
1) "member1"
2) "728"
3) "member0"
4) "982"
redis 127.0.0.1:6379> zrangebyscore zset-key 0 800 withscores
1) "member1"
2) "728"
redis 127.0.0.1:6379> zrem zset-key member1
(integer) 1
redis 127.0.0.1:6379> zrem zset-key member1
(integer) 0
redis 127.0.0.1:6379> zrange zset-key 0 -1 withscores
1) "member0"
2) "982"
```

zset 是按照 分输的大小来排序的。

**小总结**

类型简介特性场景string（字符串）二进制安全可以包含任何数据，比如 jpg 图片或者序列化的对象，一个键最大能存储 521M---Hash（哈希）键值对集合，即编程语言中的 Map 类型适合存储对象，并且可以像数据库中 update 一样只修改某一项属性值存储、读取、修改用户属性List（列表）双向链表增删快，提供了操作某一段元素的 API

1、最新消息排行等功能（朋友圈的时间线）

2、消息队列Set（集合）哈希表实现，元素不能重复添加删除查找的复杂度都是 O(1);为集合提供了求交集、并集、差集等操作共同好友；利用唯一性，统计访问网站的所有独立 ip；好友推荐时，根据 tag 求交集，大于某个阈值就可以推荐Zset（有序集合）将 Set 中的元素增加一个权重参数 score，元素按 score 有序排列数据插入集合时，已经进行天然排序排行榜；带权重的消息队列

## 基本命令

自行查阅

## 持久化

Redis 是内存型数据库，为了保证数据在断电后不会丢失，需要将内存中的数据持久化到硬盘上。

**RDB 持久化**

将某个时间点的所有数据都存放到硬盘上。

可以将快照复制到其他服务器从而创建具有相同数据的服务器副本。

如果系统发生故障，将会丢失最后一次创建快照之后的数据。

如果数据量大，保存快照的时间会很长。

**AOF 持久化**

将写命令添加到 AOF 文件（append only file）末尾。

使用 AOF 持久化需要设置同步选项，从而确保**写命令**同步到磁盘文件上的时机。这是因为对文件进行写入并不会马上将内容同步到磁盘上，而是先存储到缓冲区，然后由操作系统决定什么时候同步到磁盘。

选项同步频率always每个写命令都同步eyerysec每秒同步一次no让操作系统来决定何时同步

- always 选项会严重减低服务器的性能
- everysec 选项比较合适，可以保证系统崩溃时只会丢失一秒左右的数据，并且 Redis 每秒执行一次同步对服务器几乎没有任何影响。
- no 选项并不能给服务器性能带来多大的提升，而且会增加系统崩溃时数据丢失的数量。

随着服务器写请求的增多，AOF 文件会越来越大。Redis 提供了一种将 AOF 重写的特性，能够去除 AOF 文件中的冗余写命令。

## 发布订阅

发布订阅 (pub/sub) 是一种消息通信模式：发送者 (pub) 发送消息，订阅者 (sub) 接收消息。

Redis 客户端可以订阅任意数量的频道。*一般不用 Redis 做消息发布订阅。*

下图展示了频道 channel1 ， 以及订阅这个频道的三个客户端 —— client2 、 client5 和 client1 之间的关系：

![学Redis这篇就够了](http://p3.pstatp.com/large/pgc-image/be52cd4c9e054a83bc9b698cde69b6b3)



当有新消息通过 PUBLISH 命令发送给频道 channel1 时， 这个消息就会被发送给订阅它的三个客户端：

![学Redis这篇就够了](http://p3.pstatp.com/large/pgc-image/485344be260843708ff04a9ccecd7609)

**实例**

以下实例演示了发布订阅是如何工作的。在我们实例中我们创建了订阅频道名为 **redisChat**:

```shell
redis 127.0.0.1:6379> SUBsCRIBE redisChat
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "redisChat"
```

现在，我们先重新开启个 redis 客户端，然后在同一个频道 redisChat 发布两次消息，订阅者就能接收到消息。

```shell
redis 127.0.0.1:6379> PUBLISH redisChat "send message"
(integer) 1
redis 127.0.0.1:6379> PUBLISH redisChat "hello world"
(integer) 1
# 订阅者的客户端显示如下
1) "message"
2) "redisChat"
3) "send message"
1) "message"
2) "redisChat"
3) "hello world"
```

**发布订阅常用命令**

自行查阅

## 事务

redis 事务一次可以执行多条命令，服务器在执行命令期间，不会去执行其他客户端的命令请求。

事务中的多条命令被一次性发送给服务器，而不是一条一条地发送，这种方式被称为流水线，它可以减少客户端与服务器之间的网络通信次数从而提升性能。

Redis 最简单的事务实现方式是使用 MULTI 和 EXEC 命令将事务操作包围起来。

- 批量操作在发送 EXEC 命令前被放入队列缓存。
- 收到 EXEC 命令后进入事务执行，事务中任意命令执行失败，其余命令依然被执行。也就是说 Redis 事务不保证原子性。
- 在事务执行过程中，其他客户端提交的命令请求不会插入到事务执行命令序列中。

一个事务从开始到执行会经历以下三个阶段：

- 开始事务。
- 命令入队。
- 执行事务。

**实例**

以下是一个事务的例子， 它先以 **MULTI** 开始一个事务， 然后将多个命令入队到事务中， 最后由 **EXEC** 命令触发事务， 一并执行事务中的所有命令：

```
redis 127.0.0.1:6379> MULTI
OK
redis 127.0.0.1:6379> SET book-name "Mastering C++ in 21 days"
QUEUED
redis 127.0.0.1:6379> GET book-name
QUEUED
redis 127.0.0.1:6379> SADD tag "C++" "Programming" "Mastering Series"
QUEUED
redis 127.0.0.1:6379> SMEMBERS tag
QUEUED
redis 127.0.0.1:6379> EXEC
1) OK
2) "Mastering C++ in 21 days"
3) (integer) 3
4) 1) "Mastering Series"
 2) "C++"
 3) "Programming"
```

单个 Redis 命令的执行是原子性的，但 Redis 没有在事务上增加任何维持原子性的机制，所以 Redis 事务的执行并不是原子性的。

事务可以理解为一个打包的批量执行脚本，但批量指令并非原子化的操作，中间某条指令的失败不会导致前面已做指令的回滚，也不会造成后续的指令不做。

> **这是官网上的说明 From redis docs on transactions:**
>
> It's important to note that even when a command fails, all the other commands in the queue are processed – Redis will not stop the processing of commands.

比如：

```
redis 127.0.0.1:7000> multi
OK
redis 127.0.0.1:7000> set a aaa
QUEUED
redis 127.0.0.1:7000> set b bbb
QUEUED
redis 127.0.0.1:7000> set c ccc
QUEUED
redis 127.0.0.1:7000> exec
1) OK
2) OK
3) OK
```

如果在 set b bbb 处失败，set a 已成功不会回滚，set c 还会继续执行。

**Redis 事务命令**

下表列出了 redis 事务的相关命令：

序号命令及描述

1. **DISCARD** 取消事务，放弃执行事务块内的所有命令。
2. **EXEC** 执行所有事务块内的命令。
3. **MULTI** 标记一个事务块的开始。
4. **UNWATCH** 取消 WATCH 命令对所有 key 的监视。
5. **WATCH key [key ...]** 监视一个 (或多个) key ，如果在事务执行之前这个 (或这些) key 被其他命令所改动，那么事务将被打断。

# **复制**

通过使用 slaveof host port 命令来让一个服务器成为另一个服务器的从服务器。

一个从服务器只能有一个主服务器，并且不支持主主复制。

**连接过程**

1. 主服务器创建快照文件，即 RDB 文件，发送给从服务器，并在发送期间使用缓冲区记录执行的写命令。快照文件发送完毕之后，开始像从服务器发送存储在缓冲区的写命令。
2. 从服务器丢弃所有旧数据，载入主服务器发来的快照文件，之后从服务器开始接受主服务器发来的写命令。
3. 主服务器每执行一次写命令，就向从服务器发送相同的写命令。

**主从链**

随着负载不断上升，主服务器无法很快的更新所有从服务器，或者重新连接和重新同步从服务器将导致系统超载。为了解决这个问题，可以创建一个中间层来分担主服务器的复制工作。中间层的服务器是最上层服务器的从服务器，又是最下层服务器的主服务器。

![学Redis这篇就够了](http://p3.pstatp.com/large/pgc-image/4fc07096883d48eab9fe8a2b9097e2d4)



# **哨兵**

Sentinel（哨兵）可以监听集群中的服务器，并在主服务器进入下线状态时，自动从从服务器中选举处新的主服务器。

# **分片**

分片是将数据划分为多个部分的方法，可以将数据存储到多台机器里面，这种方法在解决某些问题时可以获得线性级别的性能提升。

假设有 4 个 Redis 实例 R0, R1, R2, R3, 还有很多表示用户的键 user:1, user:2, ... , 有不同的方式来选择一个指定的键存储在哪个实例中。

- 最简单的是范围分片，例如用户 id 从 0 ~ 1000 的存储到实例 R0 中，用户 id 从 1001 ~ 2000 的存储到实例 R1中，等等。但是这样需要维护一张映射范围表，维护操作代价高。
- 还有一种是哈希分片。使用 CRC32 哈希函数将键转换为一个数字，再对实例数量求模就能知道存储的实例。

根据执行分片的位置，可以分为三种分片方式：

- 客户端分片：客户端使用一致性哈希等算法决定应当分布到哪个节点。
- 代理分片：将客户端的请求发送到代理上，由代理转发到正确的节点上。
- 服务器分片：Redis Cluster。



```
1、Redis基础数据结构
1.1、string
set name codehole
get name
exists name
del name
expire name 5 #5s后过期
setex name 5 codehole #等价于set+expire
setne name codehole #如果name不存在就执行set创建
mset name1 v1 name2 v2
mget name1 name2
set age 30
incr age #自增1
incrby age 5 #增加5


1.2、list
rpush books python java golang #从右插入
llen books #长度
lpop books #从左吐出
rpop books #从右吐出
lindex books 1 #从左定位第一个
lrange books 0 -1 #从左，第0个到倒数第1个
ltrim books 1 -1 #保留从第1个到倒数第1个之间，别的删除掉


1.3、hash
hset books java "think in java"
hset books golang "concurrency in go"
hset books python "python cookbook"
hgetall books #"java" "think in java" "golang" "concurrency in go" "python" "python cookbook"
hlen books #3
hget books java
hmset books java "effective java" python "learnling python" golang "modern golang programming" #批量插入
hincrby user-laoqian age 1 #数字增加1


1.4、set 集合
sadd books python
sadd books java golang
smembers books #遍历（无序）
sismember books java #1
scard books #计算长度 3
spop books #弹出一个 java


1.5、zset 有序列表
zadd books 9.0 "think in java"                   #中间9.0是score
zadd books 8.9 "java concurrency"
zadd books 8.6 "java cookbook"
zrange books 0 -1                                       #按score排列出从第0个到最后1个范围内的值
zrevrange books 0 -1                                  #按score逆序排列出从第0个到最后1个范围内的值
zcard books                                                #计数
zscore books "java concurrency"               #取score值
zrank books "java concurrency"                 #排名 1
zrangebyscore books 0 8.9                         #根据分值区间遍历 "java concurrency" "java cookbook"
zrangebyscore books -inf 8.9 withscores   #根据分值区间(-∞,8.9]遍历zset，同时返回分值，inf为无穷大
zrem books "java concurrency"                  #删除
2、分布式锁
>setnx lock:codehole true
....
>del lock:codehole


>setnx lock:codehole true
>expire lock:codehole 5      #5s后释放锁
...
>del lock:codehole
为了解决setnx与expire之间出现的一些不可预测问题，做了改进
>set lock:codehole true ex 5 nx
...
>del lock:codehole




3、延时队列实现
rpush lpop    lpush rpop
pop改为延时pop，不会使队列中空了还在一直pop浪费资源
lpop -> blpop
rpop -> brpop


4、位图
>setbit s 1 1                 #10000000
>setbit s 2 1                #11000000
>setbit s 4 1                #11010000
>setbit s 9 1                #11010000 10000000
>setbit s 10 1               #11010000 11000000
>setbit s 13 1               #11010000 11001000
>setbit s 15 1               #11010000 11001010
>get s                          #"he"
>getbit s 1                   #1


>set w hello
>bitcount w                #21
>bitcount w 0 0          #第一个字符中1的个数
>bitcount w 0 1           #第二个字符中1的个数
>bitpos w 0                 #第一个0位
>bitpos w 1                  #第一个1位
>bitpos w 1 1 1              #从第二个字符算起，第一个1位
>bitpos w 1 2 2             #从第三个字符算起，第一个1位


4.1、魔术指令 bitfield
bitfield w get u4 0            #从第一位开始取，取4个位，结果是无符号数(u)
bitfield w get u4 2            #从第三位开始取，取4个位，结果是无符号数(u)
bitfield w get i2 3              #从第四位开始取，取2个位，结果是有符号数(i)
bitfield w set u8 8 97        #从第八位开始，将接下来的8个位替换成无符号数97
get w                                  #"hallo"
bitfield w incrby u4 2 1      #从第三位开始，对接下来的4位无符号数+1


饱和截断SAT
bitfield w overflow sat incrby u4 2 1      #从第三位开始，对接下来的4位无符号数+1，如果4个无符号数都为1，则不增加，保持最大值，返回为 最大值
失败不执行 FAIL
bitfield w overflow fail incrby u4 2 1      #从第三位开始，对接下来的4位无符号数+1，如果4个无符号数都为1，则不执行，返回为 nil
```



# Redis过期键删除策略

Redis中所有的键都可以设置过期策略，就像是所有的键都可以上"生死簿"，上了生死簿的键到时间后阎王就会叉掉这个键。同一时间大量的键过期，阎王就会忙不过来。同时因为Redis是单线程的，导致阎王的处理时间会变得很长，而且处理繁忙，Redis就会出现卡顿现象。

Redis有三种策略删除过期Key

**相关命令**

```shell
expire key seconds # 过期时间为秒数，key不存在时返回(integer) 0，key存在的时返回(integer) 1
pexpire key milliseconds # 同expire，设置的过期时间为毫秒数
setex key seconds value # 只能设置字符串的过期时间
ttl key # 查看Key的过期时间（秒数），用不过期返回(integer) -1，Key不存在返回(integer) -2
pttl key # 同ttl，返回毫秒数
```

**过期Key**

Redis的每个设置了过期时间的Key都会放在一个独立的字典中，用于遍历删除。

**过期策略**

**被动删除**

Key在被操作时，Redis主动检查Key是否过期，过期则删除，返回nil

1. 对CPU友好，只有Key在被操作时删除，不会浪费CPU时间
2. 对内存不友好，如果同时有大量的Key过期，这些Key在被使用之前不会被删除，就会浪费内存

**主动删除**

Redis会周期性的随机扫描一批设置了过期时间的Key并进行处理，Redis每秒进行10次过期扫描会做的操作有：

1. 随机扫描100个设置了过期时间的Key
2. 删除所有发现的过期Key
3. 如果删除的Key超过1/4则重复步骤1

```
hz 10
```

Redis除了设置每秒10次的扫描频率之外，还设置了每次扫描不会超过25ms的上限，以防出现过度循环扫描，导致线程卡死。

**maxmemory**

```
# maxmemory <bytes>
```

当已用的内存超过maxmemory 配置的内存时，会触发主动清除策略

```
# maxmemory-policy noeviction
```

1. noeviction 永不过期策略，当已用内存超过maxmemory配置时，写操作将返回错误，读操作和del操作可以继续服务。
2. volatile-lru 只删除设置了过期时间的Key，使用频率越少的Key优先删除，不会对没有设置过期时间的Key删除
3. volatile-ttl 和上面一样，只删除设置过期时间的Key，TTL过期时间越少优先删除
4. volatile-random 随机删除快要过期的Key
5. allkeys-lru 和lru一样，删除所有的Key，没有设置过期时间的Key也会被删除
6. allkeys-random 和上面一样，删除掉随机的Key

**Redis采用的过期策略**

被动删除+主动删除



**设置过期时间以及过期后怎么清除**

# Redis 优势

- 性能极高 – Redis 读的速度是 110000 次 /s, 写的速度是 81000 次 /s 。
- 丰富的数据类型 - Redis 支持二进制案例的 Strings, Lists, Hashes, Sets 及 Ordered Sets 数据类型操作。
- 原子性 - Redis 的所有操作都是原子性的，意思就是要么成功执行要么失败完全不执行。单个操作是原子性的。多个操作也支持事务，即原子性，通过 MULTI 和 EXEC 指令包起来。
- 其他特性 - Redis 还支持 publish/subscribe 通知，key 过期等特性。

# Elasticsearch
### ES 目录介绍
- bin：可执行文件在里面，运行es的命令就在这个里面，包含了一些脚本文件等
- config：配置文件目录
- JDK：java环境
- lib：依赖的jar，类库
- logs：日志文件
- modules：es相关的模块
- plugins：可以自己开发的插件
- data：这个目录没有，自己新建一下，后面要用-> mkdir data，这个作为索引目录
### ES 环境配置
_注意⚠️：不能使用root账户启动es_
```shell
# 查看当前用户
whoami
root  # 输出
# 添加一个用户
useradd esuser
# 为用户授权
chown -R esuser /usr/local/elasticsearch-7.4.2
chown -R esuser:esuser /usr/local/elasticsearch-7.4.2
# 切换用户
su esuser

# 切换root用户
su root  
vim /etc/security/limits.conf
# 添加一些配置
# * soft  nofile 65536
# * hard nofile 131072
# * soft  nproc 2048
# * hard nproc 4096
  # End of file
vim /etc/sysctl.conf
# 最下面添加
# vm.max_map_count=262145
# 刷新配置文件
sysctl.conf 
sysctl -p 
vm.max_map_count=262145 # 输出
./elasticsearch     # 前台启动
./elasticsearch -d  # 后台启动
```
### Es 相关操作
#### 查看集群状态
http://192.168.31.xx:9200/_cluster/health
#### 创建索引
PUT http://192.168.31.xx:9200/索引名
```json5
{
  "settings": {
    "index": {
      "number_of_shards": "2",
      "number_of_replicas": "0"
    }
  }
}
```
#### 删除索引
DELETE  http://192.168.31.xx:9200/索引名
#### 查看索引
- http://192.168.31.xx:9200/索引名 
- http://192.168.31.xx:9200/_cat/indices    （查看所有）
- http://192.168.31.xx:9200/_cat/indices?v  （显示列名）
#### 查询索引
- http://192.168.31.xx:9200/索引名/_search                         （查询所有）
- http://192.168.31.xx:9200/索引名/_doc/_search                         （查询所有）
##### QueryString 查询
在 url 中拼接做为请求参数的查询称之为 QueryString
- http://192.168.31.xx:9200/索引名/_search?q=字段名:内容             （单条件）
- http://192.168.31.xx:9200/索引名/_search?q=字段名:内容&q=字段名:内容 （多条件）
  - eg:_search?q=name:xw&q=age:25
##### DSL搜索
QueryString用的很少，一旦参数复杂就难以构建，所以大多查询都会使用dsl来进行查询更好。DSL(Domain Specific Language 特定领域语言)基于JSON格式的数据查询查询更灵活，有利于复杂查询。

###### DSL搜索 - 语法
POST /shop/_doc/_search
```json5
{
  // 查询
  "query":{
    "match":{
      "desc":"慕课网"
    }
  },
  // 判断某个字段是否存在
  "query": {
    "exists":{
      "field":"desc"
    }
  }
}
// 语法格式为一个json object，内容都key-value键值对，json可以嵌套。
```
###### DSL搜索 - match_all 查询所有
```json5
{
  "query": {
    "match_all": {}
  }
}
```
###### DSL搜索 - from size 分页
```json5
{
  "query": {
    "match_all": {}
  },
  "_source": ["id", "nickname", "age"],
  "from": 0,
  "size": 10
}
```
###### DSL搜索 - term 精准搜索
搜索的时候会把用户搜索内容，比如“慕课网强大”作为一整个关键词去搜索，而不会对其进行分词后再搜索
```json5
{
  "query": {
    "term": {
      "desc": "慕课网"
    }
  }
}
```
_注意⚠️：match会对慕课网先进行分词（其实就是全文检索）再查询，而term则不会，直接把慕课网作为一个整的词汇去搜索_
###### DSL搜索 - terms 多个词语匹配检索
相当于是tag标签查询，比如慕课网的一些课程会打上前端/后端/大数据/就业课这样的标签，可以完全匹配做类似标签的查询
```json5
{
  "query": {
    "terms": {
      "desc": ["慕课网","网课"]
    }
  }
}
```
###### DSL搜索 - match_phrase 短语匹配
```json5
{
  "query": {
    "match_phrase": {
      "desc": {
        "query": "大学 毕业 研究生", 
        "slop": 2 // slop：允许词语间跳过的数量
      }
    }
  }
}
```
_注意⚠️：match分词后搜索只要有匹配就返回，match_phrase分词结果必须在text字段、分词中都包含，而且顺序必须相同，都是连续的。（搜索比较严格）_


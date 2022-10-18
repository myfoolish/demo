---
title: Design Patterns
date: 2021-05-21 09:00:00
description: Design Patterns In Action
categories:
- Develop
- Design Patterns
tag: 
- Design Patterns
---

# 设计模式

## 单例模式 ( Singleton Pattern )

由于外界无法创建 Singleton 对象，也就无法调用 getSingleton()，所以就需要将 getSingleton() 静态化，这样外界就可以通过类名直接调用该方法。

### 饿汉模式

```java
public class Singleton {
    // 私有本类的构造函数
    private Singleton() {
        System.out.println("单例---饿汉模式");
    }

    // 创建本类对象
    private static Singleton singleton = new Singleton();

    public static Singleton getSingleton() {
        System.out.println("对外提供获取本类对象的方法");
        return singleton;
    }
}

// 测试方法
public class DesignPatternsTest {
    public static void main(String[] args) {
        Singleton singleton = Singleton.getSingleton();
    }
}

// 输出
单例---饿汉模式
对外提供获取本类对象的方法
```

### 懒汉模式

```java
public class Singleton {
    // 私有本类的构造函数
    private Singleton() {
        System.out.println("单例---懒汉模式");
    }

    // 创建本类对象
    private static Singleton singleton = null;

    public static Singleton getSingleton() {
        if (singleton == null) {	// 这里会有线程安全问题
            singleton = new Singleton();
        }
        System.out.println("对外提供获取本类对象的方法");
        return singleton;
    }
}

// 测试方法
public class DesignPatternsTest {
    public static void main(String[] args) {
        Singleton singleton1 = Singleton.getSingleton();
        Singleton singleton2 = Singleton.getSingleton();
        System.out.println(singleton1 == singleton2);
    }
}

// 输出
单例---懒汉模式
对外提供获取本类对象的方法
对外提供获取本类对象的方法
true
```

## 工厂模式 ( Factory Pattern)

### 静态工厂模式 ( Simple Factory )

以学习为例，假如你想学习Java视频，你得自己到处去找资料，找资料是一个繁琐的过程，过一段时间你又想学Python视频了，你还得去找资料。现在你在学校上学，你想学Java视频了，你跟老师说，我想学Java视频了，老师就给了你一套Java视频，我想学Python视频了，老师就给了你一套Python视频，是不是感觉很方便，静态工厂模式就是将创建具体类的过程交给工厂类来实现 

```java
public abstract class Video {
   abstract void study();
}

public class JavaVideo extends Video {
   void study() {
       System.out.println("学习Java视频");
   }
}

public class PythonVideo extends Video {
   void study() {
       System.out.println("学习Python视频");
   }
}

public class VideoFactory {
   public static Video getVideo(String type) {
       if ("java".equalsIgnoreCase(type)) {
           return new JavaVideo();
       } else if ("python".equalsIgnoreCase(type)) {
           return new PythonVideo();
       }
       return null;
   }
}

// 测试类
public class Test {
   public static void main(String[] args) {
       Video car = VideoFactory.getVideo("java");
       // 学习Java视频
       car.study();
   }
}
```

但是这样做是不符合开闭原则的（对于扩展是开放的，对于修改是关闭的），因为每次增加新的课程就得修改 if else 语句，可以用反射 传入类的对象解决

```java
public class VideoFactory {
   public static Video getVideo(Class c) {
       Video video = null;
       try {
           video = (Video) Class.forName(c.getName()).newInstance();
       } catch (Exception e) {
           e.printStackTrace();
       }
       return video;
   }
}
```

当然还可以用工厂方法模式解决

### 工厂方法模式 ( Factory Method )

工厂方法模式的实质是定义一个创建对象的接口或抽象类，但让实现这个接口的类来决定实例化哪个类。工厂方法让类的实例化推迟到子类中进行。

在工厂模式中，创建对象的过程在一个工厂类中，不符合开闭原则，工厂模式就解决了这个问题，对上面的例子进行改进，每一门课程都创建一个工厂类，当增加新的课程时，只要实现工厂接口或工厂抽象类创建新的工厂类即可，在这个新的工厂类中实例化新的课程

```java
public abstract class VideoFactory {
   public abstract Video getVideo();
}

public class JavaVideoFactory extends VideoFactory {
   public Video getVideo() {
       return new JavaVideo();
   }
}

// 测试类
public class Test {
   public static void main(String[] args) {
       VideoFactory videoFactory = new JavaVideoFactory();
       Video video = videoFactory.getVideo();
       // 学习Java视频
       video.study();
   }
}
```

需要哪个对象，用相应的工厂类创建即可

在工厂方法模式中具体工厂负责生产具体的产品，每一个具体工厂对应一种具体产品，工厂方法具有唯一性。但是有时候我们希望一个工厂可以提供多个产品对象，而不是单一的产品对象，如一个电器工厂，它可以生产电视机、电冰箱、空调等多种电器，而不是只生产某一种电器。为了更好地理解抽象工厂模式，我们先引入两个概念 

### 抽象工厂模式 ( Abstract Factory )

![抽象工厂模式](https://myfoolish.github.io/picture/developer/java/design-patterns/abstract-factory.png)

(1) 产品等级结构：产品等级结构即产品的继承结构，如一个抽象类是电冰箱，其子类有海尔电冰箱、长虹电冰箱、则电冰箱与具体品牌的电冰箱之间构成了一个产品等级结构，抽象电冰箱是父类，而具体品牌的电冰箱是其子类。

(2) 产品族：在抽象工厂模式中，产品族是指由同一个工厂生产的，位于不同产品等级结构中的一组产品，如海尔电器工厂生产的海尔电视机、海尔电冰箱，海尔电视机位于电视机产品等级结构中，海尔电冰箱位于电冰箱产品等级结构中，海尔电视机、海尔电冰箱构成了一个产品族。

在上面的例子中，假如我们除了想学习Java视频，还想学习Java笔记，如果对每个产品都创建工厂，会造成类爆炸。这时就可以生成一个Java课程抽象工厂，提供Java这个产品族的对象

```java
public abstract class Article {
   public abstract void study();
}

public class JavaArticle extends Article {
   public void study() {
       System.out.println("学习Java笔记");
   }
}

public abstract class CourseFactory {
   public abstract Video getVideo();
   public abstract Article getArticle();
}

public class JavaCourseFactory extends CourseFactory {
  
   public Video getVideo() {
       return new JavaVideo();
   }

   public Article getArticle() {
       return new JavaArticle();
   }
}

// 测试类
public class Test {
   public static void main(String[] args) {
       CourseFactory courseFactory = new JavaCourseFactory();
       Video video = courseFactory.getVideo();
       Article article = courseFactory.getArticle();
       // 学习Java视频
       video.study();
       // 学习Java笔记
       article.study();
   }
}
```

抽象工厂模式与工厂方法模式最大的区别在于，工厂方法模式针对的是一个产品等级结构，而抽象工厂模式需要面对多个产品等级结构，一个工厂等级结构可以负责多个不同产品等级结构中的产品对象的创建。当一个工厂等级结构可以创建出分属于不同产品等级结构的一个产品族中的所有对象时，抽象工厂模式比工厂方法模式更为简单、更有效率

## 装饰者模式 ( Decorator Pattern )

有一个卖煎饼的店铺找上了你，希望你能给她们的店铺开发一个收银系统，已知一个煎饼的价格是8元，一个鸡蛋的价格是1元，一根香肠的价格是2元。你二话不说写出了如下代码

```java
// 煎饼类
public class Battercake {
    protected String getDesc() {
        return "煎饼";
    }

    protected int cost() {
        return 8;
    }
}

// 加鸡蛋的煎饼
public class BattercakeWithEgg extends Battercake{
  
    @Override
    public String getDesc() {
        return super.getDesc() + " 加一个鸡蛋";
    }

    @Override
    public int cost() {
        return super.cost() + 1;
    }
}

// 加鸡蛋和香肠的煎饼
public class BattercakeWithEggSausage extends BattercakeWithEgg {

    @Override
    public String getDesc() {
        return super.getDesc() + " 加一根香肠";
    }

    @Override
    public int cost() {
        return super.cost() + 2;
    }
}

// 测试类
public class Test {
    public static void main(String[] args) {
        Battercake battercake = new Battercake();
        // 煎饼 销售价格:8
        System.out.println(battercake.getDesc() + " 销售价格:" + battercake.cost());

        Battercake battercakeWithEgg = new BattercakeWithEgg();
        // 煎饼 加一个鸡蛋 销售价格:9
        System.out.println(battercakeWithEgg.getDesc() + " 销售价格:" + battercakeWithEgg.cost());

        Battercake battercakeWithEggSausage = new BattercakeWithEggSausage();
        // 煎饼 加一个鸡蛋 加一根香肠 销售价格:11
        System.out.println(battercakeWithEggSausage.getDesc() + " 销售价格:" + battercakeWithEggSausage.cost());
    }
}
```

但是这样会造成一个问题，因为煎饼的搭配种类很多，比如：加1根香肠的煎饼、加2个鸡蛋的煎饼、加2个鸡蛋和1根香肠的煎饼，如果对每一种可能都写一个实现，会造成类爆炸，这个时候你就应该想到用装饰者模式了。

来看看如何改造上面的代码

```java
// 组件类
public abstract class ABattercake {
    protected abstract String getDesc();
    protected abstract int cost();
}

// 具体组件实现类
public class Battercake extends ABattercake {
  
    protected String getDesc() {
        return "煎饼";
    }
  
    protected int cost() {
        return 8;
    }
}

// 抽象装饰器类
public class AbstractDecorator extends ABattercake {
    private ABattercake aBattercake;

    public AbstractDecorator(ABattercake aBattercake) {
        this.aBattercake = aBattercake;
    }

    protected String getDesc() {
        return this.aBattercake.getDesc();
    }

    protected int cost() {
        return this.aBattercake.cost();
    }
}

// 具体的装饰器实现类
public class EggDecorator extends AbstractDecorator {

    public EggDecorator(ABattercake aBattercake) {
        super(aBattercake);
    }

    @Override
    protected String getDesc() {
        return super.getDesc() + " 加一个鸡蛋";
    }

    @Override
    protected int cost() {
        return super.cost() + 1;
    }
}
public class SausageDecorator extends AbstractDecorator {

    public SausageDecorator(ABattercake aBattercake) {
        super(aBattercake);
    }

    @Override
    protected String getDesc() {
        return super.getDesc() + " 加一根香肠";
    }

    @Override
    protected int cost() {
        return super.cost() + 2;
    }
}

// 测试类	如果有人想买加2个鸡蛋和1根香肠的煎饼，实现方式如下：
public class Test {
    public static void main(String[] args) {
        ABattercake aBattercake = new Battercake();
        aBattercake = new EggDecorator(aBattercake);
        aBattercake = new EggDecorator(aBattercake);
        aBattercake = new SausageDecorator(aBattercake);
        // 煎饼 加一个鸡蛋 加一个鸡蛋 加一根香肠 销售价格为: 12
        System.out.println(aBattercake.getDesc() + " 销售价格为: " + aBattercake.cost());
    }
}
```

可以看到当要添加新的功能时，我们可以使用继承，在子类中添加新能的扩展实现。但有时候继承是不可行的，因为有些类是被final修饰的。而且待添加的新功能存在多种组合，使用继承的方式会导致大量子类的的出现。

而装饰者模式则是通过组合的方式来替代继承，为对象添加功能，看一下上述代码的UML图

![装饰者模式](https://myfoolish.github.io/picture/developer/java/design-patterns/decorator-pattern01.png)

从上图就可以画出装饰者模式的UML图如下

![装饰者模式](https://myfoolish.github.io/picture/developer/java/design-patterns/decorator-pattern02.png)

**Component（组件）**：组件接口或抽象类定义了全部组件实现类以及所有装饰器实现的行为。

**ConcreteComponent（具体组件实现类）**：具体组件实现类实现了Component接口或抽象类。通常情况下，具体组件实现类就是被装饰器装饰的原始对象，该类提供了Component接口中定义的最基本的功能，其他高级功能或后序添加的新功能，都是通过装饰器的方式添加到该类的对象之上的。

**Decorator（抽象装饰器）**：所有装饰器的父类，它是一个实现了Component接口的类，并在其中封装了一个Component对象，也就是被装饰的对象。而这个被装饰的对象只要是Component类型即可，这就实现了装饰器的组合和复用

**ConcreteDecorator（具体的装饰器）**：该实现类要向被装饰对象添加某些功能

### java io包

![装饰者模式](https://myfoolish.github.io/picture/developer/java/design-patterns/decorator-pattern-io.png)

从上图可以看出，InputStream 是组件，FileInputStream，ByteArrayInputStream 是具体组件实现类，FilterInputStream 是抽象装饰器，LineInputStream 是具体的装饰器。

InputStream 和 OutputStream，Reader 和Writer 体系都用到了装饰者模式，不再概述。

举个例子，我们进行 IO 操作时，经常写如下代码，你是否意识到这个用到了装饰者模式呢？

```java
BufferedInputStream bis = new BufferedInputStream(new FileInputStream(new File("D:/test.txt")));
```

当我们意识到这个用到装饰器模式时，想增加新功能时，就直接查找是否有相应的具体装饰器即可，或者自己实现一个装饰器，而不是陷入迷茫。

举个例子，我们想把从文件中读入的内容都转为小写时，只要自己继承 FilterInputStream，实现相应的功能即可

```java
public class LowerCaseInputStream extends FilterInputStream {
    /*
     * 自己的装饰类,将大写字母转为小写字母
     */
    protected LowerCaseInputStream(InputStream in) {
        super(in);
    }

    @Override
    public int read() throws IOException {
        int c = super.read();
        return (c == -1 ? -1 : Character.toLowerCase((char)c));
    }

    @Override
    public int read(byte[] b, int off, int len) throws IOException {
        int result = super.read(b, off, len);
        for (int i=off; i<=off+result; i++) {
            b[i] = (byte)Character.toLowerCase((char)b[i]);
        }
        return result;
    }
}

// D:/test.txt的文件内容如下	THIS is JUST for TEST
// 	测试类
public class InputTest {
    public static void main(String[] args) {
        int c;
        try {
            InputStream in = new LowerCaseInputStream(new BufferedInputStream(new FileInputStream("D:/test.txt")));
            while ((c = in.read()) >= 0) {
                //this is just for test
                System.out.print((char)c);
            }
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### Mybatis 缓存模块

Mybatis 的缓存模块中，使用了装饰器模式的变体，其中将 Decorator 接口和 Componet 接口合并为一个 Component 接口，类间结构如下

![装饰者模式](https://myfoolish.github.io/picture/developer/java/design-patterns/decorator-pattern-mybatis01.png)

Mybatis 的 Cache 接口就是上图中的 Component

```java
public interface Cache {

  // 省略一部分方法
  String getId();

  void putObject(Object key, Object value);

  Object getObject(Object key);

  Object removeObject(Object key);
}
```

看一下 Cache 接口的实现类

![装饰者模式](https://myfoolish.github.io/picture/developer/java/design-patterns/decorator-pattern-mybatis-cache.png)

仔细看包名，由包名就可以看到 PerpetualCache 扮演着 ConcreteComponent（具体组件实现类）的角色，其余的都是装饰类，为什么要弄这么多装饰类呢？

举个例子，我们可以在二级缓存中配置缓存回收策略。

可配置的选项有

LRU：最近最少使用，移除最长时间不被使用的对象
FIFO：先进先出，按对象进入缓存的顺序来移除它们
SOFT：软引用，移除基于垃圾回收器状态和软引用规则的对象
WEAK：弱引用，更积极的移除基于垃圾收集器状态和弱引用规则的对象

再看上面的装饰类和这个配置选项的名字是不是很类似，Mybatis 根据你配置的缓存回收策略来选择相应的装饰类，完成扩展功能。

| 设计模式中英文对照 | 模式（Pattern）         |
| ------------------ | ----------------------- |
| 单例模式           | Singleton               |
| 简单工厂模式       | Simple Factory          |
| 抽象工厂模式       | Abstract Factory        |
| 工厂方法模式       | Factory Method          |
| 适配器模式         | Adapter                 |
| 建造者模式         | Builder                 |
| 原型模式           | Prototype               |
| 桥梁模式/桥接模式  | Bridge                  |
| 组合模式           | Composite               |
| 装饰模式           | Decorator               |
| 门面模式/外观模式  | Facade                  |
| 享元模式           | Flyweight               |
| 代理模式           | Proxy                   |
| 责任链模式         | Chain of Responsibility |
| 命令模式           | Command                 |
| 解释器模式         | Interpreter             |
| 迭代器模式         | Iterator                |
| 中介者模式         | Mediator                |
| 备忘录模式         | Memento                 |
| 观察者模式         | Observer                |
| 状态模式           | State                   |
| 策略模式           | Strategy                |
| 模板方法模式       | Template Method         |
| 访问者模式         | Visitor                 |

推荐阅读

[深入理解单例模式](http://mp.weixin.qq.com/s?__biz=MzIxMzk3Mjg5MQ==&mid=2247483792&idx=1&sn=54dae604e9413907e06835165af897fd&chksm=97afe364a0d86a7207cd494177c2ac6b0d87fdd2f739091b052ee76c45591463cfc9abb3eb4f&scene=21#wechat_redirect)

[Java类的加载顺序](http://mp.weixin.qq.com/s?__biz=MzIxMzk3Mjg5MQ==&mid=2247483669&idx=1&sn=cc2a803988811db211085478b1238086&chksm=97afe3e1a0d86af765642e0aebe2998a3a032ff884f32b853096da4106e4a1502cd26a4aa90c&scene=21#wechat_redirect)

[深入理解阻塞队列](http://mp.weixin.qq.com/s?__biz=MzIxMzk3Mjg5MQ==&mid=2247483787&idx=1&sn=c83040528d46af08597fcb7a4621f8b6&chksm=97afe37fa0d86a69600cd1e842bb974f8a1ad6aff5e2211b343e3071fd22552dc00d637b1901&scene=21#wechat_redirect)

[不扯概念，用例子演示什么是脏读，不可重复读，幻读？](http://mp.weixin.qq.com/s?__biz=MzIxMzk3Mjg5MQ==&mid=2247484284&idx=1&sn=7a0c97f038ab7801ae7175348253528e&chksm=97afe188a0d8689ebb31cd4bcf9ff1038b74992e463b2eb9354049db2f09510550972d098a18&scene=21#wechat_redirect)

[vim三种模式下的小技巧，提高一半工作效率](http://mp.weixin.qq.com/s?__biz=MzIxMzk3Mjg5MQ==&mid=2247484270&idx=1&sn=fa64b39b1776b92c9d3132ed36d9c31e&chksm=97afe19aa0d8688c3df663cad9b29c5523731fb16f5a3380171b24000f3aaa7f866452769a22&scene=21#wechat_redirect)
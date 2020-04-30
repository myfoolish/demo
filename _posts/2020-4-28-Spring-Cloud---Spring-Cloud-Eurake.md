---
top：true
title: Spring Cloud - Spring Cloud Eurake
date: 2020-4-28 10:30:00
description: 服务治理：Spring Cloud Eurake
categories:
- develop
tag: Java
---

# Spring Cloud

## 服务治理：Spring Cloud Eurake

Spring Cloud Eureka 是 Spring Cloud Netflix 微服务套件中的一部分，它基于 Netflix Eureka 做了二次封装，主要负责完成微服务架构中的服务治理功能。

Spring Cloud 通过为Eureka增加了Spring Boot风格的自动化配置，我们只需通过简单引入依赖和注解配置就能让Spring Boot构建的微服务应用轻松地与Eureka服务治理体系进行整合。

通过学习下面这些核心内容，构建起用于服务治理的基础设施。

- 构建服务注册中心
- 服务注册与服务发现
- Eureka的基础架构
- Eureka的服务治理机制
- Eureka的配置
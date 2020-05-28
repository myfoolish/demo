---
title: Spring Cloud In Action
date: 2020-05-20 08:30:00
top: 1
description: Spring Cloud In Action
categories:
- Develop
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

## 客户端负载均衡：Spring Cloud Ribbon

Spring Cloud Ribbon是一个基于HTTP和TCP的客户端负载均衡工具，它基于Netflix Ribbon实现。通过Spring Cloud的封装，可以让我们轻松地将面向服务的REST模板请求自动转换成客户端负载均衡的服务调用。

Spring Cloud Ribbon虽然只是一个工具类框架，它不像服务注册中心、配置中心、API 网关那样需要独立部署，但是它几乎存在于每一个Spring Cloud构建的微服务和基础设施中。因为微服务间的调用，API网关的请求转发等内容，实际上都是通过Ribbon来实现的，包括后续我们将要介绍的Feign，它也是基于Ribbon实现的工具。所以，对Spring Cloud Ribbon的理解和使用，对于我们使用Spring Cloud来构建微服务非常重要。

在这一章中，我们将具体介绍如何使用Ribbon来实现客户端的负载均衡，并且通过源码分析来了解Ribbon实现客户端负载均衡的基本原理。
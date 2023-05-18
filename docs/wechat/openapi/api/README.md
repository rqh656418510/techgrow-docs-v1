---
title: OpenAPI 接口
description: OpenAPI 接口
---

## 前言

在日常使用中，如果 TechGrow 官方的后台管理功能不能满足您的需求，可以基于 OpenAPI 开发并私有化部署自己的后端服务。反之，您甚至还可以在 TechGrow 官方后端服务的基础上，基于 OpenAPI 独立开发自己的前端引流插件。

::: tip 基于 OpenAPI 的开源代码
TechGrow 官方已开源基于 OpenAPI 的 [Java 版后端项目](https://github.com/rqh656418510/techgrow-openapi-java)。简单私有化部署 Java 后端服务后，就可以无缝接入已开源的引流插件，不限于 Hexo、VuePress 等引流插件。值得一提的是，您也可以在开源后端项目的基础上，二次开发自己所需要的功能。
:::

## 接口列表

### 获取验证码

- POST `/api/readmore/captcha/generate`

#### 请求参数

| 参数名称   | 是否必填 | 类型   | 说明                                              |
| ---------- | -------- | ------ | ------------------------------------------------- |
| blogId     | 是       | string | 博客 ID                                           |
| toOpenId   | 否       | string | 被关注的微信用户 ID，来自于微信公众号返回的消息   |
| fromOpenId | 否       | string | 发起关注的微信用户 ID，来自于微信公众号返回的消息 |

::: tip 微信公众号的自动回复
使用微信公众号官方的<a :href="$withBase('/wechat/tutorial/vuepress/#设置公众号')" target='_blank'>关键词自动回复功能</a>，将获取验证码的链接发送给用户，这种方式是无法传递 `toOpenId` 和 `fromOpenId` 参数的。简而言之，在这种场景下后端服务无法检测到用户是否取消关注公众号，导致用户可以在关注公众号并解锁文章后，又立刻取消关注，借此白嫖博客的内容。
:::

::: tip 微信公众号的消息处理
如果您希望在用户取消关注微信公众号后，让引流插件自动再次锁住博客的内容（防止白嫖），那么必须传递 `toOpenId` 和 `fromOpenId` 参数，这两个参数都来自于微信公众号返回的消息。换而言之，您需要通过后端代码自行处理微信公众号的消息内容，包括用户取消关注的事件，而不是简单依赖微信公众号的自动回复功能。
:::

#### 返回参数

| 参数名称   | 是否必填 | 类型   | 说明             |
| ---------- | -------- | ------ | ---------------- |
| code       | 是       | int    | 业务代码         |
| msg        | 是       | string | 返回的信息       |
| data       | 否       | object | 返回的数据       |
| blogId     | 否       | string | 博客 ID          |
| code       | 否       | string | 验证码           |
| expireTime | 否       | string | 验证码的过期时间 |

- 正确的返回

``` json
{
    "code": 0,
    "msg": "success",
    "data": {
        "code": "437554",
        "blogId": "18762-1609305354821-257",
        "expireTime": "2023-05-14 22:46:32"
    }
}
```

- 错误的返回

``` json
{
    "code": 407,
    "msg": "Invalid blog id"
}
```

``` json
{
    "code": 409,
    "msg": "Not following WeChat official account"
}
```

``` json
{
    "code": 410,
    "msg": "Cancelled following WeChat official account"
}
```

### 校验验证码

- POST `/api/readmore/captcha/validate`

#### 请求参数

| 参数名称 | 是否必填 | 类型   | 说明    |
| -------- | -------- | ------ | ------- |
| blogId   | 是       | string | 博客 ID |
| code     | 是       | string | 验证码  |

#### 返回参数

| 参数名称   | 是否必填 | 类型   | 说明           |
| ---------- | -------- | ------ | -------------- |
| code       | 是       | int    | 业务代码       |
| msg        | 是       | string | 返回的信息     |
| data       | 否       | object | 返回的数据     |
| blogId     | 否       | string | 博客 ID        |
| token      | 否       | string | 凭证           |
| expireTime | 否       | string | 凭证的过期时间 |

- 正确的返回

``` json
{
    "code": 0,
    "msg": "success",
    "data": {
        "blogId": "18762-1609305354821-257",
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9gNXKZOK0BGoB",
        "expireTime": "2024-05-13 22:14:55"
    }
}
```

- 错误的返回

``` json
{
    "code": 406,
    "msg": "Invalid captcha"
}
```

### 校验凭证

- POST `/api/readmore/token/validate`

#### 请求参数

| 参数名称 | 是否必填 | 类型   | 说明    |
| -------- | -------- | ------ | ------- |
| blogId   | 是       | string | 博客 ID |
| token    | 是       | string | 凭证    |

#### 返回参数

| 参数名称 | 是否必填 | 类型   | 说明       |
| -------- | -------- | ------ | ---------- |
| code     | 是       | int    | 业务代码   |
| msg      | 是       | string | 返回的信息 |

- 正确的返回

``` json
{
    "code": 0,
    "msg": "success"
}
```

- 错误的返回

``` json
{
    "code": 408,
    "msg": "Invalid token"
}
```

### 新增浏览记录

- POST `/api/readmore/browse/add`

#### 请求参数

| 参数名称    | 是否必填 | 类型   | 说明                                                                               |
| ----------- | -------- | ------ | ---------------------------------------------------------------------------------- |
| blogId      | 是       | string | 博客 ID                                                                            |
| title       | 否       | string | 网页的标题                                                                         |
| url         | 否       | string | 网页的 URL                                                                         |
| probability | 否       | double | 随机引流的概率，有效范围在 0.1 ~ 1 之间                                            |
| tag         | 否       | int    | 浏览标识，1 - 凭证解锁浏览，2 - 随机解锁浏览，3 - 验证码解锁浏览，4 - 阀值解锁浏览 |

``` json
{
    "blogId": "18762-1609305354821-257",
    "tag": 1,
    "probability": 1,
    "title": "Linux 移值 C++ 代码",
    "url": "https://www.example.com/posts/ee7f1a35.html",
    "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0"
}
```

#### 返回参数

| 参数名称 | 是否必填 | 类型   | 说明       |
| -------- | -------- | ------ | ---------- |
| code     | 是       | int    | 业务代码   |
| msg      | 是       | string | 返回的信息 |

- 正确的返回

``` json
{
    "msg": "success",
    "code": 0
}
```

- 错误的返回

``` json
{
    "msg": "Invalid blog id",
    "code": 407
}
```

## 错误码详情

在 OpenAPI 接口返回的数据中，约定使用 `code` 字段表示业务错误代码。特别注意，为了兼容已开源的 Hexo、VuePress 等引流插件，必须遵循以下的规则。

| 业务错误代码 | 错误描述             |
| ------------ | -------------------- |
| 0            | 业务处理成功         |
| 406          | 无效验证码           |
| 407          | 无效博客 ID          |
| 408          | 无效凭证             |
| 409          | 未关注微信公众号     |
| 410          | 曾取消关注微信公众号 |
| 502          | 非法参数传递         |

## 状态码详情

在调用 OpenAPI 接口时，约定使用不同的 HTTP 状态码来表示请求的处理状态。特别注意，为了兼容已开源的 Hexo、VuePress 等引流插件，必须遵循以下的规则。

| HTTP 状态代码 | 状态描述         |
| ------------- | ---------------- |
| 200           | 请求处理成功     |
| 403           | 非法请求来源     |
| 429           | 请求过于频繁     |
| 500           | 系统内部发生错误 |

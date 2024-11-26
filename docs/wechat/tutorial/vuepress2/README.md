---
title: VuePress v2 博客
description: VuePress v2 博客引流微信公众号
---

## 前言

VuePress v2 博客建议安装 [vuepress-plugin-readmore-popular-next](https://github.com/rqh656418510/vuepress-plugin-readmore-popular-next) 插件，将 [TechGrow](https://open.techgrow.cn) 的免费微信公众号引流工具整合到博客中，用户扫码关注微信公众号后可以解锁全站文章，让微信公众号的粉丝数躺着增长。

## 特色功能

- 支持随机为博客添加引流功能
- 支持关闭某篇文章的引流功能
- 支持查询用户解锁文章的历史记录
- 支持自定义或者动态计算文章内容的预览高度
- 支持自定义 CSS 样式，轻松适配不同风格的博客
- 支持开放 API，灵活接入第三方私有化部署的系统服务

## 注册博客

浏览器访问 [TechGrow](https://open.techgrow.cn) 的官网 ，注册并登录账号后，进入博客的后台管理页面。首先点击左侧的菜单 `博客注册`，然后点击 `新增` 按钮，添加自己博客的信息。博客注册成功后，记录下 `博客 ID`，后面的步骤会使用到

<img :src="$withBase('/images/guide/717e14eb59dd44dea62d6a0b7549abfd.png')">

## 设置公众号

在微信公众号的后台管理页面，菜单栏里选择 `自动回复` - `关键词回复`，启用 `自动回复`，然后点击 `添加回复` 按钮

<img :src="$withBase('/images/guide/em64p7w8wlqtt0rsjop0jjeywx29m25w.png')">

填写 `规则名称`、`关键词（当初你在 TechGrow 中设置的）`、`回复内容` 选择 `文字`，然后 `回复文字` 的内容填写获取博客解锁验证码的链接，如下所示（请自行更改 `xxxxx-xxxxxxxxx-xxx` 为你申请到的博客 ID）

``` html
<a href="https://open.techgrow.cn/#/readmore/captcha/generate?blogId=xxxxx-xxxxxxxxx-xxx">点击链接，获取博客解锁验证码</a>
```

<img :src="$withBase('/images/guide/yd89wbdji196ixtwzgzamw37fbein1ia.png')">

此时，当读者关注你的微信公众号，并输入关键词后（比如我设置的关键词就是 `tech`），那么读者就会自动接收到获取博客解锁验证码的链接

## 安装插件

::: warning 兼容性说明一
由于 VuePress v2 目前仍然处于 Beta 阶段，官方每次发布新版本时，都可能带来破坏性的更新，导致引流插件不兼容新版本的 VuePress v2。若您发现引流插件存在兼容问题，请通过邮件或者加微信群反馈。
:::

::: warning 兼容性说明二
以引流插件版本号 `2.0.0-rc.18.x` 举例，其中的 `2.0.0-rc.18` 代表该引流插件所兼容的 VuePress v2 版本，而 `x` 则代表引流插件自身的修订版本号。若 VuePress v2 与引流插件的版本不兼容，很可能会导致编译出错或者引流插件无法生效。
:::

- 查看插件所有的版本信息

``` sh
# 查看版本信息
npm view vuepress-plugin-readmore-popular-next versions
```

- 运行 `npm install` 命令安装插件到本地博客

``` sh
# 安装最新版本
npm install -D vuepress-plugin-readmore-popular-next

# 安装指定版本（推荐），请自行更改对应的版本号
npm install -D vuepress-plugin-readmore-popular-next@2.0.0-rc.18.1
```

## 配置插件

编辑 VuePress 的主配置文件（例如 `.vuepress/config.ts`），新增插件的配置信息（请自行更改博客相关的信息），如下所示：

``` js
import { readmorePlugin } from 'vuepress-plugin-readmore-popular-next'

module.exports = {
  plugins: [
    readmorePlugin({
      // 已申请的博客 ID
      blogId: '18762-1609305354821-257',
      // 已申请的微信公众号名称
      name: '全栈技术驿站',
      // 已申请的微信公众号回复关键词
      keyword: 'Tech',                    
      // 已申请的微信公众号二维码图片
      qrcode: 'https://www.techgrow.cn/img/wx_mp_qr.png',
      // 文章内容的 JS 选择器，若使用的不是官方默认主题，则需要根据第三方的主题来设置
      selector: 'div.theme-default-content',
      // 自定义的 JS 资源链接，可用于 CDN 加速
      libUrl: 'https://qiniu.techgrow.cn/readmore/dist/readmore.js',
      // 自定义的 CSS 资源链接，可用于适配不同风格的博客
      cssUrl: 'https://qiniu.techgrow.cn/readmore/dist/vuepress2.css',
      // 文章排除添加引流工具的 URL 规则，支持使用路径、通配符、正则表达式的匹配规则
      excludes: { strExp: [], regExp: [] },
      // 是否反转 URL 排除规则的配置，即只有符合排除规则的文章才会添加引流工具
      reverse: false,
      // 文章内容的预览高度(例如 300)，设置值为 auto 则表示预览高度自适应
      height: 'auto',
      // 是否添加微信公众号引流工具到移动端页面
      allowMobile: false,
      // 文章解锁后凭证的有效天数
      expires: 365,
      // 定时校验凭证有效性的时间间隔（秒）
      interval: 60,
      // 等待 DOM 节点加载完成的时间（毫秒），如果部分页面的引流功能无法生效，可适当增大此参数的值
      waitDomMills: 1000,
      // 每篇文章随机添加引流工具的概率，范围在 0.1 ~ 1.0 之间，代表 10% ~ 100%，其中 1.0 表示所有文章默认都添加引流工具
      random: 1.0
    })
  ]
}
```

## 插件参数说明


| 参数         | 类型            | 必填 | 默认值                                               | 说明 |
| ------------ | --------------- | ---- | ---------------------------------------------------- | ---- |
| blogId       | String          | 是   | 无                                                   | -    |
| name         | String          | 是   | 无                                                   | -    |
| keyword      | String          | 是   | 无                                                   | -    |
| qrcode       | String          | 是   | 无                                                   | -    |
| selector     | String          | 否   | `div.theme-default-content`                          | -    |
| libUrl       | String          | 否   | https://qiniu.techgrow.cn/readmore/dist/readmore.js  | -    |
| cssUrl       | String          | 否   | https://qiniu.techgrow.cn/readmore/dist/vuepress.css | -    |
| excludes     | Json Object     | 否   | `{ strExp: [ ], regExp: [ ] }`                       | -    |
| reverse      | Boolean         | 否   | `false`                                              | -    |
| allowMobile  | Boolean         | 否   | `false`                                              | -    |
| height       | String / Number | 否   | `auto`                                               | -    |
| expires      | Number          | 否   | `365`                                                | -    |
| interval     | Number          | 否   | `60`                                                 | -    |
| waitDomMills | Number          | 否   | `1000`                                               | -    |
| random       | Number          | 否   | `1.0`                                                | -    |

`selector` 参数的作用是指定 JS 选择器来获取文章的主体内容，若 VuePress 使用了第三方主题，则通常需要根据第三方主题来配置该参数，否则可能会导致引流工具无法生效。其中 VuePress 不同主题的配置示例如下（特别注意，随着主题的迭代开发，以下配置可能会过时失效，请根据最新的主题代码来配置）：

| 主题                                                                                            | 插件配置                                | 备注         |
| ----------------------------------------------------------------------------------------------- | --------------------------------------- | ------------ |
| [@vuepress/theme-default](https://github.com/vuepress/ecosystem/tree/main/themes/theme-default) | `selector: 'div.theme-default-content'` | 官方默认主题 |
| [vuepress-theme-hope](https://github.com/vuepress-theme-hope/vuepress-theme-hope)               | `selector: 'div.theme-hope-content'`    | 第三方主题   |

::: tip 提示
若不清楚如何指定 JS 选择器，则可以打开博客的任意一篇文章，利用 Chrome 等浏览器的元素审查功能，找到文章页面中文章主体的 `div` 标签，最后定位得到 `div` 标签的 CSS 类即可（例如 `theme-default-content`），<a :href="$withBase('/images/guide/ggmr7dg23fjj3mqndyays04ok93adj3n.png')" target="_blank">点击查看</a>详细的操作图解。
:::

## 验证插件效果

打开文章页面，若文章自动隐藏了部分内容，并且出现了 `阅读全文` 按钮，则说明引流插件正常运行，如下图所示：

<img :src="$withBase('/images/guide/g7v4su56sx5g95qipmzh0k1hknj6fsa7.png')">

点击 `阅读全文` 按钮，会弹出微信公众号的二维码窗口，如下图所示：

<img :src="$withBase('/images/guide/77o3g5fhjovtu725vm8z42lemqt8zwli.png')">

## 取消阅读限制

若希望关闭部分文章的微信公众号引流功能，可以使用插件的 `excludes` 参数来实现。值得一提的是，`excludes` 的参数值是一个 JSON 对象，其中的 `strExp` 属性是路径和通配符规则的字符串数组，而 `regExp` 属性是正则表达式的字符串数组。

- 根据 URL 路径，关闭某篇文章的引流功能

``` js
module.exports = {
  plugins: [
    readmorePlugin({
      // 排除 URL 为 `/fontend/webpack` 的文章
      excludes: { strExp: ['/fontend/webpack'] },    
    })
  ]
}
```

- 根据 URL 通配符，关闭某个目录下的所有文章的引流功能

``` js
module.exports = {
  plugins: [
    readmorePlugin({
      // 排除 URL 以 `/fontend` 开头的文章
      // 排除 URL 为 `/backend/python/io` 的文章
      excludes: { strExp: ['/fontend/*', '/backend/*/io'] },
    })
  ]
}
```

- 根据 URL 正则表达式，关闭符合规则的所有文章的引流功能


``` js
module.exports = {
  plugins: [
    ['vuepress-plugin-readmore-popular', {
      // 排除 URL 不以 `/php` 开头的文章
      excludes: { regExp: ['^(?!\/php).*'] },
    }]
  ]
}
```

- 混合使用

``` js
module.exports = {
  plugins: [
    readmorePlugin({
      excludes: { strExp: ['/webpack', '/fontend/*', '/backend/*/io'], regExp: ['^(?!\/php).*'] },
    })
  ]
}
```

::: tip 提示
- 文章 URL 优先匹配 `strExp` 规则，然后再匹配 `regExp` 规则
- 文章 URL 一旦满足 `strExp` 规则，则不会再匹配 `regExp` 规则
- 如果希望符合 URL 排除规则的文章才添加引流工具，则可以使用 `reverse : true` 配置参数实现
:::

## 开放 API 支持

若不希望依赖 TechGrow 官方提供的系统服务，可以选择使用开放 API 的方式，让引流插件直接使用私有化部署的后端系统服务，详细介绍请看<a :href="$withBase('/wechat/openapi/api/')">这里</a>。

## 自定义样式

插件默认使用了定义在 [vuepress2.css](https://qiniu.techgrow.cn/readmore/dist/vuepress2.css) 的 CSS 样式，你可以使用以下两种方式自定义自己的样式：

- 第一种方式：更改博客主题的 CSS 源码文件，将自定义的那部分 CSS 样式添加到里面
- 第二种方式：根据 [vuepress2.css](https://qiniu.techgrow.cn/readmore/dist/vuepress2.css) 创建自己的 CSS 文件（完整的），并将其存放在自己的博客里，同时通过插件的 `cssUrl` 配置参数来指定其访问的 URL 路径

> 提示：为了方便日后维护，强烈建议使用第二种方式来添加自定义样式

## 已兼容主题

| 主题                | GitHub 仓库                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 官方默认主题        | [https://github.com/vuepress/ecosystem/tree/main/themes/theme-default](https://github.com/vuepress/ecosystem/tree/main/themes/theme-default) |
| vuepress-theme-hope | [https://github.com/vuepress-theme-hope/vuepress-theme-hope](https://github.com/vuepress-theme-hope/vuepress-theme-hope)                     |

## 常见问题

::: tip 问题一
VuePress 安装插件后，所有页面的引流工具都无法生效。
:::

若所有页面的引流工具都无法生效，此时需要留意 VuePress 使用的是不是第三方主题。在使用第三方主题的情况下，通常需要根据第三方主题来配置插件的 `selector` 参数，该参数可以指定 JS 选择器来获取文章的主体内容，详细说明请看<a :href="$withBase('/wechat/tutorial/vuepress2/#插件参数说明')">这里</a>。值得一提的是，如果 `selector` 参数配置不正确导致引流工具无效，那么在浏览器的控制台会输出类似下面的警告信息：

<img :src="$withBase('/images/guide/8i4J9HpUUelLo43KLdHphgMHIFQwleNg.png')">

::: tip 问题二
VuePress 安装插件后，部分页面的引流工具无法生效。
:::

若部分页面的引流工具无法生效（例如站内不同页面之间的跳转，需要手动刷新一次页面后引流工具才生效），此时建议增大引流插件 `waitDomMills` 参数的值（例如 `2000`），该参数可以指定引流工具等待 DOM 节点加载完成的时间（毫秒）。

::: tip 问题三
VuePress 安装插件后，浏览器的控制台输出错误信息，且引流工具无法生效
:::

浏览器访问 VuePress 博客后，按下 `F12` 快捷键调出调试工具，然后切换到 `控制台`，最后将错误信息截图，并发送到 [官方微信群](https://www.techgrow.cn/img/wx-group-qr-techgrow.png) 或者 `656418510@qq.com` 邮箱，建议留言备注 VuePress 与 VuePress 主题的版本号。

::: tip 问题四
VuePress 安装插件后，移动端的引流工具无法生效，而 PC 端却生效
:::

考虑到用户体验的问题，在移动端默认是关闭引流功能的。若希望在移动端启用引流功能，可以通过 VuePress 引流插件的 `allowMobile: true` 配置参数来实现。

---
title: 主流博客
description: 博客引流微信公众号
---

## 前言

博客将流量导向微信公众号很简单，可以使用 [TechGrow](https://open.techgrow.cn) 的免费引流工具实现，用户扫码关注微信公众号后可以解锁全站文章，让微信公众号的粉丝数躺着增长。整个过程只需六步就可以搞定，适用于各类主流的博客框架，例如 `hexo`、`vuepress`、`hugo`、`gatsby`、`jekyll`、`typecho`、`wordpress` 等。

::: tip 提示
本文将以 Hexo 的 NexT 主题博客举例，重点介绍博客如何手动整合 [TechGrow](https://open.techgrow.cn) 的免费引流工具。
:::

## 特色功能

- 兼容主流的博客框架
- 支持随机为博客添加引流功能
- 支持查询用户解锁文章的历史记录
- 支持自定义或者动态计算文章内容的预览高度
- 支持自定义 CSS 样式，轻松适配不同风格的博客
- 支持开放 API，灵活接入第三方私有化部署的应用服务

## 使用步骤

### 第一步：注册博客

浏览器访问 [TechGrow](https://open.techgrow.cn) 的官网 ，注册并登录账号后，进入博客的后台管理页面。首先点击左侧的菜单 `博客注册`，然后点击 `新增` 按钮，添加自己博客的信息。博客注册成功后，记录下 `博客 ID`，后面的步骤会使用到

<img :src="$withBase('/images/guide/717e14eb59dd44dea62d6a0b7549abfd.png')">

### 第二步：设置公众号

在微信公众号的后台管理页面，菜单栏里选择 `自动回复` - `关键词回复`，启用 `自动回复`，然后点击 `添加回复` 按钮

<img :src="$withBase('/images/guide/em64p7w8wlqtt0rsjop0jjeywx29m25w.png')">

填写 `规则名称`、`关键词（当初你在 TechGrow 中设置的）`、`回复内容` 选择 `文字`，然后 `回复文字` 的内容填写获取博客解锁验证码的链接，如下所示（请自行更改 `xxxxx-xxxxxxxxx-xxx` 为你申请到的博客 ID）

``` html
<a href="https://open.techgrow.cn/#/readmore/captcha/generate?blogId=xxxxx-xxxxxxxxx-xxx">点击链接，获取博客解锁验证码</a>
```

<img :src="$withBase('/images/guide/yd89wbdji196ixtwzgzamw37fbein1ia.png')">

此时，当读者关注你的微信公众号，并输入关键词后（比如我设置的关键词就是 `tech`），那么读者就会自动接收到获取博客解锁验证码的链接

### 第三步：定位文章主体的标签元素

在 Hexo 博客的 `themes` 目录下，找到你正在使用的主题目录，比如：`next` 等，具体根据你选择的主题来判断。进入主题源码的 `layout` 目录，找到 `_macro/post.njk` 模板文件，若这里有一大段与文章主体内容相关的 HTML 代码，那就说明文章主体标签元素的模板定义就在这里，示例模板代码如下：

``` js
<div class="post-block">
  {# Gallery support #}
  {{ post_gallery(post.photos) }}

  <!-- 文章主体的标签元素 -->
  <article itemscope itemtype="http://schema.org/Article" class="post-content" lang="{{ post.lang }}">
    <link itemprop="mainEntityOfPage" href="{{ post.permalink }}">

    <span hidden itemprop="author" itemscope itemtype="http://schema.org/Person">
      <meta itemprop="image" content="{{ url_for(theme.avatar.url or theme.images + '/avatar.gif') }}">
      <meta itemprop="name" content="{{ author }}">
      <meta itemprop="description" content="{{ description }}">
    </span>

    ...（省略）

  </article>
</div>
```

另一种定位方式是打开你博客的任意一篇文章，利用 Chrome 等浏览器的元素审查功能，找到文章页面中文章主体的标签元素，比如下图中的 `article` 就是文章主体的标签元素：

<img :src="$withBase('/images/guide/5562a8e4868843e0868a4bdfd67c530e.png')">

### 第四步：新增文章内容 DIV 标签

在文章模板文件中找到文章主体的标签元素之后，在其上面包一层 `div` 标签，并将 `div` 标签的 `id` 属性值设置为 `readmore-container`，即添加的完整 HTML 标签为 `<div id="readmore-container"></div>`，示例模板代码如下：

``` html
<div class="post-block">
  {# Gallery support #}
  {{ post_gallery(post.photos) }}

  <!-- 新增的DIV标签 -->
  <div id="readmore-container">
    <article itemscope itemtype="http://schema.org/Article" class="post-content" lang="{{ post.lang }}">
        <link itemprop="mainEntityOfPage" href="{{ post.permalink }}">

        <span hidden itemprop="author" itemscope itemtype="http://schema.org/Person">
        <meta itemprop="image" content="{{ url_for(theme.avatar.url or theme.images + '/avatar.gif') }}">
        <meta itemprop="name" content="{{ author }}">
        <meta itemprop="description" content="{{ description }}">
        </span>

        ...（省略）

    </article>
  </div>
</div>
```

### 第五步：新增引流工具的 HTML 代码

打开 TechGrow 的[博客后台管理页面](https://open.techgrow.cn/#/readmore/website/register)，点击博客列表中右侧的 `使用` 链接，将窗口里的 HTML 代码复制到第三步中找到的文章模板文件的末尾，也可以统一添加到主题的 `footer` 模板文件中，示例 HTML 代码如下图所示：

<img :src="$withBase('/images/guide/ad963a38752743169e8f351983cc6cc1.png')">

| 参数     | 类型            | 必填 | 默认值    | 描述                                                                                                                      |
| -------- | --------------- | ---- | --------- | ------------------------------------------------------------------------------------------------------------------------- |
| id       | String          | 是   |           | DIV 标签的 ID                                                                                                             |
| blogId   | String          | 是   |           | 已申请的博客 ID                                                                                                           |
| name     | String          | 是   |           | 已申请的微信公众号名称                                                                                                    |
| qrcode   | String          | 是   |           | 已申请的微信公众号二维码图片                                                                                              |
| keyword  | String          | 是   |           | 已申请的微信公众号回复关键词                                                                                              |
| libUrl   | String          | 否   |           | JS 文件的链接，用于 CDN 加速                                                                                              |
| cssUrl   | String          | 否   |           | CSS 文件的链接，用于自定义样式                                                                                            |
| height   | String / Number | 否   | `auto`    | 文章内容的预览高度(例如 300)，设置值为 auto 则表示预览高度自适应                                                            |
| expires  | Number          | 否   | `365`     | 文章解锁后凭证的有效天数                                                                                                  |
| interval | Number          | 否   | `60`      | 定时校验凭证有效性的时间间隔（秒）                                                                                        |
| random   | Number          | 否   | `1`       | 每篇文章随机添加微信公众号引流工具的概率，有效范围在 0.1 ~ 1 之间，1 则表示所有文章默认都自动添加引流工具                 |
| type     | String          | 否   | `website` | 博客类型，包括：`hexo`、`vuepress`、`vuepress2`、`hugo`、`gatsby`、`jekyll`、`docsify`、`typecho`、`wordpress`、`website` |

### 第六步：验证引流工具是否整合成功

重新构建并运行博客服务后，打开文章页面，若文章自动隐藏了部分内容，并且出现了 `阅读全文` 按钮，则说明引流工具整合成功，如下图所示：

<img :src="$withBase('/images/guide/3f53ab36dfa84fb99a6508ae46e5373a.png')">

点击 `阅读全文` 按钮，会弹出微信公众号的二维码窗口，如下图所示：

<img :src="$withBase('/images/guide/202980a480fd463c814a31d5cc3fb2a1.png')">

::: tip 使用总结
博客整合引流工具，其本质原理就是先在博客的主题源码里，找到文章的主体内容，然后在其外面包裹一层 DIV 标签（`<div id="readmore-container"></div>`），最后再将引流工具的 HTML 代码添加到博客文章的末尾即可。
:::

## 自定义样式

引流工具默认使用了定义在 [readmore.css](https://qiniu.techgrow.cn/readmore/dist/readmore.css) 的 CSS 样式，你可以使用以下两种方式自定义自己的样式：

- 第一种方式：更改博客主题的 CSS 源码文件，将自定义的那部分 CSS 样式添加到里面
- 第二种方式：根据 [readmore.css](https://qiniu.techgrow.cn/readmore/dist/readmore.css) 创建自己的 CSS 文件（完整的），并将其存放在自己的博客里，同时通过引流工具的 `cssUrl` 配置参数来指定其访问的 URL 路径

> 提示：为了方便日后维护，强烈建议使用第二种方式来添加自定义样式

## 开放 API

若不希望依赖 TechGrow 官方提供的系统服务，可以选择使用开放 API 的方式，让引流插件直接使用私有化部署的后端应用服务，详细介绍请看<a :href="$withBase('/wechat/openapi/api/')">这里</a>。

## 常见问题

::: tip 问题一
博客整合引流工具后，浏览器的控制台输出警告或者错误信息，且引流工具无法生效
:::

浏览器访问博客后，按下 `F12` 快捷键调出调试工具，然后切换到 `控制台`，最后将警告或者错误信息截图，并发送到 [官方微信群](https://www.techgrow.cn/img/wx-group-qr-techgrow.png) 或者 `656418510@qq.com` 邮箱，建议留言备注博客链接与博客主题的类型。

::: tip 问题二
博客整合引流工具后，移动端的引流工具无法生效，而 PC 端却生效
:::

考虑到用户体验的问题，在移动端默认是关闭引流功能的，请知悉。

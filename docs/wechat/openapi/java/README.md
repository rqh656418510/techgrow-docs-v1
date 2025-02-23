---
title: Java 开源项目
description: Java 开源项目
---

## 前言

TechGrow 官方已开源基于 OpenAPI 的 [Java 版后端项目](https://github.com/rqh656418510/techgrow-openapi-java)。简单私有化部署 Java 后端服务后，就可以无缝接入已开源的引流插件，不限于 Hexo、VuePress 等引流插件。值得一提的是，您也可以在开源后端项目的基础上，二次开发自己所需要的功能。

## 接口实现

目前已完整实现 TechGrow 官方的 OpenAPI 接口，并做了一定的扩展，接口列表如下表所示。

| 接口名称     | 接口地址                         | 方法       | 说明                                            |
| ------------ | -------------------------------- | ---------- | ----------------------------------------------- |
| 获取验证码   | `/api/readmore/captcha/generate` | POST / GET | - GET 返回 HTML 页面 <br> - POST 返回 JSON 数据 |
| 校验验证码   | `/api/readmore/captcha/validate` | POST       |                                                 |
| 校验凭证     | `/api/readmore/token/validate`   | POST       |                                                 |
| 新增浏览记录 | `/api/readmore/browse/add`       | POST       |                                                 |

## 配置参数

在默认情况下，所有配置参数都可以通过操作系统的环境变量统一指定，除特别说明除外。

### 运行参数

| 参数名称          | 是否必填 | 类型    | 默认值  | 说明                                                   |
| ----------------- | -------- | ------- | ------- | ------------------------------------------------------ |
| PORT              | 否       | int     | `8080`  | 应用监听的端口                                         |
| ALLOW_CORS        | 否       | boolean | `true`  | 允许浏览器跨域                                         |
| ORM_CACHE_ENABLED | 否       | boolean | `false` | 启用 ORM 框架的二级缓存 ，可以提高应用访问数据库的性能 |

### 引流参数

| 参数名称              | 是否必填 | 类型   | 默认值    | 说明                                                                          |
| --------------------- | -------- | ------ | --------- | ----------------------------------------------------------------------------- |
| BLOG_ID               | 是       | string |           | 博客 ID，可任意指定，建议使用 `xxxxx-xxxxxxxxx-xxx` 的格式                    |
| TOKEN_EXPIRE_DAYS     | 否       | int    | `365`     | 解锁后凭证的有效天数                                                          |
| TOKEN_SIGN_KEY        | 否       | string |           | 凭证的签名密钥，必须是 86 个字符以上                                          |
| CAPTCHA_LENGTH        | 否       | int    | `6`       | 验证码的长度                                                                  |
| CAPTCHA_API_ADDRESS   | 否       | string |           | 获取验证码的网页地址                                                          |
| CAPTCHA_EXPIRES_VALUE | 否       | int    | `5`       | 验证码的有效时间                                                              |
| CAPTCHA_EXPIRES_UNIT  | 否       | string | `Minutes` | 验证码有效时间的单位，可选值： `Seconds`、`Minutes`、`Hours`、`Days`、`Weeks` |
| CAPTCHA_REPLY_KEYWORD | 否       | string | `验证码`  | 获取验证码的微信公众号回复关键词                                              |

### 公众号参数

| 参数名称                | 是否必填 | 类型   | 默认值 | 说明                       |
| ----------------------- | -------- | ------ | ------ | -------------------------- |
| WECHAT_APP_ID           | 否       | string |        | 微信公众号的开发者 ID      |
| WECHAT_APP_SECRET       | 否       | string |        | 微信公众号的开发者密码     |
| WECHAT_APP_TOKEN        | 否       | string |        | 微信公众号的令牌 (Token)   |
| WECHAT_ENCODING_AES_KEY | 否       | string |        | 微信公众号的消息加解密密钥 |

### 数据库参数

| 参数名称                | 是否必填 | 类型    | 默认值                                                                                                          | 说明                                |
| ----------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| DB_TYPE                 | 否       | string  | `h2`                                                                                                            | 数据库的类型，可选值：`h2`、`mysql` |
| DB_USER                 | 否       | string  | `root`                                                                                                          | 连接数据库的用户名                  |
| DB_PASSWORD             | 否       | string  | `123456`                                                                                                        | 连接数据库的密码                    |
| DB_URL                  | 否       | string  | <a href="jdbc:h2:file:./db/readmore;MODE=MySQL;AUTO_SERVER=TRUE;DB_CLOSE_DELAY=-1;AUTO_RECONNECT=TRUE">查看</a> | 连接数据库的 JDBC URL               |
| DB_CONSOLE_ENABLED      | 否       | boolean | `false`                                                                                                         | 启用 H2 数据库的 Web 控制台         |
| DB_CONSOLE_PATH         | 否       | string  | `/h2-console`                                                                                                   | H2 数据库的 Web 控制台访问地址      |
| DB_CONSOLE_ALLOW_OTHERS | 否       | boolean | `false`                                                                                                         | 允许远程访问 H2 数据库的 Web 控制台 |

## 数据库使用

::: tip 阅读提示
在默认情况下，您无需指定 Java 后端服务的数据库配置参数，即可跳过阅读数据库使用这一章节。
:::

目前支持使用 [H2](https://h2database.com) 或者 MySQL 数据库，默认使用的数据库是 H2。另外，连接数据库的默认用户名称是 `root`，默认用户密码是 `123456`。值得一提的是，以后会支持更多的数据库类型，例如 SQLite、MongoDB、PostgreSQL 等。

### H2 数据库

Java 后端服务默认使用 [H2](https://h2database.com) 作为数据库（内嵌式数据库），且在默认的配置下会持久化数据库的数据，并将数据保存到 Java后端服务（即 Jar 包）所在目录下的 `db` 目录里的 `readmore.mv.db` 文件中。如果不需要持久化数据库的数据，则可以使用 H2 数据库的内存模式，这样可以得到极致的数据库性能，但应用重启后会丢失所有数据库数据。

::: tip H2 数据库的连接

H2 数据库的连接，可以使用 `DB_TYPE`、`DB_URL` 配置参数来实现。值得一提的是，H2 数据库支持多种连接方式，而且都可以使用 `DB_URL` 配置参数来指定。常用的两种连接方式如下。
:::

| 连接语法                        | 说明                                                                       |
| ------------------------------- | -------------------------------------------------------------------------- |
| `jdbc:h2:mem:<dbName>`          | 内存模式，应用重启会丢失数据库数据，且不支持多个客户端同时连接同一个数据库 |
| `jdbc:h2:file:[<path>]<dbName>` | 持久化模式，应用重启不会丢失数据库数据                                     |

``` properties
# 内存模式，应用重启会丢失数据库数据，MODE 表示兼容哪种数据库
DB_TYPE=h2
DB_URL=jdbc:h2:mem:readmore;MODE=MySQL;DB_CLOSE_ON_EXIT=FALSE;DB_CLOSE_DELAY=-1;AUTO_RECONNECT=TRUE

# 持久化模式，连接位于 Java 后端服务（即 Jar 包）所在目录下的 db 目录里的 readmore 数据库，MODE 表示兼容哪种数据库
DB_TYPE=h2
DB_URL=jdbc:h2:file:./db/readmore;MODE=MySQL;AUTO_SERVER=TRUE;DB_CLOSE_DELAY=-1;AUTO_RECONNECT=TRUE
```

::: tip H2 数据库的初始化
Java 后端服务正常启动后，默认会自动执行 H2 数据库的初始化操作（包括创建数据库和数据库表），无需人为干预。
:::

::: tip H2 的 Web 控制台
H2 数据库自带 Web 控制台，它的作用就相当于 PhpMyAdmin，可以很方便地在线管理数据库。
:::

使用配置参数 `DB_CONSOLE_ENABLED=true`，就可以启用 H2 的 Web 控制台功能，浏览器默认的访问路径是 `http://ip:port/h2-console`，默认端口是 `8080`。考虑到数据库的安全性，H2 的 Web 控制台默认不允许远程访问，但可以使用`DB_CONSOLE_ALLOW_OTHERS=true` 配置参数来解除限制。

### MySQL 数据库

若希望连接 MySQL 数据库，可以使用 `DB_TYPE`、`DB_URL` 配置参数来实现，建议使用 MySQL `5.7.x` 版本。

::: tip MySQL 数据库的创建
在启动 Java 后端服务前，必须在 MySQL 里手动创建数据库 `readmore`，否则应用将无法正常启动。
:::

``` sql
# 创建数据库
CREATE DATABASE IF NOT EXISTS `readmore` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

::: tip MySQL 数据库的连接
连接 MySQL 数据库，需要使用配置参数 `DB_TYPE` 指定数据库的类型，并使用 `DB_URL` 配置参数指定连接数据库的 URL。
:::

``` properties
# 连接 MySQL 数据库
DB_TYPE=mysql
DB_URL=jdbc:mysql://127.0.0.1:3306/readmore?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai&autoReconnect=true&useSSL=false
```

::: tip MySQL 数据库的初始化
Java 后端服务正常启动后，默认会自动执行 MySQL 数据库的初始化操作（创建数据库表），无需人为干预。
:::

## 数据库备份

### H2 数据库

Java 后端服务在默认的配置下会持久化 H2 数据库的数据，并将数据保存到 Java 后端服务（即 Jar 包）所在目录下的 `db` 目录里的 `readmore.mv.db` 文件中。因此，您可以先关闭 Java 后端服务，然后拷贝一份 `readmore.mv.db` 文件，即可实现 H2 数据库的全量备份。另外，您也可以通过 H2 的 Web 控制台工具进行备份，支持在不关闭 Java 后端服务的基础上，实时备份或者恢复 H2 的数据库数据。

### MySQL 数据库

MySQL 数据库的备份，建议使用命令行进行全量备份，使用示例如下。

``` sh
# 全量备份，"-h" 指定数据库的地址，"-u" 指定数据库的账号名称
mysqldump -h 127.0.0.1 -u root -p readmore > readmore.sql
```

## 命令行部署

Java 后端服务支持使用命令行的方式部署，但不推荐使用。第一个原因是对操作系统的软件环境有依赖；第二个原因是操作系统重启后，需要手动启动 Java 后端服务，除非是注册成系统服务或者使用第三方工具（如 Supervisor）来管理服务。推荐使用 Docker 或者 Docker-Compose 进行部署。

### 安装 JDK

使用命令行部署方式，必须在 Linux 操作系统上先安装并配置好 JDK 1.8+，然后才能部署 Java 后端服务。

- 安装 OpenJDK

``` sh
# 下载文件
$ wget https://download.java.net/openjdk/jdk11.0.0.2/ri/openjdk-11.0.0.2_linux-x64.tar.gz

# 创建解压目录
$ sudo mkdir -p /usr/lib/jvm

# 解压文件
$ sudo tar -xvf openjdk-11.0.0.2_linux-x64.tar.gz -C /usr/lib/jvm

# 重命名文件
$ sudo mv /usr/lib/jvm/jdk-11.0.0.2 /usr/lib/jvm/openjdk-11.0.0.2
```

- 添加系统环境变量

``` sh
# 编辑配置文件，添加环境变量
$ vi ~/.bashrc
export JAVA_HOME=/usr/lib/jvm/openjdk-11.0.0.2
export PATH=$PATH:$JAVA_HOME/bin

# 使环境变量生效
$ source ~/.bashrc
```

- 验证 OpenJDK 安装

``` sh
# 查看 OpenJDK 的版本号
$ java -version
```

::: tip 提示
不同版本的 OpenJDK 可以在 [OpenJDK 官网](https://jdk.java.net/archive/) 下载得到。
:::

### 命令行部署

首先从 [GitHub](https://github.com/rqh656418510/techgrow-openapi-java/releases) 下载最新版本的软件包，文件名称为 `techgrow-openapi-java.jar`。使用命令行部署 Java 后端服务时，需要使用 `-D` 指定服务运行所需的配置参数（目的是指定系统属性）。Linux 系统的部署步骤如下，适用于 CentOS/Ubuntu/Debian 等发行版。

``` sh
# 启动Java后端服务
nohup java -jar \
      -DCAPTCHA_REPLY_KEYWORD=验证码 \
      -DBLOG_ID=18762-1609305354821-257 \
      -DWECHAT_APP_ID=xxxxxxxxxxxxxxxxxxxxxx \
      -DWECHAT_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx \
      -DWECHAT_APP_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx \
      -DWECHAT_ENCODING_AES_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxx \
      -DCAPTCHA_API_ADDRESS=http://ip:port/api/readmore/captcha/generate \
      techgrow-openapi-java.jar > catalina.out 2>&1 &
```

``` sh
# 查看Java后端服务的进程
ps -aux|grep "techgrow-openapi"

# 查看Java后端服务的启动日志
tail -f -n 50 ./logs/techgrow-openapi-java/info.log

# 查看Java后端服务的错误日志
tail -f -n 50 ./logs/techgrow-openapi-java/error.log
```

Java 后端服务正常启动后，会在应用所在的目录下创建 H2 数据库文件和 Java 日志文件，完整的目录结构如下。

```
app
├── catalina.out
├── db
│   └── readmore.mv.db
├── logs
│   └── techgrow-openapi-java
│       ├── debug.log
│       ├── error.log
│       └── info.log
└── techgrow-openapi-java.jar
```

## Docker 部署

当使用 H2 作为数据库，在 Docker 容器启动后，H2 的数据库文件和 Java 后端服务的日志文件默认都存放在容器内的 `/usr/local/techgrow-openapi-java` 目录下。为了防止 Docker 容器销毁后，导致 H2 数据库数据的丢失，则必须先在本地磁盘创建数据库目录，然后将它挂载到 Docker 容器中。

``` sh
# 创建数据库目录
mkdir -p /usr/data/techgrow-openapi/db

# 创建日志文件目录
mkdir -p /usr/data/techgrow-openapi/logs
```

::: tip Docker 配置参数指定
Docker 或者 Docker-Compose 部署应用时，都可以通过环境变量的方式来指定 Java 后端服务的配置参数。
:::

### Docker 快速部署

``` sh
docker run -p 8080:8080 \
    -e CAPTCHA_REPLY_KEYWORD=验证码 \
    -e BLOG_ID=18762-1609305354821-257 \
    -e WECHAT_APP_ID=xxxxxxxxxxxxxxxxxxxxxx \
    -e WECHAT_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx \
    -e WECHAT_APP_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx \
    -e WECHAT_ENCODING_AES_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxx \
    -e CAPTCHA_API_ADDRESS=http://ip:port/api/readmore/captcha/generate \
    -v /usr/data/techgrow-openapi/db:/usr/local/techgrow-openapi-java/db \
    -v /usr/data/techgrow-openapi/logs:/usr/local/techgrow-openapi-java/logs \
    -d --name techgrow-openapi techgrow/techgrow-openapi-java:latest
```

### Docker-Compose 部署

``` yml
version: "3.5"

services:
  techgrow-openapi:
    image: techgrow/techgrow-openapi-java:latest
    container_name: techgrow-openapi
    privileged: false
    restart: always
    environment:
      - CAPTCHA_REPLY_KEYWORD=验证码
      - BLOG_ID=18762-1609305354821-257
      - WECHAT_APP_ID=xxxxxxxxxxxxxxxxxxxxxx
      - WECHAT_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
      - WECHAT_APP_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      - WECHAT_ENCODING_AES_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
      - CAPTCHA_API_ADDRESS=http://ip:port/api/readmore/captcha/generate
    ports:
      - 8080:8080
    volumes:
      - '/usr/data/techgrow-openapi/db:/usr/local/techgrow-openapi-java/db'
      - '/usr/data/techgrow-openapi/logs:/usr/local/techgrow-openapi-java/logs'
```

``` sh
# 创建并启动容器
docker-compose up -d
```

::: tip 查看 Docker 容器的运行日志
为了观察 Java 后端服务是否启动成功，可以查看 Java 后端服务的启动日志来判断。在 Docker 容器启动后，可以使用 `docker logs -f --tail 50 techgrow-openapi` 命令查看 Docker 容器的运行日志。另外，还可以直接使用 `vi` 编辑器，打开本地磁盘里的 Java 后端服务日志文件，所在的目录路径是 `/usr/data/techgrow-openapi/logs`。
:::

## 公众号的服务器配置

::: warning 特别注意
配置公众号的服务器后，Java 后端服务将完全接管微信公众号的消息处理。这样的优势是可以防止用户在关注公众号并解锁文章后，又立刻取消关注，借此白嫖博客的内容。值得一提的是，配置公众号的服务器后，您将无法再使用公众号官方的关键词自动回复功能。
:::

下面需要您登录[微信公众号的官网](https://mp.weixin.qq.com)，获取公众号的开发者账号信息，并配置公众号的服务器。

### 公众号参数

由于 Java 后端服务在处理微信公众号消息时，需要有公众号的开发者账号信息。因此必须在 Java 后端服务启动时，指定以下全部配置参数。值得一提的是，公众号的开发者账号信息只会在程序运行时使用到，并不会存储在任何地方，因此您不用担心账号泄漏等安全问题。

| 参数名称                | 说明                             |
| ----------------------- | -------------------------------- |
| WECHAT_APP_ID           | 微信公众号的开发者 ID            |
| WECHAT_APP_SECRET       | 微信公众号的开发者密码           |
| WECHAT_APP_TOKEN        | 微信公众号的令牌 (Token)         |
| WECHAT_ENCODING_AES_KEY | 微信公众号的消息加解密密钥       |
| CAPTCHA_API_ADDRESS     | 获取验证码的网页地址             |
| CAPTCHA_REPLY_KEYWORD   | 获取验证码的微信公众号回复关键词 |

### 服务器配置

::: warning 公网端口说明
配置公众号的服务器之前，必须确保 Java 后端服务可以在公网通过 `80` 端口 (Http) 或者 `443` 端口 (Https) 正常访问。值得一提的是，Java 后端服务启动后，默认监听的端口是 `8080`，可以通过 `PORT` 配置参数来更改其监听的端口，或者使用 Nginx 等代理服务器代理 Java 后端服务，又或者使用 Docker 的 `-p` 参数指定容器的端口映射。
:::

浏览器登录[微信公众号的管理后台](https://mp.weixin.qq.com)，菜单栏里选择 `设置与开发` -> `基础配置`，在 `公众号开发信息` 一栏获取公众号的开发信息，包括 `开发者 ID` 和 `开发者密码`。

<img :src="$withBase('/images/guide/biphl74didn209mtcmdf8o64frhsd20j.png')">

在 `服务器配置` 一栏，点击 `修改配置` 按钮，填写对应的服务器信息，其中的 `URL` 需要指定为 Java 后端服务接收公众号消息的地址 (`http://ip:port/api/readmore/wechat/receive`)，消息加解密方式必须选择 `安全模式`，最后点击 `启用` 按钮让服务器的配置生效。

<img :src="$withBase('/images/guide/32d3joc2xxbo2ynfn7lxqnglhlz9echb.png')">

完整的公众号配置参数说明，如下图所示。

<img :src="$withBase('/images/guide/kmfcx123mdy4qvgn84xhxwyy2nswq2ho.png')">

## 公众号自动回复配置

::: warning 特别注意
使用微信公众号官方的关键词自动回复功能，将获取验证码的链接发送给用户，这种方式是无法传递 `toOpenId` 和 `fromOpenId` 参数的。简而言之，在这种场景下 Java 后端服务无法检测到用户是否取消关注公众号，导致用户可以在关注公众号并解锁文章后，又立刻取消关注，借此白嫖博客的内容。
:::

### 公众号参数

当您使用微信公众号官方的关键词自动回复功能，那么在 Java 后端服务启动的时候，无需再指定以下配置参数。

| 参数名称                | 说明                             |
| ----------------------- | -------------------------------- |
| WECHAT_APP_ID           | 微信公众号的开发者 ID            |
| WECHAT_APP_SECRET       | 微信公众号的开发者密码           |
| WECHAT_APP_TOKEN        | 微信公众号的令牌 (Token)         |
| WECHAT_ENCODING_AES_KEY | 微信公众号的消息加解密密钥       |
| CAPTCHA_API_ADDRESS     | 获取验证码的网页地址             |
| CAPTCHA_REPLY_KEYWORD   | 获取验证码的微信公众号回复关键词 |

### 自动回复配置

浏览器登录[微信公众号的管理后台](https://mp.weixin.qq.com)，菜单栏里选择 `自动回复` - `关键词回复`，启用 `自动回复`，然后点击 `添加回复` 按钮

<img :src="$withBase('/images/guide/em64p7w8wlqtt0rsjop0jjeywx29m25w.png')">

填写 `规则名称`、`关键词（例如验证码）`、`回复内容` 选择 `文字`，然后 `回复文字` 的内容填写获取博客解锁验证码的链接（如下）。

``` html
<a href="http://ip:port/api/readmore/captcha/generate?blogId=18762-1609305354821-257">点击链接，获取博客解锁验证码</a>
```

<img :src="$withBase('/images/guide/no58feuvrylv60m5fso8po63v8l90j29.png')">

此时，当读者关注您的微信公众号，并输入关键词后（如 `验证码`），就会自动接收到获取博客解锁验证码的链接。

## 接入引流插件

当基于 OpenAPI 的 Java 后端服务部署完成后，就可以通过开源引流插件的 `baseUrl` 配置参数无缝接入它，不限于 Hexo、VuePress 等插件。

::: warning 特别注意
如果您使用的是 Hexo、VuePress 等引流插件，请卸载旧版插件，然后再安装最新版的插件，否则引流插件的 `baseUrl` 配置参数可能会不生效。另外，请确保公网能正常访问 Java 后端服务，否则引流插件无法调用 Java 后端服务的接口。
:::

### HTML 代码的接入

``` html
<link href="https://qiniu.techgrow.cn/readmore/dist/readmore.css" type="text/css" rel="stylesheet">
<script src="https://qiniu.techgrow.cn/readmore/dist/readmore.js" type="text/javascript"></script>
<script>
    var regex = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    var isMobile = navigator.userAgent.match(regex);
    if (!isMobile) {
        try {
            var plugin = new ReadmorePlugin();
            plugin.init({
                id: "readmore-container",
                blogId: "18762-1609305354821-257",
                name: "全栈技术驿站",
                keyword: "Tech",
                qrcode: "https://www.techgrow.cn/img/wx_mp_qr.png",
                type: "hexo",
                height: "auto",
                expires: "365",
                interval: "60",
                random: "1.0",
                baseUrl: 'http://ip:port'
            })
        } catch (e) {
            console.warn("readmore plugin occurred error: " + e.name + " | " + e.message);
        }
    }
</script>
```

### Hexo 插件的接入

``` yml
readmore:
  # 是否启用
  enable: true
  # 已申请的博客 ID
  blogId: '18762-1609305354821-257'
  # 已申请的微信公众号名称
  name: '全栈技术驿站'
  # 已申请的微信公众号回复关键词
  keyword: 'Tech'
  # 已申请的微信公众号二维码图片
  qrcode: 'https://www.techgrow.cn/img/wx_mp_qr.png'
  # 自定义的 JS 资源链接，可用于 CDN 加速
  libUrl: 'https://qiniu.techgrow.cn/readmore/dist/readmore.js'
  # 自定义的 CSS 资源链接，可用于适配不同风格的博客
  cssUrl: 'https://qiniu.techgrow.cn/readmore/dist/hexo.css'
  # 文章内容的预览高度(例如 300)，设置值为 auto 则表示预览高度自适应
  height: 'auto'
  # 命令行终端是否输出日志信息
  debug: true
  # 文章解锁后凭证的有效天数
  expires: 365
  # 定时校验凭证有效性的时间间隔（秒）
  interval: 60
  # 是否添加微信公众号引流工具到移动端页面
  allowMobile: false
  # 每篇文章随机添加引流工具的概率，范围在 0.1 ~ 1.0 之间，代表 10% ~ 100%，其中 1.0 表示所有文章默认都添加引流工具
  random: 1.0
  # 基于 OpenAPI 的后端服务地址
  baseUrl: 'http://ip:port'
```

### VuePress v1 插件的接入

``` js
module.exports = {
  plugins: [
    ['vuepress-plugin-readmore-popular', {
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
      cssUrl: 'https://qiniu.techgrow.cn/readmore/dist/vuepress.css',
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
      random: 1.0,
      // 基于 OpenAPI 的后端服务地址
      baseUrl: 'http://ip:port'
    }]
  ]
}
```

### VuePress v2 插件的接入

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
      random: 1.0,
      // 基于 OpenAPI 的后端服务地址
      baseUrl: 'http://ip:port'
    })
  ]
}
```

## 验证部署结果

- 第一步
  - 浏览器访问 Java 后端服务的首页 `http://ip:port`，默认端口是 `8080`，若页面能够显示 `Welcome to TechGrow OpenAPI`，则说明 Java 后端服务正常启动。
- 第二步
  - 在手机上打开微信，首先取消关注自己的微信公众号，然后再次关注，并发送公众号的回复关键词（如 `验证码`），如果能够接收到获取验证码的链接，则说明公众号的消息可以被正常处理。
- 第三步
  - 启动博客的预览服务，点击 `阅读全文按钮`，输入从自己公众号获取到的验证码，如果能够解锁博客文章，则说明引流插件正常工作。

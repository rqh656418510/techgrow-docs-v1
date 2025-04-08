module.exports = {

	// 基础配置
	base: '/v1/',
	head: [
		['meta', { 'http-equiv': 'expires', content: '0' }],
		['meta', { 'http-equiv': 'pragram', content: 'no-cache' }],
		['meta', { 'http-equiv': 'cache-control', content: 'no-cache, no-store, must-revalidate' }],
		['meta', { name: 'application-name', content: 'TechGrow 官方文档' }],
		['meta', { name: 'apple-mobile-web-app-title', content: 'TechGrow 官方文档' }],
		['link', { rel: 'icon', type: 'image/png', sizes: '30x30', href: `/images/icons/favicon-30x30.png` }]
	],

	// 多语言配置
	locales: {
		'/': {
			lang: 'zh-CN',
			title: 'TechGrow 官方文档',
			description: '专注于自媒体引流的免费开放平台'
		}
	},

	// 主题配置
	theme: 'reco',
	themeConfig: {
		author: 'TechGrow',
		startYear: '2022',
		logo: '/head.png',
		record: '粤ICP备 19024664号-1',
		recordLink: 'https://beian.miit.gov.cn/',
		subSidebar: 'auto',
		displayAllHeaders: false,
		editLinks: true,
		lastUpdated: '上次更新',
		docsDir: 'docs',
		docsBranch: 'main',
		repo: 'rqh656418510/techgrow-docs-v1',
		locales: {
			'/': {
				editLinkText: '在 GitHub 上编辑此页',
				nav: require('./configs/navbar/zh.ts'),
				sidebar: require('./configs/sidebar/zh.ts')
			}
		}
	},

	// 插件配置
	plugins: [
		[
			'@vuepress/nprogress', true
		],
		[
			'@vuepress/pwa',
			{
				serviceWorker: true,
				updatePopup: {
					message: '发现新内容可用',
					buttonText: '刷新'
				}
			}
		],
		[
			'@vuepress/last-updated',
			{
				dateOptions: {
					hour12: false
				}
			}
		],
		[
			'vuepress-plugin-medium-zoom',
			{
				selector: '.theme-reco-content img',
				delay: 1000,
				options: {
					margin: 24,
					scrollOffset: 0
				}
			}
		],
		[
			'sitemap',
			{
				hostname: 'https://docs.techgrow.cn',
				exclude: ['/404.html']
			}
		],
		[
			'vuepress-plugin-code-copy',
			{
				selector: 'div[class*="language-"] pre',
				successText: '已复制内容',
				staticIcon: false,
				align: 'bottom'
			}
		],
		[
			'vuepress-plugin-baidu-seo',
			{
				ignoreLocal: true,
				hm: '43c937a5b15d4206e725c4d25d1168d2'
			}
		],
		[
			'@vuepress-reco/vuepress-plugin-rss', {
				site_url: 'https://docs.techgrow.cn/v1'
			}
		],
		[
			'@vuepress-reco/vuepress-plugin-bulletin-popover',
			{
				width: '300px',
				title: '网站公告',
				body: [
					{
						type: 'title',
						content: '欢迎加入微信讨论群',
						style: 'text-aligin: center;'
					},
					{
						type: 'image',
						src: 'https://www.techgrow.cn/img/wx-group-qr-techgrow.png'
					}
				],
				footer: [
					{
						type: 'button',
						text: '赞助',
						link: '/v1/donate/'
					}
				]
			}
		],
		[
			'vuepress-plugin-readmore-popular', {
				// 已申请的博客 ID
				blogId: '19178-1670885606731-361',
				// 已申请的微信公众号名称
				name: '全栈技术驿站',
				// 已申请的微信公众号回复关键词
				keyword: 'VuePress',
				// 已申请的微信公众号二维码图片
				qrcode: 'https://www.techgrow.cn/img/wx_mp_qr.png',
				// 文章内容的 JS 选择器，若使用的不是官方默认主题，则需要根据第三方的主题来设置
				selector: 'div.theme-reco-content',
				// 自定义的 JS 资源链接，可用于 CDN 加速
				libUrl: 'https://qiniu.techgrow.cn/readmore/dist/readmore.js',
				// 自定义的 CSS 资源链接，可用于适配不同风格的博客
				cssUrl: 'https://docs.techgrow.cn/v1/css/vuepress.css',
				// 文章排除添加引流工具的 URL 规则，支持使用路径、通配符、正则表达式的匹配规则
				excludes: { strExp: [], regExp: ['^(?!\/v1/wechat/demo).*'] },
				// 是否反转 URL 排除规则的配置，即只有符合排除规则的文章才会添加引流工具
				reverse: false,
				// 文章内容的预览高度(例如 300)，设置值为 auto 则表示预览高度自适应
				height: 'auto',
				// 是否添加微信公众号引流工具到移动端页面
				allowMobile: false,
				// 文章解锁后凭证的有效天数
				expires: 365,
				// 定时校验凭证有效性的时间间隔（秒）
				interval: 30,
				// 等待 DOM 节点加载完成的时间（毫秒），如果部分页面的引流功能无法生效，可适当增大此参数的值
				waitDomMills: 1000,
				// 每篇文章随机添加引流工具的概率，范围在 0.1 ~ 1.0 之间，代表 10% ~ 100%，其中 1.0 表示所有文章默认都添加引流工具
				random: 1.0
			}
		]
	],

	// MarkDown 扩展
	markdown: {
		toc: {
			includeLevel: [1, 2]
		}
	},

	// 监听配置文件
	extraWatchFiles: [
		'.vuepress/configs/navbar/zh.ts',
		'.vuepress/configs/sidebar/zh.ts'
	]
}

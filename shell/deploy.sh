#!/bin/bash

########################################################
#####       在本地开发环境，一键部署到 Linux 生产环境
#####             必须在 shell 目录下执行脚本
########################################################

# 更新流程
# 1. 在本地执行一键部署脚本： bash deploy.sh
# 2. 浏览器强制刷新页面后，即可正常加载最新的 Web 资源文件，无需重启 Web 服务器

# 判断当前用户是否为Root用户
if [ ! $UID -eq 0 ]; then
  echo -e "\033[31m Error: 请使用超级用户权限执行当前脚本 \033[0m"
  echo -e "\033[31m Error: 程序退出执行 \033[0m"
  exit 1
fi

# 读取INI配置文件
function __readINI() {
 	INIFILE=$1; SECTION=$2; ITEM=$3
 	_readContent=`awk -F '=' '/\['$SECTION'\]/{a=1}a==1&&$1~/'$ITEM'/{print $2;exit}' $INIFILE`
	echo ${_readContent}
}

# 初始化连接参数
_HOST=( $( __readINI /etc/rsyncd.ini TechGrowDocsV1 host ) )
_USER=( $( __readINI /etc/rsyncd.ini TechGrowDocsV1 user ) )
_MODULE=( $( __readINI /etc/rsyncd.ini TechGrowDocsV1 module ) )
_PASSWORD_FILE=( $( __readINI /etc/rsyncd.ini TechGrowDocsV1 password_file ) )

# 源目录
_DIST_DIR='../docs/.vuepress/dist/'

# 清理文件
rm -rf $_DIST_DIR

# 编译构建
npm run docs:build

# 同步文件到生产服务器（使用 "--delete" 参数删除目标目录比源目录多余的文件）
rsync -avzP --delete --no-o --no-g $_DIST_DIR $_USER@$_HOST::$_MODULE/ --password-file=$_PASSWORD_FILE

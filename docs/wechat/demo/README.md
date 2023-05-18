---
title: CMake 单元测试
description: CMake 单元测试
---

## 前言

CMake 是一个跨平台的 C/C++ 项目组织管理工具，虽然许多 IDE 都有私有的项目管理工具，但是在现在各大 IDE 基本都支持使用 CMake 管理项目，所以如果有跨平台的需求，使用 CMake 管理是最方便的。值得一提的是，CMake 支持 [gtest](https://github.com/google/googletest
)、`cppunit` 等单元测试框架，当然也可以使用断言自定义单元测试。

## 创建带单元测试的项目

### 创建项目工程

> 项目的目录结构如下：

```
minder-test
├── CMakeLists.txt
├── include
│   └── datetime.h
├── src
│   ├── datetime.cpp
│   └── main.cpp
└── test
    ├── CMakeLists.txt
    ├── include
    │   └── strUtil.h
    └── src
        └── main.cpp
```

<!-- more -->

### 编写项目代码

- include/datetime.h

``` cpp
#pragma once

#include <iostream>
#include <sstream>

using namespace std;

// 日期工具类
class DateUtil {

public:

    static string formatCurrentTime();

    static string formatCurrentTime(string format);

    static int dayOfWeek(const string &date);

    static bool isWeekendDays(const string &date);
};
```

- src/datetime.cpp

``` cpp
#include "datetime.h"

// 格式化当前时间
// 默认格式是: 2020-06-07 23:46:53
string DateUtil::formatCurrentTime() {
    time_t rawtime;
    struct tm *info;
    char buffer[80];

    time(&rawtime);
    info = localtime(&rawtime);
    strftime(buffer, 80, "%Y-%m-%d %H:%M:%S", info);
    string str(buffer);
    return str;
}

// 格式化当前时间
// format: 格式字符串，例如 %Y-%m-%d %H:%M:%S
string DateUtil::formatCurrentTime(string format) {
    time_t rawtime;
    struct tm *info;
    char buffer[80];

    time(&rawtime);
    info = localtime(&rawtime);
    strftime(buffer, 80, format.c_str(), info);
    string str(buffer);
    return str;
}

// 根据给定的日期，计算它是星期几
// date: 日期字符串，格式是: 2021-12-01
// 返回值：1, 2, 3, 4, 5, 6, 0, 其中 0 表示星期日
int DateUtil::dayOfWeek(const string &date) {
    char c;
    int y, m, d;
    stringstream(date) >> y >> c >> m >> c >> d;
    tm t = {0, 0, 0, d, m - 1, y - 1900};
    mktime(&t);
    return t.tm_wday;
}

// 根据给定的日期，判断是否为周末
// date: 日期字符串，格式是: 2021-12-01
bool DateUtil::isWeekendDays(const string &date) {
    int wday = dayOfWeek(date);
    if (wday == 6 || wday == 0) {
        return true;
    }
    return false;
}
```

- src/main.cpp

``` cpp
#include <iostream>
#include "datetime.h"

using namespace std;

int main() {
    cout << DateUtil::formatCurrentTime() << endl;
    cout << DateUtil::formatCurrentTime("%Y-%m-%d") << endl;
    return 0;
}
```

- test/include/strUtil.h

``` cpp
#pragma once

#include <iostream>

using namespace std;

// 去除字符串两边的空格
void trim(string &str) {
    if (str.empty()) {
        return;
    }
    str.erase(0, str.find_first_not_of(" "));
    str.erase(str.find_last_not_of(" ") + 1);
}
```

- test/src/main.cpp

``` cpp
#include <iostream>
#include "strUtil.h"
#include "datetime.h"

using namespace std;

int main() {
    // 去除字符串两边的空格
    string str = " Hello World ! ";
    trim(str);
    cout << str << endl;

    // 根据给定的日期，计算它是星期几
    cout << "wday = " << DateUtil::dayOfWeek("2022-01-11") << ", ";
    cout << "isWeekendDays = " << (DateUtil::isWeekendDays("2022-01-11") ? "true" : "false") << endl;
    return 0;
}
```

其中 `test` 目录可以视作为子项目，和主目录分开编译。为了模拟更真实的企业项目开发场景，这里的 `test/src/main.cpp` 同时引入了 `datetime.h` 和 `strUtil.h` 头文件。

### CMake 配置文件

- 主目录的 `CMakeLists.txt`

``` cmake
cmake_minimum_required(VERSION 3.15)

# 项目信息
project(minder)

# 定义C++的版本
set(CMAKE_CXX_STANDARD 11)

# 输出调试信息
set(CMAKE_CXX_FLAGS "-g")

# 开启所有警告
set(CMAKE_CXX_FLAGS "-Wall")

# 指定构建输出的目录
set(PROJECT_BINARY_DIR ${PROJECT_SOURCE_DIR}/build)

# 引入主项目的头文件
include_directories(${PROJECT_SOURCE_DIR}/include)

# 搜索主项目的源文件
aux_source_directory(${PROJECT_SOURCE_DIR}/src MAIN_SOURCES)

# 指定可执行文件的名称和主项目的所有源文件
add_executable(${PROJECT_NAME} ${MAIN_SOURCES})

# 启用项目测试
enable_testing()

# 添加子目录（测试项目）
add_subdirectory(test)

# 添加测试项目的可执行文件
add_test(minder_test ${PROJECT_SOURCE_DIR}/test/build/minder_test)
```

特别说明：

- `set(CMAKE_CXX_FLAGS "-xxx")`：指定编译参数，细化的还有 `CMAKE_CXX_FLAGS_DEBUG` 和` CMAKE_CXX_FLAGS_RELEASE`
- `add_subdirectory(xxx)`：添加子目录（子项目），要求子目录里必须有单独的 `CMakeLists.txt`，该文件包含了子目录的编译配置信息
- `add_test(xxx ${PROJECT_SOURCE_DIR}/test/build/xxx)`：第一个参数是某个单元测试的名称，第二个参数是该单元测试的可执行文件的路径

---

- `test` 目录的 `CMakeLists.txt`

``` cmake
cmake_minimum_required(VERSION 3.15)

# 项目信息
project(minder_test)

# 定义C++的版本
set(CMAKE_CXX_STANDARD 11)

# 搜索父目录（父项目）的头文件
include_directories(../include)

# 搜索父目录（父项目）的源文件
aux_source_directory(../src MAIN_SOURCES)

# 排除父目录（父项目）的入口源文件
list(FILTER MAIN_SOURCES EXCLUDE REGEX "main.cpp")

# 引入子项目的头文件
include_directories(${PROJECT_SOURCE_DIR}/include)

# 搜索子项目里的源文件
aux_source_directory(${PROJECT_SOURCE_DIR}/src TEST_SOURCES)

# 指定构建输出的目录
set(PROJECT_BINARY_DIR ${PROJECT_SOURCE_DIR}/build)

# 指定可执行文件的名称和单元测试的所有源文件
add_executable(${PROJECT_NAME} ${MAIN_SOURCES} ${TEST_SOURCES})
```

这里的 `test` 作为子项目，主要要生成单元测试的可执行文件。

### 命令行编译项目

- 编译 `test` 子项目

``` sh
# 进入子项目的目录
$ cd minder-test/test

# 创建子项目的构建目录
$ mkdir build

# 进入子项目的构建目录
$ cd build

# 构建子项目
$ cmake ..

# 编译子项目
$ make

# 运行可执行文件
$ ./minder_test
```

- 编译主项目

``` sh
# 进入主项目的目录
$ cd minder-test

# 创建主项目的构建目录
$ mkdir build

# 进入主项目的构建目录
$ cd build

# 构建主项目
$ cmake ..

# 编译主项目
$ make

# 执行项目测试
$ make test

# 运行可执行文件
$ ./minder
```

## 引入 GoogleTest 测试框架

> - [GoogleTest 官方文档](https://google.github.io/googletest/)
> - [GoogleTest GitHub 仓库](https://github.com/google/googletest)
> - [GoogleTest 官方下载页面](https://github.com/google/googletest/releases)

### GoogleTest 的安装

#### GoogleTest 编译安装

!!! warning 注意事项
    1. GoogleTest 最新版（`1.11.0`）要求使用 GCC `5.0+` 和 Clang `5.0+`，若 GCC 的版本比较低，建议安装 GoogleTest `1.10.0` 或者 `1.8.1` 版本
    2. 实测 GCC `4.8.5` 可以正常使用 GoogleTest 的 `1.10.0` 版本，不兼容 `1.11.0` 版本

``` sh
# 下载文件
$ wget https://github.com/google/googletest/archive/refs/tags/release-1.11.0.tar.gz

# 解压文件
$ tar -xvf release-1.11.0.tar.gz

# 进入解压目录
$ cd googletest-release-1.11.0

# 创建构建目录
$ mkdir build

# 进入构建目录
$ cd build

# 生成makefile，如果需要构建得到动态链接库，则必须添加参数 "-DBUILD_SHARED_LIBS=ON"，否则默认只会得到静态库（.a）
$ cmake -DBUILD_SHARED_LIBS=ON -Dgtest_build_samples=ON ..

# 编译
$ make -j4

# 安装
$ make install
```

值得一提的是，安装命令执行完成后，会自动将 `libgmock_main.so` 、`libgmock.so`、`libgtest_main.so`、`libgtest.so` 库文件拷贝到 `/usr/local/lib64/` 目录下。GoogleTest 的头文件则会安装在 `/usr/local/include/gmock` 和 `/usr/local/include/gtest/` 目录。

#### GoogleTest 验证安装

- 创建 C++ 源文件 `test.cpp`

``` cpp
#include <stdio.h>
#include <stdlib.h>
#include <gtest/gtest.h>

TEST( COutputPopLimitStrategyTest, PositiveNos )
{
	EXPECT_EQ(true, true);
}

int main( int argc, char *argv[] )
{
	::testing::InitGoogleTest( &argc, argv );

	return(RUN_ALL_TESTS() );
}
```

- 使用 G++ 命令编译 C++ 源文件

``` sh
# 编译源文件
$ g++ -std=c++11 test.cpp -lpthread /usr/local/lib64/libgtest.so -o test

# 运行可执行文件，若输出以下的日志信息，则说明GoogleTest安装成功
$ ./test

[==========] Running 1 test from 1 test suite.
[----------] Global test environment set-up.
[----------] 1 test from COutputPopLimitStrategyTest
[ RUN      ] COutputPopLimitStrategyTest.PositiveNos
[       OK ] COutputPopLimitStrategyTest.PositiveNos (0 ms)
[----------] 1 test from COutputPopLimitStrategyTest (1 ms total)

[----------] Global test environment tear-down
[==========] 1 test from 1 test suite ran. (1 ms total)
[  PASSED  ] 1 test.
```

G++ 编译参数说明：

- `-std=c++11`：指定 C++ 的版本
- `/usr/local/lib64/libgtest.so`：链接 GoogleTest 的动态链接库
- `-lpthread`：由于 GoogleTest 的内部使用了多线程，因此需要链接 `pthread` 库

### Google Test 的使用案例

#### 创建项目工程

> 项目的目录结构如下：

```
minder-gtest
├── CMakeLists.txt
├── include
│   └── datetime.h
├── src
│   ├── datetime.cpp
│   └── main.cpp
└── test
    ├── CMakeLists.txt
    ├── include
    │   └── strUtil.h
    └── src
        └── main.cpp
```

#### 编写项目代码

> 这里的 C++ 代码，除了 `main.cpp` 的代码不一样之外，其他代码与上面的案例代码完全一致，不再累述。

``` cpp
#include <iostream>
#include "strUtil.h"
#include "datetime.h"
#include <gtest/gtest.h>

using namespace std;

// 去除字符串两边的空格
TEST(TestCase, test1) {
    string str = " Hello World ! ";
    trim(str);
    ASSERT_EQ("Hello World !", str);
}

// 根据给定的日期，计算它是星期几
TEST(TestCase, test2) {
    ASSERT_EQ(true, DateUtil::isWeekendDays("2022-01-09"));
}

int main(int argc, char **argv) {
    testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
```

#### CMake 配置文件

- 主目录的 `CMakeLists.txt`，这里的配置内容与上面的案例没有任何区别

``` cmake
cmake_minimum_required(VERSION 3.15)

# 项目信息
project(minder)

# 定义C++的版本
set(CMAKE_CXX_STANDARD 11)

# 输出调试信息
set(CMAKE_CXX_FLAGS "-g")

# 开启所有警告
set(CMAKE_CXX_FLAGS "-Wall")

# 指定构建输出的目录
set(PROJECT_BINARY_DIR ${PROJECT_SOURCE_DIR}/build)

# 引入主项目的头文件
include_directories(${PROJECT_SOURCE_DIR}/include)

# 搜索主项目的源文件
aux_source_directory(${PROJECT_SOURCE_DIR}/src MAIN_SOURCES)

# 指定可执行文件的名称和主项目的所有源文件
add_executable(${PROJECT_NAME} ${MAIN_SOURCES})

# 启用单元测试
enable_testing()

# 添加子目录（子项目）
add_subdirectory(test)

# 添加单元测试的可执行文件
add_test(minder_test ${PROJECT_SOURCE_DIR}/test/build/minder_test)
```

- `test` 目录的 `CMakeLists.txt`，这里的配置内容新增了 GoogleTest 库

``` cmake
cmake_minimum_required(VERSION 3.15)

# 项目信息
project(minder_test)

# 定义C++的版本
set(CMAKE_CXX_STANDARD 11)

# 查找 GoogleTest 库
find_package(GTest REQUIRED)

# 显示 GoogleTest 库的路径
MESSAGE(STATUS "GTEST_INCLUDE_DIRS : " ${GTEST_INCLUDE_DIRS})
MESSAGE(STATUS "GTEST_BOTH_LIBRARIES : " ${GTEST_BOTH_LIBRARIES})

# 搜索父目录（父项目）的头文件
include_directories(../include)

# 搜索父目录（父项目）的源文件
aux_source_directory(../src MAIN_SOURCES)

# 排除父目录（父项目）的入口源文件
list(FILTER MAIN_SOURCES EXCLUDE REGEX "main.cpp")

# 引入子项目的头文件
include_directories(${PROJECT_SOURCE_DIR}/include)

# 搜索子项目里的源文件
aux_source_directory(${PROJECT_SOURCE_DIR}/src TEST_SOURCES)

# 引入 GoogleTest 的头文件
include_directories(${GTEST_INCLUDE_DIRS})

# 指定构建输出的目录
set(PROJECT_BINARY_DIR ${PROJECT_SOURCE_DIR}/build)

# 指定可执行文件的名称和单元测试的所有源文件
add_executable(${PROJECT_NAME} ${MAIN_SOURCES} ${TEST_SOURCES})

# 链接 GoogleTest 与 pthread 库（请特别注意声明的顺序）
target_link_libraries(${PROJECT_NAME} ${GTEST_BOTH_LIBRARIES} pthread)
```

#### 命令行编译项目

- 编译 `test` 子项目

``` sh
# 进入子项目的目录
$ cd minder-gtest/test

# 创建子项目的构建目录
$ mkdir build

# 进入子项目的构建目录
$ cd build

# 构建子项目
$ cmake ..

# 编译子项目
$ make

# 运行可执行文件
$ ./minder_test
```

运行可执行文件后，输出的日志信息如下：

```
[==========] Running 2 tests from 1 test suite.
[----------] Global test environment set-up.
[----------] 2 tests from TestCase
[ RUN      ] TestCase.test1
[       OK ] TestCase.test1 (0 ms)
[ RUN      ] TestCase.test2
[       OK ] TestCase.test2 (0 ms)
[----------] 2 tests from TestCase (0 ms total)

[----------] Global test environment tear-down
[==========] 2 tests from 1 test suite ran. (2 ms total)
[  PASSED  ] 2 tests.
```

- 编译主项目

``` sh
# 进入主项目的目录
$ cd minder-gtest

# 创建主项目的构建目录
$ mkdir build

# 进入主项目的构建目录
$ cd build

# 构建主项目
$ cmake ..

# 编译主项目
$ make

# 执行项目测试
$ make test

# 运行可执行文件
$ ./minder
```

### GoogleTest 使用扩展说明

在上面的案例中，GoogleTest 是使用源码编译的方式安装到 Linux 系统上的，这在迁移操作系统的时候，需要重复执行同样的安装步骤。此时为了方便日后迁移操作系统，可以将 GoogleTest 的头文件、动态链接都复制一份到项目中，这样就可以不依赖外部的系统环境了。

> 项目的目录结构如下：

```
minder-gtest-plus
├── CMakeLists.txt
├── include
│   └── datetime.h
├── src
│   ├── datetime.cpp
│   └── main.cpp
├── test
│   ├── CMakeLists.txt
│   ├── include
│   │   └── strUtil.h
│   └── src
│       └── main.cpp
└── thirdparty
    └── googletest
        ├── gmock
        │   ├── include
        │   │   └── gmock
        │   │       ├── gmock-actions.h
        │   │       ├── gmock-cardinalities.h
        │   │       ├── gmock-function-mocker.h
        │   │       ├── gmock-generated-actions.h
        │   │       ├── gmock-generated-actions.h.pump
        │   │       ├── gmock-generated-function-mockers.h
        │   │       ├── gmock-generated-function-mockers.h.pump
        │   │       ├── gmock-generated-matchers.h
        │   │       ├── gmock-generated-matchers.h.pump
        │   │       ├── gmock.h
        │   │       ├── gmock-matchers.h
        │   │       ├── gmock-more-actions.h
        │   │       ├── gmock-more-matchers.h
        │   │       ├── gmock-nice-strict.h
        │   │       ├── gmock-spec-builders.h
        │   │       └── internal
        │   │           ├── custom
        │   │           │   ├── gmock-generated-actions.h
        │   │           │   ├── gmock-generated-actions.h.pump
        │   │           │   ├── gmock-matchers.h
        │   │           │   ├── gmock-port.h
        │   │           │   └── README.md
        │   │           ├── gmock-internal-utils.h
        │   │           ├── gmock-port.h
        │   │           └── gmock-pp.h
        │   └── lib
        │       ├── libgmock_main.so
        │       └── libgmock.so
        └── gtest
            ├── include
            │   └── gtest
            │       ├── gtest-death-test.h
            │       ├── gtest.h
            │       ├── gtest-matchers.h
            │       ├── gtest-message.h
            │       ├── gtest-param-test.h
            │       ├── gtest_pred_impl.h
            │       ├── gtest-printers.h
            │       ├── gtest_prod.h
            │       ├── gtest-spi.h
            │       ├── gtest-test-part.h
            │       ├── gtest-typed-test.h
            │       └── internal
            │           ├── custom
            │           │   ├── gtest.h
            │           │   ├── gtest-port.h
            │           │   ├── gtest-printers.h
            │           │   └── README.md
            │           ├── gtest-death-test-internal.h
            │           ├── gtest-filepath.h
            │           ├── gtest-internal.h
            │           ├── gtest-param-util.h
            │           ├── gtest-port-arch.h
            │           ├── gtest-port.h
            │           ├── gtest-string.h
            │           ├── gtest-type-util.h
            │           └── gtest-type-util.h.pump
            └── lib
                ├── libgtest_main.so
                └── libgtest.so
```

- `test` 目录的 `CMakeLists.txt`，这里的配置内容使用了项目里的 GoogleTest 库

``` cmake
cmake_minimum_required(VERSION 3.15)

# 定义 GoogleTest 库的目录路径
set(PATH_TO_GOOGLE_TEST ../thirdparty/googletest/gtest)
set(PATH_TO_GOOGLE_MOCK ../thirdparty/googletest/gmock)

# 项目信息
project(minder_test)

# 定义C++的版本
set(CMAKE_CXX_STANDARD 11)

# 搜索父目录（父项目）的头文件
include_directories(../include)

# 搜索父目录（父项目）的源文件
aux_source_directory(../src MAIN_SOURCES)

# 排除父目录（父项目）的入口源文件
list(FILTER MAIN_SOURCES EXCLUDE REGEX "main.cpp")

# 引入子项目的头文件
include_directories(${PROJECT_SOURCE_DIR}/include)

# 搜索子项目里的源文件
aux_source_directory(${PROJECT_SOURCE_DIR}/src TEST_SOURCES)

# 引入 GoogleTest 库的头文件
include_directories(${PATH_TO_GOOGLE_TEST}/include ${PATH_TO_GOOGLE_MOCK}/include)

# 指定 GoogleTest 动态链接库所在的目录
link_directories(${PATH_TO_GOOGLE_TEST}/lib ${PATH_TO_GOOGLE_MOCK}/lib)

# 指定构建输出的目录
set(PROJECT_BINARY_DIR ${PROJECT_SOURCE_DIR}/build)

# 指定可执行文件的名称和单元测试的所有源文件
add_executable(${PROJECT_NAME} ${MAIN_SOURCES} ${TEST_SOURCES})

# 链接 GoogleTest 与 pthread 库（请特别注意声明的顺序）
target_link_libraries(${PROJECT_NAME} gtest_main.so gtest.so gmock_main.so gmock.so pthread)
```

- `main.cpp` 的 C++ 代码，与上面的案例代码完全一致

``` cpp
#include <iostream>
#include "strUtil.h"
#include "datetime.h"
#include <gtest/gtest.h>

using namespace std;

// 去除字符串两边的空格
TEST(TestCase, test1) {
    string str = " Hello World ! ";
    trim(str);
    ASSERT_EQ("Hello World !", str);
}

// 根据给定的日期，计算它是星期几
TEST(TestCase, test2) {
    ASSERT_EQ(true, DateUtil::isWeekendDays("2022-01-09"));
}

int main(int argc, char **argv) {
    testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
```

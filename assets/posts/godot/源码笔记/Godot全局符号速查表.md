
Godot 全局符号速查表
====

本文列出Godot引擎C++代码中常见的全局符号及简要说明，通过阅读Godot 3.0源代码总结。

<!-- more -->

### 宏定义

|           宏名           |    作用     | 说明                                       |
| :--------------------: | :-------: | :--------------------------------------- |
|    `_FORCE_INLINE_`    |  定义内联函数   | 根据各个编译器和Release/Debug编译选项定义              |
|      `SAFE_CAST`       | “安全”的类型转换 | 如果没有定义`NO_SAFE_CAST`则使用`dynamic_cast`否则使用`static_cast` |
| `GLOBAL_LOCK_FUNCTION` |    全局锁    | 在代码栈内创建全局锁                               |



### 宏函数

|                                       函数 |      作用      |  适用范围  | 说明                                       |
| ---------------------------------------: | :----------: | :----: | :--------------------------------------- |
|                         OFFSET_OF(st, m) |   获取成员的偏移量   |        | 获取`st`指针中`m`成员的偏移量                       |
|                              _MKSTR(m_x) | 生成C-style字符串 |        | 生成C-style字符串，可方便地将宏定义展开                  |
|           ERR_FAIL_INDEX(m_index,m_size) |     检查下标     | 无返回值函数 | `m_index < 0`或`m_index >= m_size `为真时输出错误信息并**终止**当前函数 |
| ERR_FAIL_INDEX_V(m_index,m_size,m_retval) |     检查下标     | 带返回值函数 | `m_index < 0`或`m_index >= m_size `为真时输出错误信息并返回`m_retval` |
|                   ERR_FAIL_NULL(m_param) |     检查参数     | 无返回值函数 | `!m_param`为真时输出错误信息并**终止**当前函数           |
|        ERR_FAIL_NULL_V(m_param,m_retval) |     检查参数     | 带返回值函数 | `!m_param`为真时输出错误信息并返回`m_retval`         |
|                    ERR_FAIL_COND(m_cond) |     检查条件     | 无返回值函数 | `m_cond`为真时输出错误信息并**终止**当前函数             |
|        ERR_FAIL_NULL_V(m_param,m_retval) |     检查条件     | 带返回值函数 | `m_cond`为真时输出错误信息并返回`m_retval`           |
|                     ERR_CONTINUE(m_cond) |     检查条件     |  循环体内  | `m_cond`为真时输出错误信息并执行`continue`           |
|                        ERR_BREAK(m_cond) |     检查条件     |  循环体内  | `m_cond`为真时输出错误信息并执行`break`              |
|                               ERR_FAIL() |     错误返回     | 无返回值函数 | 输出错误信息并**终止**当前函数                        |
|                      ERR_FAIL_V(m_value) |     错误返回     | 带返回值函数 | 输出错误信息并返回`m_retval`                      |
|                      ERR_PRINT(m_string) |     输出错误     |        | 接受C-Style字符串，输出错误信息                      |
|                     ERR_PRINTS(m_string) |     输出错误     |        | 接受String字符串，输出错误信息                       |
|                     WARN_PRINT(m_string) |     输出警告     |        | 接受C-Style字符串，输出警告信息                      |
|                    WARN_PRINTS(m_string) |     输出警告     |        | 接受String字符串，输出警告信息                       |
|                                 ABS(m_v) |     取绝对值     |        | 取绝对值                                     |
|                                 SGN(m_v) |     取符号      |        | 若`m_v`小于0返回-1.0否则返回+1.0                  |
|                            MIN(m_a, m_b) |     取较小值     |        |                                          |
|                            MAX(m_a, m_b) |     取较大值     |        |                                          |
|                 CLAMP(m_a, m_min, m_max) |    范围合法化     |        |                                          |
|                           SWAP(m_x, m_y) |     交换变量     |        |                                          |
|                           HEX2CHR(m_hex) |   16进制数转字符   |        | 16进制数转字符                                 |



### 函数

|                                       函数 | 说明             |
| ---------------------------------------: | :------------- |
| `unsigned int nearest_power_of_2(unsigned int x)` | 求最接近的更大的2的指数次幂 |
| `template<class T> T nearest_power_of_2_templated(T x)` | 求最接近的更大的2的指数次幂 |
| `unsigned int nearest_shift(unsigned int p_number)` | 求最接近的位移次数      |
| `int get_shift_from_power_of_2(unsigned int p_pixel)` | 从2的指数次幂中获取位移次数 |
|           `uint16_t BSWAP16(uint16_t x)` | 交换16位整数位顺序     |
|           `uint32_t BSWAP32(uint32_t x)` | 交换32位整数位顺序     |
|           `uint64_t BSWAP64(uint64_t x)` | 交换64位整数位顺序     |



### 类型

| 类型                                    |      作用      | 说明                     |
| ------------------------------------- | :----------: | ---------------------- |
| `template<class T> struct Comparator` | 包装无`<`操作符的类型 | 用于比较、存放于有序容器中使用        |
| _GlobalLock                           |     全局锁      | 通过该类型变量的栈生命周期来添加/删除全局锁 |
| Error                                 |    错误枚举类型    | Godot错误枚举类型            |
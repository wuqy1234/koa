@echo off
setlocal enabledelayedexpansion
@REM 思路: 在所有的序号中，如果有相同的序号，那么就获取相同序号的右侧序号，把这些序号加入一个文件中(设为a文件)，
@REM 然后再用a文件和当前的文件进行对比，如果出现了a文件中的序号，那么就不要输出一个新文件中(设为c文件)，否则都输出。
@REM 以上是第一次去重，接下来还有左侧的序号未去重，


@REM 先要去右边的重复的序号，然后才去除左边的重复的序号。


@REM 左边的序号去重方法。
set lastNumber=0
for /f "usebackq tokens=1,2 delims=---" %%a in ("C:\Users\86166\Desktop\test4.md") do (
    echo %%a ------ !lastNumber!
    if not %%a == !lastNumber! (
    @REM   echo %%a ------ !lastNumber!
      set  lastNumber=%%a
      echo %%a ++++++ !lastNumber!
    )
)


endlocal


@REM 把合并好了的文件把每一行和下面的所有行做对比，如果有相同内容的行，就获取序号。

@REM 上面的查重，上一行只会和下面所有行对比，会高效的把相同的内容找出来。
@REM 如果某一行中的相同的内容重复了4次，那么会收录6次不同的序号，因此序号去重。这里去的是%%c的序号。

@REM 二次去重，所有相同内容行，获取唯一一个。
@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
 set i=0
for /f "usebackq  delims=*" %%a in ("C:\Users\86166\Desktop\koa-1\test2.md") do (
   set /a i+=1
   set str=%%a
   set "subStr=!str:~1!"
   for /f "usebackq  delims=*" %%b in ("C:\Users\86166\Desktop\koa-1\test2.md") do (
   set line=%%b
   set head=!line:~0,1!
   set body=!line:~1!
        if !head! gtr !i! (
            echo !body!-----!subStr!
            if !body! == !subStr! (
                echo 相等
            ) else (
                echo 不相等
            )
        )
    )
)





@REM    echo !i! %%a >>test2.md
@REM 实现思路，把所有的md文件都存到一个文件中，然后给每一段打上序号和冒号，再使用两层for循环在把每一行进行对比，
@REM 为了避免重复对比，在比较时，使用读取到的序号来比较，当序号大于已经遍历到的序号，那么就进行对比，否则只比较序号，降低比较的难度。

endlocal
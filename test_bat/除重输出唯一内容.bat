@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul



for /f "usebackq tokens=1,2 delims=+_+" %%a in ("C:\Users\86166\Desktop\初始合并.md") do (
   for /f "usebackq  delims=*" %%c in ("C:\Users\86166\Desktop\已处理的数据.md") do (
        if %%c == %%a (
           echo %%b>> C:\Users\86166\Desktop\除重输出唯一重复的内容.md
           echo +++++++++++++++++++++++>> C:\Users\86166\Desktop\除重输出唯一重复的内容.md
        )
    )
)








   

endlocal



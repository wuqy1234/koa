@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

:: 这里会自动获取所有的文件，不需要自己递归的去分析是文件夹还是文件。
set i=0
for /r "C:\Users\86166\Desktop\koa-1\学习笔记\总体设计" %%f in (*) do (
    echo File: %%f
     for /f "usebackq  delims=*" %%a in ("%%f") do (
        set str=%%a
        set "suffix=!str:~20,1!"
        if not "!suffix!" == "" (
            set /a i+=1
            echo !i!+_+ %%a >>test3.md
        )
     )
)


endlocal
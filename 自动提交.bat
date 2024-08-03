@echo off
setlocal enabledelayedexpansion
:: 避免输入中文出现乱码
chcp 65001 >nul

:: 设置你的仓库目录
::以下是set REPO_DIR="C:\Users\86166\Desktop\koa-1"的相对路径
::自动获取文件的路径
set REPO_DIR=%~dp0
::去除最后一个\
if "!REPO_DIR:~-1!" == "\" (
    set "REPO_DIR=!REPO_DIR:~0,-1!"
)
:: 切换到仓库目录
cd /d "%REPO_DIR%"

:: 检查是否有更改
for /f "delims=" %%i in ('git status --porcelain') do (
    if not "%%i" == "" (
        :: 如果有更改，则添加所有文件
        git add .

        :: 获取当前日期作为提交信息的一部分
       for /f "tokens=2,3,4 delims=/. " %%a in ("%date%") do (
        set DATE=%%a/%%b/%%c
        )
        @REM set TIME=%time:~0,8%
        @REM set COMMIT_MSG=自动提交: %DATE% at %TIME%
        @REM 下面的变量%T%不会赋值到变量COMMIT_MSG中，结果未空。除非使用变量!T!。
        @REM set T=%time:~0,5%
        @REM set COMMIT_MSG=自动提交: %DATE% at %T%

        set TIME=%time:~0,5%
        ::这里使用了动态的变量!T!，否则set TIME=%time:~0,8% 的修改是不起作用的。
        ::同时bat文件中的字母是不分大小写的。下面的%DATE%其实是未修改前的变量，
        ::因此上面的for循环中的set DATE=%%a/%%b/%%c的修改的没有起作用。
        set COMMIT_MSG=自动提交: %DATE% at !TIME!

        :: 提交更改
        git commit -m "!COMMIT_MSG!"
        echo 提交完成，等待10分钟后推送更改。
        :: 等待10分钟
        timeout /t 600 >nul
        :: 推送更改到远程仓库
        git push 
        
    )
)
 
 
:: 结束脚本
endlocal

exit
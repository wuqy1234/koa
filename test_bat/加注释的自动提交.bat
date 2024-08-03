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

        :: 获取当前日期作为提交信息的一部分,其实这行for循环是多余的，因为下面的date变量没有被正确引用
        :: 下面的date使用了%date%的原始数据，没有使用for循环中更改的数据，想要使用for循环中更改的数据，需要使用!date!。
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
        
        :: 推送更改到远程仓库
        git push 
        
    )
)
 for /f "delims=" %%i in ('git status ') do (
   echo -------------
   set aa=%%i
   set bb=!aa:~0,34!
   echo !bb!
   ::变量被双引号包裹了，那么要比较的值也要被双引号包裹，这样才能正确比较。
    if "!bb!"=="Your branch is ahead of 'koa/main'" (
        echo 自动提交失败，等待5分钟后自动重试。
  
        ping -n 30 localhost >nul

        echo 开始再次推送更改。
        git push
    )
)
schtasks /create /tn "auto_commit_github" /tr "%REPO_DIR%\自动提交.bat" /sc daily /st 21:00 /f


for /f "tokens=5 delims=: " %%a in ('netsh wlan show interfaces ^| findstr "SSID"') do (
    set "SSID=%%a"
)
if defined SSID (
    echo 当前连接的 WiFi 名称为: %SSID%
) else (
     echo 当前未连接任何 WiFi

     (
    echo @echo off
    echo setlocal
    echo chcp 65001 ^>nul
    echo call %~dp0自动提交.bat
    echo schtasks /delete /tn "tomorrow_auto_commit_github" 
    echo endlocal
    echo del %~dp0tomorrow_auto_commit_github.bat
) > tomorrow_auto_commit_github.bat
::不会出现死循环，因为时间是固定的，当tomorrow_auto_commit_github.bat执行后，
::再次调用"自动提交.bat"后，这个计划任务会被再次创建，但是时间是过去的时间，因此不会出现死循环。
    schtasks /create /tn "tomorrow_auto_commit_github" /tr "%REPO_DIR%\autoCommit.bat" /sc once /st 9:30 /f
)

endlocal
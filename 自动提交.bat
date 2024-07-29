@echo off
setlocal enabledelayedexpansion
:: 避免输入中文出现乱码
chcp 65001 >nul

:: 设置你的仓库目录
set REPO_DIR=%~dp0..\koa-1

:: 切换到仓库目录
cd /d "%REPO_DIR%"

:: 检查是否有更改
for /f "delims=" %%i in ('git status --porcelain') do (
    if not "%%i" == "" (
        :: 如果有更改，则添加所有文件
        git add .

        :: 获取当前日期作为提交信息的一部分
        for /f "tokens=2-4 delims=/." %%a in ("%date%") do (
            set DATE=%%c/%%a/%%b
        )
        set TIME=%time:~0,8%
        set COMMIT_MSG=自动提交: %DATE% at %TIME%

        :: 提交更改
        git commit -m "!COMMIT_MSG!"

        :: 推送更改到远程仓库
        git push 
    )
)

:: 结束脚本
endlocal
pause
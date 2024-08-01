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
        for /f "tokens=2-4 delims=/." %%a in ("%date%") do (
            set DATE=%%c/%%a/%%b
        )
        set TIME=%time:~0,8%
        set COMMIT_MSG=自动提交: %DATE% at %TIME%

        :: 提交更改
        git commit -m "!COMMIT_MSG!"

        :: 推送更改到远程仓库
        git push origin main
    )
)

:: 推送更改到远程仓库
(
  git push origin main 2>NUL
) >push_output.txt

:: 检查推送结果
findstr /C:"Everything up-to-date" push_output.txt >NUL
if %ERRORLEVEL% EQU 0 (
  echo 推送成功
) else (
  findstr /C:"To https://github.com/wuqy1234/koatest.git" push_output.txt >NUL
  if %ERRORLEVEL% EQU 0 (
    echo 推送成功 (已有最新版本)
  ) else (
    type push_output.txt
    echo 推送失败，请检查错误信息
  )
)

del push_output.txt
 
:: 结束脚本
endlocal

exit
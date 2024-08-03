@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

set REPO_DIR=%~dp0

if "!REPO_DIR:~-1!" == "\" (
    set "REPO_DIR=!REPO_DIR:~0,-1!"
)

cd /d "%REPO_DIR%"


for /f "delims=" %%i in ('git status --porcelain') do (
    if not "%%i" == "" (

        git add .

        set TIME=%time:~0,5%
   
        set COMMIT_MSG=自动提交: %DATE% at !TIME!

        git commit -m "!COMMIT_MSG!"

        git push 
        
    )
)
 for /f "delims=" %%i in ('git status ') do (
   set aa=%%i
   set bb=!aa:~0,34!

    if "!bb!"=="Your branch is ahead of 'koa/main'" (
        echo 自动提交失败，等待5分钟后自动重试。
  
        ping -n 30 localhost >nul

        echo 开始再次推送更改。
        git push
    )
)
 
endlocal
exit
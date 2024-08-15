 @echo off
 setlocal enabledelayedexpansion
 chcp 65001 >nul
 rem 总共有三种方式注释 rem @REM ::



 set REPO_DIR=%~dp0

 if "!REPO_DIR:~-1!" == "\" (
    set "REPO_DIR=!REPO_DIR:~0,-1!"
)


:: 切换到仓库目录
cd /d "%REPO_DIR%"

for /f "delims=" %%i in ('git status ') do (
   echo -------------
   set aa=%%i
   set bb=!aa:~0,34!
   echo !bb!
   @REM 确保在 if 语句中使用双引号来包裹字符串 "Your branch is ahead of 'koa/main'"，以确保字符串完全匹配。
    if "!bb!"=="Your branch is ahead of 'koa/main'" (
        echo ok
        git push
    ) else (
        echo no
    )
)

 endlocal

 
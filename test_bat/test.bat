 @echo off
 setlocal enabledelayedexpansion
 chcp 65001 >nul
 rem 测试

@REM  for /f %%i in (README.md) do (
@REM     if %%i==这是一个学习koa2、sequelize和MySQL的练习项目。 (
@REM         echo ok>>test.txt
@REM  ) else (
@REM     echo no>>test.txt
@REM     )
@REM  echo %%i>>test.txt
@REM  )

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
 for /f "tokens=2,3,4 delims=/. " %%a in ("%date%") do (
   set DATE=%%a/%%b/%%c
)
   set T=%time:~0,5%
   set COMMIT_MSG=自动提交: %DATE% at !T!
 echo %T%
 endlocal

 
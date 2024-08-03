 @echo off
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

for /f "delims=" %%i in ('git status --porcelain') do (
   echo -------------
   echo %%i
)
 for /f "tokens=2,3,4 delims=/. " %%a in ("%date%") do (
    set DATE=%%a/%%b/%%c
)
   set TIME=%time:~0,8%
   set COMMIT_MSG=自动提交: %DATE% at %TIME%
echo %COMMIT_MSG%
endlocal
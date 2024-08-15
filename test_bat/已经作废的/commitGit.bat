@echo off
echo %1
setlocal enabledelayedexpansion
chcp 65001 >nul
@REM 直接在cmd中输入D:就能跳转到D盘
set path=%1
set bb=!path:~1,-1!
cd /d !bb!
echo 当前盘符是: %CD%

git status 
for /f "delims=" %%b in ('dir /a:h /b /s ') do (
    set folderName=%%b
    set gitname=!folderName:~-4,4!
  if "!gitname!"==".git" (
       echo 是的
       
    @REM for /f "delims=" %%i in ('git status --porcelain') do (
    @REM     if not "%%i" == "" (
    @REM     git add .
    @REM     for /f "tokens=2-4 delims=/." %%a in ("%date%") do (
    @REM         set DATE=%%c/%%a/%%b
    @REM     )
    @REM     set TIME=%time:~0,8%
    @REM     set COMMIT_MSG=自动提交: %DATE% at %TIME%
    @REM     git commit -m "!COMMIT_MSG!"
    @REM     )
    @REM )

    ) else (
        "node_modules/" > .gitignore
        git init
        git add .
        for /f "tokens=2-4 delims=/." %%a in ("%date%") do (
            set DATE=%%c/%%a/%%b
        )
        set TIME=%time:~0,8%
        set COMMIT_MSG=自动提交: %DATE% at %TIME%
        git commit -m "!COMMIT_MSG!"
    )

)

@REM for /f "delims=" %%a in ('dir /ah /ad /b ^| find ".git"') do set aa=%%a
@REM if defined aa (
@REM     echo %aa%
@REM     for /f "delims=" %%i in ('git status --porcelain') do (
@REM     if not "%%i" == "" (
@REM         git add .
@REM         for /f "tokens=2-4 delims=/." %%a in ("%date%") do (
@REM             set DATE=%%c/%%a/%%b
@REM         )
@REM         set TIME=%time:~0,8%
@REM         set COMMIT_MSG=自动提交: %DATE% at %TIME%
@REM         git commit -m "!COMMIT_MSG!"
@REM     )
@REM   )
@REM ) else (
@REM     "node_modules/" > .gitignore
@REM     git init
@REM     git add .
@REM     for /f "tokens=2-4 delims=/." %%a in ("%date%") do (
@REM         set DATE=%%c/%%a/%%b
@REM     )
@REM     set TIME=%time:~0,8%
@REM     set COMMIT_MSG=自动提交: %DATE% at %TIME%
@REM     git commit -m "!COMMIT_MSG!"
@REM )
endlocal


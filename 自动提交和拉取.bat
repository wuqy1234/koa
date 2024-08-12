@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
set REPO_DIR=%~dp0
cd /d "%REPO_DIR%"

for /f "delims=" %%i in ('git status --porcelain') do (
    if not "%%i" == "" (
        git add .
        set TIME=%time:~0,5%
        set COMMIT_MSG=自动提交: %DATE% at !TIME!
        git commit -m "!COMMIT_MSG!"
        github "%CD%"
    )
)
 for /f "delims=" %%i in ('git status') do (
    set aa=%%i
    set bb=!aa:~0,23!
    if "!bb!"=="Your branch is ahead of" (
       github "%CD%"
    )
)
     
endlocal
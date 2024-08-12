@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
set REPO_DIR=%~dp0
cd /d "%REPO_DIR%"

@REM for /f %%a in ("%CD%") do (set task_name=%%~nxa_auto_push)
@REM schtasks /create /tn "!task_name!" /tr "%~f0" /sc daily /st 21:30 /f

@REM for /f "delims=" %%i in ('git status --porcelain') do (
@REM     if not "%%i" == "" (
@REM         git add .
@REM         set TIME=%time:~0,5%
@REM         set COMMIT_MSG=自动提交: %DATE% at !TIME!
@REM         git commit -m "!COMMIT_MSG!"
@REM         @REM git push 
@REM         @REM schtasks /delete /tn "!task_name!_tomorrow" /f
@REM         github

@REM     )
@REM )

@REM  for /f "delims=" %%i in ('git status') do (
@REM     set aa=%%i
@REM     set bb=!aa:~0,23!
@REM     if "!bb!"=="Your branch is ahead of" (
@REM         for /f "tokens=5 delims=: " %%a in ('netsh wlan show interfaces ^| findstr "SSID"') do (
@REM             set "SSID=%%a"
@REM         )
@REM         if defined SSID (
@REM             echo 当前连接的 WiFi 名称为: %SSID%
@REM             echo 自动提交失败,每5秒钟自动重试一次。
@REM             ping -n 5 localhost >nul
@REM             echo 开始再次推送更改,直到成功。
@REM             call "%~f0"
@REM         ) else (
@REM                 echo 当前未连接任何 WiFi
@REM                 echo 已创建计划任务,等待明天9:30自动重试。
@REM                 schtasks /create /tn "!task_name!_tomorrow" /tr "%~f0" /sc daily /st 09:30 /f
@REM             )
@REM     ) 
@REM     if "!bb!"=="Your branch is up to da" (
@REM         echo 当前没有修改需要提交，正在从远端拉取最新更改。
@REM         git pull
@REM     )
@REM )


for /f "delims=" %%i in ('git status --porcelain') do (
    if not "%%i" == "" (
        git add .
        set TIME=%time:~0,5%
        set COMMIT_MSG=自动提交: %DATE% at !TIME!
        git commit -m "!COMMIT_MSG!"
        github "C:\Users\86166\Desktop\koa-1"
    )
)
 for /f "delims=" %%i in ('git status') do (
    set aa=%%i
    set bb=!aa:~0,23!
    if "!bb!"=="Your branch is ahead of" (
       github "C:\Users\86166\Desktop\koa-1"
    )
)
     
endlocal
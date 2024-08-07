@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
set REPO_DIR=%~dp0
cd /d "%REPO_DIR%"

@REM for /f %%a in ("%CD%") do (set task_name=%%~nxa_auto_push)
@REM schtasks /create /tn "!task_name!" /tr "%~f0" /sc daily /st 21:30 /f

for /f "delims=" %%i in ('git status --porcelain') do (
    if not "%%i" == "" (
        git add .
        set TIME=%time:~0,5%
        set COMMIT_MSG=自动提交: %DATE% at !TIME!
        git commit -m "!COMMIT_MSG!"
        git push 
        schtasks /delete /tn "!task_name!_tomorrow" /f
    )
)

 for /f "delims=" %%i in ('git status') do (
    set aa=%%i
    set bb=!aa:~0,23!
    if "!bb!"=="Your branch is ahead of" (
        for /f "tokens=5 delims=: " %%a in ('netsh wlan show interfaces ^| findstr "SSID"') do (
            set "SSID=%%a"
        )
        if defined SSID (
            echo 当前连接的 WiFi 名称为: %SSID%
            echo 自动提交失败,每5秒钟自动重试一次。
            ping -n 5 localhost >nul
            echo 开始再次推送更改,直到成功。
            call "%~f0"
        ) else (
                echo 当前未连接任何 WiFi
                echo 已创建计划任务,等待明天9:30自动重试。
                schtasks /create /tn "!task_name!_tomorrow" /tr "%~f0" /sc daily /st 09:30 /f
            )
    ) 
    if "!bb!"=="Your branch is up to da" (
        echo 当前没有修改需要提交，正在从远端拉取最新更改。
        git pull
    )
)

endlocal
pause
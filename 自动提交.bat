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
    set bb=!aa:~0,23!
    if "!bb!"=="Your branch is ahead of" (
        echo 自动提交失败，等待5分钟后自动重试。
  
        ping -n 30 localhost >nul

        echo 开始再次推送更改。
        git push
        
        for /f "delims=" %%i in ('git status ') do (
            set aa=%%i
            set bb=!aa:~0,23!
            if "!bb!"=="Your branch is ahead of" (
                for /f "tokens=5 delims=: " %%a in ('netsh wlan show interfaces ^| findstr "SSID"') do (
                    set "SSID=%%a"
                )
                if defined SSID (
                    echo 当前连接的 WiFi 名称为: %SSID%
                ) else (
                     echo 当前未连接任何 WiFi
                      (
                        echo @echo off
                        echo setlocal
                        echo chcp 65001 ^>nul
                        echo call %~dp0自动提交.bat
                        echo schtasks /delete /tn "tomorrow_auto_commit_github" 
                        echo endlocal
                        echo del %~dp0tomorrow_auto_commit_github.bat
                      ) > tomorrow_auto_commit_github.bat
                      schtasks /create /tn "tomorrow_auto_commit_github" /tr "%REPO_DIR%\autoCommit.bat" /sc once /st 23:21 /f
                    )
            )
        )
    )
)

schtasks /create /tn "auto_commit_github" /tr "%REPO_DIR%\自动提交.bat" /sc daily /st 21:00 /f

endlocal
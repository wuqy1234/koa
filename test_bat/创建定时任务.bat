@echo off
setlocal
 chcp 65001 >nul
set REPO_DIR=%~dp0
set "REPO_DIR=!REPO_DIR:~0,-9!"
echo "%REPO_DIR%自动提交.bat"
set "EXEC_DATE=2024-08-03"
set "EXEC_TIME=18:54"
:: 创建计划任务
schtasks /create /tn "test" /tr "%REPO_DIR%自动提交.bat" /sc once /st %EXEC_TIME% /sd %EXEC_DATE%

:: 查询任务状态
schtasks /query /tn "test"

:: 删除任务
schtasks /delete /tn "test" /f

endlocal
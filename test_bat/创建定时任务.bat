@echo off
setlocal
 chcp 65001 >nul
set REPO_DIR=%~dp0
set "REPO_DIR=!REPO_DIR:~0,-9!"
echo "%REPO_DIR%自动提交.bat"
set "EXEC_DATE=2024-08-04"
set "EXEC_TIME=07:39"
:: 创建计划任务
schtasks /create /tn "test" /tr "%REPO_DIR%自动提交.bat" /sc once /st %EXEC_TIME% /sd %EXEC_DATE% /f

:: 查询任务状态
schtasks /query /tn "test"

:: 删除任务
@REM schtasks /delete /tn "test" /f

endlocal
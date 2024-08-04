@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
set ROOT_DIR=%CD%
echo %ROOT_DIR%

:: 获取当前目录的名称
for /f %%a in ("%ROOT_DIR%") do (
    echo %%~nxa
)

 for /f %%a in ("%ROOT_DIR%") do (set task_name=%%~nxa_auto_commit)
 echo !task_name!
set task_name=!task_name!_tomorrow
echo !task_name!

    


endlocal
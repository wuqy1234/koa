@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul


:: 获取当前目录的名称
for /f %%a in ("%CD%") do (set task_name=%%~nxa_auto_commit)

echo !task_name!
set task_name=!task_name!_tomorrow
echo !task_name!

 schtasks /create /tn "!task_name!" /tr "%~f0" /sc daily /st 22:33 /f


endlocal
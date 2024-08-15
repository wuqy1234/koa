@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul


echo 您确定要关机吗？(是/否)
choice /C YN /M "您确定要关机吗？(是/否)"

if %errorlevel% equ 1 (
    echo 已选择关机...
    @REM shutdown /s /t 0
    exit 
) else (
    echo 已取消关机操作。
    exit 
)

endlocal
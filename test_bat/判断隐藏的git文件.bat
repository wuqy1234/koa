@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

for /f "delims=" %%a in ('dir /ah /ad /b ^| find ".git"') do set aa=%%a
if defined aa (
    echo %aa%
) else (
    git init
)

endlocal
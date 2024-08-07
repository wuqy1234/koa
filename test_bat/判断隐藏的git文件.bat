@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

for /f "delims=" %%a in ('dir /ah /ad /b ^| find ".git"') do set aa=%%a
if defined aa (
    echo %aa%
) else (
    git init
)
@REM 下面的这个方法无法获取到隐藏文件夹
@REM for /d %%a in (*) do (
@REM     echo %%a
@REM )


endlocal
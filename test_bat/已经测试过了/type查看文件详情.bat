@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

type C:\Users\86166\Desktop\koa-1\test.md

@REM 上面的和下面的功能是等效的。

for /f "usebackq tokens=* delims=" %%i in ("C:\Users\86166\Desktop\koa-1\test.md") do (
    echo %%i
)
endlocal
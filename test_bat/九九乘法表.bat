@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

for /l %%i in (1,1,9) do (
    for /l %%j in (1,1,%%i) do (
        set /a result=%%j*%%i
        echo %%j * %%i = !result!
    )
    echo.
)

endlocal
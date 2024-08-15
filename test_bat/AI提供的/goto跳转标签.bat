@echo off
setlocal enabledelayedexpansion

:start
echo 这是开始。
set /p input=请输入一个数字 (0 结束): 
if %input% equ 0 (
    goto :eof
)

if not %input% lss 10 (
    echo 数字大于或等于 10.
    goto :end
)

echo 数字小于 10.
goto :start

:end
echo 这是结束。
endlocal
@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

:: 获取当前日期
for /f "tokens=1,2,3,4 delims=/." %%a in ("%date%") do (
    set "year=%%a"
    set "month=%%b"
    set "day=%%c"
   
)


:: 计算明天的日期
set /a day+=1

:: 判断是否需要进位到下个月
if !day! gtr 31 (
    set /a day=1
    set /a month+=1
)

:: 判断是否需要进位到下一年
if !month! gtr 12 (
    set /a month=1
    set /a year+=1
)




:: 判断是否为闰年
set "leap_year=0"
::%%为取余的运算符
if !year! %% 400 == 0 set "leap_year=1"
if !year! %% 100 == 0 goto :skip_leap_check
if !year! %% 4 == 0 set "leap_year=1"

:skip_leap_check

:: 判断是否需要进位到下个月
if !month! equ 2 (
    if !leap_year! equ 1 (
        if !day! gtr 29 (
            set /a day=1
            set /a month+=1
        )
    ) else (
        if !day! gtr 28 (
            set /a day=1
            set /a month+=1
        )
    )
)

if !month! equ 4 (
    if !day! gtr 30 (
        set /a day=1
        set /a month+=1
    )
)

if !month! equ 6 (
    if !day! gtr 30 (
        set /a day=1
        set /a month+=1
    )
)

if !month! equ 9 (
    if !day! gtr 30 (
        set /a day=1
        set /a month+=1
    )
)

if !month! equ 11 (
    if !day! gtr 30 (
        set /a day=1
        set /a month+=1
    )
)

:: 格式化明天的日期
set tomorrow=!year!-!month!-!day!

:: 输出明天的日期
echo Tomorrow's date is: !tomorrow!

endlocal
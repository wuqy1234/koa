@REM @echo off
@REM setlocal enabledelayedexpansion
@REM chcp 65001 >nul
@REM :: 指定要读取的 Markdown 文件路径
@REM set "markdownFile=C:\Users\86166\Desktop\koa-1\README.md"

@REM :: 使用 type 命令直接显示文件内容
@REM type "%markdownFile%"

@REM :: 或者使用 for /f 循环逐行读取并处理文件内容
@REM echo Reading file line by line:
@REM for /f "tokens=* delims=" %%i in ("%markdownFile%") do (
@REM     echo %%i
@REM )


@REM endlocal


@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

set "markdownFile=C:\Users\86166\Desktop\koa-1\README.md"


for /f "usebackq tokens=* delims=" %%i in ("%markdownFile%") do (
    set "line=%%i"
    echo !line!
    echo -------
    
)



endlocal
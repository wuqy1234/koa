@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
echo %1 %2
set EVN_SELECTFILEPATH=%1
set EVN_KEYWORD=%2
for /r %1 %%f in (*) do (
     for /f "usebackq  delims=*" %%a in ("%%f") do (
        set str=%%a
        set Prefix=!str:~0,1!
        if not "!prefix!"=="[" (
            set Prefix=!str:~0,2!
            if not "!prefix!"=="##" (
                set Prefix=!str:~0,3!
                if not "!prefix!"=="> >" (
                    set "suffix=!str:~20,1!"
                    if not "!suffix!" == "" (
                        echo %%a>> C:\Users\86166\Desktop\初始合并.md
                    )
                )
            )
        )
    )
)
cd %~dp0
@REM cd C:\Users\86166\Desktop\koa-1\test_bat
node .\获取包含关键字的段落.js

del "C:\Users\86166\Desktop\初始合并.md" 

endlocal

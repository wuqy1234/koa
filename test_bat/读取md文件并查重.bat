@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

set "markdownFile=C:\Users\86166\Desktop\koa-1\学习笔记\总体设计\规则设计\行为和属性(横向关联思维)\三者相互关联\退款规则.md"
set "test=C:\Users\86166\Desktop\koa-1\test.md"

for /f "usebackq tokens=* delims=" %%i in ("%markdownFile%") do (
    set "line=%%i"
    set "suffix=!line:~20,1!"
    if not "!suffix!" == "" (
        echo !line!>>test.md
     echo -------------------------------------
         for /f "usebackq tokens=* delims=" %%j in ("%test%") do (
            set "line_in=%%j"
            set "suffix_in=!line_in:~20,1!"
            if not "!suffix_in!" == "" (
            @REM echo  !line_in!
                if "!line!"=="!line_in!" (
                    echo 相等 !line_in!
                ) else (
                    echo 不相等
                )
            )
        )
        echo -------------------------------------
       
    )
     
     
)

  
   
endlocal
@echo off
setlocal enabledelayedexpansion

set "test=C:\Users\86166\Desktop\koa-1\test2.md"

:outerLoop
for /f "tokens=* delims=" %%a in ("%test%") do (
    set "line=%%a"
    set "subLine=!line:~1!"
    
    :innerLoop
    for /f "tokens=* delims=" %%b in ("%test%") do (
        set "lineIn=%%b"
        set "subLineIn=!lineIn:~1!"
        
        if "!subLineIn:~0,1!" == "4" (
            echo 找到了序号大于3的段落: !subLineIn!
            goto :continueOuter
        )
        
        echo 当前行: !subLineIn!
    )
    
    :continueOuter
)

:end
endlocal
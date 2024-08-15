@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

set "input_string=周吴王赵黄吴杨王李张陈杨侯"
set "output_string="

for /L %%i in (0, 1, %input_string%) do (
    echo %%i
    set "char=!input_string:~%%i,1!"
    if "!output_string:*!char!*" == "!output_string!" (
        set "output_string=!output_string!!char!"
    )
)

echo Original string: %input_string%
echo Unique characters: !output_string!





endlocal
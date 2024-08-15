@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
echo %1
set REPO_DIR=%~dp0
call "%REPO_DIR%除重.bat" %1 

cd C:\Users\86166\Desktop\koa-1\test_bat
node .\runbat.js



del "C:\Users\86166\Desktop\初始合并.md"
del "C:\Users\86166\Desktop\同内容序号.txt"
del "C:\Users\86166\Desktop\序号初步去重.txt"
del "C:\Users\86166\Desktop\已处理的数据.md"
del "C:\Users\86166\Desktop\需排除的序号.txt"
endlocal
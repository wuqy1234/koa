@echo off
setlocal
chcp 65001 >nul
call c:\Users\86166\Desktop\koa-1\自动提交.bat
schtasks /delete /tn "tomorrow_auto_commit_github" 
endlocal
del c:\Users\86166\Desktop\koa-1\tomorrow_auto_commit_github.bat

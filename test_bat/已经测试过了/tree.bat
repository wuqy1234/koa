@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

@REM 这是一个bug,会出现打开许多cmd窗口，直到堆栈溢出。
@REM cd /d "%~dp0"
@REM start /wait cmd /c "tree"

@REM tree  /a

tree "C:\Users\Public\Desktop\" /f

endlocal
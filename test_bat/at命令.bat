 @echo off
 setlocal enabledelayedexpansion
 chcp 65001 >nul

 set REPO_DIR=%~dp0
 set "REPO_DIR=!REPO_DIR:~0,-9!"
@REM  at 17:51  /every:SU,M,TU,W,TH,F,SA cd /d "%REPO_DIR%自动提交.bat"
echo "%REPO_DIR%自动提交.bat"
call "%REPO_DIR%自动提交.bat"
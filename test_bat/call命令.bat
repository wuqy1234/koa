 @echo off
 setlocal enabledelayedexpansion
 chcp 65001 >nul

 set REPO_DIR=%~dp0
 set "REPO_DIR=!REPO_DIR:~0,-9!"
 echo "%REPO_DIR%自动提交.bat"
 :: 调用bat文件
 call "%REPO_DIR%自动提交.bat"
 @echo off
 setlocal enabledelayedexpansion
 chcp 65001 >nul

 set REPO_DIR=%~dp0
 set "REPO_DIR=!REPO_DIR:~0,-9!"
 echo "%REPO_DIR%自动提交.bat"
 :: 调用bat文件
@REM  call "%REPO_DIR%自动提交.bat"
echo "%~f0"
@REM call "%~f0" 会递归调用自己，因此需要使用call "%~dp0自动提交.bat"
@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
echo %1
set path=^%1
set "Prefixpath=!path:~0,1!"
@REM  if在使用变量进行判断的时候，一样需要使用!或%来引用，否则会引用失败。
if  "!Prefixpath!"=="C" (
     path = "!path!"
)
echo !path!  !Prefixpath!-----------


pause
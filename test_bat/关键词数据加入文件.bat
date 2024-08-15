@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
set EVN_KEYWORD=%1
set ENV_CONTENT=%2


cd %~dp0
node .\关键词数据加入文件.js


endlocal
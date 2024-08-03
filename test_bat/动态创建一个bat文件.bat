@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

set REPO_DIR=%~dp0
   set TEMP_BATCH=%~dp0/123.bat
    (
    echo @echo off
    echo setlocal
    echo set REPO_DIR=%~dp0
    echo call %REPO_DIR%定时器.bat
    echo endlocal
) > "%TEMP_BATCH%"

endlocal
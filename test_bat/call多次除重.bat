 @echo off
 setlocal enabledelayedexpansion
 chcp 65001 >nul
@REM 多次除重，确实起到了除重的作用，但是第一次的不重复内容丢失了，随着迭代次数越多，会造成最后输出为空。
 set REPO_DIR=%~dp0

 call "%REPO_DIR%除重.bat" C:\Users\86166\Desktop\test



endlocal
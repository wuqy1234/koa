 @echo off
 echo %1
 setlocal enabledelayedexpansion
 chcp 65001 >nul

 start "" "C:\Users\Public\Desktop\酷我音乐.lnk"
 start "" "C:\Users\86166\Desktop\Visual Studio Code.lnk" %1


endlocal

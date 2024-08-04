@echo off
setlocal
 chcp 65001 >nul
 
:: 查询当前连接的 WiFi 名称
for /f "tokens=5 delims=: " %%a in ('netsh wlan show interfaces ^| findstr "SSID"') do (
    set "SSID=%%a"
)

:: 判断是否连接了 WiFi
if defined SSID (
    echo 当前连接的 WiFi 名称为: %SSID%
) else (
    echo 当前未连接任何 WiFi
)

netsh wlan show interfaces >test_bat\wifi_info.txt

netsh wlan show interfaces | findstr "SSID">test_bat\wifi_SSID.txt

@REM git status | findstr "Your branch is ahead of*">test_bat\git_status.txt
@REM start /wait cmd /c "git push"
@REM git push | findstr "fatal: unable to access*" > test_bat\git_push.txt

 for /f "delims=" %%i in ('git status') do (
 echo %%i > test_bat\git_push.txt
 )
endlocal
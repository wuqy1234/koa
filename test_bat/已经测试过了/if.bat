 @echo off
 setlocal enabledelayedexpansion
 chcp 65001 >nul
 
for /f  %%i in (README.md) do (
    if %%i==这是一个学习koa2、sequelize和MySQL的练习项目。 (

        echo ok>>test.txt
    ) else (
        echo no>>test.txt
    )
    echo %%i>>test.txt
)
 schtasks /create /tn "test" /tr "%~f0" /sc once /f
 schtasks /run /tn "test"
 endlocal
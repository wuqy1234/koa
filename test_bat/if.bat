 @echo off
 setlocal enabledelayedexpansion
 chcp 65001 >nul
 
for /f  %%i in (README.md) do (
    if %%i==这是一个学习koa2、sequelize和MySQL的练习项目。 (

        echo ok>>test_bat/test.txt
    ) else (
        echo no>>test_bat/test.txt
    )
    echo %%i>>test_bat/test.txt
)

  endlocal
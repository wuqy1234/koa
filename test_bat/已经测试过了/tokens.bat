@echo off
chcp 65001 >nul
for /f "tokens=1,2,3" %%a in (test_bat/example.txt) do (
   echo Fruit 1: %%a, Fruit 2: %%b, Fruit 3: %%c
)
::加了>nul，则不会输出按任意键退出的提示(英文提示)。不是null。
pause >nul
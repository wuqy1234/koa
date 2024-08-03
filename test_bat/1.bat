@echo off
chcp 65001 >nul
for /f "tokens=1,2,3" %%a in (test_bat/example.txt) do (
   echo Fruit 1: %%a, Fruit 2: %%b, Fruit 3: %%c
)
pause
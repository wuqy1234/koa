@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
echo %1

set No=0
for /r %1 %%f in (*) do (
     for /f "usebackq  delims=*" %%a in ("%%f") do (
        set str=%%a
        set "suffix=!str:~20,1!"
        if not "!suffix!" == "" (
            set /a No+=1
            echo !No!+_+%%a>>C:\Users\86166\Desktop\初始合并.md
        )
     )
)


for /f "usebackq tokens=1,2 delims=+_+" %%a in ("C:\Users\86166\Desktop\初始合并.md") do (
   for /f "usebackq tokens=1,2 delims=+_+" %%c in ("C:\Users\86166\Desktop\初始合并.md") do (
        if %%c gtr %%a (
            if  %%b ==  %%d (
                echo %%a---%%c>> C:\Users\86166\Desktop\同内容序号.txt
            ) 
        )
    )
)

set firstNum=0
set lastNum=0
for /f "usebackq tokens=1,2 delims=---" %%a in ("C:\Users\86166\Desktop\同内容序号.txt") do (
   if %%a == !firstNum! (
    echo !lastNum!>> C:\Users\86166\Desktop\需排除的序号.txt
    echo %%b>> C:\Users\86166\Desktop\需排除的序号.txt
   ) 
    set firstNum=%%a
    set lastNum=%%b
)




set lastNumber=0
for /f "usebackq tokens=1,2 delims=---" %%a in ("C:\Users\86166\Desktop\同内容序号.txt") do (
    if not %%a == !lastNumber! (
      set  lastNumber=%%a
      echo %%a>> C:\Users\86166\Desktop\序号初步去重.txt
    ) 
)


@REM for /f "usebackq delims=" %%a in ("C:\Users\86166\Desktop\序号初步去重.md") do (   
@REM     for /f "usebackq delims=" %%i in ("C:\Users\86166\Desktop\需排除的序号.md") do (
@REM         echo --%%a---%%i--
@REM     @REM  if %%a==%%i (
@REM     @REM         echo --- %%a 
@REM     @REM     ) else (
@REM     @REM         @REM echo ++ %%a
@REM     @REM     )
@REM     )
@REM     echo --------------
@REM )



   

endlocal



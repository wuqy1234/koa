@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
if exist "C:\Users\86166\Desktop\初始合并.txt" (
    echo 文件存在于桌面上, 正在删除...
    del "C:\Users\86166\Desktop\初始合并.txt"
    echo 文件已删除.
) else (
    echo 文件 %filename% 不存在于桌面上.
)


pause
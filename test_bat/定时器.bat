@echo off
 chcp 65001 >nul
 echo 提交完成，等待1分钟后推送更改。
 ping -n 60 localhost >nul

 echo 开始推送更改。
pause
 for /f "tokens=2,3,4 delims=/. " %%a in ("%date%") do (
   set DATE=%%a/%%b/%%c
)
   set T=%time:~0,5%
   set COMMIT_MSG=自动提交: %DATE% at !T!
 echo %T%
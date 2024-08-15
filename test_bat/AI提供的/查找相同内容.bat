@echo off
setlocal enabledelayedexpansion

:: 指定要搜索的段落文件路径
set "paragraphFile=path/to/searchParagraph.txt"

:: 指定目标文件路径
set "targetFile=path/to/targetFile.txt"

:: 读取段落文件内容
set "currentParagraph="

for /f "usebackq tokens=* delims=" %%i in ("%paragraphFile%") do (
    set "line=%%i"
    
    :: 如果当前行不为空，则添加到当前段落
    if not "!line!" == "" (
        set "currentParagraph=!currentParagraph! !line!"
    ) else (
        :: 如果当前段落非空，则输出当前段落
        if not "!currentParagraph!" == "" (
            call :_job_search_paragraph "!currentParagraph!" "%targetFile%"
            set "currentParagraph="
        )
    )
)

:: 输出最后一个段落（如果有的话）
if not "!currentParagraph!" == "" (
    call :_job_search_paragraph "!currentParagraph!" "%targetFile%"
)

pause
exit /b

:_job_search_paragraph
setlocal enabledelayedexpansion
set "searchParagraph=%~1"
set "targetFile=%~2"

echo Searching for paragraph in file: !targetFile!
echo Searching paragraph:
echo !searchParagraph!

:: 使用 findstr 搜索段落
findstr /C:"!searchParagraph!" "%targetFile%" > nul
if %errorlevel% equ 0 (
    echo Found the paragraph in the file.
) else (
    echo Paragraph not found in the file.
)

endlocal
exit /b
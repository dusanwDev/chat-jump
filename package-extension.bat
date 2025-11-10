@echo off
echo ========================================
echo ChatGPT Quick Switch - Package for Distribution
echo ========================================
echo.

set VERSION=1.0.0
set OUTPUT=chatgpt-quick-switch-v%VERSION%.zip

echo Creating distribution package: %OUTPUT%
echo.

REM Check if zip command is available (requires 7-Zip or similar)
where 7z >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: 7-Zip not found!
    echo.
    echo Please install 7-Zip from https://www.7-zip.org/
    echo OR create the ZIP manually with these files:
    echo.
    echo Required files:
    echo   - manifest.json
    echo   - content.js
    echo   - styles.css
    echo   - icon16.png
    echo   - icon48.png
    echo   - icon128.png
    echo.
    echo Optional files:
    echo   - README.md
    echo   - LICENSE
    echo.
    echo DO NOT INCLUDE:
    echo   - .git folder
    echo   - content-debug.js
    echo   - manifest-debug.json
    echo   - Development scripts (.bat, .sh)
    echo   - Test files
    echo.
    pause
    exit /b 1
)

echo Checking for required files...
echo.

if not exist "manifest.json" (
    echo [ERROR] manifest.json not found!
    pause
    exit /b 1
)
echo [OK] manifest.json

if not exist "content.js" (
    echo [ERROR] content.js not found!
    pause
    exit /b 1
)
echo [OK] content.js

if not exist "styles.css" (
    echo [ERROR] styles.css not found!
    pause
    exit /b 1
)
echo [OK] styles.css

if not exist "icon16.png" (
    echo [WARNING] icon16.png not found!
)
echo [OK] icon16.png

if not exist "icon48.png" (
    echo [WARNING] icon48.png not found!
)
echo [OK] icon48.png

if not exist "icon128.png" (
    echo [WARNING] icon128.png not found!
)
echo [OK] icon128.png

echo.
echo Creating ZIP file...
echo.

REM Delete old zip if exists
if exist "%OUTPUT%" (
    del "%OUTPUT%"
    echo Removed old package
)

REM Create new zip with required files
7z a "%OUTPUT%" manifest.json content.js styles.css icon16.png icon48.png icon128.png README.md LICENSE -mx9

echo.
echo ========================================
echo Package created successfully!
echo ========================================
echo.
echo File: %OUTPUT%
echo.
echo Next steps:
echo 1. Test the ZIP file by extracting and loading as unpacked extension
echo 2. Go to https://chrome.google.com/webstore/devconsole
echo 3. Click "New Item"
echo 4. Upload %OUTPUT%
echo 5. Fill out the store listing (see STORE_LISTING.md)
echo 6. Submit for review
echo.
echo Important:
echo - Make sure you have a privacy policy URL
echo - Take screenshots before submitting
echo - Test thoroughly before publishing
echo.

pause

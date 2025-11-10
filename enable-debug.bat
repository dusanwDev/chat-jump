@echo off
echo ========================================
echo Enable DEBUG Mode
echo ========================================
echo.
echo This will switch to the debug version which shows
echo detailed console messages to help troubleshoot issues.
echo.
echo Steps:
echo 1. This script will rename manifest.json to manifest-normal.json
echo 2. Then rename manifest-debug.json to manifest.json
echo 3. You'll need to reload the extension in Chrome
echo.
pause

if exist "manifest.json" (
    if exist "manifest-normal.json" (
        echo [INFO] manifest-normal.json already exists, skipping backup
    ) else (
        ren manifest.json manifest-normal.json
        echo [OK] Backed up current manifest as manifest-normal.json
    )
)

if exist "manifest-debug.json" (
    copy manifest-debug.json manifest.json
    echo [OK] Activated DEBUG manifest
) else (
    echo [ERROR] manifest-debug.json not found!
    pause
    exit /b 1
)

echo.
echo ========================================
echo DEBUG mode enabled!
echo ========================================
echo.
echo Next steps:
echo 1. Go to chrome://extensions/
echo 2. Click the RELOAD button on your extension
echo 3. Go to ChatGPT: https://chatgpt.com
echo 4. Press F12 to open DevTools
echo 5. Click on the "Console" tab
echo 6. Look for messages starting with emoji like:
echo    - 🚀 ChatGPT Quick Switch: Extension loaded!
echo    - 🔨 Creating navigation buttons...
echo    - ✅ Navigation buttons created
echo.
echo If you see these messages, the extension is working!
echo If you don't see ANY messages, the extension is not loading.
echo.
pause

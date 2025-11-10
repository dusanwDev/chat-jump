@echo off
echo ========================================
echo ChatGPT Quick Switch - Setup Checker
echo ========================================
echo.

echo Checking for required files...
echo.

if exist "manifest.json" (
    echo [OK] manifest.json found
) else (
    echo [ERROR] manifest.json NOT found!
)

if exist "content.js" (
    echo [OK] content.js found
) else (
    echo [ERROR] content.js NOT found!
)

if exist "styles.css" (
    echo [OK] styles.css found
) else (
    echo [ERROR] styles.css NOT found!
)

echo.
echo Checking for icon files...
echo.

if exist "icon16.png" (
    echo [OK] icon16.png found
    set HAS_ICONS=1
) else (
    echo [MISSING] icon16.png NOT found
    set HAS_ICONS=0
)

if exist "icon48.png" (
    echo [OK] icon48.png found
) else (
    echo [MISSING] icon48.png NOT found
    set HAS_ICONS=0
)

if exist "icon128.png" (
    echo [OK] icon128.png found
) else (
    echo [MISSING] icon128.png NOT found
    set HAS_ICONS=0
)

echo.
echo Checking manifest.json configuration...
echo.

findstr /C:"\"icons\"" manifest.json > nul
if %ERRORLEVEL% EQU 0 (
    echo [INFO] manifest.json has icons configuration
    if %HAS_ICONS% EQU 0 (
        echo [WARNING] Icons configured but PNG files missing!
        echo [ACTION] Run fix-manifest.bat to use no-icons version
        echo          OR run create-icons.html to generate icons
    )
) else (
    echo [INFO] manifest.json does NOT have icons configuration
    if %HAS_ICONS% EQU 1 (
        echo [INFO] Icon files exist - you can switch to icons version if desired
    )
)

echo.
echo ========================================
echo Summary:
echo ========================================

if %HAS_ICONS% EQU 1 (
    findstr /C:"\"icons\"" manifest.json > nul
    if %ERRORLEVEL% EQU 0 (
        echo Status: READY TO LOAD!
        echo You have icons and manifest is configured for them.
    ) else (
        echo Status: READY (using no-icons version)
        echo Icons exist but manifest doesn't use them.
    )
) else (
    findstr /C:"\"icons\"" manifest.json > nul
    if %ERRORLEVEL% EQU 0 (
        echo Status: ERROR - Missing icon files!
        echo Run: fix-manifest.bat (to use no-icons)
        echo  OR: create-icons.html (to generate icons)
    ) else (
        echo Status: READY TO LOAD!
        echo Using no-icons version.
    )
)

echo.
echo Next steps:
echo 1. Open Chrome and go to chrome://extensions/
echo 2. Enable "Developer mode" (top-right toggle)
echo 3. Click "Load unpacked"
echo 4. Select this folder
echo 5. Visit ChatGPT and look for the buttons!
echo.
pause

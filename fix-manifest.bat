@echo off
echo Switching to no-icons manifest...
ren manifest.json manifest-with-icons.json
ren manifest-no-icons.json manifest.json
echo Done! You can now load the extension in Chrome.
pause

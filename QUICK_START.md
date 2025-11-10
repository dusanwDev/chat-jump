# Quick Start Guide

## Option 1: Test Without Icons (Fastest)

If you want to test the extension immediately without creating icons:

1. **Rename the manifest file:**
   ```bash
   mv manifest.json manifest-with-icons.json
   mv manifest-no-icons.json manifest.json
   ```

2. **Load the extension:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (top-right toggle)
   - Click "Load unpacked"
   - Select the `chat-jump` folder

3. **Test it:**
   - Go to https://chat.openai.com or https://chatgpt.com
   - Look for the navigation buttons in the bottom-right corner
   - Try navigating with the buttons or `Alt + Arrow` keys

## Option 2: Create Icons First

If you want the extension to have proper icons:

### Method A: Using the Script (Linux/Mac)

```bash
chmod +x create-icons.sh
./create-icons.sh
```

### Method B: Manual Creation

Create three PNG files with these dimensions:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

You can use any image editor or online icon generator.

### Method C: Online Icon Generator

1. Go to any icon generator website (e.g., favicon.io, favicon-generator.org)
2. Create an icon with your preferred design
3. Download the PNG files in sizes 16x16, 48x48, and 128x128
4. Rename them to `icon16.png`, `icon48.png`, `icon128.png`
5. Place them in the `chat-jump` folder

## Features

Once installed, you'll see two floating buttons in the bottom-right corner of ChatGPT:

- **↑ Up Button**: Jump to previous message
- **↓ Down Button**: Jump to next message

### Keyboard Shortcuts

- `Alt + ↑`: Previous message
- `Alt + ↓`: Next message

## Troubleshooting

**Buttons don't appear?**
- Refresh the ChatGPT page after installing
- Make sure you're on chat.openai.com or chatgpt.com
- Check that the extension is enabled

**Icons missing in chrome://extensions/?**
- This is normal if you used the no-icons manifest
- The extension will still work perfectly

**Need to switch back to the version with icons?**
```bash
mv manifest.json manifest-no-icons.json
mv manifest-with-icons.json manifest.json
```
Then reload the extension in Chrome.

## What's Next?

The extension is ready to use! Just navigate to ChatGPT and start using the navigation buttons.

For more information, see the full [README.md](README.md).

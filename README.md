# ChatGPT Quick Switch Extension

A Chrome extension that adds navigation buttons to quickly jump between questions and answers in ChatGPT conversations.

## Features

- 🎯 **Quick Navigation**: Two floating buttons (up/down arrows) in the bottom right corner
- ⌨️ **Keyboard Shortcuts**: Use `Alt + Arrow Up/Down` to navigate
- 🎨 **Smart Design**: Adapts to light/dark mode, responsive for mobile
- ✨ **Visual Feedback**: Smooth scrolling with highlight effect on the current message
- 🔄 **Auto-Update**: Automatically detects new messages in the conversation
- 🔀 **Smart Chat Switching**: Automatically detects when you switch between chats and updates button states

## Installation

### From Source (Developer Mode)

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the `chat-jump` folder

### Icon Files

Before loading the extension, you'll need icon files. You can either:
- Create your own PNG icons (16x16, 48x48, 128x128 pixels)
- Use any icon generator online
- Or temporarily remove the `icons` section from `manifest.json`

## Usage

1. Visit [ChatGPT](https://chat.openai.com) or [chatgpt.com](https://chatgpt.com)
2. Start or open a conversation
3. Look for two floating buttons in the bottom-right corner:
   - **↑ Up Arrow**: Jump to the previous question/answer
   - **↓ Down Arrow**: Jump to the next question/answer

### Keyboard Shortcuts

- `Alt + ↑`: Navigate to previous message
- `Alt + ↓`: Navigate to next message

## How It Works

The extension:
1. Detects all conversation turns (articles with `data-testid="conversation-turn-*"`)
2. Creates floating navigation buttons
3. Tracks your current position in the conversation
4. Provides smooth scrolling and visual feedback
5. Updates automatically when new messages appear
6. Monitors URL changes to detect when you switch between chats
7. Automatically resets and rescans messages when switching conversations

## Customization

You can customize the appearance by editing `styles.css`:
- Button size and position
- Colors and hover effects
- Dark/light mode styles
- Mobile responsiveness

## Browser Compatibility

- ✅ Chrome (Manifest V3)
- ✅ Edge (Chromium-based)
- ✅ Brave
- ✅ Other Chromium-based browsers

## Troubleshooting

**Buttons not appearing?**
- Make sure you're on chat.openai.com or chatgpt.com
- Check that the extension is enabled in chrome://extensions/
- Try refreshing the page

**Navigation not working?**
- Ensure there are multiple messages in the conversation
- Check the browser console for any errors

## Privacy

This extension:
- ✅ Runs only on ChatGPT websites
- ✅ Does not collect any data
- ✅ Does not require any permissions
- ✅ Does not send data to external servers
- ✅ Works completely offline

## Development

### Project Structure

```
chat-jump/
├── manifest.json      # Extension configuration
├── content.js         # Main navigation logic
├── styles.css         # Button styles
├── README.md          # This file
└── icons/             # Extension icons (16, 48, 128px)
```

### Technologies Used

- JavaScript (Vanilla)
- CSS3
- Chrome Extension Manifest V3

## Contributing

Feel free to submit issues or pull requests!

## License

MIT License - Feel free to use and modify as needed.

## Author

Created for easier navigation in ChatGPT conversations.

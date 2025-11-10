# Privacy Policy for ChatGPT Quick Switch

**Last Updated:** November 10, 2025

## Overview

ChatGPT Quick Switch ("the Extension") is committed to protecting your privacy. This privacy policy explains what data we collect, how we use it, and your rights regarding your information.

## Data Collection

**We collect ZERO data.**

The Extension:
- ✅ Does NOT collect any personal information
- ✅ Does NOT track your browsing activity
- ✅ Does NOT send any data to external servers
- ✅ Does NOT use cookies or local storage for tracking
- ✅ Does NOT contain any analytics or telemetry
- ✅ Does NOT share any information with third parties

## How the Extension Works

The Extension operates entirely locally in your browser:

1. **Content Scripts**: The extension injects JavaScript code into ChatGPT pages (chat.openai.com and chatgpt.com) to:
   - Detect conversation messages on the page
   - Create navigation buttons
   - Handle button clicks and keyboard shortcuts
   - Scroll to different messages when requested

2. **No Data Storage**: The extension does NOT store any data:
   - No conversation content is saved
   - No user preferences are stored
   - No usage statistics are collected
   - All processing happens in real-time in your browser

3. **No Network Requests**: The extension does NOT make any network requests:
   - No data is sent to our servers (we don't have servers)
   - No data is sent to third-party services
   - No tracking pixels or beacons
   - Works completely offline

## Permissions

The Extension requires minimal permissions:

### Content Scripts on ChatGPT Domains
- **Permission**: Inject scripts on `chat.openai.com/*` and `chatgpt.com/*`
- **Purpose**: To add navigation buttons and detect messages
- **Scope**: Only runs on ChatGPT websites, nowhere else
- **Data Access**: Can read page content to find messages, but does NOT save or transmit this data

The Extension does NOT require:
- ❌ Access to all websites
- ❌ Access to your browsing history
- ❌ Access to your tabs
- ❌ Access to your downloads
- ❌ Access to your clipboard
- ❌ Any special permissions

## Your ChatGPT Conversations

- **We cannot see your ChatGPT conversations**
- The Extension only reads the DOM (page structure) to identify messages
- No conversation content leaves your browser
- No messages are stored, copied, or transmitted
- The Extension has no backend server to send data to

## Third-Party Services

The Extension does NOT use any third-party services:
- No analytics (Google Analytics, etc.)
- No crash reporting
- No advertising
- No tracking pixels
- No external scripts or resources

## Children's Privacy

The Extension does not knowingly collect any information from anyone, including children under 13. Since we collect zero data, there are no special concerns regarding children's privacy.

## Changes to This Policy

If we ever change our data practices, we will:
1. Update this privacy policy
2. Update the "Last Updated" date
3. Notify users through the Chrome Web Store

However, our commitment to zero data collection will not change.

## Open Source

The Extension is open source. You can:
- Review the source code at: [Your GitHub Repository URL]
- Verify that no data collection occurs
- Audit the code yourself
- Contribute improvements

## Contact

If you have questions about this privacy policy or the Extension:

- **GitHub Issues**: [Your GitHub Repository URL]/issues
- **Email**: [Your Email Address]

## Your Rights

Since we collect no data:
- There is no data to access
- There is no data to delete
- There is no data to export
- There is no data to correct

## Compliance

This Extension complies with:
- ✅ Chrome Web Store Developer Program Policies
- ✅ GDPR (General Data Protection Regulation)
- ✅ CCPA (California Consumer Privacy Act)
- ✅ Other privacy regulations worldwide

Compliance is easy because we collect zero data.

## Technical Details

For transparency, here's what the Extension code does:

1. **On page load**:
   - Queries the DOM for article elements with `data-testid^="conversation-turn-"`
   - Creates two button elements
   - Adds them to the page

2. **When you click a button**:
   - Finds the current scroll position
   - Scrolls to the previous or next message
   - Adds a temporary highlight effect

3. **When you switch chats**:
   - Detects URL change
   - Rescans for messages in the new chat
   - Updates button states

**All of this happens locally in your browser. No data leaves your device.**

## Summary

**TL;DR:**
- We collect nothing
- We store nothing
- We transmit nothing
- We track nothing
- Your privacy is 100% protected

---

**By using the Extension, you agree to this privacy policy.**

If you have concerns about privacy, you can review our open-source code or uninstall the Extension at any time.

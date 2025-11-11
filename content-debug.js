// ChatGPT Quick Switch Extension - DEBUG VERSION
// Adds navigation buttons to quickly jump between questions and answers
// This version includes console logging for troubleshooting

(function() {
  'use strict';

  console.log('🚀 ChatGPT Quick Switch: Extension loaded!');
  console.log('📍 Current URL:', window.location.href);

  let currentIndex = -1;
  let articles = [];
  let lastUrl = window.location.href;
  let initialized = false;

  // Create navigation buttons
  function createNavigationButtons() {
    console.log('🔨 Creating navigation buttons...');

    // Check if buttons already exist
    if (document.getElementById('chatgpt-nav-container')) {
      console.log('⚠️ Buttons already exist, skipping creation');
      return;
    }

    const container = document.createElement('div');
    container.id = 'chatgpt-nav-container';
    container.className = 'chatgpt-nav-container';

    // Up arrow button
    const upButton = document.createElement('button');
    upButton.id = 'chatgpt-nav-up';
    upButton.className = 'chatgpt-nav-btn chatgpt-nav-up';
    upButton.setAttribute('aria-label', 'Previous response');
    upButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    `;

    // Down arrow button
    const downButton = document.createElement('button');
    downButton.id = 'chatgpt-nav-down';
    downButton.className = 'chatgpt-nav-btn chatgpt-nav-down';
    downButton.setAttribute('aria-label', 'Next response');
    downButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    `;

    container.appendChild(upButton);
    container.appendChild(downButton);
    document.body.appendChild(container);

    console.log('✅ Navigation buttons created and added to page!');
    console.log('📦 Container:', container);

    // Add event listeners
    upButton.addEventListener('click', navigateUp);
    downButton.addEventListener('click', navigateDown);

    // Set initial position
    setTimeout(() => updateButtonPosition(), 100);

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);

    // Ctrl + Scroll wheel navigation
    // Use passive: false to allow preventDefault() for stopping zoom
    document.addEventListener('wheel', handleWheel, { passive: false });

    console.log('🎹 Keyboard shortcuts registered (Alt + Arrow Up/Down)');
    console.log('🖱️ Mouse wheel navigation registered (Ctrl + Scroll)');
  }

  // Reset navigation state (when switching chats)
  function resetNavigation() {
    console.log('🔄 Resetting navigation state (chat switched)');
    currentIndex = -1;
    articles = [];
    initialized = false;
    updateButtonStates();
  }

  // Get all conversation articles
  function getArticles() {
    articles = Array.from(document.querySelectorAll('article[data-testid^="conversation-turn-"]'));
    console.log(`📄 Found ${articles.length} conversation articles`);
    return articles.length;
  }

  // Navigate to previous article
  function navigateUp() {
    console.log('⬆️ Navigate UP clicked');
    getArticles();
    if (articles.length === 0) {
      console.log('⚠️ No articles found');
      return;
    }

    // If not initialized, start from bottom
    if (currentIndex === -1) {
      currentIndex = articles.length - 1;
      console.log(`📍 Starting from bottom (last article): ${currentIndex}`);
    }

    if (currentIndex > 0) {
      currentIndex--;
      console.log(`📍 Moving to article ${currentIndex} of ${articles.length}`);
      scrollToArticle(currentIndex);
    } else {
      console.log('⚠️ Already at the top');
    }

    updateButtonStates();
  }

  // Navigate to next article
  function navigateDown() {
    console.log('⬇️ Navigate DOWN clicked');
    getArticles();
    if (articles.length === 0) {
      console.log('⚠️ No articles found');
      return;
    }

    // If not initialized, start from bottom (shouldn't happen, but just in case)
    if (currentIndex === -1) {
      currentIndex = articles.length - 1;
      console.log(`📍 Starting from bottom: ${currentIndex}`);
      updateButtonStates();
      return;
    }

    if (currentIndex < articles.length - 1) {
      currentIndex++;
      console.log(`📍 Moving to article ${currentIndex} of ${articles.length}`);
      scrollToArticle(currentIndex);
    } else {
      console.log('⚠️ Already at the bottom');
    }

    updateButtonStates();
  }

  // Scroll to specific article
  function scrollToArticle(index) {
    if (index >= 0 && index < articles.length) {
      const article = articles[index];
      console.log('📜 Scrolling to article:', article);
      article.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Add highlight effect
      article.style.transition = 'background-color 0.3s ease';
      const originalBg = getComputedStyle(article).backgroundColor;
      article.style.backgroundColor = 'rgba(0, 122, 255, 0.1)';

      setTimeout(() => {
        article.style.backgroundColor = originalBg;
      }, 1000);
    }
  }

  // Check if we're in a chat (not on beginning screen)
  function isInChat() {
    const url = window.location.href;
    // Check if URL contains /c/ (chat ID pattern)
    const inChat = url.includes('/c/');
    console.log(`🔍 Checking if in chat: ${inChat} (URL: ${url})`);
    return inChat;
  }

  // Update button position relative to prompt container
  function updateButtonPosition() {
    const container = document.getElementById('chatgpt-nav-container');
    if (!container) return;

    // Hide buttons if not in a chat
    if (!isInChat()) {
      container.style.display = 'none';
      console.log('👻 Not in chat - hiding buttons');
      return;
    }

    // Show buttons if in a chat
    container.style.display = 'flex';

    // Find the prompt form/container using the composer form
    const promptForm = document.querySelector('form.group\\/composer') ||
                      document.querySelector('#prompt-textarea')?.closest('.bg-token-bg-primary') ||
                      document.getElementById('thread-bottom');

    if (promptForm) {
      const rect = promptForm.getBoundingClientRect();
      // Position 55px to the right of the prompt container
      const rightPosition = window.innerWidth - rect.right - 55;
      container.style.right = `${rightPosition}px`;
      console.log(`📍 Positioned buttons ${rightPosition}px from right edge (55px right of prompt)`);
      console.log(`📦 Prompt container found:`, promptForm.className || promptForm.id);
    } else {
      // Fallback to default position if prompt container not found
      container.style.right = '24px';
      console.log('⚠️ Prompt container not found, using default position');
    }
  }

  // Update button states (enable/disable)
  function updateButtonStates() {
    const upButton = document.getElementById('chatgpt-nav-up');
    const downButton = document.getElementById('chatgpt-nav-down');

    if (!upButton || !downButton) {
      console.log('⚠️ Buttons not found when updating states');
      return;
    }

    console.log(`🔄 Updating button states: currentIndex=${currentIndex}, articles.length=${articles.length}`);

    const container = document.getElementById('chatgpt-nav-container');

    // Hide buttons if no articles
    if (articles.length === 0) {
      if (container) {
        container.style.display = 'none';
        console.log('👻 Hiding buttons (no articles)');
      }
      return;
    }

    // Show buttons
    if (container) {
      container.style.display = 'flex';
    }

    // Case 1: Not initialized yet or at bottom (currentIndex = -1 or last index)
    if (currentIndex === -1 || currentIndex === articles.length - 1) {
      // At bottom: can go UP, cannot go DOWN
      upButton.classList.remove('disabled');
      upButton.disabled = false;
      downButton.classList.add('disabled');
      downButton.disabled = true;
      console.log('🔘 At BOTTOM: Up=ENABLED, Down=DISABLED');
    }
    // Case 2: At top (currentIndex = 0)
    else if (currentIndex === 0) {
      // At top: cannot go UP, can go DOWN
      upButton.classList.add('disabled');
      upButton.disabled = true;
      downButton.classList.remove('disabled');
      downButton.disabled = false;
      console.log('🔘 At TOP: Up=DISABLED, Down=ENABLED');
    }
    // Case 3: In middle
    else {
      // In middle: can go both ways
      upButton.classList.remove('disabled');
      upButton.disabled = false;
      downButton.classList.remove('disabled');
      downButton.disabled = false;
      console.log('🔘 In MIDDLE: Up=ENABLED, Down=ENABLED');
    }

    console.log(`👁️ Final state - Up: ${upButton.disabled ? 'DISABLED' : 'ENABLED'}, Down: ${downButton.disabled ? 'DISABLED' : 'ENABLED'}`);
  }

  // Handle keyboard shortcuts (Alt + Up/Down)
  function handleKeyboard(e) {
    if (e.altKey) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        console.log('⌨️ Alt + Arrow Up pressed');
        navigateUp();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        console.log('⌨️ Alt + Arrow Down pressed');
        navigateDown();
      }
    }
  }

  // Handle Ctrl + Scroll for navigation
  function handleWheel(e) {
    // Only handle if Ctrl key is pressed
    if (e.ctrlKey) {
      // Prevent default zoom behavior
      e.preventDefault();

      // deltaY < 0 means scrolling up, > 0 means scrolling down
      if (e.deltaY < 0) {
        console.log('🖱️ Ctrl + Scroll UP detected');
        // Scrolling up with Ctrl = navigate to previous message
        navigateUp();
      } else if (e.deltaY > 0) {
        console.log('🖱️ Ctrl + Scroll DOWN detected');
        // Scrolling down with Ctrl = navigate to next message
        navigateDown();
      }
    }
  }

  // Detect current scroll position
  function detectCurrentArticle() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (let i = articles.length - 1; i >= 0; i--) {
      const article = articles[i];
      const rect = article.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;

      if (absoluteTop <= scrollPosition) {
        if (currentIndex !== i) {
          console.log(`📍 Detected scroll to article ${i}`);
          currentIndex = i;
        }
        break;
      }
    }

    updateButtonStates();
  }

  // Detect URL changes (for when user switches between chats)
  function checkUrlChange() {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
      console.log('🔀 URL changed!');
      console.log('   Old:', lastUrl);
      console.log('   New:', currentUrl);
      lastUrl = currentUrl;
      // URL changed - reset and rescan
      resetNavigation();
      setTimeout(() => {
        setInitialPosition();
      }, 500); // Small delay to let new content load
    }
  }

  // Set initial position (called on load and after chat switch)
  function setInitialPosition() {
    console.log('🎯 Setting initial position...');
    const count = getArticles();

    if (count > 0) {
      // ChatGPT always loads at bottom of conversation
      // Set position to last message (bottom) - user can only go UP initially
      currentIndex = articles.length - 1;
      initialized = true;
      console.log(`✅ Initial position set to last article: ${currentIndex} of ${articles.length} (BOTTOM)`);
      console.log(`   This means: User at BOTTOM → Up button ENABLED, Down button DISABLED`);
      updateButtonStates();
      return true;
    } else {
      console.log('⚠️ No articles found yet, will retry...');
      return false;
    }
  }

  // Initialize the extension
  function init() {
    console.log('🎬 Initializing extension...');
    console.log('📊 Document ready state:', document.readyState);

    createNavigationButtons();

    // Try to set initial position immediately
    if (!setInitialPosition()) {
      // If no articles yet, keep retrying
      console.log('⏳ Articles not loaded yet, setting up retry mechanism...');
      let attempts = 0;
      const maxAttempts = 10;

      const retryInterval = setInterval(() => {
        attempts++;
        console.log(`🔄 Retry attempt ${attempts}/${maxAttempts}...`);

        if (setInitialPosition()) {
          console.log('✅ Successfully initialized after retry!');
          clearInterval(retryInterval);
        } else if (attempts >= maxAttempts) {
          console.log('❌ Max retry attempts reached. Articles may not be available yet.');
          console.log('💡 Extension will auto-detect articles when they appear.');
          clearInterval(retryInterval);
        }
      }, 500);
    }

    console.log('⏱️ Initial setup phase completed');

    // Watch for new messages (using MutationObserver)
    const observer = new MutationObserver(() => {
      console.log('🔄 Page content changed, rescanning articles...');
      const previousCount = articles.length;
      getArticles();

      // If we just got articles for the first time, initialize position
      if (previousCount === 0 && articles.length > 0 && !initialized) {
        console.log('🎯 Articles appeared! Setting initial position...');
        setInitialPosition();
      }
    });

    // Observe the main chat container
    const chatContainer = document.querySelector('main') || document.body;
    console.log('👀 Observing container:', chatContainer.tagName);
    observer.observe(chatContainer, {
      childList: true,
      subtree: true
    });

    // Update on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (articles.length > 0) {
          getArticles();
          detectCurrentArticle();
        }
      }, 100);
    });

    // Update button position on window resize
    window.addEventListener('resize', () => {
      console.log('🔄 Window resized, updating button position...');
      updateButtonPosition();
    });

    // Periodically update button position (handles dynamic UI changes)
    setInterval(() => {
      updateButtonPosition();
    }, 2000);

    // Monitor URL changes for SPA navigation (when switching between chats)
    console.log('👁️ Setting up URL change monitoring...');

    // Method 1: Intercept History API
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function() {
      originalPushState.apply(this, arguments);
      checkUrlChange();
    };

    history.replaceState = function() {
      originalReplaceState.apply(this, arguments);
      checkUrlChange();
    };

    // Method 2: Listen to popstate (back/forward buttons)
    window.addEventListener('popstate', checkUrlChange);

    // Method 3: Periodic check as fallback (every 1 second)
    setInterval(checkUrlChange, 1000);

    console.log('✅ Extension initialization complete!');
    console.log('💡 TIP: Look for buttons in the bottom-right corner');
    console.log('💡 TIP: Use Alt + Arrow Up/Down to navigate');
    console.log('💡 TIP: Use Ctrl + Scroll to navigate');
    console.log('💡 TIP: Extension will auto-detect when you switch chats');

    // Visual confirmation that extension loaded
    console.log('');
    console.log('═══════════════════════════════════════════');
    console.log('  ChatGPT Quick Switch Extension ACTIVE');
    console.log('═══════════════════════════════════════════');
    console.log('');
  }

  // Wait for page to be ready
  if (document.readyState === 'loading') {
    console.log('⏳ Waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', init);
  } else {
    console.log('✅ DOM already loaded, initializing now');
    init();
  }
})();

// ChatGPT Quick Switch Extension
// Adds navigation buttons to quickly jump between questions and answers

(function() {
  'use strict';

  let currentIndex = -1;
  let articles = [];
  let lastUrl = window.location.href;
  let initialized = false;

  // Create navigation buttons
  function createNavigationButtons() {
    // Check if buttons already exist
    if (document.getElementById('chatgpt-nav-container')) {
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
  }

  // Reset navigation state (when switching chats)
  function resetNavigation() {
    currentIndex = -1;
    articles = [];
    initialized = false;
    updateButtonStates();
  }

  // Get all conversation articles
  function getArticles() {
    articles = Array.from(document.querySelectorAll('article[data-testid^="conversation-turn-"]'));
    return articles.length;
  }

  // Navigate to previous article
  function navigateUp() {
    getArticles();
    if (articles.length === 0) return;

    // If not initialized, start from bottom
    if (currentIndex === -1) {
      currentIndex = articles.length - 1;
    }

    if (currentIndex > 0) {
      currentIndex--;
      scrollToArticle(currentIndex);
    }

    updateButtonStates();
  }

  // Navigate to next article
  function navigateDown() {
    getArticles();
    if (articles.length === 0) return;

    // If not initialized, start from bottom (shouldn't happen, but just in case)
    if (currentIndex === -1) {
      currentIndex = articles.length - 1;
      updateButtonStates();
      return;
    }

    if (currentIndex < articles.length - 1) {
      currentIndex++;
      scrollToArticle(currentIndex);
    }

    updateButtonStates();
  }

  // Scroll to specific article
  function scrollToArticle(index) {
    if (index >= 0 && index < articles.length) {
      const article = articles[index];
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
    return url.includes('/c/');
  }

  // Update button position relative to prompt container
  function updateButtonPosition() {
    const container = document.getElementById('chatgpt-nav-container');
    if (!container) return;

    // Hide buttons if not in a chat
    if (!isInChat()) {
      container.style.display = 'none';
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
      // Position 45px to the right of the prompt container
      const rightPosition = window.innerWidth - rect.right - 45;
      container.style.right = `${rightPosition}px`;
    } else {
      // Fallback to default position if prompt container not found
      container.style.right = '24px';
    }
  }

  // Update button states (enable/disable)
  function updateButtonStates() {
    const upButton = document.getElementById('chatgpt-nav-up');
    const downButton = document.getElementById('chatgpt-nav-down');

    if (!upButton || !downButton) return;

    const container = document.getElementById('chatgpt-nav-container');

    // Hide buttons if no articles
    if (articles.length === 0) {
      if (container) {
        container.style.display = 'none';
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
    }
    // Case 2: At top (currentIndex = 0)
    else if (currentIndex === 0) {
      // At top: cannot go UP, can go DOWN
      upButton.classList.add('disabled');
      upButton.disabled = true;
      downButton.classList.remove('disabled');
      downButton.disabled = false;
    }
    // Case 3: In middle
    else {
      // In middle: can go both ways
      upButton.classList.remove('disabled');
      upButton.disabled = false;
      downButton.classList.remove('disabled');
      downButton.disabled = false;
    }
  }

  // Handle keyboard shortcuts (Alt + Up/Down)
  function handleKeyboard(e) {
    if (e.altKey) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigateUp();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
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
        // Scrolling up with Ctrl = navigate to previous message
        navigateUp();
      } else if (e.deltaY > 0) {
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
    const count = getArticles();

    if (count > 0) {
      // ChatGPT always loads at bottom of conversation
      // Set position to last message (bottom) - user can only go UP initially
      currentIndex = articles.length - 1;
      initialized = true;
      updateButtonStates();
      return true;
    }
    return false;
  }

  // Initialize the extension
  function init() {
    createNavigationButtons();

    // Try to set initial position immediately
    if (!setInitialPosition()) {
      // If no articles yet, keep retrying
      let attempts = 0;
      const maxAttempts = 10;

      const retryInterval = setInterval(() => {
        attempts++;

        if (setInitialPosition()) {
          clearInterval(retryInterval);
        } else if (attempts >= maxAttempts) {
          clearInterval(retryInterval);
        }
      }, 500);
    }

    // Watch for new messages (using MutationObserver)
    const observer = new MutationObserver(() => {
      const previousCount = articles.length;
      getArticles();

      // If we just got articles for the first time, initialize position
      if (previousCount === 0 && articles.length > 0 && !initialized) {
        setInitialPosition();
      }
    });

    // Observe the main chat container
    const chatContainer = document.querySelector('main') || document.body;
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
      updateButtonPosition();
    });

    // Periodically update button position (handles dynamic UI changes)
    setInterval(() => {
      updateButtonPosition();
    }, 2000);

    // Monitor URL changes for SPA navigation (when switching between chats)
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
  }

  // Wait for page to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

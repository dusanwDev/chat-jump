// ChatGPT Quick Switch Extension
// Adds navigation buttons to quickly jump between questions and answers

(function() {
  'use strict';

  let currentIndex = -1;
  let articles = [];
  let lastUrl = window.location.href;

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

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
  }

  // Reset navigation state (when switching chats)
  function resetNavigation() {
    currentIndex = -1;
    articles = [];
    updateButtonStates();
  }

  // Get all conversation articles
  function getArticles() {
    articles = Array.from(document.querySelectorAll('article[data-testid^="conversation-turn-"]'));
    updateButtonStates();
  }

  // Navigate to previous article
  function navigateUp() {
    getArticles();
    if (articles.length === 0) return;

    if (currentIndex <= 0) {
      currentIndex = 0;
    } else {
      currentIndex--;
    }

    scrollToArticle(currentIndex);
    updateButtonStates();
  }

  // Navigate to next article
  function navigateDown() {
    getArticles();
    if (articles.length === 0) return;

    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= articles.length - 1) {
      currentIndex = articles.length - 1;
    } else {
      currentIndex++;
    }

    scrollToArticle(currentIndex);
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

  // Update button states (enable/disable)
  function updateButtonStates() {
    const upButton = document.getElementById('chatgpt-nav-up');
    const downButton = document.getElementById('chatgpt-nav-down');

    if (!upButton || !downButton) return;

    // Disable up button if at the top
    if (currentIndex <= 0) {
      upButton.classList.add('disabled');
      upButton.disabled = true;
    } else {
      upButton.classList.remove('disabled');
      upButton.disabled = false;
    }

    // Disable down button if at the bottom
    if (currentIndex >= articles.length - 1) {
      downButton.classList.add('disabled');
      downButton.disabled = true;
    } else {
      downButton.classList.remove('disabled');
      downButton.disabled = false;
    }

    // Hide buttons if no articles
    const container = document.getElementById('chatgpt-nav-container');
    if (container) {
      if (articles.length === 0) {
        container.style.display = 'none';
      } else {
        container.style.display = 'flex';
      }
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

  // Detect current scroll position
  function detectCurrentArticle() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (let i = articles.length - 1; i >= 0; i--) {
      const article = articles[i];
      const rect = article.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;

      if (absoluteTop <= scrollPosition) {
        currentIndex = i;
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
        getArticles();
        // ChatGPT always scrolls to bottom when switching chats
        // Set position to last message so up arrow works immediately
        if (articles.length > 0) {
          currentIndex = articles.length - 1;
        }
        updateButtonStates();
      }, 500); // Small delay to let new content load
    }
  }

  // Initialize the extension
  function init() {
    createNavigationButtons();

    // Initial article detection
    getArticles();

    // Watch for new messages (using MutationObserver)
    const observer = new MutationObserver(() => {
      getArticles();
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
        getArticles();
        detectCurrentArticle();
      }, 100);
    });

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

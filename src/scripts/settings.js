document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const usernameInput = document.querySelector('input[placeholder="Enter new username"]');
  const passwordInput = document.querySelector('input[placeholder="Enter new password"]');
  const updateAccountBtn = document.querySelector('.update-account-btn');
  const volumeSlider = document.getElementById('volume');
  const darkModeToggle = document.getElementById('dark-mode');
  const saveBtn = document.querySelector('.save-btn');

  // Initialize settings from localStorage
  initializeSettings();

  // Handle dark mode toggle
  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', () => {
      if (darkModeToggle.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }

  // Handle volume slider changes
  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      localStorage.setItem('volume', volumeSlider.value);
      // If you later implement sound effects or background music:
      // updateAudioVolume(volumeSlider.value);
    });
  }

  // Handle Account Update button
  if (updateAccountBtn) {
    updateAccountBtn.addEventListener('click', updateAccount);
  }

  // Handle Save Settings button
  if (saveBtn) {
    saveBtn.addEventListener('click', saveSettings);
  }

  // Functions
  function initializeSettings() {
    // Apply dark mode based on localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      if (darkModeToggle) darkModeToggle.checked = true;
    }

    // Set volume slider to saved value
    const savedVolume = localStorage.getItem('volume');
    if (savedVolume && volumeSlider) {
      volumeSlider.value = savedVolume;
    }

    // Pre-fill username if logged in
    const savedUsername = localStorage.getItem('username');
    if (savedUsername && usernameInput) {
      usernameInput.value = savedUsername;
    }
  }

  async function updateAccount() {
    const newUsername = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const currentUsername = localStorage.getItem('username');
    
    // Validate input
    if (!newUsername && !password) {
      showNotification('Please enter a new username or password');
      return;
    }

    // Update username if changed
    if (newUsername && newUsername !== currentUsername) {
      try {
        const response = await fetch('http://127.0.0.1:5000/update-username', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            current_username: currentUsername,
            new_username: newUsername
          })
        });
        
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('username', newUsername);
          showNotification('Username updated successfully!');
        } else {
          showNotification(data.error || 'Failed to update username');
        }
      } catch (error) {
        console.error('Username update error:', error);
        showNotification('Server error. Please try again later.');
      }
    }

    // Update password through backend API
    if (password) {
      try {
        const response = await fetch('http://127.0.0.1:5000/update-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            username: localStorage.getItem('username'),
            password: password 
          })
        });
        
        const data = await response.json();
        if (response.ok) {
          passwordInput.value = '';
          showNotification('Password updated successfully!');
        } else {
          showNotification(data.error || 'Failed to update password');
        }
      } catch (error) {
        console.error('Password update error:', error);
        showNotification('Server error. Please try again later.');
      }
    }
  }

  function saveSettings() {
    // Save all current settings to localStorage
    if (darkModeToggle) {
      localStorage.setItem('darkMode', darkModeToggle.checked ? 'enabled' : 'disabled');
    }
    
    if (volumeSlider) {
      localStorage.setItem('volume', volumeSlider.value);
    }
    
    showNotification('Settings saved successfully!');
  }

  function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = '#1abc9c';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
    notification.style.zIndex = '1001';
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.5s ease';
      
      // Remove from DOM after fade out
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 3000);
  }

  // Optional: Function to update audio volume if you implement sound effects later
  function updateAudioVolume(volume) {
    // Example: Set volume for all audio elements
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.volume = volume / 100;
    });
  }
});
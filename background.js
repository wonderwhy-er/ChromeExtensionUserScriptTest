// Function to register the user script initially
function registerUserScript(userMessage) {
  console.log('Registering user script with message:', userMessage);

  chrome.userScripts.register([
    {
      id: 'demoScript',
      matches: ['*://*/*'], // Match all URLs
      js: [{ code: userMessage }]
    }
  ]);
}

// Initial registration of the user script
chrome.storage.sync.get('userMessage', function (data) {
  const userMessage = data.userMessage || 'alert("Hello from UserScript!");';
  registerUserScript(userMessage);
});

// Listen for changes in storage to update the script dynamically
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === 'sync' && changes.userMessage) {
    const newMessage = changes.userMessage.newValue;
    console.log('User message updated:', newMessage);

    // Update the user script with the new message
    chrome.userScripts.update([
      {
        id: 'demoScript',
        js: [{ code: newMessage }]
      }
    ]).then(() => {
      console.log('User script updated successfully.');
    }).catch(error => {
      console.error('Error updating user script:', error);
    });
  }
});

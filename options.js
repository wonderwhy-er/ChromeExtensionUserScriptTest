document.addEventListener('DOMContentLoaded', function () {
  const messageInput = document.getElementById('message');
  const saveButton = document.getElementById('save');

  // Load the saved message and display it in the input
  chrome.storage.sync.get('userMessage', function (data) {
    messageInput.value = data.userMessage || 'alert("Hello from UserScript!");';
  });

  // Save the message to storage when the button is clicked
  saveButton.addEventListener('click', function () {
    const userMessage = messageInput.value;
    chrome.storage.sync.set({ userMessage }, function () {
      alert('Message saved!');
    });
  });
});

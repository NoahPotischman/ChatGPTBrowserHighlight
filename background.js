chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'textSelected') {
      chrome.storage.local.set({ selectedText: request.text });
    }
  });
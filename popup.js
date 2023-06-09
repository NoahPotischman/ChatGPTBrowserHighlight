const selectedTextElement = document.getElementById('selected-text');
const askChatGPTButton = document.getElementById('ask-chatgpt');
const responseTextArea = document.getElementById('response');
const manualPromptTextArea = document.getElementById('manual-prompt');
const addWordsInput = document.getElementById('add-words');

chrome.storage.local.get('selectedText', (data) => {
  if (data.selectedText) {
    selectedTextElement.innerText = data.selectedText;
  } else {
    selectedTextElement.innerText = 'No text selected.';
    askChatGPTButton.disabled = true;
  }
});

askChatGPTButton.addEventListener('click', async () => {
  const prependWords = addWordsInput.value.trim();
  const selectedText = selectedTextElement.innerText;
  const manualPrompt = manualPromptTextArea.value.trim();
  let query = manualPrompt || selectedText; // Changed from 'const' to 'let'

  if (prependWords) {
    query = `${prependWords} ${query}`;
  }

  responseTextArea.value = 'Fetching response...';

  try {
    const response = await fetchChatGPTResponse(query);
    responseTextArea.value = response;
  } catch (error) {
    console.error(error);
    responseTextArea.value = 'Error: Could not fetch response.';
  }
});

async function fetchChatGPTResponse(prompt) {
  const apiKey = ''
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  const body = JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  });

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: body,
  });

  const data = await response.json();

  if (data.choices && data.choices.length > 0 && data.choices[0].message.content) {
    return data.choices[0].message.content.trim();
  } else {
    throw new Error('No response from ChatGPT');
  }
}

// Theme swapper

document.addEventListener('DOMContentLoaded', function () {
  const themeSwitcher = document.getElementById('theme-switcher');
  const themeLink = document.getElementById('theme-link');

  const themes = [
    'css/purpleblue.css',
    'css/greenorange.css', //
    'css/aquaorange.css',
    'css/pinkblue.css',
    'css/redyellow.css',
    'css/blueyellow.css',
    'css/limepurple.css',
    'css/coralteal.css',
    'css/rosegold.css',
    'css/indigocyan.css' //
  ];
  
  


  let currentThemeIndex = 0;

  // Retrieve the stored theme and apply it
  chrome.storage.sync.get('currentThemeIndex', (data) => {
    if (data.currentThemeIndex !== undefined) {
      currentThemeIndex = data.currentThemeIndex;
    }
    themeLink.setAttribute('href', themes[currentThemeIndex]);
  });

  themeSwitcher.addEventListener('click', function () {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    themeLink.setAttribute('href', themes[currentThemeIndex]);

    // Store the selected theme
    chrome.storage.sync.set({ currentThemeIndex: currentThemeIndex });
  });
});

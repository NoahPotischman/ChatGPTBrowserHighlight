const selectedTextElement = document.getElementById('selected-text');
const askChatGPTButton = document.getElementById('ask-chatgpt');
const responseTextArea = document.getElementById('response');

chrome.storage.local.get('selectedText', (data) => {
  if (data.selectedText) {
    selectedTextElement.innerText = data.selectedText;
  } else {
    selectedTextElement.innerText = 'No text selected.';
    askChatGPTButton.disabled = true;
  }
});

askChatGPTButton.addEventListener('click', async () => {
  const query = selectedTextElement.innerText;
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
  const apiKey = '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';
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
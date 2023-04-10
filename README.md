# ChatGPT Chrome Extension

A simple Chrome extension that allows users to highlight text on a webpage and ask ChatGPT questions directly from their browser.

## Things to note
1. Please note that a paid openai account is required to use this, because otherwise your API key will be unable to request responses
2. This program communicates with gpt-3.5-turbo
3. CURRENTLY NOT WORKING IN GOOGLE DOCS. FIXING SOON.

## Features

- Highlight text on any webpage
- Ask questions related to the selected text
- Get ChatGPT responses without leaving the browser

## Installation

1. Download or clone this repository
2. Go to line 28 in popup.js where it says const apiKey = 'and put your api key here'
3. Open Chrome and navigate to `chrome://extensions`
4. Enable "Developer mode" in the top right corner
5. Click "Load unpacked" and select the downloaded/cloned repository folder
6. The extension is now installed and ready to use!

## Usage

1. Highlight text on a webpage
2. Right-click the selected text and choose "Ask ChatGPT" from the context menu
3. A popup will appear with the selected text and a button to ask ChatGPT
4. Click the "Ask ChatGPT" button and wait for the response
5. The response will appear in the same popup

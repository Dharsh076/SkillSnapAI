chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractText") {
    const selectedText = window.getSelection().toString();
    sendResponse({ text: selectedText });
  }
});

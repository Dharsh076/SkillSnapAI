
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractText") {
    const selection = window.getSelection().toString();
    sendResponse({ text: selection });
  }
});

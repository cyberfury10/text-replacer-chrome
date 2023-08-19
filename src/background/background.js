chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    if (tab.url) {
      chrome.tabs.sendMessage(tabId, {
        state: `${tab.url} Loaded`,
      })
    }
  }
})
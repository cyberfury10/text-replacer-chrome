chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(`On Updated`)
    if (changeInfo.status === "complete") {
      if (tab.url) {
        console.log(`${tab.url} Sending Message`)
        chrome.tabs.sendMessage(tabId, {
          state: `${tab.url} Loaded`,
        })
      }
    }
  })
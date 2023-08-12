function recursivelyReplaceText(addedNode) {
    addedNode.childNodes.forEach((node) => {
      if (node.childNodes.length > 0) {
        recursivelyReplaceText(node)
      }
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent
        const replacedText = text.replace("cyberfury10", "SUCCESS")
  
        if (replacedText !== text) {
          node.data = replacedText
        }
      }
    })
  }
  
  let observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      for (let addedNode of mutation.addedNodes) {
        recursivelyReplaceText(addedNode)
      }
    }
  })
  
  observer.observe(document, { childList: true, subtree: true })
  
  export function saveExtensionData(obj) {
    chrome.storage.local.set({ "data": obj })
  }
  
  export function getExtensionData() {
    chrome.storage.local.get("data", function(fetchedData) {
      alert("fetched: " + JSON.stringify(fetchedData.data));
  });
  }
  
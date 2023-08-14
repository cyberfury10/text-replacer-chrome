let observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    for (let addedNode of mutation.addedNodes) {
      runReplaceTextInWebsites(addedNode)
    }
  }
})
observer.observe(document, { childList: true, subtree: true })

function runReplaceTextInWebsites(addedNode) {
  getExtensionData("websites", (websites) => {
    for (const { hostName, isEnabled } of websites) {
      if (window.location.host.includes(hostName) && isEnabled === true) {
        findAndReplaceStrings(addedNode, hostName)
      }
    }
  })
}

function findAndReplaceStrings(addedNode) {
  getExtensionData("findAndReplace", (findAndReplace) => {
    for (const { find, replace, isEnabled } of findAndReplace) {
      if (isEnabled === true) {
        recursivelyReplaceText(addedNode, find, replace)
      }
    }
  })
}

function recursivelyReplaceText(addedNode, find, replace) {
  addedNode.childNodes.forEach((node) => {
    if (node.childNodes.length > 0) {
      recursivelyReplaceText(node, find, replace)
    }
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent
      const replacedText = text.replace(find, replace)

      if (replacedText !== text) {
        node.data = replacedText
      }
    }
  })
}

export function saveExtensionData(key, obj) {
  chrome.storage.local.set({ [key]: obj })
}

export function getExtensionData(key, callBack) {
  chrome.storage.local.get([key], function (data) {
    callBack(data[key])
  });
}

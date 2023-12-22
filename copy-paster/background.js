chrome.commands.onCommand.addListener((command) => {
    console.log(`Command: ${command}`);
    if (command === "copy-all") {
        getCurrentTab().then((tabId) => {
            chrome.tabs.sendMessage(tabId, {action: 'copy-all'})
        })
    }
});

chrome.runtime.onMessage.addListener((req, ...others) => {
    console.log(req, ...others)
})

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting === "hello")
            sendResponse({farewell: "goodbye"});
    }
);



async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id;
}

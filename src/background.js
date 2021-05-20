chrome.runtime.onInstalled.addListener(({ reason, version }) => {
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {

        /*
            Setting the data for the first time!
        */

        if (chrome.storage.sync.get("instances") == null)
            chrome.storage.sync.set({ instances: {} });

        if (chrome.storage.sync.get("instance_groups") == null)
            chrome.storage.sync.set({ instance_groups: {} });

        if (chrome.storage.sync.get("button_position") == null)
            chrome.storage.sync.set({ button_position: "bottom-right" });

        showWelcome();
    }
});


function showWelcome(info, tab) {
    let url = chrome.runtime.getURL("welcome.html");
    chrome.tabs.create({ url });
}
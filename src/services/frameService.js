export function showFrame(frameName, parameters = ""){
    chrome.runtime.sendMessage({
        action: "show-frame", 
        frame: frameName,
        parameters: parameters
    });
}



function readSyncStorage(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([key], function(result) {
            if (Object.values(result)[0] != undefined) {
                resolve(Object.values(result)[0]);
            } else {
                reject();
            }
        });
    });
}
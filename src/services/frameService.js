async function createInstanceGroup(name){
    const instanceGroups = await readSyncStorage("instance_groups");
    instanceGroups[name] = {}
    chrome.storage.sync.set({"instance_groups": instanceGroups});
}

export function showFrame(frameName){
    chrome.runtime.sendMessage({action: "show-frame", frame: frameName});
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
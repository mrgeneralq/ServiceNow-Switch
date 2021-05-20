async function getInstanceByPrefix(prefix){
    const instances = await readSyncStorage("instances");
    return instances[prefix];
}

async function createInstance(prefix, data){
    const instances = await readSyncStorage("instances");
    instances[prefix] = data;
    chrome.storage.sync.set({"instances": instances});
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
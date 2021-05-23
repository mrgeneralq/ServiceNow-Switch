import {Instance} from '../models/instance.js';

async function getInstanceByPrefix(prefix){
    const instances = await readSyncStorage("instances");
    return instances[prefix];
}

export async function createInstance(instance){
    const instances = await readSyncStorage("instances");
    instances[instance.prefix] = instance;
    chrome.storage.sync.set({"instances": instances});
}

export async function getAllInstancesByGroup(groupName){
    
    const allData = await readSyncStorage("instances");
    var instances = [];

    for (var key in allData) {
        if (!Object.prototype.hasOwnProperty.call(allData, key)) 
        continue;

        var val = allData[key];

        if(val.instanceGroup != groupName)
        continue;

        const instance = new Instance(val);
        instances.push(instance);
    }

    return instances;
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
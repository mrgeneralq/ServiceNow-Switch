import { InstanceGroup } from '../models/instanceGroup.js';

 export async function createInstanceGroup(name){
    const instanceGroups = await readSyncStorage("instance_groups");
    instanceGroups[name] = {}
    chrome.storage.sync.set({"instance_groups": instanceGroups});
}

 export async function getInstanceGroupByName(name){
    const instanceGroups = await readSyncStorage("instance_groups");
    return instanceGroups[name];
}

export async function getAllGroups(){
    const AllData = await readSyncStorage("instance_groups");

    //TODO later on fetch actual instance group data
    var groups = [];

    for (var key in AllData) {
        if (!Object.prototype.hasOwnProperty.call(AllData, key)) 
        continue;

        var val = AllData[key];
        const group = new InstanceGroup({
            name: key
        });

        groups.push(group);
    }

    return groups;
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
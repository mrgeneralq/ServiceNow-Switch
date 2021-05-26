class InstanceGroupService {

    static async createInstanceGroup(instanceGroup){
        const instanceGroups = await readSyncStorage("instance_groups");
        instanceGroups[instanceGroup["name"]] = instanceGroup;
    
        chrome.storage.sync.set({"instance_groups": instanceGroups});
    }
    
    static async getInstanceGroupByName(name){
        const instanceGroups = await readSyncStorage("instance_groups");
        return instanceGroups[name];
    }
    
    static async groupExists(groupName){
        const allData = await readSyncStorage("instance_groups");
        return Object.prototype.hasOwnProperty.call(allData, groupName);
    }
    
    static async removeGroup(groupName){
        const allData = await readSyncStorage("instance_groups");
        delete allData[groupName];
        chrome.storage.sync.set({"instance_groups": allData});
    }
    
    static async getAllGroups(){
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
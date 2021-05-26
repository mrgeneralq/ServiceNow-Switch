class InstanceService {

    static async getInstanceByPrefix(prefix){
        const instances = await readSyncStorage("instances");
        console.log(instances);
        return instances[prefix];
    }
    
    static async createInstance(instance){
        const instances = await readSyncStorage("instances");
        instances[instance.prefix] = instance;
        chrome.storage.sync.set({"instances": instances});
    }
    
     static async removeInstance(prefix){
        const allData = await readSyncStorage("instances");
        delete allData[prefix];
        chrome.storage.sync.set({"instances": allData});
    }
    
     static async getAllInstancesByGroup(groupName){
        
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
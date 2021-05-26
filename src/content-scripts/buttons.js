(async ()=> {

    const urlDomain = location.host.split('.')[0];
    const instance = await InstanceService.getInstanceByPrefix(urlDomain);

    const instances = await InstanceService.getAllInstancesByGroup(instance.instanceGroup);
    for(var instanceItem of instances){
      //  alert(instanceItem.label);
    }

    chrome.runtime.onMessage.addListener(async(message, sender, sendResponse) => {
        console.log("aaa",message);

        if(message.action == "refresh-buttons"){
            alert("refresh buttons!");
        }

    });


})();
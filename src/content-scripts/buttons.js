chrome.runtime.onMessage.addListener(async(message) => {
    if(message.action == "update-position"){
        document.querySelectorAll("span").forEach(d =>{
            d.style.color = "blue";
        })
    }

    if(message.action == "create-instance-group"){
        
        let answer = prompt("What is the group name you are trying to use?");
        
        if(!answer)
        return;

        let instanceGroup = await getInstanceGroupByName(answer);
        if(instanceGroup != null){
            alert("This instance already exists!");
            return;
        }

        await createInstanceGroup(answer);
        alert("Instance group created!");
    }


    if(message.action == "add-to-existing-group"){
        const instanceGroupName = prompt("Which group do you want to assign it to?");

        if(!instanceGroupName)
            return;

        let instanceGroup = await getInstanceGroupByName(instanceGroupName);
        if(instanceGroup == null){
            alert("This instance group does not exist");
            return;
        }

        const newInstance = {
            "order": 1,
            "label": "DEV",
            "background": "darkgreen",
            "fg-color": "white",
            "instance_group": instanceGroupName
            }


       await createInstance(currentPrefix, newInstance);
        alert("Instance added to instance group: " + instanceGroupName);

    }



})

const currentPrefix = location.hostname.replace(".service-now.com", "");
(async ()=> {

    const instance = await getInstanceByPrefix(currentPrefix);
    if(instance == null)
    alert("instance not found")
    else
    alert("instance found");

})();
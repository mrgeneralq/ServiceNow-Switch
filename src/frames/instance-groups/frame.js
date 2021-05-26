window.onload = async () => {
    setRemoveButtonEnabled(false);
    loadInstanceGroups();
}

document.querySelector("#instance-groups").addEventListener("change", function(){
    const value = document.querySelector("#instance-groups").value;
    if(value)
    setRemoveButtonEnabled(true);
    else
    setRemoveButtonEnabled(false);
});


async function loadInstanceGroups(){
    const groups = await InstanceGroupService.getAllGroups();
    const selectBox = document.querySelector("#instance-groups");

    selectBox.innerHTML = '';

    for(var group of groups){
        var opt = document.createElement("option");
        opt.value= group.name;
        opt.innerHTML = group.name;
        selectBox.appendChild(opt);
    }
}


document.querySelector("#add-group").addEventListener("click",async function(){

    var answer = prompt("What is the name of the group you want to add?");

    if(!answer)
    return;

    if(await InstanceGroupService.groupExists(answer)){
        alert("This group already exists!");
        return;
    }

    const group = new InstanceGroup({
        "name": answer
    });

    await InstanceGroupService.createInstanceGroup(group);
    alert("Group created!");

    loadInstanceGroups();

});

document.querySelector("#remove-group").addEventListener("click",async function(){

    const groupName = document.querySelector("#instance-groups").value;

    if(!groupName){
        alert("No group selected!");
        return;
    }

    if(!InstanceGroupService.groupExists(groupName)){
        alert("This group does not exist!");
        return;
    }

    const instances = await InstanceService.getAllInstancesByGroup(groupName);
    for(var instance of instances)
        await InstanceService.removeInstance(instance.prefix);

    await InstanceGroupService.removeGroup(groupName);
    alert("Group deleted!");

    loadInstanceGroups();
    setRemoveButtonEnabled(false);
});


function setRemoveButtonEnabled(enabled){
    document.querySelector("#remove-group").disabled = !enabled;
}
import * as instanceGroupService from '../../services/instanceGroupService.js';
import {InstanceGroup} from '../../models/instanceGroup.js';

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
    const groups = await instanceGroupService.getAllGroups();
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

    if(await instanceGroupService.groupExists(answer)){
        alert("This group already exists!");
        return;
    }

    const group = new InstanceGroup({
        "name": answer
    });

    await instanceGroupService.createInstanceGroup(group);
    alert("Group created!");

    loadInstanceGroups();

});

document.querySelector("#remove-group").addEventListener("click",async function(){

    const groupName = document.querySelector("#instance-groups").value;

    if(!groupName){
        alert("No group selected!");
        return;
    }

    if(!instanceGroupService.groupExists(groupName)){
        alert("This group does not exist!");
        return;
    }

    await instanceGroupService.removeGroup(groupName);
    alert("Group deleted!");

    loadInstanceGroups();
    setRemoveButtonEnabled(false);
});


function setRemoveButtonEnabled(enabled){
    document.querySelector("#remove-group").disabled = !enabled;
}
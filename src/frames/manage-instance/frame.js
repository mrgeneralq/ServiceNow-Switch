import * as instanceGroupService from '../../services/instanceGroupService.js';
import * as frameService from '../../services/frameService.js';

window.onload = async () => {
    loadInstanceGroups();
}

document.querySelector("#home").addEventListener("click", function(){
    frameService.showFrame("home");
});

async function loadInstanceGroups(){
    const groups = await instanceGroupService.getAllGroups();
    const selectBox = document.querySelector("#instance-group");

    selectBox.innerHTML = '';

    for(var group of groups){
        var opt = document.createElement("option");
        opt.value= group.name;
        opt.innerHTML = group.name;
        selectBox.appendChild(opt);
    }
}

document.querySelector("#create-update").addEventListener("click", function(){
    alert("creation test");
});
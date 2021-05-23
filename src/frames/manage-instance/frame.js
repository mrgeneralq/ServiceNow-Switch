import * as instanceGroupService from '../../services/instanceGroupService.js';
import * as frameService from '../../services/frameService.js';
import * as instanceService from '../../services/instanceService.js';
import {Instance} from '../../models/instance.js';

const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e);

let _currentInstance;

window.onload = async () => {

    loadInstanceGroups();

    let url = new URLSearchParams(location.search);
    const id = url.get("id");


    if(id != null)
    setInstance(await instanceService.getInstanceByPrefix(id));

}

$("#home").addEventListener("click", function(){
    frameService.showFrame("home");
});


chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
    if(message.action == "edit-instance"){
        alert("edit is running");
        const prefix = message.instance;
        const instance = await instanceService.getInstanceByPrefix(prefix);
        setInstance(instance);
    }

  });

async function loadInstanceGroups(){
    const groups = await instanceGroupService.getAllGroups();
    const selectBox = $("#instance-group");

    selectBox.innerHTML = '';

    for(var group of groups){
        var opt = document.createElement("option");
        opt.value= group.name;
        opt.innerHTML = group.name;
        selectBox.appendChild(opt);
    }
}

$("#create-update").addEventListener("click", async function(){

    const instance = new Instance();

    instance.prefix = $("#prefix").value;
    instance.instanceGroup = $("#instance-group").value;
    instance.label = $("#label").value;
    instance.backgroundColor = $("#background-color").value;
    instance.textColor = $("#text-color").value;


    await instanceService.createInstance(instance);

    alert("instance created!");
    frameService.showFrame("home");
});

function setInstance(instance){

    const prefix = $("#prefix");
    prefix.readOnly = true;
    prefix.disabled = true;
    prefix.value = instance.prefix;

    const instanceGroup = $("#instance-group");
    instanceGroup.readOnly = true;
    instanceGroup.disabled = true;

    $("#instance-group").value = instance.instanceGroup;
    $("#label").value = instance.label;
    $("#background-color").value = instance.backgroundColor;
    $("#text-color").value = instance.textColor;

    $("#create-update").innerHTML = "Update";

}
import * as instanceGroupService from '../../services/instanceGroupService.js';
import * as frameService from '../../services/frameService.js';
import * as instanceService from '../../services/instanceService.js';
import {Instance} from '../../models/instance.js';

const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e); 

window.onload = async () => {
    loadInstanceGroups();
}

$("#home").addEventListener("click", function(){
    frameService.showFrame("home");
});


chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
    alert("message");
    if(message.action == "edit-instance"){
        alert("edit instance");
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

}
const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e);

let _currentInstance;
let _currentPrefix;

window.onload = async () => {

    await loadInstanceGroups();

    let url = new URLSearchParams(location.search);
    const id = url.get("id");
    const group = url.get("instance_group");

    if (id != null) {
        _currentPrefix = id;
        setInstance(await InstanceService.getInstanceByPrefix(id));
        setPrefix(id);
    } else {
        $("#delete").remove();
    }

    if (group != null)
        setGroup(group);


    loadListeners();
}



chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    if (message.action == "edit-instance") {
        const prefix = message.instance;
        const instance = await InstanceService.getInstanceByPrefix(prefix);
        setInstance(instance);
    }

});

async function loadInstanceGroups() {
    const groups = await InstanceGroupService.getAllGroups();
    const selectBox = $("#instance-group");

    selectBox.innerHTML = '';

    for (var group of groups) {
        var opt = document.createElement("option");
        opt.value = group.name;
        opt.innerHTML = group.name;
        selectBox.appendChild(opt);
    }
}

$("#create-update").addEventListener("click", async function () {

    if(document.querySelector("#form-instance").checkValidity() == false)
    return;

    const instance = _currentInstance  || new Instance();

    instance.prefix = $("#prefix").value;
    instance.instanceGroup = $("#instance-group").value;
    instance.label = $("#label").value;
    instance.backgroundColor = $("#background-color").value;
    instance.textColor = $("#text-color").value;

    await InstanceService.createInstance(instance);
    FrameService.showFrame("home", "?instance_group=" + instance.instanceGroup);
});


$("#delete").addEventListener("click", async function () {
    await InstanceService.removeInstance(_currentPrefix);
    const groupName = $("#instance-group").value;
    FrameService.showFrame("home", "?instance_group=" + groupName);
    alert("Instance Removed!");
});

function setInstance(instance) {

    _currentInstance = instance;

    const prefix = $("#prefix");
    prefix.value = instance.prefix;

    const instanceGroup = $("#instance-group");
    instanceGroup.value = instance.instanceGroup;

    $("#label").value = instance.label;
    $("#background-color").value = instance.backgroundColor;
    $("#text-color").value = instance.textColor;

    $("#create-update").innerHTML = "Update";

}

function setPrefix(prefixName) {
    var prefix = $("#prefix");
    prefix.value = prefixName;
    prefix.readOnly = true;
    prefix.disabled = true;
}

function setGroup(groupName) {

    var group = $("#instance-group");
    group.value = groupName;
    group.readOnly = true;
    group.disabled = true;
}


function loadListeners(){

    const selectBox = $("#instance-group");

    $("#home").addEventListener("click", function () {
        FrameService.showFrame("home","?instance_group=" + selectBox.value);
    });
}
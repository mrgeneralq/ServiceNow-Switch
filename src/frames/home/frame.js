import * as instanceGroupService from '../../services/instanceGroupService.js';
import * as frameService from '../../services/frameService.js';
import * as instanceService from '../../services/instanceService.js';

window.onload = async () => {
    await loadInstanceGroups();
    await loadInstances();
}

document.querySelector("#instance-group").addEventListener("change", function(){
    const value = document.querySelector("#instance-group").value;
    loadInstances();
});

document.querySelector("#add-instance").addEventListener("click", function(){
  frameService.showFrame("manage-instance");
});


var fixHelperModified = function(e, tr) {
    var $originals = tr.children();
    var $helper = tr.clone();
    $helper.children().each(function(index) {
        $(this).width($originals.eq(index).width())
    });
    return $helper;
},
    updateIndex = function(e, ui) {
        $('td.index', ui.item.parent()).each(function (i) {
            $(this).html(i+1);
        });
        $('input[type=text]', ui.item.parent()).each(function (i) {
            $(this).val(i + 1);
        });
    };

$("#tbl-instances tbody").sortable({
    helper: fixHelperModified,
    stop: updateIndex
}).disableSelection();

    $("tbody").sortable({
    distance: 5,
    delay: 100,
    opacity: 0.6,
    cursor: 'move',
    update: function() {}
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

async function loadInstances(){

    const instanceGroupName = document.querySelector("#instance-group").value;

    const instances = await instanceService.getAllInstancesByGroup(instanceGroupName);

    const tbody = document.querySelector("#instances tbody");
    tbody.innerHTML = "";


    for(var instance of instances){

        const row = document.createElement("tr");
        row.setAttribute("id", "edit-" + instance.prefix);

        const dragColumn = document.createElement("td");
        const dragIcon = document.createElement("i");
        dragIcon.setAttribute("class", "fa fa-bars");
        dragIcon.setAttribute("aria-hidden", "true");
        dragColumn.appendChild(dragIcon);

        const instanceColumn = document.createElement("td");
        instanceColumn.innerText = instance.label;

        const editColumn = document.createElement("td");
        const editIcon = document.createElement("i");
        editIcon.setAttribute("class", "fa fa-pencil edit-icon");
        editIcon.setAttribute("aria-hidden", "true");
        editColumn.appendChild(editIcon);

        row.appendChild(dragColumn);
        row.appendChild(instanceColumn);
        row.appendChild(editColumn);

        tbody.appendChild(row);

    }

    document.querySelectorAll(".edit-icon").forEach(function(element) {
        element.addEventListener("click", function(e){
            const instancePrefix = e.target.parentNode.parentNode.id.replace("edit-", "");

            alert("click");
           // frameService.showFrame("manage-instance");
            chrome.runtime.sendMessage({
                action: "edit-instance",
                instance: instancePrefix
            });
        });
    });
}
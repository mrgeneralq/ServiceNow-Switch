window.onload = async () => {
    await loadInstanceGroups();

    let url = new URLSearchParams(location.search);
    const instanceGroup = url.get("instance_group");

    if (instanceGroup != null) 
        setGroup(instanceGroup);

    await loadInstances();
}

document.querySelector("#instance-group").addEventListener("change",async function(){
   await loadInstances();
});

document.querySelector("#add-instance").addEventListener("click", function(){
    const instanceGroup = document.querySelector("#instance-group").value;
    FrameService.showFrame("manage-instance", "?instance_group=" + instanceGroup);
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
    update:async function(event, ui) {

        const table = document.querySelector("#instances tbody");

        for(var i = 0; i < table.rows.length; i++){

            const row = table.rows[i];
            var instance = await InstanceService.getInstanceByPrefix(row.dataset.instance);
            instance.order = i + 1;

           await InstanceService.createInstance(instance);
        }

        console.log('Instance list updated!');
    }
    });

async function loadInstanceGroups(){
    const groups = await InstanceGroupService.getAllGroups();
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
    console.log(instanceGroupName);

    const instances = await InstanceService.getAllInstancesByGroup(instanceGroupName);
    console.log(instances);
    
    instances.sort((a, b) => (a.order - b.order));

    const tbody = document.querySelector("#instances tbody");

    tbody.innerHTML = "";

    for(var instance of instances){

        const row = document.createElement("tr");
        row.setAttribute("data-instance", instance.prefix);

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
            const instancePrefix = e.target.parentNode.parentNode.dataset.instance;
            const instanceGroup = document.querySelector("#instance-group").value;
            
            FrameService.showFrame("manage-instance", "?id=" + instancePrefix + "&instance_group=" + instanceGroup);
        });
    });
}


function setGroup(group){
    const selectBox = document.querySelector("#instance-group");
    selectBox.value = group;
}
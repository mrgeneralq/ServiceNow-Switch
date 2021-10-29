const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e); 

let _currentPrefix = "";


$("#btn-add-group").addEventListener("click",async function(e){

  chrome.runtime.sendMessage({action: "show-frame", frame: "manage-instance"}, function(response) {

  });
});

$("#btn-remove-instance").addEventListener("click", async function(e){

  InstanceService.removeInstance(_currentPrefix);
  alert("Instance unlinked!");

});

window.onload = async () => {

  $("#btn-add-group").style.display = "none";
  $("#btn-remove-instance").style.display = "none";

  let url = new URLSearchParams(location.search);
  const id = url.get("id");
  const group = url.get("instance_group");

  if(id != null){

    const instance = await InstanceService.getInstanceByPrefix(id);
    if(instance != null)
      setInstance(instance);
    ;

  }

    function setInstance(instance){

      $("#btn-add-group").style.display = "none";
      $("#btn-remove-instance").style.display = "block";

      var groupName = $("#group-name");
      groupName.innerHTML = instance.instanceGroup;

      _currentPrefix = instance.prefix;
    }

  }


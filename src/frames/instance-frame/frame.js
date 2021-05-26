const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e); 

$("#btn-add-group").addEventListener("click",async function(e){

  chrome.runtime.sendMessage({action: "show-frame", frame: "manage-instance"}, function(response) {

  });

});

window.onload = async () => {

let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
      let url = new URL(tab.url);
      const currentPrefix = url.hostname.split(".")[0];
    
      var instance = InstanceService.getInstanceByPrefix(currentPrefix);
    
      var groupName = $("#customer-name");
    
      if(instance == null){
        groupName.innerHTML = "No instance group";
        setVisibility("#btn-add-group", true);
        setVisibility("#btn-remove-instance", false);
        return;
      }
      
      groupName.innerHTML = instance.instance_group;
      setVisibility("#btn-add-group", false);
      setVisibility("#btn-remove-instance", true);

      chrome.tabs.sendMessage(tab.id ,{action: "grab-logo"}, function(response) {
        $("#img-logo").src = response.logo;
      });
    }


    function setVisibility(query, bool){
        $(query).style.display = (bool) ? "block": "none"
    }



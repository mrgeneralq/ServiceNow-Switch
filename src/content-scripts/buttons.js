(async ()=> {
    loadButtons();
})();

chrome.runtime.onMessage.addListener(async(message, sender, sendResponse) => {
    
    if(message.action == "refresh-buttons"){
        loadButtons();
    }

});

async function loadButtons(){

    var toolbar = document.querySelector("#switch-toolbar");
    if(toolbar) toolbar.remove();

    const urlDomain = location.host.split('.')[0];
    const instance = await InstanceService.getInstanceByPrefix(urlDomain);

    const instances = await InstanceService.getAllInstancesByGroup(instance.instanceGroup);
    instances.sort((a, b) => (a.order - b.order));

    const buttonToolbar = document.createElement("div");
    buttonToolbar.setAttribute("id", "switch-toolbar");

    for(var instanceItem of instances){
        const button = document.createElement("button");
        button.innerHTML = instanceItem.label;
        button.setAttribute("data-prefix", instanceItem.prefix);


        const inactiveStyle = "color:black;background-color:white";
        const activeStyle = "color:" + instanceItem.textColor + ";background-color:" + instanceItem.backgroundColor + ";"; 

        const buttonStyle = (urlDomain == instanceItem.prefix) ? activeStyle: inactiveStyle;
        button.setAttribute("style", buttonStyle);

        button.addEventListener("click", function(event){
            
            var instancePrefix = event.target.dataset.prefix;
            navigateToInstance(instancePrefix);

        });
        
        buttonToolbar.appendChild(button);
    }

    const body = document.querySelector("body");
    body.appendChild(buttonToolbar);
}

function navigateToInstance(instancePrefix){

    var parameters = (location.pathname+location.search).substr(1);
    var beginUrl = window.location.protocol + "//";
    var navUrl = beginUrl + instancePrefix + ".service-now.com/" + parameters;

    location.href = navUrl;

}
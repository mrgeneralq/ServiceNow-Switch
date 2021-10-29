const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e); 


window.onload = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let url = new URL(tab.url);

  const currentPrefix = url.hostname.split(".")[0];
  setInstanceframe(currentPrefix);
}


$("#home").addEventListener("click", function(e){
  showFrame('home');
  setActiveTab("home");
});

$("#instance-groups").addEventListener("click", function(e){
  showFrame("instance-groups");
  setActiveTab("instance-groups");

});



chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

  if(message.action == "show-frame")
     showFrame(message.frame, message.parameters);
});

function showFrame(frameName, parameters = ""){
  $("#navigation-frame").src = "frames/" + frameName + "/index.html" + parameters;
}

function setInstanceframe(instancePrefix){

  const prefix = (instancePrefix != null) ? "?id=" + instancePrefix: "";
  $("#instance-frame").src ="frames/instance-frame/index.html" + prefix;

}

function setActiveTab(tabName){

  const allTabs = ["home","settings","instance-groups"];

  for(var tab of allTabs)
    $("#" + tab).classList.remove("active");

  $("#" + tabName).classList.add("active");

}

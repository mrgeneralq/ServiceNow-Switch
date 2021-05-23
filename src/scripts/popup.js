const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e); 

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

function setActiveTab(tabName){

  const allTabs = ["home","settings","instance-groups"];

  for(var tab of allTabs)
    $("#" + tab).classList.remove("active");

  $("#" + tabName).classList.add("active");

}

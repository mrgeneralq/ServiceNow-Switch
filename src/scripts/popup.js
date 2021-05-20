const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e); 

$("#home").addEventListener("click", function(e){
  showFrame('home');
});

$("#instance-groups").addEventListener("click", function(e){
  $("#navigation-frame").src = "frames/instance-groups/index.html";
});


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

  if(message.action == "show-frame")
     showFrame(message.frame);

});

function showFrame(frameName){
  $("#navigation-frame").src = "frames/" + frameName + "/index.html";
}

function test(){
  alert("test");
}


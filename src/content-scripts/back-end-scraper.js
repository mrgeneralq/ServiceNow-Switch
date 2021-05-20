chrome.runtime.onMessage.addListener(async(message, sender, sendResponse) => {

    if(message.action == "grab-logo"){
        const img = document.querySelector("#mainBannerImage16");
        //const bgColor = document.defaultView.getComputedStyle(header,null).backgroundColor;
        sendResponse({logo: img.src});
    }
});


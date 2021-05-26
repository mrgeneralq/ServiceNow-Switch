 class FrameService {
    static showFrame(frameName, parameters = ""){
        chrome.runtime.sendMessage({
            action: "show-frame", 
            frame: frameName,
            parameters: parameters
        });
    }
 }
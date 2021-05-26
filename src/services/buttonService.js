class ButtonService {

    static async refreshButtons(tab){
        var [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.tabs.sendMessage(tab.id ,{action: "refresh-buttons"});
    }
}
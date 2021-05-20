console.log('script ran');
document.querySelector('img').classList.add('spinspinspin');

var btn = document.createElement('button');
btn.innerText = 'hi';
btn.id = 'test';

document.querySelector('body').appendChild(btn);

btn.addEventListener('click', () =>{
    console.log('I set data');
    chrome.storage.local.set({"password": "123"});
    chrome.runtime.sendMessage({message: "check storage"});
})
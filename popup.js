let password;
chrome.storage.local.get(['password'],(result)=>{
	password =  (result.password)
	init();
});
let onOff;

chrome.storage.local.get(['on_off'],(result)=>{
	onOff =  (result.on_off)
});
function init(){
	document.querySelector("button.toggle-on").addEventListener('click',()=>{
		onOff = onOff === "on"?"off":"on";
		chrome.storage.local.set({on_off:onOff})
	document.querySelector("button.toggle-on").innerHTML = onOff;
	})
	console.log(password)
	if(!password){
		//password form
		document.querySelector("#input-id-container").style.display = "block"
		
		//submit 될시
		document.querySelector("#input-id-container").addEventListener("submit",(e)=>{
			e.preventDefault();
			const value = document.querySelector("#input-id-container .input-password").value;
			//password가 없다면 비밀번호 저장
			const hash = CryptoJS.MD5(value.toString()).toString();
			chrome.storage.local.get(['password'],(result)=>{
				if(!result.password)
					chrome.storage.local.set({password:hash})
				else{
					alert("이미 비밀번호가 존재합니다!!")
				}
			});
			document.querySelector("#input-id-container").style.display = "none";
			chrome.storage.local.get(['password'],(result)=>{
				password = result.password;
			});
		})
	}
}





function clearStorage(){
	chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
        console.error(error);
    }
    // do something more
});
}
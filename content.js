let isPassed = false;
let isFirst = true;
let interval;

let password;
chrome.storage.local.get(['password'],(result)=>{
	password =  (result.password)
});
let onOff;


function init() {
	console.log("start")
	window.addEventListener('load',()=>{
		makeDiv();
	})
	window.addEventListener('focus', function() {
		if(isPassed){
			alert("hi")
		} else{
			if(isFirst){
				makeDiv();
			}
		}
	}, false);
	window.addEventListener('blur', function() {
		isPassed = false;
		makeDiv();
		isFirst = true;
	}, false);
}
	

chrome.storage.local.get(['on_off'],(result)=>{
	onOff =  (result.on_off)
	if(onOff==="on")
	init()
});


function makeDiv(){
	if(!document.querySelector(".pass-btn-on-extension") && !isPassed){
		const div = document.createElement("div")
		document.body.appendChild(div)
		const title = document.head.querySelector("title").innerText;
		document.head.querySelector("title").innerText = "locked-site"
		const imgURL = chrome.runtime.getURL('./lock.png')
		const img = document.createElement('div');
		img.innerHTML='<img class="lock-icon" src="'+imgURL+'"><br>'
		div.className = "pass-btn-on-extension";
		const form = document.createElement("form")
		form.className="input-container-on-extension"
		form.innerHTML = "<input type='password' required autofocus/><button type='submit'>submit</button>"
		form.addEventListener("submit",(e)=>{
			e.preventDefault();
			const value = document.querySelector(".input-container-on-extension input").value;
			if(CryptoJS.MD5(value).toString() === password){
				isPassed = true;
				const removeDiv = document.querySelector(".pass-btn-on-extension")
				clearInterval(interval)
				document.body.removeChild(removeDiv)
				document.head.querySelector("title").innerText = title;
			} else{
				alert("wrong password");
			}
		})
		div.appendChild(form)
		document.querySelector(".pass-btn-on-extension").appendChild(img);
		document.querySelector(".pass-btn-on-extension").querySelector("input").focus();
		isFirst = false;
	}
	if(document.querySelector(".pass-btn-on-extension"))
	{
		//document.querySelector(".pass-btn-on-extension").querySelector("input").focus();
	}
}

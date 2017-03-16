/*
// Saves options to chrome.storage.sync.
function save_options() {
  var color = document.getElementById('color').value;
  var likesColor = document.getElementById('like').checked;
  chrome.storage.sync.set({
    favoriteColor: color,
    likesColor: likesColor
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    favoriteColor: 'red',
    likesColor: true
  }, function(items) {
    document.getElementById('color').value = items.favoriteColor;
    document.getElementById('like').checked = items.likesColor;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
*/

function selectOption(leftSel, rightSel, leftX, rightX, leftY, rightY){
	
	rightSel.style.display = "block";
	rightX.style.display = "none";
	rightY.style.display = "none";

	leftSel.style.borderStyle = "solid";
	leftX.style.borderStyle = "none";
	leftY.style.borderStyle = "none";

}

function leftMenu(){
	var about = document.getElementById("about");
	var keys = document.getElementById("keys");
	var config = document.getElementById("configuration");

	var a = document.getElementById("optionabout");
	var k = document.getElementById("optionkeys");
	var c = document.getElementById("optionconf");

	a.addEventListener("click",function(){
		selectOption(a,about,k,keys,c,config);
	});

	k.addEventListener("click",function(){
		selectOption(k,keys,a,about,c,config);
	});
	
	c.addEventListener("click",function(){
		selectOption(c,config,k,keys,a,about);
	});
}

//TO DO
function getPublicKeys(){

/*
<div class="keyPart name">Test User</div>
<div class="keyPart mail">testuser@testserver.com</div>
<div class="keyPart publicKey"> <a href="foo">See public key</a> </div>

<div class="valid"></div>
<div class="trust"></div>
*/

	var sampleKey1 = {
		name : "Eric Clapton",
		mail : "eric@gmail.com",
		publicKey : "public key eric"
	}

	var sampleKey2 = {
		name : "Bob Dylan",
		mail : "bob@gmail.com",
		publicKey : "public key bob"
	}

	var sampleKey3 = {
		name : "Bruce Springsteen",
		mail : "bruce@gmail.com",
		publicKey : "public key bruce"
	}

	keys = [sampleKey1,sampleKey2,sampleKey3];

	return keys;
}

//TO DO
function getPrivateKeys(){

	var sampleKey1 = {
		name : "Eric Clapton",
		mail : "eric@gmail.com",
		privateKey : "private key eric"
	}

	keys = [sampleKey1];

	return keys;
}

function loadPublicKey(key){

	var div = document.createElement("div");
	div.className = "key";

	var divName = document.createElement("div");
	divName.className = "keyPart name";
	divName.innerText = key.name;
	div.appendChild(divName);

	var divMail = document.createElement("div");
	divMail.className = "keyPart mail";
	divMail.innerText = key.mail;
	div.appendChild(divMail);

	var divKey = document.createElement("div");
	divKey.className = "keyPart publicKey";
	divKey.innerText = key.publicKey;
	div.appendChild(divKey);

	var publicKeys = document.getElementById("publicKeys");
	publicKeys.appendChild(div);
}

function loadPrivateKey(key){

	var div = document.createElement("div");
	div.className = "key";

	var divName = document.createElement("div");
	divName.className = "keyPart name";
	divName.innerText = key.name;
	div.appendChild(divName);

	var divMail = document.createElement("div");
	divMail.className = "keyPart mail";
	divMail.innerText = key.mail;
	div.appendChild(divMail);

	var divKey = document.createElement("div");
	divKey.className = "keyPart privateKey";
	divKey.innerText = key.privateKey;
	div.appendChild(divKey);

	var privateKeys = document.getElementById("privateKeys");
	privateKeys.appendChild(div);
}

function loadPublicKeys(){
	keys = getPublicKeys();

	keys.map(function(key){
		loadPublicKey(key);
	});
}

function loadPrivateKeys(){
	keys = getPrivateKeys();

	keys.map(function(key){
		loadPrivateKey(key);
	});
}


function rightMenu(){
	var addkey = document.getElementById("addkey");

	addkey.addEventListener("click",function(){
		// message to the eventPage asking for a new public key

/*
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  			chrome.tabs.sendMessage(tabs[0].id, {msg: "addPublicKey"}, function(response) {
    			console.log("msg addPublicKey enviado");
  			});
		});
*/



		chrome.runtime.sendMessage({msg: "addPublicKey"}, function(response) {

			console.log("msg addPublicKey enviado");

		// TO DO: Handle the response
		});

	});

}


window.onload = function(){

	leftMenu();
	loadPublicKeys();
	loadPrivateKeys();

	rightMenu();


}

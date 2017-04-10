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
		loadPublicKeys();
		loadPrivateKeys();
	});
	
	c.addEventListener("click",function(){
		selectOption(c,config,k,keys,a,about);
	});
}

//TO DO
function getPublicKeys(){ // NOT IN USE

/*
<div class="keyPart name">Test User</div>
<div class="keyPart mail">testuser@testserver.com</div>
<div class="keyPart publicKey"> <a href="foo">See public key</a> </div>

<div class="valid"></div>
<div class="trust"></div>
*/

	/*
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
	*/

	////////////// real getPublicKeys


	// message to the eventPage asking for public keys
	chrome.runtime.sendMessage({msg: "getPublicKeys"}, function(response) {
		// TO DO: Handle the response
		console.log("Options> Public keys received.");

		var pubKeys = response.cnt;
		

		/*	
		for(i=0;i<pubKeys.length;i++){
			console.log(i+">> ");
			console.log(pubKeys[i].userId);
			console.log(pubKeys[i].key);
		}*/

		console.log('-----------------RETURN');
		return pubKeys;
		
	});

	console.log('-----------------CACA');




	//return keys;
}

//TO DO
function getPrivateKeys(){ // NOT IN USE

	var sampleKey1 = {
		name : "Eric Clapton",
		mail : "eric@gmail.com",
		privateKey : "private key eric"
	}

	keys = [sampleKey1];

	return keys;
}

function loadPublicKey(key){

	var divKey = document.createElement("div");
	divKey.className = "armored publicKey";
	divKey.innerText = key.key;
	divKey.id = "PUB_KEY_"+key.userId; //Not sure if using the userid is a good idea

	var divUserId = document.createElement("div");
	divUserId.className = "userId";
	divUserId.innerText = key.userId;

	var divShow = document.createElement("div");
	divShow.className = "show";
	divShow.innerText = "Show key";
	divShow.id = "PUB_SHOW_"+key.userId; //Not sure if using the userid is a good idea

	function toggle(s_id, k_id){
		var s = document.getElementById(s_id);
		var k = document.getElementById(k_id);

		if(s.innerText == "Show key"){
			k.style.display = "flex";
			s.innerText = "Hide key";
		}else{
			k.style.display = "none";
			s.innerText = "Show key";
		}
	}

	var divVisible = document.createElement("div");
	divVisible.className = "visible";
	divVisible.onclick = toggle.bind(null, divShow.id, divKey.id);
	
	var div = document.createElement("div");
	div.className = "key";
	div.appendChild(divVisible);
		divVisible.appendChild(divUserId);
		divVisible.appendChild(divShow);
	div.appendChild(divKey);

	var publicKeys = document.getElementById("publicKeys");
	publicKeys.appendChild(div);

}

//TO DO: If remains being like public keys, unify
function loadPrivateKey(key){

	var divKey = document.createElement("div");
	divKey.className = "armored privateKey";
	divKey.innerText = key.key;
	divKey.id = "PRIV_KEY_"+key.userId; //Not sure if using the userid is a good idea

	var divUserId = document.createElement("div");
	divUserId.className = "userId";
	divUserId.innerText = key.userId;

	var divShow = document.createElement("div");
	divShow.className = "show";
	divShow.innerText = "Show key";
	divShow.id = "PRIV_SHOW_"+key.userId; //Not sure if using the userid is a good idea

	function toggle(s_id, k_id){
		var s = document.getElementById(s_id);
		var k = document.getElementById(k_id);

		if(s.innerText == "Show key"){
			k.style.display = "flex";
			s.innerText = "Hide key";
		}else{
			k.style.display = "none";
			s.innerText = "Show key";
		} 
	}

	var divVisible = document.createElement("div");
	divVisible.className = "visible";
	divVisible.onclick = toggle.bind(null, divShow.id, divKey.id);
	
	var div = document.createElement("div");
	div.className = "key";
	div.appendChild(divVisible);
		divVisible.appendChild(divUserId);
		divVisible.appendChild(divShow);
	div.appendChild(divKey);

	var publicKeys = document.getElementById("privateKeys");
	publicKeys.appendChild(div);
}

function loadPublicKeys(){
	//keys = getPublicKeys();

	var pubKeys = document.getElementById("publicKeys");
	var old = pubKeys.children;
	for(i=old.length;i>0;i--){
		old[i-1].remove();
	}

	// message to the eventPage asking for public keys
	chrome.runtime.sendMessage({msg: "getPublicKeys"}, function(response) {
		
		console.log("Options> Public keys received.");
		var keys = response.cnt;

		if(keys.length == 0){
			var div = document.createElement("div");
			div.innerHTML = "<i>No keys</i>";
			var keys = document.getElementById("publicKeys");
			keys.appendChild(div);
		}else{
			keys.map(function(key){
				loadPublicKey(key);
			});	
		}

	});
}

function loadPrivateKeys(){
	//keys = getPrivateKeys();

	var privKeys = document.getElementById("privateKeys");
	var old = privKeys.children;
	for(i=old.length;i>0;i--){
		old[i-1].remove();
	}

	// message to the eventPage asking for private keys
	chrome.runtime.sendMessage({msg: "getPrivateKeys"}, function(response) {
		
		console.log("Options> Private keys received.");
		var keys = response.cnt;

		if(keys.length == 0){
			var div = document.createElement("div");
			div.innerHTML = "<i>No keys</i>";
			var keys = document.getElementById("privateKeys");
			keys.appendChild(div);
		}else{
			keys.map(function(key){
				loadPrivateKey(key);
			});	
		}
	});
}


function rightMenu(){
	
	var genkey = document.getElementById("genkey");

	// GENERATE KEY
	genkey.addEventListener("click",function(){

		var form = document.getElementById("generatekey");

		if(form.style.display == "none"){
			form.style.display = "block";
		}else{
			form.style.display = "none";
		}
	});

	var submit = document.getElementById("submit_gen");
	
	submit.addEventListener("click",function(){ //TO DO - Submit with [Enter]

		var input = document.getElementsByClassName("inputkey");
		var name = input[0];
		var mail = input[1];
		var password = input[2];

		var key = {
			name : name.value,
			mail : mail.value,
			password : password.value
		}; //TO DO - Parse input data

		// message to the eventPage asking for a new public key
		chrome.runtime.sendMessage({msg: "generateKey", cnt: key}, function(response) {
			// TO DO - Handle the response
			loadPublicKeys();
			loadPrivateKeys();
		});

		name.value = "";
		mail.value = "";
		password.value = "";
		var form = document.getElementById("generatekey");
		form.style.display = "none";

	});

	// IMPORT KEY
	var impkey = document.getElementById("impkey");
	impkey.addEventListener("click",function(){

		var form = document.getElementById("importkey");

		if(form.style.display == "none"){ //TO DO - Not showing more than one option at time when managing keys
			form.style.display = "block";
		}else{
			form.style.display = "none";
		}
	});

	var submit = document.getElementById("submit_imp");

	submit.addEventListener("click",function(){ //TO DO - Submit with [Enter]

		var armored = document.getElementById("armoredkey");

		// message to the eventPage asking for a new public key
		chrome.runtime.sendMessage({msg: "importPublic", cnt: armored.value}, function(response) {
			// TO DO - Handle the response
			loadPublicKeys();
			loadPrivateKeys();
		});

		armored.value = "";
		var form = document.getElementById("importkey");
		form.style.display = "none";

	});


}


window.onload = function(){

	console.log("PGProject> Loaded options page");

	// !
	chrome.runtime.sendMessage({msg: "initKeys"}, function(response) {
			// TO DO: Handle the response
	});

	leftMenu();
	//loadPublicKeys();
	//loadPrivateKeys();

	rightMenu();

/*
-show keys
show the keys in the keyring

-add key
ask for information or import key
add to the keyring
*/

}

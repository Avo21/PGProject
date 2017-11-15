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
	divShow.innerText = "Ver clave";
	divShow.id = "PUB_SHOW_"+key.userId; //Not sure if using the userid is a good idea

	function toggle(s_id, k_id){
		var s = document.getElementById(s_id);
		var k = document.getElementById(k_id);

		if(s.innerText == "Ver clave"){
			k.style.display = "flex";
			s.innerText = "Ocultar clave";
		}else{
			k.style.display = "none";
			s.innerText = "Ver clave";
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
	divShow.innerText = "Ver clave";
	divShow.id = "PRIV_SHOW_"+key.userId; //Not sure if using the userid is a good idea

	function toggle(s_id, k_id){
		var s = document.getElementById(s_id);
		var k = document.getElementById(k_id);

		if(s.innerText == "Ver clave"){
			k.style.display = "flex";
			s.innerText = "Ocultar clave";
		}else{
			k.style.display = "none";
			s.innerText = "Ver clave";
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
	
	var genkey = document.getElementById("genKey");
	var all = document.getElementsByClassName("kmanager")

	// hide all the input blocks
	function close(){
		for (var i = 0; i < all.length; i++) {
			all[i].style = "display: none;";
		}
	}

	// GENERATE KEY
	genkey.addEventListener("click",function(){

		var form = document.getElementById("generatekey");

		if(form.style.display == "none"){
			close();
			form.style.display = "block";
		}else{
			close();
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
		close();

	});

	// IMPORT PUBLIC KEY
	var impkey = document.getElementById("impPubKey");
	impkey.addEventListener("click",function(){

		var form = document.getElementById("importPub");

		if(form.style.display == "none"){ //TO DO - Not showing more than one option at time when managing keys
			close();
			form.style.display = "block";
		}else{
			close();
		}
	});

	var submit = document.getElementById("submit_pub");

	submit.addEventListener("click",function(){ //TO DO - Submit with [Enter]

		var armored = document.getElementById("armoredPub");

		// message to the eventPage asking for a new public key
		chrome.runtime.sendMessage({msg: "importPublic", cnt: armored.value}, function(response) {
			// TO DO - Handle the response
			loadPublicKeys();
			loadPrivateKeys();
		});

		armored.value = "";
		close();

	});


	// IMPORT MY KEYS
	var impkey = document.getElementById("impPrivKey");
	impkey.addEventListener("click",function(){

		var form = document.getElementById("importPriv");

		if(form.style.display == "none"){ //TO DO - Not showing more than one option at time when managing keys
			close();
			form.style.display = "block";
		}else{
			close();
		}
	});

	var submit = document.getElementById("submit_priv");

	submit.addEventListener("click",function(){ //TO DO - Submit with [Enter]

		var armored = document.getElementById("armoredPriv");

		// message to the eventPage asking for a new public key
		chrome.runtime.sendMessage({msg: "importMyKeys", cnt: armored.value}, function(response) {
			// TO DO - Handle the response
			loadPublicKeys();
			loadPrivateKeys();
		});

		armored.value = "";
		close();

	});


	// SAVE PASSPHRASE
	var submit = document.getElementById("submit_pass");
	
	submit.addEventListener("click",function(){ //TO DO - Submit with [Enter]

		var pass = document.getElementById("inputpass").value;

		// save pass


		// send data to the eventPage to be storaged
		chrome.runtime.sendMessage({msg: "savePassphrase", cnt: pass}, function(response) {
			// TO DO - Handle the response
			
		});

		/*
		// Save data to sessionStorage
		sessionStorage.setItem('psph', pass);

		// Get saved data from sessionStorage
		var data = sessionStorage.getItem('key');

		// Remove saved data from sessionStorage
		sessionStorage.removeItem('key');

		// Remove all saved data from sessionStorage
		sessionStorage.clear();
		*/

	});

}


window.onload = function(){

	console.log("PGProject> Loaded options page");

	// !
	chrome.runtime.sendMessage({msg: "initKeys"}, function(response) {
			// TO DO: Handle the response
	});

	leftMenu();
	rightMenu();

}

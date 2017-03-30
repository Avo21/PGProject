var gmail_textbox_class = "Al editable LW-avf";
var gmail_textbox_table_class = "cf An";
var gmail_inbox_class = "adn ads";
var color = "LightSteelBlue";

var debug = true;
//var keyring;



//temporal, could be done in the eventPage
window.onload = function() {
	
	// Icons stylesheet
	loadIconsStyle();



	toEventPage("initKeys"); //TO DO
	
	/*
	// Keys
	if (keyring == undefined) {
		keyring = generateKeyring();
	}

	// testing. newKeyPair function must be called from a form in a configuration page
	keyring.clear();
	newKeyPair(keyring);
	*/

}


// messages to the eventPage
function toEventPage(message, textbox){
	var cnt = null;
	if(textbox){
		cnt = textbox.innerText;
	}
	chrome.runtime.sendMessage({msg: message, cnt: cnt}, function(response){
		if (debug) {
			console.log("Message [" + message + "] sent from CS to EP");
			console.log("--response from EP: " + response.msg);
		}

		if (response.cnt) {
			replace(textbox, response);
		}

		//return response.cnt;
	})
}

function replace(tb, resp){
	tb.innerText = resp.cnt;
}

function loadIconsStyle(){
	var link = document.createElement("link");
	link.rel = "stylesheet";
	link.href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css";
	document.head.appendChild(link);
}


// temporal, must be done in a better way, and maybe in the eventPage
window.addEventListener("click",function(){
	if (debug){
		console.log("click")
	}

	tbTablesList = getTbTables(gmail_textbox_table_class);
	inboxList = getInbox(gmail_inbox_class);


	for (i = 0; i< tbTablesList.length; i++){
		
		t = tbTablesList[i];
		t.style.backgroundColor = color;

		// pgproject indicates when the button already exists in this table
		// (it's a string)
		if (t.getAttribute("pgproject") != "true") {
			insertDiv(t);
			t.setAttribute("pgproject", "true");
		}
	}

	for (j = 0; j< inboxList.length; j++){
		
		i = inboxList[j];

		// pgproject indicates when the button already exists in this inbox mail
		// (it's a string)
		if (i.getAttribute("pgproject") != "true") {
			insertDivInbox(i);
			i.setAttribute("pgproject", "true");
		}
	}

});




/////// interacting with the website (old HTML.js)


function getTbTables(tbTable_class){
	tbTablesList = document.getElementsByClassName(tbTable_class);
	return tbTablesList;
}

function getInbox(inbox_class){
	inboxList = document.getElementsByClassName(inbox_class);
	return inboxList;
}


// TO DO: Delete duplicated code creating buttons

function createButton_opt(){
	button = document.createElement("button");
	button.className = "pgproject options";
	button.type = "button";
	button.title = "Opcións";
	button.style.float = "right";
	button.style.display = "none";

	button.style.fontSize = "x-large";
    button.style.background = "inherit";
    button.style.border = "none";
    button.style.paddingTop = "2px";

	//button.innerText = "Options";
	button.innerHTML = '<i class="fa fa-cog"></i>';

	button.onmouseover = function(){
		this.style.color = "red";
	}
	button.onmouseout = function(){
		this.style.color = "initial";
	}

	button.onclick = function(){


		toEventPage("optionsPage");

	}

	return button;
}

function createButton_b1(){
	button = document.createElement("button");
	button.className = "pgproject_b1"
	button.type = "button";
	button.title = "PGProject";
	button.style.float = "right";
	button.style.backgroundColor = color;
	button.innerHTML = "<img src="+chrome.extension.getURL("images/button_25x25.png")+">";

	button.style.border = "0px";
    button.style.paddingRight = "10px";
    button.style.height = "29px"; //using the 25x25 icon

	if (debug){
		console.log("createButton_b1 returns:");
		console.log(button);
	}
	return button;
}

// Encrypt button
function createButton_b2(){
	button = document.createElement("button");
	button.className = "pgproject_b2"
	button.type = "button";
	button.title = "Cifrar";
	button.style.float = "right";
	button.style.display = "none";

	button.style.fontSize = "x-large";
    button.style.background = "inherit";
    button.style.border = "none";
    button.style.paddingTop = "2px";

	//button.innerText = "Cifrar";
	button.innerHTML = '<i class="fa fa-lock"></i>';

	button.onmouseover = function(){
		this.style.color = "red";
	}
	button.onmouseout = function(){
		this.style.color = "initial";
	}

	return button;
}

// Sign button
function createButton_b3(){
	button = document.createElement("button");
	button.className = "pgproject_b3"
	button.type = "button";
	button.title = "Firmar";
	button.style.float = "right";
	button.style.display = "none";
	
	button.style.fontSize = "x-large";
    button.style.background = "inherit";
    button.style.border = "none";
    button.style.paddingTop = "2px";

	//button.innerText = "Firmar";
	button.innerHTML = '<i class="fa fa-pencil-square-o"></i>';

	button.onmouseover = function(){
		this.style.color = "red";
	}
	button.onmouseout = function(){
		this.style.color = "initial";
	}

	return button;
}

// Decrypt button
function createButton_b4(){
	button = document.createElement("button");
	button.className = "pgproject_b4"
	button.type = "button";
	button.title = "Descrifrar";
	button.style.float = "right";
	button.style.display = "none";
	
	button.style.fontSize = "x-large";
    button.style.background = "inherit";
    button.style.border = "none";
    button.style.paddingTop = "2px";

	//button.innerText = "Descrifrar";
	button.innerHTML = '<i class="fa fa-unlock"></i>';

	button.onmouseover = function(){
		this.style.color = "red";
	}
	button.onmouseout = function(){
		this.style.color = "initial";
	}

	return button;
}

// Delete signature button
function createButton_b5(){
	button = document.createElement("button");
	button.className = "pgproject_b5"
	button.type = "button";
	button.title = "Eliminar firma";
	button.style.float = "right";
	button.style.display = "none";

	button.style.fontSize = "x-large";
    button.style.background = "inherit";
    button.style.border = "none";
    button.style.paddingTop = "2px";
	
	//button.innerText = "Eliminar firma";
	button.innerHTML = '<i class="fa fa-share-square-o"></i>';

	button.onmouseover = function(){
		this.style.color = "red";
	}
	button.onmouseout = function(){
		this.style.color = "initial";
	}

	return button;
}

// Verify signature button
function createButton_b6(){
	button = document.createElement("button");
	button.className = "pgproject_b6"
	button.type = "button";
	button.title = "Verificar firma";
	button.style.float = "right";
	button.style.display = "none";

	button.style.fontSize = "x-large";
    button.style.background = "inherit";
    button.style.border = "none";
    button.style.paddingTop = "2px";
	
	//button.innerText = "Verificar firma";
	button.innerHTML = '<i class="fa fa-pencil-square"></i>';
	//button.innerHTML = '<i class="fa fa-check-square-o"></i>';

	button.onmouseover = function(){
		this.style.color = "red";
	}
	button.onmouseout = function(){
		this.style.color = "initial";
	}

	return button;
}

function createDiv(t){

	function hideAllButtons(){
		bOptions.style.display = "none";
		b2.style.display = "none";
		b3.style.display = "none";
		b4.style.display = "none";
		b5.style.display = "none";
		
		div.setAttribute("pgproject", "false");
	}

	var tb = getTbFromTbTable(t);

	var div = document.createElement("div");
	div.type = "div";
	div.className = "pgproject_tb_bar"

	// PGProject
	var b1 = createButton_b1();
	div.appendChild(b1);

	// Options
	var bOptions = createButton_opt();
	div.appendChild(bOptions);

	// Sign
	var b3 = createButton_b3();
	div.appendChild(b3);

	// Delete signature
	var b5 = createButton_b5();
	div.appendChild(b5);

	// Encrypt
	var b2 = createButton_b2();
	div.appendChild(b2);

	// Decrypt
	var b4 = createButton_b4();
	div.appendChild(b4);

	b1.onclick = function(){
		//pgproject true means that the buttons are visible
		if (div.getAttribute("pgproject") != "true") {
			//buttons are hidden

			bOptions.style.display = "flex";

			switch(text_is(tb.innerText)){
				case "signed":
					b2.style.display = "flex";
					b5.style.display = "flex";
					break;
				case "encrypted":
					b3.style.display = "flex";
					b4.style.display = "flex";
					break;
				case "signed+encrypted": // check how works this option
					b4.style.display = "flex";
					b5.style.display = "flex";
					break;
				case "plain":
					b2.style.display = "flex";
					b3.style.display = "flex";
					break;
				default:
					// error
					if (debug) {
						console.log("PGProject: Switch error in createDiv");
					}
					break;
			}

			div.setAttribute("pgproject", "true");
		
		} else {
			//buttons are visible
			hideAllButtons();
		}
	}

	b2.onclick = function(){
		// Encrypt
		toEventPage("encrypt", tb);//encrypt(tb);
		hideAllButtons();
	}

	b3.onclick = function(){
		// Sign
		toEventPage("sign", tb);//sign(tb);
		hideAllButtons();
	}

	b4.onclick = function(){
		// Decrypt
		toEventPage("decrypt", tb);//decrypt(tb);
		hideAllButtons();
	}

	b5.onclick = function(){
		// Delete signature
		toEventPage("unsign", tb);//unsign(tb);
		hideAllButtons();
	}

	return div;
}

function createDivInbox(inbox){

	function hideAllButtons(){
		bOptions.style.display = "none";
		b4.style.display = "none";
		b6.style.display = "none";

		div.setAttribute("pgproject", "false");
	}

	var tb = inbox.childNodes[1].childNodes[6].childNodes[0];

	var div = document.createElement("div");
	div.type = "div";
	div.className = "pgproject_inbox_bar";
	div.style.backgroundColor = color;


	div.style.height = "29px"; //using the 25x25 icon


	var b1 = createButton_b1();
	div.appendChild(b1);

	var bOptions = createButton_opt();
	div.appendChild(bOptions);

	// Decrypt
	var b4 = createButton_b4();
	div.appendChild(b4);

	// Verify signature
	var b6 = createButton_b6();
	div.appendChild(b6);

	b1.onclick = function(){
		//pgproject true means that the buttons are visible
		if (div.getAttribute("pgproject") != "true") {
			//buttons are hidden

			bOptions.style.display = "flex";

			switch(text_is(tb.innerText)){
				case "signed":
					b6.style.display = "flex";
					break;
				case "encrypted":
					b4.style.display = "flex";
					break;
				case "signed+encrypted": // check how works this option
					b4.style.display = "flex";
					b6.style.display = "flex";
					break;
				case "plain":
					// to do
					break;
				default:
					// error
					if (debug) {
						console.log("PGProject: Switch error in createDivInbox");
					}
					break;
			}

			div.setAttribute("pgproject", "true");
		
		} else {
			//buttons are visible	

			hideAllButtons();
		}
	}

	b4.onclick = function(){
		// Decrypt
		toEventPage("decrypt", tb);//decrypt(tb);
		hideAllButtons();
	}

	b6.onclick = function(){
		// Verify signature
		toEventPage("verify", tb);//verify(tb);
		hideAllButtons();
	}

	return div;
}

function insertDiv(t){

	var div = createDiv(t);

	reference = t.childNodes[0];
	t.insertBefore(div,reference);
}

function insertDivInbox(i){

	var div = createDivInbox(i);

	parent = i.childNodes[1].childNodes[6];
	reference = parent.childNodes[0];

	parent.insertBefore(div,reference);

	reference.style.backgroundColor = "white";
	reference.style.marginLeft = "1px";
	reference.style.marginRight = "1px";
	parent.style.backgroundColor = color;
}

function getTbFromTbTable(tbTable) {

	tb = tbTable.childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0];

	if (tb.className.indexOf(gmail_textbox_class) == -1) {
		tb = tb.childNodes[0];
	}

	return tb;
	//return tb.innerText;
}


///// about encryption (old PGP.js)


/* TO DO:
Clean console log messages
When the signed message is just a part of the text
Multiple signed messages
Check if beginSig is in the right place
*/
function isSigned(text){

	begin = text.indexOf("-----BEGIN PGP SIGNED MESSAGE-----");
	beginSig = text.indexOf("-----BEGIN PGP SIGNATURE-----");
	endSig = text.indexOf("-----END PGP SIGNATURE-----");

	if (begin != -1 && beginSig != -1 && endSig != -1 ){ //begin, beginSig and endSig exists
		if (begin == 0){ //begin is at the beginning of the text
			if ((text.length - "-----END PGP SIGNATURE-----".length -1) == endSig){ //endSig is at the ending of the text

				if (debug){
					console.log("Next text isSigned: true");
					console.log(text);
				}				

				return true;
			}
			if (debug) {
				console.log("isSigned error: 1 - EndSig");
			}
		}
		if (debug) {
			console.log("isSigned error: 2 - Begin");
		}
	}
	if (debug) {
		console.log("isSigned error: 3 - Begin, beginSig or endSig don't exist");
	}

	if (debug) {
		console.log("begin: ");
		console.log(begin);
		console.log("beginSig: ");
		console.log(beginSig);
		console.log("endSig: ");
		console.log(endSig);

		console.log("text length:");
		console.log(text.length);
		console.log("-----END PGP SIGNATURE-----.length :");
		console.log("-----END PGP SIGNATURE-----".length);
		console.log("resta:");
		console.log((text.length - "-----END PGP SIGNATURE-----".length -1));
		console.log("endSig:");
		console.log(endSig);
	}


	return false;
}

/* TO DO:
Clean console log messages
When the encrypted message is just a part of the text
Multiple encrypted messages
*/
function isEncrypted(text){

	begin = text.indexOf("-----BEGIN PGP MESSAGE-----");
	end = text.indexOf("-----END PGP MESSAGE-----");

	if ((begin != -1) && (end != -1)){ //begin and end exists
		if (begin == 0){ //begin is at the beginning of the text
			if ((text.length - "-----END PGP MESSAGE-----".length -1) == end){ //end is at the ending of the text
				
				if (debug){
					console.log("Next text isEncrypted: true");
					console.log(text);
				}
				
				return true;
			}
			if (debug) {
				console.log("isEncrypted error: 1 - End");
			}
		}
		if (debug) {
			console.log("isEncrypted error: 2 - Begin");
		}
	}
	if (debug) {
		console.log("isEncrypted error: 3 - Begin or end don't exist");
	}

	if (debug) {
		console.log("begin: ");
		console.log(begin);
		console.log("end: ");
		console.log(end);

		console.log("text length:");
		console.log(text.length);
		console.log("-----END PGP MESSAGE-----.length :");
		console.log("-----END PGP MESSAGE-----".length);
		console.log("resta:");
		console.log((text.length - "-----END PGP MESSAGE-----".length -1));
		console.log("end:");
		console.log(end);
	}

	return false;
}

// TO DO: Signed and Encrypted
function text_is(text){

	if (isEncrypted(text)){
		if (isSigned(text)){
			//signed + encrypted
			return "signed+encrypted"; //Check how works signing and encrypting
		} else {
			//encrypted
			return "encrypted";
		}
	} else if (isSigned(text)){
		// signed
		return "signed";
	} else {
		// plain
		return "plain";
	}
}


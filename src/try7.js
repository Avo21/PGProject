/*
Try7 - Follows the try6 approach
Adds basic functionality to the main button.
*/

//var gmail_textbox_class = "Am Al editable LW-avf";
var gmail_textbox_class = "Al editable LW-avf";
var gmail_textbox_table_class = "cf An";
var gmail_inbox_class = "adn ads";
var color = "LightSteelBlue";

var debug = true;

/*
function getTextboxes(tb_class){
	//select all the open textboxes

	textboxesList = document.getElementsByClassName(tb_class);
	if (debug) {
		console.log("getTextboxes returns:");
		console.log(textboxesList);
	}
	return textboxesList;
}
*/

function getTbTables(tbTable_class){
	tbTablesList = document.getElementsByClassName(tbTable_class);
	return tbTablesList;
}

function getInbox(inbox_class){
	inboxList = document.getElementsByClassName(inbox_class);
	return inboxList;
}

function createButton_b1(){
	button = document.createElement("button");
	button.className = "pgproject_b1"
	button.type = "button";
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
	button.style.float = "right";
	button.style.display = "none";
	//button.style.backgroundColor = color;
	button.innerText = "Cifrar";

	if (debug){
		console.log("createButton_b2 returns:");
		console.log(button);
	}
	return button;
}

// Sign button
function createButton_b3(){
	button = document.createElement("button");
	button.className = "pgproject_b3"
	button.type = "button";
	button.style.float = "right";
	button.style.display = "none";
	//button.style.backgroundColor = color;
	button.innerText = "Firmar";

	if (debug){
		console.log("createButton_b3 returns:");
		console.log(button);
	}
	return button;
}

// Decrypt button
function createButton_b4(){
	button = document.createElement("button");
	button.className = "pgproject_b4"
	button.type = "button";
	button.style.float = "right";
	button.style.display = "none";
	//button.style.backgroundColor = color;
	button.innerText = "Descifrar";

	if (debug){
		console.log("createButton_b4 returns:");
		console.log(button);
	}
	return button;
}

// Delete signature button
function createButton_b5(){
	button = document.createElement("button");
	button.className = "pgproject_b5"
	button.type = "button";
	button.style.float = "right";
	button.style.display = "none";
	//button.style.backgroundColor = color;
	button.innerText = "Eliminar firma";

	if (debug){
		console.log("createButton_b5 returns:");
		console.log(button);
	}
	return button;
}

// Verify signature button
function createButton_b6(){
	button = document.createElement("button");
	button.className = "pgproject_b6"
	button.type = "button";
	button.style.float = "right";
	button.style.display = "none";
	//button.style.backgroundColor = color;
	button.innerText = "Verificar firma";

	if (debug){
		console.log("createButton_b6 returns:");
		console.log(button);
	}
	return button;
}

function isSigned(text){
	if (debug){
		console.log("isSigned")
	}

	// TO DO

	return false;
}

function isEncrypted(text){
	if (debug){
		console.log("isEncrypted")
	}

	// TO DO

	return true;
}

function text_is(text){

	if (isEncrypted(text)){
		if (isSigned(text)){
			//signed + encrypted
			return "signed+encrypted";
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

function encrypt(text){
	// TO DO

	var enc = "ENCRYPTED - " + text;

	return enc;
}

function sign(text){
	// TO DO

	var sig = "SIGNED - " + text;

	return sig;
}

function decrypt(text){
	// TO DO

	var dec = "DECRYPTED - " + text;

	return dec;
}

function unsign(text){
	// TO DO

	var uns = "UNSIGNED - " + text;

	return uns;
}

function verify(text){
	// TO DO

	var ver = "VERIFIED - " + text;

	return ver;
}

function createDiv(t){
	var tb = getTbFromTbTable(t);

	var div = document.createElement("div");
	div.type = "div";
	div.className = "pgproject_tb_bar"

	var b1 = createButton_b1();
	div.appendChild(b1);

	// Encrypt
	var b2 = createButton_b2();
	div.appendChild(b2);

	// Sign
	var b3 = createButton_b3();
	div.appendChild(b3);

	// Decrypt
	var b4 = createButton_b4();
	div.appendChild(b4);

	// Delete signature
	var b5 = createButton_b5();
	div.appendChild(b5);

	b1.onclick = function(){
		//pgproject true means that the buttons are visible
		if (div.getAttribute("pgproject") != "true") {
			//buttons are hidden

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

			b2.style.display = "none";
			b3.style.display = "none";
			b4.style.display = "none";
			b5.style.display = "none";
			div.setAttribute("pgproject", "false");
		}
	}

	b2.onclick = function(){
		// Encrypt
		var enc = encrypt(tb.innerText);

		tb.innerText = enc;
	}

	b3.onclick = function(){
		// Sign
		var sig = sign(tb.innerText);

		tb.innerText = sig;
	}

	b4.onclick = function(){
		// Decrypt
		var dec = decrypt(tb.innerText);

		tb.innerText = dec;
	}

	b5.onclick = function(){
		// Delete signature
		var uns = unsign(tb.innerText);

		tb.innerText = uns;
	}

	return div;
}

function createDivInbox(inbox){

	//text = "caca"; //for testing
	//i.childNodes[1].childNodes[6].innerText
	var tb = inbox.childNodes[1].childNodes[6].childNodes[0];

	var div = document.createElement("div");
	div.type = "div";
	div.className = "pgproject_inbox_bar";
	div.style.backgroundColor = color;


	div.style.height = "29px"; //using the 25x25 icon


	var b1 = createButton_b1();
	div.appendChild(b1);

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

			b4.style.display = "none";
			b6.style.display = "none";
			div.setAttribute("pgproject", "false");
		}
	}

	b4.onclick = function(){
		// Decrypt
		var dec = decrypt(tb.innerText);

		tb.innerText = dec;
	}

	b6.onclick = function(){
		// Verify signature
		var ver = verify(tb.innerText);

		tb.innerText = ver;
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


if (debug){
	console.log("PGProject started")
}

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
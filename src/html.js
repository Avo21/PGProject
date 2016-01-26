/*
Html.js - 

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
		encrypt(tb);
	}

	b3.onclick = function(){
		// Sign
		sign(tb);
	}

	b4.onclick = function(){
		// Decrypt
		decrypt(tb);
	}

	b5.onclick = function(){
		// Delete signature
		unsign(tb);
	}

	return div;
}

function createDivInbox(inbox){

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
		decrypt(tb);
	}

	b6.onclick = function(){
		// Verify signature
		verify(tb);
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

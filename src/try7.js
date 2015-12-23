/*
Try7 - Follows the try6 approach
Adds basic functionality to the main button.
*/

var gmail_textbox_class = "Am Al editable LW-avf";
var gmail_textbox_table_class = "cf An";
var color = "LightSteelBlue";

var debug = true;

function getTextboxes(tb_class){
	//select all the open textboxes

	textboxesList = document.getElementsByClassName(tb_class);
	if (debug == true) {
		console.log("getTextboxes returns:");
		console.log(textboxesList);
	}
	return textboxesList;
}

function getTbTables(tbTable_class){
	tbTablesList = document.getElementsByClassName(tbTable_class);
	return tbTablesList;
}

function isSigned(text){
	if (debug == true){
		console.log("isSigned")
	}

	// TO DO
}

function isEncrypted(text){
	if (debug == true){
		console.log("isEncrypted")
	}

	// TO DO
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

	if (debug == true){
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

	if (debug == true){
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

	if (debug == true){
		console.log("createButton_b3 returns:");
		console.log(button);
	}
	return button;
}


function createDiv(){
	div = document.createElement("div");
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

	b1.onclick = function(){
		if (div.getAttribute("pgproject") != "true") {
			b2.style.display = "flex";
			b3.style.display = "flex";
			div.setAttribute("pgproject", "true");
		} else {
			b2.style.display = "none";
			b3.style.display = "none";
			div.setAttribute("pgproject", "false");
		}
	}

	return div;
}

function insertDiv(table){

	div = createDiv();

	reference = table.childNodes[0];
	table.insertBefore(div,reference);
}


if (debug == true){
	console.log("PGProject started")
}

window.addEventListener("click",function(){
	if (debug == true){
		console.log("click")
	}

	tbTablesList = getTbTables(gmail_textbox_table_class);

	for (i = 0; i< tbTablesList.length; i++){
		
		t = tbTablesList[i];
		t.style.backgroundColor = color;

		// pgproject indicates when the button already exists in this table
		if (t.getAttribute("pgproject") != "true") {
			insertDiv(t);
			t.setAttribute("pgproject", "true");
		}
	}
});

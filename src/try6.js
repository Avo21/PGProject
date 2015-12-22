/*
A different approach
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

function createButton_textbox(){
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
		console.log("createButton_textbox returns:");
		console.log(button);
	}
	return button;
}

function createDiv(){
	div = document.createElement("div");
	div.type = "div";

	button = createButton_textbox();
	div.appendChild(button);

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

		if (t.getAttribute("pgproject") != "true") {
			insertDiv(t);
			t.setAttribute("pgproject", "true");
		}
	}
});

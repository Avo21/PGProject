/*
Try7 - Follows the try6 approach
Adds basic functionality to the main button.
*/

var gmail_textbox_class = "Am Al editable LW-avf";
var gmail_textbox_table_class = "cf An";
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

	return false;
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

function createDiv(){
	text = "Asdasdasd"; // JUST FOR TESTING.

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

			/*
			switch(expression) {
			    case n:
			        code block
			        break;
			    case n:
			        code block
			        break;
			    default:
			        default code block
			}
			*/

			switch(text_is(text)){
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

			/*
			b2.style.display = "flex";
			b3.style.display = "flex";
			div.setAttribute("pgproject", "true");
			*/
		
		} else {
			//buttons are visible	

			b2.style.display = "none";
			b3.style.display = "none";
			b4.style.display = "none";
			b5.style.display = "none";
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


if (debug){
	console.log("PGProject started")
}

window.addEventListener("click",function(){
	if (debug){
		console.log("click")
	}

	tbTablesList = getTbTables(gmail_textbox_table_class);

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
});

/*
The try4 adds a button in each textbox
*/

var gmail_textbox_key = "Am Al editable LW-avf"; //could change
var textboxesList = [];

var debug = true;

function getTextboxes(key){
	//select all the open textboxes

	textboxesList = document.getElementsByClassName(gmail_textbox_key);
	if (debug == true) {
		console.log("getTextboxes returns:");
		console.log(textboxesList);
	}
	return textboxesList;
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

function createButton(){
	var button = document.createElement("button");
	button.type = "button";
	button.style.float = "right"
	button.innerHTML = "<img src="+chrome.extension.getURL("images/button_30x30.png")+">"

	if (debug == true){
		console.log("createButton returns:")
		console.log(button)
	}
	return button
}

if (debug == true){
	console.log("PGProject started")
}

window.addEventListener("click",function(){
	if (debug == true){
		console.log("click")
	}

	textboxesList = getTextboxes(gmail_textbox_key);

	for (i = 0; i< textboxesList.length; i++){
		button = createButton();

		t = textboxesList[i];

		if (debug == true){
			console.log("iteration "+i+":")
			console.log(t)
		}
		
		p = t.parentNode;
		p2 = p.parentNode;

		// the "pgproject" attribute indicates if the button already exists
		if (p2.getAttribute("pgproject") != "true") {
			p2.insertBefore(button, p)
			//this has been changed from p.insertBefore(button,t) to this. Check if everything is ok and rewrite the code well.
			p2.setAttribute("pgproject","true");

			if (debug == true){
				console.log("button added");
			}
		}
	}
});

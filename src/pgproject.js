/*
Pgproject.js (main) - 

*/

var gmail_textbox_class = "Al editable LW-avf";
var gmail_textbox_table_class = "cf An";
var gmail_inbox_class = "adn ads";
var color = "LightSteelBlue";

var debug = true;
var keyring;

if (debug){
	console.log("PGProject started");
}

window.onload = function() {
	if (keyring == undefined) {
		keyring = generateKeyring();
	}

	// testing. newKeyPair function must be called from a form in a configuration page
	keyring.clear();
	newKeyPair(keyring);



	////
	loadIconsStyle();
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

/*
The try3 gets the open textboxes in Gmail each time the
user makes click and prints it in the console.
*/

var gmail_textbox_key = "Am Al editable LW-avf"; //could change
var textboxesList = [];


function getTextboxes(key){
	//select all the open textboxes
	textboxesList = document.getElementsByClassName(gmail_textbox_key);
	return textboxesList;
}

function isSigned(text){
	// TO DO
}

function isEncrypted(text){
	// TO DO
}


console.log("PGProject started")

window.addEventListener("click",function(){
	textboxesList = getTextboxes(gmail_textbox_key);
	console.log(textboxesList); //just checking in development stage. to delete
});


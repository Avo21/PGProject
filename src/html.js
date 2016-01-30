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

function loadIconsStyle(){
	var link = document.createElement("link");
	link.rel = "stylesheet";
	link.href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css";
	document.head.appendChild(link);
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

	// Can't use chrome.runtime.openOptionsPage from the content script
	// TO DO: Use background.js and send messages
	// If not, use just window.open and provide a better format to the options page
	button.onclick = function(){
		if (chrome.runtime.openOptionsPage) {
		    // New way to open options pages, if supported (Chrome 42+).
		    chrome.runtime.openOptionsPage();
		} else {
		    // Reasonable fallback.
		    window.open(chrome.runtime.getURL('options/options.html'));
  		}
	}

	// button.style.backgroundColor = color;
	// button.innerHTML = "<img src="+chrome.extension.getURL("dir img")+">";

	//button.style.border = "0px";
	//etc.

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
		encrypt(tb);
		hideAllButtons();
	}

	b3.onclick = function(){
		// Sign
		sign(tb);
		hideAllButtons();
	}

	b4.onclick = function(){
		// Decrypt
		decrypt(tb);
		hideAllButtons();
	}

	b5.onclick = function(){
		// Delete signature
		unsign(tb);
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
		decrypt(tb);
		hideAllButtons();
	}

	b6.onclick = function(){
		// Verify signature
		verify(tb);
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

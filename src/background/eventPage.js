var debug = true;

chrome.runtime.onInstalled.addListener(
	function(details){
		if(details.reason == "install"){
			// TO DO: Open page explaining some things (like how to add some keys)
			// maybe integrated in options page
			chrome.runtime.openOptionsPage();
		}
	}
);


chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		/*
		console.log(sender.tab ?
				"MSG from a content script:" + sender.tab.url :
				"MSG from the extension");
		*/
		if (debug) {
			console.log("Message [" + request.msg + "] received on EP");
		}


		/*if (request.msg == "addPublicKey"){

			console.log("msg addPublicKey recibido");

			// testing tabs
			chrome.tabs.query({currentWindow: true, 'url': 'https://mail.google.com/*'}, function(tabs) {
			    console.log('-- Tabs information --');
			    tabs.forEach(function(tab) {
			        console.log('Tab ID: ', tab.id,'Title: ', tab.title, 'URL: ', tab.url);
			    });
			});

			
			chrome.tabs.query({'url': 'https://mail.google.com/*'}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {msg: "addPublicKey2"}, function(response) {
					console.log("msg addPublicKey2 enviado");
					console.log(tabs[0].id);
				});
			});



			//sendResponse({msg: "ok - openOptionsPage"});
			
		}	
*/

		switch(request.msg) {
	    case "optionsPage":
	        //sendResponse({msg: "ok - openOptionsPage"});
			if (chrome.runtime.openOptionsPage) {
			    // New way to open options pages, if supported (Chrome 42+).
			    chrome.runtime.openOptionsPage();
			} else {
			    // Reasonable fallback.
			    window.open(chrome.runtime.getURL('options/options.html'));
	  		}
	  		sendResponse({msg: "OK"});
	        break;
	    //encrypt / sign / decrypt / unsign / verify 
	    case "initKeys":
	    	initKeys();
	    	sendResponse({msg: "OK"});
	    	break;
	    case "encrypt":
	    	encrypt(request.cnt).then(function(pgpmessage) {
	    		if (debug) {
					console.log("--EP response OK +  " + pgpmessage);
				}
	    		sendResponse({msg: "OK", cnt: pgpmessage});
			});
			break;
		case "sign":
	    	sign(request.cnt).then(function(pgpmessage) {
	    		if (debug) {
					console.log("--EP response OK +  " + pgpmessage);
				}
	    		sendResponse({msg: "OK", cnt: pgpmessage});
			});
			break;
		case "decrypt":
	    	decrypt(request.cnt).then(function(plaintext) {
	    		if (debug) {
					console.log("--EP response OK +  " + plaintext);
				}
	    		sendResponse({msg: "OK", cnt: plaintext});
			});
			break;
		case "unsign":
	    	var plaintext = unsign(request.cnt);

    		if (debug) {
				console.log("--EP response OK +  " + plaintext);
			}

    		sendResponse({msg: "OK", cnt: plaintext});
			break;
		case "verify":
	    	verify(request.cnt).then(function(response) {

	    		/*response = {
			    	Promise<{
			    		text: String,
			    		signatures: Array<{
			    			keyid: module:type/keyid,
			    			valid: Boolean
			    		}>
			    	}>
			    }*/

			    var veriText;
			    // only for one signature
			    if(response.signatures[0].valid == true){
			    	veriText = "Signature verified -\n\n";
			    } else{
			    	veriText = "Unable to verify signature -\n\n";
			    }

				var plaintext = veriText + response.text;

				if (debug) {
					console.log("--EP response OK +  " + plaintext);
				}

	    		sendResponse({msg: "OK", cnt: plaintext});

			});
			break;
	    default:
	        if (debug) {
				console.log("Message [" + request.msg + "] not known on EP");
			}
		}

		return true; // Allows to asynchronously use sendResponse 
	}
);
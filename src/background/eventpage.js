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

		if (debug) {
			console.log("Message [" + request.msg + "] received on EP");
			console.log("with cnt [" + request.cnt + "] and emails ["+ request.emails +"]");
		}

		switch(request.msg) {
	    
	    case "optionsPage":
			if (chrome.runtime.openOptionsPage) {
			    // New way to open options pages, if supported (Chrome 42+).
			    chrome.runtime.openOptionsPage();
			} else {
			    // Reasonable fallback.
			    window.open(chrome.runtime.getURL('options/options.html'));
	  		}
	  		sendResponse({msg: "OK"});
	        break;
	    
	    case "initKeys":
	    	initKeys();
	    	sendResponse({msg: "OK"});
	    	break;
	    
	    case "encrypt":
	    	encrypt(request.cnt,request.emails).then(function(pgpmessage) {
	    		if (debug) {
					console.log("--EP response OK +  " + pgpmessage);
				}
		    		sendResponse({msg: "OK", cnt: pgpmessage});
			}, function(error) {
				if (debug) {
					console.log("--"+ error);
				}
				sendResponse({msg: error+"", cnt: undefined}); // TODO: Parsing "error" to send a better "alert"
			});
			break;
		case "sign":
	    	sign(request.cnt, request.emails).then(function(pgpmessage) {
	    		if (debug) {
					console.log("--EP response OK +  " + pgpmessage);
				}
	    		sendResponse({msg: "OK", cnt: pgpmessage});
			}, function(error) {
				if (debug) {
					console.log("--"+ error);
				}
				sendResponse({msg: error+"", cnt: undefined}); // TODO: Parsing "error" to send a better "alert"
			});
			break;
		case "decrypt":
	    	decrypt(request.cnt, request.emails).then(function(plaintext) {
	    		if (debug) {
					console.log("--EP response OK +  " + plaintext);
				}
	    		sendResponse({msg: "OK", cnt: plaintext});
			}, function(error) {
				if (debug) {
					console.log("--"+ error);
				}
				sendResponse({msg: error+"", cnt: undefined}); // TODO: Parsing "error" to send a better "alert"
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
	    	verify(request.cnt, request.emails).then(function(response) {

	    		/*response = {
			    	Promise<{
			    		text: String,
			    		signatures: Array<{
			    			keyid: module:type/keyid,
			    			valid: Boolean
			    		}>
			    	}>
			    }*/

			    var alert;
			    // only for one signature
			    if(response.signatures[0].valid == true){
			    	alert = "Signature verified";
			    } else{
			    	alert = "Unable to verify signature";
			    }

				if (debug) {
					console.log("--EP response OK +  " + response.text);
				}

	    		sendResponse({msg: alert, cnt: response.text});

			}, function(error) {
				if (debug) {
					console.log("--"+ error);
				}
				sendResponse({msg: error+"", cnt: undefined}); // TODO: Parsing "error" to send a better "alert"
			});
			break;
		case "generateKey":
			var name = request.cnt.name;
			var mail = request.cnt.mail;
			var pass = request.cnt.password;

			if (debug) {
				console.log("Requesting NEW KEY: Name> "+name+" /Email> "+mail+" /Pass> "+pass);
			}

			newKeyPair(keyring, name, mail, pass).then(function(response){
				if(response){
					sendResponse({msg: "OK"});
				}else{
					sendResponse({msg: "NOTOK"});
				}
			});
			break;
		case "getPublicKeys":
			var keys = getPublicKeys();
			if (debug) {
				console.log("-- EP response OK + public keys");
			}
			sendResponse({msg: "OK", cnt: keys});
			break;
		case "getPrivateKeys":
			var keys = getPrivateKeys(); // Is sending clear private keys dangerous?
			if (debug) {
				console.log("-- EP response OK + private keys");
			}
			sendResponse({msg: "OK", cnt: keys});
			break;
		case "importPublic":
			var key = request.cnt;
			
			if (debug) {
				console.log("Requesting IMPORT PUBLIC KEY");
			}

			//TODO response
			var response = importPublicKey(keyring, key);
			if(response){
					sendResponse({msg: "OK"});
			}else{
					sendResponse({msg: "NOTOK"});
			}

			break;
		case "importMyKeys":
			var key = request.cnt;
			
			if (debug) {
				console.log("Requesting IMPORT PRIVATE AND PUBLIC KEYS");
			}

			//TODO response
			var response = importMyKeys(keyring, key);
			if(response){
					sendResponse({msg: "OK"});
			}else{
					sendResponse({msg: "NOTOK"});
			}

			break;
		case "savePassphrase":

			if (debug) {
				console.log("Received passphrase to storaging");
			}

			// Save data to sessionStorage
			sessionStorage.setItem('psph', request.cnt);



			/*
			// Save data to sessionStorage
			sessionStorage.setItem('psph', pass);

			// Get saved data from sessionStorage
			var data = sessionStorage.getItem('key');

			// Remove saved data from sessionStorage
			sessionStorage.removeItem('key');

			// Remove all saved data from sessionStorage
			sessionStorage.clear();
			*/

			break;
	    default:
	        if (debug) {
				console.log("Message [" + request.msg + "] not known on EP");
			}
		}

		return true; // Allows to asynchronously use sendResponse 
	}
);
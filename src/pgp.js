/*
PGP.js - 

*/

// create keyring and import keys from localstore
function generateKeyring(){
	var keyring = new openpgp.Keyring();
	
	if (debug){
		console.log("generateKeyRing");
		console.log(keyring);
		console.log(keyring.getAllKeys());
	}

	return keyring;
}

function newKeyPair(keyring){

	var options = {
		numBits: 2048,
		userId: 'Test User <testuser@testserver.com>',
		passphrase: 'abcd1234567890'
	};

	openpgp.generateKeyPair(options).then(function(keyPair) {
		// private key = keyPair.privateKeyArmored
		// public key = keyPair.publicKeyArmored

		keyring.privateKeys.importKey(keyPair.privateKeyArmored);
		keyring.publicKeys.importKey(keyPair.publicKeyArmored);
		keyring.store();

		if (debug){
			console.log("newKeyPair: ");
			console.log(keyPair.privateKeyArmored);
			console.log(keyPair.publicKeyArmored);
		}

	}).catch(function(error) {
		//TO DO
		console.log(error);
	});
}

function getPublicKeysByEmail(email){
	var keyArray = keyring.publicKeys;
	var keys = keyArray.getForAddress(email);

	return keys;
}

//gets private keys with decrypted secret data
function getPrivateKeysByEmail(email, password){

	var keyArray = keyring.privateKeys;
	var keys = keyArray.getForAddress(email);

	for(i=0;i<keys.length;i++){
		keys[i].decrypt(password);
	}
	//keys.map(decrypt(password));

	return keys;
}

/* TO DO:
Clean console log messages
When the signed message is just a part of the text
Multiple signed messages
Check if beginSig is in the right place
*/
function isSigned(text){

	begin = text.indexOf("-----BEGIN PGP SIGNED MESSAGE-----");
	beginSig = text.indexOf("-----BEGIN PGP SIGNATURE-----");
	endSig = text.indexOf("-----END PGP SIGNATURE-----");

	if (begin != -1 && beginSig != -1 && endSig != -1 ){ //begin, beginSig and endSig exists
		if (begin == 0){ //begin is at the beginning of the text
			if ((text.length - "-----END PGP SIGNATURE-----".length -1) == endSig){ //endSig is at the ending of the text

				if (debug){
					console.log("Next text isSigned: true");
					console.log(text);
				}				

				return true;
			}
			if (debug) {
				console.log("isSigned error: 1 - EndSig");
			}
		}
		if (debug) {
			console.log("isSigned error: 2 - Begin");
		}
	}
	if (debug) {
		console.log("isSigned error: 3 - Begin, beginSig or endSig don't exist");
	}

	if (debug) {
		console.log("begin: ");
		console.log(begin);
		console.log("beginSig: ");
		console.log(beginSig);
		console.log("endSig: ");
		console.log(endSig);

		console.log("text length:");
		console.log(text.length);
		console.log("-----END PGP SIGNATURE-----.length :");
		console.log("-----END PGP SIGNATURE-----".length);
		console.log("resta:");
		console.log((text.length - "-----END PGP SIGNATURE-----".length -1));
		console.log("endSig:");
		console.log(endSig);
	}


	return false;
}

/* TO DO:
Clean console log messages
When the encrypted message is just a part of the text
Multiple encrypted messages
*/
function isEncrypted(text){

	begin = text.indexOf("-----BEGIN PGP MESSAGE-----");
	end = text.indexOf("-----END PGP MESSAGE-----");

	if ((begin != -1) && (end != -1)){ //begin and end exists
		if (begin == 0){ //begin is at the beginning of the text
			if ((text.length - "-----END PGP MESSAGE-----".length -1) == end){ //end is at the ending of the text
				
				if (debug){
					console.log("Next text isEncrypted: true");
					console.log(text);
				}
				
				return true;
			}
			if (debug) {
				console.log("isEncrypted error: 1 - End");
			}
		}
		if (debug) {
			console.log("isEncrypted error: 2 - Begin");
		}
	}
	if (debug) {
		console.log("isEncrypted error: 3 - Begin or end don't exist");
	}

	if (debug) {
		console.log("begin: ");
		console.log(begin);
		console.log("end: ");
		console.log(end);

		console.log("text length:");
		console.log(text.length);
		console.log("-----END PGP MESSAGE-----.length :");
		console.log("-----END PGP MESSAGE-----".length);
		console.log("resta:");
		console.log((text.length - "-----END PGP MESSAGE-----".length -1));
		console.log("end:");
		console.log(end);
	}

	return false;
}

// TO DO: Signed and Encrypted
function text_is(text){

	if (isEncrypted(text)){
		if (isSigned(text)){
			//signed + encrypted
			return "signed+encrypted"; //Check how works signing and encrypting
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

/* TO DO:
email by parameter
more than one email address
error
*/ 
function encrypt(textbox){

	email = "testuser@testserver.com";
	var pubKeys = getPublicKeysByEmail(email);

	openpgp.encryptMessage(pubKeys, textbox.innerText).then(function(pgpMessage) {
	    // success
	    textbox.innerText = pgpMessage;

	}).catch(function(error) {
	    // failure
	    // TO DO

	    if(debug){
	    	console.log("Error: encrypting message");
	    }
	});
}

/* TO DO:
it introduces one line break before signed text (delete it)
email and password by parameter
more than one email address
error
*/
function sign(textbox){
	// signClearMessage(privateKeys, text)

	email = "testuser@testserver.com";
	password = "abcd1234567890";

	var privKeys = getPrivateKeysByEmail(email, password);

	openpgp.signClearMessage(privKeys, textbox.innerText).then(function(pgpMessage) {
	    // success
	    textbox.innerText = pgpMessage;

	}).catch(function(error) {
	    // failure
	    // TO DO

	    if(debug){
	    	console.log("Error: signing message");
	    }
	});
}

/* TO DO:
email and password by parameter
more than one email address
error
*/
function decrypt(textbox){
	
	email = "testuser@testserver.com";
	password = "abcd1234567890";

	var privKeys = getPrivateKeysByEmail(email, password);
	var privKey = privKeys[0];

	var pgpMessage = textbox.innerText;
	pgpMessage = openpgp.message.readArmored(pgpMessage);

	openpgp.decryptMessage(privKey, pgpMessage).then(function(plaintext) {
	    // success
	    textbox.innerText = plaintext;

	}).catch(function(error) {
	    // failure
	    // TO DO

	    if(debug){
	    	console.log("Error: decrypting message");
	    }
	});
}


function unsign(textbox){

	var pgpMessage = textbox.innerText;
	pgpMessage = openpgp.cleartext.readArmored(pgpMessage);

	textbox.innerText = pgpMessage.text;

}


/* TO DO:
veriText could be in the pgproject div
veriText could indicate the emails verified in the signature
email by parameter
more than one email address
error
*/
function verify(textbox){

	email = "testuser@testserver.com";
	var pubKeys = getPublicKeysByEmail(email);

	var pgpMessage = textbox.innerText;
	pgpMessage = openpgp.cleartext.readArmored(pgpMessage);

	openpgp.verifyClearSignedMessage(pubKeys, pgpMessage).then(function(response) {
	    // success
	    
	    /*
	    response = {
	    	Promise<{
	    		text: String,
	    		signatures: Array<{
	    			keyid: module:type/keyid,
	    			valid: Boolean
	    		}>
	    	}>
	    }
	    */

	    var veriText;
	    // only for one signature
	    if(response.signatures[0].valid == true){
	    	veriText = "Signature verified -\n\n";
	    } else{
	    	veriText = "Unable to verify signature -\n\n";
	    }

	    textbox.innerText = veriText + response.text;

	    /*
	    console.log("verifyClearSignedMessage - response:");
	    console.log(response);
	    console.log(response.text);
	    console.log(response.signatures);
	    response.signatures.map(function(signature){
	    	console.log("s");
	    	console.log(signature);
	    	console.log(signature.keyid);
	    	console.log(signature.valid);
	    });*/



	}).catch(function(error) {
	    // failure
	    // TO DO

	    if(debug){
	    	console.log("Error: encrypting message");
	    }
	});
}

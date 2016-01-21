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

	return keys;
}

function isSigned(text){

	// TO DO

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

function decrypt(text){
	// TO DO

	var dec = "DECRYPTED - " + text; //temporal simulation

	/*

	key = getPrivateKey(); // TO

	msg = openpgp_decrypt(); // if promises -> then (please no!)

	*/

	/*

	var key = '-----BEGIN PGP PRIVATE KEY BLOCK ... END PGP PRIVATE KEY BLOCK-----';
	var privateKey = openpgp.key.readArmored(key).keys[0];
	privateKey.decrypt('passphrase');

	var pgpMessage = '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----';
	pgpMessage = openpgp.message.readArmored(pgpMessage);

	openpgp.decryptMessage(privateKey, pgpMessage).then(function(plaintext) {
	    // success
	}).catch(function(error) {
	    // failure
	});

	*/

	return dec;
}

function unsign(text){
	// TO DO

	var uns = "UNSIGNED - " + text; //temporal simulation

	/*

	Is unsign just deleting the signature?

	*/

	return uns;
}

function verify(text){
	// TO DO

	var ver = "VERIFIED - " + text; //temporal simulation

	/*

	key = getPublicKey(); // FROM

	msg = openpgp_verify(); // if promises -> then (please no!)

	*/

	return ver;
}

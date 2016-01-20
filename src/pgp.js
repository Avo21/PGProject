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


/* TO DO
Store ENCRYPTED keys (specially the private one)
Error
*/
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
		console.log(error);
	});
}

function getPublicKeysByEmail(email){
	var keyArray = keyring.publicKeys;
	var keys = keyArray.getForAddress(email);

	return keys;
}

function getPrivateKeysByEmail(email){
	var keyArray = keyring.privateKeys;
	var keys = keyArray.getForAddress(email);

	return keys;
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

function sign(text){
	// TO DO

	var sig = "SIGNED - " + text; //temporal simulation

	/*

	key = getPrivateKey(); // FROM

	msg = openpgp_sign(); // if promises -> then (please no!)

	*/

	return sig;
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

//////// about encryption (old PGP.js)

var keyring; //:S


function initKeys(){

	if (debug){
		console.log("Initializing keyring");
	}

	// Keys
	if (keyring == undefined) {
		keyring = generateKeyring();
	}

	// testing. newKeyPair function must be called from a form in a configuration page
	keyring.clear();
	newKeyPair(keyring);
	
}

// create keyring and import keys from localstore
function generateKeyring(){
	var keyring = new openpgp.Keyring();
	
	if (debug){
		console.log("--generateKeyRing");
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

		keyring.privateKeys.importKey(keyPair.privateKeyArmored); // TO DO: To store private key ENCRYPTED
		keyring.publicKeys.importKey(keyPair.publicKeyArmored);
		keyring.store();

		if (debug){
			console.log("--newKeyPair: ");
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
email by parameter
more than one email address
error
*/ 
function encrypt(text){

	email = "testuser@testserver.com";
	var pubKeys = getPublicKeysByEmail(email);

	if(debug){
		console.log("--Encrypting message: " + text);
	}
	
	return openpgp.encryptMessage(pubKeys, text)
}

/* TO DO:
it introduces one line break before signed text (delete it)
email and password by parameter
more than one email address
error
*/
function sign(text){
	// signClearMessage(privateKeys, text)

	email = "testuser@testserver.com";
	password = "abcd1234567890";

	var privKeys = getPrivateKeysByEmail(email, password);

	if(debug){
		console.log("--Signing message: " + text);
	}
	
	return openpgp.signClearMessage(privKeys, text)
}

/* TO DO:
email and password by parameter
more than one email address
error
*/
function decrypt(pgpMessage){
	
	email = "testuser@testserver.com";
	password = "abcd1234567890";

	var privKeys = getPrivateKeysByEmail(email, password);
	var privKey = privKeys[0];

	if(debug){
		console.log("--Decrypting message: " + pgpMessage);
	}

	pgpMessage = openpgp.message.readArmored(pgpMessage);
	
	return openpgp.decryptMessage(privKey, pgpMessage)


/*
//////////// 
	openpgp.decryptMessage(privKey, pgpMessage).then(function(plaintext) {
	    // success
	    textbox.innerText = plaintext; // TO DO: SEND MESSAGE TO CONTENT SCRIPT

	}).catch(function(error) {
	    // failure
	    // TO DO

	    if(debug){
	    	console.log("Error: decrypting message");
	    }
	});
*/
}

function unsign(pgpMessage){

	if(debug){
		console.log("--Unsigning message: " + pgpMessage);
	}

	pgpMessage = openpgp.cleartext.readArmored(pgpMessage);

	return pgpMessage.text;

}

/* TO DO:
veriText could be in the pgproject div
veriText could indicate the emails verified in the signature - verify icon in green?
email by parameter
more than one email address
error
*/
function verify(pgpMessage){

	email = "testuser@testserver.com";
	var pubKeys = getPublicKeysByEmail(email);

	pgpMessage = openpgp.cleartext.readArmored(pgpMessage);

	return openpgp.verifyClearSignedMessage(pubKeys, pgpMessage);

	/*
	openpgp.verifyClearSignedMessage(pubKeys, pgpMessage).then(function(response) {
	    // success
	    
	    
	    //response = {
	    //	Promise<{
	    //		text: String,
	    //		signatures: Array<{
	    //			keyid: module:type/keyid,
	    //			valid: Boolean
	    //		}>
	    //	}>
	    //}
	    

	    var veriText;
	    // only for one signature
	    if(response.signatures[0].valid == true){
	    	veriText = "Signature verified -\n\n";
	    } else{
	    	veriText = "Unable to verify signature -\n\n";
	    }

		textbox.innerText = veriText + response.text; // TO DO: SEND MESSAGE TO CONTENT SCRIPT

	    



	}).catch(function(error) {
	    // failure
	    // TO DO

	    if(debug){
	    	console.log("Error: encrypting message");
	    }
	});
	*/
}





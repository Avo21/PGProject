//////// about encryption (old PGP.js)

var keyring;

function initKeys(){

	if (debug){
		console.log("Initializing keyring");
	}

	// Keys
	if (keyring == undefined) {
		keyring = generateKeyring();
	}

}

// create keyring and import keys from localstore
function generateKeyring(){
	var keyring = new openpgp.Keyring();
	
	if (debug){
		console.log("--generateKeyRing");
		console.log(keyring.getAllKeys());
	}

	return keyring;
}

function newKeyPair(keyring,username,mail,passphrase){

	/*var options = {
		numBits: 2048, //4096
		userId: 'Test User <testuser@testserver.com>',
		passphrase: 'abcd1234567890'
	};*/

	var options = {
		numBits: 2048,
		userId: username + ' <' + mail +'>',
		passphrase: passphrase
	};

	return openpgp.generateKeyPair(options).then(function(keyPair) {
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

		return true

	}).catch(function(error) {
		//TO DO
		console.log(error);
		return false
	});
}

/* TODO
not to use global keyring
to handle response (errors)
to parse input key
-- the key is updated if it is already in the keyring
*/
function importPublicKey(keyring, key){ // PUBLIC

	keyring.publicKeys.importKey(key);
	keyring.store();

	return true; //TO DO
}
/* TODO
not to use global keyring
to handle response (errors)
to parse input key
-- the key is updated if it is already in the keyring
*/
function importMyKeys(keyring, key){ // PRIVATE

	keyring.privateKeys.importKey(key);
	keyring.publicKeys.importKey(key);
	keyring.store();

	return true; //TO DO
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

/* TO DO:
more than one email address
error
*/ 
function encrypt(text, emails){

	//email = "testuser@testserver.com";
	email = emails[0]; // TO DO: MORE THAN ONE EMAIL ADDRESS
	var pubKeys = getPublicKeysByEmail(email);

	return openpgp.encryptMessage(pubKeys, text)/*.catch(function(error) {
		//console.log(error);
		//return false
	})*/
}

function sign(text, email){
	// signClearMessage(privateKeys, text)

	//email = "testuser@testserver.com";
	//password = "abcd1234567890";
	var password = sessionStorage.getItem('psph');

	if(debug){
		console.log("--Signing message with password: " + password);
	}

	var privKeys = getPrivateKeysByEmail(email, password);

	if(debug){
		console.log("--Signing message: " + text);
	}
	
	return openpgp.signClearMessage(privKeys, text)
}

function decrypt(pgpMessage, emails){
	
	//email = "testuser@testserver.com";
	//password = "abcd1234567890";
	var password = sessionStorage.getItem('psph');
	email = emails[0];

	var privKeys = getPrivateKeysByEmail(email, password);
	var privKey = privKeys[0];

	if(debug){
		console.log("--Decrypting message: " + pgpMessage);
		console.log("--email: " + email + " | password: "+ password + " | privKey" + privKey);
	}

	pgpMessage = openpgp.message.readArmored(pgpMessage);
	
	return openpgp.decryptMessage(privKey, pgpMessage);
}


function unsign(pgpMessage){

	if(debug){
		console.log("--Unsigning message: " + pgpMessage);
	}

	pgpMessage = openpgp.cleartext.readArmored(pgpMessage);

	return pgpMessage.text;

}

function verify(pgpMessage, email){

	//email = "testuser@testserver.com";
	var pubKeys = getPublicKeysByEmail(email);

	pgpMessage = openpgp.cleartext.readArmored(pgpMessage);

	return openpgp.verifyClearSignedMessage(pubKeys, pgpMessage);
}

//TO DO: not using the global variable keyring
function getPublicKeys(){

	var pubKeys = keyring.publicKeys.keys;

	var response = [];
		
	for(i=0;i<pubKeys.length;i++){
		var userid = pubKeys[i].users[0].userId.userid;
		var armoredKey = pubKeys[i].toPublic().armor();

		var key = {userId: userid, key: armoredKey};
		response.push(key);
	}

	return response;
}

//TO DO: not using the global variable keyring
function getPrivateKeys(){

	var privKeys = keyring.privateKeys.keys;

	var response = [];
		
	for(i=0;i<privKeys.length;i++){
		var userid = privKeys[i].users[0].userId.userid;
		var armoredKey = privKeys[i].armor();

		var key = {userId: userid, key: armoredKey};
		response.push(key);
	}

	return response;
}





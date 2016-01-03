/*
PGP.js - 

*/

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

	return true;
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

function encrypt(text){
	// TO DO

	var enc = "ENCRYPTED - " + text;

	return enc;
}

function sign(text){
	// TO DO

	var sig = "SIGNED - " + text;

	return sig;
}

function decrypt(text){
	// TO DO

	var dec = "DECRYPTED - " + text;

	return dec;
}

function unsign(text){
	// TO DO

	var uns = "UNSIGNED - " + text;

	return uns;
}

function verify(text){
	// TO DO

	var ver = "VERIFIED - " + text;

	return ver;
}

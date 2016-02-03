chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		/*
		console.log(sender.tab ?
				"MSG from a content script:" + sender.tab.url :
				"MSG from the extension");
		*/
		if (request.msg == "openOptionsPage"){
			//sendResponse({msg: "ok - openOptionsPage"});
			if (chrome.runtime.openOptionsPage) {
			    // New way to open options pages, if supported (Chrome 42+).
			    chrome.runtime.openOptionsPage();
			} else {
			    // Reasonable fallback.
			    window.open(chrome.runtime.getURL('options/options.html'));
	  		}
		}	
	}
);

chrome.runtime.onInstalled.addListener(
	function(details){
		if(details.reason == "install"){
			// TO DO: Open page explaining some things (like how to add some keys)
			// maybe integrated in options page
			chrome.runtime.openOptionsPage();
		}
	}
);
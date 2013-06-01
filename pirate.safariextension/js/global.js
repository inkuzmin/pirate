var lastFM = new LastFM();

function sendBitrate(mp3, event) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {	
	if (req.readyState == 4)
	{
	    if (req.status == 200) 
	    {		
		calcBitrate(req.getResponseHeader('Content-Length'), mp3, event);
	    }
	    
	}
    };
    req.open('HEAD', mp3.url, true);
    req.send(null);
}


function calcBitrate(size, mp3, event) {
    var bitrate = ((size * 8) / mp3.duration / 1000).toFixed();
    event.target.page.dispatchMessage("answer", {bitrate: bitrate, id: mp3.id});
}

function respondToMessage(e) {
    if(e.name === "getBitrate") {
        var mp3 = e.message;
        sendBitrate(mp3, e);
    }

    else if (e.name === 'getSettings')
        e.target.page.dispatchMessage("settings", [safari.extension.settings.scrobbling, safari.extension.secureSettings.sk]);

    else if (e.name === 'getToken') {
        lastFM.getToken(e);
    }

    else if (e.name === 'updateNowPlaying')
        lastFM.updateNowPlaying(e.message);

    else if (e.name === 'scrobble')
        lastFM.scrobble(e.message);


}

safari.application.addEventListener("message",respondToMessage,false);
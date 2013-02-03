class Router
	constructor: (@bitRater, @lastFM) ->

	routeMessage: (message) ->
		cmd = message.name
		switch cmd
	  		when "getSettings"			then @_getSettings message
	  		when "getBitrate"			then @_getBitrate message
	  		when "getLastFMToken" 		then @_getLastFMToken message
	  		when "setLasfFMPlayingNow"	then @_setLasfFMPlayingNow message
	  		when "scrobble"				then @_scrobble message
	  		else 						@_log message

	_getSettings: (message) ->

	_getBitrate: (message) ->
		

	_getLastFMToken: (message) ->

	_setLasfFMPlayingNow: (message) ->

	_scrobble: (message) ->

	_log: (message) ->
		console.log message


broadcaster = new VKAudio.Broadcaster()
router = new Router( new VKAudio.BitRater(), new VKAudio.LastFM() )
safari.application.addEventListener "message", router.routeMessage, false
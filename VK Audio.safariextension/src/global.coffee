class Router
	constructor: (@bitrater, @lastFM) ->

	routeMessage: (event) ->
		cmd = event.name
		switch cmd
	  		when "getSettings"			then @_getSettings event
	  		when "getBitrate"			then @_getBitrate event
	  		when "getLastFMToken" 		then @_getLastFMToken event
	  		when "setLasfFMPlayingNow"	then @_setLasfFMPlayingNow event
	  		when "scrobble"				then @_scrobble event
	  		else 						@_log event

	_getSettings: (event) ->

	_getBitrate: (event) ->
		@bitrater.getBitrate event

	_getLastFMToken: (event) ->

	_setLasfFMPlayingNow: (event) ->

	_scrobble: (event) ->

	_log: (event) ->
		console.log event

router = new Router( new VKAudio.Bitrater(), new VKAudio.LastFM() )
safari.application.addEventListener "message", router.routeMessage, false
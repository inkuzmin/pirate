if window.top is window

	document.addEventListener "mousemove", (event) ->
        testTarget event.target
    , false

	routeMessage = (message) ->
		cmd = message.name
		switch cmd
	  		when "setBitrate"			then console.log 1

	testTarget = (target) ->
	 	if target.className is "play_new"
	 		console.log "bla-bla-bla"


	 safari.self.addEventListener "message", routeMessage, false





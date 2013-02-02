lastFM = new LastFM()

safari.application.addEventListener "message", routeMessage, false

routeMessage = (message) ->
	cmd = message.name
	switch cmd
  		when "getSettings" then 0
  		when "getBitrate" then 0
  		when "getLastFMToken" then 0
  		when "setLasfFMPlayingNow" then 0
  		when "scrobble" then 0
  		else console.log "Unknowm command #{ cmd }"


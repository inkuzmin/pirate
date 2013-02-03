class VKAudio.Broadcaster
	constructor: ->
		@observers = new Object
	
	addEventHandler: (type, handler) ->
		if !@observers[type] then @observers[type] = new Array
		@observers[type].push handler

	broadcast: (type, message) ->
		_.each @observers[type], (func) ->
			func(type, message)
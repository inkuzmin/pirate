class VKAudio.Bitrater
	constructor: ->

	_requestContentLength: (event) ->
		audioUrl = event.message.url
		xhr = new XMLHttpRequest()
		xhr.onreadychange = ->
			if xhr.readyState is 4 and xhr.status is 200
				@_calculateBitrate event, xhr.getResponseHeader("Content-Length")
		xhr.open "HEAD", audioUrl, true
		xhr.send null

	_calculateBitrate: (event, size) ->
		audio = event.message
		bitrate = ((size * 8) / audio.duration / 1000).toFixed()
		event.target.page.dispatchMessage "setBitrate", {bitrate: bitrate, id: audio.id}

	getBitrate: (event) ->
		@_requestContentLength(event)
		
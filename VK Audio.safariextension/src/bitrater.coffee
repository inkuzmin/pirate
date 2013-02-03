class VKAudio.BitRater
	constructor: (@audio) ->

	requestContentLength: ->
		xhr = new XMLHttpRequest()
		xhr.onreadychange = ->
			if xhr.readyState is 4 and xhr.status is 200
				@calculateBitRate xhr.getResponseHeader("Content-Length")
		xhr.open "HEAD", @audio.url, true
		xhr.send null

	calculateBitRate: (contentLength) ->
		bitRate = ((size * 8) / mp3.duration / 1000).toFixed()
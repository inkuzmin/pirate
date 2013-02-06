if window.top is window

    route = (event) ->
        cmd = event.name
        switch cmd
            when "setBitrate"           then setBitrate(event.message)

    setBitrate = (audio) ->
        aNode = document.getElementById audio.id
        if aNode
            divNode = document.createElement "div"
            divNode.className = "bitrate"
            divNode.innerHTML = "#{ audio.bitrate } kbit/s"
            insertAfter aNode, divNode

    ids = []
    testTargetForPlayButton = (targetNode) ->
        if targetNode.className is "play_new"
            if ids.indexOf(targetNode.id) is -1
                parentNode = targetNode.parentNode
                inputNode = document.getElementById targetNode.id.replace("play", "audio_info")
                audio = inputNode.value.match /(https?:\/\/.+\.(?:vkontakte\.ru|vk\.com|userapi\.com)\/.*.mp3),([0-9]+)/i
                aNode = document.createElement "a"
                aNode.href = audio[1];
                ident = Math.floor(Math.random(0, 100000) * 1000000000000000000);
                aNode.id = ident;
                aNode.setAttribute 'onclick', 'return false;'
                aNode.appendChild targetNode
                parentNode.appendChild aNode
                safari.self.tab.dispatchMessage "getBitrate", {url:audio[1], duration:audio[2], id:ident}
                ids.push targetNode.id


    # Helper functions
    insertAfter = (targetNode, newNode) ->
        targetNode.parentNode.insertBefore newNode, targetNode.nextSibling


    # Listeners
    safari.self.addEventListener "message", route, false

    document.addEventListener "mousemove", (event) ->
        testTargetForPlayButton event.target
    , false
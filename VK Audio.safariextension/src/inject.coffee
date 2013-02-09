if window.top is window

    class VKAudioCollection
        constructor: ->
            @audios = new Array
            @ids = new Array
            console.log "VKAudiocollection created"
        
        collectNodes: ->
            document.getElementsByClassName "play_new"

        buildObjectsFromNodes: ->
            @nodes = @collectNodes()
            for node in @nodes
                
                if @ids.indexOf(node.id) is -1
                    vkAudio = new VKAudio(node)

                    @ids.push node.id
                    @audios.push vkAudio

        showBitrates: ->
            for audio in @audios
                audio.showBitrate()

        hideBitrates: ->
            for audio in @audios
                audio.hideBitrate()



    class VKAudio
        constructor: (@node) ->
            console.log "VKAudio builded"
            @id = @node.id
            @getBitrate()

        getBitrate: ->
            console.log "enter in getBitrate"
            inputNodeId = @id.replace "play", "audio_info"
                
            inputNode = document.getElementById inputNodeId
            audioData = inputNode.value.match /(https?:\/\/.+\.(?:vkontakte\.ru|vk\.com|userapi\.com)\/.*.mp3),([0-9]+)/i
            
            audioUrl = audioData[1]
            audioDuration = audioData[2]

            safari.self.tab.dispatchMessage "getBitrate", {url: audioUrl, duration: audioDuration, id: @id}
            console.log "exit of getBitrate"

        setBitrate: (@bitrate) ->
            console.log "set bitrate"

        createLink: ->
            true

        showBitrate: ->
            console.log "show bitrate"
            divNode = document.createElement "div"
            divNode.className = "bitrate"
            divNode.innerHTML = "#{ @bitrate } kbit/s"
            insertAfter @node, divNode

        hideBitrate: ->

        setLink: ->







    route = (event) ->
        cmd = event.name
        switch cmd
            when "setBitrate"           then setBitrate(event.message)
            # when "setBitrate"           then event.message.object.

    setBitrate = (audio) ->
        # aNode = document.getElementById audio.id
        # if aNode
        #     divNode = document.createElement "div"
        #     divNode.className = "bitrate"
        #     divNode.innerHTML = "#{ audio.bitrate } kbit/s"
        #     insertAfter aNode, divNode
        audioIndex = audios.ids.indexOf audio.id
        audios.audios[audioIndex].setBitrate audio.bitrate

    # ids = []
    # testTargetForPlayButton = (targetNode) ->
    #     if targetNode.className is "play_new"
    #         if ids.indexOf(targetNode.id) is -1
    #             parentNode = targetNode.parentNode

    #             inputNodeId = targetNode.id.replace("play", "audio_info")
    #             aNodeId = targetNode.id.replace("play", "link")
                
    #             inputNode = document.getElementById inputNodeId
    #             audioData = inputNode.value.match /(https?:\/\/.+\.(?:vkontakte\.ru|vk\.com|userapi\.com)\/.*.mp3),([0-9]+)/i
    #             audioUrl = audioData[1]
    #             audioDuration = audioData[2]

    #             aNode = document.createElement "a"
    #             aNode.href = audioUrl;
    #             aNode.id = aNodeId;
    #             aNode.setAttribute 'onclick', 'return false;'
    #             aNode.appendChild targetNode
    #             parentNode.appendChild aNode
    #             safari.self.tab.dispatchMessage "getBitrate", {url: audioUrl, duration: audioDuration, id: aNodeId}
    #             ids.push targetNode.id


    # Helper functions
    insertAfter = (targetNode, newNode) ->
        targetNode.parentNode.insertBefore newNode, targetNode.nextSibling


    # Listeners
    safari.self.addEventListener "message", route, false

    # document.addEventListener "mousemove", (event) ->
    #     testTargetForPlayButton event.target
    # , false
    # 
    
    audios = new VKAudioCollection
    audios.buildObjectsFromNodes()

    document.addEventListener "keydown", (event) ->
        if event.altKey
            console.log "alt pressed"
            audios.showBitrates()
    , false
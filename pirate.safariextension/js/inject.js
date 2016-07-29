if (window.top === window) {
    var a = null;
    var track = '';
    var duration;
    var artist = '';
    var timeStart, timeEnd;
    var isTrackSame, wasScrobble = true;

    var musicContainer = document.getElementById('search_list');
    document.addEventListener("mousemove", function (e) {
        testTarget(e);
    }, false);

    document.addEventListener("keypress", function (e) {
        if (e.altKey === true && (e.keyCode === 229 || e.keyCode === 402)) {
            boxToggle();
        }
    }, false);


    boxToggle = function() {
        var node;
        if ( node = document.getElementById('lzheScrobbler') ) {
            removeLzheScrobbler(node);
        }
        else {
            createLzheScrobbler();
        }
    };

    removeLzheScrobbler = function(node) {
        node.parentNode.removeChild(node);
    }

    createLzheScrobbler = function() {
        var body = document.getElementsByTagName('body')[0];
        var lzheScrobbler = returnElement('div', 'lzheScrobbler', {
                            'position': 'fixed',
                            'height':'25px',
                            'width': '350px',
                            'zIndex': '100500',
                            'top': '-5px',
                            'paddingTop': '5px',
                            'backgroundColor': '#b40200',
                            'borderRadius':'5px',
                            'right': '0px',
                            'color': '#fff',
                            'textAlign': 'center'
                        }, '<input style="width:210px" id="lzheScrobblerText" type="text" /><button id="lzheScrobblerButton">Scrobble!</button>');
        body.appendChild(lzheScrobbler);

        document.getElementById('lzheScrobblerButton').addEventListener('click', function() {
            scrobbleTrack(lzheScrobbler);
        }, false);

    };
    scrobbleTrack = function(node) {
        var text = document.getElementById('lzheScrobblerText').value;
        var info = text.split(/[:–—]/, 2);
        safari.self.tab.dispatchMessage("scrobble",  info);
        node.parentNode.removeChild(node);

    }



    safari.self.tab.dispatchMessage("getSettings", true);
    safari.self.addEventListener("message", waitForMessages, false);

    function waitForMessages(e) {
        (e.name == "settings") ? e.message[0] ? !e.message[1] ? (function(){
            var body = document.getElementsByTagName('body')[0];
            var banner = returnElement('div', 'authBanner', {
                            'position': 'absolute',
                            'height':'15px',
                            'width': '100%',
                            'zIndex': '100500',
                            'top': '0px',
                            'left': '0px',
                            'backgroundColor': '#b54658',
                            'color': '#fff',
                            'textAlign': 'center',
                            'cursor': 'pointer'
                        }, 'This banner is shown by vk-auduo-bits extension because you want to enable last.fm scrobbling. Click it!');

            body.appendChild(banner);
            changeCss(body, {
                'paddingTop': '15px'
            })
            banner.addEventListener('click', function() {
                if (parseInt(document.getElementsByTagName('body')[0].paddingTop) != 0) {
                safari.self.tab.dispatchMessage("getToken", true);
                changeCss(document.getElementsByTagName('body')[0], {
                                'paddingTop': '0px'
                            })
                changeCss(document.getElementById('authBanner'), {
                       'backgroundColor': 'royalBlue'
                })
                document.getElementById('authBanner').innerHTML = 'Now accept last.fm permissions, close those tab and then reload this page. Enjoy scrobbling!';
                } else {
                    ;
                }
            }, false);
        })() : (function() {
            var i = setInterval(aTest, 1000);
            function aTest() {
                (a = document.getElementById('html5_audio')) ? (function(){
                    clearInterval(i);
                    a.addEventListener("playing", aPlaying, false);
                    a.addEventListener("pause", aPause, false);
                })() : null;
            }
        })() : null : null;


    }

    function checkAndScrobble() {
        timeEnd = Math.round(+new Date()/1000);
        var time = timeEnd - timeStart;
        console.log("checked!");
        if (time >= duration/2 || time >= 4 * 60) {
            safari.self.tab.dispatchMessage("scrobble",  [artist, track]);
            console.log("scrobbled!");
        }
    }

    function aPlaying() {
        (!wasScrobble) ? checkAndScrobble() : null;

        var newTrack  = document.getElementById('gp_title').innerHTML;
        var newArtist = document.getElementById('gp_performer').innerHTML;

        if (newTrack == track && newArtist == artist) {
            timeStart = Math.round(+new Date()/1000) -  (timeEnd - timeStart);
            isTrackSame = true;
            duration = Math.floor(a.duration);// - Math.floor(a.currentTime);

        } else {
            timeStart = Math.round(+new Date()/1000);
            track = document.getElementById('gp_title').innerHTML;
            artist = document.getElementById('gp_performer').innerHTML;
            duration = Math.floor(a.duration);
            isTrackSame = false;
            wasScrobble = false;
        }
        safari.self.tab.dispatchMessage("updateNowPlaying", [artist, track, duration]);
    }

    function aPause() {
        (!wasScrobble) ? checkAndScrobble() : null;
        wasScrobble = true;
    }


    function changeCss(node, style) {
        for (s in style) node.style[s] = style[s];
    }

    function returnElement(element, id, style, text) {
        var node = document.createElement(element);
        node.id = id || 'id' + Math.random()*666;
        changeCss(node, style);
        node.innerHTML = text || '';
        return node;
    }

    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function getBitrate(theMessageEvent) {
        if (theMessageEvent.name === "answer") {
            var bitrate = theMessageEvent.message.bitrate;
            var id = theMessageEvent.message.id;
            var aNode = document.getElementById(id);

            if (aNode != null) {
                var div = document.createElement('div');
                div.style.position = 'absolute';
                div.style.marginLeft = '0px';
                div.style.marginTop = '-2px';
                div.style.color = 'grey';
                div.style.fontSize = '10px';
                div.innerHTML = bitrate;
                div.title = bitrate + ' kbit/s';
                insertAfter(aNode, div);
            }
        }
    }

    safari.self.addEventListener("message", getBitrate, false);

    var ids = [];
    var testTarget = function (e) {

        var target = e.target;

        if (target.className == "play_new") {
            try {
                var elementNode = document.getElementById(target.id);
                var parentNode = elementNode.parentNode;
                var inputNode = parentNode.nextSibling.nextSibling;
                var mp3 = inputNode.value.match(/(https?:\/\/.*.mp3).*,([0-9]+)/i);
                var aNode = document.createElement('a');
                aNode.href = mp3[1];
                var ident = Math.floor(Math.random(0, 100000) * 1000000000000000000);
                aNode.id = ident;
                aNode.setAttribute('onclick', 'return false;');
                aNode.appendChild(elementNode);
                parentNode.appendChild(aNode);
                safari.self.tab.dispatchMessage("getBitrate", {url:mp3[1], duration:mp3[2], id:ident});
            } catch (err) {}
        }

    };


}
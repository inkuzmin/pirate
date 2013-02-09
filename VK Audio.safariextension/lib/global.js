// Generated by CoffeeScript 1.4.0
(function() {
  var Router, router,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Router = (function() {

    function Router(bitrater, lastFM) {
      this.bitrater = bitrater;
      this.lastFM = lastFM;
      this.routeMessage = __bind(this.routeMessage, this);

    }

    Router.prototype.routeMessage = function(event) {
      var cmd;
      cmd = event.name;
      switch (cmd) {
        case "getSettings":
          return this._getSettings(event);
        case "getBitrate":
          return this._getBitrate(event);
        case "getLastFMToken":
          return this._getLastFMToken(event);
        case "setLasfFMPlayingNow":
          return this._setLasfFMPlayingNow(event);
        case "scrobble":
          return this._scrobble(event);
        default:
          return this._log(event);
      }
    };

    Router.prototype._getSettings = function(event) {};

    Router.prototype._getBitrate = function(event) {
      return this.bitrater.getBitrate(event);
    };

    Router.prototype._getLastFMToken = function(event) {};

    Router.prototype._setLasfFMPlayingNow = function(event) {};

    Router.prototype._scrobble = function(event) {};

    Router.prototype._log = function(event) {
      return console.log(event);
    };

    return Router;

  })();

  router = new Router(new App.Bitrater(), new App.LastFM());

  safari.application.addEventListener("message", router.routeMessage, false);

}).call(this);

const React = require('react');
const Component = React.Component;
const Streamer = require('./Streamer.js');

module.exports = class Watchlist extends Component{

  constructor(){
    super();
    const Watchlist = this;

    window._WatchlistComponent = this;   // Need globabl access to Watchlist component for pre-loaded users.
    Watchlist.state = {
      streamers: []
    };

    /* Bind methods to Watchlist Component */
    Watchlist.newStreamer = Watchlist.newStreamer.bind(Watchlist);
    Watchlist.getUserData = Watchlist.getUserData.bind(Watchlist);
    Watchlist.removeStreamer = Watchlist.removeStreamer.bind(Watchlist);

    /* Event Listener for submitting request for new streamer data when enter is pressed. */
    document.querySelector("[id='newStreamer']").addEventListener("keydown", function(e){
      let element = this;
      if(e.keyCode === 13){
        Watchlist.getUserData(element.value);
        element.value = "";
      }
    });

  }

/**
  * function for retreiving Streamer (name) data from Twitch API using jQuery Ajax.
  */
  getUserData(name){
    const Watchlist = this;
    $.ajax({
      url: "https://api.twitch.tv/kraken/streams/" + name + "?client_id=gwlus81xhl6hcgzxlnedt4v4fdenu45&callback=?",
      type: "GET",
      dataType: "json",
      async: false,
      success: function(data, status){

        let details = Watchlist.parseData(data, name);
        Watchlist.newStreamer(details);

      }
    });
  }

/**
  * function for updating Watchlist state with new Streamer data.
  */
  newStreamer(details){
    const Watchlist = this;
    let streamers = Watchlist.state.streamers.slice();
    streamers.push(details);
    Watchlist.setState({streamers: streamers});
  }

  removeStreamer(streamer){
    const Watchlist = this;
    let streamers = Watchlist.state.streamers.slice();
    streamers = streamers.filter(function(details){
      return details.name != streamer;
    });
    Watchlist.setState({streamers: streamers});
  }

/**
  * function for parsing incoming data from Twitch API for filling Streamer template.
  */
  parseData(data, name){
    const Watchlist = this;
    const truncate = Watchlist.truncate;
    let logo, game, status, viewers, background;
    let online = Boolean(data.stream);
    if(online){
      logo = data.stream.channel.logo;
      name = truncate(data.stream.channel.display_name, 25);
      game = truncate(data.stream.game, 16);
      status = truncate(data.stream.channel.status, 55);
      viewers = data.stream.viewers;
      background = data.stream.channel.profile_banner;
    }
    else{
      logo = "https://forums.rmog.us/twitch_logo.png";
      game = "OFFLINE";
      status = "";
      viewers = 0;
      background = "http://cdn.designbeep.com/wp-content/uploads/2012/01/4.free-carbon-fiber-textures.jpg";
    }
    return { logo, name, game, status, viewers, background };
  }

/**
  * function for limiting text (str) length to a specified length (num). Prevents overflow.
  */
  truncate(str, num){
    return str = str.length <= num ? (str) :
    (function(){
      return str = num >= 3 ? (str.slice(0, num - 3) + "...") : (str.slice(0, num) + "...");
    })();
  }


  render(){
    const Watchlist = this;
    let streamers = Watchlist.state.streamers;
    return (
      <watchlist>
        {
          /* Unpack array of streamers into React Components using Map */
          (function(){
            return streamers.map(function(v, i){
              return <Streamer key={v.name} details={v} removeStreamer={Watchlist.removeStreamer}/>
            })
          })()
        }
      </watchlist>
    );
  }

}

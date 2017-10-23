const React = require('react');
const Component = React.Component;

module.exports = class Streamer extends Component{

  constructor(props){
    super(props);
    const Streamer = this;
    let details = props.details;

    Streamer.state = {
      logo: details.logo,
      name: details.name,
      game: details.game,
      status: details.status,
      viewers: details.viewers,
      background: details.background
    }

    Streamer.removeSelf = function(){
      props.removeStreamer(Streamer.state.name);
    };
  }

  componentDidMount(){
    const Streamer = this;
    let name = Streamer.state.name;
    let row = document.querySelector(`[streamer="${name}"]`);
    let logo = document.querySelector(`row[streamer="${name}"]>banner>img`);

    row.addEventListener("click", function(){
      if(!Streamer.state.mouseOverLogo){
        let channel = window.open(`http://www.twitch.tv/${name}`, '_blank');
        channel.focus();
      }
    });
    logo.addEventListener("click", function(){
      Streamer.removeSelf();
    });

    logo.addEventListener("mouseover", function(){
      Streamer.setState({mouseOverLogo:true});
    });
    logo.addEventListener("mouseout", function(){
      Streamer.setState({mouseOverLogo:false});
    });
  }
  render(){
    const Streamer = this;
    let mouseOverLogo = Streamer.state.mouseOverLogo;

    /* Unpacking Streamer.state */
    let details = Streamer.state;
    let logo = mouseOverLogo ? "http://www.iconsdb.com/icons/preview/red/x-mark-3-xxl.png" : details.logo;
    let name = details.name;
    let game = details.game;
    let status = details.status;
    let viewers = details.viewers;
    let background = details.background;


    /* Returning Row template */
    return (
      <row streamer={name}>
        <banner style={{background: `url("${background}")`}}>
          <img src={logo}></img>
          <wrapper>
            <name><p>{name}</p></name>
            <game><p>{game}</p></game>
            <status><p>{status}</p></status>
            <vCount><p>Viewer Count:{viewers}</p></vCount>
          </wrapper>
        </banner>
      </row>
    );
  }
}

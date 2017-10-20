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
  }

  render(){
    const Streamer = this;

    /* Unpacking Streamer.state */
    let details = Streamer.state;
    let logo = details.logo;
    let name = details.name;
    let game = details.game;
    let status = details.status;
    let viewers = details.viewers;
    let background = details.background;


    /* Returning Row template */
    return (
      <row onClick={function(){
        let channel = window.open(`http://www.twitch.tv/${name}`, '_blank');
        channel.focus();
      }}>
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

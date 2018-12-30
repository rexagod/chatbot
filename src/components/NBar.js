import React from 'react';
import "../style.css";

class NBar extends React.Component {
  render() {
    return (
      <div className="nbarformat">
        <Logo titletext="&nbsp;&nbsp;X" />
        <Logo titletext="ane" />
        <LButton id="logout" logout={this.props.logout} />
        <NButton sendToggle={this.props.sendToggle} />
      </div>
    );
  }
}
export default NBar;

function NButton(props) {
  return (
    <button className="nbuttonformat" onClick={props.sendToggle}>
      <i className="fas fa-info" />
    </button>
  );
}
function LButton(props){
  return (
    <button className="lbuttonformat" onClick={props.logout}>
      Logout
    </button>
  );
}
function Logo(props) {
  return <h5 className="trim logoformat">{props.titletext}</h5>;
}

import React from "react";
import "../style.css";

class TBar extends React.Component {
  render() {
    return (
      <div className="trim inputformat">
        <input
          type="text"
          className="tinput"
          onKeyDown={this.props.passSend}
          placeholder="Get typing!"
        />
      </div>
    );
  }
}
export default TBar;

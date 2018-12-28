import React from 'react';
import "../style.css";

class UBubble extends React.Component {
  render() {
    if (this.props.continueShow)
      return (
        <React.Fragment>
          <div className="ububbledivformat trim">
            {this.props.messages[this.props.indexnumber]}
          </div>
        </React.Fragment>
      );
    else return null;
  }
}
export default UBubble;

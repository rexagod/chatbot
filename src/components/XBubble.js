import React from 'react';
import "../style.css";

class XBubble extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.continueShow &&
          this.props.messages[this.props.indexnumber].map((x, index) => {
            if (this.props.showOption[this.props.indexnumber]) {
              return (
                <React.Fragment key={index}>
                  <div className="xbubbledivformat trim" key={index}>
                    {x}
                    <br />
                    <div className="BBubble" id="BBubblebuttons" key={index}>
                      {this.props.valarrget[this.props.indexnumber].map(
                        (y, index) => (
                          <input
                            type={y === null ? "hidden" : "submit"}
                            key={index}
                            className="BBubblebutton"
                            onClick={this.props.sendHandleOption}
                            value={y}
                          />
                        )
                      )}
                    </div>
                  </div>
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment key={index}>
                  <div className="xbubbledivformat trim" key={index}>
                    {x}
                  </div>
                </React.Fragment>
              );
            }
          })}
      </React.Fragment>
    );
  }
}

export default XBubble;

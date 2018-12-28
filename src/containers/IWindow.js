import React from 'react';
import "../style.css";
import XBubble from "../components/XBubble.js";
import UBubble from "../components/UBubble.js";

class IWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recievedxmessagelist: this.props.passx,
      recievedumessagelist: this.props.passu
    };
  }

  render() {
    let data = JSON.parse(sessionStorage.getItem("qdata"));
    if (data) {
      let arr = new Array(data.data.survey.questions.length);
      for (var a = 0; a < data.data.survey.questions.length; a++) {
        arr[a] = a;
      }
      return (
        <div className="iwindowformat" id="iwindow">
          <React.Fragment>
            {arr.map((n, index) => {
              return (
                <React.Fragment key={index}>
                  <XBubble
                    messages={this.state.recievedxmessagelist}
                    showOption={this.props.showOption}
                    valarrget={this.props.valarrpass}
                    sendHandleOption={this.props.sendHandleOption}
                    indexnumber={n}
                    continueShow={this.props.continueShow[n]}
                    removeButtons={this.props.removeButtons}
                  />
                  <br />
                  <UBubble
                    messages={this.state.recievedumessagelist}
                    sendHandleOption={this.props.sendHandleOption}
                    cursorvalue={this.props.cursorvalue}
                    indexnumber={n}
                    continueShow={this.props.continueShow[n]}
                  />
                  <br />
                </React.Fragment>
              );
            })}
          </React.Fragment>
        </div>
      );
    } else {
      return null;
    }
  }
}
export default IWindow;

import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import './style.css';

class XNBT extends React.Component {
  constructor() {
    super();

    this.state = {
      replaceIWindow: false,
      xmessagelist: [
        ["Hi! My name is Zane. What's your name?"],
        ["Can I know your gender?"],
        ["My favourite colour is yellow. What's yours?"],
        ["How old are you?"],
        ["Tell me something about yourself"],
        ["How many years of experience do you currently have?"],
        ["Thanks for your time! It was nice talking to you."]
      ],
      cursorvalue: "",
      continueShow: [true],
      umessagelist: [],
      boolarr: [
        false,
        true,
        false,
        true,
        false,
        true
      ],
      valarr: [
        [""],
        ["Male", "Female", "Non-binary"],
        [""],
        ["Child", "Teen", "Adult"],
        [""],
        ["<5", "5-10", ">10"]
      ],
    }
  }

  handleOption = (e) => {
    e.preventDefault();
    this.setState({ cursorvalue: e.target.value })
    let umessagelist = this.state.umessagelist;
    umessagelist.push(e.target.value);
    this.setState({ umessagelist: umessagelist });
    let continueshow = this.state.continueShow;
    continueshow.unshift(true);
    this.setState({ continueshow: continueshow });
  }


  handleSubmit = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value) {
        this.setState({ cursorvalue: e.target.value });
        let umessagelist = this.state.umessagelist;
        umessagelist.push(e.target.value);
        this.setState({ umessagelist: umessagelist });
        let continueshow = this.state.continueShow;
        continueshow.unshift(true);
        this.setState({ continueshow: continueshow });
        e.target.value = "";
      }
    }
  }

  handleToggle = () => {
    this.setState({ replaceIWindow: !this.state.replaceIWindow });
  }

  render() {
    if (this.state.replaceIWindow == false) {
      return (
        <div className="app">
          <NBar sendToggle={this.handleToggle} />
          <IWindow passx={this.state.xmessagelist} passu={this.state.umessagelist} showOption={this.state.boolarr} valarrpass={this.state.valarr} sendHandleOption={this.handleOption} usermessageshow={this.userMessageShow} cursorvalue={this.state.cursorvalue} continueShow={this.state.continueShow} />
          <TBar passSend={this.handleSubmit} />
        </div>
      )
    }

    else {
      return (
        <div className="app disableov">
          <NBar sendToggle={this.handleToggle} />
          <InfoScreen />
          <CopyBar />
        </div>
      )
    }
  }
}

class NBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="nbarformat">
        <Logo titletext="&nbsp;&nbsp;ZaneBot" />
        <NButton sendToggle={this.props.sendToggle} />
      </div>
    )
  }
}

function Logo(props) {
  return (
    <h5 className="trim logoformat">{props.titletext}</h5>
  )
}

function NButton(props) {
  return (
    <button className="nbuttonformat" onClick={props.sendToggle}><i className="fas fa-info"></i></button>
  )
}

class IWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recievedxmessagelist: this.props.passx, recievedumessagelist: this.props.passu, }
  }

  render() {
    return (
      <div className="iwindowformat">
        <React.Fragment>
          <XBubble messages={this.state.recievedxmessagelist} showOption={this.props.showOption} valarrget={this.props.valarrpass} sendHandleOption={this.props.sendHandleOption} indexnumber={0} continueShow={this.props.continueShow[0]} />
          <br />
          <UBubble messages={this.state.recievedumessagelist} sendHandleOption={this.props.sendHandleOption} cursorvalue={this.props.cursorvalue} indexnumber={0} continueShow={this.props.continueShow[0]} />
          <br />
          <XBubble messages={this.state.recievedxmessagelist} showOption={this.props.showOption} valarrget={this.props.valarrpass} sendHandleOption={this.props.sendHandleOption} indexnumber={1} continueShow={this.props.continueShow[1]} />
          <br />
          <UBubble messages={this.state.recievedumessagelist} sendHandleOption={this.props.sendHandleOption} cursorvalue={this.props.cursorvalue} indexnumber={1} continueShow={this.props.continueShow[1]} />
          <br />
          <XBubble messages={this.state.recievedxmessagelist} showOption={this.props.showOption} valarrget={this.props.valarrpass} sendHandleOption={this.props.sendHandleOption} indexnumber={2} continueShow={this.props.continueShow[2]} />
          <br />
          <UBubble messages={this.state.recievedumessagelist} sendHandleOption={this.props.sendHandleOption} cursorvalue={this.props.cursorvalue} indexnumber={2} continueShow={this.props.continueShow[2]} />
          <br />
          <XBubble messages={this.state.recievedxmessagelist} showOption={this.props.showOption} valarrget={this.props.valarrpass} sendHandleOption={this.props.sendHandleOption} indexnumber={3} continueShow={this.props.continueShow[3]} />
          <br />
          <UBubble messages={this.state.recievedumessagelist} sendHandleOption={this.props.sendHandleOption} cursorvalue={this.props.cursorvalue} indexnumber={3} continueShow={this.props.continueShow[3]} />
          <br />
          <XBubble messages={this.state.recievedxmessagelist} showOption={this.props.showOption} valarrget={this.props.valarrpass} sendHandleOption={this.props.sendHandleOption} indexnumber={4} continueShow={this.props.continueShow[4]} />
          <br />
          <UBubble messages={this.state.recievedumessagelist} sendHandleOption={this.props.sendHandleOption} cursorvalue={this.props.cursorvalue} indexnumber={4} continueShow={this.props.continueShow[4]} />
          <br />
          <XBubble messages={this.state.recievedxmessagelist} showOption={this.props.showOption} valarrget={this.props.valarrpass} sendHandleOption={this.props.sendHandleOption} indexnumber={5} continueShow={this.props.continueShow[5]} />
          <br />
          <UBubble messages={this.state.recievedumessagelist} sendHandleOption={this.props.sendHandleOption} cursorvalue={this.props.cursorvalue} indexnumber={5} continueShow={this.props.continueShow[5]} />
          <br />
          <XBubble messages={this.state.recievedxmessagelist} showOption={this.props.showOption} valarrget={this.props.valarrpass} sendHandleOption={this.props.sendHandleOption} indexnumber={6} continueShow={this.props.continueShow[6]} />
          <br />
        </React.Fragment>
      </div>
    )
  }
}

class XBubble extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        {
          this.props.continueShow && this.props.messages[this.props.indexnumber].map(
            (x, index) => {
              if (this.props.showOption[this.props.indexnumber]) {
                return (
                  <React.Fragment key={index}>
                    <div className="xbubbledivformat trim" key={index}>
                      {x}
                      <br />
                      <div className="BBubble" key={index} >
                        {this.props.valarrget[this.props.indexnumber].map((y, index) =>
                          <input type="submit" key={index} className="BBubblebutton" onClick={this.props.sendHandleOption} value={y}
                          />
                        )
                        }
                      </div>
                    </div>
                  </React.Fragment>
                )
              }
              else {
                return (
                  <React.Fragment key={index}>
                    <div className="xbubbledivformat trim" key={index}>
                      {x}
                    </div>
                  </React.Fragment>
                )
              }
            }
          )
        }
      </React.Fragment>
    )
  }
}

class UBubble extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    if (this.props.continueShow)
      return (
        <React.Fragment>
          <div className="ububbledivformat trim">
            {this.props.messages[this.props.indexnumber]}
          </div>
        </React.Fragment>
      )
    else
      return null;
  }
}

class TBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="trim inputformat">
        <input type="text" className="tinput" onKeyDown={this.props.passSend} placeholder="Get typing!" />
      </div>
    )
  }
}

class InfoScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="contrastset">
        <br />
        <br />
        <div className="center contact">Say hello!</div>
        <br />
        <div className="center siteref"><a href="https://github.com/prox07">|| Pranshu's git ||</a></div>
      </div>
    )
  }
}

function CopyBar() {
  return (
    <center><div className="copybar">“The road to creativity passes so close to the madhouse and often detours or ends there.” 
― Ernest Becker, The Denial of Death</div></center>
  )
}

render(<XNBT />, document.getElementById('root'));

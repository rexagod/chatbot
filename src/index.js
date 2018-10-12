import React from "react";
import { render } from "react-dom";
import "./style.css";
import Login from "./login";

class XNBT extends React.Component {
  constructor() {
    super();
    this.state = {
      replaceIWindow: false,
      xmessagelist: [],
      cursorvalue: "",
      qcount: 1,
      sId: 0,
      continueShow: [true],
      umessagelist: [],
      boolarr: [],
      valarr: [],
      answers: [],
      ans_index: 0
    };
  }

  // componentWillMount = () => {
  //   this.handleXMlist();
  // };

  componentDidMount = () => {
    this.fetchAPIs();
  };

  componentDidUpdate = () => {
    if (sessionStorage.getItem("qdata")) {
      if (!this.state.replaceIWindow) {
        document.getElementById("iwindow").scrollTo(0, 200);
      }
    }
  };

  handleOption = e => {
    e.persist();
    this.setState({ ans_index: this.state.ans_index + 1 });
    var ans_id;
    var data = JSON.parse(sessionStorage.getItem("qdata"));
    for (var i = 0; i < data.data.survey.questions.length; i++) {
      for (var j = 0; j < data.data.survey.questions[i].answers.length; j++) {
        if (
          e.target.value === data.data.survey.questions[i].answers[j].answer
        ) {
          ans_id = data.data.survey.questions[i].answers[j].id;
        //  console.log(ans_id);
        }
      }
    }

    fetch(
      "http://dev.xane.ai/surveys/".concat(this.state.sId).concat("/answers"),
      {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        headers: {
          "X-Origin": "1",
          "X-Version": "1",
          "X-Auth": sessionStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question_id: this.state.qcount,
          answer_id: ans_id,
          answer: null
        })
      }
    )
      .then(res => res.json())
      .then(data => {
      //  console.log(data);
      })
    //  .catch(error => console.log(error));

    e.preventDefault();
    this.setState({ qcount: this.state.qcount + 1 });
    this.setState({ cursorvalue: e.target.value });
    let umessagelist = this.state.umessagelist;
    umessagelist.push(e.target.value);
    this.setState({ umessagelist: umessagelist });
    let continueshow = this.state.continueShow;
    continueshow.unshift(true);
    this.setState({ continueshow: continueshow });
    document
      .getElementById("BBubblebuttons")
      .parentNode.removeChild(document.getElementById("BBubblebuttons"));
  };

  handleSubmit = e => {
    if (e.keyCode === 13) {
      if (e.target.value) {
        fetch(
          "http://dev.xane.ai/surveys/"
            .concat(this.state.sId)
            .concat("/answers"),
          {
            method: "POST",
            mode: "cors",
            credentials: "omit",
            headers: {
              "X-Origin": "1",
              "X-Version": "1",
              "X-Auth": sessionStorage.getItem("token"),
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              question_id: this.state.qcount,
              answer_id: null,
              answer: e.target.value
            })
          }
        )
          .then(res => res.json())
          .then(data => {
           // console.log(data);
          })
        //  .catch(error => console.log(error));
      }

      this.setState({ ans_index: this.state.ans_index + 1 });
      this.setState({ qcount: this.state.qcount + 1 });
      this.setState({ cursorvalue: e.target.value });
      let umessagelist = this.state.umessagelist;
      umessagelist.push(e.target.value);
      this.setState({ umessagelist: umessagelist });
      let continueshow = this.state.continueShow;
      continueshow.unshift(true);
      this.setState({ continueshow: continueshow });
      e.target.value = "";
    }
  };

  handleToggle = () => {
    this.setState({ replaceIWindow: !this.state.replaceIWindow });
  };

  handleXMlist = (len) => {
    let xmessagelist = this.state.xmessagelist;
    for (var p = 0; p < len; p++) {
      xmessagelist.push([]);
    }
    xmessagelist.push([
      "Thanks for your time " + sessionStorage.getItem("firstName") + "!"
    ]);
    this.setState({ xmessagelist: xmessagelist });
  //  console.log("xmessages: ", this.state.xmessagelist);
  }

  fetchAPIs() { //add hXl here
    if (sessionStorage.getItem("firstName")) {
      fetch("http://dev.xane.ai/auths/linkedin", {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        headers: {
          "X-Origin": "1",
          "X-Version": "1",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: sessionStorage.getItem("firstName"),
          lastName: sessionStorage.getItem("lastName"),
          email: sessionStorage.getItem("email"),
          companyId: sessionStorage.getItem("companyId")
        })
      })
        .then(res => res.json())
        .then(data => {
        //  console.log("Token: ", data.data.session.token);
          sessionStorage.setItem("token", data.data.session.token);
          fetch("http://dev.xane.ai/surveys/active?", {
            method: "GET",
            headers: {
              "X-Auth": sessionStorage.getItem("token"),
              "X-Origin": "1",
              "X-Version": "1"
            }
          })
            .then(res => res.json())
            .then(data => {
            //  console.log("Answers: ", data);
              sessionStorage.setItem("adata", JSON.stringify(data));
              for (
                var x = 0;
                x < data.data.surveys[0].answered_questions.length;
                x++
              ) {
                let answers = this.state.answers;
                answers.push(data.data.surveys[0].answered_questions[x].answer);
                this.setState({ answers: answers });
              }
              for (var t = 0; t < this.state.answers.length; t++) {
                let umessagelist = this.state.umessagelist;
                let continueShow = this.state.continueShow;
                umessagelist.push(this.state.answers[t]);
                continueShow.push(true);
              }
            //  console.log(this.state.answers);
              this.setState({ sId: data.data.surveys[0].id });
              fetch(
                "http://dev.xane.ai/surveys/".concat(data.data.surveys[0].id),
                {
                  method: "GET",
                  headers: {
                    "X-Auth": sessionStorage.getItem("token"),
                    "X-Origin": "1",
                    "X-Version": "1"
                  }
                }
              )
                .then(res => res.json())
                .then(data => {
                  // console.log("Questions: ", data);
                  // console.log(data.data.survey.questions.length);
                  this.handleXMlist(data.data.survey.questions.length);
                  sessionStorage.setItem("qdata", JSON.stringify(data));
                  this.setState({ qcount: data.data.survey.questions[0].id });
                  let xmessagelist = this.state.xmessagelist;
                  let valarr = this.state.valarr;
                  let boolarr = this.state.boolarr;
                  let arr = new Array(
                    JSON.parse(data.data.survey.questions.length)
                  );
                  let answers = JSON.parse(sessionStorage.getItem("adata"));
                  for (
                    var a = 0;
                    a < JSON.parse(data.data.survey.questions.length);
                    a++
                  ) {
                    arr[a] = a;
                  }
                  arr.map(o => {
                    xmessagelist[o].push(
                      data.data.survey.questions[o].question
                    );
                    boolarr.push(true);
                    valarr.push([]);
                    for (
                      var i = 0;
                      i < data.data.survey.questions[o].answers.length;
                      i++
                    ) {
                      if (answers.data.surveys[0].answered_questions[o]) {
                        valarr[o].push(null);
                      } else if (
                        !answers.data.surveys[0].answered_questions[o]
                      ) {
                        valarr[o].push(
                          data.data.survey.questions[o].answers[i].answer
                        );
                      }
                    }
                    return null;
                  });
                  this.setState({ xmessagelist: xmessagelist });
                  this.setState({ valarr: valarr });
                  this.setState({ boolarr: boolarr });
                })
              //  .catch(error => console.log(error));
            })
           // .catch(error => console.log(error));
        });
    }
  }

  removeButtons() {
    document
      .getElementById("BBubblebuttons")
      .parentNode.removeChild(document.getElementById("BBubblebuttons"));
  }

  render() {
    if (sessionStorage.getItem("firstName")) {
      if (this.state.replaceIWindow === false) {
        return (
          <div className="app">
            <NBar sendToggle={this.handleToggle} />
            <IWindow
              passx={this.state.xmessagelist}
              passu={this.state.umessagelist}
              showOption={this.state.boolarr}
              valarrpass={this.state.valarr}
              sendHandleOption={this.handleOption}
              usermessageshow={this.userMessageShow}
              cursorvalue={this.state.cursorvalue}
              continueShow={this.state.continueShow}
              removeButtons={this.state.removeButtons}
            />
            <TBar
              passSend={this.handleSubmit}
              passanswers={this.state.answers}
              ans_index={this.state.ans_index}
            />
          </div>
        );
      } else {
        return (
          <div className="app disableov">
            <NBar sendToggle={this.handleToggle} />
            <InfoScreen />
            <CopyBar />
          </div>
        );
      }
    } else {
      return <Login />;
    }
  }
}

class NBar extends React.Component {
  render() {
    return (
      <div className="nbarformat">
        <Logo titletext="&nbsp;&nbsp;X" />
        <Logo titletext="ane" />
        <NButton sendToggle={this.props.sendToggle} />
      </div>
    );
  }
}

function Logo(props) {
  return <h5 className="trim logoformat">{props.titletext}</h5>;
}

function NButton(props) {
  return (
    <button className="nbuttonformat" onClick={props.sendToggle}>
      <i className="fas fa-info" />
    </button>
  );
}

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

class InfoScreen extends React.Component {
  render() {
    return (
      <div className="contrastset">
        <br />
        <br />
        <div className="center contact">Contact us!</div>
        <br />
        <div className="center siteref">
          <a href="https://xane.ai">|| Xane.ai ||</a>
        </div>
      </div>
    );
  }
}

function CopyBar() {
  return (
    <center>
      <div className="copybar">
        &copy; 2018 Profformance Technologies Pvt. Ltd.
        All&nbsp;rights&nbsp;reserved.
      </div>
    </center>
  );
}

render(<XNBT />, document.getElementById("root"));

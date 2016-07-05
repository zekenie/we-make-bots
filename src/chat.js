const React = require('react');

const chatBot = require('./chatBot');

class Chat extends React.Component {
  constructor(args) {
    super(args);
    this.state = {
      messages: [],
      inputValue: ''
    };
    chatBot.listen(this.botMessage.bind(this));
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputKeyPress = this.onInputKeyPress.bind(this);
  }

  onInputKeyPress(evt) {
    if(evt.key === 'Enter') {
      evt.preventDefault();
      this.humanMessage(evt.target.value);
    }
  }

  onInputChange(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  resetInput() {
    this.setState({
      inputValue: ''
    });
  }

  pushMessage(data) {
    this.setState(prev => {
      prev.messages.push(data);
      return prev;
    });
  }

  botMessage(data) {
    data.from = 'bot';
    this.pushMessage(data);
    if(data.scroll) {
      this.props.scrollTo(data.scroll);
    }
  }

  humanMessage(text) {
    const msg = {
      text,
      from: 'human'
    };
    this.pushMessage(msg);
    chatBot.send(msg);
    this.resetInput();
  }

  renderMessage() {
    return this.state.messages.map((msg, i) =>
      <div key={i} className={`p1 mb1 rounded message message-${msg.from}`}>
        <pre>{msg.text}</pre>
      </div>
    );
  }

  componentDidUpdate() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  componentDidMount() {
    this.inputElement.focus();
    if(this.props.startingString)  {
      setTimeout(() => {
        this.type(this.props.startingString);
      }, 350);
    }
  }

  type(str) {
    const getRandomInterval = () => (Math.random() * 100) + 50;

    const typeChar = (str, i) => {
      if(!str[i]) {
        return this.humanMessage(this.state.inputValue);
      }
      this.setState({
        inputValue: this.state.inputValue + str[i]
      });
      setTimeout(() => typeChar(str, i+1), getRandomInterval());
    }

    typeChar(str, 0);
  }

  classes(state) {
    let always = [
      'chat-window',
      'border',
      'rounded'
    ];
    if(state === 'open') {
      always = always.concat(['open','sm-col-12','md-col-5']);
    } else if(state === 'closed') {
      always = always.concat(['closed','sm-col-12','md-col-3']);
    }
    return always.join(' ');
  }

  render() {
    return (
      <div className={this.classes(this.props.chatState)}>
        <div ref={el => this.messagesContainer = el} className="p3 messages">
        {this.renderMessage()}
        </div>
        <div className="input-container border-top p1">
          <span className="chevron">&rsaquo;</span>
          <input
            ref={el => this.inputElement = el}
            className="p1"
            type="text"
            value={this.state.inputValue}
            onChange={this.onInputChange}
            onKeyPress={this.onInputKeyPress}/>
        </div>
      </div>
    )
  }
}

module.exports = Chat;
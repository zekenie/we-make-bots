const React = require('react');
const Chat = require('./chat');
const Content = require('./content');
const Logo = require('./logo');
class Site extends React.Component {
  constructor(args) {
    super(args);
    this.state = {
      chatState: 'open'
    };
    this.scrollTo = this.scrollTo.bind(this);
  }

  componentDidMount() {
    document.getElementById('site').classList.remove('no-transition');

    window.addEventListener('scroll', () => {
      if(window.scrollY > 5) {
        this.setState({ chatState: 'closed' });
      } else {
        this.setState({ chatState: 'open' });
      }
    })
  }

  scrollTo(section) {}

  chatLeftOffset() {
    return 475/2;
  }

  render() {
    return (
      <div>
        <div className="logo"><Logo/></div>
        <div className="p3">
          <h1 className="center heading">WE MAKE BOTS.</h1>
            <Chat 
              chatState={this.state.chatState}
              scrollTo={this.scrollTo}
              startingString="Hello there!"/>
            <Content/>
        </div>
      </div>
    )
  }
}

module.exports = Site;
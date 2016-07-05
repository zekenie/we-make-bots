const React = require('react');
const Integrations = require('./integrations');
const {Phone, Tablet, Laptop} = require('./devices');
const diagram = String.raw`+---------------+                                                               
|               |                                 X                             
|               |                                / \            +--------------+
|    Human A    +------------+                  /   \           |              |
|               |            |                 /     \          |  Service A   |
|               |            |                /       \     +-->|              |
+---------------+            |               /         \    |   |              |
                             +------------> |    BOT    |---+   +--------------+
                                             \         /    |                   
                                              \       /     |                   
                                               \     /      |                   
                                                \   /       |   +--------------+
                                                 \ /        |   |              |
                                                  V         |   |  Service B   |
               +-------------+                    ^         +-->|              |
               |             |                    |             |              |
               |             |                    |             +--------------+
               |   Human B   +--------------------+                             
               |             |                                                  
               |             |                                                  
               +-------------+`;

const replaceHtmlChars = str => str
  .replace(new RegExp('<','g'), '\u003E')
  .replace(new RegExp('>','g'), '\u003C')
  // .replace(new RegExp('\\\\','g'), '\u005C');

class Content extends React.Component {
  constructor(args) {
    super(args);
    
  }

  render() {
    return (
      <div className="main-content-container clearfix">
        <div className="col col-3">&nbsp;</div>
        <div className="main-content rounded ml4 p3 col col-8">
          <div className="section">
            <h2>Why Chatbots?</h2>

            <p>Chatbots are powerful. They can do anything any other piece of code could do: launch a drone, send an email, talk to an API, retrieve data, take users through rich flows... But they're cheep to build and they last a long time.</p>

            <p>One challenge of developing software is building a rich, intuitive, interface that keeps up with changing requirements. Chatbots are simple. Just messages between the user and the bot. </p>

            <p>The format enforces a minimalist, yet powerful, user interface which is faster to develop. It works in every form-factor and language.</p> 
            <pre><code>{replaceHtmlChars(diagram)}</code></pre>                                          
          </div>
          <Integrations/>

          <div className="section">
            <h2>Responsive by nature</h2>
            <div class="flex flex-wrap">
              <Phone/>
              <Tablet/>
              <Laptop/>
            </div>
            <p>
              Chat works eve
            </p>
          </div>

        </div>
      </div>
    );
  }
}

module.exports = Content;
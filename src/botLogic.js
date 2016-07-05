const emitSym = Symbol('emit')

class Connection {
  constructor(condition, other, description) {
    this.condition = condition;
    this.other = other;
    this.description = description;
  }

  matches(text) {
    text = text.toLowerCase().trim();
    if(typeof this.condition === 'function') {
      return this.condition(text);
    }
    return text === condition;
  }
}

class Node {
  constructor(title, text) {
    this.title = title;
    this.text = text;
    this.connections = [];
  }

  /**
   * tests human input
   * @param  {String} text What the user said
   * @return {Node}      the next node
   */
  send(text) {
    const matchingConnection = this.connections
      .find(con => con.matches(text));
    if(matchingConnection) {
      return matchingConnection.other;
    }
  }

  connect(other, condition, description) {
    if(typeof condition === 'string') {
      condition = condition.toLowerCase().trim();
      description = condition;
    }
    this.connections.push(new Connection(condition, other, description));
  }

  get options() {
    return this.connections.map(con => con.description);
  }
}

class Bot {
  constructor(emit) {
    this[emitSym] = emit;
    this.state = {};
    this.nodes = {};
  }

  addNode(title, text) {
    const newNode = new Node(title, text);

    if(this.empty) {
      this.state.currentNode = newNode;     
    }
    
    this.nodes[title] = newNode;
    return this;
  }

  connect(n1, n2, condition, description) {
    n1 = this.nodes[n1];
    n2 = this.nodes[n2];
    n1.connect(n2, condition, description);
    return this;
  }

  get empty() {
    return !Object.keys(this.nodes).length;
  }

  human(text) {
    const nextNode = this.state.currentNode.send(text);
    if(nextNode) {
      this.state.currentNode = nextNode;
      this[emitSym]({
        text: nextNode.text,
        options: nextNode.options
      });
    } else {
      this[emitSym]({
        text: `Sorry! I didn't understand that. I was expecting...`,
        options: this.state.currentNode.options
      });
    }
  }
}

const matches = word => {
  const thesoris = {
    yes: ['yes','yeah', 'yep', 'sure'],
    no: ['no', 'nope']
  };
  return function(text) {
    return thesoris[word].includes(text);
  }
}

module.exports = emit => {
  return new Bot(emit)
    .addNode('start', '')
    .addNode('welcome', 'Hi! Want to see what chatbots can do?')
    .connect('start','welcome', () => true)
    .addNode('wants to know', `Anything any other piece of code could do: launch a drone, send an email, talk to an API, retrieve data, take users through rich flows... But they're cheep to build and they last a long time.`)
    .addNode(`doesn't want to know`, `Oh come on, you know you do! Please?`)
    .connect('welcome', 'wants to know', matches('yes'), 'yes')
    .addNode('bye', 'Bye!')
    .connect('welcome', `doesn't want to know`, matches('no'), 'no')
    .connect(`doesn't want to know`, 'wants to know', matches('yes'), 'yes')
    .connect(`doesn't want to know`, 'bye', matches('no'), 'no');
};
require('!style!css!sass!./style/index.scss');

const React = require('react');
const ReactDom = require('react-dom');
const Site = require('./site');

ReactDom.render(<Site/>, document.getElementById('site'));

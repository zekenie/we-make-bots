const React = require('react');

const logo = String.raw`     ●     
     │     
 ╭───┴───╮ 
 │ ▇   ▇ │ 
 │ ▙▂▂▂▟ │ 
┌╰───────╯┐
│   WMB   │
└─────────┘`;

module.exports = () => (
  <pre><code>{logo}</code></pre>
);
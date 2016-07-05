const React = require('react');

const nameExceptions = name => {
  return {
    'google-gmail': 'gmail',
    'github-octocat': 'github'
  }[name] || name
}

const makeLogo = name => (
  <div className="p2 pb3 center">
    <img className="fit" src={`/logos/logos/${name}.svg`}/>
    {nameExceptions(name).split('-').join(' ')}
  </div>
  );
const logos = [
  'slack',
  'facebook',
  'github-octocat',
  'twilio',
  'asana',
  'basecamp',
  'hipchat',
  'dropbox',
  'google-drive',
  'google-gmail',
  'mailgun',
  'twitter',
  'skype',
  'trello',
  'paypal',
  'salesforce',
  'stripe',
  'wufoo'];

const makeLogos = () => logos.map((logo, i) => {
  return (
    <div key={i} className="sm-col sm-col-6 md-col-2">
      {makeLogo(logo)}
    </div>
  );
});

module.exports = props => (
  <div className="section">
    <h2>Integrations</h2>
    <div className="flex flex-wrap items-baseline">
      {makeLogos()}
      <p className="center">
        And anything else you can think of
      </p>
    </div>
  </div>
);
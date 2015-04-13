var React = require('react'),
    ReactApp = require('./components/app'),
    flux = require('./flux');

React.render(
  <ReactApp flux={flux} />, 
  document.getElementById('main')
);
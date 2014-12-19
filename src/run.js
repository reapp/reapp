var React  = require('react');
var Router = require('react-router');
var { Promise } = require('bluebird');
var Env = require('./env');

React.initializeTouchEvents(true);

var InjectTapEventPlugin = require('react-tap-event-plugin');
var isTouchDevice = 'ontouchstart' in document.documentElement;
if (isTouchDevice)
  InjectTapEventPlugin();

module.exports = function(routes) {
  var fetchAllData = (routes, params) => {
    var promises = routes
      .filter(route => route.handler.fetchData)
      .reduce((promises, route) => {
        promises[route.name] = route.handler.fetchData(params);
        return promises;
      }, {});

    return Promise.props(promises);
  };

  var render = (Handler, data) => {
    React.render(<Handler data={data} />, document.getElementById('app'));
  };

  function renderSync() {
    Router.run(routes, Router.HistoryLocation, (Handler, state) => {
      fetchAllData(state.routes, state.params).then(data => render(Handler, data));
    });
  }

  function renderAsync() {
    Router.run(routes, Router.HistoryLocation, (Handler, state) => {
      render(Handler, state);
      fetchAllData(state.routes, state.params).then(data => {
        // only re-render if we fetched data
        if (Object.keys(data).length)
          render(Handler, data);
      });
    });
  }

  if (Env.CLIENT)
    renderAsync();
  else
    renderSync();
};
var { State, Navigation } = require('react-router');
var RouteHandler = require('react-router/modules/mixins/RouteHandler');

// mixin for viewlists
// works with react-router and gives some helper functions
// to manage viewLists

module.exports = {
  mixins: [
    State,
    RouteHandler,
    Navigation,
  ],

  routedViewListProps() {
    return {
      scrollToStep: this.scrollToStep(),
      onViewEntered: this._handleViewEntered
    };
  },

  scrollToStep() {
    return this.numActiveRoutes() - this.getRouteDepth();
  },

  routedSubRoute() {
    return this.hasChildRoute() && (
      this.getRouteHandler(Object.assign(this.props, { key: this.subRouteKey() }))
    );
  },

  // todo: debug why this is called more than it should be
  _handleViewEntered(i) {
    if (i === 0 && this.numActiveRoutes() > this.getRouteDepth())
      setTimeout(this.goBack, 1);
  },

  numActiveRoutes() {
    return this.getRoutes().length;
  },

  hasChildRoute() {
    return this.numActiveRoutes() > this.getRouteDepth();
  },

  subRouteKey() {
    return this.getRoutes().reverse()[0].name + this.getParams().id;
  }
};
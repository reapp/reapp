module.exports = function(...actions) {
  return {
    componentWillMount() {
      this.forceUpdater = () => {
        this.forceUpdate();
      };

      actions.forEach(action => {
        action.listen(this.forceUpdater);
      });
    },

    componentWillUnmount() {
      actions.forEach(action => {
        action.unlisten(this.forceUpdater);
      });
    }
  };
};
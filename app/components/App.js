var React = require('react'),
    CardRow = require('./cardrow'),
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var App = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin('GameStore')],

  componentWillMount: function() {
    this.getFlux().actions.createGame(10);
    this.setState(this.getStateFromFlux());
  },

  getStateFromFlux: function() {
    return this.getFlux().store('GameStore').getState();
  },

  render: function() {
    return (
      <div>
        <h2>
          {this.state.message}
        </h2>
        <div className="cards">
          {this.state.game.map(function(row, index) {
            return (<CardRow key={index} row={row} rowIndex={index} />);
          })}
        </div>
      </div>
    );
  }
});

module.exports = App;
var React = require('react'),
    classNames = require('classnames'),
    Fluxxor = require('fluxxor'),
    FluxMixin = Fluxxor.FluxMixin(React);

var Card = React.createClass({

  mixins: [FluxMixin],

  _onClickHandler: function() {
    if (!this.props.showCard) {
      var store = this.getFlux().store('GameStore').getState();
      if (!store.locked) {
        var actions = this.getFlux().actions;

        if (store.matchingValue === null) {
          actions.showCard(this.props.row, this.props.col);
        } else {
          if (store.matchingValue === this.props.matchValue) {
            actions.showCard(this.props.row, this.props.col, true);
          } else {
            actions.showCard(this.props.row, this.props.col, false);
            setTimeout(actions.hideCard.bind(this, this.props.row, this.props.col), 
              2000);
          }
        }
      }
    }
  },

  getDefaultProps: function() {
    return {
      showCard: false,
      hideClass: 'hide'
    }
  },

  render: function() {
    var cls = { card: true };
    cls['card' + this.props.matchValue] = true;
    cls[this.props.hideClass] = !this.props.showCard;

    return (
      <div id={this.props.id} className={classNames(cls)} onClick={this._onClickHandler}>
        &nbsp;
      </div>
    );
  }
});

module.exports = Card;
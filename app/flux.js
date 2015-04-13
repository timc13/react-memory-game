var keyMirror = require('react/lib/keyMirror'),
    Fluxxor = require('fluxxor'),
    Game = require( './game'),
    _ = require('lodash');

var constants = keyMirror({
  CREATE_GAME: null,
  SHOW_CARD: null,
  HIDE_CARD: null
});

var GameStore = Fluxxor.createStore({
  initialize: function() {
    this.game = [];
    this.message = 'Choose a card.';
    this.locked = false;
    this._currentlyMatching = {
      value: null,
      row: null,
      col: null
    };

    this.bindActions(
      constants.CREATE_GAME, this._onCreateGame,
      constants.SHOW_CARD, this._onShowCard,
      constants.HIDE_CARD, this._onHideCard
    );
  },

  _onCreateGame: function(payload) {
    var arr = [];

    for (var i = 1; i <= payload.num; i++) {
      arr.push({ value: i, show: false });
    }

    this.game = Game.generate(arr);
    this.emit('change');
  },

  _setCurrentlyMatching: function(value, row, col) {
    this._currentlyMatching = {
      value: value,
      row: row,
      col: col
    };
  },

  _onShowCard: function(payload) {
    var card = this.game[payload.row][payload.col];
    card.show = true;

    if (payload.isMatch === undefined) {
      this._setCurrentlyMatching(card.value, payload.row, payload.col);
      this.message = 'Find the matching card.';
    } else if (payload.isMatch === true) {
      this._setCurrentlyMatching(null, null, null);
      this.message = !_.some(_.flatten(this.game), 'show', false)
        ? 'You win!'
        : 'Correct match! Pick a card.';
    } else { // payload.isMatch === false
      this.message = 'Wrong match!';
      this.locked = true;
    }
    this.emit('change');
  },

  _onHideCard: function(payload) {
    this.game[this._currentlyMatching.row][this._currentlyMatching.col].show = false;
    this.game[payload.row][payload.col].show = false;
    this._setCurrentlyMatching(null, null, null);
    this.message = 'Pick a card.';
    this.locked = false;
    this.emit('change');
  },

  getState: function() {
    return {
      game: this.game,
      message: this.message,
      matchingValue: this._currentlyMatching.value,
      locked: this.locked
    };
  }
});

var stores = {
  GameStore: new GameStore()
};

var actions = {
  createGame: function(num) {
    this.dispatch(constants.CREATE_GAME, { num: num });
  },

  showCard: function(row, col, isMatch) {
    this.dispatch(constants.SHOW_CARD, { row: row, col: col, isMatch: isMatch });
  },

  hideCard: function(row, col) {
    this.dispatch(constants.HIDE_CARD, { row: row, col: col });
  }
};

var flux = new Fluxxor.Flux(stores, actions);

flux.on('dispatch', function(type, payload) {
  if (console && console.log) {
    console.log('[Dispatch]', type, payload);
  }
});

module.exports = flux;
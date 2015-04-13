var _ = require('lodash');

module.exports = function() {

  function shuffle(array) {
    var currentIndex = array.length;
    var temp, randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }

    return array;
  }

  function squarify(array, cols) {
    var shuffledArray = [];
    var rows = Math.ceil(array.length / cols);

    for (var i = 0; i < rows; i++) {
      var row = [];
      for (var j = 0; j < cols; j++) {
        var rowColIndex = i * cols + j;
        if (rowColIndex < array.length)
          row.push(array[rowColIndex]);
      }

      shuffledArray.push(row);
    }

    return shuffledArray;
  }

  return {
    generate: function(array, cols) {

      var pairs = array.concat(_.cloneDeep(array));

      if (cols) {
        if (cols > pairs.length) {
          throw 'Cannot make ' + cols + ' columns from ' + pairs.length + ' cards.';
        }
      } else {
        cols = Math.floor(Math.sqrt(pairs.length));
      }

      var shuffled = shuffle(pairs);
      return squarify(shuffled, cols);
    }
  };
}()
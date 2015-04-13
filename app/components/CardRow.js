var React = require('react'),
    Card = require('./card');

var CardRow = React.createClass({
  
  render: function() {
    var rowIndex = this.props.rowIndex;

    return (
      <div className="row">
        {this.props.row.map(function(item, index) {  
          var key = 'card_' + item.value + '_' + rowIndex + '_' + index;
          return (
            <Card 
              key={key} 
              id={key} 
              row={rowIndex}
              col={index}
              matchValue={item.value} 
              showCard={item.show} />
          );
        })}
      </div>
    );
  }
});

module.exports = CardRow;
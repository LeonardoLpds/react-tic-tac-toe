import React from 'react';
import Square from './square';

export default class Board extends React.Component {
  renderSquare(i, l) {
    return <Square
      position={l}
      key={i}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick({ i, l })}
      winner={this.props.winner ? this.props.winner.includes(i) : false}
    />;
  }

  render() {
    let count = 0;
    let board = [];
    for (let line = 0; line < 3; line++) {
      let squares = []
      for (let column = 0; column < 3; column++) {
        squares.push(this.renderSquare(count, `${column},${line}`))
        count++;
      }
      board.push(<div key={line} className="flex">{squares}</div>)
    }
    return (
      <div>
        {board}
      </div>
    );
  }
}
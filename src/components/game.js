import React from 'react';
import Board from './board';
import calculateWinner from '../helpers/calculate-winner';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null), moveLocation: null }],
      stepNumber: 0,
      xIsNext: true,
      sortAscending: true,
    }
  }

  handleClick(square) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[square.i]) return;
    squares[square.i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{ squares: squares, moveLocation: square.l }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move} (${step.moveLocation})` :
        'Go to game start';
      return (
        <li key={move}>
          <button className={move == this.state.stepNumber ? 'bold' : ''} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    if (winner) status = "Winner: " + current.squares[winner[0]];
    if (!winner && !current.squares.includes(null)) status = "Draw";
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={square => this.handleClick(square)} winner={winner} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.setState({ sortAscending: !this.state.sortAscending })}>
            Sort moves {this.state.sortAscending ? 'descending' : 'ascending'}
          </button>
          <ol>
            {this.state.sortAscending ? moves.sort() : moves.reverse()}
          </ol>
        </div>
      </div>
    );
  }
}
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
          <button className={move == this.state.stepNumber ? 'font-bold' : ''} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status = '<span>Next player: </span>' + '<span class="font-bold text-2xl">' + (this.state.xIsNext ? 'X' : 'O') + '</span>';
    if (winner) status = "<span class='text-green-400 font-bold'>WINNER: </span>" + '<span class="font-bold text-2xl text-green-400">' + current.squares[winner[0]] + '</span>';
    if (!winner && !current.squares.includes(null)) status = "Draw";
    return (
      <div className="p-8 m-auto max-w-screen-md flex flex-row flex-wrap gap-4">
        <div className='mx-auto flex items-center mb-8 justify-center gap-2 font-xl basis-full shrink-0' dangerouslySetInnerHTML={{ __html: status }}></div>
        <div className="mx-auto">
          <Board squares={current.squares} onClick={square => this.handleClick(square)} winner={winner} />
        </div>
        <div className='mx-auto'>
          <button
            onClick={() => this.setState({ sortAscending: !this.state.sortAscending })}
            className='font-bold text-center text-green-800 border-b mb-4 w-full'
          >
            Move history ↕
          </button>
          <ol>
            {this.state.sortAscending ? moves.sort() : moves.reverse()}
          </ol>
        </div>
      </div>
    );
  }
}
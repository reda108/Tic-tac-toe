import React from 'react';
import calculateWinner from './calculateWinner';
import isBoardFull from './isBoardFull';

class ComputerPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: props.squares,
      computerIsX: props.computerIsX,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      squares: nextProps.squares,
    });
  }

  getComputerMove() {
    const squares = this.state.squares.slice();
    const computerSymbol = this.state.computerIsX ? 'X' : 'O';
    const playerSymbol = this.state.computerIsX ? 'O' : 'X';

    // Check if computer can win in the next move
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = computerSymbol;
        if (calculateWinner(squares) === computerSymbol) {
          return i;
        }
        squares[i] = null;
      }
    }

    // Check if player can win in the next move and block them
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = playerSymbol;
        if (calculateWinner(squares) === playerSymbol) {
          return i;
        }
        squares[i] = null;
      }
    }

    // Play center square if available
    if (squares[4] === null) {
      return 4;
    }

    // Play a random move
    let move;
    do {
      move = Math.floor(Math.random() * squares.length);
    } while (squares[move] !== null);

    return move;
  }

  render() {
    return null;
  }
}

export default ComputerPlayer;

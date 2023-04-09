import React from 'react';
import calculateWinner from './calculateWinner';
import Square from './Square';
import isBoardFull from './isBoardFull';
import ComputerPlayer from './ComputerPlayer2';

class Game2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      isComputerTurn: false,
      gameMode: 'human-vs-human',
      difficultyLevel: 'medium', // set initial difficulty level to easy
    };
    this.computerPlayer = new ComputerPlayer(this.state.difficultyLevel); // pass the initial difficulty level to the ComputerPlayer constructor
    this.handleDifficultyLevelChange = this.handleDifficultyLevelChange.bind(this);

  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    if (!isBoardFull(squares) && this.state.gameMode === "human-vs-human") {
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }
    if (!isBoardFull(squares) && this.state.gameMode === "player-vs-computer") {
      squares[i] = "X";
      this.setState({
        squares: squares,
      });
      setTimeout(() => {
        const computerMove = this.computerPlayer.getMove(squares, 'O');
        squares[computerMove] = 'O';
        this.setState({
          squares: squares,
          xIsNext: true,
        });
      }, 500);
    }
  }

  handleNewGameClick() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      isComputerTurn: false,
    });
  }

  componentDidUpdate() {
    if (this.state.gameMode === "player-vs-computer" && !this.state.xIsNext && this.state.isComputerTurn) {
      const squares = this.state.squares.slice();
      const computerMove = this.computerPlayer.getMove(squares, 'O');
      squares[computerMove] = 'O';
      this.setState({
        squares: squares,
        xIsNext: true,
        isComputerTurn: false,
      });
    }
  }

  handleGameModeClick() {
    this.handleNewGameClick();
    this.setState({
      gameMode: this.state.gameMode === "human-vs-human" ? "player-vs-computer" : "human-vs-human",
    });
  }
  handleDifficultyLevelChange = (event) => {
    const value = event.target.value;
  
    if (value) {
      const computerPlayer = new ComputerPlayer(value);
      this.setState({
        difficultyLevel: value,
        computerPlayer: computerPlayer, // update key name to match variable name
      });
    }
  }
  
  


  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        key={i}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let gameStatus;
    if (winner) {
      gameStatus = "Gagnant: " + winner;
    } else if (isBoardFull(this.state.squares)) {
      gameStatus = "Egalité";
    } else if (this.state.gameMode === "player-vs-computer" && !this.state.xIsNext) {
      gameStatus = "Le Pc Joue...";
    } else {
      gameStatus = "Nouveau  Joueur: " + (this.state.xIsNext ? "X" : "O");
    }
  
    return (
      <div   style={{ backgroundImage:'url("https://thumbs.dreamstime.com/b/tic-tac-toe-pattern-blue-background-chaotic-sample-74834641.jpg")' , color : 'deepskyblue',textAlign:'center'}} >
      
        <div style={{  background : '#8aebe6' ,color:'black', height:70,fontSize :50 ,textAlign:'center'}} className="game-status">Morpion</div>
        <div style={{  color : 'black',fontSize :30 ,marginTop:25 ,textAlign:'center'}} className="game-status">{gameStatus}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
       
        <button style={{ marginBottom:500,marginTop :30, color : 'deepskyblue', fontSize :17 }} onClick={() => this.handleNewGameClick()}>Nouveau jeux</button>
        <button style={{  color : 'deepskyblue',fontSize :17 }} onClick={() => this.handleGameModeClick()}>
          Changer vers {this.state.gameMode === "human-vs-human" ? "humain-vs-cpu" : "human-vs-human"}
        </button>
        
        
       
        {this.state.gameMode === "player-vs-computer" && !this.state.xIsNext && (
          <ComputerPlayer difficultyLevel="hard"  />
        )}
                  <ComputerPlayer difficultyLevel="easy"  />
                    
                   
      </div>
    );
  }
  
}

export default Game2;

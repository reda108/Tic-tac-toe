import logo from './logo.svg';
import './App.css';
import Square from "./Square";
import Board from "./Board";
import Game from './Game2';
import ComputerPlayer from './ComputerPlayer2';
import Test from './Test';


function App() {
  return (
    <div style={{ backgroundImage:'url("https://thumbs.dreamstime.com/b/tic-tac-toe-pattern-blue-background-chaotic-sample-74834641.jpg")' , color : 'deepskyblue',textAlign:'center'}}>
        <Game/>
    </div>
  );
}

export default App;

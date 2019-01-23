import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

const createArray = (size) => 
   Array.from({ length: size }, (_, i) => i);

class Cell extends React.Component {
	backgroundColor = () => {
    	if (this.props.showAsSelected) {
      		return this.props.cellIsChallenge ? 'green' : 'red';
    	}
    	if (this.props.showAsChallenge) {
      		return 'blue';
    	}
    		return 'white';
  	};

  	handleClick = () => {
    	this.props.onClick(this.props.id);
  	};

  render() {
    return (
      <div 
        className = "cell"
        style = {{
          width: `${this.props.widthPercentage}%`,
          backgroundColor: this.backgroundColor()
        }}
        onClick = {this.handleClick}
       />
    );
  }
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {num: props.challengeSize, wrongNum: props.wrongsAllowed, gameStatus: 'new', selectedCells: []};
	}

	static messages = {
    new: 'Click the Start button to play.',
    challenge: 'Memorize these blue cells!',
    playing: 'Recall the cells that were blue.',
    won: 'You Win!',
    lost: 'Game Over!',
  	};

	grid = createArray(this.props.gridSize * this.props.gridSize);
  	cellWidthPercentage = (100 / this.props.gridSize) - 0.221;
  	challengeCells = [];

 	showChallengeCells = () =>
    ['challenge', 'lost'].includes(this.state.gameStatus);
    
  	showSelectedCells = () =>
    ['playing', 'won', 'lost'].includes(this.state.gameStatus);
    
  	gameIsIdle = () =>
    ['new', 'won', 'lost'].includes(this.state.gameStatus);

    startGame = () => {
  		clearTimeout(this.timerId);
  		this.challengeCells = _.sampleSize(
    		this.grid, 
    		this.props.challengeSize
  		);
  		this.setState(
    		{ gameStatus: 'challenge', selectedCells: [] },
    		() =>	(this.timerId = setTimeout(
        				() => this.setState({ gameStatus: 'playing' }),
        			500))
  		);
	};

	onCellClick = (cellId) => {
    	if (this.state.gameStatus !== 'playing') {
      		return;
    	}
    	if (this.state.selectedCells.indexOf(cellId) >= 0) {
      		return;
    	}
     	this.setState((prevState) => ({
      		selectedCells: [...prevState.selectedCells, cellId],
      		gameStatus: this.calcNewGameStatus(
        		[...prevState.selectedCells, cellId]
      		),
    	}));
  	};

	calcNewGameStatus = (newSelectedCells) => {
    	if (_.difference(this.challengeCells, newSelectedCells).length === 0) {
      		return 'won';
    	}
    	if (_.difference(newSelectedCells, this.challengeCells).length === this.props.wrongsAllowed) {
      		return 'lost';
   		}
    	return 'playing';
  	};

	render() {
		return (
		<div className="game">
        	<div className="help">
        		<h4>You will have half a second to memorize {this.state.num} blue random cells. You are allowed {this.state.wrongNum} wrong guesses.</h4>
        	</div>
	        <div className="grid">
	        	{this.grid.map((cellId) => {
	        		const cellIsChallenge = this.challengeCells.indexOf(cellId) >= 0;
            		const cellIsSelected = this.state.selectedCells.indexOf(cellId) >= 0;
            		return (
        				<Cell 
        				key={cellId}
        				id={cellId}
                		onClick={this.onCellClick}
        				cellIsChallenge={cellIsChallenge}
            			showAsChallenge={
              				this.showChallengeCells() && cellIsChallenge
            			}
            			showAsSelected={
              				this.showSelectedCells() && cellIsSelected
            			}
        				widthPercentage={this.cellWidthPercentage} />
         		 	);
         		})}
	        </div>
        	{this.gameIsIdle() && (
          		<button onClick = {this.startGame} className = "button">
            		{this.state.gameStatus === 'new' ? 'Start' : 'Play Again'}
          		</button>
       		 )}
        	<div className="message">{App.messages[this.state.gameStatus]}</div>
      	</div>
		)
	}
}

ReactDOM.render(
	<App />, 
	document.getElementById('root')
);

export default App;
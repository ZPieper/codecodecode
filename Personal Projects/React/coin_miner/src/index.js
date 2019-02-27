// <Route path="/somePath" render={() => <SomeComponent someProp={prop} />} />

import React from 'react';
import ReactDOM from 'react-dom';
import "react-router";
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import './index.css';

import Home from "./Components/Home/home.js"
import Mine from "./Components/Mine/mine.js"
import Pawn from "./Components/Pawn/pawn.js"
import Ledger from "./Components/Ledger/ledger.js"
import Game from "./Components/Game/game.js"

class App extends React.Component {
	constructor (props) {
		super(props);
		this.state = {ledger: [],
				dollarValue: 1,
				numCoins: 0,
				id: 1};

		this.handleMine = this.handleMine.bind(this);
		this.handleBuy = this.handleBuy.bind(this);
		this.handleSell = this.handleSell.bind(this);
	}

	handleMine () {
		this.state.ledger.push({id: this.state.id, action: "Mined", amt: 1, value: this.state.dollarValue});
		this.setState({dollarValue: this.state.dollarValue + 1, numCoins: this.state.numCoins + 1, id: this.state.id + 1});
	}

	handleBuy (amt) {
		this.state.ledger.push({id: this.state.id, action: "Bought", amt: Number(amt), value: this.state.dollarValue});
		this.setState({dollarValue: this.state.dollarValue + amt, numCoins: this.state.numCoins + amt, id: this.state.id + 1});
	}

	handleSell (amt) {
		this.state.ledger.push({id: this.state.id, action: "Sold", amt: Number(amt), value: this.state.dollarValue});
		this.setState({dollarValue: this.state.dollarValue - amt, numCoins: this.state.numCoins - amt, id: this.state.id + 1});
	}

	render () {
		var handleMine = this.handleMine;
		var handleBuy = this.handleBuy;
		var handleSell = this.handleSell;
        return (
            <BrowserRouter>
                <div id = "whole">
	                <div id = "link_holder">
	                	<div className = "grey">
	                        <Link to="/home" className = "link" id = "first">Home</Link>
	                    </div>
	                    <div className = "grey">
	                        <Link to="/mine" className = "link">Mine Coins</Link>
	                    </div>
	                    <div className = "grey">
	                        <Link to="/buy" className = "link">Buy Coins</Link>
	                    </div>
	                    <div className = "grey">
	                        <Link to="/sell" className = "link">Sell Coins</Link>
	                    </div>
	                    <div className = "grey">
	                        <Link to="/ledger" className = "link" id = "last">Browse Ledger</Link>
	                    </div>
	                    <div className = "grey" id = "blue">
	                        <Link to="/mem_game" className = "link" id = "game_link">Take a Break</Link>
	                    </div>
	                </div>
                    <Switch>
                    	<Route exact path = "/" component = {Home} />
                    	<Route path = "/home" component = {Home} />
                    	<Route path = "/mine" render = {() => <Mine ledger = {this.state.ledger} numCoins = {this.state.numCoins} handleMine = {handleMine.bind(this)} />} />
                    	<Route path = "/buy" render = {() => <Pawn ledger = {this.state.ledger} dollarValue = {this.state.dollarValue} centValue = {this.state.centValue} numCoins = {this.state.numCoins} handleBuy = {handleBuy.bind(this)} handleSell = {handleSell.bind(this)}  />} />
                    	<Route path = "/sell" render = {() => <Pawn ledger = {this.state.ledger} dollarValue = {this.state.dollarValue} centValue = {this.state.centValue} numCoins = {this.state.numCoins} handleBuy = {handleBuy.bind(this)} handleSell = {handleSell.bind(this)} />} />
                    	<Route path = "/ledger" render = {() => <Ledger ledger = {this.state.ledger} />} />
                    	<Route path = "/mem_game" render = {() => <Game gridSize = {4} challengeSize = {4}  wrongsAllowed = {2} />} />
                    	<Route component = {Home} />
                    </Switch>
                    <div id = "footer">
                    	<div className = "grey" id = "help_link">
                    		<a href = "https://assistant-chat-us-south.watsonplatform.net/web/public/881e5654-0def-4e2f-b9be-f866becc4660" target = "_blank" rel = "noopener noreferrer" className = "link">Get Help</a>
                    	</div>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
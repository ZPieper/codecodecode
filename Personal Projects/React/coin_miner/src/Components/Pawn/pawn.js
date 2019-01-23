import React from 'react';
import ReactDOM from 'react-dom';

class Pawn extends React.Component {
	_isMounted = false;
	constructor (props) {
		super(props);
		this.state = {amountValue: '',
				isError: false};

		this.handleAmountChange = this.handleAmountChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount () {
		this._isMounted = true;
		// setTimeout(() => {
		// 	this.typePage_question();
		// 	console.log("heyo")
		// }, 100);
	}

	// typePage_question () {
	// 	if (this._isMounted) {
	// 		if (window.location["pathname"] === "/buy") {
	// 			this.setState({typePage: 'buy'});
	// 		}
	// 		else {
	// 			this.setState({typePage: 'sell'});
	// 		}
	// 	}
	// }

	componentWillUnmount () {
		this._isMounted = false;
	}

	handleAmountChange(event) {
    	this.setState({amountValue: event.target.value});
  	}

  	handleSubmit(event) {
    	if (((Number(this.state.amountValue) > this.props.numCoins) && (window.location["pathname"] === "/sell")) || Number.isNaN(Number(this.state.amountValue)) ) {
    		this.setState({isError: true});
	    }
	    else if (window.location["pathname"] === "/sell") {
    		this.props.handleSell(Number(this.state.amountValue));
    		this.setState({amountValue: '', isError: false});
	    }
	    else {
    		this.props.handleBuy(Number(this.state.amountValue));
    		this.setState({amountValue: '', isError: false});
    	}
    	event.preventDefault();
  	}

  	render () {
        return (
            <div className = "component" id = "turn_orange">
                <h1>{window.location["pathname"] === "/buy" ? "Buy" : "Sell"} Coins</h1>
                <h3>Current Coin Value: ${this.props.dollarValue}</h3>
                <h3>Number of Coins Owned: {this.props.numCoins}</h3>
                <form onSubmit = {this.handleSubmit}>
                <label>
                	<span className = "error">{this.state.isError ? "Cannot sell that many coins or input must be a number." : null}</span>
                </label>
  				<label> 
  					<input type = "text" value = {this.state.amountValue} placeholder = "Number" onChange = {this.handleAmountChange} className = "push_right" />
  					<input type = "submit" disabled = {this.state.amountValue.length === 0} value = {window.location["pathname"] === "/buy" ? "Buy" : "Sell"} className = "button" />
  				</label>
  				</form>
            </div>
        )
    }
}

ReactDOM.render(
	<Pawn />,
	document.getElementById('root')
);

export default Pawn;
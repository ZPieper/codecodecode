import React from 'react';
import ReactDOM from 'react-dom';
import "react-router";
import {BrowserRouter, Link} from 'react-router-dom';

class Row extends React.Component {
	constructor (props) {
		super(props);
		this.information = props["info"];
	}

	render () {
		return (
			<div>
				<tr>
					<td>{this.information["action"]}</td>
					<td>{this.information["amt"]}</td>
					<td>{this.information["value"]}</td>
					<td>
						<BrowserRouter>
							<div>
								<Link to={`/transaction/${this.information["id"]}`} onClick = {() => this.props.changePage(this.information)}>See This Transaction</Link>
							</div>
						</BrowserRouter>
					</td>
				</tr>
			</div>
		)
	}
}

class Ledger extends React.Component {
	_isMounted = false;
	constructor (props) {
		super(props);
		this.state = {showingTransaction: false, list: this.props.ledger, trans: {}};
		this.changePage = this.changePage.bind(this);
	}

	componentDidMount () {
		this._isMounted = true;
		setTimeout(() => {
			this.reset();
		}, 250);
	}

	componentWillUnmount () {
		this._isMounted = false;
	}

	changePage (info) {
		this.setState({showingTransaction: true, trans: info});
	}

	reset () {
		if (this._isMounted) {
			this.setState({showingTransaction: false});
			this.setState({list: this.props.ledger});
		}
	}

	render () {
		var changePage = this.changePage;
        return (
            <div className = "component" id = "turn_red">
            	{this.state.showingTransaction && !(window.location["pathname"] === "/ledger") ? 
            	<div> 
            		<h1>Ledger Transaction Details</h1>
                	<h3>Detailed view of a transaction from the ledger.</h3>

                	<p>Transaction #{this.state.trans["id"]}</p>
                	<p>{this.state.trans["action"]} {this.state.trans["amt"]} Coin{this.state.trans["amt"] > 1 ? "s" : null}</p>
            	</div>:
            	<div>
            	<h1>Browse the Ledger</h1>
            	<table>
            		<tbody>
            		<tr>
            			<th>ShintoCoin Ledger</th>
            		</tr>
            		<tr>
            			<td>Action</td>
            			<td>Amount</td>
            			<td>Value</td>
            			<td></td>
            		</tr>
            		{(this.state.list) && (this.state.list.length > 0) ? this.state.list.map((i) => {
            			return (
            				<Row key = {i} info = {i} changePage = {changePage.bind(this)}/>
            			)
            		}) : null}
            		</tbody>
                </table>
                </div>
            	}
            </div>
        )
    }
}

ReactDOM.render(
	<Ledger />,
	document.getElementById('root')
);

export default Ledger;
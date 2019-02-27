import React from 'react';
import ReactDOM from 'react-dom';

class Home extends React.Component {
	render () {
        return (
            <div className = "component">
                <h1>Coin Miner</h1>
                <h3>Welcome to Coin Miner, where coins are made by solving trivia questions! To get started, head over to Mine Coins! If you need any assistance, hit the Get Help button below!</h3>
            </div>
        )
    }
}

ReactDOM.render(
	<Home />,
	document.getElementById('root')
);

export default Home;
import React from 'react';
import ReactDOM from 'react-dom';

class Mine extends React.Component {
	_isMounted = false;
	constructor (props) {
		super(props);
		this.state = {question: '',
				correctAnswer: '',
				answerValue: '',
				pastAnswer: '',
				isWrong: '',
				showAnswer: false};

		this.handleAnswerChange = this.handleAnswerChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
	}

	componentDidMount () {
		this._isMounted = true;
		setTimeout(() => {
			this.getQuestion()
		}, 100);
	}

	componentWillUnmount () {
		this._isMounted = false;
	}

	handleAnswerChange(event) {
    	this.setState({answerValue: event.target.value, isWrong: false});
  	}

  	handleSubmit(event) {
    	if (!this.state.answerValue.length !== 0) {
    		if (this.state.correctAnswer.toLowerCase() === this.state.answerValue.toLowerCase()) {
    			this.setState({isWrong: 'no', answerValue: '', showAnswer: false});
    			this.props.handleMine();
    			this.getQuestion();
    		}
    		else {
    			this.setState({isWrong: 'yes', pastAnswer: this.state.correctAnswer, answerValue: '', showAnswer: false});
    			this.getQuestion();
    		}
	    }
    	event.preventDefault();
  	}

  	handleAnswerSubmit(event) {
  		this.setState({showAnswer: true});
  		event.preventDefault();
  	}

  	getQuestion () {
  		if (this._isMounted) {
			fetch('https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=boolean')
    			.then(data => {
    				return data.json()
    			})
    			.then(json => { 
    				this.setState({question: json["results"][0]["question"], correctAnswer: json["results"][0]["correct_answer"]});
    			})
    	}
	}

	render () {
        return (
          <div className = "component" id = "turn_purple">
              <h1>Mine Coins</h1>
              <h3>Here you can mine coins if you get trivia questions correct!</h3>
              <div className = "half">
                  <h5>True or False?</h5>
                  <label> 
                     <span className = "title">{this.state.question}</span>
                  </label>
                  <div id = "answer">
                  <form onSubmit = {this.handleAnswerSubmit}>
                    <span className = "title">{this.state.showAnswer ? this.state.correctAnswer : null}</span>
                    <input type = "submit" value = "See Answer" id = "right" className = "button" />
                  </form>
              </div>
              </div>
              <div className = "half">
              <form onSubmit = {this.handleSubmit}>
                  <div className = "inputs">
                  <label>
                	   <span className = "error">{ (this.state.isWrong === 'yes') ? "Sorry, the correct answer was " + this.state.pastAnswer + "." : null }</span>
  					         <span className = "correct">{ (this.state.isWrong === 'no') ? "That is correct!" : null}</span>
                  </label>
                  </div>
                  <div className = "inputs">
  					         <input type = "text" value = {this.state.answerValue} onChange = {this.handleAnswerChange} className = "push_right" />
  				           <input type = "submit" disabled = {this.state.answerValue.length === 0} value = "Submit" className = "button" />
                  </div>
              </form>
  				    </div>
          </div>
        )
    }
}

ReactDOM.render(
	<Mine />,
	document.getElementById('root')
);

export default Mine;
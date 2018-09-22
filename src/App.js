import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import he from "he";
class App extends Component {
  //props
  //state is the values that changes
  constructor(props){
    super(props);
    this.state ={
      data: [],
      //states
      scoreCorrect : 0,
      scoreWrong :0,
      categoryDisplay: " ",
      questionDisplay: " ",
      wrongAnswerDisplay: [],
    };
    
  }
  //API component mount
  componentDidMount(){
    //fetch call
    this.getData();
  }
getData = () => {
    const url = 'https://opentdb.com/api.php?amount=10';

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          data: data.results,
        });
      })
      .catch(error => {
        return error;
      });
  };
  //get the trivia question with this fucntion
 getQuestion = () => {
    let dataSet;
    const questionList = [...this.state.data];
    dataSet = questionList.pop();
    dataSet.incorrect_answers.push(dataSet.correct_answer);
    this.setState({
      questionDisplay: he.decode(dataSet.question),
      wrongAnswerDisplay: dataSet.incorrect_answers,
      correctAnswerDisplay: dataSet.correct_answer,
      categoryDisplay: dataSet.category,
      data: questionList,
    });
    if (questionList.length === 0) {
      this.getData();
    }
  };
  
  
  render(){
    //view API results data
    console.log("trivia information", this.state.data);
    return (
      <div className="App">
        <header className = "App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className = "TRIVIA GAME">Trivia Game </h1>
        </header>
        <p className="TRIVIA GAME"> </p>
        <h1> Score</h1>
        <h3>Correct: {this.state.scoreCorrect}</h3>
        <h3>Wrong: {this.state.scoreWrong}</h3>
        <h1>Category: {this.state.categoryDisplay}</h1>
        <h1>Question:</h1>
        <h3>{this.state.questionDisplay}</h3>
        
        <button id="triviaQuestionBtn" onClick={this.getQuestion}>Click Me For a Question</button>
        <form>
            {this.state.wrongAnswerDisplay.map(answer => {
              return  <li id = "mapList">{answer}</li>;
              
            }
            )};
        </form>
      </div>
    );
  }
}

export default App;

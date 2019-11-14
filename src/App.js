import React, { Component }  from 'react';
import './App.css';
import Wrapper from "./components/wrapper";
import Navbar from "./components/navbar";
import Jumbotron from "./components/jumbotron"
import Card from "./components/card";
import {Container, Row, Column} from "./grid";
import fruits from "./fruits.json";
import "./App.css";


function randomFruits(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  state = {
    fruits : fruits, 
    score : 0,
    highscore : 0, 
    clicked : [], 
    response: ""
  }


  handleClick = (id) => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.score + 1;
    this.setState({
      score: newScore,
      response: "Correct!"
    });
    if (newScore >= this.state.highscore) {
      this.setState({ highscore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ response: "Congratulations, You Win!" });
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      score: 0,
      highscore: this.state.highscore,
      response: "Incorrect!",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledFruits = randomFruits(fruits);
    this.setState({ fruits: shuffledFruits });
  };

  render() {  
    return (
    
    <div className="App">
      <Wrapper>
      <Navbar
        nameHREF = "Clicky Memory Game"
        score = {this.state.score}
        highscore = {this.state.highscore}
      />
        <Jumbotron
          instructions = "Click on a fruit to begin. Be careful not to click on the same fruit twice!"
        />
      <Container>
        <Row>
          {this.state.fruits.map(fruit => (
            <Column size="sm-3">
            <Card
               key={fruit.id}
               handleClick={this.handleClick}
               handleIncrement={this.handleIncrement}
               handleReset={this.handleReset}
               handleShuffle={this.handleShuffle}
               id={fruit.id}
               image={fruit.image}
            />
           </Column> 
           ))}
        </Row>
      </Container>
      </Wrapper>
    </div>
  )}
}

export default App;

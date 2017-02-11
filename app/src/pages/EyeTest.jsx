import React from 'react';
import poems from "../../data/poem.json";

class EyeTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getRandomSentence() {
    return poems[Math.floor(Math.random() * poems.length)]
  }

  getItems() {
    const items = [];
    for (var i = 100; i > 8; i-=2) {
      items.push(
        <p style={{"font-size": i+"px"}} key={i}>{i}:{this.getRandomSentence()}</p>
      );
    }
    return items;
  }

  render() {
    return (
      <div style={{"width": "100%"}}>
        <h1>H1:{this.getRandomSentence()}</h1>
        <h2>H2:{this.getRandomSentence()}</h2>
        <h3>H3:{this.getRandomSentence()}</h3>
        <h4>H4:{this.getRandomSentence()}</h4>
        <h5>H5:{this.getRandomSentence()}</h5>
        <hr/>
        {this.getItems().map((item) => item)}
      </div>
    );
  }
}

module.exports = EyeTest;

import React, { Component } from 'react';
import './App.css';
import Saisie from './components/saisie';
import Resultat from './components/resultat';
import Axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  saveInput(newInput) {
    this.setState({ input: newInput });
    this.synonym()
  }

  synonym() {
    var wordTab = this.state.input.split(' ');
    var requetesTab = [];
    wordTab.forEach(current => requetesTab.push(Axios.get("https://wordsapiv1.p.mashape.com/words/" + current + "/synonyms")));
    Axios.all(requetesTab.map(function(current){return current})).then(function(info) {console.log(info.map)})
  }


  render() {
    return (
      <div className="App">
        <h1>Synonyms</h1>
        <p>Type some text and this React application will replace some words by their synonyms. <br />
        Yes, this is completely useless. A bit funny, though.</p>
        <Saisie
          saveInput={this.saveInput.bind(this)} />
        <Resultat
          text={this.state.input} />
      </div>
    );
  }
}

export default App;

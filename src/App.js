import React, { Component } from 'react';
import './App.css';
import Saisie from './components/saisie';
import Resultat from './components/resultat';
import Axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: "",
      token: 'Q5j2hPCD765Hrz6k',
      userid: '8173'
    };
  }

  saveInput(newInput) {
    this.setState({ input: newInput });
  }

  synonym() {
    console.log(this.state);
    var wordTab = this.state.input.split(' ');
    var requetesTab = [];
    var synonymTabs = [];
    wordTab.forEach(current => requetesTab.push(Axios.get("https://www.abbreviations.com/services/v2/syno.php?uid=" + this.state.userid + "&tokenid=" + this.state.token + "&word=" + current + "&format=json")));
    Axios.all(requetesTab).then(Axios.spread((...responses) => {
      console.log(responses);
      for (let i = 0; i < wordTab.length; i++) {
        console.log("i = " + i)
        let allSynonyms = responses[i]['data']['result'][0]['synonyms'];
        console.log("synonyms = '" + allSynonyms + "'");
      }
      // use/access the results 
    })).catch(errors => {
      // react on errors.
    })
  }


  render() {
    return (
      <div className="App">
        <h1>Synonyms</h1>
        <p>Type some text and this React application will replace some words by their synonyms. <br />
        Yes, this is completely useless. A bit funny, though.</p>
        <Saisie
          saveInput={this.saveInput.bind(this)} />
        <button onClick={this.synonym.bind(this)}>Synonymize</button>
        <Resultat
          text={this.state.input} />
      </div>
    );
  }
}

export default App;

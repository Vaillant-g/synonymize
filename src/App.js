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
      userid: '8173',
      displaytext: ''
    };
  }

  saveInput = (newInput) => {
    this.setState({ input: newInput });
  }

  setDisplaytext = (synonymTabs) => {

  }

  synonym = () => {
    var wordTab = this.state.input.split(' ');
    var requetesTab = [];
    var synonymTabs = [];
    wordTab.forEach(current => requetesTab.push(Axios.get("https://www.abbreviations.com/services/v2/syno.php?uid=" + this.state.userid + "&tokenid=" + this.state.token + "&word=" + current + "&format=json")));
    Axios.all(requetesTab).then(Axios.spread((...responses) => {
      for (let i = 0; i < wordTab.length; i++) {
        if (typeof (responses[i].data.result) == 'undefined') {
          // console.log('synonyme pas trouvé')
          synonymTabs[i] = wordTab[i] + ' ';
        }
        else {
          // console.log('synonyme trouvé : ' + responses[i].data.result[0].synonyms)
          let allSynonyms = responses[i].data.result[0].synonyms.split(', ');
          synonymTabs[i] = allSynonyms[0] + ' ';
        }
      }
      this.setState({ displaytext: synonymTabs.join(' ') });
    })).catch(errors => {
      console.log(errors)
    })
  }



  render() {
    return (
      <div className="App">

        {/* <p>Type some text and this React application will replace some words by their synonyms. <br />
        Yes, this is completely useless. A bit funny, though.</p> */}
        <Saisie
          saveInput={this.saveInput.bind(this)} />
        <a onClick={this.synonym.bind(this)}>        <h1>Synonymize <i className="fa fa-mouse-pointer" aria-hidden="true"></i></h1> </a>
        {this.state.displaytext.length > 1 &&
          <Resultat
            text={this.state.displaytext} />
        }
      </div>
    );
  }
}

export default App;

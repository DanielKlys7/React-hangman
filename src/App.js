import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    word: [],
    wordPlaceholders: [],
    wordRemove: [],
  }

  keypressCheckFunction = (parseLetter) => {
    this.state.word.forEach((letter, index) => {
      if (parseLetter === letter) {
        console.log(letter, index)
        this.setState(() => {
          let arrayToUpdate = [...this.state.wordPlaceholders];
          arrayToUpdate.splice(index, 1, letter)
          return ({
            wordPlaceholders: arrayToUpdate,
          })
        })
      }
    })
  }

  handleWordPlaceholders = () => {
    let wordPlaceholders = [];
    this.state.word.forEach((sign) => {
      if ("abcdefghijklmnopqrstuvwxyz".split('').includes(sign)) {
        wordPlaceholders.push('_');
      } else if (sign === " ") {
        wordPlaceholders.push(' ');
      } else if (sign === "-") {
        wordPlaceholders.push('-')
      }
    })
    this.setState({
      wordPlaceholders: wordPlaceholders
    })
  }

  keypressHandler = (e) => {
    switch (e.keyCode) {
      case 81:
        this.keypressCheckFunction('q')
        break;
      case 87:
        this.keypressCheckFunction('w')
        break;
      case 69:
        this.keypressCheckFunction('e')
        break;
      case 82:
        this.keypressCheckFunction('r')
        break;
      case 84:
        this.keypressCheckFunction('t')
        break;
      case 89:
        this.keypressCheckFunction('y')
        break;
      case 85:
        this.keypressCheckFunction('u')
        break;
      case 73:
        this.keypressCheckFunction('i')
        break;
      case 79:
        this.keypressCheckFunction('o')
        break;
      case 80:
        this.keypressCheckFunction('p')
        break;
      case 65:
        this.keypressCheckFunction('a')
        break;
      case 83:
        this.keypressCheckFunction('s')
        break;
      case 68:
        this.keypressCheckFunction('d')
        break;
      case 70:
        this.keypressCheckFunction('f')
        break;
      case 71:
        this.keypressCheckFunction('g')
        break;
      case 72:
        this.keypressCheckFunction('h')
        break;
      case 74:
        this.keypressCheckFunction('j')
        break;
      case 75:
        this.keypressCheckFunction('k')
        break;
      case 76:
        this.keypressCheckFunction('l')
        break;
      case 90:
        this.keypressCheckFunction('z')
        break;
      case 88:
        this.keypressCheckFunction('x')
        break;
      case 67:
        this.keypressCheckFunction('c')
        break;
      case 86:
        this.keypressCheckFunction('v')
        break;
      case 66:
        this.keypressCheckFunction('b')
        break;
      case 78:
        this.keypressCheckFunction('n')
        break;
      case 77:
        this.keypressCheckFunction('m')
        break;
      default:
        console.log('choose your letter');
        break;
    }
  }

  componentDidMount() {
    fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": "07dcb06ec7msh4bac7eab1a6edc2p18a2d1jsna30d60c1654b"
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ word: data.word.split('') });
      })
      .then((data) => {
        this.setState({ wordRemove: this.state.word })
        this.handleWordPlaceholders()
      })
    document.addEventListener("keydown", this.keypressHandler)

  }

  render() {
    return (
      <div>
        {this.state.wordPlaceholders}
      </div>
    );
  }
}

export default App;

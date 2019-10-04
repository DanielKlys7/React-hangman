import React, { Component } from 'react';
import './App.sass';
import Letter from '../Letter/Letter'
import Hangman from '../Hangman/Hangman'
import Endscreen from '../Endscreen/Endscreen'

class App extends Component {
  state = {
    word: [],
    wordPlaceholders: [],
    isGameWon: false,
    triedLetters: [],
    hangmanCounter: 0,
    isGameEnd: false,
    hangmanParts: [{
      name: "bar",
      number: 1
    },
    {
      name: "head",
      number: 2
    },
    {
      name: "neck",
      number: 3
    },
    {
      name: "corpus",
      number: 4
    },
    {
      name: "leftarm",
      number: 5
    },
    {
      name: "rightarm",
      number: 6
    },
    {
      name: "lefthand",
      number: 7
    },
    {
      name: "righthand",
      number: 8
    },
    {
      name: "leftleg",
      number: 9
    },
    {
      name: "rightleg",
      number: 10
    },
    {
      name: "leftfoot",
      number: 11
    },
    {
      name: "rightfoot",
      number: 12
    },
    ]
  }

  wordSplice = (parseLetter, letter, index) => {
    const arrToUpdate = [...this.state.wordPlaceholders]
    if (parseLetter === letter) {
      arrToUpdate.splice(index, 1, letter)
      return arrToUpdate
    } else {
      return arrToUpdate
    }
  }

  handleTriedLetters = (parseLetter) => {
    const triedLetters = [...this.state.triedLetters];
    if (!triedLetters.includes(parseLetter)) {
      triedLetters.push(parseLetter)
    }
    return triedLetters;
  }

  keypressCheckFunction = (parseLetter) => {
    this.state.word.forEach((letter, index) => {
      this.setState({
        wordPlaceholders: this.wordSplice(parseLetter, letter, index),
      })
    })
    if (!this.state.word.includes(parseLetter)) {
      this.setState(prevState => ({
        triedLetters: this.handleTriedLetters(parseLetter),
        hangmanCounter: prevState.hangmanCounter + 1
      }))
    }
  }

  keypressHandler = (e) => {
    let regex = /^[a-z]$/i;
    if (regex.test(e.key)) {
      this.keypressCheckFunction(e.key)
    }
  }

  handleWordPlaceholders = () => {
    let wordPlaceholders = [];
    let alphabetSign = /^[a-z]$/i;
    this.state.word.forEach((sign) => {
      if (alphabetSign.test(sign)) {
        wordPlaceholders.push('_');
      } else if (sign === " ") {
        wordPlaceholders.push(' ');
      } else if (sign === "-") {
        wordPlaceholders.push('-')
      }
    })
    this.setState((prevState) => ({
      wordPlaceholders: wordPlaceholders
    }))
  }

  checkIfArrayEquals = (arr1, arr2) => {
    for (let i = 0; i <= arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false
      }
    }
    return true
  }

  handleNewWord = () => {
    const apiKey = "07dcb06ec7msh4bac7eab1a6edc2p18a2d1jsna30d60c1654b";

    fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          word: data.word.split(''),
          isGameWon: false,
          isGameEnd: false,
          triedLetters: [],
          hangmanCounter: 0
        });
      })
      .then(() => {
        this.handleWordPlaceholders();
      }).then(() => {
        document.addEventListener("keydown", this.keypressHandler)
      })

  }

  componentDidMount = () => {
    this.handleNewWord()
  }

  componentDidUpdate = () => {
    if ((this.checkIfArrayEquals(this.state.word, this.state.wordPlaceholders)) && (!this.state.isGameWon)) {
      this.setState(() => ({
        isGameWon: true
      }))
    }
    if ((this.state.isGameWon || (!this.state.isGameEnd && this.state.hangmanCounter >= 12)) && !this.state.isGameEnd) {
      this.setState(() => ({ isGameEnd: true }))
      document.removeEventListener("keydown", this.keypressHandler)
    }
  }

  render() {
    return (
      <>
        <Hangman
          counter={this.state.hangmanCounter}
          hangman={this.state.hangmanParts}
        />
        <div className="bootstrap">
          <div className="bootstrap__tried">
            {this.state.triedLetters.length > 0 && `You already tried: ${this.state.triedLetters.join(' ').toUpperCase()}`}
          </div>
          <div className="bootstrap__letters">
            {this.state.wordPlaceholders.map((letter, index) => <Letter letter={letter} key={index} />)}
          </div>
        </div>
        {this.state.isGameEnd && <Endscreen isGameWon={this.state.isGameWon} handleNewWord={this.handleNewWord} />}
      </>
    );
  }
}

export default App;

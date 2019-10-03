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
  }

  keypressCheckFunction = (parseLetter) => {
    this.state.word.forEach((letter, index) => {
      if (parseLetter === letter) {
        this.setState(() => {
          const arrayToUpdate = [...this.state.wordPlaceholders];
          arrayToUpdate.splice(index, 1, letter)
          return ({
            wordPlaceholders: arrayToUpdate,
          })
        })
      }
    })
    if (!this.state.word.includes(parseLetter)) {
      this.setState((prevState) => {
        const triedLetters = [...this.state.triedLetters];
        if (!triedLetters.includes(parseLetter)) {
          triedLetters.push(parseLetter)
        }
        return (
          {
            triedLetters,
            hangmanCounter: prevState.hangmanCounter + 1,
          }
        )
      })
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
    let regex = /^[a-z]$/i;
    this.state.word.forEach((sign) => {
      if (regex.test(sign)) {
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
        this.setState({ word: data.word.split('') });
      })
      .then((data) => {
        this.handleWordPlaceholders();
        this.setState((prevState) => ({
          isGameWon: false,
          isGameEnd: false,
          triedLetters: [],
          hangmanCounter: 0
        }))
      }).then(() => {
        document.addEventListener("keydown", this.keypressHandler)
      })

  }

  componentDidMount = () => {
    this.handleNewWord()
  }

  componentDidUpdate = () => {
    if ((this.checkIfArrayEquals(this.state.word, this.state.wordPlaceholders)) && (!this.state.isGameWon)) {
      this.setState((prevState) => ({ isGameWon: !prevState.isGameWon }))
    }
    if ((this.state.isGameWon || (!this.state.isGameEnd && this.state.hangmanCounter >= 12)) && !this.state.isGameEnd) {
      this.setState((prevState) => ({ isGameEnd: !prevState.isGameEnd }))
      document.addEventListener("keydown", this.keypressHandler)
    }
  }



  render() {
    return (
      <>
        {this.state.isGameEnd && <Endscreen isGameWon={this.state.isGameWon} handleNewWord={this.handleNewWord} />}
        <Hangman counter={this.state.hangmanCounter} />
        <div className="bootstrap">
          <div className="bootstrap__tried">
            {this.state.triedLetters.length > 0 && `You already tried: ${this.state.triedLetters.join(' ').toUpperCase()}`}
          </div>
          <div className="bootstrap__letters">
            {this.state.wordPlaceholders.map(letter => <Letter letter={letter} />)}
          </div>
        </div>
      </>
    );
  }
}

export default App;

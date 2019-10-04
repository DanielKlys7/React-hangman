import React, { Component } from 'react';
import './App.sass';
import Letter from '../Letter/Letter'
import Hangman from '../Hangman/Hangman'
import Endscreen from '../Endscreen/Endscreen'
import { checkIfArrayEquals, handleNewWord } from '../../helpers'

class App extends Component {
  state = {
    word: [],
    wordPlaceholders: [],
    isGameWon: false,
    triedLetters: [],
    hangmanCounter: 0,
    isGameEnd: false,
    hangmanParts: []
  }

  handleHangmanParts = () => {
    this.setState(() => {
      const empty = [];
      ['bar', 'head', 'neck', 'corpus', 'leftarm', 'rightarm', 'lefthand', 'righthand', 'leftleg', 'rightleg', 'leftfoot', 'rightfoot']
        .forEach((part, index) => empty.push({
          name: part,
          number: index + 1
        }))
      return ({
        hangmanParts: empty,
      })
    })
  }

  wordSplice = (parseLetter, letter, index) => {
    const arrToUpdate = [...this.state.wordPlaceholders]
    if (parseLetter === letter) {
      arrToUpdate.splice(index, 1, letter)
    }
    return arrToUpdate
  }

  handleTriedLetters = (parseLetter) => {
    const triedLetters = [...this.state.triedLetters];
    if (!triedLetters.includes(parseLetter)) {
      triedLetters.push(parseLetter)
    }
    return triedLetters;
  }

  handleNewWordBtnClick = async () => {
    const data = await handleNewWord()
    this.setState({
      isGameEnd: false,
      isGameWon: false,
      triedLetters: [],
      hangmanCounter: 0,
      word: data.word.split(''),
    })
    this.handleWordPlaceholders();
    document.addEventListener("keydown", this.keypressHandler)
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

  componentDidMount = async () => {
    const data = await handleNewWord()
    this.setState({
      word: data.word.split(''),
    })
    this.handleWordPlaceholders();
    this.handleHangmanParts()
    document.addEventListener("keydown", this.keypressHandler)
  }

  componentDidUpdate = () => {
    const { word, wordPlaceholders, isGameWon, isGameEnd, hangmanCounter } = this.state
    if ((checkIfArrayEquals(word, wordPlaceholders)) && (!isGameWon)) {
      this.setState(() => ({
        isGameWon: true
      }))
    }
    if ((isGameWon || (!isGameEnd && hangmanCounter >= 12)) && !isGameEnd) {
      this.setState(() => ({ isGameEnd: true }))
      document.removeEventListener("keydown", this.keypressHandler)
    }
  }

  render() {
    const { wordPlaceholders, isGameWon, isGameEnd, hangmanCounter, hangmanParts, triedLetters } = this.state
    return (
      <>
        <Hangman
          counter={hangmanCounter}
          hangman={hangmanParts}
        />
        <div className="bootstrap">
          <div className="bootstrap__tried">
            {triedLetters.length > 0 && `You already tried: ${triedLetters.join(' ').toUpperCase()}`}
          </div>
          <div className="bootstrap__letters">
            {wordPlaceholders.map((letter, index) => <Letter letter={letter} key={index} />)}
          </div>
        </div>
        {isGameEnd && <Endscreen isGameWon={isGameWon} handleNewWord={this.handleNewWordBtnClick} />}
      </>
    );
  }
}

export default App;

import React from 'react';
import './Hangman.sass'
import bar from '../../imgs/bar.png'
import corpus from '../../imgs/corpus.png'
import head from '../../imgs/head.png'
import leftarm from '../../imgs/leftarm.png'
import lefthand from '../../imgs/lefthand.png'
import righthand from '../../imgs/lefthand.png'
import leftleg from '../../imgs/leftleg.png'
import neck from '../../imgs/neck.png'
import rightarm from '../../imgs/rightarm.png'
import rightfoot from '../../imgs/rightfoot.png'
import rightleg from '../../imgs/leftleg.png'
import leftfoot from '../../imgs/rightfoot.png'

const imagesMap = {
  bar,
  corpus,
  head,
  leftarm,
  lefthand,
  righthand,
  rightleg,
  leftleg,
  neck,
  rightarm,
  rightfoot,
  leftfoot
}



const Hangman = ({ counter, hangman }) => {
  return (
    <div className="hangman">
      {
        [...hangman]
          .filter(part => part.number <= counter)
          .map(part =>
            <img
              src={imagesMap[part.name]}
              alt={part.name} key={part.number}
              className={`hangman__part hangman--${part.name}`}
            />
          )
      }
    </div>
  );
}

export default Hangman;
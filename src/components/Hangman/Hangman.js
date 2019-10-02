import React from 'react';
import Bar from '../../imgs/bar.png'
import Corpus from '../../imgs/corpus.png'
import Head from '../../imgs/head.png'
import Leftarm from '../../imgs/left-arm.png'
import Lefthand from '../../imgs/left-hand.png'
import Leftleg from '../../imgs/left-leg.png'
import Neck from '../../imgs/neck.png'
import Rightarm from '../../imgs/right-arm.png'
import Rightfoot from '../../imgs/right-foot.png'
import './Hangman.sass'

const Hangman = ({ counter }) => {
    return (
        <div className="hangman">
            {counter >= 1 && <img className="hangman__part hangman--bar" src={Bar} alt="Bar" />}
            {counter >= 2 && <img className="hangman__part hangman--head" src={Head} alt="Head" />}
            {counter >= 3 && <img className="hangman__part hangman--neck" src={Neck} alt="Neck" />}
            {counter >= 4 && <img className="hangman__part hangman--corpus" src={Corpus} alt="Corpus" />}
            {counter >= 5 && <img className="hangman__part hangman--leftarm" src={Leftarm} alt="Leftarm" />}
            {counter >= 6 && <img className="hangman__part hangman--rightarm" src={Rightarm} alt="Rightarm" />}
            {counter >= 7 && <img className="hangman__part hangman--lefthand" src={Lefthand} alt="Lefthand" />}
            {counter >= 8 && <img className="hangman__part hangman--righthand" src={Lefthand} alt="Righthand" />}
            {counter >= 9 && <img className="hangman__part hangman--leftleg" src={Leftleg} alt="Leftleg" />}
            {counter >= 10 && <img className="hangman__part hangman--rightleg" src={Leftleg} alt="Rightleg" />}
            {counter >= 11 && <img className="hangman__part hangman--leftfoot" src={Rightfoot} alt="Leftfoot" />}
            {counter >= 12 && <img className="hangman__part hangman--rightfoot" src={Rightfoot} alt="Rightfoot" />}
        </div>
    );
}

export default Hangman;
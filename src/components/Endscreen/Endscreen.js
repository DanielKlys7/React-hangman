import React from 'react';
import './Endscreen.sass'

const Endscreen = ({ isGameWon, handleNewWord }) => {
    return (
        <div className="endscreen">
            {isGameWon ? <p className="endscreen__result--win">You won!</p> : <p className="endscreen__result--lose">You lost.. :(</p>}
            <button onClick={handleNewWord} className="endscreen__newGame">New word!</button>
        </div>
    );
}

export default Endscreen;
import React from 'react';
import './Letter.sass'

const Letter = ({ letter }) => {
    return (
        <div className="letterbox">
            <p className="letter--content">
                {letter}
            </p>
        </div>
    );
}

export default Letter;
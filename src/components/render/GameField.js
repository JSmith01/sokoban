import React from 'react';
import Cell from './Cell';

const GameField = ({ map }) => {
    let cells = [];
    for (let i = 0; i < map.length; i++) {
        let row = [];
        for (let j = 0; j < map[i].length; j++) {
            row.push(<Cell key={j} type={map[i][j]} />);
        }
        cells.push(<div key={i} className="row">{row}</div>);
    }

    return (<div className="field">{cells}</div>);
};

export default GameField;
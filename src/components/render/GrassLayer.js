import React from 'react';
import { _, OUTLINED } from '../../maps/index';
import Cell from './Cell';

const GrassLayer = ({ map }) => {
    let cells = [];

    for (let i = 0; i < map.length; i++) {
        let row = [];
        for (let j = 0; j < map[i].length; j++) {
            row.push(<Cell key={j} type={map[i][j] !== OUTLINED ? _ : OUTLINED} />);
        }
        cells.push(<div key={i} className="row">{row}</div>);
    }

    return (<div className="grass-field">{cells}</div>);
};

export default GrassLayer;
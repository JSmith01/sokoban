import React from 'react';
import { _, O, X, V } from '../../maps/index';

const Cell = ({type}) => {
    let typeClass = '';
    switch (type) {
        case _: typeClass = 'grass'; break;
        case O: typeClass = 'block'; break;
        case X: typeClass = 'fence'; break;
        case V: typeClass = 'place'; break;
        default: typeClass = '';
    }
    return (<div className={"cell " + typeClass} />)
};

export default Cell;

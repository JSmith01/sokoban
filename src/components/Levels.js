import React from 'react';
import { Link } from 'react-router-dom';
import maps from '../maps/maps.json';

const Levels = () => (
    <ul>
        {maps.map(m => <li key={m.id}><Link to={'/game/' + m.id}>{m.name}</Link> - {m.width}x{m.height}</li>)}
    </ul>
);

export default Levels;
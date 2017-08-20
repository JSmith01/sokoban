import React from 'react';
import maps from '../maps/maps.json';

const Levels = () => (
    <ul>
        {maps.map(m => <li key={m.id}>{m.name} - {m.width}x{m.height}</li>)}
    </ul>
);

export default Levels;
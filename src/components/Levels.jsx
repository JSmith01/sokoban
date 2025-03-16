import React from 'react';
import maps from '../maps/maps.json';
import Menu from './Menu.jsx';
import { navigate } from 'wouter/use-hash-location';

const Levels = () => (
    <div className="level-selector">
        <Menu onSelect={pos => navigate('/game/' + maps[pos].id)} onExit={() => navigate('/')}>
            {maps.map(m => <span key={m.id}>{m.name} - {m.width}x{m.height}</span>)}
        </Menu>
    </div>
);

export default Levels;

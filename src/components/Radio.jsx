import React from 'react';
import Menu from './Menu.jsx';
import genresRaw from '../radio/genres.json';
import { navigate } from 'wouter/use-hash-location';

const genres = [
    { id: 'favorites', name: 'Favorite radio stations' },
    { id: 'history', name: 'Last opened radio stations' },
].concat(genresRaw.map(g => ({ id: g.id, name: g.name + ' (' + g.stations.length + ')' })));

const Radio = () => (
    <div>
        <h3>List of radio station genres</h3>
        <Menu onSelect={pos => navigate('/radio/' + genres[pos].id)} onExit={() => navigate('/')}>
            {genres.map(g => <span key={g.id}>{g.name}</span>)}
        </Menu>
    </div>
);

export default Radio;
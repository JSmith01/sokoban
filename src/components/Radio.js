import React from 'react';
import Menu from './Menu';
import {withRouter} from 'react-router-dom';
import genresRaw from '../radio/genres.json';

const genres = [
    { id: 'favorites', name: 'Favorite radio stations' },
    { id: 'history', name: 'Last opened radio stations' },
].concat(genresRaw.map(g => ({ id: g.id, name: g.name + ' (' + g.stations.length + ')' })));

const Radio = ({ history }) => (
    <div className='radio-list'>
        <h3>List of radio station genres</h3>
        <Menu onSelect={pos => history.push('/radio/' + genres[pos].id)} onExit={() => history.push('/')}>
            {genres.map(g => <span key={g.id}>{g.name}</span>)}
        </Menu>
    </div>
);

export default withRouter(Radio);
import React from 'react';
import maps from '../maps/maps.json';
import Menu from './Menu';
import {withRouter} from 'react-router-dom';

const Levels = ({ history }) => (
    <div className="level-selector">
        <Menu onSelect={pos => history.push('/game/' + maps[pos].id)} onExit={() => history.push('/')}>
            {maps.map(m => <span key={m.id}>{m.name} - {m.width}x{m.height}</span>)}
        </Menu>
    </div>
);

export default withRouter(Levels);
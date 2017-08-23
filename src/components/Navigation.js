import React from 'react';
import { withRouter } from 'react-router-dom';
import Menu from './Menu';

const mainNav = [
    { name: 'Home', link: '/' },
    { name: 'Game', link: '/game' },
    { name: 'Map', link: '/map' },
    { name: 'Levels', link: '/levels' },
];

const Navigation = ({ history }) => (
    <nav>
        <Menu onSelect={pos => history.push(mainNav[pos].link)}>
                {mainNav.map(item => <span key={item.link}>{item.name}</span>)}
        </Menu>
    </nav>
);

export default withRouter(Navigation);
import React from 'react';
import Menu from './Menu.jsx';
import { navigate } from 'wouter/use-hash-location';

const mainNav = [
    { name: 'Start Game', link: '/game' },
    { name: 'Select Level', link: '/levels' },
    { name: 'Map', link: '/map' },
    { name: 'Radio', link: '/radio' },
];

const Navigation = () => (
    <nav>
        <Menu onSelect={pos => navigate(mainNav[pos].link)}>
                {mainNav.map(item => <span key={item.link}>{item.name}</span>)}
        </Menu>
    </nav>
);

export default Navigation;

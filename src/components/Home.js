import React from 'react';
import Navigation from './Navigation';

const Home = () => (
    <div className="main-menu">
        <header>
            <h1>Sokoban</h1>
        </header>
        <Navigation />
        <div className="help">
            Use arrow keys, Enter and Esc buttons.
        </div>
    </div>
);

export default Home;
import React from 'react';
import { Link } from 'react-router-dom'

const Navigation = props => (
    <nav>
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/game'>Game</Link>
            </li>
            <li>
                <Link to='/map'>Map</Link>
            </li>
        </ul>
    </nav>
);

export default Navigation;
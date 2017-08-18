import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Game from './Game';
import NotFound from './NotFound';
import Home from './Home';
import TileMap from './TileMap';

const Main = () => (
    <div>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/game' component={Game} />
            <Route path='/map' component={TileMap} />
            <Route component={NotFound} />
        </Switch>
    </div>
);

export default Main;
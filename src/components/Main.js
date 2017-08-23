import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GameScreen from './GameScreen';
import NotFound from './NotFound';
import Home from './Home';
import TileMap from './TileMap';
import Levels from './Levels';

const Main = () => (
    <div>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/game' component={GameScreen} />
            <Route path='/game/:id' component={GameScreen} />
            <Route path='/map' component={TileMap} />
            <Route path='/levels' component={Levels} />
            <Route component={NotFound} />
        </Switch>
    </div>
);

export default Main;
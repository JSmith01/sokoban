import React from 'react';
import { Switch, Route } from 'wouter';
import GameScreen from './GameScreen.jsx';
import NotFound from './NotFound.jsx';
import Home from './Home.jsx';
import TileMap from './TileMap.jsx';
import Levels from './Levels.jsx';
import Radio from './Radio.jsx';
import RadioGenre from './RadioGenre.jsx';

const Main = () => (
    <div>
        <Switch>
            <Route exact path='/'><Home /></Route>
            <Route exact path='/game'><GameScreen /></Route>
            <Route path='/game/:id'>{params => <GameScreen levelId={params.id} />}</Route>
            <Route path='/map'><TileMap/></Route>
            <Route path='/levels'><Levels/></Route>
            <Route exact path='/radio'><Radio/></Route>
            <Route path='/radio/:id'><RadioGenre/></Route>
            <Route><NotFound/></Route>
        </Switch>
    </div>
);

export default Main;
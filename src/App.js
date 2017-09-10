import React, { Component } from 'react';
import Main from './components/Main';
import RadioPlayer from "./components/RadioPlayer";

class App extends Component {
  render() {
    return (
        <div className="App">
            <header>
                <h2>Sokoban</h2>
            </header>
            <Main />
            <RadioPlayer />
        </div>
    );
  }
}

export default App;

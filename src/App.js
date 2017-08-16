import React, { Component } from 'react';
import Main from './components/Main';
import Navigation from './components/Navigation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h2>Sokoban</h2>
        </header>
        <Navigation />
        <Main />
      </div>
    );
  }
}

export default App;

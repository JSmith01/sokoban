import React, { Component } from 'react';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h2>Sokoban</h2>
        </header>
        <Main />
      </div>
    );
  }
}

export default App;

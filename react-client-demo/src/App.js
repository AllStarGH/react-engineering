import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import NavigationListTest from '@/components/test/NavigationListTest';

import RouteConfig from '@/router';

function App() {
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

    <Router>
      <RouteConfig />
    </Router>

    <NavigationListTest message="Decide on what path to follow" />

    </div>
    );
}

export default App;
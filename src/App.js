import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css'
import Task from './component';

function App() {
  return (
      <Router>
        <Route exact path="/" component={Task} />
      </Router>
  );
}

export default App;

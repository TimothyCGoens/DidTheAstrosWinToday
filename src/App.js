import React from 'react';
import './App.css';
import TodaysGame from './Components/TodaysGame'

function App() {
  return (
    <div>
    <h1 className='header-text'>Did the Astros win today?</h1>
    <TodaysGame />
    </div>
  );
}

export default App;

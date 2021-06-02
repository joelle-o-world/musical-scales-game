import React from 'react';
import logo from './logo.svg';
import ScaleEditor from './features/scaleEditor/ScaleEditor';
import PianoKeyboard from './components/PianoKeyboard';
import './App.sass'
import ScaleDegreesPianoIndicator from './features/scaleEditor/ScaleDegreesPianoIndicator';

function App() {
  return (
    <div className="App">
      <h1>Musical Scales Game</h1> 
      <ScaleEditor/>
      <ScaleDegreesPianoIndicator/>
    </div>
  );
}

export default App;

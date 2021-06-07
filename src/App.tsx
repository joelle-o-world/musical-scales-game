import React from 'react';
import logo from './logo.svg';
import ScaleEditor from './features/scaleEditor/ScaleEditor';
import PianoKeyboard from './components/PianoKeyboard';
import './App.sass'
import ScaleDegreesPianoIndicator from './features/scaleEditor/ScaleDegreesPianoIndicator';
import {useSelector} from 'react-redux';
import {selectScaleEditor} from './features/scaleEditor/scaleEditorSlice';
import CorrectAnswer from './components/CorrectAnswer'

function App() {
  const {report} = useSelector(selectScaleEditor)
  return (
    <div className="App">
      <h1>Musical Scales Game</h1> 
      <ScaleEditor/>
      {report && report.correct 
        ? <CorrectAnswer/>
        : <ScaleDegreesPianoIndicator/>
      }
    </div>
  );
}

export default App;

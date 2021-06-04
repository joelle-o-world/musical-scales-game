import React, {FunctionComponent} from 'react';
import {useSelector} from 'react-redux';
import {selectScaleEditor} from '../features/scaleEditor/scaleEditorSlice';
import parsePitch, {pitchClassOf} from '../pitch';
import PianoKeyboard from './PianoKeyboard';

export const CorrectAnswer: FunctionComponent = () => {
  const {report} = useSelector(selectScaleEditor)

  if(!report)
    return null

  if(report && report.correct) {
    const scale = report?.scale
    if(scale) {
      let pitchClasses = scale.steps.map(p => parsePitch(p)?.midiNumber)
        .filter(p => typeof p === 'number')
        // @ts-ignore
        .map((p:number) => pitchClassOf(p))
      return <div>
        <h2>Correct! You have spelled {scale.name}</h2>
        <PianoKeyboard 
          lowestNote={48} 
          numberOfKeys={25}
          highlightPitchClasses={pitchClasses}
        />
      </div>
    } else
      throw new Error("Correct answer but no scale specified")
  }

  return null
}

export default CorrectAnswer

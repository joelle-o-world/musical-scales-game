import React, {FunctionComponent} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import PianoKeyboard from '../../components/PianoKeyboard';
import parsePitch, {printPitch, pitchClassOf} from '../../pitch';
import {selectScaleEditor, setCurrentStep} from './scaleEditorSlice';

export const ScaleDegreesPianoIndicator: FunctionComponent = () => {
  const dispatch = useDispatch()
  const {steps, currentStep} = useSelector(selectScaleEditor)
  //let pitchNumbers = steps
    //.map(str => parsePitch(str).midiNumber)
    //.filter((p):p is number => typeof p === 'number')
    //.map(p => pitchClassOf(p))


  let highlights: number[] = []
  let currentPitch = parsePitch(steps[currentStep])
  if(typeof currentPitch.midiNumber === 'number')
    highlights.push(pitchClassOf(currentPitch.midiNumber))

  return <PianoKeyboard 
    highlightPitchClasses={highlights} 
    numberOfKeys={25} 
    lowestNote={48} 
    labelKeys
    onNote={e => {
      dispatch(setCurrentStep(e.pitchName))
    }}
  />
}

export default ScaleDegreesPianoIndicator

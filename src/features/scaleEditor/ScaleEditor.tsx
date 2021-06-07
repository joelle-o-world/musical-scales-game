import React, {FunctionComponent, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classNames from 'classnames';
import {selectScaleEditor, incrementStep, decrementStep, focusStep, setCurrentStep} from './scaleEditorSlice';
import {printPitch, parsePitch} from '../../pitch';

import {AiOutlineArrowDown, AiOutlineArrowUp} from 'react-icons/ai'

import './ScaleEditor.sass'
import {useSynth} from '../synth/synth';


export const ScaleEditor: FunctionComponent = () => {
  const {steps} = useSelector(selectScaleEditor)
  return <div className="ScaleEditor">
    {steps.map((step, i) => <ScaleEditorStep stepNumber={i} key={i} />)}
  </div>
}

export const ScaleEditorStep: FunctionComponent<{stepNumber: number, lowestPitch?: number}> = ({ stepNumber, lowestPitch}) => {
  const dispatch = useDispatch()
  const {steps, currentStep} = useSelector(selectScaleEditor)
  const pitch = steps[stepNumber]
  parsePitch(pitch)

  const synth = useSynth()
  useEffect(() => {
    synth.play(pitch)
  }, [pitch])

  const inputRef = useRef(null as null|HTMLInputElement)
  useEffect(() => {
    let input = inputRef.current
    if(input && currentStep === stepNumber)
      input.focus()
  }, [currentStep, pitch])


  const handleKeyPress = (e:React.KeyboardEvent) => {
    console.log(e.key)
    let concatenated = pitch + e.key
  }

  let id = `ScaleEditorStep_${stepNumber}`

  return <div 
    className={classNames("ScaleEditorStep", {currentStep: currentStep === stepNumber})} 
    id={id}
    onMouseDown={() => dispatch(focusStep(stepNumber))}
    onKeyPress={handleKeyPress}
  >
    <button onClick={() => dispatch(incrementStep(stepNumber))} className="IncrementPitchButton"><AiOutlineArrowUp/></button>
    <input 
      className="PitchDisplay" 
      ref={inputRef}
      value={pitch} 
      onChange={e => dispatch(setCurrentStep(e.target.value))}
    />
    <button 
      className="DecrementPitchButton" 
      onClick={() => dispatch(decrementStep(stepNumber))}
    ><AiOutlineArrowDown/></button>
  </div>
}

export default ScaleEditor

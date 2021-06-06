import React, {FunctionComponent, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classNames from 'classnames';
import {selectScaleEditor, incrementStep, decrementStep, focusStep} from './scaleEditorSlice';
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

  return <div 
    className={classNames("ScaleEditorStep", {currentStep: currentStep === stepNumber})} 
    onMouseDown={() => dispatch(focusStep(stepNumber))}
  >
    <button onClick={() => dispatch(incrementStep(stepNumber))}><AiOutlineArrowUp/></button>
    <input readOnly value={pitch} className="PitchDisplay"/>
    <button onClick={() => dispatch(decrementStep(stepNumber))}><AiOutlineArrowDown/></button>
  </div>
}

export default ScaleEditor

import React, {FunctionComponent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import classNames from 'classnames';
import {selectScaleEditor, incrementStep, decrementStep, focusStep} from './scaleEditorSlice';
import {printPitch} from '../../pitch';

import {AiOutlineArrowDown, AiOutlineArrowUp} from 'react-icons/ai'

import './ScaleEditor.sass'


export const ScaleEditor: FunctionComponent = () => {
  const {steps} = useSelector(selectScaleEditor)
  return <div className="ScaleEditor">
    {steps.map((step, i) => <ScaleEditorStep stepNumber={i} key={i} />)}
  </div>
}

export const ScaleEditorStep: FunctionComponent<{stepNumber: number}> = ({ stepNumber}) => {
  const dispatch = useDispatch()
  const {steps, currentStep} = useSelector(selectScaleEditor)
  const pitch = steps[stepNumber]

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

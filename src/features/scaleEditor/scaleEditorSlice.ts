import {RootState} from "../../app/store";
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import parsePitch from "../../pitch";
import {decrementPitchSpelling, availableSpellings, incrementPitchSpelling} from "../../pitchSpellingArithmetic";

export interface ScaleEditorState {
  steps: string[];
  currentStep: number;
}

const initialState: ScaleEditorState = {
  steps: ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
  currentStep: 0,
}

export const scaleEditorSlice = createSlice({
  name: 'scaleEditor',
  initialState,

  reducers: {
    incrementStep: (state, action:PayloadAction<number>) => {
      let index = action.payload;
      state.steps[index] = incrementPitchSpelling(state.steps[index])
    },
    decrementStep: (state, action:PayloadAction<number>) => {
      let index = action.payload;
      state.steps[index] = decrementPitchSpelling(state.steps[index])
    },
    setCurrentStep: (state, action:PayloadAction<string>) => {
      if(availableSpellings.includes(action.payload))
        state.steps[state.currentStep] = action.payload
    },
    focusStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
  },
})

export const {incrementStep, decrementStep, focusStep, setCurrentStep} = scaleEditorSlice.actions;

export const selectScaleEditor = (state: RootState) => state.scaleEditor

export default scaleEditorSlice.reducer
